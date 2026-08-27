import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface EnergyDashboardConfig extends LovelaceCardConfig {
  profile?: string;
  day_channel?: string;
  weather_entity?: string;
  sun_entity?: string;
}
