import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface GarageDoorControllerConfig extends LovelaceCardConfig {
  entity: string;
  /** Optional for legacy/state-only cards; actions stay disabled until configured. */
  control_entity?: string | null;
  availability_entity?: string;
  title?: string;
  confirmation_timeout?: number;
  confirm_timeout?: number;
}
