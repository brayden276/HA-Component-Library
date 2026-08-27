export * from "./empty-state-card.types";
import type { EmptyStateCardConfig } from "./empty-state-card.types";
export * from "./empty-state-card.styles";
import { emptyStateCardStyles } from "./empty-state-card.styles";
import { html, css, TemplateResult, CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import { dashboardBaseCardStyles } from "../../utils/styles";
import { registerCard } from "../../utils/registration";

const DEFAULTS_V3: EmptyStateCardConfig = {
  type: "custom:component-empty-state-v3",
  icon: "mdi:check-circle-outline",
  title: "Nothing requires attention",
  message: "Supporting empty-state message.",
};

@customElement("component-empty-state-v3")
export class ComponentEmptyStateV3 extends LitBaseCard<EmptyStateCardConfig> {
  public static override styles: CSSResultGroup = emptyStateCardStyles;

  public override setConfig(config: EmptyStateCardConfig): void {
    super.setConfig({ ...DEFAULTS_V3, ...config });
  }

  public override getCardSize(): number {
    return 1;
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;

    return html`
      <ha-card>
        <div class="wrap">
          <span class="icon">
            <ha-icon icon="${this.esc(this._config.icon)}"></ha-icon>
          </span>
          <span>
            <div class="title">${this.esc(this._config.title)}</div>
            <div class="desc">${this.esc(this._config.message)}</div>
          </span>
        </div>
      </ha-card>
    `;
  }
}

registerCard({
  type: "component-empty-state-v3",
  element: ComponentEmptyStateV3,
  name: "Empty State",
  description: "Reusable empty-state component.",
});

const DEFAULTS_V2: EmptyStateCardConfig = {
  type: "custom:component-empty-state-v2",
  icon: "mdi:check-circle-outline",
  title: "Nothing requires attention",
  message: "Supporting empty-state message.",
};

@customElement("component-empty-state-v2")
export class ComponentEmptyStateV2 extends LitBaseCard<EmptyStateCardConfig> {
  public static override styles: CSSResultGroup = [
    dashboardBaseCardStyles,
    css`
      ha-card {
        border: 0;
        background: transparent;
        box-shadow: none;
      }
      .wrap {
        min-height: 40px;
        padding: 0 2px;
        display: grid;
        grid-template-columns: 24px minmax(0, 1fr);
        align-items: center;
        gap: 8px;
      }
      .icon {
        width: 24px;
        height: 24px;
        display: grid;
        place-items: center;
        background: transparent;
        color: var(--primary-color);
      }
      .icon ha-icon {
        --mdc-icon-size: 18px;
      }
      .desc {
        margin-top: 1px;
        font-size: 12px;
        line-height: 1.3;
      }
    `,
  ];

  public override setConfig(config: EmptyStateCardConfig): void {
    super.setConfig({ ...DEFAULTS_V2, ...config });
  }

  public override getCardSize(): number {
    return 1;
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;

    return html`
      <ha-card>
        <div class="wrap">
          <span class="icon">
            <ha-icon icon="${this.esc(this._config.icon)}"></ha-icon>
          </span>
          <span>
            <div class="title">${this.esc(this._config.title)}</div>
            <div class="desc">${this.esc(this._config.message)}</div>
          </span>
        </div>
      </ha-card>
    `;
  }
}

registerCard({
  type: "component-empty-state-v2",
  element: ComponentEmptyStateV2,
  name: "Empty State V2",
  description: "Reusable compact empty-state component.",
});
