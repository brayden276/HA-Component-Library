import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface SplitProfileEntity {
  entity: string;
  name?: string;
}

export interface SplitControllerConfig extends LovelaceCardConfig {
  entity: string;
  title?: string;
  vertical_vane_entity?: string;
  vertical_vane?: string;
  horizontal_vane_entity?: string;
  horizontal_vane?: string;
  timer_entity?: string;
  settings_entities?: Array<string | SplitProfileEntity>;
  profile_entities?: Array<string | SplitProfileEntity>;
}
