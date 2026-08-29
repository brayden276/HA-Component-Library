export * from "./status-row-card.types";
import type { StatusRowCardConfig } from "./status-row-card.types";
export * from "./status-row-card.styles";
import { statusRowCardStyles } from "./status-row-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import { interaction, InteractionHandle } from "../../utils/interaction";
import { registerCard } from "../../utils/registration";

import {
  computeDomain,
  computeEntityDisplayName,
  formatEntityState,
  getDefaultIconForDomain,
  isEntityUnavailable,
} from "../../utils/entity";

const DEFAULTS: StatusRowCardConfig = {
  type: "custom:component-status-row-v2",
  title: "Status title",
  description: "Supporting description",
  status_value: "Active",
  status_label: "Current state",
  icon: "mdi:information-outline",
  interactive: true,
  entity: null,
  navigation_path: null,
};

@customElement("component-status-row-v2")
export class ComponentStatusRowV2 extends LitBaseCard<StatusRowCardConfig> {
  private _interactionHandle: InteractionHandle | null = null;

  public static override styles: CSSResultGroup = statusRowCardStyles;

  public override setConfig(config: StatusRowCardConfig): void {
    super.setConfig({ ...DEFAULTS, ...config });
  }

  public override getCardSize(): number {
    return 2;
  }

  private _getAction(): (() => void) | null {
    if (!this._config || this._config.interactive === false) return null;
    if (this._config.navigation_path)
      return () => this.navigate(this._config?.navigation_path);
    if (this._config.entity) return () => this.moreInfo(this._config?.entity);
    return null;
  }

  protected override updated(): void {
    const action = this._getAction();
    const btn = this.renderRoot.querySelector(
      "button.demo",
    ) as HTMLElement | null;
    if (action && btn) {
      this._interactionHandle?.destroy();
      this._interactionHandle = interaction(btn, {
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
    const entity = this._config.entity
      ? this.hass?.states[this._config.entity]
      : null;
    const isUnavailable = entity ? isEntityUnavailable(entity) : false;

    const domain = this._config.entity
      ? computeDomain(this._config.entity)
      : "";
    const title =
      entity && this._config.title === "Status title"
        ? computeEntityDisplayName({ state: entity })
        : this._config.title || "Status title";
    const statusValue =
      entity && this._config.status_value === "Active"
        ? isUnavailable
          ? "Unavailable"
          : formatEntityState(entity, this.hass)
        : this._config.status_value || "Active";
    const icon =
      entity && this._config.icon === "mdi:information-outline"
        ? entity.attributes.icon ||
          getDefaultIconForDomain(domain, entity.state)
        : this._config.icon || "mdi:information-outline";

    const description = this._config.description || "";
    const statusLabel = this._config.status_label || "";
    const ariaLabel = `${title}: ${statusValue}${statusLabel ? ` (${statusLabel})` : ""}${description ? `. ${description}` : ""}`;

    const inner = html`
      <div class="header-row ${isUnavailable ? "unavailable" : ""}">
        <div class="icon-well control-radius icon">
          <ha-icon icon="${this.esc(icon)}"></ha-icon>
        </div>
        <div class="copy-block">
          <div class="label-title title">${this.esc(title)}</div>
          ${description ? html`<div class="label-sub desc">${this.esc(description)}</div>` : ""}
        </div>
        <div class="status">
          <b class="kpi-metric-sm">${this.esc(statusValue)}</b>
          ${statusLabel ? html`<span>${this.esc(statusLabel)}</span>` : ""}
        </div>
      </div>
    `;

    return html`
      <ha-card class="surface-card">
        ${
          action
            ? html`<button
                class="demo"
                type="button"
                aria-label="${this.esc(ariaLabel)}"
                aria-disabled="${String(isUnavailable)}"
                ?disabled=${isUnavailable}
              >
                ${inner}
              </button>`
            : html`<div class="demo-static">${inner}</div>`
        }
      </ha-card>
    `;
  }
}

registerCard({
  type: "component-status-row-v2",
  element: ComponentStatusRowV2,
  name: "Status Row",
  description: "Reusable status row component.",
});
