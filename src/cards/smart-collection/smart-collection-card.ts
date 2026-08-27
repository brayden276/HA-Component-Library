export * from "./smart-collection-card.types";
import type { SmartCollectionConfig } from "./smart-collection-card.types";
export * from "./smart-collection-card.styles";
import { smartCollectionCardStyles } from "./smart-collection-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import type {
  LovelaceGridOptions,
  EntityRegistryEntry,
} from "../../types/home-assistant";
import type { DashboardRegistries } from "../../types/registry";
import { centralRegistry } from "../../services/registry/dashboard-registry";
import { computeDomain, isEntityActive } from "../../utils/entity";
import { registerCard } from "../../utils/registration";
import "../control-row/control-row-card";

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

  private _unsubRegistry: (() => void) | null = null;

  public static override styles: CSSResultGroup = smartCollectionCardStyles;

  public override setConfig(config: SmartCollectionConfig): void {
    super.setConfig({ ...DEFAULTS, ...config });
    if (this.hass) {
      centralRegistry.load(this.hass).then((data) => {
        this._registry = data;
      });
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
      });
    }
  }

  public override disconnectedCallback(): void {
    this._unsubRegistry?.();
    this._unsubRegistry = null;
    super.disconnectedCallback();
  }

  protected override willUpdate(): void {
    if (!this._registry && this.hass) {
      centralRegistry.load(this.hass).then((data) => {
        this._registry = data;
      });
    }
  }

  private _candidates(): EntityRegistryEntry[] {
    if (!this._registry || !this.hass) return [];
    const mode = this._config?.mode || "all";
    const areaId = this._config?.area_id;

    return this._registry.entities.filter((entry) => {
      if (entry.disabled_by || entry.hidden_by) return false;
      const state = this.hass?.states[entry.entity_id];
      if (!state) return false;

      const domain = computeDomain(entry.entity_id);
      if (mode === "area") {
        const entArea =
          entry.area_id ||
          (entry.device_id
            ? this._registry?.deviceArea?.get(entry.device_id)
            : null);
        return entArea === areaId;
      }
      if (mode === "media") return domain === "media_player";
      if (mode === "active") {
        return isEntityActive(state);
      }
      return [
        "light",
        "switch",
        "fan",
        "cover",
        "climate",
        "media_player",
        "lock",
      ].includes(domain);
    });
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const candidates = this._candidates();
    const isSep = this._config.header_style === "separator";
    const showHeader = this._config.show_header !== false;

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
                          <button class="edit" type="button" aria-label="Edit">
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
            candidates.length === 0
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
              : candidates.map(
                  (entry) => html`
                    <component-control-row-v2
                      .hass=${this.hass}
                      .config=${{
                        type: "custom:component-control-row-v2",
                        entity: entry.entity_id,
                        title:
                          entry.name ||
                          entry.original_name ||
                          this.hass?.states[entry.entity_id]?.attributes
                            ?.friendly_name ||
                          entry.entity_id,
                        name:
                          entry.name ||
                          entry.original_name ||
                          this.hass?.states[entry.entity_id]?.attributes
                            ?.friendly_name ||
                          entry.entity_id,
                      }}
                    ></component-control-row-v2>
                  `,
                )
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
