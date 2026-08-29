export * from "./garage-door-card.types";
import type { GarageDoorControllerConfig } from "./garage-door-card.types";
export * from "./garage-door-card.styles";
import { garageDoorCardStyles } from "./garage-door-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import type {
  LovelaceGridOptions,
  HassEntity,
} from "../../types/home-assistant";
import { interaction, InteractionHandle } from "../../utils/interaction";
import { isEntityUnavailable, runServiceAction } from "../../utils/entity";
import { registerCard } from "../../utils/registration";

interface ConfirmationContext {
  expected: string | null;
  resolve: (value: string) => void;
  reject: (error: Error) => void;
  timer: ReturnType<typeof setTimeout>;
}

@customElement("component-garage-door-controller-v1")
export class ComponentGarageDoorControllerV1 extends LitBaseCard<GarageDoorControllerConfig> {
  @state()
  private _busy = false;

  @state()
  private _pendingLabel = "";

  @state()
  private _message = "";

  @state()
  private _messageType: "info" | "error" = "info";

  private _messageTimer: ReturnType<typeof setTimeout> | null = null;
  private _confirmation: ConfirmationContext | null = null;
  private _requestGeneration = 0;
  private _interactionHandles: InteractionHandle[] = [];

  public static override getGridOptions(): LovelaceGridOptions {
    return { columns: 12, rows: "auto" };
  }

  public static override styles: CSSResultGroup = garageDoorCardStyles;

  public override setConfig(config: GarageDoorControllerConfig): void {
    if (!config?.entity)
      throw new Error("A garage-door state entity is required");
    if (this._messageTimer) clearTimeout(this._messageTimer);
    this._messageTimer = null;
    this._requestGeneration += 1;
    this._cancelConfirmation(new Error("Garage configuration changed"));
    this._busy = false;
    this._pendingLabel = "";
    this._message = "";
    this._messageType = "info";

    const configuredTimeout =
      config.confirmation_timeout ?? config.confirm_timeout;
    super.setConfig({
      ...config,
      confirmation_timeout: Math.max(3000, Number(configuredTimeout) || 20000),
    });
  }

  public override getCardSize(): number {
    return 1;
  }

  private _entityState(entityId?: string | null): HassEntity | null {
    return entityId ? (this.hass?.states?.[entityId] ?? null) : null;
  }

  private _controlEntityId(): string | null {
    const configured = this._config?.control_entity;
    if (configured) return configured;
    const entityId = this._config?.entity || "";
    const domain = entityId.split(".")[0];
    return ["button", "cover", "lock", "script", "switch"].includes(domain)
      ? entityId
      : null;
  }

  private _status() {
    const state = this._entityState(this._config?.entity);
    const control = this._entityState(this._controlEntityId());
    const availability = this._entityState(this._config?.availability_entity);
    const controllerUnavailable =
      (Boolean(this._config?.availability_entity) &&
        (!availability || availability.state !== "on")) ||
      !control ||
      isEntityUnavailable(control);
    const reed = String(state?.state || "unknown").toLowerCase();
    const known = reed === "on" || reed === "off";
    const closed = known && reed === "off";
    const notClosed = known && reed === "on";
    const stateUnavailable = !state || isEntityUnavailable(state);
    return {
      state,
      control,
      controllerUnavailable,
      stateUnavailable,
      known,
      closed,
      notClosed,
      reed,
    };
  }

  private _setMessage(
    message: string,
    type: "info" | "error" = "info",
    timeout = 2600,
  ): void {
    if (this._messageTimer) clearTimeout(this._messageTimer);
    this._message = message;
    this._messageType = type;
    if (!timeout) return;
    this._messageTimer = setTimeout(() => {
      this._messageTimer = null;
      this._message = "";
      this._messageType = "info";
    }, timeout);
  }

  private _waitForConfirmation(expected: string | null): Promise<string> {
    this._cancelConfirmation(new Error("Garage confirmation superseded"));
    const timeout = this._config?.confirmation_timeout || 20000;
    return new Promise<string>((resolve, reject) => {
      const timer = setTimeout(() => {
        if (this._confirmation?.timer !== timer) return;
        this._confirmation = null;
        reject(new Error("Garage state confirmation timed out"));
      }, timeout);
      this._confirmation = { expected, resolve, reject, timer };
      this._checkConfirmation();
    });
  }

  private _checkConfirmation(): void {
    const pending = this._confirmation;
    if (!pending) return;
    const reed = String(
      this._entityState(this._config?.entity)?.state || "unknown",
    ).toLowerCase();
    const confirmed = pending.expected
      ? reed === pending.expected
      : reed === "on" || reed === "off";
    if (!confirmed) return;
    clearTimeout(pending.timer);
    this._confirmation = null;
    pending.resolve(reed);
  }

  private _cancelConfirmation(error: Error): void {
    const pending = this._confirmation;
    if (!pending) return;
    clearTimeout(pending.timer);
    this._confirmation = null;
    pending.reject(error);
  }

