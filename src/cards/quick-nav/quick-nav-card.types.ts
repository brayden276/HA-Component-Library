import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface QuickNavigationCardConfig extends LovelaceCardConfig {
  left_icon?: string;
  left_text?: string;
  left_entity?: string | null;
  action_1_icon?: string;
  action_1_text?: string;
  action_1_path?: string | null;
  action_2_icon?: string;
  action_2_text?: string;
  action_2_path?: string | null;
}
