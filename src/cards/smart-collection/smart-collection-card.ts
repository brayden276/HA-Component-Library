export * from "./smart-collection-card.types";
import type { SmartCollectionConfig } from "./smart-collection-card.types";
export * from "./smart-collection-card.styles";
import { smartCollectionCardStyles } from "./smart-collection-card.styles";
import { html, TemplateResult, CSSResultGroup, PropertyValues } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import type {
  LovelaceGridOptions,
  EntityRegistryEntry,
} from "../../types/home-assistant";
import type { DashboardRegistries } from "../../types/registry";
import {
  centralRegistry,
  uiEntry,
  areaOf,
  stateNameOf,
  isPotential,
  isActive,
  controlConfig,
  nativeClimateControlConfig,
  applyPrefs,
  loadPrefs,
  savePrefs,
  UserPreferences,
  createCardElement,
} from "../../services/registry/dashboard-registry";
import { domainOf } from "../../utils/entity";
import { registerCard } from "../../utils/registration";
import "../split-ac/split-ac-card";
import "../wled/wled-card";
import "../apple-tv/apple-tv-card";
import "../garage-door/garage-door-card";
import "../camera/camera-card";
import "../control-row/control-row-card";
import "../media-row/media-row-card";

const DEFAULTS: SmartCollectionConfig = {
  type: "custom:component-smart-collection-v3",
  mode: "all",
  title: "Controls",
  icon: "mdi:tune-variant",
  pref_key: null,
  show_header: true,
  header_style: "title",
  editable: false,
  exclude_device_names: [],
};

@customElement("component-smart-collection-v3")
export class ComponentSmartCollectionV3 extends LitBaseCard<SmartCollectionConfig> {
  public static override getGridOptions(): LovelaceGridOptions {
    return { columns: 12, rows: "auto" };
  }

  @state()
  private _registry: DashboardRegistries | null = null;

  @state()
  private _prefs: UserPreferences = { order: [], hidden: [] };

  @state()
  private _renderedCards: HTMLElement[] = [];

  private _cardElements = new Map<string, { el: HTMLElement; sig: string }>();
  private _structureSig = "";
  private _gen = 0;
  private _unsubRegistry: (() => void) | null = null;
  private _activeStateSubscription: Promise<(() => void) | void> | null = null;
  private _activeStateToken: object | null = null;
  private _activeStateConnection: any = null;
  private _activeStateRetry: ReturnType<typeof setTimeout> | null = null;

  public static override styles: CSSResultGroup = smartCollectionCardStyles;

  public override get config(): SmartCollectionConfig | undefined {
    return this._config;
  }

  public override set config(value: SmartCollectionConfig | undefined) {
    if (value) this.setConfig(value);
  }

  public override setConfig(config: SmartCollectionConfig): void {
    super.setConfig({ ...DEFAULTS, ...config });
    this._structureSig = "";
    if (this.hass) {
      if (this._config?.pref_key) {
        this._loadPrefs();
      }
      centralRegistry.load(this.hass).then((data) => {
        this._registry = data;
        void this._syncCards();
      });
      void this._syncCards();
    }
  }

  public override getCardSize(): number {
    return 2;
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    if (!this._unsubRegistry && this.hass) {
      this._unsubRegistry = centralRegistry.subscribe(this.hass, (data) => {
        this._registry = data;
        this._structureSig = "";
        void this._syncCards();
      });
    }
    if (this._config?.pref_key) {
      this._loadPrefs();
    }
    void this._syncCards();
    if (this._config?.mode === "active") {
      this._startActiveStateStream();
    }
  }

  public override disconnectedCallback(): void {
    this._unsubRegistry?.();
    this._unsubRegistry = null;
    this._stopActiveStateStream();
    this._gen += 1;
    super.disconnectedCallback();
  }

  protected override willUpdate(changedProps: PropertyValues): void {
    super.willUpdate(changedProps);
    if (changedProps.has("hass") && this.hass) {
      for (const record of this._cardElements.values()) {
        (record.el as any).hass = this.hass;
      }
      if (!this._registry) {
        centralRegistry.load(this.hass).then((data) => {
          this._registry = data;
          void this._syncCards();
        });
      }
      void this._syncCards();
      if (this._config?.mode === "active") {
        this._startActiveStateStream();
      }
    }
  }

  private async _loadPrefs(): Promise<void> {
    if (!this.hass || !this._config?.pref_key) return;
    this._prefs = await loadPrefs(this.hass, this._config.pref_key);
    this._structureSig = "";
    void this._syncCards();
  }

