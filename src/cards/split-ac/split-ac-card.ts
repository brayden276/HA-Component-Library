export * from "./split-ac-card.types";
import type { SplitControllerConfig } from "./split-ac-card.types";
export * from "./split-ac-card.styles";
import { splitAcCardStyles } from "./split-ac-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import type {
  LovelaceGridOptions,
  HassEntity,
} from "../../types/home-assistant";
import {
  InteractionHandle,
  createRequestCoalescer,
  RequestCoalescer,
  waitForEntityState,
} from "../../utils/interaction";
import { registerCard } from "../../utils/registration";


const unavailable = (st?: HassEntity | null): boolean =>
  !st || ["unknown", "unavailable"].includes(st.state);

const label = (value?: unknown): string =>
  String(value || "")
    .replaceAll("_", " ")
    .replace(/^./, (letter) => letter.toUpperCase());

const degrees = (value?: unknown): string =>
  Number.isFinite(Number(value))
    ? Number(value).toFixed(Number(value) % 1 ? 1 : 0) + "°"
    : "—";

@customElement("component-split-controller-v4")
export class ComponentSplitControllerV4 extends LitBaseCard<SplitControllerConfig> {
  @state()
  private _activePanel: "mode" | "fan" | "vanes" | "timer" | "settings" | null =
    null;

  @state()
  private _optimisticTemp: number | null = null;

  private _interactionHandles: InteractionHandle[] = [];
  private _tempCoalescer: RequestCoalescer<number> | null = null;

  public static override getGridOptions(): LovelaceGridOptions {
    return { columns: 12, rows: "auto" };
  }

  public static override styles: CSSResultGroup = splitAcCardStyles;

  public override setConfig(config: SplitControllerConfig): void {
    if (!config?.entity) throw new Error("A climate entity is required");
    super.setConfig({
      type: "custom:component-split-controller-v4",
      entity: config.entity,
      title: config.title,
      vertical_vane_entity: config.vertical_vane_entity || config.vertical_vane,
      horizontal_vane_entity:
        config.horizontal_vane_entity || config.horizontal_vane,
      timer_entity: config.timer_entity,
      settings_entities: config.settings_entities || [],
      profile_entities: config.profile_entities || [],
    });
  }

  public override getCardSize(): number {
    return 1;
  }

  private _state(entity = this._config?.entity): HassEntity | undefined {
    return entity ? this.hass?.states?.[entity] : undefined;
  }

  private _call(
    domain: string,
    service: string,
    data: Record<string, any>,
  ): Promise<any> | void {
    return this.hass?.callService?.(domain, service, data);
  }

  private async _power(): Promise<void> {
    if (!this._config?.entity || !this.hass) return;
    const st = this._state();
    if (!st || unavailable(st)) return;
    const isOff = st.state === "off";
    if (!isOff) {
      try {
        await this.hass.callService("climate", "set_hvac_mode", {
          entity_id: this._config.entity,
          hvac_mode: "off",
        });
      } catch {
        await this.hass.callService("climate", "turn_off", {
          entity_id: this._config.entity,
        });
      }
    } else {
      const modes: string[] = st.attributes?.hvac_modes || [];
      const targetMode = modes.find((m) => m !== "off") || "cool";
      try {
        await this.hass.callService("climate", "set_hvac_mode", {
          entity_id: this._config.entity,
          hvac_mode: targetMode,
        });
      } catch {
        await this.hass.callService("climate", "turn_on", {
          entity_id: this._config.entity,
        });
      }
    }
  }

  private _getTempCoalescer(): RequestCoalescer<number> {
    if (this._tempCoalescer) return this._tempCoalescer;
    this._tempCoalescer = createRequestCoalescer<number>(
      async (targetTemp: number) => {
        if (!this._config?.entity || !this.hass) return;
        await this.hass.callService("climate", "set_temperature", {
          entity_id: this._config.entity,
          temperature: targetTemp,
        });
        await waitForEntityState(
          this.hass,
          this._config.entity,
          (_st: string | undefined, obj?: HassEntity | null) => {
            const reported = Number(obj?.attributes?.temperature);
            return Number.isFinite(reported) && Math.abs(reported - targetTemp) <= 0.1;
          },
          { timeout: 5000 },
        );
      },
      {
        onSuccess: (val: number) => {
          if (this._optimisticTemp === val) this._optimisticTemp = null;
        },
        onError: () => {
          this._optimisticTemp = null;
        },
      },
    );
    return this._tempCoalescer;
  }

