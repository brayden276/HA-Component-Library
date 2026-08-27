import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface WelcomeHeaderConfig extends LovelaceCardConfig {
  weather_entity?: string;
}
