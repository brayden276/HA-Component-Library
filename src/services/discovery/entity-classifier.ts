import type {
  EntityRegistryEntry,
  HassEntity,
} from "../../types/home-assistant";
import { domainOf } from "../../utils/entity";

/**
 * Clean entity classification engine.
 * Determines whether an entity is a primary control, a sensor metric,
 * or a diagnostic / peripheral entity that should not be exposed as a top-level control.
 */

const DIAGNOSTIC_DEVICE_CLASSES = new Set([
  "battery",
  "signal_strength",
  "connectivity",
  "tamper",
  "update",
  "problem",
  "voltage",
  "current",
  "power_factor",
  "duration",
  "timestamp",
]);

const SENSOR_METRIC_DEVICE_CLASSES = new Set([
  "temperature",
  "humidity",
  "pressure",
  "illuminance",
  "power",
  "energy",
  "energy_storage",
  "apparent_power",
  "reactive_power",
  "carbon_dioxide",
  "carbon_monoxide",
  "nitrogen_dioxide",
  "nitrogen_monoxide",
  "nitrous_oxide",
  "ozone",
  "pm1",
  "pm25",
  "pm10",
  "volatile_organic_compounds",
  "volatile_organic_compounds_parts",
  "water",
  "gas",
  "speed",
  "wind_speed",
  "distance",
  "volume",
  "volume_storage",
  "weight",
]);

const DIAGNOSTIC_NAME_PATTERN =
  /\b(battery|battery_level|battery_low|battery_state|link_?quality|rssi|signal_strength|lqi|voltage|temp(erature)?_offset|humidity_offset|calibration_offset|firmware|firmware_version|ip_address|mac_address|device_temp(erature)?|cpu_temp(erature)?|ping|keep_alive|reporting_interval|uptime|free_heap|wifi_signal|compressor_speed|compressor_frequency|defrost_mode)\b/i;

const PRIMARY_CONTROL_DOMAINS = new Set([
  "light",
  "fan",
  "switch",
  "input_boolean",
  "media_player",
  "climate",
  "cover",
  "lock",
  "vacuum",
  "button",
  "input_button",
  "select",
  "input_select",
  "number",
  "input_number",
]);

/**
 * Returns true if an entity represents an internal hardware diagnostic,
 * battery sensor, connectivity metric, or calibration parameter.
 */
export const isDiagnosticOrPeripheral = (
  entry?: EntityRegistryEntry | null,
  state?: HassEntity | null,
): boolean => {
  if (!entry?.entity_id) return false;

  // 1. Explicit entity category
  if (
    entry.entity_category === "diagnostic" ||
    entry.entity_category === "config"
  ) {
    return true;
  }

  // 2. Diagnostic device class
  const deviceClass = String(
    state?.attributes?.device_class || entry.device_class || "",
  ).toLowerCase();
  if (DIAGNOSTIC_DEVICE_CLASSES.has(deviceClass)) {
    return true;
  }

  // 3. Name or entity ID matching diagnostic telemetry terms
  const identity =
    `${entry.entity_id} ${entry.name || ""} ${entry.original_name || ""} ${state?.attributes?.friendly_name || ""}`.toLowerCase();
  return DIAGNOSTIC_NAME_PATTERN.test(identity);
};

/**
 * Returns true if an entity is an environmental, energy, or weather telemetry metric.
 * These belong in KPI tiles, summary headers, and context strips, not control rows.
 */
export const isSensorMetric = (
  entry?: EntityRegistryEntry | null,
  state?: HassEntity | null,
): boolean => {
  if (!entry?.entity_id) return false;
  const domain = domainOf(entry.entity_id);
  if (domain !== "sensor") return false;

  const deviceClass = String(
    state?.attributes?.device_class || entry.device_class || "",
  ).toLowerCase();
  return (
    SENSOR_METRIC_DEVICE_CLASSES.has(deviceClass) ||
    Boolean(state?.attributes?.unit_of_measurement)
  );
};

/**
 * Returns true if the entity is a valid primary actionable control for household UI.
 */
export const isPrimaryControl = (
  entry: EntityRegistryEntry,
  state?: HassEntity | null,
): boolean => {
  if (!entry?.entity_id || entry.disabled_by || entry.hidden_by) return false;
  if (isDiagnosticOrPeripheral(entry, state)) return false;

  const domain = domainOf(entry.entity_id);
  if (PRIMARY_CONTROL_DOMAINS.has(domain)) return true;

  // Binary sensor only counts as a primary control if it is a garage door state
  if (
    domain === "binary_sensor" &&
    state?.attributes?.device_class === "garage_door"
  ) {
    return true;
  }

  return false;
};

/**
 * Determines whether an entity is currently actively engaged / running.
 */
export const isControlActive = (
  entry: EntityRegistryEntry,
  state?: HassEntity | null,
): boolean => {
  if (!state || isDiagnosticOrPeripheral(entry, state)) return false;

  const domain = domainOf(entry.entity_id);
  const st = String(state.state).toLowerCase();
  const attrs = state.attributes || {};

  if (["light", "fan", "switch", "input_boolean"].includes(domain)) {
    return st === "on";
  }

  if (domain === "media_player") {
    if (["playing", "paused", "buffering", "on"].includes(st)) return true;
    if (st === "idle") {
      const v = String(attrs.media_title || attrs.app_name || "").trim();
      return Boolean(
        v && !/^(idle|home(?: screen)?|default media receiver)$/i.test(v),
      );
    }
    return false;
  }

  if (domain === "climate") {
    return /^(heat|cool|heat_cool|auto|dry|fan_only)$/.test(st);
  }

  if (domain === "cover") {
    return /^(open|opening|closing)$/.test(st);
  }

  if (domain === "lock") {
    return st === "unlocked";
  }

  if (domain === "vacuum") {
    return /^(cleaning|returning)$/.test(st);
  }

  if (domain === "binary_sensor") {
    const deviceClass = String(attrs.device_class || "").toLowerCase();
    return (
      st === "on" &&
      /^(door|window|garage_door|smoke|moisture|gas|motion|occupancy|presence)$/.test(
        deviceClass,
      )
    );
  }

  return false;
};
