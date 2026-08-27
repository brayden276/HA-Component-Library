import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface HouseholdDirectoryConfig extends LovelaceCardConfig {
  pref_key?: string;
  base_path?: string;
  current_dashboard?: string;
  title?: string;
  icon?: string;
  quick_action_label?: string;
}
