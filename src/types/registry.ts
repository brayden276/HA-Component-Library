/**
 * Home Assistant Entity, Device, Area, and Dashboard Registry Typings
 */

export interface AreaRegistryEntry {
  area_id: string;
  name: string;
  picture?: string | null;
  icon?: string | null;
  floor_id?: string | null;
  aliases?: string[];
  labels?: string[];
  [key: string]: any;
}

export interface DeviceRegistryEntry {
  id: string;
  area_id?: string | null;
  name?: string | null;
  name_by_user?: string | null;
  model?: string | null;
  manufacturer?: string | null;
  sw_version?: string | null;
  hw_version?: string | null;
  serial_number?: string | null;
  via_device_id?: string | null;
  disabled_by?: string | null;
  entry_type?: string | null;
  configuration_url?: string | null;
  identifiers?: Array<[string, string]>;
  connections?: Array<[string, string]>;
  [key: string]: any;
}

export interface EntityRegistryEntry {
  entity_id: string;
  name?: string | null;
  original_name?: string | null;
  platform?: string | null;
  device_id?: string | null;
  area_id?: string | null;
  disabled_by?: string | null;
  hidden_by?: string | null;
  entity_category?: "config" | "diagnostic" | null;
  icon?: string | null;
  original_icon?: string | null;
  unique_id?: string;
  translation_key?: string | null;
  device_class?: string | null;
  labels?: string[];
  [key: string]: any;
}

export interface DashboardRegistryEntry {
  id: string;
  url_path: string;
  title: string;
  icon?: string | null;
  show_in_sidebar?: boolean;
  require_admin?: boolean;
  mode?: "storage" | "yaml";
}

export interface DashboardRegistries {
  areas: AreaRegistryEntry[];
  devices: DeviceRegistryEntry[];
  entities: EntityRegistryEntry[];
  dashboards: DashboardRegistryEntry[];
  deviceArea: Map<string, string | null>;
  byDevice: Map<string, EntityRegistryEntry[]>;
  areaMap: Map<string, AreaRegistryEntry>;
  error?: {
    code: string;
    message: string;
  } | null;
}
