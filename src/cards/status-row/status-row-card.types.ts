import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface StatusRowCardConfig extends LovelaceCardConfig {
  title?: string;
  description?: string;
  status_value?: string;
  status_label?: string;
  icon?: string;
  interactive?: boolean;
  entity?: string | null;
  navigation_path?: string | null;
}
