export * from "./smart-collection-card.types";
import type { SmartCollectionConfig } from "./smart-collection-card.types";
export * from "./smart-collection-card.styles";
import { smartCollectionCardStyles } from "./smart-collection-card.styles";
import { html, TemplateResult, CSSResultGroup, PropertyValues } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import type { HomeAssistant, LovelaceGridOptions } from "../../types/home-assistant";
import type { DashboardRegistries } from "../../types/registry";
import {
  centralRegistry,
  loadPrefs,
  savePrefs,
  createCardElement,
  UserPreferences,
} from "../../services/registry/dashboard-registry";
import {
  discoverControls,
  DiscoveredControlCard,
} from "../../services/discovery/discovery-engine";
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
  private _registryHass: HomeAssistant | null = null;

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
      void this._loadRegistry();
      void this._syncCards();
    }
  }

  public override getCardSize(): number {
    return 2;
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._bindRegistry();
    void this._loadRegistry();
    if (this._config?.pref_key) {
      this._loadPrefs();
    }
    void this._syncCards();
  }

  public override disconnectedCallback(): void {
    this._unbindRegistry();
    this._gen += 1;
    super.disconnectedCallback();
  }

  protected override willUpdate(changedProps: PropertyValues): void {
    super.willUpdate(changedProps);
    if (changedProps.has("hass") && changedProps.get("hass") !== this.hass) {
      this._registry = null;
      this._unbindRegistry();
    }
    if (changedProps.has("hass") && this.hass) {
      this._bindRegistry();
      for (const record of this._cardElements.values()) {
        (record.el as any).hass = this.hass;
      }
      void this._loadRegistry();
      void this._syncCards();
    }
  }

  private _bindRegistry(): void {
    if (!this.isConnected || !this.hass) return;
    if (this._registryHass === this.hass && this._unsubRegistry) return;

    this._unbindRegistry();
    const hass = this.hass;
    this._registryHass = hass;
    this._unsubRegistry = centralRegistry.subscribe(hass, (data) => {
      if (this.hass !== hass) return;
      this._registry = data;
      this._structureSig = "";
      void this._syncCards();
    });
  }

  private _unbindRegistry(): void {
    this._unsubRegistry?.();
    this._unsubRegistry = null;
    this._registryHass = null;
  }

  private async _loadRegistry(): Promise<void> {
    if (!this.hass) return;
    const hass = this.hass;
    try {
      const data = await centralRegistry.load(hass);
      if (this.hass !== hass) return;
      this._registry = data;
      void this._syncCards();
    } catch {
      // Keep the previous registry while Home Assistant reconnects.
    }
  }

  private async _loadPrefs(): Promise<void> {
    if (!this.hass || !this._config?.pref_key) return;
    this._prefs = await loadPrefs(this.hass, this._config.pref_key);
    this._structureSig = "";
    void this._syncCards();
  }

  private async _syncCards(): Promise<void> {
    if (!this.hass) return;
    const gen = ++this._gen;

    const discovered: DiscoveredControlCard[] = discoverControls(
      this.hass,
      this._registry,
      {
        mode: this._config?.mode,
        area_id: this._config?.area_id,
        exclude_device_names: this._config?.exclude_device_names,
        prefs: this._prefs,
      },
    );

    const structureSignature = JSON.stringify(
      discovered.map((r) => [r.entityId, r.signature]),
    );

    if (structureSignature === this._structureSig) {
      for (const record of this._cardElements.values()) {
        (record.el as any).hass = this.hass;
      }
      return;
    }

    const staged = new Map<string, { el: HTMLElement; sig: string }>();
    for (const item of discovered) {
      const existing = this._cardElements.get(item.entityId);
      if (existing && existing.sig === item.signature) {
        (existing.el as any).hass = this.hass;
        staged.set(item.entityId, existing);
        continue;
      }
      try {
        const element = await createCardElement(item.cardConfig, this.hass);
        if (gen !== this._gen) return;
        staged.set(item.entityId, { el: element, sig: item.signature });
      } catch {
        // Continue with other controls
      }
    }
    if (gen !== this._gen) return;

    this._cardElements = staged;
    this._structureSig = structureSignature;
    this._renderedCards = discovered
      .map((r) => staged.get(r.entityId)?.el)
      .filter((el): el is HTMLElement => Boolean(el));
    this.requestUpdate();
  }

  public async openEditor(): Promise<void> {
    if (!this.hass || !this._config?.pref_key) return;
    const currentList = discoverControls(this.hass, this._registry, {
      mode: this._config?.mode,
      area_id: this._config?.area_id,
      exclude_device_names: this._config?.exclude_device_names,
    });
    const newPrefs: UserPreferences = {
      order: currentList.map((i) => i.entityId),
      hidden: [...this._prefs.hidden],
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
