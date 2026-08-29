export * from "./household-attention-card.types";
import type { HouseholdAttentionConfig } from "./household-attention-card.types";
export * from "./household-attention-card.styles";
import { householdAttentionCardStyles } from "./household-attention-card.styles";
import { html, TemplateResult, CSSResultGroup, PropertyValues } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import type {
  LovelaceGridOptions,
  EntityRegistryEntry,
  HomeAssistant,
} from "../../types/home-assistant";
import { centralRegistry } from "../../services/registry/dashboard-registry";
import { computeEntityDisplayName } from "../../utils/entity";
import { interaction, InteractionHandle } from "../../utils/interaction";
import { registerCard } from "../../utils/registration";

const DEFAULTS: HouseholdAttentionConfig = {
  type: "custom:component-household-attention-v2",
  title: "Attention",
  icon: "mdi:alert-circle-outline",
  quiet_title: "Everything quiet",
  quiet_subtitle: "No security or hardware alerts",
  quiet_icon: "mdi:check-circle-outline",
};

interface AttentionIssue {
  entity_id: string;
  name: string;
  status: string;
  severity: "critical" | "warning";
  severity_text: string;
  icon: string;
}

@customElement("component-household-attention-v2")
export class ComponentHouseholdAttentionV2 extends LitBaseCard<HouseholdAttentionConfig> {
  public static override getGridOptions(): LovelaceGridOptions {
    return { columns: 12, rows: "auto" };
  }

  @state()
  private _registry: EntityRegistryEntry[] | null = null;

  private _unsubRegistry: (() => void) | null = null;
  private _registryHass: HomeAssistant | null = null;
  private _interactionHandles: InteractionHandle[] = [];

  public static override styles: CSSResultGroup = householdAttentionCardStyles;

  public override setConfig(config: HouseholdAttentionConfig): void {
    super.setConfig({ ...DEFAULTS, ...config });
    if (this.hass && !this._config?.demo) {
      void this._loadRegistry();
    }
  }

  public override getCardSize(): number {
    return this._config?.demo ? 2 : 1;
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._bindRegistry();
    void this._loadRegistry();
  }

