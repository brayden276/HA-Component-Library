export * from "./device-discovery-card.types";
import type {
  DeviceDiscoveryFlow,
  DeviceDiscoveryCardConfig,
} from "./device-discovery-card.types";
export * from "./device-discovery-card.styles";
import { deviceDiscoveryCardStyles } from "./device-discovery-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import { interaction, InteractionHandle } from "../../utils/interaction";
import { registerCard } from "../../utils/registration";

const DEFAULTS: DeviceDiscoveryCardConfig = {
  type: "custom:component-device-discovery-v2",
  demo: false,
  refresh_seconds: 60,
  max_rows: 6,
};

const DEMO_ROWS: DeviceDiscoveryFlow[] = [
  {
    handler: "example_integration",
    context: {
      source: "zeroconf",
      title_placeholders: { name: "Discovered device" },
    },
  },
  {
    handler: "example_bridge",
    context: {
      source: "dhcp",
      title_placeholders: { name: "Discovered bridge" },
    },
  },
];

@customElement("component-device-discovery-v2")
export class ComponentDeviceDiscoveryV2 extends LitBaseCard<DeviceDiscoveryCardConfig> {
  @state()
  private _flows: DeviceDiscoveryFlow[] = [];

  @state()
  private _stateKind: "ready" | "loading" | "admin" | "error" = "ready";

  private _timer: ReturnType<typeof setInterval> | null = null;
  private _started = false;
  private _loadGeneration = 0;
  private _interactionHandles: InteractionHandle[] = [];

  public static override styles: CSSResultGroup = deviceDiscoveryCardStyles;

  public override setConfig(config: DeviceDiscoveryCardConfig): void {
    const wasDemo = Boolean(this._config?.demo);
    super.setConfig({ ...DEFAULTS, ...config });

    if (this._config?.demo) {
      if (!wasDemo || this._started) {
        if (this._timer) clearInterval(this._timer);
        this._timer = null;
        this._started = false;
        this._loadGeneration += 1;
      }
      this._flows = DEMO_ROWS;
      this._stateKind = "ready";
      return;
    }

    if (wasDemo) this._start();
  }

  public override getCardSize(): number {
    return 3;
  }

  private _isAdmin(): boolean {
    return !this.hass?.user || Boolean(this.hass.user.is_admin);
  }

  private _start(): void {
    if (!this.isConnected || !this.hass || this._config?.demo) return;
    if (!this._isAdmin()) {
      if (this._timer) clearInterval(this._timer);
      this._timer = null;
      this._started = false;
      this._stateKind = "admin";
      return;
    }
    if (this._started) return;
    this._started = true;
    this.load();
    const seconds = Math.max(30, Number(this._config?.refresh_seconds) || 60);
    this._timer = setInterval(() => this.load(true), seconds * 1000);
  }

  public async load(silent = false): Promise<void> {
    if (!this.hass || this._config?.demo) return;
    if (!silent) this._stateKind = "loading";
    if (!this._isAdmin()) {
      this._stateKind = "admin";
      return;
    }

    const generation = ++this._loadGeneration;
    try {
      const flows = await this.hass.callWS<DeviceDiscoveryFlow[]>({
        type: "config_entries/flow/progress",
      });
      if (generation === this._loadGeneration && !this._config?.demo) {
        this._flows = this._filterPending(flows);
        this._stateKind = "ready";
      }
    } catch {
      if (generation === this._loadGeneration && !this._config?.demo) {
        this._stateKind = "error";
      }
    }
  }

  private _name(flow: DeviceDiscoveryFlow): string {
    const placeholders = flow?.context?.title_placeholders || {};
    return (
      placeholders.name ||
      placeholders.device ||
      placeholders.host ||
      flow.handler ||
      "Discovered device"
    );
  }

  private _source(value?: string): string {
    return (
      (
        {
          bluetooth: "Bluetooth",
          dhcp: "DHCP",
          discovery: "Discovery",
          esphome: "ESPHome",
          hardware: "Hardware",
          hassio: "Home Assistant",
          homekit: "HomeKit",
          integration_discovery: "Discovery",
          mqtt: "MQTT",
          ssdp: "SSDP",
          usb: "USB",
          zeroconf: "mDNS",
        } as Record<string, string>
      )[value || ""] ||
      value ||
      "Discovery"
    );
  }

  private _filterPending(flows: DeviceDiscoveryFlow[]): DeviceDiscoveryFlow[] {
    const sources = new Set([
      "bluetooth",
      "dhcp",
      "discovery",
      "esphome",
      "hardware",
      "hassio",
      "homekit",
      "integration_discovery",
      "mqtt",
      "ssdp",
      "usb",
      "zeroconf",
    ]);
    return (flows || [])
      .filter((flow) => sources.has(flow?.context?.source || ""))
      .sort((a, b) => this._name(a).localeCompare(this._name(b)));
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._start();
  }

