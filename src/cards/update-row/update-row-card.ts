export * from "./update-row-card.types";
import type { UpdateRowCardConfig } from "./update-row-card.types";
export * from "./update-row-card.styles";
import { updateRowCardStyles } from "./update-row-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import type { HassEntity } from "../../types/home-assistant";
import { interaction, InteractionHandle } from "../../utils/interaction";
import { runServiceAction } from "../../utils/entity";
import { registerCard } from "../../utils/registration";

const DEFAULTS: UpdateRowCardConfig = {
  type: "custom:component-update-row-v3",
  icon: "mdi:update",
  title: "Update name",
  current: "Current 1.0",
  available: "Available 1.1",
  action: "Update",
  confirm: true,
  entity: null,
};

interface UpdateRowData {
  live: boolean;
  missing: boolean;
  unavailable: boolean;
  title: string;
  current: string;
  available: string;
  action: string;
  pending: boolean;
  progress: {
    active: boolean;
    determinate: boolean;
    value: number;
  };
}

@customElement("component-update-row-v3")
export class ComponentUpdateRowV3 extends LitBaseCard<UpdateRowCardConfig> {
  @state()
  private _busy = false;

  @state()
  private _requested = false;

  @state()
  private _error = "";

  private _startTimer: ReturnType<typeof setTimeout> | null = null;
  private _errorTimer: ReturnType<typeof setTimeout> | null = null;
  private _interactionHandles: InteractionHandle[] = [];

  public static override styles: CSSResultGroup = updateRowCardStyles;

  public override setConfig(config: UpdateRowCardConfig): void {
    super.setConfig({ ...DEFAULTS, ...config });
  }

  public override getCardSize(): number {
    return 1;
  }

  private _state(): HassEntity | null {
    return (
      (this._config?.entity && this.hass?.states?.[this._config.entity]) || null
    );
  }

  private _name(state: HassEntity | null): string {
    if (this._config?.name) return this._config.name;
    if (!state) return this._config?.title || "Update";
    const name =
      state.attributes?.title ||
      state.attributes?.friendly_name ||
      this._config?.entity ||
      "Update";
    return String(name).replace(/ Update$/, "");
  }

  private _progress(attributes: Record<string, any> = {}) {
    const raw = attributes?.in_progress;
    if (raw === false || raw === null || raw === undefined) {
      return { active: false, determinate: false, value: 0 };
    }
    if (typeof raw === "number" && Number.isFinite(raw)) {
      return {
        active: true,
        determinate: true,
        value: Math.max(0, Math.min(100, raw)),
      };
    }
    if (
      typeof raw === "string" &&
      raw.trim() !== "" &&
      Number.isFinite(Number(raw))
    ) {
      return {
        active: true,
        determinate: true,
        value: Math.max(0, Math.min(100, Number(raw))),
      };
    }
    return {
      active: Boolean(raw),
      determinate: false,
      value: 0,
    };
  }

  private _data(): UpdateRowData {
    const state = this._state();
    if (!state) {
      const configured = Boolean(this._config?.entity);
      return {
        live: false,
        missing: configured,
        unavailable: configured,
        title: this._config?.title || "Update",
        current: configured
          ? "Update entity unavailable"
          : this._config?.current || "Current 1.0",
        available: configured ? "" : this._config?.available || "Available 1.1",
        action: configured ? "Unavailable" : this._config?.action || "Update",
        pending: !configured,
        progress: {
          active: false,
          determinate: false,
          value: 0,
        },
      };
    }

    const attributes = state.attributes || {};
    const unavailable = ["unavailable", "unknown"].includes(state.state);
    const pending = state.state === "on";
    const progress = this._progress(attributes);

    return {
      live: true,
      missing: false,
      unavailable,
      title: this._name(state),
      current: attributes.installed_version
        ? `Current ${attributes.installed_version}`
        : "Current version unavailable",
      available: attributes.latest_version
        ? `Available ${attributes.latest_version}`
        : "Latest version unavailable",
      action: unavailable
        ? "Unavailable"
        : progress.active
          ? "Updating…"
          : pending
            ? "Update"
            : "Current",
      pending,
      progress,
    };
  }

