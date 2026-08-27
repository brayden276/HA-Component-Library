import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface MediaRowCardConfig extends LovelaceCardConfig {
  icon?: string;
  title?: string;
  state?: string;
  entity?: string | null;
}
