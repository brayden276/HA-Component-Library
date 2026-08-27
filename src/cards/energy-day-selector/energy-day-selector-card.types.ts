import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface EnergyDaySelectorConfig extends LovelaceCardConfig {
  channel?: string;
  title?: string;
}
