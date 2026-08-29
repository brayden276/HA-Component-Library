export * from "./nav-tile-card.types";
import type { NavigationTileCardConfig } from "./nav-tile-card.types";
export * from "./nav-tile-card.styles";
import { navTileCardStyles } from "./nav-tile-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import { interaction, InteractionHandle } from "../../utils/interaction";
import { registerCard } from "../../utils/registration";

const DEFAULTS: NavigationTileCardConfig = {
  type: "custom:component-nav-tile-v2",
  icon: "mdi:door-open",
  title: "Destination",
  context: "Navigation",
  navigation_path: null,
};

@customElement("component-nav-tile-v2")
export class ComponentNavigationTileV2 extends LitBaseCard<NavigationTileCardConfig> {
  private _interactionHandle: InteractionHandle | null = null;

  public static override styles: CSSResultGroup = navTileCardStyles;

  public override setConfig(config: NavigationTileCardConfig): void {
    super.setConfig({ ...DEFAULTS, ...config });
  }

  public override getCardSize(): number {
    return 1;
  }

  protected override updated(): void {
    const path = this._config?.navigation_path;
    const btn = this.renderRoot.querySelector(
      "button.nav",
    ) as HTMLElement | null;
    if (path && btn) {
      this._interactionHandle?.destroy();
      this._interactionHandle = interaction(btn, {
        primary: () => this.navigate(path),
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
    const path = this._config.navigation_path;

    const inner = html`
      <div class="header-row nav-row">
        <div class="icon-well control-radius icon">
          <ha-icon icon="${this.esc(this._config.icon)}"></ha-icon>
        </div>
        <div class="copy-block">
          <div class="label-title title">${this.esc(this._config.title)}</div>
          <div class="label-sub desc">${this.esc(this._config.context)}</div>
        </div>
      </div>
    `;

    const ariaLabel = `${this._config.title || "Destination"}${this._config.context ? `: ${this._config.context}` : ""}. Navigate.`;

    return html`
      <ha-card class="surface-card">
        ${
          path
            ? html`<button
                class="i nav"
                type="button"
                aria-label="${this.esc(ariaLabel)}"
              >
                ${inner}
              </button>`
            : html`<div
                class="nav nav-static"
                aria-label="${this.esc(ariaLabel)}"
              >
                ${inner}
              </div>`
        }
      </ha-card>
    `;
  }
}

registerCard({
  type: "component-nav-tile-v2",
  element: ComponentNavigationTileV2,
  name: "Navigation Tile",
  description: "Reusable navigation tile component.",
});
