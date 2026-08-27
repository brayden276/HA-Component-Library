export * from "./quick-nav-card.types";
import type { QuickNavigationCardConfig } from "./quick-nav-card.types";
export * from "./quick-nav-card.styles";
import { quickNavCardStyles } from "./quick-nav-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import { interaction, InteractionHandle } from "../../utils/interaction";
import { registerCard } from "../../utils/registration";

const DEFAULTS: QuickNavigationCardConfig = {
  type: "custom:component-quick-nav-v2",
  left_icon: "mdi:weather-partly-cloudy",
  left_text: "Context",
  left_entity: null,
  action_1_icon: "mdi:view-dashboard-outline",
  action_1_text: "Destination",
  action_1_path: null,
  action_2_icon: "mdi:cog-outline",
  action_2_text: "Settings",
  action_2_path: null,
};

@customElement("component-quick-nav-v2")
export class ComponentQuickNavigationV2 extends LitBaseCard<QuickNavigationCardConfig> {
  private _interactionHandles: InteractionHandle[] = [];

  public static override styles: CSSResultGroup = quickNavCardStyles;

  public override setConfig(config: QuickNavigationCardConfig): void {
    super.setConfig({ ...DEFAULTS, ...config });
  }

  public override getCardSize(): number {
    return 1;
  }

  private _formatState(): string {
    if (!this._config?.left_entity || !this.hass)
      return this._config?.left_text || "Context";
    const stateObj = this.hass.states[this._config.left_entity];
    if (!stateObj) return "Unavailable";
    try {
      return this.hass.formatEntityState
        ? this.hass.formatEntityState(stateObj)
        : stateObj.state;
    } catch {
      return stateObj.state;
    }
  }

  protected override updated(): void {
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];

    const contextBtn = this.renderRoot.querySelector(
      "#context",
    ) as HTMLElement | null;
    const action1Btn = this.renderRoot.querySelector(
      "#action-1",
    ) as HTMLElement | null;
    const action2Btn = this.renderRoot.querySelector(
      "#action-2",
    ) as HTMLElement | null;

    if (contextBtn) {
      this._interactionHandles.push(
        interaction(contextBtn, {
          primary: () => this.moreInfo(this._config?.left_entity),
          feedback: true,
        }),
      );
    }
    if (action1Btn && this._config?.action_1_path) {
      this._interactionHandles.push(
        interaction(action1Btn, {
          primary: () => this.navigate(this._config?.action_1_path),
          feedback: true,
        }),
      );
    }
    if (action2Btn && this._config?.action_2_path) {
      this._interactionHandles.push(
        interaction(action2Btn, {
          primary: () => this.navigate(this._config?.action_2_path),
          feedback: true,
        }),
      );
    }
  }

  public override disconnectedCallback(): void {
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];
    super.disconnectedCallback();
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const stateObj =
      this._config.left_entity && this.hass
        ? this.hass.states[this._config.left_entity]
        : null;
    const leftText = stateObj
      ? this._formatState()
      : this._config.left_entity
        ? "Unavailable"
        : this._config.left_text;

    return html`
      <ha-card>
        <div class="wrap">
          <button
            class="i chip context"
            id="context"
            type="button"
            aria-label="${this.esc(this._config.left_text)}"
            ?disabled=${!this._config.left_entity}
          >
            ${
              stateObj
                ? html`<ha-state-icon
                    id="context-icon"
                    .hass=${this.hass}
                    .stateObj=${stateObj}
                  ></ha-state-icon>`
                : html`<ha-icon
                    icon="${this.esc(this._config.left_icon)}"
                  ></ha-icon>`
            }
            <span>${this.esc(leftText)}</span>
          </button>
          <div class="group">
            <button
              class="i chip"
              id="action-1"
              type="button"
              aria-label="${this.esc(this._config.action_1_text)}"
              ?disabled=${!this._config.action_1_path}
            >
              <ha-icon icon="${this.esc(this._config.action_1_icon)}"></ha-icon>
              <span>${this.esc(this._config.action_1_text)}</span>
            </button>
            <button
              class="i chip"
              id="action-2"
              type="button"
              aria-label="${this.esc(this._config.action_2_text)}"
              ?disabled=${!this._config.action_2_path}
            >
              <ha-icon icon="${this.esc(this._config.action_2_icon)}"></ha-icon>
              <span>${this.esc(this._config.action_2_text)}</span>
            </button>
          </div>
        </div>
      </ha-card>
    `;
  }
}

registerCard({
  type: "component-quick-nav-v2",
  element: ComponentQuickNavigationV2,
  name: "Quick Navigation",
  description: "Reusable quick navigation component.",
});
