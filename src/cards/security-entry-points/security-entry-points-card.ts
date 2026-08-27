export * from "./security-entry-points-card.types";
import type { SecurityEntryPointsConfig } from "./security-entry-points-card.types";
export * from "./security-entry-points-card.styles";
import { securityEntryPointsCardStyles } from "./security-entry-points-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import type { LovelaceGridOptions } from "../../types/home-assistant";
import type {
  LoadedSecurityModel,
  SecurityEntryItem,
} from "../../services/security/security-runtime";
import { loadSecurityModel } from "../../services/security/security-runtime";
import { interaction, InteractionHandle } from "../../utils/interaction";
import { registerCard } from "../../utils/registration";
import "../garage-door/garage-door-card";

@customElement("component-security-entry-points-v1")
export class ComponentSecurityEntryPointsV1 extends LitBaseCard<SecurityEntryPointsConfig> {
  public static stubConfig = { profile: "household-security" };

  @state()
  private _model: LoadedSecurityModel | null = null;

  private _sequence = 0;
  private _profileListener = (event: any) => {
    if (
      event.detail?.kind === "security" &&
      event.detail?.profileId ===
        (this._config?.profile || "household-security")
    ) {
      this._refresh(true);
    }
  };
  private _interactionHandles: InteractionHandle[] = [];

  public static override getGridOptions(): LovelaceGridOptions {
    return { columns: 12, rows: "auto" };
  }

  public static override styles: CSSResultGroup = securityEntryPointsCardStyles;

  public override setConfig(config: SecurityEntryPointsConfig): void {
    super.setConfig({
      profile: "household-security",
      title: "Entry points",
      ...config,
      type: "custom:component-security-entry-points-v1",
    });
    this._refresh();
  }

  public override getCardSize(): number {
    return this._model?.entries?.length ? 3 : 0;
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener(
      "ha-component-profile-change",
      this._profileListener,
    );
    this._refresh();
  }

  public override disconnectedCallback(): void {
    window.removeEventListener(
      "ha-component-profile-change",
      this._profileListener,
    );
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];
    super.disconnectedCallback();
  }

  private async _refresh(force = false): Promise<void> {
    if (!this.hass || !this._config) return;
    const sequence = ++this._sequence;
    try {
      const model = await loadSecurityModel(
        this.hass,
        this._config.profile || "household-security",
        { force },
      );
      if (sequence === this._sequence) {
        this._model = model;
      }
    } catch (err: any) {
      if (sequence === this._sequence) {
        this._model = { error: err, entries: [] } as any;
      }
    }
  }

  private _entryIcon(entry: SecurityEntryItem): string {
    if (entry.domain === "lock") {
      return entry.open ? "mdi:lock-open-outline" : "mdi:lock-outline";
    }
    if (entry.deviceClass === "window") {
      return "mdi:window-closed-variant";
    }
    return "mdi:door-closed";
  }

  private _entryStateText(entry: SecurityEntryItem): string {
    if (!entry.available) return "Unavailable";
    if (entry.domain === "lock") {
      return entry.open ? "Unlocked" : "Locked";
    }
    return entry.open ? "Open" : "Closed";
  }

  protected override updated(): void {
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];

    const buttons = this.renderRoot.querySelectorAll("button.entry");
    buttons.forEach((btn) => {
      const entityId = (btn as HTMLElement).dataset.entityId;
      if (entityId) {
        this._interactionHandles.push(
          interaction(btn as HTMLElement, {
            primary: () => this.moreInfo(entityId),
            feedback: true,
          }),
        );
      }
    });
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const entries = this._model?.entries || [];
    if (entries.length === 0) return html``;

    return html`
      <div class="head">
        <h2>${this.esc(this._config.title || "Entry points")}</h2>
      </div>
      <div class="list">
        ${entries.map((entry) => {
          if (entry.deviceClass === "garage_door" && entry.controlEntityId) {
            return html`
              <component-garage-door-controller-v1
                .hass=${this.hass}
                .config=${{
                  type: "custom:component-garage-door-controller-v1",
                  entity: entry.entityId,
                  control_entity: entry.controlEntityId,
                  title: entry.name,
                }}
              ></component-garage-door-controller-v1>
            `;
          }

          const icon = this._entryIcon(entry);
          const stateText = this._entryStateText(entry);

          return html`
            <button
              class="entry ${entry.open ? "open" : ""}"
              type="button"
              data-entity-id="${entry.entityId}"
              ?disabled=${!entry.available}
              aria-label="${this.esc(entry.name)}, ${this.esc(stateText)}. Open details."
            >
              <span class="icon">
                <ha-icon icon="${icon}"></ha-icon>
              </span>
              <span class="copy">
                <span class="name">${this.esc(entry.name)}</span>
                <span class="state">${this.esc(stateText)}</span>
              </span>
            </button>
          `;
        })}
      </div>
    `;
  }
}

registerCard({
  type: "component-security-entry-points-v1",
  element: ComponentSecurityEntryPointsV1,
  name: "Security Entry Points V1",
  description:
    "Capability-driven garage, door, window and lock status using the shared garage controller where available.",
});
