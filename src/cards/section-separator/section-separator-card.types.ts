import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface SectionSeparatorCardConfig extends LovelaceCardConfig {
  icon?: string;
  title?: string;
  label?: string;
  text?: string;
}
