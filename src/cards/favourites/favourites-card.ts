export * from "./favourites-card.types";
import type { FavouriteRef, FavouritesConfig } from "./favourites-card.types";
export * from "./favourites-card.styles";
import { favouritesCardStyles } from "./favourites-card.styles";
import { html, TemplateResult, CSSResultGroup, PropertyValues } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import type {
  LovelaceGridOptions,
  EntityRegistryEntry,
  DeviceRegistryEntry,
  HomeAssistant,
} from "../../types/home-assistant";
import type { DashboardRegistries } from "../../types/registry";
import { centralRegistry } from "../../services/registry/dashboard-registry";
import { interaction, InteractionHandle } from "../../utils/interaction";
import { runServiceAction } from "../../utils/entity";
import { registerCard } from "../../utils/registration";

const INVALID_STATES = new Set(["unavailable", "unknown"]);

@customElement("component-favourites-v3")
export class ComponentFavouritesV3 extends LitBaseCard<FavouritesConfig> {
  public static stubConfig = { helpers: [], max: 4, title: "Favourites" };

  @state()
  private _selected: FavouriteRef[] = [];

  @state()
  private _registry: {
    entities: EntityRegistryEntry[];
    devices: Map<string, DeviceRegistryEntry>;
    areas: Map<string, string>;
    byKey: Map<string, EntityRegistryEntry>;
    byDevice: Map<string, EntityRegistryEntry[]>;
  } | null = null;

  private _interactionHandles: InteractionHandle[] = [];

  public static override getGridOptions(): LovelaceGridOptions {
    return { columns: 12, rows: "auto" };
  }

  public static override styles: CSSResultGroup = favouritesCardStyles;

  public override setConfig(config: FavouritesConfig): void {
    const helpers = Array.isArray(config?.helpers)
      ? config.helpers.filter((t) => typeof t === "string")
      : [];
    const items = Array.isArray(config?.items) ? config.items.slice(0, 4) : [];
    const prefKey = String(config?.preference_key || "").trim();

    super.setConfig({
      title: "Favourites",
      max: 4,
      show_header: helpers.length > 0 || Boolean(prefKey),
      ...(config || {}),
      helpers: prefKey ? [] : helpers.slice(0, 4),
      items,
      preference_key: prefKey || null,
    });

    this._loadBackendFavourites();
    this._ensureRegistry();
  }

  public override getCardSize(): number {
    return 2;
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._subscribeRegistryEvents();
    this._ensureRegistry();
    this._loadBackendFavourites();
  }

