export * from "./solar-daylight-card.types";
import type { SolarDaylightCardConfig } from "./solar-daylight-card.types";
export * from "./solar-daylight-card.styles";
import { solarDaylightCardStyles } from "./solar-daylight-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import { formatTime } from "../../utils/formatting";
import { interaction, InteractionHandle } from "../../utils/interaction";
import { registerCard } from "../../utils/registration";

const DEFAULTS: SolarDaylightCardConfig = {
  type: "custom:solar-daylight-card-v7",
  weather_entity: "weather.forecast_home",
  sun_entity: "sun.sun",
};

@customElement("solar-daylight-card-v7")
export class SolarDaylightCardV7 extends LitBaseCard<SolarDaylightCardConfig> {
  @state()
  private _forecast: any[] = [];

  private _lastFetch = 0;
  private _pending = false;
  private _failures = 0;
  private _retryAt = 0;
  private _interactionHandle: InteractionHandle | null = null;

  public static override styles: CSSResultGroup = solarDaylightCardStyles;

  public override setConfig(config: SolarDaylightCardConfig): void {
    const wasWeather = this._config?.weather_entity;
    super.setConfig({ ...DEFAULTS, ...config });
    if (this._config?.weather_entity !== wasWeather) {
      this._forecast = [];
      this._lastFetch = 0;
    }
    this._fetchForecast();
  }

  public override getCardSize(): number {
    return 1;
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._fetchForecast();
  }

  public override disconnectedCallback(): void {
    this._interactionHandle?.destroy();
    this._interactionHandle = null;
    super.disconnectedCallback();
  }

  private _num(v: any, fallback: number | null = null): number | null {
    if (v === null || v === undefined || v === "") return fallback;
    const n = Number(v);
    return Number.isFinite(n) ? n : fallback;
  }

  private _time(v: any): string {
    if (!v) return "";
    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? "" : formatTime(this.hass, d);
  }

  private _cloud(v: any): string {
    const n = this._num(v);
    return n === null ? "—" : `${Math.round(Math.min(100, Math.max(0, n)))}%`;
  }

  private _at(hours: number): number | null {
    if (!this._forecast.length) return null;
    const target = Date.now() + hours * 3600000;
    let best: number | null = null;
    let dist = Infinity;
    for (const x of this._forecast) {
      const t = new Date(x.datetime || 0).getTime();
      const v = this._num(x.cloud_coverage);
      if (!Number.isFinite(t) || v === null) continue;
      const d = Math.abs(t - target);
      if (d < dist) {
        dist = d;
        best = v;
      }
    }
    return dist <= 90 * 60000 ? best : null;
  }

  private _forecastPayload(r: any) {
    const w = this._config?.weather_entity || "weather.forecast_home";
    return (
      r?.response?.[w] ||
      r?.service_response?.[w] ||
      r?.[w] ||
      r?.response?.service_response?.[w] ||
      null
    );
  }

  private async _fetchForecast(): Promise<void> {
    if (!this.hass || this._pending) return;
    const now = Date.now();
    if (
      now < (this._retryAt || 0) ||
      (this._lastFetch && now - this._lastFetch < 30 * 60 * 1000)
    ) {
      return;
    }
    this._pending = true;
    const weather = this._config?.weather_entity || "weather.forecast_home";
    try {
      const r = await this.hass.callWS<any>({
        type: "call_service",
        domain: "weather",
        service: "get_forecasts",
        service_data: { type: "hourly" },
        target: { entity_id: weather },
        return_response: true,
      });
      const x = this._forecastPayload(r);
      if (
        weather === (this._config?.weather_entity || "weather.forecast_home")
      ) {
        this._forecast = Array.isArray(x?.forecast)
          ? x.forecast.slice(0, 24)
          : [];
        this._lastFetch = Date.now();
        this._failures = 0;
        this._retryAt = 0;
      }
    } catch {
      if (
        weather === (this._config?.weather_entity || "weather.forecast_home")
      ) {
        this._failures = (this._failures || 0) + 1;
        this._retryAt =
          Date.now() +
          Math.min(5 * 60 * 1000, 15000 * 2 ** (this._failures - 1));
      }
    } finally {
      this._pending = false;
    }
  }

  protected override updated(): void {
    const btn = this.renderRoot.querySelector("button") as HTMLElement | null;
    if (btn) {
      this._interactionHandle?.destroy();
      this._interactionHandle = interaction(btn, {
        primary: () => this.moreInfo(this._config?.sun_entity || "sun.sun"),
        hold: () =>
          this.moreInfo(
            this._config?.weather_entity || "weather.forecast_home",
          ),
        optimistic: false,
        repeat: false,
        feedback: true,
      });
    }
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const sunEntity = this._config.sun_entity || "sun.sun";
    const weatherEntity =
      this._config.weather_entity || "weather.forecast_home";

    const s = this.hass?.states[sunEntity];
    const w = this.hass?.states[weatherEntity];
    const valid = Boolean(
      s && ["above_horizon", "below_horizon"].includes(s.state),
    );

    let phase = "Sun state unavailable";
    let event = "";

    if (valid) {
      if (s?.state === "above_horizon") {
        const elevation = this._num(s.attributes?.elevation, 0);
        const sunset = this._time(s.attributes?.next_setting);
        phase = `Sun ${Math.round(elevation || 0)}°`;
        event = sunset ? `Sunset ${sunset}` : "Daylight";
      } else {
        const sunrise = this._time(s?.attributes?.next_rising);
        phase = "Night";
        event = sunrise ? `Sunrise ${sunrise}` : "Before sunrise";
      }
    }

    const nowVal = this._num(w?.attributes?.cloud_coverage);
    const c4 = this._at(4);
    const c8 = this._at(8);

    const nowText = this._cloud(nowVal);
    const plus4Text = this._cloud(c4);
    const plus8Text = this._cloud(c8);

    const ariaLabel = `${phase}, cloud coverage ${nowText}, plus 4 hours ${plus4Text}, plus 8 hours ${plus8Text}, ${event}. Tap for sun details; hold for weather details.`;

    return html`
      <ha-card>
        <button type="button" aria-label="${this.esc(ariaLabel)}">
          <span class="phase">${this.esc(phase)}</span>
          <span class="clouds">
            <span class="cloud-item">
              <span class="cloud-label">Cloud Coverage</span>
              <span class="cloud-value now">${this.esc(nowText)}</span>
            </span>
            <span class="cloud-item">
              <span class="cloud-label">+4 Hours</span>
              <span class="cloud-value plus4">${this.esc(plus4Text)}</span>
            </span>
            <span class="cloud-item">
              <span class="cloud-label">+8 Hours</span>
              <span class="cloud-value plus8">${this.esc(plus8Text)}</span>
            </span>
          </span>
          <span class="event">${this.esc(event)}</span>
        </button>
      </ha-card>
    `;
  }
}

registerCard({
  type: "solar-daylight-card-v7",
  element: SolarDaylightCardV7,
  name: "Solar Daylight Context",
  description:
    "Full-width sun context with centred current and forecast cloud coverage.",
});
