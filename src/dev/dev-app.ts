import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { MockHomeAssistant } from "./mock-hass";
import { HomeAssistant } from "../types/home-assistant";
import "../index";

// Register mock <ha-icon> for local development browser previews
if (!customElements.get("ha-icon")) {
  class HaIconMock extends HTMLElement {
    static get observedAttributes() {
      return ["icon"];
    }
    attributeChangedCallback() {
      this.render();
    }
    connectedCallback() {
      this.render();
    }
    set icon(val: string) {
      this.setAttribute("icon", val);
    }
    get icon() {
      return this.getAttribute("icon") || "";
    }
    render() {
      const icon = this.icon.replace("mdi:", "");
      this.innerHTML = `
        <svg style="width: 20px; height: 20px; display: inline-block; vertical-align: middle;" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="9" opacity="0.15" />
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>
      `;
      this.setAttribute("title", `mdi:${icon}`);
    }
  }
  customElements.define("ha-icon", HaIconMock);
}

@customElement("ha-dev-app")
export class HaDevApp extends LitElement {
  private _mockHass = new MockHomeAssistant();

  @state()
  private _hass!: HomeAssistant;

  @state()
  private _darkMode = false;

  @state()
  private _activeTab = "all";

  @state()
  private _viewport = "desktop";

  @state()
  private _statusCardConfig = {
    type: "custom:ha-status-card",
    entity: "light.living_room",
    name: "Living Room Lights",
    show_toggle: true,
    secondary_info: "last-changed" as const,
  };

  @state()
  private _actionTileConfig = {
    type: "custom:ha-action-tile",
    entity: "switch.coffee_maker",
    name: "Espresso Machine",
    color: "#ff9800",
  };

