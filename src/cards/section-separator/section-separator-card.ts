export * from "./section-separator-card.types";
import type { SectionSeparatorCardConfig } from "./section-separator-card.types";
export * from "./section-separator-card.styles";
import { sectionSeparatorCardStyles } from "./section-separator-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import { registerCard } from "../../utils/registration";

@customElement("component-section-separator-v2")
export class ComponentSectionSeparatorV2 extends LitBaseCard<SectionSeparatorCardConfig> {
  public static override styles: CSSResultGroup = sectionSeparatorCardStyles;

  public override setConfig(config: SectionSeparatorCardConfig): void {
    const title =
      config?.title || config?.label || config?.text || "Section label";
    super.setConfig({
      icon: "mdi:gesture-tap-button",
      ...config,
      type: "custom:component-section-separator-v2",
      title,
    });
  }

  public override getCardSize(): number {
    return 1;
  }

  protected override shouldUpdate(
    changedProperties: Map<string | number | symbol, unknown>,
  ): boolean {
    if (changedProperties.size === 1 && changedProperties.has("hass")) {
      return false;
    }
    return super.shouldUpdate(changedProperties);
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;

    const label =
      this._config.title ||
      this._config.label ||
      this._config.text ||
      "Section label";
    return html`
      <ha-card>
        <div class="wrap">
          <ha-icon icon="${this.esc(this._config.icon)}"></ha-icon>
          <span class="label">${this.esc(label)}</span>
          <span class="line"></span>
        </div>
      </ha-card>
    `;
  }
}

registerCard({
  type: "component-section-separator-v2",
  element: ComponentSectionSeparatorV2,
  name: "Section Separator",
  description: "Reusable section separator component.",
});
