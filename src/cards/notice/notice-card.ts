export * from "./notice-card.types";
import type { NoticeCardConfig } from "./notice-card.types";
export * from "./notice-card.styles";
import { noticeCardStyles } from "./notice-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import { interaction, InteractionHandle } from "../../utils/interaction";
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
    const wrap = this.renderRoot.querySelector(".wrap") as HTMLElement | null;
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
    const tone = ["warning", "error", "success"].includes(
      this._config.tone || "",
    )
      ? this._config.tone
      : "";

    return html`
      <ha-card>
        <div
          class="wrap ${tone} ${action ? "actionable" : ""}"
          role="${action ? "button" : "none"}"
          tabindex="${action ? "0" : "-1"}"
        >
          <span class="icon">
            <ha-icon icon="${this.esc(this._config.icon)}"></ha-icon>
          </span>
          <div>
            <div class="title">${this.esc(this._config.title)}</div>
            <div class="message">${this.esc(this._config.message)}</div>
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
