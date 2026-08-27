import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface RoomDirectoryConfig extends LovelaceCardConfig {
  title?: string;
  icon?: string;
  mode?: "home" | "full";
  pref_key?: string;
  navigation_path?: string | null;
  base_path?: string;
}
