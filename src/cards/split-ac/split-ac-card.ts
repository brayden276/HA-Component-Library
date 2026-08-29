export * from "./split-ac-card.types";
import type { SplitControllerConfig } from "./split-ac-card.types";
export * from "./split-ac-card.styles";
import { splitAcCardStyles } from "./split-ac-card.styles";
import { html, TemplateResult, CSSResultGroup, PropertyValues } from "lit";
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
import { runServiceAction } from "../../utils/entity";


const unavailable = (st?: HassEntity | null): boolean =>
  !st || ["unknown", "unavailable"].includes(st.state);

const label = (value?: unknown): string => {
  const str = String(value || "");
  if (!str) return "";
  const mitsubishiMap: Record<string, string> = {
    "1_up": "1 (Up)",
    "2_up_middle": "2 (Up Mid)",
    "3_middle": "3 (Middle)",
    "4_down_middle": "4 (Down Mid)",
    "5_down": "5 (Down)",
    "1_left": "1 (Left)",
    "2_left_center": "2 (Left Mid)",
    "3_center": "3 (Center)",
    "4_right_center": "4 (Right Mid)",
    "5_right": "5 (Right)",
    "left_right": "Split (Left/Right)",
    "fan_only": "Fan",
    "heat_cool": "Auto",
  };
  const lower = str.toLowerCase();
  if (mitsubishiMap[lower]) return mitsubishiMap[lower];
  return str
    .replaceAll("_", " ")
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join(" ");
};

const degrees = (value?: unknown): string =>
  Number.isFinite(Number(value))
    ? Number(value).toFixed(Number(value) % 1 ? 1 : 0) + "°"
    : "—";

interface SplitResumeState {
  hvacMode: string;
  temperature?: number;
  fanMode?: string;
  swingMode?: string;
  swingHorizontalMode?: string;
  verticalVaneOption?: string;
  horizontalVaneOption?: string;
  updatedAt: number;
}

const splitResumeCache = new Map<string, SplitResumeState>();

const getStorageKey = (entityId: string): string => `ha_split_resume_${entityId}`;

const loadResumeState = (entityId: string): SplitResumeState | null => {
  if (splitResumeCache.has(entityId)) {
    return splitResumeCache.get(entityId)!;
  }
  try {
    const raw = typeof localStorage !== "undefined" ? localStorage.getItem(getStorageKey(entityId)) : null;
    if (raw) {
      const parsed = JSON.parse(raw) as SplitResumeState;
      if (parsed && typeof parsed.hvacMode === "string") {
        splitResumeCache.set(entityId, parsed);
        return parsed;
      }
    }
  } catch {
    // Ignore storage failure
  }
  return null;
};

const saveResumeState = (entityId: string, stateData: SplitResumeState): void => {
  splitResumeCache.set(entityId, stateData);
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(getStorageKey(entityId), JSON.stringify(stateData));
    }
  } catch {
    // Ignore storage failure
  }
};

@customElement("component-split-controller-v4")
export class ComponentSplitControllerV4 extends LitBaseCard<SplitControllerConfig> {
  @state()
  private _activePanel: "mode" | "fan" | "vanes" | "timer" | "settings" | null =
    null;

  @state()
  private _optimisticTemp: number | null = null;

