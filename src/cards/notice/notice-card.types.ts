import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface NoticeCardConfig extends LovelaceCardConfig {
  title?: string;
  message?: string;
  tone?: "info" | "warning" | "error" | "success";
  icon?: string;
  entity?: string | null;
  navigation_path?: string | null;
}
