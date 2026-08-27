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
  interaction,
  InteractionHandle,
  createRequestCoalescer,
  RequestCoalescer,
  waitForEntityState,
} from "../../utils/interaction";
import { registerCard } from "../../utils/registration";

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

  private _unsubRegistry: (() => void) | null = null;
  private _brightnessCoalescer: RequestCoalescer<number> | null = null;
  private _interactionHandles: InteractionHandle[] = [];

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
    centralRegistry.load(this.hass).then((data) => {
      this._registries = data;
      this._bundle = this._resolveBundle();
    });
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    if (!this._unsubRegistry && this.hass) {
      this._unsubRegistry = centralRegistry.subscribe(this.hass, (data) => {
        this._registries = data;
        this._bundle = this._resolveBundle();
      });
    }
  }

  public override disconnectedCallback(): void {
    this._unsubRegistry?.();
    this._unsubRegistry = null;
    this._brightnessCoalescer?.destroy();
    this._brightnessCoalescer = null;
    this._brightnessIntent = null;
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];
    super.disconnectedCallback();
  }

  protected override willUpdate(): void {
    if (!this._unsubRegistry && this.isConnected && this.hass) {
      this._unsubRegistry = centralRegistry.subscribe(this.hass, (data) => {
        this._registries = data;
        this._bundle = this._resolveBundle();
      });
    }
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
    const deviceName =
      dev?.name_by_user ||
      dev?.name ||
      this.hass?.states[main?.entity_id || ""]?.attributes?.friendly_name ||
      "WLED";

    return {
      deviceId: deviceId || undefined,
      deviceName,
      main: main?.entity_id || this._config.entity,
      effectLights: effectRows.map((e) => e.entity_id),
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
    const id = this._bundle?.main;
    const state = id ? this.hass?.states?.[id] : null;
    if (!id || !state || !this.hass) return;
    const wasOn = state.state === "on";
    await this.hass.callService("light", "toggle", { entity_id: id });
    await waitForEntityState(
      this.hass,
      id,
      (value) => value === (wasOn ? "off" : "on"),
      { timeout: 9000 },
    );
  }

  private _getBrightnessCoalescer(): RequestCoalescer<number> {
    if (this._brightnessCoalescer) return this._brightnessCoalescer;
    this._brightnessCoalescer = createRequestCoalescer(
      async (value) => {
        const id = this._bundle?.main;
        if (!id || !this.hass) return;
        if (value <= 0) {
          await this.hass.callService("light", "turn_off", { entity_id: id });
        } else {
          await this.hass.callService("light", "turn_on", {
            entity_id: id,
            brightness: value,
          });
        }
        await waitForEntityState(
          this.hass,
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
    data: Record<string, any> = {},
  ): Promise<void> {
    const targets = [...new Set((ids || []).filter(Boolean))];
    if (!this.hass || !targets.length) return;
    await Promise.all(
      targets.map((entity_id) =>
        this.hass!.callService(domain, service, { entity_id, ...data }),
      ),
    );
  }

  private _openAdvanced(presets = false): void {
    const dialog = this.renderRoot.querySelector(
      "dialog",
    ) as HTMLDialogElement | null;
    if (!dialog || !this._bundle) return;
    const mainSt = this.hass?.states?.[this._bundle.main];
    if (String(mainSt?.state || "unavailable").toLowerCase() !== "on") return;
    if (!dialog.open) {
      dialog.showModal();
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

  protected override updated(): void {
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];

    const powerBtn = this.renderRoot.querySelector(
      ".power",
    ) as HTMLElement | null;
    const identityBtn = this.renderRoot.querySelector(
      ".identity",
    ) as HTMLElement | null;
    const presetsBtn = this.renderRoot.querySelector(
      ".presets",
    ) as HTMLElement | null;
    const colourBtn = this.renderRoot.querySelector(
      ".colour",
    ) as HTMLElement | null;
    const advancedBtn = this.renderRoot.querySelector(
      ".advanced",
    ) as HTMLElement | null;
    const nativeColourBtn = this.renderRoot.querySelector(
      ".native-colour",
    ) as HTMLElement | null;
    const closeBtn = this.renderRoot.querySelector(
      ".close",
    ) as HTMLElement | null;

    if (powerBtn) {
      this._interactionHandles.push(
        interaction(powerBtn, {
          primary: () => this._togglePower(),
          feedback: true,
        }),
      );
    }
    if (identityBtn) {
      this._interactionHandles.push(
        interaction(identityBtn, {
          primary: () => this._openAdvanced(false),
          hold: () => this.moreInfo(this._bundle?.main),
          feedback: true,
        }),
      );
    }
    if (presetsBtn) {
      this._interactionHandles.push(
        interaction(presetsBtn, {
          primary: () => this._openAdvanced(true),
          feedback: true,
        }),
      );
    }
    if (colourBtn) {
      this._interactionHandles.push(
        interaction(colourBtn, {
          primary: () =>
            this.moreInfo(
              this._bundle?.effectLights?.[0] || this._bundle?.main,
            ),
          feedback: true,
        }),
      );
    }
    if (advancedBtn) {
      this._interactionHandles.push(
        interaction(advancedBtn, {
          primary: () => this._openAdvanced(false),
          feedback: true,
        }),
      );
    }
    if (nativeColourBtn) {
      this._interactionHandles.push(
        interaction(nativeColourBtn, {
          primary: () =>
            this.moreInfo(
              this._bundle?.effectLights?.[0] || this._bundle?.main,
            ),
          feedback: true,
        }),
      );
    }
    if (closeBtn) {
      this._interactionHandles.push(
        interaction(closeBtn, {
          primary: () => this._closeDialog(),
          feedback: true,
        }),
      );
    }
  }

  protected override render(): TemplateResult {
    if (!this._config || !this.hass) return html``;
    const bundle = this._bundle || this._resolveBundle();
    if (!bundle)
      return html`<ha-card
        ><div class="head">
          <span class="ico"
            ><ha-icon icon="mdi:led-strip-variant"></ha-icon></span
          ><span class="status">Loading…</span>
        </div></ha-card
      >`;

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
        <div class="head ${on ? "on" : ""}">
          <span class="ico"
            ><ha-icon icon="mdi:led-strip-variant"></ha-icon
          ></span>
          <button class="identity" type="button">
            <span class="name">${this.esc(bundle.deviceName)}</span>
            <span class="status">${this.esc(status)}</span>
          </button>
          <button
            class="power"
            type="button"
            aria-label="Toggle WLED"
            ?disabled=${!controllable}
            aria-pressed="${String(on)}"
          >
            <ha-icon icon="mdi:power"></ha-icon>
          </button>
        </div>
        ${
          on
            ? html`
                <div class="body">
                  <div class="slider-row">
                    <span class="label">Brightness</span>
                    <input
                      class="brightness"
                      type="range"
                      min="0"
                      max="255"
                      step="1"
                      .value=${String(Math.max(0, Math.min(255, Number.isFinite(brightness) ? brightness : 0)))}
                      @input=${(e: Event) => {
                        const v = Number((e.target as HTMLInputElement).value);
                        this._brightnessIntent = v;
                        this._getBrightnessCoalescer().request(v);
                      }}
                    />
                    <output class="brightness-value value"
                      >${this._pct(brightness)}</output
                    >
                  </div>
                  <div class="actions">
                    <button
                      class="action presets"
                      type="button"
                      ?disabled=${!presetOk}
                    >
                      <ha-icon icon="mdi:bookmark-multiple-outline"></ha-icon>
                      <span>Presets</span>
                    </button>
                    <button
                      class="action colour"
                      type="button"
                      ?disabled=${!effectOk}
                    >
                      <ha-icon icon="mdi:palette-outline"></ha-icon>
                      <span>Colour</span>
                    </button>
                    <button
                      class="action advanced"
                      type="button"
                      ?disabled=${!(presetOk || effectOk || paletteOk || speedOk || intensityOk)}
                    >
                      <ha-icon icon="mdi:tune-variant"></ha-icon>
                      <span>Advanced</span>
                    </button>
                  </div>
                </div>
              `
            : ""
        }
      </ha-card>

      <dialog
        role="dialog"
        aria-modal="true"
        aria-label="${this.esc(bundle.deviceName)} settings"
        @click=${(e: MouseEvent) => {
          const dialog = this.renderRoot.querySelector("dialog");
          if (e.target === dialog) dialog?.close();
        }}
      >
        <div class="sheet">
          <div class="sheet-head">
            <ha-icon icon="mdi:led-strip-variant"></ha-icon>
            <span class="sheet-title">
              <div class="sheet-name">${this.esc(bundle.deviceName)}</div>
              <div class="sheet-state">${this.esc(status)}</div>
            </span>
            <button
              class="close"
              type="button"
              aria-label="Close"
              @click=${this._closeDialog}
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
                            class="preset-btn ${isActive ? "active" : ""}"
                            type="button"
                            title="${this.esc(opt)}"
                            @click=${async () => {
                              await this._call(
                                "select",
                                "select_option",
                                bundle.preset ? [bundle.preset] : [],
                                { option: opt },
                              );
                              this._closeDialog();
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
                    class="effect"
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
                    class="palette"
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
                      >${this.esc(speed || "—")}</output
                    >
                  </span>
                  <input
                    class="speed"
                    type="range"
                    min="0"
                    max="255"
                    step="1"
                    .value=${String(Number(speed) || 0)}
                    ?disabled=${!speedOk}
                    @change=${(e: Event) => {
                      const val = Number((e.target as HTMLInputElement).value);
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
                      >${this.esc(intensity || "—")}</output
                    >
                  </span>
                  <input
                    class="intensity"
                    type="range"
                    min="0"
                    max="255"
                    step="1"
                    .value=${String(Number(intensity) || 0)}
                    ?disabled=${!intensityOk}
                    @change=${(e: Event) => {
                      const val = Number((e.target as HTMLInputElement).value);
                      this._call("number", "set_value", bundle.intensities, {
                        value: val,
                      });
                    }}
                  />
                </label>
              </div>
            </section>

            <div class="native">
              <button
                class="action native-colour"
                type="button"
                ?disabled=${!effectOk}
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
