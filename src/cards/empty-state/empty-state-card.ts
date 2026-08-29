export * from "./empty-state-card.types";
import type { EmptyStateCardConfig } from "./empty-state-card.types";
export * from "./empty-state-card.styles";
import { emptyStateCardStyles } from "./empty-state-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
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
      <ha-card class="assembled-card">
        <div class="empty-state-dashed">
          <ha-icon class="lg" icon="${this.esc(this._config.icon)}"></ha-icon>
          <div class="empty-title">${this.esc(this._config.title)}</div>
          <div class="empty-desc">${this.esc(this._config.message)}</div>
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

@customElement("component-empty-state-v2")
export class ComponentEmptyStateV2 extends ComponentEmptyStateV3 {
  public override setConfig(config: EmptyStateCardConfig): void {
    super.setConfig({
      ...config,
      type: "custom:component-empty-state-v2",
    });
  }
}

registerCard({
  type: "component-empty-state-v2",
  element: ComponentEmptyStateV2,
  name: "Empty State V2",
  description: "Reusable compact empty-state component.",
});
