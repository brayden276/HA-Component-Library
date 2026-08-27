import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface ProgressCardConfig extends LovelaceCardConfig {
  value?: string;
  label?: string;
  progress?: number;
  target_value?: string;
  target_label?: string;
  entity?: string | null;
  navigation_path?: string | null;
}
