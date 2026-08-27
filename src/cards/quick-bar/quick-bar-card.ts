export * from "./quick-bar-card.types";
import type {
  QuickBarEntityConfig,
  HaQuickBarConfig,
} from "./quick-bar-card.types";
export * from "./quick-bar-card.styles";
import { quickBarCardStyles } from "./quick-bar-card.styles";
import { CSSResultGroup, html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { HaBaseCard } from "../../components/base/lit-base-card";
import {
  computeDomain,
  computeEntityName,
  getDefaultIconForDomain,
  isEntityActive,
  handleAction,
} from "../../utils/entity";

@customElement("ha-quick-bar")
export class HaQuickBar extends HaBaseCard<HaQuickBarConfig> {
  public static getStubConfig(): Record<string, unknown> {
    return {
      title: "Quick Controls",
      entities: [
        "light.living_room",
        "switch.coffee_maker",
        "climate.thermostat",
      ],
      show_active_count: true,
    };
  }

  protected override validateConfig(config: HaQuickBarConfig): void {
    if (
      !config.entities ||
      !Array.isArray(config.entities) ||
      config.entities.length === 0
    ) {
      throw new Error(
        "Please specify at least one entity in entities list for ha-quick-bar",
      );
    }
  }

  public override getCardSize(): number {
    return 1;
  }

  private _handleEntityTap(entConf: QuickBarEntityConfig): void {
    if (!this.hass) return;
    const action = entConf.tap_action || { action: "toggle" };
    handleAction(this, this.hass, action, entConf.entity);
  }

  protected override render(): TemplateResult {
    if (!this.hass || !this.config?.entities) {
      return this.renderError("No entities configured for ha-quick-bar");
    }

    const normalizedEntities: QuickBarEntityConfig[] = this.config.entities.map(
      (item) => (typeof item === "string" ? { entity: item } : item),
    );

    let activeCount = 0;
    normalizedEntities.forEach((ent) => {
      const stateObj = this.hass?.states[ent.entity];
      if (stateObj && isEntityActive(stateObj)) {
        activeCount++;
      }
    });

    return html`
      <ha-card>
        ${
          this.config.title || this.config.show_active_count
            ? html`
                <div class="card-header">
                  <span>${this.config.title || "Quick Controls"}</span>
                  ${
                    this.config.show_active_count !== false
                      ? html`
                          <span
                            class="active-badge ${activeCount > 0 ? "highlight" : ""}"
                          >
                            ${activeCount} Active
                          </span>
                        `
                      : ""
                  }
                </div>
              `
            : ""
        }

        <div class="bar-items-container">
          ${normalizedEntities.map((entConf) => {
            const stateObj = this.hass?.states[entConf.entity];
            const isActive = isEntityActive(stateObj);
            const domain = computeDomain(entConf.entity);
            const name = entConf.name || computeEntityName(stateObj);
            const icon =
              entConf.icon ||
              stateObj?.attributes?.icon ||
              getDefaultIconForDomain(domain, stateObj?.state);

            return html`
              <div
                class="quick-item interactive ${isActive ? "active" : ""}"
                @click=${() => this._handleEntityTap(entConf)}
                title="${name}: ${stateObj?.state || "unknown"}"
              >
                <div class="item-icon-circle ${isActive ? "active" : ""}">
                  <ha-icon .icon=${icon}></ha-icon>
                </div>
                <span class="item-label">${name}</span>
              </div>
            `;
          })}
        </div>
      </ha-card>
    `;
  }

  public static override styles: CSSResultGroup = quickBarCardStyles;
}
