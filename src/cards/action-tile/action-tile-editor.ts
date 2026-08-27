import { LitElement, html, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant, LovelaceCardEditor } from "../../types/home-assistant";
import { HaActionTileConfig } from "./action-tile-card";
import { editorStyles } from "../../utils/styles";
import { fireEvent } from "../../utils/navigation";

@customElement("ha-action-tile-editor")
export class HaActionTileEditor
  extends LitElement
  implements LovelaceCardEditor
{
  @property({ attribute: false })
  public hass!: HomeAssistant;

  @state()
  private _config!: HaActionTileConfig;

  public setConfig(config: HaActionTileConfig): void {
    this._config = { ...config };
  }

  private _valueChanged(ev: Event, key: keyof HaActionTileConfig): void {
    if (!this._config) return;
    const target = ev.target as HTMLInputElement | HTMLSelectElement;
    const val = target.value;

    if (val === "") {
      const newConf = { ...this._config };
      delete newConf[key];
      this._config = newConf as HaActionTileConfig;
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
        <!-- Main Entity -->
        <div class="form-row">
          <label class="form-label" for="tile-entity">Entity (Required)</label>
          <select
            id="tile-entity"
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

        <!-- Name Override -->
        <div class="form-row">
          <label class="form-label" for="tile-name"
            >Tile Label (Optional)</label
          >
          <input
            id="tile-name"
            type="text"
            class="form-input"
            placeholder="Default to entity name"
            .value=${this._config.name || ""}
            @input=${(e: Event) => this._valueChanged(e, "name")}
          />
        </div>

        <!-- Icon Override -->
        <div class="form-row">
          <label class="form-label" for="tile-icon"
            >Icon (Optional, e.g. mdi:lightbulb)</label
          >
          <input
            id="tile-icon"
            type="text"
            class="form-input"
            placeholder="mdi:default"
            .value=${this._config.icon || ""}
            @input=${(e: Event) => this._valueChanged(e, "icon")}
          />
        </div>

        <!-- Custom Active Color -->
        <div class="form-row">
          <label class="form-label" for="tile-color"
            >Active Color (Hex/CSS)</label
          >
          <input
            id="tile-color"
            type="text"
            class="form-input"
            placeholder="#03a9f4"
            .value=${this._config.color || ""}
            @input=${(e: Event) => this._valueChanged(e, "color")}
          />
        </div>

        <!-- Badge Entity (Optional) -->
        <div class="form-row">
          <label class="form-label" for="tile-badge"
            >Badge Overlay Entity (Optional)</label
          >
          <select
            id="tile-badge"
            class="form-select"
            .value=${this._config.badge_entity || ""}
            @change=${(e: Event) => this._valueChanged(e, "badge_entity")}
          >
            <option value="">None / Auto (Brightness/Temp)</option>
            ${entities.map(
              (ent) => html`
                <option
                  value=${ent}
                  ?selected=${this._config.badge_entity === ent}
                >
                  ${this.hass.states[ent]?.attributes?.friendly_name || ent}
                  (${ent})
                </option>
              `,
            )}
          </select>
        </div>
      </div>
    `;
  }

  public static override styles = [editorStyles];
}
