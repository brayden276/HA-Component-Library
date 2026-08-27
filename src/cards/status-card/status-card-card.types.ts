import type {
  LovelaceCardConfig,
  ActionConfig,
} from "../../types/home-assistant";

export interface HaStatusCardConfig extends LovelaceCardConfig {
  entity: string;
  name?: string;
  icon?: string;
  secondary_info?: "last-changed" | "state" | "entity-id" | "none";
  show_toggle?: boolean;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
}
