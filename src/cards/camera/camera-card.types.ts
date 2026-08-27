import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface CameraControllerConfig extends LovelaceCardConfig {
  profile?: string;
  expanded?: boolean;
  entity?: string;
  device_id?: string;
  title?: string;
}
