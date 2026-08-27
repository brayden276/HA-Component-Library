import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface ControlRowCardConfig extends LovelaceCardConfig {
  icon?: string;
  title?: string;
  state?: string;
  mode?: "slider" | "switch" | "state" | "action";
  value?: number;
  entity?: string | null;
  on?: boolean;
  slider_service?: {
    domain: string;
    service: string;
    data_key?: string;
    data?: Record<string, any>;
  };
  service?: string;
  service_data?: Record<string, any>;
}
