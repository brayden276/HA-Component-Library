import {
  HomeAssistant,
  HassEntity,
  ActionConfig,
  HassServiceTarget,
  EntityRegistryEntry,
  DeviceRegistryEntry,
} from "../types/home-assistant";
import { fireEvent } from "./navigation";

export type HomeAssistantActionErrorCode =
  | "INVALID_ACTION"
  | "INVALID_SERVICE"
  | "INVALID_TARGET"
  | "MISSING_TARGET_ENTITY"
  | "UNAVAILABLE_TARGET_ENTITY";

/** An actionable configuration or state error raised before a HA service call. */
export class HomeAssistantActionError extends Error {
  public readonly code: HomeAssistantActionErrorCode;

  public constructor(code: HomeAssistantActionErrorCode, message: string) {
    super(message);
    this.name = "HomeAssistantActionError";
    this.code = code;
  }
}

export interface ServiceAction {
  domain: string;
  service: string;
  data?: Record<string, unknown>;
  target?: HassServiceTarget;
}

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

const entityIdPattern = /^[a-z_][a-z0-9_]*\.[a-zA-Z0-9_]+$/;

const entityIdsFromTarget = (target?: HassServiceTarget): string[] => {
  if (!target?.entity_id) return [];
  return Array.isArray(target.entity_id) ? target.entity_id : [target.entity_id];
};

const hasTarget = (target?: HassServiceTarget): boolean =>
  Boolean(
    target &&
      (entityIdsFromTarget(target).length > 0 ||
        (Array.isArray(target.device_id)
          ? target.device_id.length > 0
          : target.device_id) ||
        (Array.isArray(target.area_id) ? target.area_id.length > 0 : target.area_id)),
  );

const validateTargetIds = (value: unknown, field: string): void => {
  if (value === undefined) return;
  const values = Array.isArray(value) ? value : [value];
  if (values.length === 0 || values.some((id) => typeof id !== "string" || !id.trim())) {
    throw new HomeAssistantActionError(
      "INVALID_TARGET",
      `Service target ${field} must be a non-empty string or array of strings.`,
    );
  }
};

const validateTarget = (
  hass: HomeAssistant,
  target?: HassServiceTarget,
): HassServiceTarget | undefined => {
  if (!target) return undefined;
  if (!hasTarget(target)) {
    throw new HomeAssistantActionError(
      "INVALID_TARGET",
      "Service target must contain an entity_id, device_id, or area_id.",
    );
  }

  validateTargetIds(target.entity_id, "entity_id");
  validateTargetIds(target.device_id, "device_id");
  validateTargetIds(target.area_id, "area_id");

  const entityIds = entityIdsFromTarget(target);
  for (const entityId of entityIds) {
    if (!entityIdPattern.test(entityId)) {
      throw new HomeAssistantActionError(
        "INVALID_TARGET",
        `Invalid Home Assistant entity target: ${entityId}.`,
      );
    }
    const entity = hass.states[entityId];
    if (!entity) {
      throw new HomeAssistantActionError(
        "MISSING_TARGET_ENTITY",
        `Home Assistant entity target does not exist: ${entityId}.`,
      );
    }
    if (!isEntityAvailable(entity)) {
      throw new HomeAssistantActionError(
        "UNAVAILABLE_TARGET_ENTITY",
        `Home Assistant entity target is unavailable: ${entityId}.`,
      );
    }
  }

  return target;
};

const parseService = (value?: string): { domain: string; service: string } => {
  const [domain, service, extra] = value?.split(".") ?? [];
  if (
    !domain ||
    !service ||
    extra !== undefined ||
    !/^[a-z_][a-z0-9_]*$/.test(domain) ||
    !/^[a-z_][a-z0-9_]*$/.test(service)
  ) {
    throw new HomeAssistantActionError(
      "INVALID_SERVICE",
      `Invalid Home Assistant service: ${value || "(missing)"}.`,
    );
  }
  return { domain, service };
};

const dataAndLegacyTarget = (
  data?: Record<string, unknown>,
): { data?: Record<string, unknown>; target?: HassServiceTarget } => {
  if (!data) return {};
  const { entity_id: legacyEntityId, ...serviceData } = data;
  return {
    data: Object.keys(serviceData).length > 0 ? serviceData : undefined,
    target:
      typeof legacyEntityId === "string" ||
      (Array.isArray(legacyEntityId) &&
        legacyEntityId.every((id) => typeof id === "string"))
        ? { entity_id: legacyEntityId as string | string[] }
        : legacyEntityId === undefined
          ? undefined
          : (() => {
              throw new HomeAssistantActionError(
                "INVALID_TARGET",
                "service data entity_id must be a string or array of strings.",
              );
            })(),
  };
};

/**
 * Runs an HA service through its typed boundary. Entity targets are validated
 * against the current state map and always passed as `callService` argument 4.
 */
export const runServiceAction = async (
  hass: HomeAssistant,
  action: ServiceAction,
): Promise<void> => {
  const { domain, service } = parseService(`${action.domain}.${action.service}`);
  const normalized = dataAndLegacyTarget(action.data);
  const target = validateTarget(hass, action.target ?? normalized.target);
  await hass.callService(domain, service, normalized.data, target);
};

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
  if (!hass) {
    throw new HomeAssistantActionError(
      "INVALID_ACTION",
      "Home Assistant is required to run an action.",
    );
  }

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

  const targetEntityIds = entityIdsFromTarget(actionConfig?.target);
  const targetEntity = targetEntityIds[0] || defaultEntityId;
  const target = actionConfig?.target ||
    (targetEntity ? { entity_id: targetEntity } : undefined);

  switch (action) {
    case "toggle": {
      if (!targetEntity) {
        throw new HomeAssistantActionError(
          "MISSING_TARGET_ENTITY",
          "Toggle actions require an entity target.",
        );
      }
      const domain = computeDomain(targetEntity);
      const entity = hass.states[targetEntity];
      if (!entity) {
        throw new HomeAssistantActionError(
          "MISSING_TARGET_ENTITY",
          `Home Assistant entity target does not exist: ${targetEntity}.`,
        );
      }
      const service =
        domain === "lock"
          ? entity.state === "locked" || entity.state === "locking"
            ? "unlock"
            : "lock"
          : "toggle";
      await runServiceAction(hass, {
        domain,
        service,
        target,
      });
      break;
    }
    case "more-info": {
      if (!targetEntity) {
        throw new HomeAssistantActionError(
          "MISSING_TARGET_ENTITY",
          "More-info actions require an entity target.",
        );
      }
      validateTarget(hass, { entity_id: targetEntity });
      fireEvent(node, "hass-more-info", { entityId: targetEntity });
      break;
    }
    case "call-service":
    case "perform-action": {
      const serviceName =
        action === "perform-action"
          ? actionConfig?.perform_action
          : actionConfig?.service;
      const service = parseService(serviceName);
      await runServiceAction(hass, {
        ...service,
        data:
          action === "perform-action"
            ? actionConfig?.data
            : actionConfig?.service_data,
        target,
      });
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
    default:
      throw new HomeAssistantActionError(
        "INVALID_ACTION",
        `Unsupported Home Assistant action: ${String(action)}.`,
      );
  }
}
