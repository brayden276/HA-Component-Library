import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface ThreeStatCardConfig extends LovelaceCardConfig {
  metric_1_value?: string;
  metric_1_label?: string;
  metric_1_action?: (context: any) => void;
  metric_1_navigation_path?: string | null;
  metric_1_entity?: string | null;
  metric_2_value?: string;
  metric_2_label?: string;
  metric_2_action?: (context: any) => void;
  metric_2_navigation_path?: string | null;
  metric_2_entity?: string | null;
  metric_3_value?: string;
  metric_3_label?: string;
  metric_3_action?: (context: any) => void;
  metric_3_navigation_path?: string | null;
  metric_3_entity?: string | null;
  interactive?: boolean;
}
