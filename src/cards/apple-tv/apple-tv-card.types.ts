import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface AppleTvControllerConfig extends LovelaceCardConfig {
  entity?: string;
  title?: string;
  demo?: boolean;
  remote_entity?: string | null;
  keyboard_entity?: string | null;
  keyboard_config_entry_id?: string | null;
  config_entry_id?: string | null;
}
