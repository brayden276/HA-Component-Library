export * from "./wled-card.types";
import type { WledControllerConfig } from "./wled-card.types";
export * from "./wled-card.styles";
import { wledCardStyles } from "./wled-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import type {
  LovelaceGridOptions,
  HassEntity,
  HomeAssistant,
} from "../../types/home-assistant";
import type {
  DashboardRegistries,
  EntityRegistryEntry,
} from "../../types/registry";
import { centralRegistry } from "../../services/registry/dashboard-registry";
import {
  WLED_DOMAIN,
  WLED_INVALID,
  WLED_NAME,
} from "../../services/devices/wled-runtime";
import {
  createRequestCoalescer,
  RequestCoalescer,
  waitForEntityState,
} from "../../utils/interaction";
import { registerCard } from "../../utils/registration";
import { runServiceAction } from "../../utils/entity";

interface WledBundle {
  deviceId?: string;
  deviceName: string;
  main: string;
  effectLights: string[];
  preset: string | null;
  palettes: string[];
  speeds: string[];
  intensities: string[];
}

@customElement("component-wled-controller-v1")
export class ComponentWledControllerV1 extends LitBaseCard<WledControllerConfig> {
  @state()
  private _registries: DashboardRegistries | null = null;

  @state()
  private _bundle: WledBundle | null = null;

  @state()
  private _brightnessIntent: number | null = null;

  @state()
  private _speedIntent: number | null = null;

  @state()
  private _intensityIntent: number | null = null;

  private _unsubRegistry: (() => void) | null = null;
  private _registryHass: HomeAssistant | null = null;

  private _brightnessCoalescer: RequestCoalescer<number> | null = null;
  private _dialogOpener: HTMLElement | null = null;

  @state()
  private _actionError: string | null = null;

  public static override getGridOptions(): LovelaceGridOptions {
    return { columns: 12, rows: "auto" };
  }

  public static override styles: CSSResultGroup = wledCardStyles;

  public override setConfig(config: WledControllerConfig): void {
    if (!config?.entity) throw new Error("WLED controller requires entity");
    super.setConfig({ ...config });
    this._bundle = null;
    this._loadRegistries();
  }

  public override getCardSize(): number {
    return 2;
  }

  private _loadRegistries(): void {
    if (!this.hass) return;
    const hass = this.hass;
    centralRegistry.load(hass).then((data) => {
      if (this.hass !== hass) return;
      this._registries = data;
      this._bundle = this._resolveBundle();
    });
  }

  private _bindRegistry(): void {
    if (!this.hass) return;
    if (this._registryHass === this.hass && this._unsubRegistry) return;
    this._unsubRegistry?.();
    this._unsubRegistry = null;
    this._registryHass = this.hass;
    this._registries = null;
    this._bundle = null;
    const hass = this.hass;
    this._unsubRegistry = centralRegistry.subscribe(hass, (data) => {
      if (this.hass !== hass) return;
      this._registries = data;
      this._bundle = this._resolveBundle();
    });
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._bindRegistry();
  }

  public override disconnectedCallback(): void {
    this._unsubRegistry?.();
    this._unsubRegistry = null;
    this._registryHass = null;
    this._brightnessCoalescer?.destroy();
    this._brightnessCoalescer = null;
    this._brightnessIntent = null;
    super.disconnectedCallback();
  }

  protected override willUpdate(): void {
    if (this.isConnected) this._bindRegistry();
    if (!this._bundle && this.hass && this._registries) {
      this._bundle = this._resolveBundle();
    }
  }

