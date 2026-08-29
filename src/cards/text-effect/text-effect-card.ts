export * from "./text-effect-card.types";
import type { TextEffectCardConfig } from "./text-effect-card.types";
export * from "./text-effect-card.styles";
import { textEffectCardStyles } from "./text-effect-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import { registerCard } from "../../utils/registration";

const DEFAULTS: Partial<TextEffectCardConfig> = {
  type: "custom:component-text-effect-v1",
  effect: "stamp",
  description: "",
  icon: null,
  speed: 2.6,
};

@customElement("component-text-effect-v1")
export class ComponentTextEffectV1 extends LitBaseCard<TextEffectCardConfig> {
  private _settleTimer: ReturnType<typeof setTimeout> | null = null;

  public static override styles: CSSResultGroup = textEffectCardStyles;

  public override setConfig(config: TextEffectCardConfig): void {
    if (!config?.text) {
      throw new Error("text is required");
    }
    super.setConfig({ ...DEFAULTS, ...config });
  }

  public override getCardSize(): number {
    return 1;
  }

  protected override updated(): void {
    if (this._settleTimer) clearTimeout(this._settleTimer);
    const speed = Math.max(
      1.6,
      Math.min(6, Number(this._config?.speed) || 2.6),
    );
    const row = this.renderRoot.querySelector(".row");
    this._settleTimer = setTimeout(
      () => {
        this._settleTimer = null;
        row?.classList.add("settled");
      },
      Math.round(speed * 1000) + 80,
    );
  }

  public override disconnectedCallback(): void {
    if (this._settleTimer) clearTimeout(this._settleTimer);
    this._settleTimer = null;
    super.disconnectedCallback();
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const requestedEffect = [
      "stamp",
      "typewave",
      "overprint",
      "signal",
      "rainbow_stamp",
    ].includes(this._config.effect || "")
      ? this._config.effect
      : "stamp";
    // Keep legacy YAML valid while rendering it through the catalogue's stamp
    // primitive. The room-card presence glow owns the requested rainbow cue.
    const effect = requestedEffect === "rainbow_stamp" ? "stamp" : requestedEffect;
    const speed = Math.max(1.6, Math.min(6, Number(this._config.speed) || 2.6));
    const text = this._config.text;

    return html`
      <ha-card style="--effect-speed: ${speed}s">
        <div class="row ${effect} ${this._config.icon ? "has-icon" : ""}">
          ${
            this._config.icon
              ? html`
                  <span class="icon">
                    <ha-icon icon="${this.esc(this._config.icon)}"></ha-icon>
                  </span>
                `
              : ""
          }
          <div class="copy">
            <div class="title" data-text="${this.esc(text)}">
              <span class="base">${this.esc(text)}</span>
            </div>
            ${
              this._config.description
                ? html`<div class="desc">
                    ${this.esc(this._config.description)}
                  </div>`
                : ""
            }
          </div>
        </div>
      </ha-card>
    `;
  }
}

registerCard({
  type: "component-text-effect-v1",
  element: ComponentTextEffectV1,
  name: "Signature Text Effect",
  description:
    "Reusable transient-status effects using the existing signature motion language.",
});
