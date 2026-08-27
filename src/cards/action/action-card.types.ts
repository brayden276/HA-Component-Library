import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface ActionCardConfig extends LovelaceCardConfig {
  title?: string;
  description?: string;
  action_text?: string;
  icon?: string;
  navigation_path?: string | null;
  entity?: string | null;
  more_info_entity?: string | null;
}
