export * from "./room-directory-card.types";
import type { RoomDirectoryConfig } from "./room-directory-card.types";
export * from "./room-directory-card.styles";
import { roomDirectoryCardStyles } from "./room-directory-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import type {
  LovelaceGridOptions,
  AreaRegistryEntry,
} from "../../types/home-assistant";
import type { DashboardRegistries } from "../../types/registry";
import { centralRegistry } from "../../services/registry/dashboard-registry";
import { computeAreaStatusSummary } from "../../services/registry/area-summary";
import { registerCard } from "../../utils/registration";
import "../smart-collection/smart-collection-card";

const DEFAULTS: RoomDirectoryConfig = {
  type: "custom:component-room-directory-v4",
  title: "Rooms",
  icon: "mdi:floor-plan",
  mode: "home",
  pref_key: "home-control.rooms.v2",
  navigation_path: null,
  base_path: "/home-control",
};

@customElement("component-room-directory-v4")
export class ComponentRoomDirectoryV4 extends LitBaseCard<RoomDirectoryConfig> {
  public static override getGridOptions(): LovelaceGridOptions {
    return { columns: 12, rows: "auto" };
  }

  @state()
  private _registries: DashboardRegistries | null = null;

  @state()
  private _activeArea: AreaRegistryEntry | null = null;

  private _unsubRegistry: (() => void) | null = null;

  public static override styles: CSSResultGroup = roomDirectoryCardStyles;

  public override setConfig(config: RoomDirectoryConfig): void {
    super.setConfig({ ...DEFAULTS, ...config });
    if (this.hass) {
      centralRegistry.load(this.hass).then((data) => {
        this._registries = data;
      });
    }
  }

  public override getCardSize(): number {
    return 4;
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    if (!this._unsubRegistry && this.hass) {
      this._unsubRegistry = centralRegistry.subscribe(this.hass, (data) => {
        this._registries = data;
      });
    }
  }

  public override disconnectedCallback(): void {
    this._unsubRegistry?.();
    this._unsubRegistry = null;
    super.disconnectedCallback();
  }

  protected override willUpdate(): void {
    if (!this._registries && this.hass) {
      centralRegistry.load(this.hass).then((data) => {
        this._registries = data;
      });
    }
  }

  private _areas(): AreaRegistryEntry[] {
    const list = this._registries?.areas || [];
    return [...list].sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
    );
  }

  private _areaStatus(area: AreaRegistryEntry) {
    return computeAreaStatusSummary(area, this._registries, this.hass);
  }

  private _openRoom(area: AreaRegistryEntry): void {
    this._activeArea = area;
    const dialog = this.renderRoot.querySelector(
      "dialog",
    ) as HTMLDialogElement | null;
    if (dialog && !dialog.open) dialog.showModal();
  }

  private _closeRoom(): void {
    const dialog = this.renderRoot.querySelector(
      "dialog",
    ) as HTMLDialogElement | null;
    if (dialog?.open) dialog.close();
    this._activeArea = null;
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const areas = this._areas();

    return html`
      <ha-card>
        <div class="head">
          <button
            class="open-view"
            type="button"
            ?disabled=${!this._config.navigation_path}
            @click=${() => this._config?.navigation_path && this.navigate(this._config.navigation_path)}
          >
            <ha-icon icon="${this._config.icon || "mdi:floor-plan"}"></ha-icon>
            <h2>${this._config.title || "Rooms"}</h2>
          </button>
        </div>

        <div class="grid">
          ${areas.map((area) => {
            const st = this._areaStatus(area);
            return html`
              <button
                class="room ${st.severity}"
                type="button"
                aria-label="Open ${area.name}${st.summary ? ". " + st.summary : ""}"
                @click=${() => this._openRoom(area)}
              >
                <span class="ico">
                  <ha-icon icon="${area.icon || "mdi:home-outline"}"></ha-icon>
                </span>
                <span class="copy">
                  <span class="name">${area.name}</span>
                  ${st.summary ? html`<span class="summary">${st.summary}</span>` : ""}
                </span>
              </button>
            `;
          })}
        </div>
      </ha-card>

      <dialog
        @cancel=${() => {
          this._activeArea = null;
        }}
        @click=${(e: MouseEvent) => {
          const dialog = this.renderRoot.querySelector("dialog");
          if (e.target === dialog) this._closeRoom();
        }}
      >
        <div class="sheet">
          <div class="sheet-head">
            <span class="identity">
              <ha-icon
                icon="${this._activeArea?.icon || "mdi:home-outline"}"
              ></ha-icon>
              <span class="sheet-name"
                >${this._activeArea?.name || "Room"}</span
              >
            </span>
            <button
              class="close"
              type="button"
              aria-label="Close room"
              @click=${this._closeRoom}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <div class="sheet-body">
            ${
              this._activeArea
                ? html`
                    <component-smart-collection-v3
                      .hass=${this.hass}
                      .config=${{
                        type: "custom:component-smart-collection-v3",
                        mode: "area",
                        area_id: this._activeArea.area_id,
                        title: "Controls",
                        icon: "mdi:gesture-tap-button",
                        header_style: "separator",
                        editable: false,
                        pref_key: `home-control.area.${this._activeArea.area_id}.v2`,
                      }}
                    ></component-smart-collection-v3>
                  `
                : ""
            }
          </div>
        </div>
      </dialog>
    `;
  }
}

registerCard({
  type: "component-room-directory-v4",
  element: ComponentRoomDirectoryV4,
  name: "Room Directory V4",
  description:
    "Stable registry-driven rooms with full-height swipeable room sheets.",
});
