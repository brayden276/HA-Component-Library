import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface EnergyHistoryConfig extends LovelaceCardConfig {
  profile?: string | null;
  house_entity?: string;
  solar_entity?: string;
  grid_entity?: string;
  hours?: number;
  bucket_minutes?: number;
  calendar_day?: boolean;
  day_channel?: string | null;
}

export interface HistoryDataPoint {
  t: number;
  v: number;
}