  private _stopActiveStateStream(): void {
    if (this._activeStateRetry) {
      clearTimeout(this._activeStateRetry);
      this._activeStateRetry = null;
    }
    this._activeStateToken = null;
    this._activeStateConnection = null;
    const subscription = this._activeStateSubscription;
    this._activeStateSubscription = null;
    if (subscription) {
      Promise.resolve(subscription)
        .then((unsubscribe) => unsubscribe?.())
        .catch(() => {});
    }
  }

  private _handleActiveStateChanged(event: any): void {
    if (this._config?.mode !== "active" || !this.hass) return;
    const data = event?.data || event;
    const entityId = data?.entity_id;
    if (!entityId) return;
    const dom = domainOf(entityId);
    if (
      ![
        "light",
        "fan",
        "switch",
        "input_boolean",
        "media_player",
        "climate",
        "cover",
        "lock",
        "vacuum",
        "binary_sensor",
      ].includes(dom)
    ) {
      return;
    }
    this._structureSig = "";
    void this._syncCards();
  }

  private _startActiveStateStream(): void {
    if (this._config?.mode !== "active" || !this.isConnected) return;
    const connection = this.hass?.connection;
    if (
      !connection?.subscribeEvents ||
      (this._activeStateConnection === connection &&
        this._activeStateSubscription)
    ) {
      return;
    }
    this._stopActiveStateStream();
    this._activeStateConnection = connection;
    const token = {};
    this._activeStateToken = token;
    let subscription: any;
    try {
      subscription = connection.subscribeEvents((event: any) => {
        if (this._activeStateToken === token) {
          this._handleActiveStateChanged(event);
        }
      }, "state_changed");
    } catch {
      subscription = Promise.reject(new Error("state subscription failed"));
    }
    this._activeStateSubscription = Promise.resolve(subscription).catch(() => {
      if (this._activeStateToken !== token) return;
      this._activeStateSubscription = null;
      this._activeStateRetry = setTimeout(() => {
        this._activeStateRetry = null;
        this._startActiveStateStream();
      }, 10000);
    });
  }

  private _isCameraOwner(entry: EntityRegistryEntry): boolean {
    if (entry?.platform !== "onvif" || domainOf(entry.entity_id) !== "camera")
      return false;
    const identity = `${entry.entity_id} ${entry.name || entry.original_name || ""}`;
    return !/sub.?stream/i.test(identity);
  }

  private _isCameraDeviceActive(entry: EntityRegistryEntry): boolean {
    if (!entry?.device_id) return false;
    return (this._registry?.byDevice?.get(entry.device_id) || []).some(
      (sibling) => {
        if (domainOf(sibling.entity_id) !== "binary_sensor") return false;
        const state = this.hass?.states?.[sibling.entity_id];
        const deviceClass = state?.attributes?.device_class || "";
        const identity = `${sibling.entity_id} ${sibling.name || sibling.original_name || ""}`;
        return (
          state?.state === "on" &&
          (/^(motion|occupancy|presence|sound)$/.test(deviceClass) ||
            /motion|human|person|detect/i.test(identity))
        );
      },
    );
  }

  private _isGarageTrigger(
    entry: EntityRegistryEntry,
    garageDevices: Set<string>,
  ): boolean {
    if (
      !entry.device_id ||
      !garageDevices.has(entry.device_id) ||
      domainOf(entry.entity_id) !== "button"
    )
      return false;
    const identity = `${entry.entity_id || ""} ${entry.name || ""} ${entry.original_name || ""}`.toLowerCase();
    return /(garage.?door|door).*(trigger|operate)|(trigger|operate).*(garage.?door|door)/.test(
      identity,
    );
  }

