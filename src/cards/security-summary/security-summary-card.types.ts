import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface SecuritySummaryConfig extends LovelaceCardConfig {
  profile?: string;
  title?: string;
}
