import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface SecurityCameraWallConfig extends LovelaceCardConfig {
  profile?: string;
  columns?: number;
  title?: string;
  refresh_seconds?: number;
  cameras?: string[] | string;
  entities?: string[];
}
