export * from "./home-overview-card.types";
import type { HomeOverviewConfig } from "./home-overview-card.types";
export * from "./home-overview-card.styles";
import { homeOverviewCardStyles } from "./home-overview-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import type { LovelaceGridOptions } from "../../types/home-assistant";
import { interaction, InteractionHandle } from "../../utils/interaction";
import { createMinuteScheduler } from "../../utils/lifecycle";
import { localeOf, timeZoneOf, numberFormat } from "../../utils/formatting";
import { registerCard } from "../../utils/registration";
import "../welcome-header/welcome-header-card";
import "../favourites/favourites-card";
import "../smart-collection/smart-collection-card";
import "../household-directory/household-directory-card";
import "../room-directory/room-directory-card";

const DEFAULTS: HomeOverviewConfig = {
  type: "custom:component-home-overview-v4",
  weather_entity: "weather.forecast_home",
  base_path: "/home-control",
  current_dashboard: "home-control",
  favourites_helpers: [],
};

@customElement("component-home-overview-v4")
export class ComponentHomeOverviewV4 extends LitBaseCard<HomeOverviewConfig> {
  private _weatherInteraction: InteractionHandle | null = null;
  private _cancelMinuteScheduler: (() => void) | null = null;

  public static override getGridOptions(): LovelaceGridOptions {
    return { columns: 12, rows: "auto" };
  }

  public static override styles: CSSResultGroup = homeOverviewCardStyles;

  public override setConfig(config: HomeOverviewConfig): void {
    super.setConfig({
      ...DEFAULTS,
      ...config,
      favourites_helpers: [],
    });
  }

  public override getCardSize(): number {
    return 12;
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._cancelMinuteScheduler = createMinuteScheduler(() => this.requestUpdate());
  }

  public override disconnectedCallback(): void {
    this._cancelMinuteScheduler?.();
    this._cancelMinuteScheduler = null;
    this._weatherInteraction?.destroy();
    this._weatherInteraction = null;
    super.disconnectedCallback();
  }

  protected override updated(): void {
    const btn = this.renderRoot.querySelector(".weather") as HTMLElement | null;
    if (btn) {
      this._weatherInteraction?.destroy();
      this._weatherInteraction = interaction(btn, {
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
    const zone = timeZoneOf(this.hass);
    const locale = localeOf(this.hass);
    const time = new Intl.DateTimeFormat(locale, {
      hour: "numeric",
      minute: "2-digit",
      timeZone: zone,
    }).format(now);

    const state =
      this.hass?.states?.[
        this._config.weather_entity || "weather.forecast_home"
      ];
    const attrs = state?.attributes || {};
    const tempNum = Number(attrs.temperature);
    const tempStr = Number.isFinite(tempNum)
      ? `${numberFormat(this.hass, tempNum, { maximumFractionDigits: 1 })}${attrs.temperature_unit || "°C"}`
      : "—";
    const cloudNum = Number(attrs.cloud_coverage);
    const cloudStr = Number.isFinite(cloudNum)
      ? `Cloud ${Math.round(cloudNum)}%`
      : "Cloud —";
    const weatherText = `${tempStr} · ${cloudStr}`;
    const weatherAriaLabel = `Outside ${tempStr}, ${cloudStr}. Open weather details.`;

    const basePath = this._config.base_path || "/home-control";
    const currentDashboard = this._config.current_dashboard || "home-control";

    return html`
      <ha-card>
        <div class="top">
          <span class="time">${time}</span>
          <button
            class="weather"
            type="button"
            aria-label="${this.esc(weatherAriaLabel)}"
          >
            ${weatherText}
          </button>
        </div>

        <div class="sections">
          <component-favourites-minimal-v1
            .hass=${this.hass}
            .config=${{
              type: "custom:component-favourites-minimal-v1",
              helpers: this._config.favourites_helpers || [],
              max: 4,
              title: "Favourites",
            }}
          ></component-favourites-minimal-v1>

          <component-smart-collection-v3
            .hass=${this.hass}
            .config=${{
              type: "custom:component-smart-collection-v3",
              mode: "active",
              title: "Active now",
              icon: "mdi:motion-play-outline",
              editable: false,
              pref_key: null,
            }}
          ></component-smart-collection-v3>

          <component-household-directory-v3
            .hass=${this.hass}
            .config=${{
              type: "custom:component-household-directory-v3",
              title: "Quick actions",
              icon: "mdi:gesture-tap-button",
              quick_action_label: "dashboard_quick_action",
              pref_key: "home-control.household.v2",
              base_path: basePath,
              current_dashboard: currentDashboard,
            }}
          ></component-household-directory-v3>

          <component-room-directory-v4
            .hass=${this.hass}
            .config=${{
              type: "custom:component-room-directory-v4",
              mode: "home",
              title: "Rooms",
              icon: "mdi:floor-plan",
              pref_key: "home-control.rooms.v2",
              base_path: basePath,
              navigation_path: `${basePath}/rooms`,
            }}
          ></component-room-directory-v4>
        </div>
      </ha-card>
    `;
  }
}

@customElement("component-home-overview-v5")
export class ComponentHomeOverviewV5 extends ComponentHomeOverviewV4 {}

registerCard({
  type: "component-home-overview-v4",
  element: ComponentHomeOverviewV4,
  name: "Home Overview V4",
  description: "Stable minimal Home overview without state-refresh teardown.",
});

registerCard({
  type: "component-home-overview-v5",
  element: ComponentHomeOverviewV5,
  name: "Home Overview V5",
  description:
    "Stable minimal Home overview without state-refresh teardown (v5 alias).",
});
