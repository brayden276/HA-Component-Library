export * from "./control-row-card.types";
import type { ControlRowCardConfig } from "./control-row-card.types";
export * from "./control-row-card.styles";
import { controlRowCardStyles } from "./control-row-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import type { HassEntity } from "../../types/home-assistant";
import {
  interaction,
  InteractionHandle,
  createRequestCoalescer,
  RequestCoalescer,
  waitForEntityState,
} from "../../utils/interaction";
import { registerCard } from "../../utils/registration";

const DEFAULTS: ControlRowCardConfig = {
  type: "custom:component-control-row-v2",
  icon: "mdi:lightbulb-outline",
  title: "Control name",
  state: "Current state",
  mode: "slider",
  value: 68,
  entity: null,
};

@customElement("component-control-row-v2")
export class ComponentControlRowV2 extends LitBaseCard<ControlRowCardConfig> {
  @state()
  private _on = true;

  @state()
  private _val = 68;

  private _interactionHandles: InteractionHandle[] = [];
  private _coalescer: RequestCoalescer<number> | null = null;

  public static override styles: CSSResultGroup = controlRowCardStyles;

  public override setConfig(config: ControlRowCardConfig): void {
    super.setConfig({ ...DEFAULTS, ...config });
    this._on = this._config?.on !== false;
    this._val = Math.max(0, Math.min(100, Number(this._config?.value) || 68));
    this._resetCoalescer();
  }

  public override getCardSize(): number {
    return 1;
  }

  private _getState(): HassEntity | null {
    return this._config?.entity
      ? (this.hass?.states?.[this._config.entity] ?? null)
      : null;
  }

  private _domain(): string {
    return String(this._config?.entity || "").split(".")[0];
  }

  private _available(state: HassEntity | null = this._getState()): boolean {
    return Boolean(
      state &&
      !["unknown", "unavailable"].includes(String(state.state).toLowerCase()),
    );
  }

  private _sliderPercent(state: HassEntity | null): number {
    if (!this._config?.entity || !state) return this._val;
    const domain = this._domain();
    if (domain === "light") {
      return state.state === "on"
        ? Math.round((Number(state.attributes?.brightness ?? 255) / 255) * 100)
        : 0;
    }
    if (domain === "fan") {
      return Math.max(
        0,
        Math.min(100, Number(state.attributes?.percentage) || 0),
      );
    }
    if (domain === "number" || domain === "input_number") {
      const min = Number(state.attributes?.min ?? 0);
      const max = Number(state.attributes?.max ?? 100);
      const value = Number(state.state);
      if (
        Number.isFinite(value) &&
        Number.isFinite(min) &&
        Number.isFinite(max) &&
        max > min
      ) {
        return Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
      }
    }
    const value = Number(state.state);
    return Number.isFinite(value)
      ? Math.max(0, Math.min(100, value))
      : this._val;
  }

  private _description(state: HassEntity | null): string {
    if (!this._config?.entity) return this._config?.state || "";
    if (!this._available(state)) return "Unavailable";
    try {
      return (
        (state && this.hass?.formatEntityState?.(state)) ||
        this._config?.state ||
        ""
      );
    } catch {
      return String(state?.state || this._config?.state || "");
    }
  }

  private _resetCoalescer(): void {
    this._coalescer?.destroy();
    this._coalescer = null;
  }

  private _sliderCoalescer(): RequestCoalescer<number> {
    if (this._coalescer) return this._coalescer;
    this._coalescer = createRequestCoalescer(
      (value) => this._sendSlider(value),
      {
        onError: () => {
          const state = this._getState();
          this._val = this._sliderPercent(state);
          this._updateSliderVisual();
        },
      },
    );
    return this._coalescer;
  }

  private async _sendSlider(percent: number): Promise<any> {
    const entity_id = this._config?.entity;
    if (!entity_id || !this.hass) return;
    const custom = this._config?.slider_service;
    if (
      custom &&
      typeof custom === "object" &&
      custom.domain &&
      custom.service
    ) {
      const key = custom.data_key || "value";
      return this.hass.callService(custom.domain, custom.service, {
        entity_id,
        ...(custom.data || {}),
        [key]: percent,
      });
    }
    const domain = this._domain();
    if (domain === "light") {
      return percent <= 0
        ? this.hass.callService("light", "turn_off", { entity_id })
        : this.hass.callService("light", "turn_on", {
            entity_id,
            brightness_pct: Math.round(percent),
          });
    }
    if (domain === "fan") {
      return this.hass.callService("fan", "set_percentage", {
        entity_id,
        percentage: Math.round(percent),
      });
    }
    if (domain === "number" || domain === "input_number") {
      const state = this._getState();
      const min = Number(state?.attributes?.min ?? 0);
      const max = Number(state?.attributes?.max ?? 100);
      const value = min + ((max - min) * percent) / 100;
      return this.hass.callService(domain, "set_value", { entity_id, value });
    }
    throw new Error(
      `Slider mode does not support ${domain || "this entity"} without slider_service`,
    );
  }

  private _updateSliderVisual(): void {
    const fill = this.renderRoot.querySelector(
      ".slider > span",
    ) as HTMLElement | null;
    if (fill) fill.style.width = `${Math.max(0, Math.min(100, this._val))}%`;
  }

  private async _toggle(reportedOn: boolean): Promise<void> {
    if (!this._config?.entity || !this.hass) return;
    await this.hass.callService("homeassistant", "toggle", {
      entity_id: this._config.entity,
    });
    await waitForEntityState(
      this.hass,
      this._config.entity,
      (value) => value === (reportedOn ? "off" : "on"),
      { timeout: 9000 },
    );
  }

