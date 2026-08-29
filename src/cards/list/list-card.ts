export * from "./list-card.types";
import type { ListCardRow, ListCardConfig } from "./list-card.types";
export * from "./list-card.styles";
import { listCardStyles } from "./list-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import { interaction, InteractionHandle } from "../../utils/interaction";
import {
  computeEntityDisplayName,
  formatEntityState,
} from "../../utils/entity";
import { registerCard } from "../../utils/registration";

const DEFAULTS: ListCardConfig = {
  type: "custom:component-list-v2",
  rows: [
    {
      title: "First item",
      description: "Supporting detail",
      value: "00",
      label: "Metric",
    },
    {
      title: "Second item",
      description: "Supporting detail",
      value: "00",
      label: "Metric",
    },
    {
      title: "Third item",
      description: "Supporting detail",
      value: "00",
      label: "Metric",
    },
  ],
  interactive: true,
};

@customElement("component-list-v2")
export class ComponentListV2 extends LitBaseCard<ListCardConfig> {
  private _interactionHandles: InteractionHandle[] = [];

  public static override styles: CSSResultGroup = listCardStyles;

  public override setConfig(config: ListCardConfig): void {
    super.setConfig({ ...DEFAULTS, ...config });
  }

  public override getCardSize(): number {
    return 3;
  }

  private _getRowActions(row: ListCardRow): {
    primary: (() => void) | null;
    hold: (() => void) | null;
  } {
    if (!this._config || this._config.interactive === false)
      return { primary: null, hold: null };
    const custom =
      typeof row.action === "function"
        ? () => row.action!({ host: this, hass: this.hass, row })
        : null;
    const path = row.navigation_path || row.path || null;
    const entity = row.entity || row.more_info_entity || null;
    return {
      primary:
        custom ||
        (path
          ? () => this.navigate(path)
          : entity
            ? () => this.moreInfo(entity)
            : null),
      hold: !custom && path && entity ? () => this.moreInfo(entity) : null,
    };
  }

  protected override updated(): void {
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];

    const rows = Array.isArray(this._config?.rows)
      ? this._config!.rows.slice(0, 6)
      : [];
    const buttons = this.renderRoot.querySelectorAll("button.row");
    buttons.forEach((btn) => {
      const idx = Number((btn as HTMLElement).dataset.index);
      const row = rows[idx];
      if (row) {
        const actions = this._getRowActions(row);
        if (actions.primary) {
          this._interactionHandles.push(
            interaction(btn as HTMLElement, {
              primary: actions.primary,
              hold: actions.hold || undefined,
              feedback: true,
            }),
          );
        }
      }
    });
  }

  public override disconnectedCallback(): void {
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];
    super.disconnectedCallback();
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const rows = Array.isArray(this._config.rows)
      ? this._config.rows.slice(0, 6)
      : [];

    return html`
      <ha-card class="assembled-card">
        <div class="list-wrap">
          ${rows.map((row, index) => {
            const actions = this._getRowActions(row);
            const entity = row.entity ? this.hass?.states[row.entity] : null;

            const rawTitle = row.title || "Item";
            const title =
              entity && rawTitle.startsWith("Item")
                ? computeEntityDisplayName({ state: entity })
                : rawTitle;
            const value =
              entity && (row.value === "00" || !row.value)
                ? formatEntityState(entity, this.hass)
                : row.value || "";

            const ariaLabel = `${title}: ${value} ${row.label || ""}${row.description ? `. ${row.description}` : ""}`;

            const content = html`
              <div>
                <div class="label-title title">${this.esc(title)}</div>
                <div class="label-sub desc">${this.esc(row.description)}</div>
              </div>
              <div class="metric">
                <b>${this.esc(value)}</b>${this.esc(row.label)}
              </div>
            `;

            return actions.primary
              ? html`
                  <button
                    class="row"
                    data-index="${index}"
                    type="button"
                    aria-label="${this.esc(ariaLabel)}"
                  >
                    ${content}
                  </button>
                `
              : html`<div
                  class="row"
                  data-index="${index}"
                  aria-label="${this.esc(ariaLabel)}"
                >
                  ${content}
                </div>`;
          })}
        </div>
      </ha-card>
    `;
  }
}

registerCard({
  type: "component-list-v2",
  element: ComponentListV2,
  name: "List / Ranking",
  description: "Reusable list and ranking component.",
});
