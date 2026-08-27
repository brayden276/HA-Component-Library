import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface SolarDaylightCardConfig extends LovelaceCardConfig {
  weather_entity?: string;
  sun_entity?: string;
}
