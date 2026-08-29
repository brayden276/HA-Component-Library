export * from "./update-summary-card.types";
import type { UpdateSummaryCardConfig } from "./update-summary-card.types";
export * from "./update-summary-card.styles";
import { updateSummaryCardStyles } from "./update-summary-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import type { HassEntity } from "../../types/home-assistant";
import { interaction, InteractionHandle } from "../../utils/interaction";
import { runServiceAction } from "../../utils/entity";
import { registerCard } from "../../utils/registration";

const DEFAULTS: UpdateSummaryCardConfig = {
  type: "custom:component-update-summary-v3",
  count: "3",
  title: "updates available",
  message: "Review the items below before installing.",
  live_updates: false,
  update_all: false,
  confirm: true,
};

@customElement("component-update-summary-v3")
export class ComponentUpdateSummaryV3 extends LitBaseCard<UpdateSummaryCardConfig> {
  @state()
  private _busy = false;

  @state()
  private _error = "";

  private _messageTimer: ReturnType<typeof setTimeout> | null = null;
  private _interactionHandle: InteractionHandle | null = null;

  public static override styles: CSSResultGroup = updateSummaryCardStyles;

  public override setConfig(config: UpdateSummaryCardConfig): void {
    super.setConfig({ ...DEFAULTS, ...config });
  }

  public override getCardSize(): number {
    return 1;
  }

  private _all(): HassEntity[] {
    if (!this.hass?.states) return [];
    const ids = Array.isArray(this._config?.entities)
      ? new Set(this._config!.entities)
      : null;
    return Object.values(this.hass.states).filter(
      (st) =>
        Boolean(st?.entity_id?.startsWith("update.")) &&
        (!ids || ids.has(st.entity_id)),
    );
  }

  private _inProgress(attributes: Record<string, any> = {}): boolean {
    const raw = attributes?.in_progress;
    return !(raw === false || raw === null || raw === undefined);
  }

  private _pending(): HassEntity[] {
    return this._all().filter((st) => st.state === "on");
  }

  private _live(): { count: string; title: string; message: string } | null {
    if (!this._config?.live_updates || !this.hass) return null;
    const pending = this._pending().length;
    return {
      count: String(pending),
      title: pending === 1 ? "update available" : "updates available",
      message: pending
        ? "Review the items below before installing."
        : "Everything is current.",
    };
  }

  private _setError(message: string): void {
    this._error = message;
    if (this._messageTimer) clearTimeout(this._messageTimer);
    if (message) {
      this._messageTimer = setTimeout(() => {
        this._error = "";
      }, 5000);
    }
  }

  private async _installAll(): Promise<void> {
    if (!this.hass || this._busy) return;
    const pending = this._pending().filter(
      (st) => !this._inProgress(st.attributes),
    );
    if (!pending.length) return;

    const count = pending.length;
    if (
      this._config?.confirm !== false &&
      typeof window !== "undefined" &&
      !window.confirm(
        `Install ${count} available ${count === 1 ? "update" : "updates"}? Home Assistant may restart if Core, Supervisor or the operating system is included.`,
      )
    ) {
      return;
    }

    this._setError("");
    this._busy = true;

    const priority = [
      "update.home_assistant_supervisor_update",
      "update.home_assistant_operating_system_update",
      "update.home_assistant_core_update",
    ];
    const normal = pending
      .map((st) => st.entity_id)
      .filter((id) => !priority.includes(id));

    try {
      if (normal.length) {
        await runServiceAction(this.hass, {
          domain: "update",
          service: "install",
          target: { entity_id: normal },
        });
      }
      for (const id of priority) {
        if (pending.some((st) => st.entity_id === id)) {
          await runServiceAction(this.hass, {
            domain: "update",
            service: "install",
            target: { entity_id: id },
          });
        }
      }
    } catch {
      this._setError("One or more updates could not be started.");
    } finally {
      this._busy = false;
    }
  }

  public override disconnectedCallback(): void {
    if (this._messageTimer) clearTimeout(this._messageTimer);
    this._messageTimer = null;
    this._interactionHandle?.destroy();
    this._interactionHandle = null;
    super.disconnectedCallback();
  }

  protected override updated(): void {
    const btn = this.renderRoot.querySelector(".all") as HTMLElement | null;
    if (btn) {
      this._interactionHandle?.destroy();
      this._interactionHandle = interaction(btn, {
        primary: () => this._installAll(),
        optimistic: false,
        repeat: false,
        feedback: true,
      });
    } else {
      this._interactionHandle?.destroy();
      this._interactionHandle = null;
    }
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const data = this._live() || {
      count: this._config.count || "3",
      title: this._config.title || "updates available",
      message:
        this._config.message || "Review the items below before installing.",
    };
    const showButton = Boolean(this._config.update_all);
    const pending = this.hass
      ? this._config.live_updates
        ? Number(data.count)
        : showButton
          ? this._pending().length
          : 0
      : Number(data.count) || 0;

    const message = this._error
      ? this._error
      : this._busy
        ? "Starting available updates…"
        : data.message;

    return html`
      <ha-card>
        <div class="wrap">
          <span class="count">${this.esc(data.count)}</span>
          <span>
            <div class="headline">${this.esc(data.title)}</div>
            <div
              class="desc ${this._error ? "error" : ""}"
              role="status"
              aria-live="polite"
            >
              ${this.esc(message)}
            </div>
          </span>
          ${
            showButton
              ? html`
                  <button
                    class="all"
                    type="button"
                    ?disabled=${this._busy || pending === 0}
                  >
                    ${this.esc(this._busy ? "Starting…" : "Update all")}
                  </button>
                `
              : html`<span></span>`
          }
        </div>
        ${
          this._busy
            ? html`
                <span
                  class="progress indeterminate"
                  role="progressbar"
                  aria-label="Starting available updates"
                ></span>
              `
            : ""
        }
      </ha-card>
    `;
  }
}

registerCard({
  type: "component-update-summary-v3",
  element: ComponentUpdateSummaryV3,
  name: "Update Summary",
  description: "Reusable update summary with live update support.",
});