  private _serviceAction(): Promise<any> | void {
    const service = String(this._config?.service || "");
    const [domain, name] = service.split(".");
    if (!domain || !name) return this.moreInfo(this._config?.entity);
    return this.hass?.callService(domain, name, {
      entity_id: this._config?.entity,
      ...(this._config?.service_data || {}),
    });
  }

  public override disconnectedCallback(): void {
    this._resetCoalescer();
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];
    super.disconnectedCallback();
  }

  protected override updated(): void {
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];

    const m = this._config?.mode || "slider";
    const live = Boolean(this._config?.entity);
    const state = this._getState();
    const available = live ? this._available(state) : true;
    const reportedOn = live ? state?.state === "on" : this._on;

    if (live && m === "slider") {
      const identity = this.renderRoot.querySelector(
        ".identity",
      ) as HTMLElement | null;
      if (identity) {
        identity.setAttribute("role", "button");
        identity.setAttribute("tabindex", "0");
        identity.setAttribute(
          "aria-label",
          `Open details for ${this._config?.title}`,
        );
        this._interactionHandles.push(
          interaction(identity, {
            primary: () => this.moreInfo(this._config?.entity),
            feedback: true,
          }),
        );
      }
      const input = this.renderRoot.querySelector(
        ".live-slider",
      ) as HTMLInputElement | null;
      if (input) {
        input.disabled = !available;
        input.oninput = () => {
          this._val = Number(input.value);
          this._updateSliderVisual();
          this._sliderCoalescer().request(this._val);
        };
      }
      return;
    }

    const interactivePreview = !live && (m === "switch" || m === "slider");
    const rowInteractive = live ? m !== "slider" : interactivePreview;
    const row = this.renderRoot.querySelector(
      rowInteractive ? "button.row" : ".row",
    ) as HTMLElement | null;
    if (!rowInteractive || !row) return;

    if (!live) {
      this._interactionHandles.push(
        interaction(row, {
          primary: () => {
            if (m === "switch") this._on = !this._on;
            else if (m === "slider") {
              this._val = (this._val + 20) % 120;
              if (this._val > 100) this._val = 0;
            }
          },
          feedback: true,
        }),
      );
      return;
    }

    if (m === "switch") {
      row.setAttribute("aria-pressed", String(reportedOn));
      row.setAttribute(
        "aria-label",
        `${reportedOn ? "Turn off" : "Turn on"} ${this._config?.title}`,
      );
      const switchEl = row.querySelector(".switch") as HTMLElement | null;
      this._interactionHandles.push(
        interaction(row, {
          primary: () => this._toggle(reportedOn),
          hold: () => this.moreInfo(this._config?.entity),
          optimistic: {
            capture: () => reportedOn,
            apply: () => {
              const next = !reportedOn;
              this._on = next;
              row.setAttribute("aria-pressed", String(next));
              switchEl?.classList.toggle("on", next);
            },
            rollback: () => {
              this._on = reportedOn;
              row.setAttribute("aria-pressed", String(reportedOn));
              switchEl?.classList.toggle("on", reportedOn);
            },
          },
          feedback: true,
        }),
      );
      return;
    }

    row.setAttribute(
      "aria-label",
      m === "action"
        ? `${this._config?.title} action`
        : `Open details for ${this._config?.title}`,
    );
    this._interactionHandles.push(
      interaction(row, {
        primary: () =>
          m === "action"
            ? this._serviceAction()
            : this.moreInfo(this._config?.entity),
        feedback: true,
      }),
    );
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const m = this._config.mode || "slider";
    const live = Boolean(this._config.entity);
    const state = this._getState();
    const available = live ? this._available(state) : true;
    const reportedOn = live ? state?.state === "on" : this._on;
    if (m === "slider" && live) this._val = this._sliderPercent(state);

    const ctl =
      m === "switch"
        ? html`<span class="switch ${reportedOn ? "on" : ""}"
            ><span></span
          ></span>`
        : m === "state"
          ? html`<span class="metric"
              >${this.esc(live ? this._description(state) : this._config.value)}</span
            >`
          : m === "action"
            ? html`<span class="action">Action</span>`
            : html`
                <span class="slider">
                  <span style="width:${this._val}%"></span>
                  ${
                    live
                      ? html`
                          <input
                            class="live-slider"
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            .value=${String(Math.round(this._val))}
                            aria-label="${this.esc(this._config.title)}"
                          />
                        `
                      : ""
                  }
                </span>
              `;

    const interactivePreview = !live && (m === "switch" || m === "slider");
    const rowInteractive = live ? m !== "slider" : interactivePreview;

    const inner = html`
      <div class="wrap">
        <span class="icon">
          <ha-icon icon="${this.esc(this._config.icon)}"></ha-icon>
        </span>
        <span class="identity">
          <div class="title">${this.esc(this._config.title)}</div>
          <div class="desc">${this.esc(this._description(state))}</div>
        </span>
        <span class="control">${ctl}</span>
      </div>
    `;

    return html`
      <ha-card>
        ${
          rowInteractive
            ? html`
                <button
                  class="i row"
                  type="button"
                  ?disabled=${live && !available}
                  @click=${() => {
                    if (!live) {
                      if (m === "switch") this._on = !this._on;
                      else if (m === "slider") {
                        this._val = (this._val + 20) % 120;
                        if (this._val > 100) this._val = 0;
                      }
                    } else if (m === "switch") {
                      this._toggle(reportedOn);
                    } else if (m === "action") {
                      this._serviceAction();
                    } else {
                      this.moreInfo(this._config?.entity);
                    }
                  }}
                >
                  ${inner}
                </button>
              `
            : html`<div class="row row-static">${inner}</div>`
        }
      </ha-card>
    `;
  }
}

registerCard({
  type: "component-control-row-v2",
  element: ComponentControlRowV2,
  name: "Control Row",
  description: "Reusable control-row component.",
});
