import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface GarageDoorControllerConfig extends LovelaceCardConfig {
  entity: string;
  control_entity: string;
  availability_entity?: string;
  title?: string;
  confirmation_timeout?: number;
  confirm_timeout?: number;
}