  public override disconnectedCallback(): void {
    this._unsubscribeRegistryEvents();
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];
    super.disconnectedCallback();
  }

  protected override willUpdate(changedProps: PropertyValues): void {
    super.willUpdate(changedProps);
    if (changedProps.has("hass") && changedProps.get("hass") !== this.hass) {
      this._registry = null;
      this._unsubscribeRegistryEvents();
    }
    if (changedProps.has("hass") && this.hass) {
      this._subscribeRegistryEvents();
      void this._ensureRegistry();
      if (this._config?.helpers?.length && !this._config?.preference_key) {
        this._loadBackendFavourites();
      }
    }
  }

  private _unsubRegistry: (() => void) | null = null;
  private _registryHass: HomeAssistant | null = null;

  private _subscribeRegistryEvents(): void {
    if (!this.isConnected || !this.hass) {
      return;
    }
    if (this._registryHass === this.hass && this._unsubRegistry) return;

    this._unsubscribeRegistryEvents();
    const hass = this.hass;
    this._registryHass = hass;
    this._unsubRegistry = centralRegistry.subscribe(hass, (data) => {
      if (this.hass === hass) this._buildRegistryIndex(data);
    });
  }

  private _unsubscribeRegistryEvents(): void {
    this._unsubRegistry?.();
    this._unsubRegistry = null;
    this._registryHass = null;
  }

  private async _loadBackendFavourites(_force = false): Promise<void> {
    if (!this.hass || !this._config?.preference_key) {
      if (this._config?.helpers?.length) {
        this._selected = this._config.helpers
          .map((id) => this._parseSlot(this.hass?.states?.[id]?.state))
          .filter((item): item is FavouriteRef => Boolean(item));
      }
      return;
    }

    try {
      const prefsApi = (globalThis as any).__homeDashboardV2?.prefs;
      if (prefsApi) {
        const stored = await prefsApi(this.hass, this._config.preference_key);
        this._selected = Array.isArray(stored)
          ? stored
              .map((item) => this._normaliseRef(item))
              .filter((item): item is FavouriteRef => Boolean(item))
              .slice(0, this._config.max || 4)
          : [];
      }
    } catch {}
  }

  private _normaliseRef(t: any): FavouriteRef | null {
    return t &&
      typeof t === "object" &&
      [t.d, t.p, t.u].every((k) => typeof k === "string" && k)
      ? {
          v: 1,
          d: t.d,
          p: t.p,
          u: t.u,
          n: typeof t.n === "string" ? t.n.slice(0, 64) : "",
        }
      : null;
  }

  private _parseSlot(t: any): FavouriteRef | null {
    if (!t || INVALID_STATES.has(String(t).toLowerCase())) return null;
    try {
      return this._normaliseRef(JSON.parse(t));
    } catch {
      return null;
    }
  }

  private _buildRegistryIndex(data: DashboardRegistries): void {
    const s = data.entities || [];
    const r = data.devices || [];
    const a = data.areas || [];
    const o = new Map<string, EntityRegistryEntry>();
    const n = new Map<string, EntityRegistryEntry[]>();

    for (const ent of s) {
      const k = this._entryKey(ent);
      if (k) o.set(k, ent);
      if (ent.device_id) {
        if (!n.has(ent.device_id)) n.set(ent.device_id, []);
        n.get(ent.device_id)!.push(ent);
      }
    }

    this._registry = {
      entities: s,
      devices: new Map(r.map((d) => [d.id, d])),
      areas: new Map(a.map((ar) => [ar.area_id, ar.name])),
      byKey: o,
      byDevice: n,
    };
  }

  private async _ensureRegistry(force = false): Promise<void> {
    if (!this.hass) return;
    if (this._registry && !force) return;
    const hass = this.hass;
    try {
      const data = await centralRegistry.load(hass, force);
      if (this.hass === hass) this._buildRegistryIndex(data);
    } catch {
      // Keep existing
    }
  }

  private _entryKey(t: EntityRegistryEntry): string | null {
    return t?.entity_id && t.platform && t.unique_id
      ? `${this._domain(t.entity_id)}|${t.platform}|${t.unique_id}`
      : null;
  }

  private _refKey(t: FavouriteRef): string {
    return t ? `${t.d}|${t.p}|${t.u}` : "";
  }

  private _domain(t?: string): string {
    return String(t || "").split(".")[0];
  }

  private _record(t: FavouriteRef) {
    const e = this._registry?.byKey.get(this._refKey(t)) || null;
    return {
      ref: t,
      entry: e,
      state: (e && this.hass?.states?.[e.entity_id]) || null,
    };
  }

  private _name(t: {
    ref: FavouriteRef;
    entry: EntityRegistryEntry | null;
    state: any;
  }): string {
    return (
      t.ref?.n?.trim() ||
      t.entry?.name ||
      t.entry?.original_name ||
      t.state?.attributes?.friendly_name ||
      t.entry?.entity_id ||
      "Favourite not found"
    );
  }

  private _icon(t: {
    ref: FavouriteRef;
    entry: EntityRegistryEntry | null;
    state: any;
  }): string {
    if (t.state?.attributes?.icon) return t.state.attributes.icon;
    const d = t.entry ? this._domain(t.entry.entity_id) : t.ref?.d;
    const map: Record<string, string> = {
      automation: "mdi:robot-outline",
      button: "mdi:gesture-tap-button",
      climate: "mdi:thermostat",
      cover: "mdi:window-shutter",
      fan: "mdi:fan",
      humidifier: "mdi:air-humidifier",
      input_boolean: "mdi:toggle-switch-outline",
      input_button: "mdi:gesture-tap-button",
      light: "mdi:lightbulb-outline",
      lock: "mdi:lock-outline",
      media_player: "mdi:play-circle-outline",
      scene: "mdi:palette-outline",
      script: "mdi:script-text-outline",
      select: "mdi:format-list-bulleted",
      switch: "mdi:toggle-switch-outline",
      vacuum: "mdi:robot-vacuum",
      water_heater: "mdi:water-boiler",
    };
    return map[d || ""] || "mdi:star-outline";
  }

  private _stateLabel(t: {
    ref: FavouriteRef;
    entry: EntityRegistryEntry | null;
    state: any;
  }): string {
    if (!t.entry || !t.state) return "Not found";
    if (t.state.state === "unavailable") return "Unavailable";
    if (t.state.state === "unknown") return "Status unknown";
    const dom = this._domain(t.entry.entity_id);
    if (["button", "input_button"].includes(dom)) return "Tap to run";
    if (["automation", "script"].includes(dom)) return "Tap to start";
    if (dom === "scene") return "Tap to activate";
    if (dom === "media_player") {
      const title = t.state.attributes?.media_title;
      const st = this._label(t.state.state);
      return title ? `${st} · ${title}` : st;
    }
    return this._label(t.state.state);
  }

  private _label(t?: string): string {
    return String(t ?? "")
      .replaceAll("_", " ")
      .replace(/^./, (c) => c.toUpperCase());
  }

  private _isActive(t: {
    ref: FavouriteRef;
    entry: EntityRegistryEntry | null;
    state: any;
  }): boolean {
    if (!t.state || INVALID_STATES.has(String(t.state.state).toLowerCase()))
      return false;
    const dom = this._domain(t.entry?.entity_id);
    if (["light", "switch", "fan", "input_boolean"].includes(dom)) {
      return t.state.state === "on";
    }
    if (dom === "media_player") {
      return ["playing", "paused", "buffering", "on"].includes(t.state.state);
    }
    if (dom === "climate") return t.state.state !== "off";
    if (dom === "cover") return t.state.state !== "closed";
    if (dom === "lock") return t.state.state === "unlocked";
    return false;
  }

  private async _activate(index: number): Promise<void> {
    const item = this._selected[index];
    if (!item) return;
    const rec = this._record(item);
    if (!rec.entry || !rec.state) return;

    const entityId = rec.entry.entity_id;
    const dom = this._domain(entityId);

    if (["light", "switch", "fan", "input_boolean"].includes(dom)) {
      if (!this.hass) return;
      await runServiceAction(this.hass, {
        domain: "homeassistant",
        service: "toggle",
        target: { entity_id: entityId },
      });
    } else if (["automation", "script", "scene"].includes(dom)) {
      const srv = dom === "automation" ? "trigger" : "turn_on";
      if (!this.hass) return;
      await runServiceAction(this.hass, {
        domain: dom,
        service: srv,
        target: { entity_id: entityId },
      });
    } else if (["button", "input_button"].includes(dom)) {
      if (!this.hass) return;
      await runServiceAction(this.hass, {
        domain: dom,
        service: "press",
        target: { entity_id: entityId },
      });
    } else {
      this.moreInfo(entityId);
    }
  }

  protected override updated(): void {
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];

    const items = this.renderRoot.querySelectorAll(".item button.main");
    items.forEach((btn, idx) => {
      const rec = this._record(this._selected[idx]);
      this._interactionHandles.push(
        interaction(btn as HTMLElement, {
          primary: () => this._activate(idx),
          hold: () => {
            if (rec.entry?.entity_id) this.moreInfo(rec.entry.entity_id);
          },
          feedback: true,
        }),
      );
    });
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const demoItems = this._config.items || [];
    if (
      demoItems.length > 0 &&
      !(this._config.helpers?.length || this._config.preference_key)
    ) {
      return html`
        <ha-card>
          <div class="wrap">
            <div class="grid">
              ${demoItems.map(
                (item) => html`
                  <div class="item">
                    <button class="main" type="button">
                      <span class="icon">
                        <ha-icon
                          icon="${item.icon || "mdi:star-outline"}"
                        ></ha-icon>
                      </span>
                      <span class="copy">
                        <div class="name">${item.title || "Favourite"}</div>
                        <div class="state">
                          ${item.state || "Supporting state"}
                        </div>
                      </span>
                    </button>
                  </div>
                `,
              )}
            </div>
          </div>
        </ha-card>
      `;
    }

    return html`
      <ha-card>
        <div class="wrap">
          ${
            this._config.show_header !== false
              ? html`
                  <div class="head">
                    <div class="heading">
                      <ha-icon icon="mdi:star-outline"></ha-icon>
                      <h2>${this._config.title || "Favourites"}</h2>
                    </div>
                    <button
                      class="edit"
                      type="button"
                      aria-label="Edit favourites"
                    >
                      <ha-icon icon="mdi:pencil-outline"></ha-icon>
                      <span>Edit</span>
                    </button>
                  </div>
                `
              : ""
          }

          <div class="grid">
            ${
              this._selected.length === 0
                ? html`<div class="empty">
                    Add up to four everyday controls here.
                  </div>`
                : this._selected.map((item) => {
                    const rec = this._record(item);
                    const name = this._name(rec);
                    const stateLabel = this._stateLabel(rec);
                    const icon = this._icon(rec);
                    const active = this._isActive(rec);
                    const unavailable =
                      !rec.state ||
                      INVALID_STATES.has(String(rec.state.state).toLowerCase());

                    return html`
                      <div
                        class="item ${active ? "active" : ""} ${unavailable ? "unavailable" : ""}"
                      >
                        <button
                          class="main"
                          type="button"
                          ?disabled=${unavailable}
                          aria-label="${name}: ${stateLabel}"
                        >
                          <span class="icon">
                            <ha-icon icon="${icon}"></ha-icon>
                          </span>
                          <span class="copy">
                            <div class="name">${name}</div>
                            <div class="state">${stateLabel}</div>
                          </span>
                        </button>
                      </div>
                    `;
                  })
            }
          </div>
        </div>
      </ha-card>
    `;
  }
}

registerCard({
  type: "component-favourites-v3",
  element: ComponentFavouritesV3,
  name: "Favourites V3",
  description:
    "Stable household favourites with entity discovery and backend companion storage.",
});
