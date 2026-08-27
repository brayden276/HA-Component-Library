export * from "./energy-dashboard-card.types";
import type { EnergyDashboardConfig } from "./energy-dashboard-card.types";
export * from "./energy-dashboard-card.styles";
import { energyDashboardCardStyles } from "./energy-dashboard-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import type { LovelaceGridOptions } from "../../types/home-assistant";
import { registerCard } from "../../utils/registration";
import "../energy-day-selector/energy-day-selector-card";
import "../energy-summary/energy-summary-card";
import "../solar-daylight/solar-daylight-card";
import "../energy-history/energy-history-card";

const DEFAULTS: EnergyDashboardConfig = {
  type: "custom:component-energy-dashboard-v1",
  profile: "household-energy",
  day_channel: "energy-day",
  weather_entity: "weather.forecast_home",
  sun_entity: "sun.sun",
};

@customElement("component-energy-dashboard-v1")
export class ComponentEnergyDashboardV1 extends LitBaseCard<EnergyDashboardConfig> {
  public static stubConfig = {
    profile: "household-energy",
    day_channel: "energy-day",
  };

  public static override getGridOptions(): LovelaceGridOptions {
    return { columns: 12, rows: "auto" };
  }

  public static override styles: CSSResultGroup = energyDashboardCardStyles;

  public override setConfig(config: EnergyDashboardConfig): void {
    super.setConfig({ ...DEFAULTS, ...config });
  }

  public override getCardSize(): number {
    return 12;
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const profile = this._config.profile || "household-energy";
    const dayChannel = this._config.day_channel || "energy-day";
    const weatherEntity =
      this._config.weather_entity || "weather.forecast_home";
    const sunEntity = this._config.sun_entity || "sun.sun";

    return html`
      <div class="layout">
        <div class="selector">
          <component-energy-day-selector-v1
            .hass=${this.hass}
            .config=${{
              type: "custom:component-energy-day-selector-v1",
              channel: dayChannel,
            }}
          ></component-energy-day-selector-v1>
        </div>
        <div class="summary">
          <component-energy-summary-v1
            .hass=${this.hass}
            .config=${{
              type: "custom:component-energy-summary-v1",
              profile,
              day_channel: dayChannel,
            }}
          ></component-energy-summary-v1>
        </div>
        <div class="context">
          <div class="daylight">
            <solar-daylight-card-v7
              .hass=${this.hass}
              .config=${{
                type: "custom:solar-daylight-card-v7",
                weather_entity: weatherEntity,
                sun_entity: sunEntity,
              }}
            ></solar-daylight-card-v7>
          </div>
        </div>
        <div class="history">
          <energy-history-card-v3
            .hass=${this.hass}
            .config=${{
              type: "custom:energy-history-card-v3",
              profile,
              calendar_day: true,
              day_channel: dayChannel,
              bucket_minutes: 10,
              house_entity: "sensor.ha_component_house_power",
              solar_entity: "sensor.ha_component_solar_power",
              grid_entity: "sensor.ha_component_grid_power",
            }}
          ></energy-history-card-v3>
        </div>
      </div>
    `;
  }
}

registerCard({
  type: "component-energy-dashboard-v1",
  element: ComponentEnergyDashboardV1,
  name: "Energy Dashboard V1",
  description:
    "Single-card Energy composition using shared day state and one backend data contract.",
});
