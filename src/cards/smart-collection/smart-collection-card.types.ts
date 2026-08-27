import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface SmartCollectionConfig extends LovelaceCardConfig {
  mode?: "all" | "active" | "area" | "media" | "sound";
  title?: string;
  icon?: string;
  pref_key?: string | null;
  show_header?: boolean;
  header_style?: "title" | "separator";
  editable?: boolean;
  area_id?: string;
  exclude_device_names?: string[];
}