  private _candidates(): EntityRegistryEntry[] {
    if (!this.hass) return [];
    const sourceEntities: EntityRegistryEntry[] =
      this._registry && this._registry.entities.length > 0
        ? this._registry.entities
        : Object.keys(this.hass.states).map((entity_id) => ({
            entity_id,
            device_id: null,
            area_id: null,
            name:
              this.hass?.states[entity_id]?.attributes?.friendly_name ||
              entity_id,
          }));

    const media = sourceEntities.filter(
      (entry) =>
        uiEntry(entry, this.hass?.states[entry.entity_id]) &&
        domainOf(entry.entity_id) === "media_player" &&
        this.hass?.states[entry.entity_id],
    );
    const mediaDevices = new Set(
      media.map((e) => e.device_id).filter((id): id is string => Boolean(id)),
    );
    const mediaNames = media
      .map((e) =>
        stateNameOf(this.hass, e, this.hass?.states[e.entity_id])
          .trim()
          .toLowerCase(),
      )
      .filter(Boolean);
    const excluded = new Set(this._config?.exclude_device_names || []);
    const deviceNames = new Map(
      (this._registry?.devices || []).map((d) => [
        d.id,
        d.name_by_user || d.name || "",
      ]),
    );

    const climateDevices = new Set<string>();
    const splitOwned = new Set<string>();
    for (const climate of sourceEntities.filter(
      (entry) =>
        domainOf(entry.entity_id) === "climate" &&
        uiEntry(entry, this.hass?.states[entry.entity_id]),
    )) {
      if (climate.device_id) climateDevices.add(climate.device_id);
      const config = nativeClimateControlConfig(
        climate,
        this.hass.states[climate.entity_id],
        this._registry,
        this.hass,
      );
      for (const entityId of [
        config?.vertical_vane_entity,
        config?.horizontal_vane_entity,
        config?.timer_entity,
      ].filter(Boolean)) {
        splitOwned.add(entityId);
      }
      for (const profile of config?.profile_entities || []) {
        if (profile?.entity) splitOwned.add(profile.entity);
      }
    }

    const garageDevices = new Set(
      sourceEntities
        .filter(
          (entry) =>
            domainOf(entry.entity_id) === "binary_sensor" &&
            this.hass?.states[entry.entity_id]?.attributes?.device_class ===
              "garage_door",
        )
        .map((entry) => entry.device_id)
        .filter((id): id is string => Boolean(id)),
    );

    const candidates = sourceEntities.filter((entry) => {
      const state = this.hass?.states[entry.entity_id];
      const cameraOwner = this._isCameraOwner(entry);
      const eligible =
        this._config?.mode === "sound"
          ? Boolean(entry?.entity_id && !entry.disabled_by)
          : uiEntry(entry, state) && (entry.platform !== "onvif" || cameraOwner);
      if (
        !eligible ||
        !state ||
        (entry.device_id &&
          excluded.has(deviceNames.get(entry.device_id) || ""))
      ) {
        return false;
      }

      const domain = domainOf(entry.entity_id);
      const area = areaOf(entry, this._registry);
      const controlName = stateNameOf(this.hass, entry, state)
        .trim()
        .toLowerCase();

      // Subordinate controls on a climate/split device are owned by the split controller
      if (
        entry.device_id &&
        climateDevices.has(entry.device_id) &&
        domain !== "climate"
      ) {
        return false;
      }

      // Explicitly claimed vane/timer/profile entities are suppressed from standalone cards
      if (splitOwned.has(entry.entity_id)) {
        return false;
      }

      // Sibling momentary buttons for garage operators are bundled into the garage card
      if (this._isGarageTrigger(entry, garageDevices)) {
        return false;
      }

      if (this._config?.mode === "area") {
        return (
          area === this._config.area_id &&
          (isPotential(entry, state) || cameraOwner)
        );
      }
      if (this._config?.mode === "media") return domain === "media_player";
      if (this._config?.mode === "sound") {
        return (
          ["switch", "number", "select"].includes(domain) &&
          ((entry.device_id && mediaDevices.has(entry.device_id)) ||
            mediaNames.some((name) => controlName.startsWith(`${name} `)))
        );
      }
      if (
        this._config?.mode === "active" ||
        this._config?.mode === "all" ||
        !this._config?.mode
      ) {
        return (
          cameraOwner ||
          isPotential(entry, state) ||
          (this._config?.mode === "active" &&
            domain === "binary_sensor" &&
            /^(door|window|smoke|moisture|gas)$/.test(
              state.attributes?.device_class || "",
            ))
        );
      }
      return false;
    });

    return candidates;
  }

  private _shown(entries: EntityRegistryEntry[]): EntityRegistryEntry[] {
    return this._config?.mode === "active"
      ? entries.filter((entry) =>
          this._isCameraOwner(entry)
            ? this._isCameraDeviceActive(entry)
            : isActive(entry, this.hass?.states[entry.entity_id]),
        )
      : entries;
  }

  private _resolveCardConfig(
    entry: EntityRegistryEntry,
  ): Record<string, any> | null {
    if (this._isCameraOwner(entry)) {
      return {
        type: "custom:component-camera-controller-v1",
        entity: entry.entity_id,
        device_id: entry.device_id,
      };
    }
    return controlConfig(
      entry,
      this.hass?.states[entry.entity_id],
      this._registry,
      this.hass,
    );
  }

  private _tune(card: HTMLElement): void {
    if (
      card?.localName !== "component-split-controller-v4" ||
      !card.shadowRoot ||
      card.shadowRoot.querySelector("style[data-home-minimal]")
    )
      return;
    const style = document.createElement("style");
    style.dataset.homeMinimal = "";
    style.textContent =
      ".nm{font-weight:500!important}.iw{color:var(--secondary-text-color)!important}.rv{font-size:22px!important;font-weight:500!important}.tv{font-size:16px!important;font-weight:500!important}.al,.pt,.gt,.o,.tpr button,.tcu button,.tac button{font-weight:500!important}.pt{font-size:16px!important}.a ha-icon{--mdc-icon-size:17px!important}";
    card.shadowRoot.append(style);
  }

