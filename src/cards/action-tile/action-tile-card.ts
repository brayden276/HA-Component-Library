export * from "./action-tile-card.types";
import type { HaActionTileConfig } from "./action-tile-card.types";
export * from "./action-tile-card.styles";
import { actionTileCardStyles } from "./action-tile-card.styles";
import { CSSResultGroup, html, TemplateResult, nothing } from "lit";
import { customElement } from "lit/decorators.js";
import { HaBaseCard } from "../../components/base/lit-base-card";
import {
  LovelaceCardEditor,
  LovelaceGridOptions,
} from "../../types/home-assistant";
import {
  computeDomain,
  computeEntityName,
  formatEntityState,
  getDefaultIconForDomain,
  isEntityActive,
  isEntityUnavailable,
  handleAction,
} from "../../utils/entity";
import "./action-tile-editor";

@customElement("ha-action-tile")
export class HaActionTile extends HaBaseCard<HaActionTileConfig> {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement(
      "ha-action-tile-editor",
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
      color: "#03a9f4",
    };
  }

  protected override validateConfig(config: HaActionTileConfig): void {
    if (!config.entity) {
      throw new Error("Please define an entity for ha-action-tile");
    }
  }

  public override getCardSize(): number {
    return 1;
  }

  public override getGridOptions(): LovelaceGridOptions {
    return {
      columns: 6,
      rows: 1,
      min_columns: 3,
      min_rows: 1,
    };
  }

  private _handleTileTap(): void {
    if (!this.hass || !this.config) return;
    if (isEntityUnavailable(this.hass.states[this.config.entity])) return;
    const tapAction = this.config.tap_action || { action: "toggle" };
    handleAction(this, this.hass, tapAction, this.config.entity);
  }

  private _renderBadge(): TemplateResult | typeof nothing {
    if (!this.hass || !this.config) return nothing;

    if (
      this.config.badge_entity &&
      this.hass.states[this.config.badge_entity]
    ) {
      const badgeState = this.hass.states[this.config.badge_entity];
      return html`
        <div class="capsule-badge">
          ${formatEntityState(badgeState, this.hass)}
        </div>
      `;
    }

    const entity = this.hass.states[this.config.entity];
    if (
      entity?.attributes?.brightness !== undefined &&
      isEntityActive(entity)
    ) {
      const pct = Math.round((entity.attributes.brightness / 255) * 100);
      return html`<div class="capsule-badge">${pct}%</div>`;
    }

    if (entity?.attributes?.temperature !== undefined) {
      return html`<div class="capsule-badge">
        ${entity.attributes.temperature}&deg;
      </div>`;
    }

    return nothing;
  }

  private _handleKeyDown(e: KeyboardEvent): void {
    if (
      !this.hass ||
      !this.config ||
      isEntityUnavailable(this.hass.states[this.config.entity])
    )
      return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this._handleTileTap();
    }
  }

  protected override render(): TemplateResult {
    if (!this.hass || !this.config?.entity) {
      return this.renderError("No entity configured for ha-action-tile");
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
    const activeColor = this.config.color || "#03a9f4";

    return html`
      <ha-card
        class="interactive surface-card tile-card ${isActive ? "active" : ""} ${isUnavailable ? "unavailable" : ""}"
        style=${isActive ? `--tile-active-color: ${activeColor};` : ""}
        role="button"
        tabindex="${isUnavailable ? "-1" : "0"}"
        aria-pressed="${String(isActive)}"
        aria-disabled="${String(isUnavailable)}"
        aria-label="${entityName}: ${stateDisplay}"
        @click=${this._handleTileTap}
        @keydown=${this._handleKeyDown}
      >
        <div class="header-row tile-row">
          <div class="icon-well control-radius ${isActive ? "active" : ""}">
            <ha-icon .icon=${iconName}></ha-icon>
          </div>
          <div class="copy-block">
            <div class="label-title" title=${entityName}>${entityName}</div>
            <div class="label-sub">${stateDisplay}</div>
          </div>
          ${this._renderBadge()}
        </div>
      </ha-card>
    `;
  }

  public static override styles: CSSResultGroup = actionTileCardStyles;
}