  public override disconnectedCallback(): void {
    if (this._timer) clearInterval(this._timer);
    this._timer = null;
    this._started = false;
    this._loadGeneration += 1;
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];
    super.disconnectedCallback();
  }

  protected override willUpdate(): void {
    if (
      this.isConnected &&
      this.hass &&
      !this._config?.demo &&
      !this._started
    ) {
      this._start();
    }
  }

  protected override updated(): void {
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];

    const retryBtn = this.renderRoot.querySelector(
      ".retry",
    ) as HTMLElement | null;
    if (retryBtn) {
      this._interactionHandles.push(
        interaction(retryBtn, { primary: () => this.load(), feedback: true }),
      );
    }

    const refreshBtn = this.renderRoot.querySelector(
      "button.refresh",
    ) as HTMLElement | null;
    if (refreshBtn) {
      this._interactionHandles.push(
        interaction(refreshBtn, { primary: () => this.load(), feedback: true }),
      );
    }

    const rowButtons = this.renderRoot.querySelectorAll("button.row");
    rowButtons.forEach((btn) => {
      this._interactionHandles.push(
        interaction(btn as HTMLElement, {
          primary: () => this.navigate("/config/integrations/dashboard"),
          feedback: true,
        }),
      );
    });
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;

    if (this._stateKind !== "ready") {
      const content = {
        loading: {
          className: "",
          icon: "mdi:progress-clock",
          title: "Checking for devices",
          description: "Reading Home Assistant discovery suggestions.",
        },
        admin: {
          className: "error",
          icon: "mdi:shield-lock-outline",
          title: "Administrator access required",
          description: "Device discovery is available to administrators only.",
        },
        error: {
          className: "error",
          icon: "mdi:alert-circle-outline",
          title: "Discovery could not be loaded",
          description: "Retry the Home Assistant discovery check.",
        },
      }[this._stateKind];

      return html`
        <ha-card>
          <div class="card">
            <div class="state ${content.className}">
              <span class="icon"
                ><ha-icon icon="${content.icon}"></ha-icon
              ></span>
              <span>
                <div class="title">${content.title}</div>
                <div class="description">${content.description}</div>
              </span>
              ${
                this._stateKind === "error"
                  ? html`<button class="retry" type="button">Retry</button>`
                  : ""
              }
            </div>
          </div>
        </ha-card>
      `;
    }

    const limit = Math.max(1, Number(this._config.max_rows) || 6);
    const shown = this._flows.slice(0, limit);
    const remaining = Math.max(0, this._flows.length - shown.length);
    const empty = this._flows.length === 0;
    const title = empty
      ? "No devices waiting"
      : `${this._flows.length} ${this._flows.length === 1 ? "device" : "devices"} found`;
    const description = empty
      ? "Home Assistant has no new setup suggestions."
      : "Home Assistant has setup suggestions ready to review.";

    return html`
      <ha-card>
        <div class="card">
          <div class="summary ${empty ? "success" : ""}">
            <span class="icon">
              <ha-icon
                icon="${empty ? "mdi:check-circle-outline" : "mdi:radar"}"
              ></ha-icon>
            </span>
            <span>
              <div class="title">${this.esc(title)}</div>
              <div class="description">${this.esc(description)}</div>
            </span>
            ${
              this._config.demo
                ? html`
                    <span class="refresh" aria-hidden="true">
                      <ha-icon icon="mdi:refresh"></ha-icon>
                    </span>
                  `
                : html`
                    <button
                      class="refresh"
                      type="button"
                      aria-label="Refresh discovery"
                    >
                      <ha-icon icon="mdi:refresh"></ha-icon>
                    </button>
                  `
            }
          </div>
          ${shown.map((flow) => {
            const name = this._name(flow);
            const desc = `${this._source(flow.context?.source)} · ${flow.handler}`;
            const inner = html`
              <span class="icon"
                ><ha-icon icon="mdi:plus-circle-outline"></ha-icon
              ></span>
              <span>
                <div class="title">${this.esc(name)}</div>
                <div class="description">${this.esc(desc)}</div>
              </span>
              <span class="review" aria-hidden="true">Review</span>
            `;

            return this._config?.demo
              ? html`<div class="row">${inner}</div>`
              : html`<button
                  class="row"
                  type="button"
                  aria-label="Review ${this.esc(name)}"
                >
                  ${inner}
                </button>`;
          })}
          ${
            remaining
              ? html`
                  <div class="more">
                    ${remaining} more
                    ${remaining === 1 ? "suggestion" : "suggestions"} available
                    in Integrations
                  </div>
                `
              : ""
          }
        </div>
      </ha-card>
    `;
  }
}

registerCard({
  type: "component-device-discovery-v2",
  element: ComponentDeviceDiscoveryV2,
  name: "Device Discovery",
  description: "Reusable device-discovery status component.",
});
