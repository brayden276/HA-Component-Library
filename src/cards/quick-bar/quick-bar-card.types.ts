import type {
  LovelaceCardConfig,
  ActionConfig,
} from "../../types/home-assistant";

export interface QuickBarEntityConfig {
  entity: string;
  name?: string;
  icon?: string;
  tap_action?: ActionConfig;
}

export interface HaQuickBarConfig extends LovelaceCardConfig {
  title?: string;
  entities: Array<string | QuickBarEntityConfig>;
  show_active_count?: boolean;
}
