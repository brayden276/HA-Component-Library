import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface UpdateSummaryCardConfig extends LovelaceCardConfig {
  count?: string;
  title?: string;
  message?: string;
  live_updates?: boolean;
  update_all?: boolean;
  confirm?: boolean;
  entities?: string[];
}
