import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface EmptyStateCardConfig extends LovelaceCardConfig {
  icon?: string;
  title?: string;
  message?: string;
}
