import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface ContextStripCardConfig extends LovelaceCardConfig {
  left_text?: string;
  center_1_label?: string;
  center_1_value?: string;
  center_2_label?: string;
  center_2_value?: string;
  center_3_label?: string;
  center_3_value?: string;
  right_text?: string;
  navigation_path?: string | null;
  entity?: string | null;
}
