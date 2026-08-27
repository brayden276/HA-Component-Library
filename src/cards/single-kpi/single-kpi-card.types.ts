import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface SingleKpiCardConfig extends LovelaceCardConfig {
  value?: string;
  label?: string;
  support_value?: string;
  support_label?: string;
  interactive?: boolean;
  entity?: string | null;
  navigation_path?: string | null;
}