  private _resolveBundle(): WledBundle | null {
    if (!this._config?.entity || !this.hass) return null;
    const all = this._registries?.entities || [];
    const entry = all.find((e) => e.entity_id === this._config!.entity);
    const deviceId = this._config.device_id || entry?.device_id;
    const siblings =
      (deviceId ? this._registries?.byDevice?.get(deviceId) : []) || [];
    const rows = siblings.filter(
      (e) =>
        e?.platform === "wled" &&
        !e.disabled_by &&
        this.hass?.states[e.entity_id],
    );
    const lightRows = rows.filter((e) => WLED_DOMAIN(e.entity_id) === "light");
    const main =
      lightRows.find((e) => e.entity_id === this._config!.entity) ||
      lightRows.find((e) => WLED_NAME(e) === "main") ||
      lightRows[0];
    const effectRows = lightRows.filter((e) =>
      Array.isArray(this.hass?.states[e.entity_id]?.attributes?.effect_list),
    );
    const selectRows = rows.filter(
      (e) => WLED_DOMAIN(e.entity_id) === "select",
    );
    const numberRows = rows.filter(
      (e) => WLED_DOMAIN(e.entity_id) === "number",
    );
    const match = (e: EntityRegistryEntry, re: RegExp) =>
      re.test(`${e.entity_id} ${e.original_name || ""} ${e.name || ""}`);
    const preset = selectRows.find((e) => match(e, /\bpreset\b/i));
    const palettes = selectRows.filter((e) =>
      match(e, /color.?palette|colour.?palette/i),
    );
    const speeds = numberRows.filter((e) => match(e, /\bspeed\b/i));
    const intensities = numberRows.filter((e) => match(e, /\bintensity\b/i));
    const dev = this._registries?.devices?.find((x) => x.id === deviceId);
    const mainEntity = main?.entity_id || this._config.entity;
    const effectLights = effectRows.length
      ? effectRows.map((e) => e.entity_id)
      : this.hass.states[mainEntity]?.attributes?.effect_list
        ? [mainEntity]
        : [];
    const deviceName =
      dev?.name_by_user ||
      dev?.name ||
      this.hass?.states[mainEntity]?.attributes?.friendly_name ||
      "WLED";

    return {
      deviceId: deviceId || undefined,
      deviceName,
      main: mainEntity,
      effectLights,
      preset: preset?.entity_id || null,
      palettes: palettes.map((e) => e.entity_id),
      speeds: speeds.map((e) => e.entity_id),
      intensities: intensities.map((e) => e.entity_id),
    };
  }

  private _pct(v: unknown): string {
    const n = Number(v);
    return Number.isFinite(n) ? `${Math.round((n / 255) * 100)}%` : "—";
  }

  private async _togglePower(): Promise<void> {
    const id = this._bundle?.main || this._config?.entity;
    const state = id ? this.hass?.states?.[id] : null;
    if (!id || !this.hass) return;
    const wasOn = state?.state === "on";
    await runServiceAction(this.hass, {
      domain: "light",
      service: "toggle",
      target: { entity_id: id },
    });
    await waitForEntityState(
      () => this.hass,
      id,
      (value) => value === (wasOn ? "off" : "on"),
      { timeout: 5000 },
    );
  }

  private _getBrightnessCoalescer(): RequestCoalescer<number> {
    if (this._brightnessCoalescer) return this._brightnessCoalescer;
    this._brightnessCoalescer = createRequestCoalescer(
      async (value) => {
        const id = this._bundle?.main;
        if (!id || !this.hass) return;
        if (value <= 0) {
          await runServiceAction(this.hass, {
            domain: "light",
            service: "turn_off",
            target: { entity_id: id },
          });
        } else {
          await runServiceAction(this.hass, {
            domain: "light",
            service: "turn_on",
            data: { brightness: value },
            target: { entity_id: id },
          });
        }
        await waitForEntityState(
          () => this.hass,
          id,
          (st, obj) =>
            value <= 0
              ? st === "off"
              : st === "on" &&
                Math.abs(Number(obj?.attributes?.brightness ?? -999) - value) <=
                  2,
          { timeout: 7000 },
        );
      },
      {
        onSuccess: (value) => {
          if (this._brightnessIntent === value) this._brightnessIntent = null;
        },
        onError: () => {
          this._brightnessIntent = null;
        },
      },
    );
    return this._brightnessCoalescer;
  }

  private _same(
    ids: string[],
    read: (st?: HassEntity) => unknown,
  ): string | null {
    if (!this.hass) return null;
    const vals = ids
      .map((id) => read(this.hass!.states[id]))
      .filter(
        (v) =>
          v !== undefined &&
          v !== null &&
          !WLED_INVALID.has(String(v).toLowerCase()),
      );
    if (!vals.length) return null;
    return vals.every((v) => String(v) === String(vals[0]))
      ? String(vals[0])
      : "Mixed";
  }

