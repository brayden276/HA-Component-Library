export * from "./status-card-card.types";
import type { HaStatusCardConfig } from "./status-card-card.types";
export * from "./status-card-card.styles";
import { statusCardCardStyles } from "./status-card-card.styles";
import { CSSResultGroup, html, TemplateResult, nothing } from "lit";
import { customElement } from "lit/decorators.js";
import { HaBaseCard } from "../../components/base/lit-base-card";
import {
  HassEntity,
  LovelaceCardEditor,
} from "../../types/home-assistant";
import {
  computeDomain,
  computeEntityName,
  formatEntityState,
  getDefaultIconForDomain,
  isEntityActive,
  isEntityUnavailable,
  handleAction,
  runServiceAction,
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
    if (isEntityUnavailable(this.hass.states[this.config.entity])) return;
    const tapAction = this.config.tap_action || { action: "more-info" };
    handleAction(this, this.hass, tapAction, this.config.entity);
  }

  private _handleKeyDown(e: KeyboardEvent): void {
    if (!this.hass || !this.config || isEntityUnavailable(this.hass.states[this.config.entity])) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this._handleTap();
    }
  }

  private async _handleToggle(e: Event): Promise<void> {
    e.stopPropagation();
    e.preventDefault();
    if (!this.hass || !this.config?.entity) return;
    const entity = this.hass.states[this.config.entity];
    if (isEntityUnavailable(entity)) return;

    const domain = computeDomain(this.config.entity);
    const service =
      domain === "lock"
        ? entity.state === "locked" || entity.state === "locking"
          ? "unlock"
          : "lock"
        : "toggle";
    await runServiceAction(this.hass, {
      domain,
      service,
      target: { entity_id: this.config.entity },
    });
  }

  private _renderIcon(icon: string): TemplateResult {
    if (icon.startsWith("mdi:")) {
      return html`<ha-icon .icon=${icon}></ha-icon>`;
    }
    return html`<span>${icon}</span>`;
  }

  private _getSecondaryText(entity: HassEntity, isUnavailable: boolean): string {
    if (isUnavailable) return "Offline";
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
    const isUnavailable = isEntityUnavailable(entity);
    const isActive = !isUnavailable && isEntityActive(entity);
    const entityName = this.config.name || computeEntityName(entity);
    const iconName =
      this.config.icon ||
      entity.attributes.icon ||
      getDefaultIconForDomain(domain, entity.state);
    const stateDisplay = isUnavailable
      ? "Unavailable"
      : formatEntityState(entity, this.hass);
    const secondaryText = this._getSecondaryText(entity, isUnavailable);
    const canToggle =
      this.config.show_toggle !== false &&
      ["light", "switch", "input_boolean", "fan", "lock"].includes(domain);

    const stateClass = isUnavailable
      ? "state-unavailable"
      : isActive
        ? "state-active"
        : "state-inactive";

    return html`
      <ha-card
        class="interactive status-card assembled-card ${isUnavailable ? "unavailable" : ""}"
        role="button"
        tabindex="${isUnavailable ? "-1" : "0"}"
        aria-disabled="${String(isUnavailable)}"
        aria-label="${entityName}: ${stateDisplay}"
        @click=${this._handleTap}
        @keydown=${this._handleKeyDown}
      >
        <div class="header-row ${stateClass}">
          <div class="icon-well control-radius ${isActive ? "active" : ""}">
            ${this._renderIcon(iconName)}
          </div>

          <div class="copy-block">
            <div class="label-title" title=${entityName}>${entityName}</div>
            <div class="label-sub">
              ${secondaryText ? html`${secondaryText} &bull; ` : nothing}
              <span class="state-label">${stateDisplay}</span>
            </div>
          </div>

          ${
            canToggle
              ? html`
                  <button
                    class="toggle-btn"
                    role="switch"
                    aria-checked="${String(isActive)}"
                    ?disabled=${isUnavailable}
                    aria-disabled="${String(isUnavailable)}"
                    @click=${this._handleToggle}
                    aria-label="Toggle ${entityName}"
                    title="Toggle state"
                  >
                    <span class="switch-pill ${isActive ? "on" : ""}"><span></span></span>
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
