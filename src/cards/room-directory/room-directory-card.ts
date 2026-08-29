export * from "./room-directory-card.types";
import type { RoomDirectoryConfig } from "./room-directory-card.types";
export * from "./room-directory-card.styles";
import { roomDirectoryCardStyles } from "./room-directory-card.styles";
import { html, TemplateResult, CSSResultGroup, PropertyValues } from "lit";
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
  private _registryHass: typeof this.hass | null = null;
  private _dialogOpener: HTMLElement | null = null;

  public static override styles: CSSResultGroup = roomDirectoryCardStyles;

  public override setConfig(config: RoomDirectoryConfig): void {
    super.setConfig({ ...DEFAULTS, ...config });
    this._bindRegistry();
  }

  public override getCardSize(): number {
    return 4;
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._bindRegistry();
  }

  public override disconnectedCallback(): void {
    this._unsubRegistry?.();
    this._unsubRegistry = null;
    this._registryHass = null;
    super.disconnectedCallback();
  }

  protected override willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has("hass")) this._bindRegistry();
  }

  private _bindRegistry(): void {
    if (!this.isConnected || !this.hass) return;
    if (this._registryHass === this.hass && this._unsubRegistry) return;
    this._unsubRegistry?.();
    this._registryHass = this.hass;
    const hass = this.hass;
    this._unsubRegistry = centralRegistry.subscribe(hass, (data) => {
      if (this._registryHass === hass) this._registries = data;
    });
  }

  private _activeHue(areaId: string): number {
    let value = 0;
    for (const character of areaId) {
      value = (value * 31 + character.charCodeAt(0)) >>> 0;
    }
    return 12 + (value % 336);
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

  private _openRoom(area: AreaRegistryEntry, opener?: HTMLElement): void {
    this._dialogOpener = opener || null;
    this._activeArea = area;
    void this.updateComplete.then(() => {
      const dialog = this.renderRoot.querySelector(
        "dialog",
      ) as HTMLDialogElement | null;
      if (!dialog || dialog.open) return;
      try {
        dialog.showModal();
        (dialog.querySelector("button.close") as HTMLElement | null)?.focus();
      } catch {
        // A disconnected/replaced dialog must not leave the room trigger in a
        // stale state or surface an unhandled promise rejection.
        this._activeArea = null;
        this._dialogOpener = null;
      }
    });
  }

  private _closeRoom(): void {
    const dialog = this.renderRoot.querySelector(
      "dialog",
    ) as HTMLDialogElement | null;
    if (dialog?.open) dialog.close();
    else this._handleDialogClose();
  }

  private _handleDialogClose = (): void => {
    this._activeArea = null;
    const opener = this._dialogOpener;
    this._dialogOpener = null;
    opener?.focus?.();
  };

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
            const isActive = st.severity === "active";
            const activeText = isActive
              ? `. ${st.activeDeviceCount} active device${st.activeDeviceCount === 1 ? "" : "s"}`
              : "";
            return html`
              <button
                class="room ${st.severity}"
                type="button"
                style="--room-active-hue: ${this._activeHue(area.area_id)}"
                aria-label="Open ${area.name}${st.summary ? ". " + st.summary : ""}${activeText}"
                @click=${(event: MouseEvent) =>
                  this._openRoom(area, event.currentTarget as HTMLElement)}
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
        @close=${this._handleDialogClose}
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
