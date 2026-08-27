export * from "./metric-badge-card.types";
import type { HaMetricBadgeConfig } from "./metric-badge-card.types";
export * from "./metric-badge-card.styles";
import { metricBadgeCardStyles } from "./metric-badge-card.styles";
import { CSSResultGroup, html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { HaBaseCard } from "../../components/base/lit-base-card";
import {
  computeDomain,
  computeEntityName,
  formatEntityState,
  getDefaultIconForDomain,
  handleAction,
} from "../../utils/entity";

@customElement("ha-metric-badge")
export class HaMetricBadge extends HaBaseCard<HaMetricBadgeConfig> {
  public static getStubConfig(): Record<string, unknown> {
    return {
      entity: "sensor.temperature",
      thresholds: [
        { value: 18, color: "#03a9f4" },
        { value: 24, color: "#4caf50" },
        { value: 28, color: "#ff9800" },
        { value: 35, color: "#f44336" },
      ],
    };
  }

  protected override validateConfig(config: HaMetricBadgeConfig): void {
    if (!config.entity) {
      throw new Error("Please define an entity for ha-metric-badge");
    }
  }

  public override getCardSize(): number {
    return 1;
  }

  private _handleTap(): void {
    if (!this.hass || !this.config) return;
    const tapAction = this.config.tap_action || { action: "more-info" };
    handleAction(this, this.hass, tapAction, this.config.entity);
  }

  private _computeColor(numericVal: number): string {
    if (!this.config?.thresholds || this.config.thresholds.length === 0) {
      return "var(--primary-color, #03a9f4)";
    }

    const sorted = [...this.config.thresholds].sort(
      (a, b) => a.value - b.value,
    );
    let matchedColor = sorted[0].color;

    for (const t of sorted) {
      if (numericVal >= t.value) {
        matchedColor = t.color;
      }
    }
    return matchedColor;
  }

  protected override render(): TemplateResult {
    if (!this.hass || !this.config?.entity) {
      return this.renderError("No entity configured for ha-metric-badge");
    }

    const entity = this.hass.states[this.config.entity];
    if (!entity) {
      return this.renderError(`Entity not found: ${this.config.entity}`);
    }

    const domain = computeDomain(this.config.entity);
    const entityName = this.config.name || computeEntityName(entity);
    const iconName =
      this.config.icon ||
      entity.attributes.icon ||
      getDefaultIconForDomain(domain, entity.state);
    const numVal = parseFloat(entity.state);
    const hasNumeric = !isNaN(numVal);
    const badgeColor = hasNumeric
      ? this._computeColor(numVal)
      : "var(--primary-color, #03a9f4)";
    const unit =
      this.config.unit || entity.attributes.unit_of_measurement || "";

    return html`
      <ha-card
        class="interactive metric-badge-card"
        tabindex="0"
        role="button"
        style="--badge-accent-color: ${badgeColor};"
        @click=${this._handleTap}
        @keydown=${(e: KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            this._handleTap();
          }
        }}
        aria-label="${entityName}: ${hasNumeric ? numVal : entity.state}${unit ? " " + unit : ""}"
        title="${entityName}: ${formatEntityState(entity, this.hass)}"
      >
        <div class="metric-body">
          <div class="icon-bubble">
            <ha-icon .icon=${iconName}></ha-icon>
          </div>
          <div class="metric-data">
            <div class="metric-value-line">
              <span class="value-text"
                >${hasNumeric ? numVal : entity.state}</span
              >
              ${unit ? html`<span class="unit-text">${unit}</span>` : ""}
            </div>
            <div class="metric-label" title=${entityName}>${entityName}</div>
          </div>
        </div>
      </ha-card>
    `;
  }

  public static override styles: CSSResultGroup = metricBadgeCardStyles;
}
