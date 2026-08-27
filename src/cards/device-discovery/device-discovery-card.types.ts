import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface DeviceDiscoveryFlow {
  handler: string;
  context?: {
    source?: string;
    title_placeholders?: {
      name?: string;
      device?: string;
      host?: string;
    };
  };
}

export interface DeviceDiscoveryCardConfig extends LovelaceCardConfig {
  demo?: boolean;
  refresh_seconds?: number;
  max_rows?: number;
}
