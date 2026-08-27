import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface HistoryGraphConfig extends LovelaceCardConfig {
  meta_text?: string;
  series_1_label?: string;
  series_2_label?: string;
  series_3_label?: string;
  positive_label?: string;
  negative_label?: string;
}
