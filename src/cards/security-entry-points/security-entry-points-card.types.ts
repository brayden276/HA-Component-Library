import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface SecurityEntryPointsConfig extends LovelaceCardConfig {
  profile?: string;
  title?: string;
  entries?: string[];
  entities?: string[];
}
