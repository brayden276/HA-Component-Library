import {
  HomeAssistant,
  HassEntity,
  ActionConfig,
  EntityRegistryEntry,
  DeviceRegistryEntry,
} from "../types/home-assistant";
import { fireEvent } from "./navigation";

/**
 * Extracts the domain name from an entity ID (e.g., 'light.living_room' -> 'light')
 */
export function computeDomain(entityId?: string | null): string {
  if (!entityId) return "";
  return entityId.split(".")[0] || "";
}

/**
 * Alias for computeDomain for semantic consistency
 */
export const domainOf = computeDomain;

/**
 * Options for computing a human-friendly display name for an entity
 */
export interface EntityNameOptions {
  entry?: EntityRegistryEntry | null;
  state?: HassEntity | null;
  device?: DeviceRegistryEntry | null;
  fallback?: string;
  stripSuffixes?: RegExp[];
}

/**
 * Resolves a human-friendly display name for an entity following Home Assistant fallback priority:
 * Custom alias / entry name -> entry original name -> state friendly_name -> fallback -> entity_id -> 'Control'
 */
export function computeEntityDisplayName(options: EntityNameOptions): string {
  let name =
    options.entry?.name ||
    options.entry?.original_name ||
    options.state?.attributes?.friendly_name ||
    options.fallback ||
    options.entry?.entity_id ||
    options.state?.entity_id ||
    "Control";

  if (options.stripSuffixes && options.stripSuffixes.length > 0) {
    for (const pattern of options.stripSuffixes) {
      name = name.replace(pattern, "").trim();
    }
  }

  return name;
}

/**
 * Computes a human-friendly display name for an entity
 */
export function computeEntityName(
  entity?: HassEntity | null,
  fallback?: string,
): string {
  if (!entity) return fallback || "";
  return entity.attributes?.friendly_name || fallback || entity.entity_id;
}

/**
 * Checks whether an entity or state string is valid and available (not unavailable or unknown)
 */
export function isEntityAvailable(
  entityOrState?: HassEntity | string | null,
): boolean {
  if (!entityOrState) return false;
  const rawState =
    typeof entityOrState === "string" ? entityOrState : entityOrState.state;
  if (!rawState) return false;
  const lower = rawState.toLowerCase().trim();
  return lower !== "unavailable" && lower !== "unknown" && lower !== "";
}

/**
 * Checks whether an entity or state string is unavailable or unknown
 */
export function isEntityUnavailable(
  entityOrState?: HassEntity | string | null,
): boolean {
  return !isEntityAvailable(entityOrState);
}

/**
 * Formats an entity state into localized or formatted readable string
 */
export function formatEntityState(
  entity?: HassEntity | null,
  hass?: HomeAssistant,
): string {
  if (!entity) return "Unavailable";
  if (hass?.formatEntityState) {
    return hass.formatEntityState(entity);
  }

  const state = entity.state;
  const unit = entity.attributes?.unit_of_measurement;

  if (state === "unavailable") return "Unavailable";
  if (state === "unknown") return "Unknown";
  if (state === "on") return "On";
  if (state === "off") return "Off";

  if (unit) {
    return `${state} ${unit}`;
  }

  return state.charAt(0).toUpperCase() + state.slice(1);
}

/**
 * Checks if an entity is in an active / 'on' state across standard Home Assistant domains
 */
export function isEntityActive(entity?: HassEntity | null): boolean {
  if (!entity) return false;
  const state = entity.state;
  if (state === "unavailable" || state === "unknown" || state === "off") {
    return false;
  }

  const domain = computeDomain(entity.entity_id);

  switch (domain) {
    case "climate":
      return state !== "off";
    case "cover":
      return state === "open" || state === "opening";
    case "lock":
      return state === "unlocked" || state === "unlocking";
    case "media_player":
      return state === "playing" || state === "paused" || state === "buffering" || state === "on";
    case "vacuum":
      return state === "cleaning" || state === "on";
    case "binary_sensor":
      return state === "on";
    default:
      return state === "on" || state === "active" || state === "home" || state === "open";
  }
}

/**
 * Standard default Material Design icons by domain & state
 */
export function getDefaultIconForDomain(
  domain: string,
  state?: string,
): string {
  switch (domain) {
    case "light":
      return state === "on" ? "mdi:lightbulb" : "mdi:lightbulb-outline";
    case "switch":
      return state === "on" ? "mdi:toggle-switch" : "mdi:toggle-switch-off";
    case "binary_sensor":
      return "mdi:radiobox-marked";
    case "sensor":
      return "mdi:gauge";
    case "climate":
      return "mdi:thermostat";
    case "media_player":
      return state === "playing" ? "mdi:play-circle" : "mdi:cast";
    case "cover":
      return state === "open"
        ? "mdi:window-shutter-open"
        : "mdi:window-shutter";
    case "fan":
      return "mdi:fan";
    case "lock":
      return state === "unlocked" ? "mdi:lock-open" : "mdi:lock";
    case "camera":
      return "mdi:cctv";
    case "automation":
      return "mdi:robot";
    case "scene":
      return "mdi:palette";
    case "script":
      return "mdi:script-text";
    case "person":
      return "mdi:account";
    case "weather":
      return "mdi:weather-partly-cloudy";
    default:
      return "mdi:view-dashboard";
  }
}

/**
 * Handles Lovelace card click and trigger actions
 */
export async function handleAction(
  node: HTMLElement,
  hass: HomeAssistant,
  actionConfig?: ActionConfig,
  defaultEntityId?: string,
): Promise<void> {
  if (!hass) return;

  const action = actionConfig?.action || "toggle";

  if (action === "none") return;

  // Trigger haptic feedback if configured or standard
  if (actionConfig?.haptic) {
    fireEvent(node, "haptic", actionConfig.haptic);
  }

  // Confirmation modal check
  if (actionConfig?.confirmation) {
    const text =
      actionConfig.confirmation.text || "Are you sure you want to proceed?";
    if (!window.confirm(text)) {
      return;
    }
  }

  const targetEntity =
    (actionConfig?.target?.entity_id as string) || defaultEntityId;

  switch (action) {
    case "toggle": {
      if (!targetEntity) return;
      const domain = computeDomain(targetEntity);
      const service = domain === "lock" ? "lock" : "toggle";
      await hass.callService(domain, service, undefined, {
        entity_id: targetEntity,
      });
      break;
    }
    case "more-info": {
      if (!targetEntity) return;
      fireEvent(node, "hass-more-info", { entityId: targetEntity });
      break;
    }
    case "call-service": {
      if (!actionConfig?.service) return;
      const [domain, service] = actionConfig.service.split(".");
      if (domain && service) {
        await hass.callService(
          domain,
          service,
          actionConfig.service_data,
          actionConfig.target ||
            (targetEntity ? { entity_id: targetEntity } : undefined),
        );
      }
      break;
    }
    case "navigate": {
      if (actionConfig?.navigation_path) {
        window.history.pushState(null, "", actionConfig.navigation_path);
        fireEvent(window as any, "location-changed", { replace: false });
      }
      break;
    }
    case "url": {
      if (actionConfig?.url_path) {
        window.open(actionConfig.url_path, "_blank");
      }
      break;
    }
    case "assist": {
      fireEvent(node, "start-voice-assist");
      break;
    }
  }
}
