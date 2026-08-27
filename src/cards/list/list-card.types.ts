import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface ListCardRow {
  title?: string;
  description?: string;
  value?: string;
  label?: string;
  action?: (context: any) => void;
  navigation_path?: string | null;
  path?: string | null;
  entity?: string | null;
  more_info_entity?: string | null;
}

export interface ListCardConfig extends LovelaceCardConfig {
  rows?: ListCardRow[];
  interactive?: boolean;
}