  private _setError(message: string): void {
    this._error = message;
    if (this._errorTimer) clearTimeout(this._errorTimer);
    if (message) {
      this._errorTimer = setTimeout(() => {
        this._error = "";
      }, 5000);
    }
  }

  private _watchForStart(): void {
    if (this._startTimer) clearTimeout(this._startTimer);
    this._startTimer = setTimeout(() => {
      if (!this._requested) return;
      this._requested = false;
      this._setError("The update did not start.");
    }, 12000);
  }

  private async _install(data: UpdateRowData): Promise<void> {
    if (
      !data.live ||
      data.unavailable ||
      !data.pending ||
      data.progress.active ||
      this._busy ||
      this._requested ||
      !this.hass ||
      !this._config?.entity
    ) {
      return;
    }

    const state = this._state();
    const name = this._name(state);
    const latest = state?.attributes?.latest_version || "the latest version";

    if (
      this._config?.confirm !== false &&
      typeof window !== "undefined" &&
      !window.confirm(`Install ${latest} for ${name}?`)
    ) {
      return;
    }

    this._setError("");
    this._busy = true;
    this._requested = true;

    try {
      await runServiceAction(this.hass, {
        domain: "update",
        service: "install",
        target: { entity_id: this._config.entity },
      });
      this._watchForStart();
    } catch {
      this._requested = false;
      if (this._startTimer) clearTimeout(this._startTimer);
      this._setError("The update could not be started.");
    } finally {
      this._busy = false;
    }
  }

  public override disconnectedCallback(): void {
    if (this._startTimer) clearTimeout(this._startTimer);
    if (this._errorTimer) clearTimeout(this._errorTimer);
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];
    super.disconnectedCallback();
  }

  protected override updated(): void {
    const data = this._data();
    if (this._requested && (data.progress.active || !data.pending)) {
      this._requested = false;
      if (this._startTimer) clearTimeout(this._startTimer);
    }

    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];

    const details = this.renderRoot.querySelector(
      ".details",
    ) as HTMLElement | null;
    const actionBtn = this.renderRoot.querySelector(
      ".action",
    ) as HTMLElement | null;

    if (details && this._state()) {
      details.setAttribute("aria-label", `Open details for ${data.title}`);
      this._interactionHandles.push(
        interaction(details, {
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
          primary: () => this._install(data),
          optimistic: false,
          repeat: false,
          feedback: true,
        }),
      );
    }
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const data = this._data();
    const active = data.progress.active || this._busy || this._requested;
    const disabled =
      data.missing || data.unavailable || !data.pending || active;
    const action = this._error
      ? "Retry"
      : this._busy || this._requested
        ? "Starting…"
        : data.action;
    const status = this._error
      ? this._error
      : `${data.current}${data.available ? ` · ${data.available}` : ""}`;

    const progress = active
      ? data.progress.determinate
        ? html`
            <span
              class="progress determinate"
              role="progressbar"
              aria-label="Updating ${this.esc(data.title)}"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow="${data.progress.value}"
              style="--progress:${data.progress.value}%"
            ></span>
          `
        : html`
            <span
              class="progress indeterminate"
              role="progressbar"
              aria-label="${this._busy || this._requested ? "Starting" : "Updating"} ${this.esc(data.title)}"
            ></span>
          `
      : "";

    return html`
      <ha-card>
        <div class="wrap">
          <button
            class="details ${this._state() ? "has-entity" : ""}"
            type="button"
            ?disabled=${!this._state()}
          >
            <span class="icon">
              <ha-icon icon="${this.esc(this._config.icon)}"></ha-icon>
            </span>
            <span class="copy">
              <div class="title">${this.esc(data.title)}</div>
              <div
                class="versions ${this._error ? "error" : ""}"
                role="status"
                aria-live="polite"
              >
                ${this.esc(status)}
              </div>
            </span>
          </button>
          <button
            class="action"
            type="button"
            aria-label="${this.esc(action)} ${this.esc(data.title)}"
            ?disabled=${disabled}
          >
            ${this.esc(action)}
          </button>
        </div>
        ${progress}
      </ha-card>
    `;
  }
}

registerCard({
  type: "component-update-row-v3",
  element: ComponentUpdateRowV3,
  name: "Update Row",
  description: "Reusable update row with live update support.",
});
