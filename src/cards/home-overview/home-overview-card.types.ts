import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface HomeOverviewConfig extends LovelaceCardConfig {
  weather_entity?: string;
  base_path?: string;
  current_dashboard?: string;
  favourites_helpers?: string[];
}