  public override connectedCallback(): void {
    super.connectedCallback();
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
      this._mockHass.updateState(entityId, { state: "on" });
    } else {
      this._mockHass.updateState(entityId, { state: "unavailable" });
    }
  }

  protected override render(): TemplateResult {
    if (!this._hass)
      return html`<div>Loading mock Home Assistant environment...</div>`;

    return html`
      <div class="dev-container ${this._darkMode ? "dark-mode" : ""} viewport-${this._viewport}">
        <header class="dev-header">
          <div class="header-left">
            <h1>🏠 Home Assistant Component Library</h1>
            <span class="badge">TypeScript + Lit + Vite</span>
          </div>
          <div class="header-controls">
            <div class="viewport-toggle" role="group" aria-label="Viewport size">
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
              ${this._darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </header>

        <!-- Interactive Entity Playground Bar -->
        <aside class="entity-bar">
          <div class="entity-bar-title">⚡ Live Entity State Controls</div>
          <div class="entity-chips">
            <button
              class="chip ${this._hass.states["light.living_room"]?.state === "on" ? "active" : ""}"
              @click=${() => this._toggleEntity("light.living_room")}
            >
              Living Light: ${this._hass.states["light.living_room"]?.state}
            </button>
            <button
              class="chip ${this._hass.states["switch.coffee_maker"]?.state === "on" ? "active" : ""}"
              @click=${() => this._toggleEntity("switch.coffee_maker")}
            >
              Espresso: ${this._hass.states["switch.coffee_maker"]?.state}
            </button>
            <button
              class="chip ${this._hass.states["climate.living_room_ac"]?.state !== "off" ? "active" : ""}"
              @click=${() => this._toggleEntity("climate.living_room_ac")}
            >
              AC: ${this._hass.states["climate.living_room_ac"]?.state}
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
                this._mockHass.callService("media_player", "media_play_pause", undefined, { entity_id: "media_player.apple_tv" });
              }}
            >
              Apple TV: ${this._hass.states["media_player.apple_tv"]?.state}
            </button>

            <button
              class="chip ${this._hass.states["cover.garage_door"]?.state === "open" ? "active" : ""}"
              @click=${() => {
                const isClosed = this._hass.states["cover.garage_door"]?.state === "closed";
                this._mockHass.updateState("cover.garage_door", { state: isClosed ? "open" : "closed" });
              }}
            >
              Garage: ${this._hass.states["cover.garage_door"]?.state}
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
            { id: "all", label: "All Cards" },
            { id: "standalone", label: "1. Standalone" },
            { id: "presentation", label: "2. Presentation" },
            { id: "devices", label: "3. Device Controllers" },
            { id: "system", label: "4. System & Security" },
            { id: "overview", label: "5. Home & Overview" },
            { id: "editor", label: "6. GUI Editor Harness" },
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
            this._activeTab === "all" || this._activeTab === "standalone"
              ? html`
                  <section class="dev-section">
                    <div class="section-header">
                      <h2>Standalone Cards</h2>
                      <p>ha-status-card, ha-action-tile, ha-quick-bar, ha-metric-badge</p>
                    </div>
                    <div class="card-grid">
                      <ha-status-card
                        .hass=${this._hass}
                        .config=${this._statusCardConfig}
                      ></ha-status-card>

                      <ha-status-card
                        .hass=${this._hass}
                        .config=${{
                          type: "custom:ha-status-card",
                          entity: "climate.thermostat",
                          name: "Thermostat",
                          show_toggle: false,
                          secondary_info: "state",
                        }}
                      ></ha-status-card>
                    </div>

                    <div class="card-grid tiles-grid">
                      <ha-action-tile
                        .hass=${this._hass}
                        .config=${this._actionTileConfig}
                      ></ha-action-tile>

                      <ha-action-tile
                        .hass=${this._hass}
                        .config=${{
                          type: "custom:ha-action-tile",
                          entity: "light.living_room",
                          name: "Living Room",
                          color: "#03a9f4",
                        }}
                      ></ha-action-tile>

                      <ha-action-tile
                        .hass=${this._hass}
                        .config=${{
                          type: "custom:ha-action-tile",
                          entity: "media_player.living_room_tv",
                          name: "TV Player",
                          color: "#e91e63",
                        }}
                      ></ha-action-tile>
                    </div>

                    <ha-quick-bar
                      .hass=${this._hass}
                      .config=${{
                        type: "custom:ha-quick-bar",
                        title: "Quick Controls",
                        entities: [
                          "light.living_room",
                          "light.bedroom",
                          "switch.coffee_maker",
                          "media_player.living_room_tv",
                        ],
                        show_active_count: true,
                      }}
                    ></ha-quick-bar>

                    <div class="card-grid metric-grid">
                      <ha-metric-badge
                        .hass=${this._hass}
                        .config=${{
                          type: "custom:ha-metric-badge",
                          entity: "sensor.temperature",
                          thresholds: [
                            { value: 18, color: "#03a9f4" },
                            { value: 24, color: "#4caf50" },
                            { value: 28, color: "#ff9800" },
                          ],
                        }}
                      ></ha-metric-badge>

                      <ha-metric-badge
                        .hass=${this._hass}
                        .config=${{
                          type: "custom:ha-metric-badge",
                          entity: "sensor.power_consumption",
                          thresholds: [
                            { value: 100, color: "#4caf50" },
                            { value: 400, color: "#ff9800" },
                            { value: 1000, color: "#f44336" },
                          ],
                        }}
                      ></ha-metric-badge>
                    </div>
                  </section>
                `
              : ""
          }

          <!-- 2. Presentation Cards -->
          ${
            this._activeTab === "all" || this._activeTab === "presentation"
              ? html`
                  <section class="dev-section">
                    <div class="section-header">
                      <h2>Presentation & Data Cards</h2>
                      <p>Context strips, KPIs, status rows, progress indicators, notices, lists</p>
                    </div>

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

                    <div class="card-grid">
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
                    </div>

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

                    <component-notice-v2
                      .hass=${this._hass}
                      .config=${{
                        type: "custom:component-notice-v2",
                        tone: "info",
                        icon: "mdi:information-outline",
                        title: "Energy Tariff Active",
                        message: "Off-peak window active until 3:00 PM.",
                      }}
                    ></component-notice-v2>

                    <component-list-v2
                      .hass=${this._hass}
                      .config=${{
                        type: "custom:component-list-v2",
                        rows: [
                          { title: "Living Room Split AC", description: "Climate", value: "21°C", label: "Cooling" },
                          { title: "Water Heater", description: "Storage", value: "58°C", label: "Ready" },
                          { title: "Home Office Workstation", description: "Plug", value: "145W", label: "Active" },
                        ],
                      }}
                    ></component-list-v2>

                    <div class="card-grid">
                      <component-nav-tile-v2
                        .hass=${this._hass}
                        .config=${{
                          type: "custom:component-nav-tile-v2",
                          icon: "mdi:lightning-bolt",
                          title: "Energy Dashboard",
                          context: "View live power flows",
                          navigation_path: "/energy",
                        }}
                      ></component-nav-tile-v2>

                      <component-nav-tile-v2
                        .hass=${this._hass}
                        .config=${{
                          type: "custom:component-nav-tile-v2",
                          icon: "mdi:shield-home-outline",
                          title: "Security Center",
                          context: "All 5 perimeter sensors secure",
                          navigation_path: "/security",
                        }}
                      ></component-nav-tile-v2>
                    </div>
                  </section>
                `
              : ""
          }

          <!-- 3. Device Cards -->
          ${
            this._activeTab === "all" || this._activeTab === "devices"
              ? html`
                  <section class="dev-section">
                    <div class="section-header">
                      <h2>Device Controllers</h2>
                      <p>Split AC, Garage Door, Apple TV, Camera</p>
                    </div>

                    <div class="card-grid">
                      <component-split-controller-v4
                        .hass=${this._hass}
                        .config=${{
                          type: "custom:component-split-controller-v4",
                          entity: "climate.living_room_ac",
                          title: "Living Room AC",
                        }}
                      ></component-split-controller-v4>

                      <component-wled-controller-v1
                        .hass=${this._hass}
                        .config=${{
                          type: "custom:component-wled-controller-v1",
                          entity: "light.wled_strip",
                        }}
                      ></component-wled-controller-v1>
                    </div>

                    <div class="card-grid">
                      <component-apple-tv-controller-v1
                        .hass=${this._hass}
                        .config=${{
                          type: "custom:component-apple-tv-controller-v1",
                          entity: "media_player.apple_tv",
                          remote_entity: "remote.living_room_apple_tv",
                          demo: true,
                          title: "Apple TV 4K",
                        }}
                      ></component-apple-tv-controller-v1>

                      <component-garage-door-controller-v1
                        .hass=${this._hass}
                        .config=${{
                          type: "custom:component-garage-door-controller-v1",
                          entity: "cover.garage_door",
                          title: "Garage Door",
                        }}
                      ></component-garage-door-controller-v1>
                    </div>

                    <component-control-row-v2
                      .hass=${this._hass}
                      .config=${{
                        type: "custom:component-control-row-v2",
                        entity: "light.living_room",
                        name: "Ceiling Brightness",
                        mode: "slider",
                      }}
                    ></component-control-row-v2>

                  </section>
                `
              : ""
          }

          <!-- 4. System & Security Cards -->
          ${
            this._activeTab === "all" || this._activeTab === "system"
              ? html`
                  <section class="dev-section">
                    <div class="section-header">
                      <h2>System & Security</h2>
                      <p>Household attention queue, security status, updates & discovery</p>
                    </div>

                    <component-household-attention-v2
                      .hass=${this._hass}
                      .config=${{
                        type: "custom:component-household-attention-v2",
                        title: "Household Attention",
                        demo: true,
                      }}
                    ></component-household-attention-v2>

                    <div class="card-grid">
                      <component-security-summary-v1
                        .hass=${this._hass}
                        .config=${{
                          type: "custom:component-security-summary-v1",
                          title: "Security Status",
                        }}
                      ></component-security-summary-v1>

                      <component-device-discovery-v2
                        .hass=${this._hass}
                        .config=${{
                          type: "custom:component-device-discovery-v2",
                          demo: true,
                        }}
                      ></component-device-discovery-v2>
                    </div>

                    <component-update-summary-v3
                      .hass=${this._hass}
                      .config=${{
                        type: "custom:component-update-summary-v3",
                        count: "1",
                        title: "update available",
                        message: "Home Assistant Core 2026.8.1 ready to install.",
                      }}
                    ></component-update-summary-v3>

                    <component-update-row-v3
                      .hass=${this._hass}
                      .config=${{
                        type: "custom:component-update-row-v3",
                        entity: "update.ha_core",
                        title: "Home Assistant Core",
                      }}
                    ></component-update-row-v3>
                  </section>
                `
              : ""
          }

          <!-- 5. Overview & Navigation Cards -->
          ${
            this._activeTab === "all" || this._activeTab === "overview"
              ? html`
                  <section class="dev-section">
                    <div class="section-header">
                      <h2>Home Overview & Directories</h2>
                      <p>Welcome header, household directory, room directory</p>
                    </div>

                    <component-welcome-header-v1
                      .hass=${this._hass}
                      .config=${{
                        type: "custom:component-welcome-header-v1",
                        weather_entity: "weather.forecast_home",
                      }}
                    ></component-welcome-header-v1>

                    <component-household-directory-v3
                      .hass=${this._hass}
                      .config=${{
                        type: "custom:component-household-directory-v3",
                        title: "Household Quick Actions",
                      }}
                    ></component-household-directory-v3>

                    <component-room-directory-v4
                      .hass=${this._hass}
                      .config=${{
                        type: "custom:component-room-directory-v4",
                        title: "Rooms & Areas",
                      }}
                    ></component-room-directory-v4>
                  </section>
                `
              : ""
          }

          <!-- 6. GUI Card Editor Test Harness -->
          ${
            this._activeTab === "all" || this._activeTab === "editor"
              ? html`
                  <section class="dev-section editor-preview-section">
                    <div class="section-header">
                      <h2>Lovelace Card Editor Test Harness</h2>
                      <p>Test GUI card configurators directly (dispatches <code>config-changed</code>)</p>
                    </div>
                    <div class="editor-demo-box">
                      <div class="editor-column">
                        <h3>Editor Interface</h3>
                        <ha-status-card-editor
                          .hass=${this._hass}
                          .config=${this._statusCardConfig}
                          @config-changed=${(e: CustomEvent) => {
                            this._statusCardConfig = e.detail.config;
                          }}
                        ></ha-status-card-editor>
                      </div>
                      <div class="preview-column">
                        <h3>Live Card Preview</h3>
                        <ha-status-card
                          .hass=${this._hass}
                          .config=${this._statusCardConfig}
                        ></ha-status-card>
                        <pre class="config-output">
${JSON.stringify(this._statusCardConfig, null, 2)}</pre>
                      </div>
                    </div>
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
      color: #212121;
      background: #f2f4f8;
      min-height: 100vh;
    }

    .dark-mode {
      --card-background-color: #1c1c1e;
      --ha-card-background: #1c1c1e;
      --primary-text-color: #f2f2f7;
      --secondary-text-color: #8e8e93;
      --divider-color: rgba(255, 255, 255, 0.12);
      --secondary-background-color: rgba(255, 255, 255, 0.08);
      background: #121212;
      color: #f2f2f7;
    }

    .dev-container {
      margin: 0 auto;
      padding: 24px 20px 80px 20px;
      transition: max-width 0.25s ease, background-color 0.2s ease;
    }

    .viewport-desktop {
      max-width: 1080px;
    }

    .viewport-tablet {
      max-width: 768px;
    }

    .viewport-mobile {
      max-width: 390px;
    }

    .dev-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 16px;
      margin-bottom: 20px;
      border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));
      flex-wrap: wrap;
      gap: 12px;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    h1 {
      font-size: 1.3rem;
      margin: 0;
      font-weight: 700;
    }

    .badge {
      background: #03a9f4;
      color: white;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 12px;
    }

    .header-controls {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .viewport-toggle {
      display: inline-flex;
      background: var(--secondary-background-color, rgba(128, 128, 128, 0.12));
      border-radius: 8px;
      padding: 2px;
    }

    .viewport-toggle button {
      background: transparent;
      border: none;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 0.8rem;
      font-weight: 500;
      color: var(--secondary-text-color, #666);
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .viewport-toggle button.active {
      background: var(--card-background-color, #ffffff);
      color: var(--primary-text-color, #111);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .theme-toggle {
      background: var(--card-background-color, #ffffff);
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.15));
      color: inherit;
      padding: 6px 12px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.85rem;
      font-weight: 500;
      transition: all 0.2s ease;
    }

    .entity-bar {
      display: flex;
      flex-direction: column;
      gap: 8px;
      background: var(--card-background-color, #ffffff);
      padding: 12px 16px;
      border-radius: 12px;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.08));
      margin-bottom: 20px;
    }

    .entity-bar-title {
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--secondary-text-color, #777);
    }

    .entity-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .chip {
      background: var(--secondary-background-color, rgba(128, 128, 128, 0.08));
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.08));
      color: inherit;
      padding: 5px 10px;
      border-radius: 8px;
      font-size: 0.8rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .chip.active {
      background: rgba(3, 169, 244, 0.15);
      border-color: #03a9f4;
      color: #0288d1;
      font-weight: 600;
    }

    .chip.toggle-unavail {
      border-style: dashed;
    }

    .dev-tabs {
      display: flex;
      gap: 6px;
      overflow-x: auto;
      padding-bottom: 8px;
      margin-bottom: 24px;
      border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.08));
    }

    .tab {
      background: transparent;
      border: none;
      padding: 8px 14px;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 500;
      color: var(--secondary-text-color, #666);
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s ease;
    }

    .tab.active {
      background: var(--card-background-color, #ffffff);
      color: #03a9f4;
      font-weight: 600;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    }

    .dev-main {
      display: flex;
      flex-direction: column;
      gap: 36px;
    }

    .dev-section {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .section-header h2 {
      font-size: 1.15rem;
      margin: 0 0 4px 0;
      font-weight: 700;
    }

    .section-header p {
      font-size: 0.85rem;
      margin: 0;
      color: var(--secondary-text-color, #666);
    }

    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 16px;
    }

    .tiles-grid {
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    }

    .metric-grid {
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }

    .editor-demo-box {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      background: var(--card-background-color, #ffffff);
      padding: 20px;
      border-radius: 12px;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));
    }

    @media (max-width: 768px) {
      .editor-demo-box {
        grid-template-columns: 1fr;
      }
    }

    .editor-column h3,
    .preview-column h3 {
      font-size: 0.95rem;
      margin-top: 0;
      margin-bottom: 12px;
    }

    .config-output {
      margin-top: 16px;
      background: rgba(0, 0, 0, 0.05);
      padding: 12px;
      border-radius: 8px;
      font-size: 0.75rem;
      overflow-x: auto;
    }

    .dark-mode .config-output {
      background: rgba(255, 255, 255, 0.05);
    }
  `;
}