  private async _call(
    domain: string,
    service: string,
    ids: string[],
    data: Record<string, unknown> = {},
  ): Promise<void> {
    const targets = [...new Set((ids || []).filter(Boolean))];
    if (!this.hass || !targets.length) return;
    await Promise.all(
      targets.map((entity_id) =>
        runServiceAction(this.hass!, {
          domain,
          service,
          data,
          target: { entity_id },
        }),
      ),
    );
  }

  private _openAdvanced(presets = false, event?: Event): void {
    const dialog = this.renderRoot.querySelector(
      "dialog",
    ) as HTMLDialogElement | null;
    // The card can render from its configured entity before registry discovery
    // completes. Keep the visible controls usable during that short window.
    const bundle = this._bundle || this._resolveBundle();
    if (!dialog || !bundle) return;
    const mainSt = this.hass?.states?.[bundle.main];
    if (String(mainSt?.state || "unavailable").toLowerCase() !== "on") return;
    this._dialogOpener =
      event?.currentTarget instanceof HTMLElement
        ? event.currentTarget
        : this._dialogOpener;
    if (!dialog.open) {
      try {
        dialog.showModal();
      } catch {
        this._dialogOpener = null;
        return;
      }
    }
    queueMicrotask(() => {
      if (presets) {
        this.renderRoot
          .querySelector(".presets-section")
          ?.scrollIntoView({ block: "start" });
      } else {
        (this.renderRoot.querySelector(".close") as HTMLElement)?.focus();
      }
    });
  }

  private _closeDialog(): void {
    const dialog = this.renderRoot.querySelector(
      "dialog",
    ) as HTMLDialogElement | null;
    if (dialog?.open) dialog.close();
  }

  private _handleDialogClosed = (): void => {
    const opener = this._dialogOpener;
    this._dialogOpener = null;
    opener?.focus();
  };

  private async _runAction(action: () => Promise<void> | void): Promise<void> {
    this._actionError = null;
    try {
      await action();
    } catch {
      this._actionError =
        "Action failed. Check that the WLED device is available.";
    }
  }

