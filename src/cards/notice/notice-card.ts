export * from "./notice-card.types";
import type { NoticeCardConfig } from "./notice-card.types";
export * from "./notice-card.styles";
import { noticeCardStyles } from "./notice-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import { interaction, InteractionHandle } from "../../utils/interaction";
import {
  computeEntityDisplayName,
  formatEntityState,
} from "../../utils/entity";
import { registerCard } from "../../utils/registration";

const DEFAULTS: NoticeCardConfig = {
  type: "custom:component-notice-v2",
  title: "Notice title",
  message: "Important supporting information appears here.",
  tone: "info",
  icon: "mdi:information-outline",
  entity: null,
  navigation_path: null,
};

@customElement("component-notice-v2")
export class ComponentNoticeV2 extends LitBaseCard<NoticeCardConfig> {
  private _interactionHandle: InteractionHandle | null = null;

  public static override styles: CSSResultGroup = noticeCardStyles;

  public override setConfig(config: NoticeCardConfig): void {
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
    const wrap = this.renderRoot.querySelector(
      ".notice-box",
    ) as HTMLElement | null;
    if (action && wrap) {
      this._interactionHandle?.destroy();
      this._interactionHandle = interaction(wrap, {
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
    const entity = this._config.entity
      ? this.hass?.states[this._config.entity]
      : null;
    const tone =
      this._config.tone === "error" ? "critical" : this._config.tone || "info";

    const title =
      entity && this._config.title === "Notice title"
        ? computeEntityDisplayName({ state: entity })
        : this._config.title || "Notice title";
    const message =
      entity &&
      this._config.message === "Important supporting information appears here."
        ? formatEntityState(entity, this.hass)
        : this._config.message || "";

    const ariaLabel = `${title}${message ? `: ${message}` : ""}`;

    return html`
      <ha-card>
        <div
          class="notice-box ${tone} ${action ? "actionable" : ""}"
          role="${action ? "button" : "region"}"
          tabindex="${action ? "0" : "-1"}"
          aria-label="${this.esc(ariaLabel)}"
        >
          <span>
            <ha-icon icon="${this.esc(this._config.icon)}"></ha-icon>
          </span>
          <div>
            <div class="label-title">${this.esc(title)}</div>
            ${message ? html`<div class="label-sub message">${this.esc(message)}</div>` : ""}
          </div>
        </div>
      </ha-card>
    `;
  }
}

registerCard({
  type: "component-notice-v2",
  element: ComponentNoticeV2,
  name: "Alert / Notice",
  description: "Reusable alert and notice component.",
});
