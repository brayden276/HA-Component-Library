import type {
  EntityRegistryEntry,
  HassEntity,
  HomeAssistant,
} from "../../../types/home-assistant";
import type { DashboardRegistries } from "../../../types/registry";
import { domainOf } from "../../../utils/entity";
import type { DeviceResolutionResult } from "./split-ac-resolver";

const garageOperatorIdentity = (entry?: EntityRegistryEntry | null) =>
  `${entry?.entity_id || ""} ${entry?.name || ""} ${entry?.original_name || ""}`
    .toLowerCase()
    .replace(/[_./-]+/g, " ");

/**
 * Garage Door Device Resolver:
 * Discovers garage door sensor/cover and pairs with the corresponding
 * momentary operator button on the same device into ComponentGarageDoorControllerV1.
 */
export const resolveGarageDoor = (
  entry: EntityRegistryEntry,
  state?: HassEntity | null,
  registry?: DashboardRegistries | null,
  hass?: HomeAssistant | null,
): DeviceResolutionResult | null => {
  const domain = domainOf(entry.entity_id);
  const isGarageBinary =
    domain === "binary_sensor" &&
    state?.attributes?.device_class === "garage_door";
  const isGarageCover =
    domain === "cover" &&
    (/garage/i.test(entry.entity_id) ||
      /garage/i.test(state?.attributes?.friendly_name || "") ||
      state?.attributes?.device_class === "garage");

  if (!isGarageBinary && !isGarageCover) {
    return null;
  }

  const claimed = new Set<string>();
  claimed.add(entry.entity_id);

  let operatorButton: string | null = null;
  if (entry.device_id && registry?.byDevice) {
    const siblings = registry.byDevice.get(entry.device_id) || [];
    const buttons = siblings.filter(
      (candidate) =>
        domainOf(candidate?.entity_id) === "button" &&
        hass?.states?.[candidate.entity_id] &&
        String(hass.states[candidate.entity_id].state).toLowerCase() !==
          "unavailable",
    );

    const explicit = buttons.filter((candidate) =>
      /\bgarage\s+door\b.*\b(trigger|operate|operator)\b|\b(trigger|operate|operator)\b.*\bgarage\s+door\b/.test(
        garageOperatorIdentity(candidate),
      ),
    );

    if (explicit.length === 1) {
      operatorButton = explicit[0].entity_id;
      claimed.add(operatorButton);
    }
  }

  const title = (
    entry.name ||
    entry.original_name ||
    state?.attributes?.friendly_name ||
    "Garage Door"
  ).replace(/ Garage Door Status$/i, "");

  return {
    cardConfig: {
      type: "custom:component-garage-door-controller-v1",
      entity: entry.entity_id,
      control_entity: operatorButton || undefined,
      title,
    },
    claimedEntityIds: claimed,
  };
};
