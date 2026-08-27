import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface RoomSheetRow {
  section?: string;
  icon?: string;
  name?: string;
  state?: string;
  value?: string;
  aria_label?: string;
  navigation_path?: string | null;
  service?: string | null;
  service_data?: Record<string, any>;
  entity?: string | null;
}

export interface RoomSheetCardConfig extends LovelaceCardConfig {
  icon?: string;
  title?: string;
  rows?: RoomSheetRow[] | null;
}
