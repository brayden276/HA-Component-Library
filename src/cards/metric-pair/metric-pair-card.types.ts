import type { LovelaceCardConfig } from "../../types/home-assistant";

export interface MetricDefinition {
  text?: string;
  format?: string;
  entity?: string;
  entities?: string[];
  terms?: Array<{ entity?: string; factor?: number }>;
  deadband?: number;
  unavailable?: string;
}

export interface MetricPairConfig extends LovelaceCardConfig {
  left_value?: string | MetricDefinition;
  left_label?: string | MetricDefinition;
  right_value?: string | MetricDefinition;
  right_label?: string | MetricDefinition;
  right_primary?: string | MetricDefinition;
  right_secondary?: string | MetricDefinition;
  left_more_info_entity?: string;
  right_more_info_entity?: string;
  deadband?: number;
  day_channel?: string | null;
}
