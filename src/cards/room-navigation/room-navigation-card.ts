export * from "./room-navigation-card.types";
import type { RoomNavigationCardConfig } from "./room-navigation-card.types";
export * from "./room-navigation-card.styles";
import { roomNavigationCardStyles } from "./room-navigation-card.styles";
import { html, TemplateResult, CSSResultGroup, PropertyValues } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import type {
  LovelaceGridOptions,
  HassEntity,
  AreaRegistryEntry,
  HomeAssistant,
} from "../../types/home-assistant";
import type { DashboardRegistries } from "../../types/registry";
import { centralRegistry } from "../../services/registry/dashboard-registry";
import { computeAreaStatusSummary } from "../../services/registry/area-summary";
import { interaction, InteractionHandle } from "../../utils/interaction";
import { registerCard } from "../../utils/registration";

const DEFAULTS: Partial<RoomNavigationCardConfig> = {
  type: "custom:component-room-navigation-v1",
  name: "Room",
  icon: "mdi:home-outline",
};

@customElement("component-room-navigation-v1")
export class ComponentRoomNavigationV1 extends LitBaseCard<RoomNavigationCardConfig> {
  @state()
  private _registries: DashboardRegistries | null = null;

  private _interactionHandle: InteractionHandle | null = null;
  private _unsubRegistry: (() => void) | null = null;
  private _registryHass: HomeAssistant | null = null;

  public static override getGridOptions(): LovelaceGridOptions {
    return { columns: 6, rows: 1 };
  }

  public static override styles: CSSResultGroup = roomNavigationCardStyles;

  public override setConfig(config: RoomNavigationCardConfig): void {
    if (!config?.area) throw new Error("area is required");
    if (!config?.navigation_path)
      throw new Error("navigation_path is required");
    super.setConfig({ ...DEFAULTS, ...config });
    if (this.hass) {
      void this._loadRegistry();
    }
  }

  public override getCardSize(): number {
    return 1;
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._bindRegistry();
    void this._loadRegistry();
  }

  public override disconnectedCallback(): void {
    this._unbindRegistry();
    this._interactionHandle?.destroy();
    this._interactionHandle = null;
    super.disconnectedCallback();
  }

  protected override willUpdate(changedProps: PropertyValues): void {
    if (changedProps.has("hass") && changedProps.get("hass") !== this.hass) {
      this._registries = null;
      this._unbindRegistry();
    }
    if (this.hass) {
      this._bindRegistry();
      if (!this._registries || changedProps.has("hass")) void this._loadRegistry();
    }
  }

  private _bindRegistry(): void {
    if (!this.isConnected || !this.hass) return;
    if (this._registryHass === this.hass && this._unsubRegistry) return;

    this._unbindRegistry();
    const hass = this.hass;
    this._registryHass = hass;
    this._unsubRegistry = centralRegistry.subscribe(hass, (data) => {
      if (this.hass === hass) this._registries = data;
    });
  }

  private _unbindRegistry(): void {
    this._unsubRegistry?.();
    this._unsubRegistry = null;
    this._registryHass = null;
  }

  private async _loadRegistry(): Promise<void> {
    if (!this.hass) return;
    const hass = this.hass;
    try {
      const data = await centralRegistry.load(hass);
      if (this.hass === hass) this._registries = data;
    } catch {
      // The live subscription will populate the card after Home Assistant reconnects.
    }
  }

  private _getArea(): AreaRegistryEntry | null {
    if (!this._registries || !this._config) return null;
    const areaKey = String(this._config.area).trim().toLowerCase();
    return (
      this._registries.areas.find(
        (row) =>
          row.area_id === this._config!.area ||
          String(row.name || "")
            .trim()
            .toLowerCase() === areaKey,
      ) || null
    );
  }

  private _getEntities(): HassEntity[] {
    const area = this._getArea();
    if (!area || !this._registries || !this.hass) return [];
    const deviceAreas = this._registries.deviceArea || new Map();
    return this._registries.entities
      .filter(
        (row) =>
          row &&
          !row.disabled_by &&
          !row.hidden_by &&
          (row.area_id === area.area_id ||
            (row.device_id ? deviceAreas.get(row.device_id) : null) ===
              area.area_id),
      )
      .map((row) => this.hass!.states[row.entity_id])
      .filter(Boolean) as HassEntity[];
  }

  private _getStatus(): { summary: string; severity: string } {
    const area = this._getArea();
    if (!area) return { summary: "", severity: "" };
    const res = computeAreaStatusSummary(area, this._registries, this.hass);
    return {
      summary: res.summary,
      severity: res.severity,
    };
  }

  private _presenceDetected(): boolean {
    if (this._config?.demo_presence === true) return true;
    if (this._config?.demo_presence === false) return false;
    const explicit = this._config?.presence_entity;
    if (explicit) {
      const st = this.hass?.states?.[explicit];
      return Boolean(
        st &&
          ["on", "home", "occupied", "present", "detected"].includes(
            String(st.state).toLowerCase(),
          ),
      );
    }
    return this._getEntities().some((st) => {
      if (!st?.entity_id?.startsWith("binary_sensor.") || st.state !== "on")
        return false;
      const deviceClass = String(
        st.attributes?.device_class || "",
      ).toLowerCase();
      const identity =
        `${st.entity_id} ${String(st.attributes?.friendly_name || "")}`.toLowerCase();
      return (
        deviceClass === "occupancy" ||
        deviceClass === "presence" ||
        identity.includes("presence") ||
        identity.includes("occupancy") ||
        identity.includes("mmwave")
      );
    });
  }

  private _presenceHue(): number {
    const key = String(
      this._config?.presence_colour_key ||
        this._config?.area ||
        this._config?.name ||
        "room",
    );
    let hash = 2166136261;
    for (let i = 0; i < key.length; i += 1) {
      hash ^= key.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return (((hash >>> 0) % 360) + 360) % 360;
  }

  protected override updated(): void {
    const btn = this.renderRoot.querySelector("button");
    if (btn && this._config?.navigation_path) {
      this._interactionHandle?.destroy();
      this._interactionHandle = interaction(btn, {
        primary: () => this.navigate(this._config?.navigation_path),
        feedback: true,
      });
    } else {
      this._interactionHandle?.destroy();
      this._interactionHandle = null;
    }
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const status = this._getStatus();
    const presence = this._presenceDetected();
    const label = `Open ${this._config.name}${status.summary ? `. ${status.summary}` : ""}`;
    const hue = presence ? this._presenceHue() : 0;

    const cardStyle = presence
      ? `border-color: hsl(${hue} 82% 68% / .62); box-shadow: 0 0 0 1px hsl(${hue} 82% 68% / .18), 0 0 14px 2px hsl(${hue} 82% 64% / .14);`
      : "";

    return html`
      <ha-card style="${cardStyle}" ?data-presence=${presence}>
        <button
          class="${this.esc(status.severity)}"
          type="button"
          aria-label="${this.esc(label)}"
        >
          <span class="icon">
            <ha-icon icon="${this.esc(this._config.icon)}"></ha-icon>
          </span>
          <span class="copy">
            <span class="name">${this.esc(this._config.name)}</span>
            ${status.summary ? html`<span class="summary">${this.esc(status.summary)}</span>` : ""}
          </span>
        </button>
      </ha-card>
    `;
  }
}

registerCard({
  type: "component-room-navigation-v1",
  element: ComponentRoomNavigationV1,
  name: "Room Navigation",
  description: "Area-aware room navigation with presence status.",
});