  private _temperature(direction: number): void {
    const attributes = this._state()?.attributes || {};
    const base = this._optimisticTemp ?? Number(attributes.temperature) ?? 21;
    const step = Number(attributes.target_temp_step || attributes.step) || 0.5;
    const min = Number(attributes.min_temp) || 16;
    const max = Number(attributes.max_temp) || 31;

    const next = Math.min(max, Math.max(min, Number((base + direction * step).toFixed(1))));
    this._optimisticTemp = next;
    this._getTempCoalescer().request(next);
  }

  private _vanes(): Array<{ axis: string; entity: string; state: HassEntity }> {
    const list: Array<[string, string | undefined]> = [
      ["Vertical", this._config?.vertical_vane_entity],
      ["Horizontal", this._config?.horizontal_vane_entity],
    ];
    return list.flatMap(([axis, entity]) => {
      const st = this._state(entity);
      return entity && st && !unavailable(st)
        ? [{ axis, entity, state: st }]
        : [];
    });
  }

  private _closeOverlay(): void {
    this._activePanel = null;
  }

  private _openPanel(
    panel: "mode" | "fan" | "vanes" | "timer" | "settings",
  ): void {
    this._activePanel = panel;
  }

  public override disconnectedCallback(): void {
    this._tempCoalescer?.destroy();
    this._tempCoalescer = null;
    this._optimisticTemp = null;
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];
    super.disconnectedCallback();
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const st = this._state();
    const attributes = st?.attributes || {};
    const on = st && !unavailable(st) && st.state !== "off";
    const timer = this._state(this._config.timer_entity);
    const vanes = this._vanes();
    const vaneSummary = vanes
      .map((v) => `${v.axis.slice(0, 1)} ${label(v.state.state)}`)
      .join(" · ");

    const name =
      this._config.title || attributes.friendly_name || "Split system";
    const displayState = unavailable(st)
      ? "Unavailable"
      : on
        ? label(st?.state)
        : "Off";

    const targetTemp = this._optimisticTemp ?? attributes.temperature;
    const modeIcons: Record<string, string> = {
      cool: "mdi:snowflake",
      heat: "mdi:fire",
      dry: "mdi:water-percent",
      fan_only: "mdi:fan",
      auto: "mdi:thermostat-auto",
      off: "mdi:power",
    };
    const currentMode = String(st?.state || "off").toLowerCase();
    const modeIcon = modeIcons[currentMode] || "mdi:thermostat";