  private async _syncCards(): Promise<void> {
    if (!this.hass) return;
    const gen = ++this._gen;

    const candidates = this._candidates().sort((left, right) =>
      stateNameOf(
        this.hass,
        left,
        this.hass?.states[left.entity_id],
      ).localeCompare(
        stateNameOf(this.hass, right, this.hass?.states[right.entity_id]),
        undefined,
        { sensitivity: "base" },
      ),
    );

    const preferences = applyPrefs(
      candidates.map((entry) => ({ id: entry.entity_id, entry })),
      this._prefs,
    );
    const visible = this._shown(preferences.visible.map((item) => item.entry));

    const rows: Array<{
      entry: EntityRegistryEntry;
      config: Record<string, any>;
      sig: string;
    }> = [];
    for (const entry of visible) {
      const config = this._resolveCardConfig(entry);
      if (config) {
        rows.push({ entry, config, sig: JSON.stringify(config) });
      }
    }

    const structureSignature = JSON.stringify(
      rows.map((r) => [r.entry.entity_id, r.sig]),
    );
    if (structureSignature === this._structureSig) {
      for (const record of this._cardElements.values()) {
        (record.el as any).hass = this.hass;
      }
      return;
    }

    const staged = new Map<string, { el: HTMLElement; sig: string }>();
    for (const row of rows) {
      const existing = this._cardElements.get(row.entry.entity_id);
      if (existing && existing.sig === row.sig) {
        (existing.el as any).hass = this.hass;
        staged.set(row.entry.entity_id, existing);
        continue;
      }
      try {
        const element = await createCardElement(row.config, this.hass);
        if (gen !== this._gen) return;
        this._tune(element);
        staged.set(row.entry.entity_id, { el: element, sig: row.sig });
      } catch {
        // keep going
      }
    }
    if (gen !== this._gen) return;

    this._cardElements = staged;
    this._structureSig = structureSignature;
    this._renderedCards = rows
      .map((r) => staged.get(r.entry.entity_id)?.el)
      .filter((el): el is HTMLElement => Boolean(el));
    this.requestUpdate();
  }

  public async openEditor(): Promise<void> {
    if (!this.hass || !this._config?.pref_key) return;
    const items = this._candidates().map((entry) => ({
      id: entry.entity_id,
      name: stateNameOf(this.hass, entry, this.hass?.states[entry.entity_id]),
      meta: `${this._registry?.areaMap?.get(areaOf(entry, this._registry) || "")?.name || "Household"} · ${domainOf(entry.entity_id)}`,
      icon: this._isCameraOwner(entry)
        ? "mdi:cctv"
        : this.hass?.states[entry.entity_id]?.attributes?.icon ||
          "mdi:gesture-tap",
    }));
    const prefs = applyPrefs(items, this._prefs);
    const newPrefs: UserPreferences = {
      order: prefs.all.map((i) => i.id),
      hidden: [...prefs.hidden],
    };
    this._prefs = newPrefs;
    await savePrefs(this.hass, this._config.pref_key, newPrefs);
    this._structureSig = "";
    void this._syncCards();
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const isSep = this._config.header_style === "separator";
    const showHeader = this._config.show_header !== false;
    const hasCards = this._renderedCards.length > 0;

    return html`
      <ha-card>
        ${
          showHeader
            ? html`
                <div class="head ${isSep ? "sep" : ""}">
                  <span class="heading">
                    <ha-icon
                      icon="${this._config.icon || "mdi:tune-variant"}"
                    ></ha-icon>
                    <h2>${this._config.title || "Controls"}</h2>
                  </span>
                  ${
                    this._config.editable
                      ? html`
                          <button
                            class="edit"
                            type="button"
                            aria-label="Edit"
                            @click=${() => this.openEditor()}
                          >
                            <ha-icon icon="mdi:dots-horizontal"></ha-icon>
                          </button>
                        `
                      : ""
                  }
                </div>
              `
            : ""
        }

        <div class="body">
          ${
            !hasCards
              ? html`
                  <div class="empty">
                    <ha-icon
                      icon="${this._config.mode === "active" ? "mdi:check-circle-outline" : "mdi:gesture-tap"}"
                    ></ha-icon>
                    <span>
                      ${this._config.mode === "active" ? "Everything is quiet" : "No controls available"}
                    </span>
                  </div>
                `
              : this._renderedCards
          }
        </div>
      </ha-card>
    `;
  }
}

registerCard({
  type: "component-smart-collection-v3",
  element: ComponentSmartCollectionV3,
  name: "Smart Control Collection V3",
  description:
    "Stable registry-driven household controls without refresh teardown.",
});
