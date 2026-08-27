export * from "./action-card.types";
import type { ActionCardConfig } from "./action-card.types";
export * from "./action-card.styles";
import { actionCardStyles } from "./action-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import { interaction, InteractionHandle } from "../../utils/interaction";
import { registerCard } from "../../utils/registration";

const DEFAULTS: ActionCardConfig = {
  type: "custom:component-action-v2",
  title: "Action title",
  description: "What this action will do",
  action_text: "Open",
  icon: "mdi:gesture-tap-button",
  navigation_path: null,
  entity: null,
  more_info_entity: null,
};

@customElement("component-action-v2")
export class ComponentActionV2 extends LitBaseCard<ActionCardConfig> {
  private _interactionHandle: InteractionHandle | null = null;

  public static override styles: CSSResultGroup = actionCardStyles;

  public override setConfig(config: ActionCardConfig): void {
    super.setConfig({ ...DEFAULTS, ...config });
  }

  public override getCardSize(): number {
    return 2;
  }

  private _getActions(): {
    primary: (() => void) | null;
    hold: (() => void) | null;
  } {
    if (!this._config) return { primary: null, hold: null };
    const entity = this._config.more_info_entity || this._config.entity || null;
    const path = this._config.navigation_path || null;
    return {
      primary: path
        ? () => this.navigate(path)
        : entity
          ? () => this.moreInfo(entity)
          : null,
      hold: path && entity ? () => this.moreInfo(entity) : null,
    };
  }

  protected override updated(): void {
    const actions = this._getActions();
    const btn = this.renderRoot.querySelector(
      "button.demo",
    ) as HTMLElement | null;
    if (actions.primary && btn) {
      this._interactionHandle?.destroy();
      this._interactionHandle = interaction(btn, {
        primary: actions.primary,
        hold: actions.hold || undefined,
        optimistic: false,
        repeat: false,
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
    const actions = this._getActions();

    const inner = html`
      <div class="wrap">
        <span class="icon">
          <ha-icon icon="${this.esc(this._config.icon)}"></ha-icon>
        </span>
        <span>
          <div class="title">${this.esc(this._config.title)}</div>
          <div class="desc">${this.esc(this._config.description)}</div>
        </span>
        <span class="action">${this.esc(this._config.action_text)}</span>
      </div>
    `;

    return html`
      <ha-card>
        ${
          actions.primary
            ? html`<button class="demo" type="button">${inner}</button>`
            : html`<div class="demo-static">${inner}</div>`
        }
      </ha-card>
    `;
  }
}

registerCard({
  type: "component-action-v2",
  element: ComponentActionV2,
  name: "Action Card",
  description: "Reusable navigation and more-info action card.",
});
