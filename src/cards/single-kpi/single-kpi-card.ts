export * from "./single-kpi-card.types";
import type { SingleKpiCardConfig } from "./single-kpi-card.types";
export * from "./single-kpi-card.styles";
import { singleKpiCardStyles } from "./single-kpi-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import { interaction, InteractionHandle } from "../../utils/interaction";
import { registerCard } from "../../utils/registration";

import {
  computeEntityDisplayName,
  formatEntityState,
} from "../../utils/entity";

const DEFAULTS: SingleKpiCardConfig = {

  type: "custom:component-single-kpi-v2",
  value: "00",
  label: "Primary metric",
  support_value: "00",
  support_label: "Supporting context",
  interactive: true,
  entity: null,
  navigation_path: null,
};

@customElement("component-single-kpi-v2")
export class ComponentSingleKpiV2 extends LitBaseCard<SingleKpiCardConfig> {
  private _interactionHandle: InteractionHandle | null = null;

  public static override styles: CSSResultGroup = singleKpiCardStyles;

  public override setConfig(config: SingleKpiCardConfig): void {
    super.setConfig({ ...DEFAULTS, ...config });
  }

  public override getCardSize(): number {
    return 2;
  }

  private _getAction(): (() => void) | null {
    if (!this._config || this._config.interactive === false) return null;
    if (this._config.navigation_path)
      return () => this.navigate(this._config?.navigation_path);
    if (this._config.entity) return () => this.moreInfo(this._config?.entity);
    return null;
  }

  protected override updated(): void {
    const action = this._getAction();
    const btn = this.renderRoot.querySelector(
      "button.demo",
    ) as HTMLElement | null;
    if (action && btn) {
      this._interactionHandle?.destroy();
      this._interactionHandle = interaction(btn, {
        primary: action,
        feedback: true,
      });
    } else {
      this._interactionHandle?.destroy();
      this._interactionHandle = null;
    }
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.requestUpdate();
  }

  public override disconnectedCallback(): void {
    this._interactionHandle?.destroy();
    this._interactionHandle = null;
    super.disconnectedCallback();
  }

  protected override shouldUpdate(changedProperties: Map<string | number | symbol, unknown>): boolean {
    if (this._config?.entity) {
      return super.shouldUpdate(changedProperties);
    }
    if (changedProperties.size === 1 && changedProperties.has("hass")) {
      return false;
    }
    return super.shouldUpdate(changedProperties);
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const action = this._getAction();
    const entity = this._config.entity ? this.hass?.states[this._config.entity] : null;
    const value = entity && this._config.value === "00"
      ? formatEntityState(entity, this.hass)
      : (this._config.value || "00");
    const label = entity && this._config.label === "Primary metric"
      ? computeEntityDisplayName({ state: entity })
      : (this._config.label || "Primary metric");
    const supportValue = this._config.support_value || "";
    const supportLabel = this._config.support_label || "";

    const ariaLabel = `${label}: ${value}${supportValue || supportLabel ? `. ${supportValue} ${supportLabel}` : ""}`;

    const inner = html`
      <div class="kpi-row">
        <div>
          <div class="kpi-metric-lg value">${this.esc(value)}</div>
          <div class="label-sub label">${this.esc(label)}</div>
        </div>
        ${
          supportValue || supportLabel
            ? html`
                <div class="support">
                  <b>${this.esc(supportValue)}</b>
                  ${this.esc(supportLabel)}
                </div>
              `
            : ""
        }
      </div>
    `;

    return html`
      <ha-card class="assembled-card">
        ${
          action
            ? html`<button class="demo" type="button" aria-label="${this.esc(ariaLabel)}">${inner}</button>`
            : html`<div class="demo-static">${inner}</div>`
        }
      </ha-card>
    `;
  }
}


registerCard({
  type: "component-single-kpi-v2",
  element: ComponentSingleKpiV2,
  name: "Single KPI",
  description: "Reusable single KPI component.",
});