    return html`
      <ha-card>
        <div class="w">
          <div class="hd settings">
            <button
              class="idn"
              type="button"
              @click=${() => this.moreInfo(this._config?.entity)}
            >
              <span class="iw"><ha-icon icon="${modeIcon}"></ha-icon></span>
              <span class="cp">
                <span class="nm">${this.esc(name)}</span>
                <span class="st" role="status">${this.esc(displayState)}</span>
              </span>
            </button>
            <button
              class="pw sg"
              type="button"
              aria-label="Advanced settings"
              @click=${() => this._openPanel("settings")}
            >
              <ha-icon icon="mdi:cog-outline"></ha-icon>
            </button>
            <button
              class="pw power-btn ${on ? "on" : ""}"
              type="button"
              aria-label="Toggle split system power"
              ?disabled=${unavailable(st)}
              aria-pressed="${String(on)}"
              @click=${() => this._power()}
            >
              <ha-icon icon="mdi:power"></ha-icon>
            </button>
          </div>

          <div class="ct">
            <div class="cr">
              <div class="rm">
                <span class="rv"
                  >${degrees(attributes.current_temperature)}</span
                >
                <span class="ml">Room temperature</span>
              </div>
              <div class="tc">
                <button
                  class="tb decrease"
                  type="button"
                  aria-label="Decrease target temperature"
                  ?disabled=${!on}
                  aria-disabled="${String(!on)}"
                  @click=${() => this._temperature(-1)}
                >
                  <ha-icon icon="mdi:minus"></ha-icon>
                </button>
                <div class="tp">
                  <div class="tv">${degrees(targetTemp)}</div>
                  <div class="ts">Target</div>
                </div>
                <button
                  class="tb increase"
                  type="button"
                  aria-label="Increase target temperature"
                  ?disabled=${!on}
                  aria-disabled="${String(!on)}"
                  @click=${() => this._temperature(1)}
                >
                  <ha-icon icon="mdi:plus"></ha-icon>
                </button>
              </div>
            </div>

            <div class="as">
              <button
                class="a ma"
                type="button"
                data-panel="mode"
                aria-expanded="${String(this._activePanel === "mode")}"
                aria-label="HVAC mode: ${label(st?.state)}"
                @click=${() => this._openPanel("mode")}
              >
                <ha-icon icon="${modeIcon}"></ha-icon>
                <span class="al">Mode · ${label(st?.state)}</span>
              </button>
              <button
                class="a fa"
                type="button"
                data-panel="fan"
                aria-expanded="${String(this._activePanel === "fan")}"
                aria-label="Fan speed: ${label(attributes.fan_mode)}"
                @click=${() => this._openPanel("fan")}
              >
                <ha-icon icon="mdi:fan"></ha-icon>
                <span class="al">Fan · ${label(attributes.fan_mode)}</span>
              </button>
              ${
                vaneSummary
                  ? html`
                      <button
                        class="a va"
                        type="button"
                        data-panel="vanes"
                        aria-expanded="${String(this._activePanel === "vanes")}"
                        aria-label="Vanes: ${vaneSummary}"
                        @click=${() => this._openPanel("vanes")}
                      >
                        <ha-icon icon="mdi:swap-vertical"></ha-icon>
                        <span class="al">Vanes · ${this.esc(vaneSummary)}</span>
                      </button>
                    `
                  : ""
              }
              ${
                this._config.timer_entity
                  ? html`
                      <button
                        class="a ta ${timer?.state === "active" ? "av" : ""}"
                        type="button"
                        data-panel="timer"
                        aria-expanded="${String(this._activePanel === "timer")}"
                        aria-label="Off timer: ${timer?.state === "active" ? "Active" : "Off"}"
                        @click=${() => this._openPanel("timer")}
                      >
                        <ha-icon icon="mdi:timer-outline"></ha-icon>
                        <span class="al"
                          >${timer?.state === "active" ? "Timer · Active" : "Timer"}</span
                        >
                      </button>
                    `
                  : ""
              }
            </div>
          </div>
        </div>
      </ha-card>

      ${this._activePanel ? this._renderOverlay() : ""}
    `;
  }

  private _renderOverlay(): TemplateResult {
    const titles = {
      mode: "Mode",
      fan: "Fan",
      vanes: "Vanes",
      timer: "Off timer",
      settings: "Settings",
    };
    const title = titles[this._activePanel!] || "Settings";

    return html`
      <section
        class="pn"
        id="split-secondary"
        role="dialog"
        aria-modal="true"
        aria-label="${title}"
        @keydown=${(e: KeyboardEvent) => {
          if (e.key === "Escape") {
            e.stopPropagation();
            this._closeOverlay();
          }
        }}
        @click=${(e: MouseEvent) => {
          if (e.target === this.renderRoot.querySelector(".pn"))
            this._closeOverlay();
        }}
      >
        <div class="pd">
          <div class="ph">
            <h3 class="pt">${title}</h3>
            <button
              class="x"
              type="button"
              aria-label="Close"
              @click=${this._closeDialog}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <div class="pb">${this._renderPanelContent()}</div>
        </div>
      </section>
    `;
  }

  private _closeDialog(): void {
    this._closeOverlay();
  }

  private _renderPanelContent(): TemplateResult {
    const st = this._state();
    const attributes = st?.attributes || {};
    const modeIcons: Record<string, string> = {
      cool: "mdi:snowflake",
      heat: "mdi:fire",
      dry: "mdi:water-percent",
      fan_only: "mdi:fan",
      auto: "mdi:thermostat-auto",
      off: "mdi:power",
    };

    if (this._activePanel === "mode") {
      const modes: string[] = attributes.hvac_modes || [];
      return html`
        <div class="qs choices">
          ${modes.map(
            (mode) => html`
              <button
                class="o choice"
                type="button"
                aria-selected="${String(mode === st?.state)}"
                @click=${() => {
                  this._call("climate", "set_hvac_mode", {
                    entity_id: this._config?.entity,
                    hvac_mode: mode,
                  });
                  this._closeOverlay();
                }}
              >
                <span><ha-icon icon="${modeIcons[mode] || "mdi:thermostat"}"></ha-icon></span>
                <span>${label(mode)}</span>
                <span class="oi"><ha-icon icon="mdi:check"></ha-icon></span>
              </button>
            `,
          )}
        </div>
      `;
    }

    if (this._activePanel === "fan") {
      const fanModes: string[] = attributes.fan_modes || [];
      return html`
        <div class="qs choices">
          ${fanModes.map(
            (mode) => html`
              <button
                class="o choice"
                type="button"
                aria-selected="${String(mode === attributes.fan_mode)}"
                @click=${() => {
                  this._call("climate", "set_fan_mode", {
                    entity_id: this._config?.entity,
                    fan_mode: mode,
                  });
                  this._closeOverlay();
                }}
              >
                <span><ha-icon icon="mdi:fan"></ha-icon></span>
                <span>${label(mode)}</span>
                <span class="oi"><ha-icon icon="mdi:check"></ha-icon></span>
              </button>
            `,
          )}
        </div>
      `;
    }


    if (this._activePanel === "vanes") {
      const vanes = this._vanes();
      return html`
        ${vanes.map(
          (vane) => html`
            <section class="group og">
              <p class="gt">${vane.axis} vane</p>
              <div class="qs choices">
                ${((vane.state.attributes?.options as string[]) || []).map(
                  (opt) => html`
                    <button
                      class="o choice"
                      type="button"
                      aria-selected="${String(opt === vane.state.state)}"
                      @click=${() => {
                        this._call("select", "select_option", {
                          entity_id: vane.entity,
                          option: opt,
                        });
                        this._closeOverlay();
                      }}
                    >
                      <span></span>
                      <span>${label(opt)}</span>
                      <span class="oi"></span>
                    </button>
                  `,
                )}
              </div>
            </section>
          `,
        )}
      `;
    }

    if (this._activePanel === "timer") {
      return html`
        <div class="tpr timers">
          ${[
            ["30 min", "00:30:00"],
            ["1 hour", "01:00:00"],
            ["2 hours", "02:00:00"],
          ].map(
            ([name, duration]) => html`
              <button
                type="button"
                @click=${() => {
                  this._call("timer", "start", {
                    entity_id: this._config?.timer_entity,
                    duration,
                  });
                  this._closeOverlay();
                }}
              >
                ${name}
              </button>
            `,
          )}
        </div>
        <div class="tac">
          <button
            type="button"
            @click=${() => {
              this._call("timer", "cancel", {
                entity_id: this._config?.timer_entity,
              });
              this._closeOverlay();
            }}
          >
            Cancel timer
          </button>
        </div>
      `;
    }

    // Settings panel
    const minimum = Number(attributes.min_temp);
    const maximum = Number(attributes.max_temp);
    const step = Number(attributes.target_temp_step) || 0.5;

    return html`
      <p class="fb">
        Native Home Assistant controls · ${degrees(minimum)}–${degrees(maximum)}
        · ${degrees(step)} steps
      </p>
      <div class="qs og">
        ${
          this._vanes().length
            ? html`
                <button
                  class="o"
                  type="button"
                  @click=${() => this._openPanel("vanes")}
                >
                  <span></span>
                  <span>Vane settings</span>
                  <span class="oi"></span>
                </button>
              `
            : ""
        }
        ${
          this._config?.timer_entity
            ? html`
                <button
                  class="o"
                  type="button"
                  @click=${() => this._openPanel("timer")}
                >
                  <span></span>
                  <span>Off timer</span>
                  <span class="oi"></span>
                </button>
              `
            : ""
        }
      </div>
      <div class="og">
        ${[
          ...(this._config?.settings_entities || []),
          ...(this._config?.profile_entities || []),
        ].map((entry) => {
          const entity = typeof entry === "string" ? entry : entry?.entity;
          if (!entity) return "";
          const labelText =
            typeof entry === "object" && entry.name
              ? entry.name
              : this._state(entity)?.attributes?.friendly_name || entity;
          return html`
            <button
              class="o setting"
              type="button"
              style="margin-bottom: 6px;"
              @click=${() => {
                const [domain] = entity.split(".");
                this._call(domain, "turn_on", { entity_id: entity });
                this._closeOverlay();
              }}
            >
              <span></span>
              <span>${this.esc(labelText)}</span>
              <span class="oi"></span>
            </button>
          `;
        })}
      </div>
    `;
  }
}

registerCard({
  type: "component-split-controller-v4",
  element: ComponentSplitControllerV4,
  name: "Split-System Controller",
  description:
    "Direct Home Assistant climate controls with the established Split System presentation.",
});
