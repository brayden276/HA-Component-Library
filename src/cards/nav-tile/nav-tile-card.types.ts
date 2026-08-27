import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface NavigationTileCardConfig extends LovelaceCardConfig {
  icon?: string;
  title?: string;
  context?: string;
  navigation_path?: string | null;
}
