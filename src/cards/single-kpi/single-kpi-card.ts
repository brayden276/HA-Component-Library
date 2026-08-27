export * from "./single-kpi-card.types";
import type { SingleKpiCardConfig } from "./single-kpi-card.types";
export * from "./single-kpi-card.styles";
import { singleKpiCardStyles } from "./single-kpi-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import { interaction, InteractionHandle } from "../../utils/interaction";
import { registerCard } from "../../utils/registration";

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
    if (changedProperties.size === 1 && changedProperties.has("hass")) {
      return false;
    }
    return super.shouldUpdate(changedProperties);
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const action = this._getAction();

    const inner = html`
      <div class="wrap">
        <div>
          <div class="value">${this.esc(this._config.value)}</div>
          <div class="label">${this.esc(this._config.label)}</div>
        </div>
        <div class="support">
          <b>${this.esc(this._config.support_value)}</b>
          ${this.esc(this._config.support_label)}
        </div>
      </div>
    `;

    return html`
      <ha-card>
        ${
          action
            ? html`<button class="demo" type="button">${inner}</button>`
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
