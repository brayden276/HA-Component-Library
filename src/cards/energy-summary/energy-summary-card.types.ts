import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface EnergySummaryConfig extends LovelaceCardConfig {
  profile?: string;
  day_channel?: string;
  title?: string;
}
