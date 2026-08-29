export * from "./welcome-header-card.types";
import type { WelcomeHeaderConfig } from "./welcome-header-card.types";
export * from "./welcome-header-card.styles";
import { welcomeHeaderCardStyles } from "./welcome-header-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import type { LovelaceGridOptions } from "../../types/home-assistant";
import { localeOf, timeZoneOf, numberFormat } from "../../utils/formatting";
import { createMinuteScheduler } from "../../utils/lifecycle";
import { interaction, InteractionHandle } from "../../utils/interaction";
import { registerCard } from "../../utils/registration";

const DEFAULTS: WelcomeHeaderConfig = {
  type: "custom:component-welcome-header-v1",
  weather_entity: "weather.forecast_home",
};

@customElement("component-welcome-header-v1")
export class ComponentWelcomeHeaderV1 extends LitBaseCard<WelcomeHeaderConfig> {
  private _cancelMinuteScheduler: (() => void) | null = null;
  private _interactionHandle: InteractionHandle | null = null;

  public static override getGridOptions(): LovelaceGridOptions {
    return { columns: 12, rows: "auto" };
  }

  public static override styles: CSSResultGroup = welcomeHeaderCardStyles;

  public override setConfig(config: WelcomeHeaderConfig): void {
    super.setConfig({ ...DEFAULTS, ...config });
    if (!this._config?.weather_entity) {
      throw new Error("weather_entity is required");
    }
  }

  public override getCardSize(): number {
    return 1;
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._cancelMinuteScheduler = createMinuteScheduler(() =>
      this.requestUpdate(),
    );
  }

  public override disconnectedCallback(): void {
    this._cancelMinuteScheduler?.();
    this._cancelMinuteScheduler = null;
    this._interactionHandle?.destroy();
    this._interactionHandle = null;
    super.disconnectedCallback();
  }

  private _number(value: any, digits = 0): string | null {
    const n = Number(value);
    if (!Number.isFinite(n)) return null;
    return numberFormat(this.hass, n, {
      maximumFractionDigits: digits,
      minimumFractionDigits: Number.isInteger(n) ? 0 : Math.min(1, digits),
    });
  }

  protected override updated(): void {
    const btn = this.renderRoot.querySelector(".weather") as HTMLElement | null;
    if (btn) {
      this._interactionHandle?.destroy();
      this._interactionHandle = interaction(btn, {
        primary: () => {
          if (this._config?.weather_entity) {
            this.moreInfo(this._config.weather_entity);
          }
        },
        feedback: true,
      });
    }
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const now = new Date();
    const state =
      this.hass?.states?.[
        this._config.weather_entity || "weather.forecast_home"
      ];
    const attrs = state?.attributes || {};
    const zone = timeZoneOf(this.hass);
    const locale = localeOf(this.hass);

    const temperature = this._number(attrs.temperature, 1);
    const cloud = this._number(attrs.cloud_coverage, 0);

    const temperatureText =
      temperature === null
        ? "—"
        : `${temperature}${attrs.temperature_unit || "°C"}`;
    const cloudText = cloud === null ? "Cloud —" : `Cloud ${cloud}%`;
    const time = new Intl.DateTimeFormat(locale, {
      hour: "numeric",
      minute: "2-digit",
      timeZone: zone,
    }).format(now);

    const ariaLabel = `Outside ${temperatureText}, ${cloudText}. Open weather details.`;

    return html`
      <ha-card class="surface-card">
        <div class="control-item-row">
          <span class="copy-block">
            <span class="kpi-metric-md time">${time}</span>
          </span>
          <button
            class="btn-compact-pill weather"
            type="button"
            aria-label="${this.esc(ariaLabel)}"
          >
            ${temperatureText} · ${cloudText}
          </button>
        </div>
      </ha-card>
    `;
  }
}

registerCard({
  type: "component-welcome-header-v1",
  element: ComponentWelcomeHeaderV1,
  name: "Welcome Header",
  description: "Compact live weather and home-time header.",
});
