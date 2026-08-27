export * from "./status-row-card.types";
import type { StatusRowCardConfig } from "./status-row-card.types";
export * from "./status-row-card.styles";
import { statusRowCardStyles } from "./status-row-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import { interaction, InteractionHandle } from "../../utils/interaction";
import { registerCard } from "../../utils/registration";

const DEFAULTS: StatusRowCardConfig = {
  type: "custom:component-status-row-v2",
  title: "Status title",
  description: "Supporting description",
  status_value: "Active",
  status_label: "Current state",
  icon: "mdi:information-outline",
  interactive: true,
  entity: null,
  navigation_path: null,
};

@customElement("component-status-row-v2")
export class ComponentStatusRowV2 extends LitBaseCard<StatusRowCardConfig> {
  private _interactionHandle: InteractionHandle | null = null;

  public static override styles: CSSResultGroup = statusRowCardStyles;

  public override setConfig(config: StatusRowCardConfig): void {
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

  public override disconnectedCallback(): void {
    this._interactionHandle?.destroy();
    this._interactionHandle = null;
    super.disconnectedCallback();
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const action = this._getAction();

    const inner = html`
      <div class="wrap">
        <span class="icon">
          <ha-icon icon="${this.esc(this._config.icon)}"></ha-icon>
        </span>
        <div>
          <div class="title">${this.esc(this._config.title)}</div>
          <div class="desc">${this.esc(this._config.description)}</div>
        </div>
        <div class="status">
          <b>${this.esc(this._config.status_value)}</b>
          <span>${this.esc(this._config.status_label)}</span>
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
  type: "component-status-row-v2",
  element: ComponentStatusRowV2,
  name: "Status Row",
  description: "Reusable status row component.",
});
