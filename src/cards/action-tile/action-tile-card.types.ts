import type {
  LovelaceCardConfig,
  ActionConfig,
} from "../../types/home-assistant";

export interface HaActionTileConfig extends LovelaceCardConfig {
  entity: string;
  name?: string;
  icon?: string;
  color?: string;
  badge_entity?: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
}
