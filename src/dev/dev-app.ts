import { LitElement, html, css, svg, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import * as mdi from "@mdi/js";
import { MockHomeAssistant } from "./mock-hass";
import { HomeAssistant } from "../types/home-assistant";
import "../index";

// Home Assistant supplies a block-level <ha-card>. Defining that host behaviour
// locally keeps preview layout authentic without leaking into production bundle.
if (!customElements.get("ha-card")) {
  class HaCardMock extends HTMLElement {
    public connectedCallback(): void {
      this.style.display = "block";
      this.style.width = "100%";
      this.style.boxSizing = "border-box";
    }
  }
  customElements.define("ha-card", HaCardMock);
}

const mdiExportName = (icon: string): string =>
  `mdi${icon
    .replace(/^mdi:/, "")
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")}`;

// Home Assistant's <ha-icon> resolves Material Design Icons and honours --mdc-icon-size.
if (!customElements.get("ha-icon")) {
  class HaIconMock extends LitElement {
    public static override properties = {
      icon: { type: String, reflect: true },
    };

    public static override styles = css`
      :host {
        display: inline-flex;
        width: var(--mdc-icon-size, 20px);
        height: var(--mdc-icon-size, 20px);
        align-items: center;
        justify-content: center;
        vertical-align: middle;
        color: inherit;
        flex: 0 0 auto;
      }
      svg {
        display: block;
        width: 100%;
        height: 100%;
        fill: currentColor;
      }
    `;

    public icon = "";

    protected override render(): TemplateResult {
      const path =
        (mdi as Record<string, string>)[mdiExportName(this.icon)] ??
        mdi.mdiHelpCircleOutline;
      return svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d=${path}></path></svg>`;
    }
  }
  customElements.define("ha-icon", HaIconMock);
}

// Ensure loadCardHelpers is defined for container cards (like device-aware-auto-entities)
if (typeof (window as any).loadCardHelpers !== "function") {
  (window as any).loadCardHelpers = async () => ({
    createCardElement: (cardConfig: any) => {
      const tag = (cardConfig?.type || "").replace(/^custom:/, "");
      let el: any;
      if (customElements.get(tag)) {
        el = document.createElement(tag);
      } else {
        el = document.createElement("ha-status-card");
        el.setConfig({
          type: "custom:ha-status-card",
          entity: "light.living_room",
          name: "Auto-Entities Match",
        });
        return el;
      }
      if (typeof el.setConfig === "function") {
        el.setConfig(cardConfig);
      }
      return el;
    },
  });
}

@customElement("ha-dev-app")
export class HaDevApp extends LitElement {
  private _mockHass = new MockHomeAssistant();

  @state()
  private _hass!: HomeAssistant;

  @state()
  private _darkMode = true;

  @state()
  private _activeTab = "all";

  @state()
  private _viewport = "desktop";

  public override connectedCallback(): void {
    super.connectedCallback();
    document.documentElement.setAttribute("data-theme", "dark");
    document.body.classList.add("dark-theme");
    this._mockHass.subscribe((h) => {
      this._hass = h;
    });
  }

  private _toggleTheme(): void {
    this._darkMode = !this._darkMode;
    document.documentElement.setAttribute(
      "data-theme",
      this._darkMode ? "dark" : "light",
    );
    if (this._darkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }

  private _toggleEntity(entityId: string): void {
    const st = this._hass?.states?.[entityId]?.state;
    this._mockHass.callService(
      entityId.split(".")[0],
      st === "on" || st === "playing" || st === "open" ? "turn_off" : "turn_on",
      undefined,
      { entity_id: entityId },
    );
  }

  private _toggleUnavailable(entityId: string): void {
    const current = this._hass?.states?.[entityId];
    if (!current) return;
    if (current.state === "unavailable") {
      this._mockHass.updateState(entityId, { state: "cool" });
    } else {
      this._mockHass.updateState(entityId, { state: "unavailable" });
    }
  }

  private _renderShowcase(
    tag: string,
    title: string,
    cardTemplate: TemplateResult,
    badge?: string,
    extraClass = "",
  ): TemplateResult {
    return html`
      <div class="showcase-card ${extraClass}">
        <div class="showcase-header">
          <div class="showcase-identity">
            <span class="showcase-tag">&lt;${tag}&gt;</span>
            <span class="showcase-name">${title}</span>
          </div>
          ${badge ? html`<span class="showcase-badge">${badge}</span>` : ""}
        </div>
        <div class="showcase-body">${cardTemplate}</div>
      </div>
    `;
  }

  protected override render(): TemplateResult {
    if (!this._hass)
      return html`<div>Loading mock Home Assistant environment...</div>`;

    return html`
      <div
        class="dev-container ${this._darkMode ? "dark-mode" : ""} viewport-${this._viewport}"
      >
        <header class="dev-header">
          <div class="header-left">
            <h1>HA Component Library — Dev Server Preview</h1>
            <p class="header-sub">
              Live interactive preview of all 52 custom cards with authentic
              Home Assistant theme and state integration.
            </p>
          </div>
          <div class="header-controls">
            <div
              class="viewport-toggle"
              role="group"
              aria-label="Viewport size"
            >
              <button
                class="${this._viewport === "desktop" ? "active" : ""}"
                @click=${() => (this._viewport = "desktop")}
                title="Desktop viewport (100%)"
              >
                Desktop
              </button>
              <button
                class="${this._viewport === "tablet" ? "active" : ""}"
                @click=${() => (this._viewport = "tablet")}
                title="Tablet viewport (768px)"
              >
                Tablet
              </button>
              <button
                class="${this._viewport === "mobile" ? "active" : ""}"
                @click=${() => (this._viewport = "mobile")}
                title="Mobile viewport (390px)"
              >
                Mobile
              </button>
            </div>
            <button class="theme-toggle" @click=${this._toggleTheme}>
              ${this._darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>
        </header>

        <!-- Interactive Entity Playground Bar -->
        <aside class="entity-bar">
          <div class="entity-bar-title">
            ⚡ Live Entity Controls (Click to mutate states across preview)
          </div>
          <div class="entity-chips">
            <button
              class="chip ${this._hass.states["light.living_room"]?.state === "on" ? "active" : ""}"
              @click=${() => this._toggleEntity("light.living_room")}
            >
              Living Light: ${this._hass.states["light.living_room"]?.state}
            </button>
            <button
              class="chip ${this._hass.states["light.kitchen"]?.state === "on" ? "active" : ""}"
              @click=${() => this._toggleEntity("light.kitchen")}
            >
              Kitchen: ${this._hass.states["light.kitchen"]?.state}
            </button>
            <button
              class="chip ${this._hass.states["switch.coffee_maker"]?.state === "on" ? "active" : ""}"
              @click=${() => this._toggleEntity("switch.coffee_maker")}
            >
              Espresso: ${this._hass.states["switch.coffee_maker"]?.state}
            </button>
            <button
              class="chip ${this._hass.states["climate.living_room_ac"]?.state !== "off" ? "active" : ""}"
              @click=${() => this._mockHass.cycleClimateState()}
              title="Click to cycle Split AC modes"
            >
              AC Mode: ${this._hass.states["climate.living_room_ac"]?.state}
              (${this._hass.states["climate.living_room_ac"]?.attributes?.temperature}°C)
            </button>
            <button
              class="chip ${this._hass.states["light.wled_strip"]?.state === "on" ? "active" : ""}"
              @click=${() => this._toggleEntity("light.wled_strip")}
            >
              WLED: ${this._hass.states["light.wled_strip"]?.state}
            </button>
            <button
              class="chip ${this._hass.states["media_player.apple_tv"]?.state === "playing" ? "active" : ""}"
              @click=${() => {
                this._mockHass.callService(
                  "media_player",
                  "media_play_pause",
                  undefined,
                  { entity_id: "media_player.apple_tv" },
                );
              }}
            >
              Apple TV: ${this._hass.states["media_player.apple_tv"]?.state}
            </button>
            <button
              class="chip ${this._hass.states["cover.garage_door"]?.state === "open" ? "active" : ""}"
              @click=${() => {
                const isClosed =
                  this._hass.states["cover.garage_door"]?.state === "closed";
                this._mockHass.updateState("cover.garage_door", {
                  state: isClosed ? "open" : "closed",
                });
              }}
            >
              Garage: ${this._hass.states["cover.garage_door"]?.state}
            </button>
            <button
              class="chip ${this._hass.states["lock.front_door"]?.state === "locked" ? "active" : ""}"
              @click=${() => {
                const isLocked =
                  this._hass.states["lock.front_door"]?.state === "locked";
                this._mockHass.updateState("lock.front_door", {
                  state: isLocked ? "unlocked" : "locked",
                });
                this._mockHass.updateState("lock.front_door_lock", {
                  state: isLocked ? "unlocked" : "locked",
                });
              }}
            >
              Lock: ${this._hass.states["lock.front_door"]?.state}
            </button>
            <button
              class="chip ${this._hass.states["alarm_control_panel.home"]?.state === "armed_home" ? "active" : ""}"
              @click=${() => this._mockHass.toggleAlarmState()}
            >
              Alarm: ${this._hass.states["alarm_control_panel.home"]?.state}
            </button>
            <button
              class="chip"
              @click=${() => this._mockHass.toggleSolarSim()}
              title="Toggle between peak daylight (2.85kW) and nighttime (0kW)"
            >
              ☀️ Toggle Solar
              (${this._hass.states["sensor.ha_component_solar_power"]?.state}W)
            </button>
            <button
              class="chip toggle-unavail"
              @click=${() => this._toggleUnavailable("climate.living_room_ac")}
              title="Toggle unavailable state on Split AC"
            >
              ⚠️ Sim AC Unavail
            </button>
          </div>
        </aside>

        <!-- Navigation Tabs -->
        <nav class="dev-tabs">
          ${[
            { id: "all", label: "All Canonical Components (34)" },
            { id: "primitives", label: "1. Primitives & Presentation (10)" },
            { id: "controls", label: "2. Navigation & Controls (8)" },
            { id: "devices", label: "3. Specialised Controllers (5)" },
            { id: "compositions", label: "4. Composed Dashboards & Suites (11)" },
            { id: "compat", label: "5. Compatibility Aliases (5)" },
          ].map(
            (tab) => html`
              <button
                class="tab ${this._activeTab === tab.id ? "active" : ""}"
                @click=${() => (this._activeTab = tab.id)}
              >
                ${tab.label}
              </button>
            `,
          )}
        </nav>

        <main class="dev-main">
          <!-- 1. Standalone Cards -->
          ${
            this._activeTab === "all" || this._activeTab === "primitives"
              ? html`
                  <section class="dev-section">
                    <div class="section-header">
                      <h2>1. Standalone Cards</h2>
                      <p>
                        Independent foundational Lovelace cards: status card,
                        action tile, quick bar, and metric badge
                      </p>
                    </div>

                    <div class="card-grid">
                      ${this._renderShowcase(
                        "ha-status-card",
                        "Status Card (Toggleable Entity)",
                        html`
                          <ha-status-card
                            .hass=${this._hass}
                            .config=${{
                              type: "custom:ha-status-card",
                              entity: "light.living_room",
                              name: "Living Room Lights",
                              show_toggle: true,
                              secondary_info: "last-changed",
                            }}
                          ></ha-status-card>
                        `,
                        "custom:ha-status-card",
                      )}
                      ${this._renderShowcase(
                        "ha-status-card",
                        "Status Card (Climate State)",
                        html`
                          <ha-status-card
                            .hass=${this._hass}
                            .config=${{
                              type: "custom:ha-status-card",
                              entity: "climate.thermostat",
                              name: "Main Thermostat",
                              show_toggle: false,
                              secondary_info: "state",
                            }}
                          ></ha-status-card>
                        `,
                        "custom:ha-status-card",
                      )}
                    </div>

                    <div class="card-grid tiles-grid">
                      ${this._renderShowcase(
                        "ha-action-tile",
                        "Action Tile (Espresso with Sensor Badge)",
                        html`
                          <ha-action-tile
                            .hass=${this._hass}
                            .config=${{
                              type: "custom:ha-action-tile",
                              entity: "switch.coffee_maker",
                              name: "Espresso Machine",
                              color: "#ff9800",
                              badge_entity: "sensor.living_room_temperature",
                            }}
                          ></ha-action-tile>
                        `,
                        "custom:ha-action-tile",
                      )}
                      ${this._renderShowcase(
                        "ha-action-tile",
                        "Action Tile (Living Light)",
                        html`
                          <ha-action-tile
                            .hass=${this._hass}
                            .config=${{
                              type: "custom:ha-action-tile",
                              entity: "light.living_room",
                              name: "Living Ceiling",
                              color: "#03a9f4",
                            }}
                          ></ha-action-tile>
                        `,
                        "custom:ha-action-tile",
                      )}
                      ${this._renderShowcase(
                        "ha-action-tile",
                        "Action Tile (Apple TV)",
                        html`
                          <ha-action-tile
                            .hass=${this._hass}
                            .config=${{
                              type: "custom:ha-action-tile",
                              entity: "media_player.apple_tv",
                              name: "Apple TV 4K",
                              color: "#e91e63",
                            }}
                          ></ha-action-tile>
                        `,
                        "custom:ha-action-tile",
                      )}
                    </div>

                    ${this._renderShowcase(
                      "ha-quick-bar",
                      "Quick Bar (Multi-Entity Control Strip)",
                      html`
                        <ha-quick-bar
                          .hass=${this._hass}
                          .config=${{
                            type: "custom:ha-quick-bar",
                            title: "Quick Access Controls",
                            entities: [
                              "light.living_room",
                              "light.kitchen",
                              "switch.coffee_maker",
                              "media_player.apple_tv",
                              "cover.garage_door",
                              "lock.front_door",
                            ],
                            show_active_count: true,
                          }}
                        ></ha-quick-bar>
                      `,
                      "custom:ha-quick-bar",
                    )}

                    <div class="card-grid metric-grid">
                      ${this._renderShowcase(
                        "ha-metric-badge",
                        "Metric Badge (Temperature Thresholds)",
                        html`
                          <ha-metric-badge
                            .hass=${this._hass}
                            .config=${{
                              type: "custom:ha-metric-badge",
                              entity: "sensor.living_room_temperature",
                              thresholds: [
                                { value: 18, color: "#03a9f4" },
                                { value: 24, color: "#4caf50" },
                                { value: 28, color: "#ff9800" },
                              ],
                            }}
                          ></ha-metric-badge>
                        `,
                        "custom:ha-metric-badge",
                      )}
                      ${this._renderShowcase(
                        "ha-metric-badge",
                        "Metric Badge (Power Consumption)",
                        html`
                          <ha-metric-badge
                            .hass=${this._hass}
                            .config=${{
                              type: "custom:ha-metric-badge",
                              entity: "sensor.power_consumption",
                              thresholds: [
                                { value: 200, color: "#4caf50" },
                                { value: 600, color: "#ff9800" },
                                { value: 1200, color: "#f44336" },
                              ],
                            }}
                          ></ha-metric-badge>
                        `,
                        "custom:ha-metric-badge",
                      )}
                    </div>
                  </section>
                `
              : ""
          }

          <!-- 2. Presentation & Status Cards -->
          ${
            this._activeTab === "all" || this._activeTab === "primitives"
              ? html`
                  <section class="dev-section">
                    <div class="section-header">
                      <h2>2. Presentation & Status Cards</h2>
                      <p>
                        Context strips, KPIs, status rows, progress gauges,
                        notices, lists, text effects, and empty states
                      </p>
                    </div>

                    ${this._renderShowcase(
                      "component-context-strip-v3",
                      "Context Strip V3 (Live Energy & Grid Telemetry)",
                      html`
                        <component-context-strip-v3
                          .hass=${this._hass}
                          .config=${{
                            type: "custom:component-context-strip-v3",
                            left_text: "Solar Active",
                            center_1_label: "House",
                            center_1_value: "1.2 kW",
                            center_2_label: "Solar",
                            center_2_value: "2.8 kW",
                            center_3_label: "Export",
                            center_3_value: "1.6 kW",
                            right_text: "Grid Normal",
                          }}
                        ></component-context-strip-v3>
                      `,
                      "custom:component-context-strip-v3",
                    )}

                    <div class="card-grid">
                      ${this._renderShowcase(
                        "component-single-kpi-v2",
                        "Single KPI V2 (Temperature Metric)",
                        html`
                          <component-single-kpi-v2
                            .hass=${this._hass}
                            .config=${{
                              type: "custom:component-single-kpi-v2",
                              entity: "sensor.living_room_temperature",
                              label: "Living Room Temp",
                              value: "22.8°C",
                              support_value: "Comfortable",
                              support_label: "HVAC cooling active",
                            }}
                          ></component-single-kpi-v2>
                        `,
                        "custom:component-single-kpi-v2",
                      )}
                      ${this._renderShowcase(
                        "component-three-stat-v2",
                        "Three Stat V2 (Summary Stat Row)",
                        html`
                          <component-three-stat-v2
                            .hass=${this._hass}
                            .config=${{
                              type: "custom:component-three-stat-v2",
                              metric_1_label: "Living",
                              metric_1_value: "22.8°C",
                              metric_2_label: "Humidity",
                              metric_2_value: "55%",
                              metric_3_label: "Power",
                              metric_3_value: "480W",
                            }}
                          ></component-three-stat-v2>
                        `,
                        "custom:component-three-stat-v2",
                      )}
                    </div>

                    ${this._renderShowcase(
                      "component-status-row-v2",
                      "Status Row V2 (Front Door Lock State)",
                      html`
                        <component-status-row-v2
                          .hass=${this._hass}
                          .config=${{
                            type: "custom:component-status-row-v2",
                            entity: "lock.front_door",
                            title: "Front Door Lock",
                            description: "Main entryway secure",
                            status_value: "Locked",
                            status_label: "Secure",
                            icon: "mdi:lock-check",
                          }}
                        ></component-status-row-v2>
                      `,
                      "custom:component-status-row-v2",
                    )}
                    ${this._renderShowcase(
                      "component-progress-v2",
                      "Progress Bar V2 (Daily Solar Production vs Goal)",
                      html`
                        <component-progress-v2
                          .hass=${this._hass}
                          .config=${{
                            type: "custom:component-progress-v2",
                            label: "Daily Solar Generation",
                            value: "14.2 kWh",
                            progress: 71,
                            target_value: "20.0 kWh",
                            target_label: "Goal",
                          }}
                        ></component-progress-v2>
                      `,
                      "custom:component-progress-v2",
                    )}
                    ${this._renderShowcase(
                      "component-action-v2",
                      "Action Trigger Card V2 (Goodnight Scene)",
                      html`
                        <component-action-v2
                          .hass=${this._hass}
                          .config=${{
                            type: "custom:component-action-v2",
                            title: "Goodnight Routine",
                            description:
                              "Turn off all active downlights and arm home security",
                            action_text: "Activate",
                            icon: "mdi:bed-clock",
                            entity: "scene.goodnight",
                          }}
                        ></component-action-v2>
                      `,
                      "custom:component-action-v2",
                    )}
                    ${this._renderShowcase(
                      "component-list-v2",
                      "List Card V2 (Active High-Draw Appliances)",
                      html`
                        <component-list-v2
                          .hass=${this._hass}
                          .config=${{
                            type: "custom:component-list-v2",
                            title: "Active Loads",
                            rows: [
                              {
                                title: "Living Room Split AC",
                                description: "Climate",
                                value: "21°C",
                                label: "Cooling",
                              },
                              {
                                title: "Water Heater",
                                description: "Storage",
                                value: "58°C",
                                label: "Ready",
                              },
                              {
                                title: "Home Office Workstation",
                                description: "Plug",
                                value: "145W",
                                label: "Active",
                              },
                            ],
                          }}
                        ></component-list-v2>
                      `,
                      "custom:component-list-v2",
                    )}
                    ${this._renderShowcase(
                      "component-notice-v2",
                      "Notice Card V2 (Active Tariff Banner)",
                      html`
                        <component-notice-v2
                          .hass=${this._hass}
                          .config=${{
                            type: "custom:component-notice-v2",
                            tone: "info",
                            icon: "mdi:information-outline",
                            title: "Energy Tariff Active",
                            message:
                              "Off-peak window active until 3:00 PM (14.2¢ / kWh).",
                          }}
                        ></component-notice-v2>
                      `,
                      "custom:component-notice-v2",
                    )}
                    ${this._renderShowcase(
                      "component-text-effect-v1",
                      "Text Effect V1 (Motion Signature Status)",
                      html`
                        <component-text-effect-v1
                          .hass=${this._hass}
                          .config=${{
                            type: "custom:component-text-effect-v1",
                            text: "ALL SYSTEMS NORMAL",
                            description:
                              "Perimeter armed, climate optimal, solar export active",
                            icon: "mdi:shield-check",
                            effect: "stamp",
                            speed: 2.6,
                          }}
                        ></component-text-effect-v1>
                      `,
                      "custom:component-text-effect-v1",
                    )}
                    ${this._renderShowcase(
                      "component-section-separator-v2",
                      "Section Separator V2 (Divider Header)",
                      html`
                        <component-section-separator-v2
                          .hass=${this._hass}
                          .config=${{
                            type: "custom:component-section-separator-v2",
                            title: "Primary Environment Controls",
                            icon: "mdi:tune-vertical",
                          }}
                        ></component-section-separator-v2>
                      `,
                      "custom:component-section-separator-v2",
                    )}

                    ${this._renderShowcase(
                      "component-empty-state-v3",
                      "Empty State V3 (Quiet State)",
                      html`
                        <component-empty-state-v3
                          .hass=${this._hass}
                          .config=${{
                            type: "custom:component-empty-state-v3",
                            icon: "mdi:check-circle-outline",
                            title: "No Active Alerts",
                            message:
                              "All household systems and sensors reporting normal conditions.",
                          }}
                        ></component-empty-state-v3>
                      `,
                      "custom:component-empty-state-v3",
                    )}
                  </section>
                `
              : ""
          }

          <!-- 3. Navigation Cards -->
          ${
            this._activeTab === "all" || this._activeTab === "controls"
              ? html`
                  <section class="dev-section">
                    <div class="section-header">
                      <h2>3. Navigation Cards</h2>
                      <p>
                        Nav tiles, quick navigation headers, room navigation
                        buttons, and room master sheets
                      </p>
                    </div>

                    <div class="card-grid">
                      ${this._renderShowcase(
                        "component-nav-tile-v2",
                        "Nav Tile V2 (Energy Dashboard Path)",
                        html`
                          <component-nav-tile-v2
                            .hass=${this._hass}
                            .config=${{
                              type: "custom:component-nav-tile-v2",
                              icon: "mdi:lightning-bolt",
                              title: "Energy Dashboard",
                              context:
                                "Live solar: 2.85 kW · Self-sufficiency: 82%",
                              navigation_path: "/energy",
                            }}
                          ></component-nav-tile-v2>
                        `,
                        "custom:component-nav-tile-v2",
                      )}
                      ${this._renderShowcase(
                        "component-nav-tile-v2",
                        "Nav Tile V2 (Security Center Path)",
                        html`
                          <component-nav-tile-v2
                            .hass=${this._hass}
                            .config=${{
                              type: "custom:component-nav-tile-v2",
                              icon: "mdi:shield-home-outline",
                              title: "Security Center",
                              context:
                                "5 perimeter sensors secured · Armed Home",
                              navigation_path: "/security",
                            }}
                          ></component-nav-tile-v2>
                        `,
                        "custom:component-nav-tile-v2",
                      )}
                    </div>

                    ${this._renderShowcase(
                      "component-quick-nav-v2",
                      "Quick Navigation V2 (Multi-Path Nav Header)",
                      html`
                        <component-quick-nav-v2
                          .hass=${this._hass}
                          .config=${{
                            type: "custom:component-quick-nav-v2",
                            left_icon: "mdi:home-analytics",
                            left_text: "Home Dashboard",
                            left_entity: "sensor.living_room_temperature",
                            action_1_icon: "mdi:lightning-bolt",
                            action_1_text: "Energy",
                            action_1_path: "/energy",
                            action_2_icon: "mdi:shield-lock-outline",
                            action_2_text: "Security",
                            action_2_path: "/security",
                          }}
                        ></component-quick-nav-v2>
                      `,
                      "custom:component-quick-nav-v2",
                    )}
                    ${this._renderShowcase(
                      "component-room-navigation-v1",
                      "Room Navigation V1 (Area Nav Button)",
                      html`
                        <component-room-navigation-v1
                          .hass=${this._hass}
                          .config=${{
                            type: "custom:component-room-navigation-v1",
                            area: "living_room",
                            name: "Living Room",
                            icon: "mdi:sofa-outline",
                            navigation_path: "/living-room",
                          }}
                        ></component-room-navigation-v1>
                      `,
                      "custom:component-room-navigation-v1",
                    )}
                    ${this._renderShowcase(
                      "component-room-sheet-v2",
                      "Room Sheet V2 (Living Room Detailed Control Sheet)",
                      html`
                        <component-room-sheet-v2
                          .hass=${this._hass}
                          .config=${{
                            type: "custom:component-room-sheet-v2",
                            title: "Living Room Master Sheet",
                            icon: "mdi:sofa",
                            rows: [
                              {
                                section: "Climate & Air",
                                icon: "mdi:thermometer",
                                name: "Ambient Temperature",
                                state: "HVAC Cooling Target: 21°C",
                                value: "22.8°C",
                                entity: "sensor.living_room_temperature",
                              },
                              {
                                section: "Lighting",
                                icon: "mdi:ceiling-light",
                                name: "Ceiling Downlights",
                                state: "80% Brightness",
                                value: "On",
                                entity: "light.living_room",
                              },
                              {
                                section: "Lighting",
                                icon: "mdi:led-strip-variant",
                                name: "Accent WLED Strip",
                                state: "Aurora Effect",
                                value: "On",
                                entity: "light.wled_strip",
                              },
                              {
                                section: "Entertainment",
                                icon: "mdi:apple",
                                name: "Apple TV 4K",
                                state: "Foundation S2:E8",
                                value: "Playing",
                                entity: "media_player.apple_tv",
                              },
                            ],
                          }}
                        ></component-room-sheet-v2>
                      `,
                      "custom:component-room-sheet-v2",
                    )}
                  </section>
                `
              : ""
          }

          <!-- 4. Controls & System Cards -->
          ${
            this._activeTab === "all" || this._activeTab === "controls"
              ? html`
                  <section class="dev-section">
                    <div class="section-header">
                      <h2>4. Controls & System Cards</h2>
                      <p>
                        Control rows, media rows, update notifications, and
                        auto-discovery cards
                      </p>
                    </div>

                    <div class="card-grid">
                      ${this._renderShowcase(
                        "component-control-row-v2",
                        "Control Row V2 (Slider Brightness Control)",
                        html`
                          <component-control-row-v2
                            .hass=${this._hass}
                            .config=${{
                              type: "custom:component-control-row-v2",
                              entity: "light.living_room",
                              name: "Ceiling Brightness",
                              mode: "slider",
                            }}
                          ></component-control-row-v2>
                        `,
                        "custom:component-control-row-v2",
                      )}
                      ${this._renderShowcase(
                        "component-control-row-v2",
                        "Control Row V2 (Toggle Power Control)",
                        html`
                          <component-control-row-v2
                            .hass=${this._hass}
                            .config=${{
                              type: "custom:component-control-row-v2",
                              entity: "switch.coffee_maker",
                              name: "Espresso Machine Power",
                              mode: "toggle",
                            }}
                          ></component-control-row-v2>
                        `,
                        "custom:component-control-row-v2",
                      )}
                    </div>

                    ${this._renderShowcase(
                      "component-media-row-v2",
                      "Media Row V2 (Interactive Media Player Row)",
                      html`
                        <component-media-row-v2
                          .hass=${this._hass}
                          .config=${{
                            type: "custom:component-media-row-v2",
                            entity: "media_player.apple_tv",
                            title: "Apple TV 4K",
                            icon: "mdi:apple",
                          }}
                        ></component-media-row-v2>
                      `,
                      "custom:component-media-row-v2",
                    )}
                    ${this._renderShowcase(
                      "component-update-summary-v3",
                      "Update Summary V3 (Core Update Banner)",
                      html`
                        <component-update-summary-v3
                          .hass=${this._hass}
                          .config=${{
                            type: "custom:component-update-summary-v3",
                            count: "1",
                            title: "system update ready",
                            message:
                              "Home Assistant Core 2026.8.1 ready to install.",
                          }}
                        ></component-update-summary-v3>
                      `,
                      "custom:component-update-summary-v3",
                    )}
                    ${this._renderShowcase(
                      "component-update-row-v3",
                      "Update Row V3 (HA Core Release Details)",
                      html`
                        <component-update-row-v3
                          .hass=${this._hass}
                          .config=${{
                            type: "custom:component-update-row-v3",
                            entity: "update.ha_core",
                            title: "Home Assistant Core",
                          }}
                        ></component-update-row-v3>
                      `,
                      "custom:component-update-row-v3",
                    )}

                    <div class="card-grid">
                      ${this._renderShowcase(
                        "component-device-discovery-v2",
                        "Device Discovery V2 (Auto-Discovered Integrations)",
                        html`
                          <component-device-discovery-v2
                            .hass=${this._hass}
                            .config=${{
                              type: "custom:component-device-discovery-v2",
                              title: "Discovered Devices",
                              demo: true,
                            }}
                          ></component-device-discovery-v2>
                        `,
                        "custom:component-device-discovery-v2",
                      )}
                      ${this._renderShowcase(
                        "component-device-aware-auto-entities-v1",
                        "Device-Aware Auto-Entities V1 (Dynamic Entity Filter)",
                        html`
                          <component-device-aware-auto-entities-v1
                            .hass=${this._hass}
                            .config=${{
                              type: "custom:component-device-aware-auto-entities-v1",
                              header: {
                                title: "Auto-Discovered Room Entities",
                                icon: "mdi:filter-variant",
                              },
                              filter: {
                                include: [
                                  { domain: "light" },
                                  { domain: "switch" },
                                ],
                              },
                            }}
                          ></component-device-aware-auto-entities-v1>
                        `,
                        "custom:component-device-aware-auto-entities-v1",
                      )}
                    </div>
                  </section>
                `
              : ""
          }

          <!-- 5. Device Controllers -->
          ${
            this._activeTab === "all" || this._activeTab === "devices"
              ? html`
                  <section class="dev-section">
                    <div class="section-header">
                      <h2>5. Device Controllers</h2>
                      <p>
                        Split AC HVAC, WLED strips, Apple TV remote, Garage
                        door, and security camera controllers
                      </p>
                    </div>

                    <div class="card-grid">
                      ${this._renderShowcase(
                        "component-split-controller-v4",
                        "Split System AC Controller V4 (Multi-Mode Climate)",
                        html`
                          <component-split-controller-v4
                            .hass=${this._hass}
                            .config=${{
                              type: "custom:component-split-controller-v4",
                              entity: "climate.living_room_ac",
                              title: "Mitsubishi Living AC",
                            }}
                          ></component-split-controller-v4>
                        `,
                        "custom:component-split-controller-v4",
                      )}
                      ${this._renderShowcase(
                        "component-wled-controller-v1",
                        "WLED Strip Controller V1 (Presets, Palettes, Speed)",
                        html`
                          <component-wled-controller-v1
                            .hass=${this._hass}
                            .config=${{
                              type: "custom:component-wled-controller-v1",
                              entity: "light.wled_strip",
                              title: "Accent LED Strip",
                            }}
                          ></component-wled-controller-v1>
                        `,
                        "custom:component-wled-controller-v1",
                      )}
                    </div>

                    <div class="card-grid">
                      ${this._renderShowcase(
                        "component-apple-tv-controller-v1",
                        "Apple TV Controller V1 (Remote & Media Interface)",
                        html`
                          <component-apple-tv-controller-v1
                            .hass=${this._hass}
                            .config=${{
                              type: "custom:component-apple-tv-controller-v1",
                              entity: "media_player.apple_tv",
                              remote_entity: "remote.living_room_apple_tv",
                              title: "Apple TV 4K Remote",
                              demo: true,
                            }}
                          ></component-apple-tv-controller-v1>
                        `,
                        "custom:component-apple-tv-controller-v1",
                      )}
                      ${this._renderShowcase(
                        "component-garage-door-controller-v1",
                        "Garage Door Controller V1 (Momentary & Reed Sensor)",
                        html`
                          <component-garage-door-controller-v1
                            .hass=${this._hass}
                            .config=${{
                              type: "custom:component-garage-door-controller-v1",
                              entity: "cover.garage_door",
                              control_entity: "button.garage_door_operator",
                              title: "Main Garage Door",
                            }}
                          ></component-garage-door-controller-v1>
                        `,
                        "custom:component-garage-door-controller-v1",
                      )}
                    </div>

                    ${this._renderShowcase(
                      "component-camera-controller-v2",
                      "Camera Controller V2 (Live Feed & PTZ/Controls)",
                      html`
                        <component-camera-controller-v2
                          .hass=${this._hass}
                          .config=${{
                            type: "custom:component-camera-controller-v2",
                            camera_entity: "camera.front_doorbell",
                            title: "Front Doorbell Camera",
                          }}
                        ></component-camera-controller-v2>
                      `,
                      "custom:component-camera-controller-v2",
                    )}
                  </section>
                `
              : ""
          }

          <!-- 6. Security Family -->
          ${
            this._activeTab === "all" || this._activeTab === "compositions"
              ? html`
                  <section class="dev-section">
                    <div class="section-header">
                      <h2>6. Security Family</h2>
                      <p>
                        Household security overview, live camera wall, entry
                        points status, and comprehensive security dashboard
                      </p>
                    </div>

                    ${this._renderShowcase(
                      "component-security-summary-v1",
                      "Security Summary V1 (Armed Status & Alarm Mode)",
                      html`
                        <component-security-summary-v1
                          .hass=${this._hass}
                          .config=${{
                            type: "custom:component-security-summary-v1",
                            title: "Security Status & Arming",
                            profile: "household-security",
                          }}
                        ></component-security-summary-v1>
                      `,
                      "custom:component-security-summary-v1",
                    )}
                    ${this._renderShowcase(
                      "component-security-camera-wall-v3",
                      "Security Camera Wall V3 (Multi-Stream Live Wall)",
                      html`
                        <component-security-camera-wall-v3
                          .hass=${this._hass}
                          .config=${{
                            type: "custom:component-security-camera-wall-v3",
                            title: "Perimeter Camera Wall",
                            cameras: [
                              "camera.front_doorbell",
                              "camera.front_porch",
                              "camera.driveway",
                            ],
                            columns: 3,
                          }}
                        ></component-security-camera-wall-v3>
                      `,
                      "custom:component-security-camera-wall-v3",
                    )}
                    ${this._renderShowcase(
                      "component-security-entry-points-v1",
                      "Security Entry Points V1 (Doors, Windows, Gates & Locks)",
                      html`
                        <component-security-entry-points-v1
                          .hass=${this._hass}
                          .config=${{
                            type: "custom:component-security-entry-points-v1",
                            title: "Perimeter Entry Points",
                            profile: "household-security",
                          }}
                        ></component-security-entry-points-v1>
                      `,
                      "custom:component-security-entry-points-v1",
                    )}
                    ${this._renderShowcase(
                      "component-security-dashboard-v1",
                      "Security Dashboard V1 (Full Security Management Center)",
                      html`
                        <component-security-dashboard-v1
                          .hass=${this._hass}
                          .config=${{
                            type: "custom:component-security-dashboard-v1",
                            title: "Comprehensive Security Center",
                            profile: "household-security",
                          }}
                        ></component-security-dashboard-v1>
                      `,
                      "custom:component-security-dashboard-v1",
                    )}
                  </section>
                `
              : ""
          }

          <!-- 7. Energy Family -->
          ${
            this._activeTab === "all" || this._activeTab === "compositions"
              ? html`
                  <section class="dev-section">
                    <div class="section-header">
                      <h2>7. Energy Family</h2>
                      <p>
                        Day selector, energy summary, solar daylight telemetry,
                        24h history graphs, metric pairs, and full energy
                        dashboard
                      </p>
                    </div>

                    ${this._renderShowcase(
                      "component-energy-day-selector-v1",
                      "Energy Day Selector V1 (Date Stepper Navigation Bar)",
                      html`
                        <component-energy-day-selector-v1
                          .hass=${this._hass}
                          .config=${{
                            type: "custom:component-energy-day-selector-v1",
                            channel: "energy-day",
                          }}
                        ></component-energy-day-selector-v1>
                      `,
                      "custom:component-energy-day-selector-v1",
                    )}
                    ${this._renderShowcase(
                      "component-energy-summary-v1",
                      "Energy Summary V1 (Live Solar, House, Grid, & Daily Totals)",
                      html`
                        <component-energy-summary-v1
                          .hass=${this._hass}
                          .config=${{
                            type: "custom:component-energy-summary-v1",
                            title: "Live Power & Today's Energy",
                            house_entity: "sensor.ha_component_house_power",
                            solar_entity: "sensor.ha_component_solar_power",
                            grid_entity: "sensor.ha_component_grid_power",
                            day_channel: "energy-day",
                          }}
                        ></component-energy-summary-v1>
                      `,
                      "custom:component-energy-summary-v1",
                    )}

                    <div class="card-grid">
                      ${this._renderShowcase(
                        "solar-daylight-card-v7",
                        "Solar Daylight Card V7 (Sun Arc & Elevation Telemetry)",
                        html`
                          <solar-daylight-card-v7
                            .hass=${this._hass}
                            .config=${{
                              type: "custom:solar-daylight-card-v7",
                              weather_entity: "weather.forecast_home",
                              sun_entity: "sun.sun",
                            }}
                          ></solar-daylight-card-v7>
                        `,
                        "custom:solar-daylight-card-v7",
                      )}
                      ${this._renderShowcase(
                        "metric-pair-card-v3",
                        "Metric Pair Card V3 (Live Consumption vs Solar Output)",
                        html`
                          <metric-pair-card-v3
                            .hass=${this._hass}
                            .config=${{
                              type: "custom:metric-pair-card-v3",
                              left_value: "1.24 kW",
                              left_label: "House Load",
                              left_sublabel: "Normal baseline",
                              right_value: "2.85 kW",
                              right_label: "Solar Production",
                              right_sublabel: "Peak generation",
                              left_more_info_entity:
                                "sensor.ha_component_house_power",
                              right_more_info_entity:
                                "sensor.ha_component_solar_power",
                            }}
                          ></metric-pair-card-v3>
                        `,
                        "custom:metric-pair-card-v3",
                      )}
                    </div>

                    ${this._renderShowcase(
                      "component-history-graph-v2",
                      "History Graph V2 (Interactive SVG Power Chart)",
                      html`
                        <component-history-graph-v2
                          .hass=${this._hass}
                          .config=${{
                            type: "custom:component-history-graph-v2",
                            title: "24-Hour Power Demand",
                            meta_text: "Live Smart Meter History",
                            series_1_label: "Solar Generation",
                            series_2_label: "House Consumption",
                          }}
                        ></component-history-graph-v2>
                      `,
                      "custom:component-history-graph-v2",
                    )}
                    ${this._renderShowcase(
                      "energy-history-card-v3",
                      "Energy History Card V3 (24h/Calendar Day Energy Balance)",
                      html`
                        <energy-history-card-v3
                          .hass=${this._hass}
                          .config=${{
                            type: "custom:energy-history-card-v3",
                            title: "Energy Balance (24h)",
                            house_entity: "sensor.ha_component_house_power",
                            solar_entity: "sensor.ha_component_solar_power",
                            grid_entity: "sensor.ha_component_grid_power",
                            day_channel: "energy-day",
                          }}
                        ></energy-history-card-v3>
                      `,
                      "custom:energy-history-card-v3",
                    )}
                    ${this._renderShowcase(
                      "component-energy-dashboard-v1",
                      "Energy Dashboard V1 (Unified Energy Management Board)",
                      html`
                        <component-energy-dashboard-v1
                          .hass=${this._hass}
                          .config=${{
                            type: "custom:component-energy-dashboard-v1",
                            profile: "household-energy",
                            title: "Solar & Grid Energy Management",
                          }}
                        ></component-energy-dashboard-v1>
                      `,
                      "custom:component-energy-dashboard-v1",
                    )}
                  </section>
                `
              : ""
          }

          <!-- 8. Home Overview & Directories -->
          ${
            this._activeTab === "all" || this._activeTab === "compositions"
              ? html`
                  <section class="dev-section">
                    <div class="section-header">
                      <h2>8. Home Overview & Composition Cards</h2>
                      <p>
                        Welcome header, household attention queue, favourites,
                        smart collections, directories, and full home overview
                        boards
                      </p>
                    </div>

                    ${this._renderShowcase(
                      "component-welcome-header-v1",
                      "Welcome Header V1 (Greeting, Clock & Live Weather)",
                      html`
                        <component-welcome-header-v1
                          .hass=${this._hass}
                          .config=${{
                            type: "custom:component-welcome-header-v1",
                            weather_entity: "weather.forecast_home",
                            title: "Residence",
                          }}
                        ></component-welcome-header-v1>
                      `,
                      "custom:component-welcome-header-v1",
                    )}

                    ${this._renderShowcase(
                      "component-household-attention-v2",
                      "Household Attention V2 (System & Security Queue)",
                      html`
                        <component-household-attention-v2
                          .hass=${this._hass}
                          .config=${{
                            type: "custom:component-household-attention-v2",
                            title: "Household Attention",
                            demo: true,
                          }}
                        ></component-household-attention-v2>
                      `,
                      "custom:component-household-attention-v2",
                    )}

                    ${this._renderShowcase(
                      "component-favourites-v3",
                      "Favourites V3 (Frequently Used Device Controls)",
                      html`
                        <component-favourites-v3
                          .hass=${this._hass}
                          .config=${{
                            type: "custom:component-favourites-v3",
                            title: "Quick Access Favourites",
                            max: 4,
                            items: [
                              {
                                entity_id: "light.living_room",
                                name: "Living Room",
                              },
                              {
                                entity_id: "climate.living_room_ac",
                                name: "Living AC",
                              },
                              {
                                entity_id: "switch.coffee_maker",
                                name: "Espresso",
                              },
                              {
                                entity_id: "cover.garage_door",
                                name: "Garage",
                              },
                            ],
                          }}
                        ></component-favourites-v3>
                      `,
                      "custom:component-favourites-v3",
                    )}

                    ${this._renderShowcase(
                      "component-smart-collection-v3",
                      "Smart Collection V3 (Auto-Populated Controls Grid)",
                      html`
                        <component-smart-collection-v3
                          .hass=${this._hass}
                          .config=${{
                            type: "custom:component-smart-collection-v3",
                            title: "Smart Control Collection",
                            mode: "all",
                            show_header: true,
                          }}
                        ></component-smart-collection-v3>
                      `,
                      "custom:component-smart-collection-v3",
                    )}
                    ${this._renderShowcase(
                      "component-household-directory-v3",
                      "Household Directory V3 (Quick Action Grid)",
                      html`
                        <component-household-directory-v3
                          .hass=${this._hass}
                          .config=${{
                            type: "custom:component-household-directory-v3",
                            title: "Household Quick Actions",
                          }}
                        ></component-household-directory-v3>
                      `,
                      "custom:component-household-directory-v3",
                    )}
                    ${this._renderShowcase(
                      "component-room-directory-v4",
                      "Room Directory V4 (Area Summary & Sheets)",
                      html`
                        <component-room-directory-v4
                          .hass=${this._hass}
                          .config=${{
                            type: "custom:component-room-directory-v4",
                            title: "Rooms & Areas Directory",
                          }}
                        ></component-room-directory-v4>
                      `,
                      "custom:component-room-directory-v4",
                    )}
                    ${this._renderShowcase(
                      "component-home-overview-v5",
                      "Home Overview V5 (Residence Overview Board)",
                      html`
                        <component-home-overview-v5
                          .hass=${this._hass}
                          .config=${{
                            type: "custom:component-home-overview-v5",
                            title: "Complete Home Overview Board",
                            weather_entity: "weather.forecast_home",
                          }}
                        ></component-home-overview-v5>
                      `,
                      "custom:component-home-overview-v5",
                    )}
                  </section>
                `
              : ""
          }

          <!-- 9. Compatibility Registration Aliases -->
          ${
            this._activeTab === "all" || this._activeTab === "compat"
              ? html`
                  <section class="dev-section">
                    <div class="section-header">
                      <h2>5. Compatibility Registration Aliases (5)</h2>
                      <p>
                        Backward-compatible custom element registrations and
                        adapter cards ensuring legacy Lovelace YAML compatibility
                        without duplicated domain logic
                      </p>
                    </div>

                    <div class="card-grid">
                      ${this._renderShowcase(
                        "component-camera-controller-v1",
                        "Camera Controller V1 (Legacy Compatibility Adapter)",
                        html`
                          <component-camera-controller-v1
                            .hass=${this._hass}
                            .config=${{
                              type: "custom:component-camera-controller-v1",
                              camera_entity: "camera.front_doorbell",
                              title: "Front Doorbell (V1 Adapter)",
                            }}
                          ></component-camera-controller-v1>
                        `,
                        "custom:component-camera-controller-v1",
                      )}
                      ${this._renderShowcase(
                        "component-household-attention-v1",
                        "Household Attention V1 (V1 Compatibility Adapter)",
                        html`
                          <component-household-attention-v1
                            .hass=${this._hass}
                            .config=${{
                              type: "custom:component-household-attention-v1",
                              title: "Household Attention (V1 Adapter)",
                              demo: true,
                            }}
                          ></component-household-attention-v1>
                        `,
                        "custom:component-household-attention-v1",
                      )}
                    </div>

                    <div class="card-grid">
                      ${this._renderShowcase(
                        "component-empty-state-v2",
                        "Empty State V2 (Legacy Adapter)",
                        html`
                          <component-empty-state-v2
                            .hass=${this._hass}
                            .config=${{
                              type: "custom:component-empty-state-v2",
                              icon: "mdi:clipboard-check-outline",
                              title: "Queue Empty",
                              message:
                                "No maintenance actions or pending updates in the queue.",
                            }}
                          ></component-empty-state-v2>
                        `,
                        "custom:component-empty-state-v2",
                      )}
                      ${this._renderShowcase(
                        "component-home-overview-v4",
                        "Home Overview V4 (Legacy Compatibility Adapter)",
                        html`
                          <component-home-overview-v4
                            .hass=${this._hass}
                            .config=${{
                              type: "custom:component-home-overview-v4",
                              title: "Home Overview Board (V4 Adapter)",
                              weather_entity: "weather.forecast_home",
                            }}
                          ></component-home-overview-v4>
                        `,
                        "custom:component-home-overview-v4",
                      )}
                    </div>

                    ${this._renderShowcase(
                      "component-favourites-minimal-v1",
                      "Favourites Minimal V1 (Condensed Grid Adapter)",
                      html`
                        <component-favourites-minimal-v1
                          .hass=${this._hass}
                          .config=${{
                            type: "custom:component-favourites-minimal-v1",
                            title: "Favourites (Minimal)",
                            items: [
                              {
                                entity_id: "light.living_room",
                                name: "Living Room",
                              },
                              {
                                entity_id: "climate.living_room_ac",
                                name: "Living AC",
                              },
                            ],
                          }}
                        ></component-favourites-minimal-v1>
                      `,
                      "custom:component-favourites-minimal-v1",
                    )}
                  </section>
                `
              : ""
          }
        </main>
      </div>
    `;
  }

  public static override styles = css`
    :host {
      display: block;
      font-family:
        -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
        Arial, sans-serif;
      color: var(--primary-text-color);
      background: var(--catalogue-page-bg);
      min-height: 100vh;
      padding: 32px 20px 100px;
    }

    .dark-mode {
      background: var(--catalogue-page-bg);
      color: var(--primary-text-color);
    }

    .dev-container {
      margin: 0 auto;
      padding: 0;
      transition:
        max-width 0.25s ease,
        background-color 0.2s ease;
    }

    .viewport-desktop {
      max-width: 1140px;
    }

    .viewport-tablet {
      max-width: 768px;
    }

    .viewport-mobile {
      max-width: 390px;
    }

    .dev-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding-bottom: 20px;
      margin-bottom: 24px;
      border-bottom: 1px solid var(--catalogue-border);
      flex-wrap: wrap;
      gap: 12px;
    }

    .header-left {
      min-width: 0;
    }

    h1 {
      font-size: 26px;
      margin: 0;
      font-weight: 750;
      letter-spacing: -0.025em;
    }

    .header-sub {
      margin: 4px 0 0;
      color: var(--secondary-text-color);
      font-size: 14px;
    }

    .header-controls {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .viewport-toggle {
      display: inline-flex;
      background: var(--dashboard-card-muted-surface);
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      padding: 2px;
    }

    .viewport-toggle button {
      background: transparent;
      border: 0;
      padding: 6px 10px;
      border-radius: var(--dashboard-radius-control);
      font-size: 12px;
      font-weight: 600;
      color: var(--secondary-text-color);
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .viewport-toggle button.active {
      background: var(--dashboard-card-surface);
      color: var(--primary-text-color);
    }

    .theme-toggle {
      background: var(--dashboard-card-surface);
      border: var(--dashboard-card-border);
      color: var(--primary-text-color);
      padding: 8px 14px;
      border-radius: var(--dashboard-radius-control);
      cursor: pointer;
      font-size: 12.5px;
      font-weight: 600;
      transition: all 0.2s ease;
    }

    .entity-bar {
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: var(--dashboard-card-surface);
      padding: 16px;
      border-radius: var(--dashboard-radius-card);
      border: var(--dashboard-card-border);
      margin-bottom: 24px;
    }

    .entity-bar-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--secondary-text-color);
    }

    .entity-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .chip {
      background: var(--dashboard-card-muted-surface);
      border: var(--dashboard-card-border);
      color: var(--secondary-text-color);
      padding: 6px 12px;
      border-radius: var(--dashboard-radius-control);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .chip:hover {
      border-color: var(--primary-color);
      color: var(--primary-text-color);
    }

    .chip.active {
      background: var(--dashboard-active-surface);
      border-color: var(--primary-color);
      color: var(--primary-color);
      font-weight: 600;
    }

    .chip.toggle-unavail {
      border-style: dashed;
    }

    .dev-tabs {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding-bottom: 8px;
      margin-bottom: 36px;
      border-bottom: 1px solid var(--catalogue-border);
    }

    .tab {
      background: var(--dashboard-card-surface);
      border: var(--dashboard-card-border);
      padding: 8px 14px;
      border-radius: var(--dashboard-radius-control);
      font-size: 12.5px;
      font-weight: 600;
      color: var(--secondary-text-color);
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s ease;
    }

    .tab:hover {
      color: var(--primary-text-color);
      border-color: var(--primary-color);
    }

    .tab.active {
      background: var(--dashboard-active-surface);
      color: var(--primary-color);
      border-color: var(--primary-color);
      font-weight: 650;
    }

    .dev-main {
      display: flex;
      flex-direction: column;
      gap: 56px;
    }

    .dev-section {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .section-header h2 {
      font-size: 20px;
      margin: 0 0 6px;
      font-weight: 750;
      letter-spacing: -0.015em;
      padding-bottom: 8px;
      border-bottom: 2px solid var(--catalogue-border);
    }

    .section-header p {
      font-size: 13.5px;
      margin: 0;
      color: var(--secondary-text-color);
    }

    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 20px;
      width: 100%;
    }

    .card-grid > * {
      width: 100%;
      min-width: 0;
      display: block;
    }

    .tiles-grid {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }

    .metric-grid {
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    }

    /* Component Showcase Card Wrapper */
    .showcase-card {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
      min-width: 0;
    }

    .showcase-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 0 2px;
      flex-wrap: wrap;
    }

    .showcase-identity {
      display: inline-flex;
      align-items: baseline;
      gap: 8px;
      min-width: 0;
      overflow: hidden;
    }

    .showcase-tag {
      font-family:
        ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
      font-size: 12px;
      font-weight: 700;
      color: var(--primary-color);
      background: var(--dashboard-card-muted-surface);
      padding: 2px 6px;
      border-radius: 4px;
      border: 1px solid
        color-mix(in srgb, var(--primary-color) 25%, transparent);
      white-space: nowrap;
    }

    .showcase-name {
      font-size: 13px;
      font-weight: 600;
      color: var(--secondary-text-color);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .showcase-badge {
      font-family: ui-monospace, SFMono-Regular, monospace;
      font-size: 11px;
      font-weight: 500;
      color: var(--secondary-text-color);
      background: color-mix(in srgb, var(--primary-text-color) 4%, transparent);
      padding: 1px 6px;
      border-radius: 4px;
    }

    .showcase-body {
      width: 100%;
      min-width: 0;
      display: block;
    }

    .showcase-body > * {
      width: 100%;
      display: block;
    }
  `;
}
