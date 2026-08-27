export * from "./room-sheet-card.types";
import type {
  RoomSheetRow,
  RoomSheetCardConfig,
} from "./room-sheet-card.types";
export * from "./room-sheet-card.styles";
import { roomSheetCardStyles } from "./room-sheet-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import { interaction, InteractionHandle } from "../../utils/interaction";
import { registerCard } from "../../utils/registration";

const DEFAULTS: RoomSheetCardConfig = {
  type: "custom:component-room-sheet-v2",
  icon: "mdi:bed-king-outline",
  title: "Room name",
  rows: null,
};

const DEFAULT_ROWS: RoomSheetRow[] = [
  {
    section: "Room state",
    icon: "mdi:thermometer",
    name: "Status metric",
    state: "Supporting context",
    value: "Value",
  },
  {
    section: "Controls",
    icon: "mdi:lightbulb-outline",
    name: "Control name",
    state: "Current state",
    value: "Value",
  },
  {
    section: "Controls",
    icon: "mdi:thermostat",
    name: "Control name",
    state: "Current state",
    value: "Value",
  },
];

@customElement("component-room-sheet-v2")
export class ComponentRoomSheetV2 extends LitBaseCard<RoomSheetCardConfig> {
  private _interactionHandles: InteractionHandle[] = [];

  public static override styles: CSSResultGroup = roomSheetCardStyles;

  public override setConfig(config: RoomSheetCardConfig): void {
    super.setConfig({ ...DEFAULTS, ...config });
  }

  public override getCardSize(): number {
    return 5;
  }

  private _getAction(row: RoomSheetRow): (() => void) | null {
    if (row.navigation_path) return () => this.navigate(row.navigation_path);
    if (row.service && this.hass) {
      const [domain, service] = String(row.service).split(".");
      if (domain && service) {
        return () => {
          this.hass!.callService(domain, service, {
            ...(row.service_data || {}),
            ...(row.entity ? { entity_id: row.entity } : {}),
          });
        };
      }
    }
    if (row.entity) return () => this.moreInfo(row.entity);
    return null;
  }

  protected override updated(): void {
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];

    const rows =
      Array.isArray(this._config?.rows) && this._config!.rows.length
        ? this._config!.rows.slice(0, 8)
        : DEFAULT_ROWS;

    rows.forEach((row, index) => {
      const action = this._getAction(row);
      if (!action) return;
      const el = this.renderRoot.querySelector(
        `[data-row="${index}"]`,
      ) as HTMLElement | null;
      if (!el) return;
      el.setAttribute(
        "aria-label",
        row.aria_label || `${row.name || "Room control"}`,
      );
      this._interactionHandles.push(
        interaction(el, {
          primary: action,
          hold:
            row.entity && row.navigation_path
              ? () => this.moreInfo(row.entity)
              : undefined,
          optimistic: false,
          repeat: false,
          feedback: true,
        }),
      );
    });
  }

  public override disconnectedCallback(): void {
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];
    super.disconnectedCallback();
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const rows =
      Array.isArray(this._config.rows) && this._config.rows.length
        ? this._config.rows.slice(0, 8)
        : DEFAULT_ROWS;

    let currentSection: string | null = null;

    return html`
      <ha-card>
        <div class="wrap">
          <div class="head">
            <span class="head-left">
              <ha-icon icon="${this.esc(this._config.icon)}"></ha-icon>
              <span class="title">${this.esc(this._config.title)}</span>
            </span>
            <span class="i close preview-only" aria-hidden="true">
              <ha-icon icon="mdi:close"></ha-icon>
            </span>
          </div>
          <div class="body">
            ${rows.map((row, index) => {
              const next = row.section || "Controls";
              const showSep = next !== currentSection;
              if (showSep) currentSection = next;
              const action = this._getAction(row);

              return html`
                ${showSep ? html`<div class="sep">${this.esc(next)}</div>` : ""}
                ${
                  action
                    ? html`
                        <button
                          class="row actionable"
                          data-row="${index}"
                          type="button"
                        >
                          <ha-icon
                            icon="${this.esc(row.icon || "mdi:circle-outline")}"
                          ></ha-icon>
                          <span>
                            <div class="rname">
                              ${this.esc(row.name || "Control name")}
                            </div>
                            <div class="rstate">
                              ${this.esc(row.state || "")}
                            </div>
                          </span>
                          <span class="rvalue"
                            >${this.esc(row.value || "")}</span
                          >
                        </button>
                      `
                    : html`
                        <div class="row" data-row="${index}">
                          <ha-icon
                            icon="${this.esc(row.icon || "mdi:circle-outline")}"
                          ></ha-icon>
                          <span>
                            <div class="rname">
                              ${this.esc(row.name || "Control name")}
                            </div>
                            <div class="rstate">
                              ${this.esc(row.state || "")}
                            </div>
                          </span>
                          <span class="rvalue"
                            >${this.esc(row.value || "")}</span
                          >
                        </div>
                      `
                }
              `;
            })}
          </div>
        </div>
      </ha-card>
    `;
  }
}

registerCard({
  type: "component-room-sheet-v2",
  element: ComponentRoomSheetV2,
  name: "Room Sheet",
  description: "Reusable room-sheet component.",
});
