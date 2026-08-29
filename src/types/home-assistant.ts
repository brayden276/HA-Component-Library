/**
 * Home Assistant TypeScript Definitions
 * Standard interfaces for Lovelace Cards, Home Assistant core, and custom elements.
 */

export interface HomeAssistant {
  states: HassEntities;
  services: HassServices;
  config: HassConfig;
  themes: HassThemes;
  selectedTheme?: string | null;
  language: string;
  locale: HassLocale;
  user: HassUser;
  connection?: HassConnection;
  hassUrl?: (path: string) => string;
  localize: (key: string, ...args: unknown[]) => string;
  callService: (
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
    target?: HassServiceTarget,
  ) => Promise<HassServiceResponse>;
  callApi: <T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    parameters?: Record<string, unknown>,
    headers?: Record<string, string>,
  ) => Promise<T>;
  callWS: <T>(msg: Record<string, unknown>) => Promise<T>;
  sendWS: (msg: Record<string, unknown>) => void;
  formatEntityState?: (stateObj: HassEntity, state?: string) => string;
  formatEntityAttributeValue?: (
    stateObj: HassEntity,
    attribute: string,
    value?: unknown,
  ) => string;
  formatEntityAttributeName?: (
    stateObj: HassEntity,
    attribute: string,
  ) => string;
}

export interface HassConnection {
  sendMessagePromise?<T = unknown>(message: HassWebSocketMessage): Promise<T>;
  subscribeEvents?(
    callback: (event: HassEvent) => void,
    eventType?: string,
  ): Promise<() => void> | (() => void);
}

export interface HassEvent {
  data?: Record<string, unknown>;
  event_type?: string;
  time_fired?: string;
}

export interface HassServiceResponse {
  context?: {
    id: string;
    parent_id?: string | null;
    user_id?: string | null;
  };
  [key: string]: unknown;
}

export type HassWebSocketMessage = Record<string, unknown> & { type: string };

export type {
  AreaRegistryEntry,
  DeviceRegistryEntry,
  EntityRegistryEntry,
  DashboardRegistryEntry,
  DashboardRegistries,
} from "./registry";

export type HassEntities = Record<string, HassEntity>;

export interface HassEntity {
  entity_id: string;
  state: string;
  last_changed: string;
  last_updated: string;
  attributes: HassEntityAttributes;
  context: {
    id: string;
    parent_id?: string | null;
    user_id?: string | null;
  };
}

export interface HassEntityAttributes {
  friendly_name?: string;
  icon?: string;
  entity_picture?: string;
  unit_of_measurement?: string;
  device_class?: string;
  state_class?: string;
  brightness?: number;
  rgb_color?: [number, number, number];
  color_temp?: number;
  temperature?: number;
  current_temperature?: number;
  min_temp?: number;
  max_temp?: number;
  hvac_modes?: string[];
  hvac_action?: string;
  fan_mode?: string;
  fan_modes?: string[];
  preset_mode?: string;
  preset_modes?: string[];
  effect?: string;
  effect_list?: string[];
  options?: string[];
  volume_level?: number;
  is_volume_muted?: boolean;
  media_title?: string;
  media_artist?: string;
  [key: string]: unknown;
}

export interface HassServices {
  [domain: string]: {
    [service: string]: {
      description?: string;
      fields?: Record<string, HassServiceField>;
      target?: HassServiceTargetDescription;
    };
  };
}

export interface HassServiceField {
  description?: string;
  example?: unknown;
  required?: boolean;
  selector?: Record<string, unknown>;
}

export interface HassServiceTargetDescription {
  entity?: Record<string, unknown>;
  device?: Record<string, unknown>;
  area?: Record<string, unknown>;
}

export interface HassConfig {
  latitude: number;
  longitude: number;
  elevation: number;
  unit_system: {
    length: string;
    mass: string;
    temperature: string;
    volume: string;
    pressure: string;
    wind_speed: string;
    accumulated_precipitation: string;
  };
  location_name: string;
  time_zone: string;
  components: string[];
  config_dir: string;
  version: string;
  state: string;
}

export interface HassThemes {
  default_theme: string;
  themes: Record<string, Record<string, string>>;
  darkMode?: boolean;
}

export interface HassLocale {
  language: string;
  number_format: "comma_decimal" | "decimal_comma" | "space_comma" | "none";
  time_format: "12" | "24" | "auto";
  date_format: "year_month_day" | "day_month_year" | "month_day_year";
  first_weekday:
    | "language"
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
}

export interface HassUser {
  id: string;
  name: string;
  is_owner: boolean;
  is_admin: boolean;
}

export interface HassServiceTarget {
  entity_id?: string | string[];
  device_id?: string | string[];
  area_id?: string | string[];
}

/**
 * Lovelace Card Interfaces
 */
export interface LovelaceCardConfig {
  type: string;
  title?: string;
  view_layout?: any;
  layout_options?: LovelaceLayoutOptions;
  grid_options?: LovelaceGridOptions;
  [key: string]: any;
}

export interface LovelaceLayoutOptions {
  grid_columns?: number | "full";
  grid_rows?: number | "auto";
  grid_min_columns?: number;
  grid_max_columns?: number;
  grid_min_rows?: number;
  grid_max_rows?: number;
}

export interface LovelaceGridOptions {
  columns?: number | "full";
  rows?: number | "auto";
  min_columns?: number;
  max_columns?: number;
  min_rows?: number;
  max_rows?: number;
}

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: LovelaceCardConfig): void;
  getCardSize?(): number | Promise<number>;
  getGridOptions?(): LovelaceGridOptions;
}

export interface LovelaceCardEditor extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: LovelaceCardConfig): void;
}

export interface ActionConfig {
  action:
    | "more-info"
    | "toggle"
    | "call-service"
    | "perform-action"
    | "navigate"
    | "url"
    | "assist"
    | "none";
  navigation_path?: string;
  url_path?: string;
  service?: string;
  /** Canonical Home Assistant action field used with `action: perform-action`. */
  perform_action?: string;
  /** Canonical Home Assistant service payload used with `action: perform-action`. */
  data?: Record<string, unknown>;
  service_data?: Record<string, unknown>;
  target?: HassServiceTarget;
  confirmation?: {
    text?: string;
    exemptions?: Array<{ user: string }>;
  };
  haptic?:
    | "light"
    | "medium"
    | "heavy"
    | "selection"
    | "warning"
    | "failure"
    | "success";
}

export interface ActionsConfig {
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}

export interface CustomCardEntry {
  type: string;
  name: string;
  description: string;
  preview?: boolean;
  documentationURL?: string;
}

export interface HaFormSchema {
  name: string;
  label?: string;
  description?: string;
  type?:
    | "string"
    | "number"
    | "boolean"
    | "select"
    | "multi_select"
    | "grid"
    | "expandable";
  default?: unknown;
  required?: boolean;
  options?: Array<[string, string] | { value: unknown; label: string }>;
  selector?: Record<string, unknown>;
  schema?: HaFormSchema[];
}

declare global {
  interface Window {
    customCards?: CustomCardEntry[];
  }
}
