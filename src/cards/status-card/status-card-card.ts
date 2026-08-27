export * from "./status-card-card.types";
import type { HaStatusCardConfig } from "./status-card-card.types";
export * from "./status-card-card.styles";
import { statusCardCardStyles } from "./status-card-card.styles";
import { CSSResultGroup, html, TemplateResult, nothing } from "lit";
import { customElement } from "lit/decorators.js";
import { HaBaseCard } from "../../components/base/lit-base-card";
import { LovelaceCardEditor } from "../../types/home-assistant";
import {
  computeDomain,
  computeEntityName,
  formatEntityState,
  getDefaultIconForDomain,
  isEntityActive,
  handleAction,
} from "../../utils/entity";
import "./status-card-editor";

@customElement("ha-status-card")
export class HaStatusCard extends HaBaseCard<HaStatusCardConfig> {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement(
      "ha-status-card-editor",
    ) as LovelaceCardEditor;
  }

  public static getStubConfig(
    _hass: any,
    entities: string[],
    _entitiesFallback: string[],
  ): Record<string, unknown> {
    const defaultEntity =
      entities.find((e) => e.startsWith("light.") || e.startsWith("switch.")) ||
      entities[0] ||
      "light.living_room";
    return {
      entity: defaultEntity,
      show_toggle: true,
      secondary_info: "last-changed",
    };
  }

  protected override validateConfig(config: HaStatusCardConfig): void {
    if (!config.entity) {
      throw new Error("Please define an entity");
    }
  }

  public override getCardSize(): number {
    return 1;
  }

  private _handleTap(): void {
    if (!this.hass || !this.config) return;
    const tapAction = this.config.tap_action || { action: "more-info" };
    handleAction(this, this.hass, tapAction, this.config.entity);
  }

  private async _handleToggle(e: Event): Promise<void> {
    e.stopPropagation();
    if (!this.hass || !this.config?.entity) return;
    const domain = computeDomain(this.config.entity);
    const service = domain === "lock" ? "lock" : "toggle";
    await this.hass.callService(domain, service, undefined, {
      entity_id: this.config.entity,
    });
  }

  private _renderIcon(icon: string): TemplateResult {
    if (icon.startsWith("mdi:")) {
      // If Home Assistant's ha-icon is registered, use it, else fallback to SVG/text
      return html`<ha-icon .icon=${icon}></ha-icon>`;
    }
    return html`<span>${icon}</span>`;
  }

  private _getSecondaryText(entity: any): string {
    const mode = this.config?.secondary_info || "last-changed";
    if (mode === "none") return "";
    if (mode === "state") return formatEntityState(entity, this.hass);
    if (mode === "entity-id") return entity.entity_id;

    if (mode === "last-changed" && entity.last_changed) {
      try {
        const date = new Date(entity.last_changed);
        return `Updated ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
      } catch {
        return entity.last_changed;
      }
    }
    return "";
  }

  protected override render(): TemplateResult {
    if (!this.hass || !this.config?.entity) {
      return this.renderError("No entity configured for ha-status-card");
    }

    const entity = this.hass.states[this.config.entity];
    if (!entity) {
      return this.renderError(`Entity not found: ${this.config.entity}`);
    }

    const domain = computeDomain(this.config.entity);
    const isActive = isEntityActive(entity);
    const entityName = this.config.name || computeEntityName(entity);
    const iconName =
      this.config.icon ||
      entity.attributes.icon ||
      getDefaultIconForDomain(domain, entity.state);
    const stateDisplay = formatEntityState(entity, this.hass);
    const secondaryText = this._getSecondaryText(entity);
    const canToggle =
      this.config.show_toggle !== false &&
      ["light", "switch", "input_boolean", "fan", "lock"].includes(domain);

    return html`
      <ha-card class="interactive" @click=${this._handleTap}>
        <div class="card-body ${isActive ? "state-active" : "state-inactive"}">
          <div class="icon-container ${isActive ? "active" : ""}">
            ${this._renderIcon(iconName)}
          </div>

          <div class="info-container">
            <div class="primary-title" title=${entityName}>${entityName}</div>
            <div class="secondary-text">
              ${secondaryText ? html`${secondaryText} &bull; ` : nothing}
              <span class="state-label">${stateDisplay}</span>
            </div>
          </div>

          ${
            canToggle
              ? html`
                  <button
                    class="toggle-btn ${isActive ? "active" : ""}"
                    @click=${this._handleToggle}
                    aria-label="Toggle ${entityName}"
                    title="Toggle state"
                  >
                    <div class="toggle-track">
                      <div class="toggle-thumb"></div>
                    </div>
                  </button>
                `
              : nothing
          }
        </div>
      </ha-card>
    `;
  }

  public static override styles: CSSResultGroup = statusCardCardStyles;
}
