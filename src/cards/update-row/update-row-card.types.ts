import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface UpdateRowCardConfig extends LovelaceCardConfig {
  icon?: string;
  title?: string;
  name?: string;
  current?: string;
  available?: string;
  action?: string;
  confirm?: boolean;
  entity?: string | null;
}