  private _interactionHandles: InteractionHandle[] = [];
  private _tempCoalescer: RequestCoalescer<number> | null = null;
  private _lastFocused: HTMLElement | null = null;
  private _backdropMouseDown = false;

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
    data: Record<string, unknown>,
  ): Promise<void> | void {
    return this.hass
      ? runServiceAction(this.hass, { domain, service, data })
      : undefined;
  }

  public override updated(changed: PropertyValues): void {
    super.updated(changed);
    this._captureActiveState();
  }

  private _captureActiveState(): void {
    if (!this._config?.entity) return;
    const st = this._state();
    if (!st || unavailable(st) || st.state === "off") return;
    const attrs = st.attributes || {};
    const vertVane = this._vanes().find((v) => v.axis === "Vertical");
    const horizVane = this._vanes().find((v) => v.axis === "Horizontal");

    const resumeData: SplitResumeState = {
      hvacMode: st.state,
      temperature: Number.isFinite(Number(attrs.temperature)) ? Number(attrs.temperature) : undefined,
      fanMode: attrs.fan_mode ? String(attrs.fan_mode) : undefined,
      swingMode: attrs.swing_mode ? String(attrs.swing_mode) : undefined,
      swingHorizontalMode: attrs.swing_horizontal_mode ? String(attrs.swing_horizontal_mode) : undefined,
      verticalVaneOption: vertVane?.entity ? vertVane.current : undefined,
      horizontalVaneOption: horizVane?.entity ? horizVane.current : undefined,
      updatedAt: Date.now(),
    };
    saveResumeState(this._config.entity, resumeData);
  }

  private async _power(): Promise<void> {
    if (!this._config?.entity || !this.hass) return;
    const st = this._state();
    if (!st || unavailable(st)) return;
    const isOff = st.state === "off";
    if (!isOff) {
      this._captureActiveState();
      try {
        await runServiceAction(this.hass, {
          domain: "climate",
          service: "set_hvac_mode",
          data: { hvac_mode: "off" },
          target: { entity_id: this._config.entity },
        });
      } catch {
        await runServiceAction(this.hass, {
          domain: "climate",
          service: "turn_off",
          target: { entity_id: this._config.entity },
        });
      }
    } else {
      const saved = loadResumeState(this._config.entity);
      const modes: string[] = st.attributes?.hvac_modes || [];
      const resumeMode =
        (saved?.hvacMode && modes.includes(saved.hvacMode) && saved.hvacMode !== "off")
          ? saved.hvacMode
          : (modes.includes("cool") ? "cool" : modes.includes("heat") ? "heat" : modes.find((m) => m !== "off") || "cool");

      try {
        await runServiceAction(this.hass, {
          domain: "climate",
          service: "set_hvac_mode",
          data: { hvac_mode: resumeMode },
          target: { entity_id: this._config.entity },
        });
      } catch {
        await runServiceAction(this.hass, {
          domain: "climate",
          service: "turn_on",
          target: { entity_id: this._config.entity },
        });
      }

      if (saved?.temperature && Number.isFinite(saved.temperature)) {
        try {
          await runServiceAction(this.hass, {
            domain: "climate",
            service: "set_temperature",
            data: { temperature: saved.temperature },
            target: { entity_id: this._config.entity },
          });
        } catch {
          // Ignore failure
        }
      }

      if (saved?.fanMode && Array.isArray(st.attributes?.fan_modes) && st.attributes.fan_modes.includes(saved.fanMode)) {
        try {
          await runServiceAction(this.hass, {
            domain: "climate",
            service: "set_fan_mode",
            data: { fan_mode: saved.fanMode },
            target: { entity_id: this._config.entity },
          });
        } catch {
          // Ignore failure
        }
      }

      if (saved?.swingMode && Array.isArray(st.attributes?.swing_modes) && st.attributes.swing_modes.includes(saved.swingMode)) {
        try {
          await runServiceAction(this.hass, {
            domain: "climate",
            service: "set_swing_mode",
            data: { swing_mode: saved.swingMode },
            target: { entity_id: this._config.entity },
          });
        } catch {
          // Ignore failure
        }
      }
    }
  }

  private _getTempCoalescer(): RequestCoalescer<number> {
    if (this._tempCoalescer) return this._tempCoalescer;
    this._tempCoalescer = createRequestCoalescer<number>(
      async (targetTemp: number) => {
        if (!this._config?.entity || !this.hass) return;
        await runServiceAction(this.hass, {
          domain: "climate",
          service: "set_temperature",
          data: { temperature: targetTemp },
          target: { entity_id: this._config.entity },
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
    const reported = Number(attributes.temperature);
    const base = this._optimisticTemp ?? (Number.isFinite(reported) ? reported : 21);
    const step = Number(attributes.target_temp_step || attributes.step) || 0.5;
    const min = Number(attributes.min_temp) || 16;
    const max = Number(attributes.max_temp) || 31;

    const next = Math.min(max, Math.max(min, Number((base + direction * step).toFixed(1))));
    this._optimisticTemp = next;
    this._getTempCoalescer().request(next);
  }

  private _vanes(): Array<{
    axis: string;
    entity?: string;
    state?: HassEntity;
    isClimateSwing?: boolean;
    isClimateHorizontalSwing?: boolean;
    options: string[];
    current: string;
  }> {
    const results: Array<{
      axis: string;
      entity?: string;
      state?: HassEntity;
      isClimateSwing?: boolean;
      isClimateHorizontalSwing?: boolean;
      options: string[];
      current: string;
    }> = [];

    const climateSt = this._state();
    const climateAttrs = climateSt?.attributes || {};
    const baseEntity = this._config?.entity?.replace(/^climate\./, "") || "";

    const vertEntity =
      this._config?.vertical_vane_entity ||
      this._config?.vertical_vane ||
      (this.hass?.states?.[`select.${baseEntity}_vertical_vane`]
        ? `select.${baseEntity}_vertical_vane`
        : undefined) ||
      (this.hass?.states?.[`select.${baseEntity}_vane_vertical`]
        ? `select.${baseEntity}_vane_vertical`
        : undefined);

    const horizEntity =
      this._config?.horizontal_vane_entity ||
      this._config?.horizontal_vane ||
      (this.hass?.states?.[`select.${baseEntity}_horizontal_vane`]
        ? `select.${baseEntity}_horizontal_vane`
        : undefined) ||
      (this.hass?.states?.[`select.${baseEntity}_vane_horizontal`]
        ? `select.${baseEntity}_vane_horizontal`
        : undefined);

    if (vertEntity) {
      const st = this._state(vertEntity);
      if (st && !unavailable(st)) {
        results.push({
          axis: "Vertical",
          entity: vertEntity,
          state: st,
          options: (st.attributes?.options as string[]) || [],
          current: st.state,
        });
      }
    }

    if (horizEntity) {
      const st = this._state(horizEntity);
      if (st && !unavailable(st)) {
        results.push({
          axis: "Horizontal",
          entity: horizEntity,
          state: st,
          options: (st.attributes?.options as string[]) || [],
          current: st.state,
        });
      }
    }

    if (
      !results.some((r) => r.axis === "Vertical") &&
      Array.isArray(climateAttrs.swing_modes) &&
      climateAttrs.swing_modes.length > 0
    ) {
      results.push({
        axis: "Vertical",
        isClimateSwing: true,
        options: climateAttrs.swing_modes,
        current: String(climateAttrs.swing_mode || "off"),
      });
    }

    if (
      !results.some((r) => r.axis === "Horizontal") &&
      Array.isArray(climateAttrs.swing_horizontal_modes) &&
      climateAttrs.swing_horizontal_modes.length > 0
    ) {
      results.push({
        axis: "Horizontal",
        isClimateHorizontalSwing: true,
        options: climateAttrs.swing_horizontal_modes,
        current: String(climateAttrs.swing_horizontal_mode || "off"),
      });
    }

    return results;
  }

  private _closeOverlay(): void {
    this._activePanel = null;
    const focusTarget = this._lastFocused;
    this._lastFocused = null;
    focusTarget?.focus();
  }

  private _openPanel(
    panel: "mode" | "fan" | "vanes" | "timer" | "settings",
  ): void {
    const activeElement = this.renderRoot.querySelector(":focus");
    this._lastFocused = activeElement instanceof HTMLElement
      ? activeElement
      : null;
    this._activePanel = panel;
    this.updateComplete.then(() =>
      this.renderRoot.querySelector<HTMLElement>(".pn [data-dialog-close]")?.focus(),
    );
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
      .map((v) => `${v.axis.slice(0, 1)} ${label(v.current)}`)
      .join(" · ");

    const name =
      this._config.title || attributes.friendly_name || "Split system";
    const displayState = unavailable(st)
      ? "Unavailable"
      : on
        ? label(st?.state)
        : attributes.current_temperature !== undefined
          ? `Off · ${degrees(attributes.current_temperature)}`
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
        <div class="split-card">
          <div class="split-toolbar">
            <button
              class="split-identity"
              type="button"
              @click=${() => this.moreInfo(this._config?.entity)}
            >
              <span class="icon-well"><ha-icon icon="${modeIcon}"></ha-icon></span>
              <span class="copy-block">
                <span class="label-title">${this.esc(name)}</span>
                <span class="label-sub" role="status">${this.esc(displayState)}</span>
              </span>
            </button>
            <button
              class="btn-icon-44"
              type="button"
              aria-label="Profiles"
              ?disabled=${unavailable(st)}
              @click=${() => this._openPanel("settings")}
            >
              <ha-icon icon="mdi:account-circle-outline"></ha-icon>
            </button>
            <button
              class="btn-icon-44"
              type="button"
              aria-label="Advanced settings"
              ?disabled=${unavailable(st)}
              @click=${() => this._openPanel("settings")}
            >
              <ha-icon icon="mdi:cog-outline"></ha-icon>
            </button>
            <button
              class="btn-icon-44 power-btn ${on ? "on" : ""}"
              type="button"
              aria-label="Toggle split system power"
              ?disabled=${unavailable(st)}
              aria-pressed="${String(on)}"
              @click=${() => this._power()}
            >
              <ha-icon icon="mdi:power"></ha-icon>
            </button>
          </div>

          ${
            on
              ? html`
                  <div class="card-divider-line"></div>

                  <div class="split-climate-row">
                    <div>
                      <span class="kpi-metric-lg"
                        >${degrees(attributes.current_temperature)}</span
                      >
                      <span class="label-sub room-temperature">Room temperature</span>
                    </div>
                    <div class="stepper-control">
                      <button
                        class="stepper-step-btn decrease"
                        type="button"
                        aria-label="Decrease target temperature"
                        ?disabled=${!on}
                        aria-disabled="${String(!on)}"
                        @click=${() => this._temperature(-1)}
                      >
                        <ha-icon icon="mdi:minus"></ha-icon>
                      </button>
                      <div class="stepper-display">
                        <div class="stepper-main-val">${degrees(targetTemp)}</div>
                        <div class="stepper-sub-lbl">Target</div>
                      </div>
                      <button
                        class="stepper-step-btn increase"
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

                  <div class="split-actions">
                    <button
                      class="btn-action-pill action-pill ${on ? "active" : ""}"
                      type="button"
                      data-panel="mode"
                      aria-expanded="${String(this._activePanel === "mode")}"
                      aria-label="HVAC mode: ${label(st?.state)}"
                      ?disabled=${unavailable(st)}
                      @click=${() => this._openPanel("mode")}
                    >
                      <ha-icon icon="${modeIcon}"></ha-icon>
                      <span class="action-label">Mode · ${label(st?.state)}</span>
                    </button>
                    <button
                      class="btn-action-pill action-pill"
                      type="button"
                      data-panel="fan"
                      aria-expanded="${String(this._activePanel === "fan")}"
                      aria-label="Fan speed: ${label(attributes.fan_mode)}"
                      ?disabled=${unavailable(st)}
                      @click=${() => this._openPanel("fan")}
                    >
                      <ha-icon icon="mdi:fan"></ha-icon>
                      <span class="action-label">Fan · ${label(attributes.fan_mode)}</span>
                    </button>
                    ${
                      vaneSummary
                        ? html`
                            <button
                              class="btn-action-pill action-pill"
                              type="button"
                              data-panel="vanes"
                              aria-expanded="${String(this._activePanel === "vanes")}"
                              aria-label="Vanes: ${vaneSummary}"
                              ?disabled=${unavailable(st)}
                              @click=${() => this._openPanel("vanes")}
                            >
                              <ha-icon icon="mdi:swap-vertical"></ha-icon>
                              <span class="action-label">Vanes · ${this.esc(vaneSummary)}</span>
                            </button>
                          `
                        : ""
                    }
                    ${
                      this._config.timer_entity
                        ? html`
                            <button
                              class="btn-action-pill action-pill ${timer?.state === "active" ? "active" : ""}"
                              type="button"
                              data-panel="timer"
                              aria-expanded="${String(this._activePanel === "timer")}"
                              aria-label="Off timer: ${timer?.state === "active" ? "Active" : "Off"}"
                              ?disabled=${unavailable(st) || unavailable(timer)}
                              @click=${() => this._openPanel("timer")}
                            >
                              <ha-icon icon="mdi:timer-outline"></ha-icon>
                              <span class="action-label"
                                >${timer?.state === "active" ? "Timer · Active" : "Timer"}</span
                              >
                            </button>
                          `
                        : ""
                    }
                  </div>
                `
              : ""
          }
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
        @mousedown=${(e: MouseEvent) => {
          this._backdropMouseDown = e.target === e.currentTarget;
        }}
        @keydown=${(e: KeyboardEvent) => {
          if (e.key === "Escape") {
            e.stopPropagation();
            this._closeOverlay();
          }
        }}
        @click=${(e: MouseEvent) => {
          if (e.target === e.currentTarget && this._backdropMouseDown) {
            this._closeOverlay();
          }
          this._backdropMouseDown = false;
        }}
      >
        <div class="pd" @click=${(e: MouseEvent) => e.stopPropagation()} @mousedown=${(e: MouseEvent) => e.stopPropagation()}>
          <div class="ph">
            <h3 class="pt">${title}</h3>
            <button
              class="x"
              data-dialog-close
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
                @click=${(e: Event) => {
                  e.stopPropagation();
                  this._call("climate", "set_hvac_mode", {
                    entity_id: this._config?.entity,
                    hvac_mode: mode,
                  });
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
                @click=${(e: Event) => {
                  e.stopPropagation();
                  this._call("climate", "set_fan_mode", {
                    entity_id: this._config?.entity,
                    fan_mode: mode,
                  });
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
                ${vane.options.map(
                  (opt) => html`
                    <button
                      class="o choice"
                      type="button"
                      aria-selected="${String(opt === vane.current)}"
                      @click=${(e: Event) => {
                        e.stopPropagation();
                        if (vane.isClimateSwing) {
                          this._call("climate", "set_swing_mode", {
                            entity_id: this._config?.entity,
                            swing_mode: opt,
                          });
                        } else if (vane.isClimateHorizontalSwing) {
                          this._call("climate", "set_swing_horizontal_mode", {
                            entity_id: this._config?.entity,
                            swing_horizontal_mode: opt,
                          });
                        } else if (vane.entity) {
                          this._call("select", "select_option", {
                            entity_id: vane.entity,
                            option: opt,
                          });
                        }
                      }}
                    >
                      <span><ha-icon icon="mdi:swap-vertical"></ha-icon></span>
                      <span>${label(opt)}</span>
                      <span class="oi">${opt === vane.current ? html`<ha-icon icon="mdi:check"></ha-icon>` : ""}</span>
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
                @click=${(e: Event) => {
                  e.stopPropagation();
                  this._call("timer", "start", {
                    entity_id: this._config?.timer_entity,
                    duration,
                  });
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
            @click=${(e: Event) => {
              e.stopPropagation();
              this._call("timer", "cancel", {
                entity_id: this._config?.timer_entity,
              });
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
                  @click=${(e: Event) => {
                    e.stopPropagation();
                    this._openPanel("vanes");
                  }}
                >
                  <span><ha-icon icon="mdi:swap-vertical"></ha-icon></span>
                  <span>Vane settings</span>
                  <span class="oi"><ha-icon icon="mdi:chevron-right"></ha-icon></span>
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
                  @click=${(e: Event) => {
                    e.stopPropagation();
                    this._openPanel("timer");
                  }}
                >
                  <span><ha-icon icon="mdi:timer-outline"></ha-icon></span>
                  <span>Off timer</span>
                  <span class="oi"><ha-icon icon="mdi:chevron-right"></ha-icon></span>
                </button>
              `
            : ""
        }
      </div>
      ${
        Array.isArray(attributes.preset_modes) && attributes.preset_modes.length > 0
          ? html`
              <div class="og">
                <p class="fb" style="margin-bottom: 6px; font-weight: 600;">Preset mode</p>
                <div class="qs choices">
                  ${(attributes.preset_modes as string[]).map(
                    (preset) => html`
                      <button
                        class="o choice"
                        type="button"
                        aria-selected="${String(preset === attributes.preset_mode)}"
                        @click=${(e: Event) => {
                          e.stopPropagation();
                          this._call("climate", "set_preset_mode", {
                            entity_id: this._config?.entity,
                            preset_mode: preset,
                          });
                        }}
                      >
                        <span><ha-icon icon="mdi:tune"></ha-icon></span>
                        <span>${label(preset)}</span>
                        <span class="oi">${preset === attributes.preset_mode ? html`<ha-icon icon="mdi:check"></ha-icon>` : ""}</span>
                      </button>
                    `,
                  )}
                </div>
              </div>
            `
          : ""
      }
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
              @click=${(e: Event) => {
                e.stopPropagation();
                const [domain] = entity.split(".");
                this._call(domain, "turn_on", { entity_id: entity });
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
