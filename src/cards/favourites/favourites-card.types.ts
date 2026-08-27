import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface FavouriteRef {
  v: number;
  d: string;
  p: string;
  u: string;
  n?: string;
}

export interface FavouritesConfig extends LovelaceCardConfig {
  title?: string;
  max?: number;
  show_header?: boolean;
  helpers?: string[];
  items?: Array<{ icon?: string; title?: string; state?: string }>;
  preference_key?: string | null;
}
