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
        <div class="badge-pill">
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
      return html`<div class="badge-pill">${pct}%</div>`;
    }

    if (entity?.attributes?.temperature !== undefined) {
      return html`<div class="badge-pill">
        ${entity.attributes.temperature}&deg;
      </div>`;
    }

    return nothing;
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
    const isActive = isEntityActive(entity);
    const entityName = this.config.name || computeEntityName(entity);
    const iconName =
      this.config.icon ||
      entity.attributes.icon ||
      getDefaultIconForDomain(domain, entity.state);
    const stateDisplay = formatEntityState(entity, this.hass);
    const activeColor = this.config.color || "#03a9f4";

    return html`
      <ha-card
        class="interactive tile-card ${isActive ? "active" : ""}"
        style=${isActive ? `--tile-active-color: ${activeColor};` : ""}
        @click=${this._handleTileTap}
      >
        <div class="tile-body">
          <div class="tile-header">
            <div class="tile-icon-box ${isActive ? "active" : ""}">
              <ha-icon .icon=${iconName}></ha-icon>
            </div>
            ${this._renderBadge()}
          </div>

          <div class="tile-content">
            <div class="primary-title" title=${entityName}>${entityName}</div>
            <div class="secondary-text">${stateDisplay}</div>
          </div>
        </div>
      </ha-card>
    `;
  }

  public static override styles: CSSResultGroup = actionTileCardStyles;
}
