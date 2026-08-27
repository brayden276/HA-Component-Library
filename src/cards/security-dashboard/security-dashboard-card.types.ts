import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface SecurityDashboardConfig extends LovelaceCardConfig {
  profile?: string;
  camera_columns?: number;
  refresh_seconds?: number;
  title?: string;
  cameras?: string[];
  entries?: string[];
}
