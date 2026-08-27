import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface WledControllerConfig extends LovelaceCardConfig {
  entity: string;
  device_id?: string;
}
