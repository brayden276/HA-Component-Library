import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant, LovelaceCardEditor } from "../../types/home-assistant";
import { HaStatusCardConfig } from "./status-card-card";
import { editorStyles } from "../../utils/styles";
import { fireEvent } from "../../utils/navigation";

@customElement("ha-status-card-editor")
export class HaStatusCardEditor
  extends LitElement
  implements LovelaceCardEditor
{
  @property({ attribute: false })
  public hass!: HomeAssistant;

  @state()
  private _config!: HaStatusCardConfig;

  public setConfig(config: HaStatusCardConfig): void {
    this._config = { ...config };
  }

  private _valueChanged(
    ev: CustomEvent | Event,
    key: keyof HaStatusCardConfig,
  ): void {
    if (!this._config) return;
    const target = ev.target as HTMLInputElement | HTMLSelectElement;
    let val: any =
      target.type === "checkbox"
        ? (target as HTMLInputElement).checked
        : target.value;

    if (val === "") {
      const newConf = { ...this._config };
      delete newConf[key];
      this._config = newConf as HaStatusCardConfig;
    } else {
      this._config = {
        ...this._config,
        [key]: val,
      };
    }

    fireEvent(this, "config-changed", { config: this._config });
  }

  protected override render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html``;
    }

    const entities = Object.keys(this.hass.states || {}).sort();

    return html`
      <div class="editor-container">
        <!-- Entity Picker -->
        <div class="form-row">
          <label class="form-label" for="entity-select"
            >Entity (Required)</label
          >
          <select
            id="entity-select"
            class="form-select"
            .value=${this._config.entity || ""}
            @change=${(e: Event) => this._valueChanged(e, "entity")}
          >
            <option value="">Select an entity...</option>
            ${entities.map(
              (ent) => html`
                <option value=${ent} ?selected=${this._config.entity === ent}>
                  ${this.hass.states[ent]?.attributes?.friendly_name || ent}
                  (${ent})
                </option>
              `,
            )}
          </select>
        </div>

        <!-- Custom Name Override -->
        <div class="form-row">
          <label class="form-label" for="name-input"
            >Card Name (Optional)</label
          >
          <input
            id="name-input"
            type="text"
            class="form-input"
            placeholder="Default to entity friendly name"
            .value=${this._config.name || ""}
            @input=${(e: Event) => this._valueChanged(e, "name")}
          />
        </div>

        <!-- Custom Icon -->
        <div class="form-row">
          <label class="form-label" for="icon-input"
            >Icon (Optional, e.g. mdi:lightbulb)</label
          >
          <input
            id="icon-input"
            type="text"
            class="form-input"
            placeholder="mdi:default"
            .value=${this._config.icon || ""}
            @input=${(e: Event) => this._valueChanged(e, "icon")}
          />
        </div>

        <!-- Secondary Info -->
        <div class="form-row">
          <label class="form-label" for="secondary-info-select"
            >Secondary Info</label
          >
          <select
            id="secondary-info-select"
            class="form-select"
            .value=${this._config.secondary_info || "last-changed"}
            @change=${(e: Event) => this._valueChanged(e, "secondary_info")}
          >
            <option value="last-changed">Last Changed Timestamp</option>
            <option value="state">State & Unit</option>
            <option value="entity-id">Entity ID</option>
            <option value="none">None</option>
          </select>
        </div>

        <!-- Toggle Switch Visibility -->
        <label class="form-checkbox-row">
          <input
            type="checkbox"
            .checked=${this._config.show_toggle !== false}
            @change=${(e: Event) => this._valueChanged(e, "show_toggle")}
          />
          <span class="form-label"
            >Show Quick Toggle Switch (for switchable entities)</span
          >
        </label>
      </div>
    `;
  }

  public static override styles = [
    editorStyles,
    css`
      .form-checkbox-row {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        user-select: none;
      }
      .form-checkbox-row input {
        cursor: pointer;
      }
    `,
  ];
}
