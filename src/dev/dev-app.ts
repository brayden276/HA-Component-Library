import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { MockHomeAssistant } from "./mock-hass";
import { HomeAssistant } from "../types/home-assistant";
import "../cards/status-card/status-card-card";
import "../cards/action-tile/action-tile-card";
import "../cards/quick-bar/quick-bar-card";
import "../cards/metric-badge/metric-badge-card";

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
        <svg style="width: 24px; height: 24px; display: inline-block; vertical-align: middle;" viewBox="0 0 24 24" fill="currentColor">
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

  protected override render(): TemplateResult {
    if (!this._hass)
      return html`<div>Loading mock Home Assistant environment...</div>`;

    return html`
      <div class="dev-container ${this._darkMode ? "dark-mode" : ""}">
        <header class="dev-header">
          <div class="header-left">
            <h1>🏠 Home Assistant Component Library</h1>
            <span class="badge">Vite + Lit + TypeScript</span>
          </div>
          <div class="header-actions">
            <button class="theme-toggle" @click=${this._toggleTheme}>
              ${this._darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>
        </header>

        <main class="dev-main">
          <!-- Live Demo Section -->
          <section class="dev-section">
            <div class="section-header">
              <h2>1. ha-status-card</h2>
              <p>
                Full entity control card with reactive toggle switches and state
                badges
              </p>
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
          </section>

          <!-- Action Tile Section -->
          <section class="dev-section">
            <div class="section-header">
              <h2>2. ha-action-tile</h2>
              <p>
                Responsive grid action tile with badge overlay and custom active
                glow
              </p>
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
          </section>

          <!-- Quick Bar Section -->
          <section class="dev-section">
            <div class="section-header">
              <h2>3. ha-quick-bar</h2>
              <p>Compact multi-entity control row with live active counter</p>
            </div>
            <ha-quick-bar
              .hass=${this._hass}
              .config=${{
                type: "custom:ha-quick-bar",
                title: "Downstairs Quick Controls",
                entities: [
                  "light.living_room",
                  "light.bedroom",
                  "switch.coffee_maker",
                  "media_player.living_room_tv",
                ],
                show_active_count: true,
              }}
            ></ha-quick-bar>
          </section>

          <!-- Metric Badges Section -->
          <section class="dev-section">
            <div class="section-header">
              <h2>4. ha-metric-badge</h2>
              <p>Sensor metric badge with thresholds and unit formatting</p>
            </div>
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

          <!-- Visual Card Editors Playground -->
          <section class="dev-section editor-preview-section">
            <div class="section-header">
              <h2>5. Lovelace Card Editor Test Harness</h2>
              <p>
                Test the GUI card configurators directly (dispatches
                <code>config-changed</code>)
              </p>
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
      background: #f4f6f9;
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
      max-width: 1000px;
      margin: 0 auto;
      padding: 24px 20px 80px 20px;
      transition: background-color 0.2s ease;
    }

    .dev-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 20px;
      margin-bottom: 28px;
      border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    h1 {
      font-size: 1.4rem;
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

    .theme-toggle {
      background: var(--card-background-color, #ffffff);
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.15));
      color: inherit;
      padding: 8px 14px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s ease;
    }

    .dev-main {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .dev-section {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .section-header h2 {
      font-size: 1.15rem;
      margin: 0 0 4px 0;
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