  private async _requestAction(): Promise<void> {
    const status = this._status();
    if (status.controllerUnavailable || this._busy || !this.hass) return;
    const expected = status.closed ? "on" : status.notClosed ? "off" : null;
    const generation = this._requestGeneration;
    this._busy = true;
    this._pendingLabel = "Sending";
    this._message = "";
    this._messageType = "info";

    let confirmation: Promise<string>;
    try {
      confirmation = this._waitForConfirmation(expected);
      void confirmation.catch(() => {});

      const controlId = this._controlEntityId();
      if (!controlId) return;
      const domain = controlId.split(".")[0];
      if (domain === "cover") {
        await runServiceAction(this.hass, {
          domain: "cover",
          service: "toggle",
          target: { entity_id: controlId },
        });
      } else if (domain === "switch") {
        await runServiceAction(this.hass, {
          domain: "switch",
          service: "toggle",
          target: { entity_id: controlId },
        });
      } else if (domain === "button") {
        await runServiceAction(this.hass, {
          domain: "button",
          service: "press",
          target: { entity_id: controlId },
        });
      } else if (domain === "script") {
        await runServiceAction(this.hass, {
          domain: "script",
          service: "turn_on",
          target: { entity_id: controlId },
        });
      } else {
        await runServiceAction(this.hass, {
          domain: "homeassistant",
          service: "toggle",
          target: { entity_id: controlId },
        });
      }

      if (generation !== this._requestGeneration) return;
      this._pendingLabel =
        expected === "on"
          ? "Opening"
          : expected === "off"
            ? "Closing"
            : "Waiting";
      const confirmed = await confirmation;
      if (generation !== this._requestGeneration) return;
      this._setMessage(
        confirmed === "off"
          ? "Closed confirmed."
          : confirmed === "on"
            ? "Door movement confirmed."
            : "Garage state confirmed.",
      );
    } catch (error: any) {
      if (generation !== this._requestGeneration) return;
      this._cancelConfirmation(
        error instanceof Error ? error : new Error("Garage command failed"),
      );
      const msg = String(error?.message || "");
      this._setMessage(
        msg.includes("timed out")
          ? "The command was sent, but the door state was not confirmed."
          : "The garage-door command failed.",
        "error",
        5000,
      );
    } finally {
      if (generation === this._requestGeneration) {
        this._busy = false;
        this._pendingLabel = "";
      }
    }
  }

  protected override willUpdate(): void {
    this._checkConfirmation();
  }

  public override disconnectedCallback(): void {
    if (this._messageTimer) clearTimeout(this._messageTimer);
    this._messageTimer = null;
    this._requestGeneration += 1;
    this._cancelConfirmation(new Error("Garage controller disconnected"));
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];
    this._busy = false;
    this._pendingLabel = "";
    this._message = "";
    this._messageType = "info";
    super.disconnectedCallback();
  }

  protected override updated(): void {
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];

    const identityBtn = this.renderRoot.querySelector(
      ".identity",
    ) as HTMLElement | null;
    const actionBtn = this.renderRoot.querySelector(
      ".action",
    ) as HTMLElement | null;

    if (identityBtn) {
      this._interactionHandles.push(
        interaction(identityBtn, {
          primary: () => this.moreInfo(this._config?.entity),
          optimistic: false,
          repeat: false,
          feedback: true,
        }),
      );
    }
    if (actionBtn) {
      this._interactionHandles.push(
        interaction(actionBtn, {
          primary: () => this._requestAction(),
          optimistic: false,
          repeat: false,
          feedback: true,
        }),
      );
    }
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const status = this._status();
    const rawName = status.state?.attributes?.friendly_name || "";
    const cleaned = rawName.replace(/\s*Garage Door Status$/i, "").trim();
    const name = this._config.title || cleaned || "Garage door";
    const displayState = status.controllerUnavailable
      ? "Controller unavailable"
      : status.closed
        ? "Closed"
        : status.notClosed
          ? "Not closed"
          : status.stateUnavailable
            ? "Door state unavailable"
            : "Door state unknown";
    const action = status.closed ? "Open" : "Trigger";
    const disabled = status.controllerUnavailable || this._busy;

    return html`
      <ha-card>
        <div class="w">
          <div class="row">
            <button
              class="identity"
              type="button"
              aria-label="Open details for ${this.esc(name)}"
            >
              <span class="well ${status.notClosed ? "not-closed" : ""}">
                <ha-icon
                  icon="${
                    status.controllerUnavailable || !status.known
                      ? "mdi:garage-alert"
                      : status.notClosed
                        ? "mdi:garage-open"
                        : "mdi:garage"
                  }"
                ></ha-icon>
              </span>
              <span class="copy">
                <span class="name">${this.esc(name)}</span>
                <span class="state" role="status" aria-live="polite"
                  >${this.esc(displayState)}</span
                >
              </span>
            </button>
            <button
              class="action ${this._busy ? "pending" : ""}"
              type="button"
              ?disabled=${disabled}
              aria-disabled="${String(disabled)}"
              aria-label="${
                status.controllerUnavailable
                  ? "Garage door controller unavailable"
                  : this._busy
                    ? `${this._pendingLabel || "Waiting for"} garage door state confirmation`
                    : status.closed
                      ? "Open garage door"
                      : "Trigger garage door operator"
              }"
            >
              <ha-icon
                icon="${
                  this._busy
                    ? "mdi:progress-clock"
                    : status.closed
                      ? "mdi:garage-open"
                      : "mdi:gesture-tap-button"
                }"
              ></ha-icon>
              <span
                >${this.esc(this._busy ? this._pendingLabel || "Waiting" : action)}</span
              >
            </button>
          </div>
          ${
            this._message
              ? html`
                  <p
                    class="feedback ${this._messageType === "error" ? "error" : ""}"
                    role="status"
                    aria-live="polite"
                  >
                    ${this.esc(this._message)}
                  </p>
                `
              : ""
          }
        </div>
      </ha-card>
    `;
  }
}

registerCard({
  type: "component-garage-door-controller-v1",
  element: ComponentGarageDoorControllerV1,
  name: "Garage Door Controller",
  description:
    "A garage-door controller for a closed-position reed sensor and momentary operator trigger.",
});