  public override disconnectedCallback(): void {
    this._unbindRegistry();
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];
    super.disconnectedCallback();
  }

  protected override willUpdate(changedProps: PropertyValues): void {
    if (changedProps.has("hass") && changedProps.get("hass") !== this.hass) {
      this._registry = null;
      this._unbindRegistry();
    }
    if (this.hass && !this._config?.demo) {
      this._bindRegistry();
      if (!this._registry || changedProps.has("hass")) void this._loadRegistry();
    }
  }

  private _bindRegistry(): void {
    if (!this.isConnected || !this.hass || this._config?.demo) return;
    if (this._registryHass === this.hass && this._unsubRegistry) return;

    this._unbindRegistry();
    const hass = this.hass;
    this._registryHass = hass;
    this._unsubRegistry = centralRegistry.subscribe(hass, (data) => {
      if (this.hass === hass) this._registry = data.entities || [];
    });
  }

  private _unbindRegistry(): void {
    this._unsubRegistry?.();
    this._unsubRegistry = null;
    this._registryHass = null;
  }

  private async _loadRegistry(): Promise<void> {
    if (!this.hass || this._config?.demo) return;
    const hass = this.hass;
    try {
      const data = await centralRegistry.load(hass);
      if (this.hass === hass) this._registry = data.entities || [];
    } catch {
      // The live subscription will populate the card after Home Assistant reconnects.
    }
  }

  private _issues(): AttentionIssue[] {
    if (this._config?.demo) {
      return [
        {
          entity_id: "binary_sensor.demo_garage",
          name: "Garage door",
          status: "Open",
          severity: "warning",
          severity_text: "Check",
          icon: "mdi:garage-open",
        },
        {
          entity_id: "binary_sensor.demo_leak",
          name: "Laundry leak sensor",
          status: "Detected",
          severity: "critical",
          severity_text: "Critical",
          icon: "mdi:water-alert",
        },
      ];
    }
    if (!this.hass || !this._registry) return [];
    const issues: AttentionIssue[] = [];

    for (const entry of this._registry) {
      if (
        !entry?.entity_id ||
        entry.disabled_by ||
        entry.hidden_by ||
        ["diagnostic", "config"].includes(entry.entity_category as string)
      ) {
        continue;
      }
      const state = this.hass.states?.[entry.entity_id];
      if (!state) continue;

      const domain = entry.entity_id.split(".")[0];
      const deviceClass =
        entry.device_class || state.attributes?.device_class || "";
      let issue: Partial<AttentionIssue> | null = null;

      if (
        entry.entity_id.endsWith("_controller_status") &&
        state.state === "off"
      ) {
        issue = {
          status: "Controller offline",
          severity: "critical",
          severity_text: "Critical",
          icon: "mdi:access-point-network-off",
        };
      } else if (
        domain === "binary_sensor" &&
        state.state === "on" &&
        ["smoke", "moisture", "gas"].includes(deviceClass)
      ) {
        issue = {
          status: "Detected",
          severity: "critical",
          severity_text: "Critical",
          icon:
            deviceClass === "smoke"
              ? "mdi:smoke-detector-alert"
              : deviceClass === "gas"
                ? "mdi:gas-cylinder"
                : "mdi:water-alert",
        };
      } else if (
        domain === "binary_sensor" &&
        state.state === "on" &&
        ["door", "window", "garage_door"].includes(deviceClass)
      ) {
        issue = {
          status: "Open",
          severity: "warning",
          severity_text: "Check",
          icon:
            deviceClass === "window"
              ? "mdi:window-open-variant"
              : deviceClass === "garage_door"
                ? "mdi:garage-open"
                : "mdi:door-open",
        };
      } else if (domain === "lock" && state.state === "unlocked") {
        issue = {
          status: "Unlocked",
          severity: "warning",
          severity_text: "Check",
          icon: "mdi:lock-open-variant-outline",
        };
      }

      if (issue) {
        issues.push({
          entity_id: entry.entity_id,
          name: computeEntityDisplayName({ entry, state }),
          status: issue.status!,
          severity: issue.severity!,
          severity_text: issue.severity_text!,
          icon: issue.icon!,
        });
      }
    }

    return issues
      .sort(
        (a, b) =>
          (a.severity === "critical" ? 0 : 1) -
            (b.severity === "critical" ? 0 : 1) ||
          a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
      )
      .slice(0, 8);
  }

  protected override updated(): void {
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];

    const buttons = Array.from(
      this.renderRoot.querySelectorAll<HTMLButtonElement>("button.issue"),
    );
    const issues = this._issues();

    buttons.forEach((btn, index) => {
      const issue = issues[index];
      if (!issue) return;

      this._interactionHandles.push(
        interaction(btn, {
          primary: () => {
            if (!this._config?.demo) {
              this.moreInfo(issue.entity_id);
            }
          },
          feedback: true,
        }),
      );
    });
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const issues = this._issues();

    if (issues.length === 0) {
      return html`
        <ha-card>
          <div class="quiet">
            <span class="quiet-icon">
              <ha-icon
                icon="${this._config.quiet_icon || "mdi:check-circle-outline"}"
              ></ha-icon>
            </span>
            <div class="quiet-text">
              <h3>${this._config.quiet_title || "Everything quiet"}</h3>
              <p>
                ${this._config.quiet_subtitle || "No security or hardware alerts"}
              </p>
            </div>
          </div>
        </ha-card>
      `;
    }

    return html`
      <ha-card>
        <div class="head">
          <div class="title-row">
            <ha-icon
              icon="${this._config.icon || "mdi:alert-circle-outline"}"
            ></ha-icon>
            <h2>${this._config.title || "Attention"}</h2>
          </div>
          <span class="count">${issues.length}</span>
        </div>

        <div class="list">
          ${issues.map(
            (issue) => html`
              <button
                class="issue ${issue.severity}"
                type="button"
                aria-label="${issue.name}: ${issue.status}. Open details."
              >
                <span class="icon">
                  <ha-icon icon="${issue.icon}"></ha-icon>
                </span>
                <span class="copy">
                  <span class="name">${issue.name}</span>
                  <span class="status">${issue.status}</span>
                </span>
                <span class="badge ${issue.severity}"
                  >${issue.severity_text}</span
                >
                <span class="arrow">
                  <ha-icon icon="mdi:chevron-right"></ha-icon>
                </span>
              </button>
            `,
          )}
        </div>
      </ha-card>
    `;
  }
}

@customElement("component-household-attention-v1")
export class ComponentHouseholdAttentionV1 extends ComponentHouseholdAttentionV2 {}

registerCard({
  type: "component-household-attention-v1",
  element: ComponentHouseholdAttentionV1,
  name: "Household Attention V1",
  description: "Aggregated safety and hardware attention queue (v1).",
});

registerCard({
  type: "component-household-attention-v2",
  element: ComponentHouseholdAttentionV2,
  name: "Household Attention V2",
  description: "Aggregated safety and hardware attention queue.",
});
