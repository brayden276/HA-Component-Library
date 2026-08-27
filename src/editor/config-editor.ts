import { LitElement, html, css, TemplateResult } from "lit";
import { property, state, customElement } from "lit/decorators.js";
import type {
  HomeAssistant,
  LovelaceCardConfig,
  LovelaceCardEditor,
} from "../types/home-assistant";
import { escapeHtml } from "../utils/escaping";

@customElement("ha-component-library-config-editor")
export class HaComponentLibraryConfigEditor
  extends LitElement
  implements LovelaceCardEditor
{
  @property({ attribute: false })
  public hass?: HomeAssistant;

  @property({ type: String })
  public cardType = "";

  @state()
  private _config?: LovelaceCardConfig;

  @state()
  private _error: string | null = null;

  public static override styles = css`
    :host {
      display: block;
      padding: 16px;
      box-sizing: border-box;
      color: var(--primary-text-color);
      font-family: inherit;
    }
    .wrap {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .header {
      font-size: 14px;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .type-badge {
      display: inline-block;
      padding: 2px 6px;
      font-size: 11px;
      border-radius: 4px;
      background: var(
        --dashboard-card-muted-surface,
        rgba(127, 127, 127, 0.15)
      );
      font-family: monospace;
    }
    textarea {
      width: 100%;
      min-height: 180px;
      padding: 10px;
      box-sizing: border-box;
      border: 1px solid
        var(--dashboard-card-border-color, rgba(127, 127, 127, 0.2));
      border-radius: 6px;
      background: var(
        --dashboard-card-surface,
        var(--card-background-color, #1e1e1e)
      );
      color: var(--primary-text-color, #fff);
      font-family: monospace;
      font-size: 12px;
      line-height: 1.4;
      resize: vertical;
    }
    textarea:focus {
      outline: 2px solid var(--primary-color);
      outline-offset: 1px;
    }
    .error {
      color: var(--error-color, #db4437);
      font-size: 12px;
      margin-top: 4px;
    }
  `;

  public setConfig(config: LovelaceCardConfig): void {
    this._config = config;
  }

  private _onChange(e: Event): void {
    const target = e.target as HTMLTextAreaElement;
    try {
      const parsed = JSON.parse(target.value);
      this._error = null;
      this.dispatchEvent(
        new CustomEvent("config-changed", {
          bubbles: true,
          composed: true,
          detail: { config: parsed },
        }),
      );
    } catch (err: any) {
      this._error = err.message || "Invalid JSON";
    }
  }

  protected override render(): TemplateResult {
    const rawConfig = this._config
      ? JSON.stringify(this._config, null, 2)
      : "{}";
    return html`
      <div class="wrap">
        <div class="header">
          Card Configuration
          ${this.cardType ? html`<span class="type-badge">${escapeHtml(this.cardType)}</span>` : ""}
        </div>
        <textarea
          .value=${rawConfig}
          @change=${this._onChange}
          spellcheck="false"
          aria-label="Card Configuration JSON"
        ></textarea>
        ${this._error ? html`<div class="error">⚠️ ${escapeHtml(this._error)}</div>` : ""}
      </div>
    `;
  }
}
