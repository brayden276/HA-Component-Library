import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface HouseholdAttentionConfig extends LovelaceCardConfig {
  title?: string;
  icon?: string;
  max_items?: number;
  demo?: boolean;
}