  protected override render(): TemplateResult {
    if (!this._config || !this.hass) return html``;
    const bundle = this._bundle || this._resolveBundle();
    if (!bundle)
      return html`
        <ha-card>
          <div class="wled-card">
            <div class="wled-toolbar" aria-busy="true">
              <div class="icon-well control-radius">
                <ha-icon icon="mdi:led-strip-variant"></ha-icon>
              </div>
              <div class="copy-block">
                <div class="label-title">Loading WLED</div>
                <div class="label-sub" role="status">Loading…</div>
              </div>
            </div>
          </div>
        </ha-card>
      `;

    const main = this.hass.states[bundle.main];
    const state = String(main?.state || "unavailable").toLowerCase();
    const on = state === "on";
    const controllable = state === "on" || state === "off";
    const reportedBrightness = on
      ? Number(main?.attributes?.brightness ?? 0)
      : 0;
    const brightness = this._brightnessIntent ?? reportedBrightness;
    const effect = this._same(
      bundle.effectLights,
      (s) => s?.attributes?.effect,
    );
    const palette = this._same(bundle.palettes, (s) => s?.state);
    const speed = this._same(bundle.speeds, (s) => s?.state);
    const intensity = this._same(bundle.intensities, (s) => s?.state);
    const presetState = bundle.preset ? this.hass.states[bundle.preset] : null;
    const presetOptions: string[] = presetState?.attributes?.options || [];

    const status = on
      ? [
          this._pct(brightness),
          effect && effect !== "Mixed" ? effect : null,
          palette && palette !== "Mixed" ? palette : null,
        ]
          .filter(Boolean)
          .join(" · ")
      : state === "unavailable"
        ? "Unavailable"
        : state === "unknown"
          ? "Unknown"
          : "Off";

    const usable = (id: string) => {
      const val = this.hass?.states?.[id];
      return Boolean(val && !WLED_INVALID.has(String(val.state).toLowerCase()));
    };
    const presetOk = Boolean(bundle.preset && usable(bundle.preset));
    const effectOk = bundle.effectLights.some(usable);
    const paletteOk = bundle.palettes.some(usable);
    const speedOk = bundle.speeds.some(usable);
    const intensityOk = bundle.intensities.some(usable);

    const fxState = bundle.effectLights
      .map((id) => this.hass?.states[id])
      .find(Boolean);
    const fxOptions: string[] = fxState?.attributes?.effect_list || [];
    const paletteState = bundle.palettes
      .map((id) => this.hass?.states[id])
      .find(Boolean);
    const paletteOptions: string[] = paletteState?.attributes?.options || [];

    return html`
      <ha-card>
        <div class="wled-card">
          <div class="wled-toolbar">
            <div class="icon-well control-radius">
              <ha-icon icon="mdi:led-strip-variant"></ha-icon>
            </div>
            <button
              class="identity"
              type="button"
              aria-label="Open ${this.esc(bundle.deviceName)} settings"
              @click=${(event: Event) => this._openAdvanced(false, event)}
            >
              <div class="copy-block">
                <div class="label-title">${this.esc(bundle.deviceName)}</div>
                <div class="label-sub" role="status">${this.esc(status)}</div>
              </div>
            </button>
            <button
              class="btn-icon-44 power ${on ? "on" : ""}"
              type="button"
              aria-label="Toggle WLED"
              ?disabled=${!controllable}
              aria-pressed="${String(on)}"
              @click=${() => void this._runAction(() => this._togglePower())}
            >
              <ha-icon icon="mdi:power"></ha-icon>
            </button>
          </div>
          ${
          on
            ? html`
                <div class="card-divider-line"></div>
                <div class="brightness-control">
                  <span class="label-title">Brightness</span>
                  <input
                    class="brightness"
                    type="range"
                    min="0"
                    max="255"
                    step="1"
                    role="slider"
                    aria-label="Brightness"
                    aria-valuemin="0"
                    aria-valuemax="255"
                    aria-valuenow="${String(Math.max(0, Math.min(255, Number.isFinite(brightness) ? brightness : 0)))}"
                    .value=${String(Math.max(0, Math.min(255, Number.isFinite(brightness) ? brightness : 0)))}
                    @input=${(e: Event) => {
                        const v = Number((e.target as HTMLInputElement).value);
                        this._brightnessIntent = v;
                        this._getBrightnessCoalescer().request(v);
                      }}
                  />
                  <output class="brightness-value"
                    >${this._pct(brightness)}</output
                  >
                </div>
                <div class="actions">
                  <button
                    class="btn-action-pill action presets"
                    type="button"
                    ?disabled=${!presetOk}
                    aria-label="WLED presets"
                    @click=${(event: Event) => this._openAdvanced(true, event)}
                  >
                    <ha-icon icon="mdi:bookmark-multiple-outline"></ha-icon>
                    <span>Presets</span>
                  </button>
                  <button
                    class="btn-action-pill action colour"
                    type="button"
                    ?disabled=${!effectOk}
                    aria-label="WLED colour"
                    @click=${() => this.moreInfo(bundle.effectLights[0] || bundle.main)}
                  >
                    <ha-icon icon="mdi:palette-outline"></ha-icon>
                    <span>Colour</span>
                  </button>
                  <button
                    class="btn-action-pill action advanced"
                    type="button"
                    ?disabled=${!(presetOk || effectOk || paletteOk || speedOk || intensityOk)}
                    aria-label="WLED advanced settings"
                    @click=${(event: Event) => this._openAdvanced(false, event)}
                  >
                    <ha-icon icon="mdi:tune-variant"></ha-icon>
                    <span>Advanced</span>
                  </button>
                </div>
                ${this._actionError ? html`<div class="feedback-line err" role="alert">${this._actionError}</div>` : ""}
              `
            : ""
        }
        </div>
      </ha-card>

      <dialog
        role="dialog"
        aria-modal="true"
        aria-label="${this.esc(bundle.deviceName)} settings"
        @close=${this._handleDialogClosed}
        @mousedown=${(e: MouseEvent) => {
          const dialog = this.renderRoot.querySelector("dialog");
          if (dialog && e.target === dialog) {
            const rect = dialog.getBoundingClientRect();
            const isInDialog =
              rect.top <= e.clientY &&
              e.clientY <= rect.top + rect.height &&
              rect.left <= e.clientX &&
              e.clientX <= rect.left + rect.width;
            if (!isInDialog) dialog.close();
          }
        }}
      >
        <div
          class="sheet"
          @click=${(e: MouseEvent) => e.stopPropagation()}
          @mousedown=${(e: MouseEvent) => e.stopPropagation()}
        >
          <div class="sheet-head">
            <div class="icon-well control-radius">
              <ha-icon icon="mdi:led-strip-variant"></ha-icon>
            </div>
            <div class="sheet-title">
              <div class="sheet-name">${this.esc(bundle.deviceName)}</div>
              <div class="sheet-state">${this.esc(status)}</div>
            </div>
            <button
              class="close"
              type="button"
              aria-label="Close"
              @click=${() => this._closeDialog()}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <div class="sheet-body">
            <section class="section presets-section">
              <div class="section-title">Presets</div>
              <div class="preset-grid">
                ${
                  presetOptions.length
                    ? presetOptions.map((opt) => {
                        const isActive =
                          String(presetState?.state) === String(opt);
                        return html`
                          <button
                            class="btn-action-pill preset-btn ${isActive ? "active" : ""}"
                            type="button"
                            role="button"
                            aria-pressed="${String(isActive)}"
                            title="${this.esc(opt)}"
                            @click=${async (e: Event) => {
                              e.stopPropagation();
                              await this._call(
                                "select",
                                "select_option",
                                bundle.preset ? [bundle.preset] : [],
                                { option: opt },
                              );
                            }}
                          >
                            ${this.esc(opt)}
                          </button>
                        `;
                      })
                    : html`<span class="label">No presets configured</span>`
                }
              </div>
            </section>

            <section class="section">
              <div class="section-title">Effect</div>
              <div class="fields">
                <label class="field">
                  <span>Effect</span>
                  <select
                    class="select-dropdown-control effect"
                    aria-label="Effect selection"
                    ?disabled=${!effectOk || !fxOptions.length}
                    @change=${(e: Event) => {
                      const val = (e.target as HTMLSelectElement).value;
                      if (val) {
                        this._call("light", "turn_on", bundle.effectLights, {
                          effect: val,
                        });
                      }
                    }}
                  >
                    ${
                      !effect || effect === "Mixed"
                        ? html`<option value="" selected>
                            ${effect === "Mixed" ? "Mixed" : "Choose effect"}
                          </option>`
                        : ""
                    }
                    ${fxOptions.map(
                      (opt) =>
                        html`<option
                          value="${this.esc(opt)}"
                          ?selected=${effect === opt}
                        >
                          ${this.esc(opt)}
                        </option>`,
                    )}
                  </select>
                </label>

                <label class="field">
                  <span>Palette</span>
                  <select
                    class="select-dropdown-control palette"
                    aria-label="Palette selection"
                    ?disabled=${!paletteOk || !paletteOptions.length}
                    @change=${(e: Event) => {
                      const val = (e.target as HTMLSelectElement).value;
                      if (val) {
                        this._call("select", "select_option", bundle.palettes, {
                          option: val,
                        });
                      }
                    }}
                  >
                    ${
                      !palette || palette === "Mixed"
                        ? html`<option value="" selected>
                            ${palette === "Mixed" ? "Mixed" : "Choose palette"}
                          </option>`
                        : ""
                    }
                    ${paletteOptions.map(
                      (opt) =>
                        html`<option
                          value="${this.esc(opt)}"
                          ?selected=${palette === opt}
                        >
                          ${this.esc(opt)}
                        </option>`,
                    )}
                  </select>
                </label>
              </div>
            </section>

            <section class="section">
              <div class="section-title">Animation</div>
              <div class="fine">
                <label class="fine-card">
                  <span class="fine-head">
                    <span>Speed</span>
                    <output class="speed-value"
                      >${this.esc(String((this._speedIntent ?? speed) || "—"))}</output
                    >
                  </span>
                  <input
                    class="speed"
                    type="range"
                    min="0"
                    max="255"
                    step="1"
                    role="slider"
                    aria-label="Animation speed"
                    aria-valuemin="0"
                    aria-valuemax="255"
                    aria-valuenow="${String((this._speedIntent ?? Number(speed)) || 0)}"
                    .value=${String((this._speedIntent ?? Number(speed)) || 0)}
                    ?disabled=${!speedOk}
                    @input=${(e: Event) => {
                      this._speedIntent = Number(
                        (e.target as HTMLInputElement).value,
                      );
                    }}
                    @change=${(e: Event) => {
                      const val = Number((e.target as HTMLInputElement).value);
                      this._speedIntent = null;
                      this._call("number", "set_value", bundle.speeds, {
                        value: val,
                      });
                    }}
                  />
                </label>

                <label class="fine-card">
                  <span class="fine-head">
                    <span>Intensity</span>
                    <output class="intensity-value"
                      >${this.esc(String((this._intensityIntent ?? intensity) || "—"))}</output
                    >
                  </span>
                  <input
                    class="intensity"
                    type="range"
                    min="0"
                    max="255"
                    step="1"
                    role="slider"
                    aria-label="Animation intensity"
                    aria-valuemin="0"
                    aria-valuemax="255"
                    aria-valuenow="${String((this._intensityIntent ?? Number(intensity)) || 0)}"
                    .value=${String((this._intensityIntent ?? Number(intensity)) || 0)}
                    ?disabled=${!intensityOk}
                    @input=${(e: Event) => {
                      this._intensityIntent = Number(
                        (e.target as HTMLInputElement).value,
                      );
                    }}
                    @change=${(e: Event) => {
                      const val = Number((e.target as HTMLInputElement).value);
                      this._intensityIntent = null;
                      this._call("number", "set_value", bundle.intensities, {
                        value: val,
                      });
                    }}
                  />
                </label>
              </div>
            </section>

            <section class="section">
              <div class="section-title">Colour Presets</div>
              <div class="preset-grid">
                ${[
                  { name: "Warm White", rgb: [255, 180, 100] },
                  { name: "Neutral White", rgb: [255, 255, 255] },
                  { name: "Cool White", rgb: [200, 220, 255] },
                  { name: "Red", rgb: [255, 0, 0] },
                  { name: "Amber", rgb: [255, 140, 0] },
                  { name: "Green", rgb: [0, 255, 60] },
                  { name: "Cyan", rgb: [0, 220, 255] },
                  { name: "Blue", rgb: [0, 80, 255] },
                  { name: "Purple", rgb: [180, 0, 255] },
                  { name: "Pink", rgb: [255, 40, 150] },
                ].map(
                  (swatch) => html`
                    <button
                      class="btn-action-pill preset-btn"
                      type="button"
                      aria-label="${swatch.name}"
                      style="--action-glow-color: rgb(${swatch.rgb.join(",")});"
                      @click=${(e: Event) => {
                        e.stopPropagation();
                        this._call("light", "turn_on", bundle.effectLights, {
                          rgb_color: swatch.rgb,
                        });
                      }}
                    >
                      <span
                        style="display:inline-block;width:12px;height:12px;border-radius:50%;background:rgb(${swatch.rgb.join(",")});margin-right:6px;border:1px solid var(--divider-color);flex-shrink:0;"
                      ></span>
                      <span>${swatch.name}</span>
                    </button>
                  `,
                )}
              </div>
            </section>

            <div class="native">
              <button
                class="btn-action-pill action native-colour"
                type="button"
                ?disabled=${!effectOk}
                @click=${() => this.moreInfo(bundle.effectLights[0] || bundle.main)}
              >
                <ha-icon icon="mdi:palette-outline"></ha-icon>
                <span>Colour & white controls</span>
              </button>
            </div>
          </div>
        </div>
      </dialog>
    `;
  }
}

registerCard({
  type: "component-wled-controller-v1",
  element: ComponentWledControllerV1,
  name: "WLED Controller V1",
  description: "Minimal WLED control with advanced settings sheet.",
});
