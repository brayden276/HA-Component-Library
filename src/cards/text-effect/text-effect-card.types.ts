import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface TextEffectCardConfig extends LovelaceCardConfig {
  text: string;
  effect?: "stamp" | "typewave" | "overprint" | "signal" | "rainbow_stamp";
  description?: string;
  icon?: string | null;
  speed?: number;
}
