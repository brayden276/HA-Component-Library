import type {
  LovelaceCardConfig,
  ActionConfig,
} from "../../types/home-assistant";

export interface MetricThreshold {
  value: number;
  color: string;
}

export interface HaMetricBadgeConfig extends LovelaceCardConfig {
  entity: string;
  name?: string;
  icon?: string;
  unit?: string;
  thresholds?: MetricThreshold[];
  tap_action?: ActionConfig;
}
