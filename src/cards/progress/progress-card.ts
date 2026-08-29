export * from "./progress-card.types";
import type { ProgressCardConfig } from "./progress-card.types";
export * from "./progress-card.styles";
import { progressCardStyles } from "./progress-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import { interaction, InteractionHandle } from "../../utils/interaction";
import {
  computeEntityDisplayName,
  formatEntityState,
} from "../../utils/entity";
import { registerCard } from "../../utils/registration";

const DEFAULTS: ProgressCardConfig = {
  type: "custom:component-progress-v2",
  value: "68%",
  label: "Progress metric",
  progress: 68,
  target_value: "100%",
  target_label: "Target",
  entity: null,
  navigation_path: null,
};

@customElement("component-progress-v2")
export class ComponentProgressV2 extends LitBaseCard<ProgressCardConfig> {
  private _interactionHandle: InteractionHandle | null = null;

  public static override styles: CSSResultGroup = progressCardStyles;

  public override setConfig(config: ProgressCardConfig): void {
    super.setConfig({ ...DEFAULTS, ...config });
  }

  public override getCardSize(): number {
    return 2;
  }

  private _getAction(): (() => void) | null {
    if (!this._config) return null;
    if (this._config.navigation_path)
      return () => this.navigate(this._config?.navigation_path);
    if (this._config.entity) return () => this.moreInfo(this._config?.entity);
    return null;
  }

  protected override updated(): void {
    const action = this._getAction();
    const progressCard = this.renderRoot.querySelector(".progress-card") as HTMLElement | null;
    if (action && progressCard) {
      this._interactionHandle?.destroy();
      this._interactionHandle = interaction(progressCard, {
        primary: action,
        feedback: true,
      });
    } else {
      this._interactionHandle?.destroy();
      this._interactionHandle = null;
    }
  }

  public override disconnectedCallback(): void {
    this._interactionHandle?.destroy();
    this._interactionHandle = null;
    super.disconnectedCallback();
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const action = this._getAction();
    const entity = this._config.entity ? this.hass?.states[this._config.entity] : null;
    const label = entity && this._config.label === "Progress metric"
      ? computeEntityDisplayName({ state: entity })
      : (this._config.label || "Progress metric");
    const value = entity && this._config.value === "68%"
      ? formatEntityState(entity, this.hass)
      : (this._config.value || "68%");

    let p = Math.min(100, Math.max(0, Number(this._config.progress) || 0));
    if (entity && this._config.progress === 68) {
      const num = parseFloat(entity.state);
      if (!isNaN(num)) p = Math.min(100, Math.max(0, num));
    }

    const ariaLabel = `${label}: ${value}. ${this._config.target_label || "Target"}: ${this._config.target_value || "100%"}`;

    return html`
      <ha-card class="assembled-card">
        <div
          class="progress-card ${action ? "actionable" : ""}"
          role="${action ? "button" : "region"}"
          tabindex="${action ? "0" : "-1"}"
          aria-label="${this.esc(ariaLabel)}"
        >
          <div class="progress-head">
            <div>
              <div class="kpi-metric-lg">${this.esc(value)}</div>
              <div class="label-sub">${this.esc(label)}</div>
            </div>
            <div class="label-sub target">
              <b>${this.esc(this._config.target_value)}</b>
              ${this.esc(this._config.target_label)}
            </div>
          </div>
          <div
            class="determinate-progress"
            role="progressbar"
            aria-valuenow="${p}"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label="${this.esc(label)}"
          >
            <div class="determinate-fill" style="width:${p}%"></div>
          </div>
        </div>
      </ha-card>
    `;
  }
}


registerCard({
  type: "component-progress-v2",
  element: ComponentProgressV2,
  name: "Progress / Target",
  description: "Reusable progress and target component.",
});
