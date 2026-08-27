import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface RoomNavigationCardConfig extends LovelaceCardConfig {
  name?: string;
  icon?: string;
  area: string;
  navigation_path: string;
  demo_presence?: boolean;
  presence_entity?: string;
  presence_colour_key?: string;
}
