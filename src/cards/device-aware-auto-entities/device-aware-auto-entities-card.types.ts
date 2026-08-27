import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface AutoEntitiesHeader {
  title?: string;
  icon?: string;
}

export interface DeviceAwareAutoEntitiesConfig extends LovelaceCardConfig {
  filter: Record<string, any>;
  header?: AutoEntitiesHeader;
  exclude_invalid_states?: boolean;
  [key: string]: any;
}
