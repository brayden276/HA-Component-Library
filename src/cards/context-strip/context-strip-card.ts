export * from "./context-strip-card.types";
import type { ContextStripCardConfig } from "./context-strip-card.types";
export * from "./context-strip-card.styles";
import { contextStripCardStyles } from "./context-strip-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import { interaction, InteractionHandle } from "../../utils/interaction";
import { registerCard } from "../../utils/registration";

const DEFAULTS: ContextStripCardConfig = {
  type: "custom:component-context-strip-v3",
  left_text: "Left context",
  center_1_label: "Primary metric",
  center_1_value: "00%",
  center_2_label: "Secondary metric",
  center_2_value: "00%",
  center_3_label: "Tertiary metric",
  center_3_value: "00%",
  right_text: "Right context",
  navigation_path: null,
  entity: null,
};

@customElement("component-context-strip-v3")
export class ComponentContextStripV3 extends LitBaseCard<ContextStripCardConfig> {
  private _interactionHandle: InteractionHandle | null = null;

  public static override styles: CSSResultGroup = contextStripCardStyles;

  public override setConfig(config: ContextStripCardConfig): void {
    super.setConfig({ ...DEFAULTS, ...config });
  }

  public override getCardSize(): number {
    return 1;
  }

  private _getAction(): (() => void) | null {
    if (!this._config) return null;
    const path = this._config.navigation_path;
    if (path) return () => this.navigate(path);
    const entity = this._config.entity;
    if (entity) return () => this.moreInfo(entity);
    return null;
  }

  protected override updated(): void {
    const action = this._getAction();
    const btn = this.renderRoot.querySelector("button");
    if (action && btn) {
      this._interactionHandle?.destroy();
      this._interactionHandle = interaction(btn, {
        primary: action,
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
    const action = this._getAction();

    const metrics = [1, 2, 3].map((idx) => {
      const label = (this._config as any)[`center_${idx}_label`];
      const val = (this._config as any)[`center_${idx}_value`];
      return html`
        <span class="item">
          <span class="lab">${this.esc(label)}</span>
          <span class="val">${this.esc(val)}</span>
        </span>
      `;
    });

    const content = html`
      <span class="phase">${this.esc(this._config.left_text)}</span>
      <span class="mid">${metrics}</span>
      <span class="event">${this.esc(this._config.right_text)}</span>
    `;

    const ariaLabel = `${this._config.left_text || ""}. ${[1, 2, 3].map((idx) => `${(this._config as any)[`center_${idx}_label`] || ""}: ${(this._config as any)[`center_${idx}_value`] || ""}`).join(", ")}. ${this._config.right_text || ""}`;

    return html`
      <ha-card>
        ${
          action
            ? html`<button type="button" aria-label="${this.esc(ariaLabel)}">${content}</button>`
            : html`<div class="context-static" aria-label="${this.esc(ariaLabel)}">${content}</div>`
        }
      </ha-card>
    `;
  }
}


registerCard({
  type: "component-context-strip-v3",
  element: ComponentContextStripV3,
  name: "Context Strip",
  description: "Reusable context and metric strip component.",
});
