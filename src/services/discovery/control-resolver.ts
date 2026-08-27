import type {
  EntityRegistryEntry,
  HassEntity,
  HomeAssistant,
} from "../../types/home-assistant";
import type { DashboardRegistries } from "../../types/registry";
import { domainOf } from "../../utils/entity";
import type { DeviceResolutionResult } from "./device-resolvers/split-ac-resolver";
import { resolveSplitAc } from "./device-resolvers/split-ac-resolver";
import { resolveWled } from "./device-resolvers/wled-resolver";
import { resolveGarageDoor } from "./device-resolvers/garage-door-resolver";
import { resolveAppleTv } from "./device-resolvers/apple-tv-resolver";
import { resolveCamera } from "./device-resolvers/camera-resolver";

export type CustomDeviceResolver = (
  entry: EntityRegistryEntry,
  state?: HassEntity | null,
  registry?: DashboardRegistries | null,
  hass?: HomeAssistant | null,
) => DeviceResolutionResult | null;

const customResolvers: CustomDeviceResolver[] = [];

/**
 * Register a custom third-party or plugin device bundle resolver.
 */
export const registerDeviceResolver = (
  resolver: CustomDeviceResolver,
): (() => void) => {
  if (typeof resolver !== "function") {
    throw new TypeError("Device resolvers must be functions");
  }
  customResolvers.push(resolver);
  return () => {
    const idx = customResolvers.indexOf(resolver);
    if (idx >= 0) customResolvers.splice(idx, 1);
  };
};

const stateNameOf = (
  _hass?: HomeAssistant | null,
  entry?: EntityRegistryEntry | null,
  state?: HassEntity | null,
): string =>
  entry?.name ||
  entry?.original_name ||
  state?.attributes?.friendly_name ||
  entry?.entity_id ||
  "Control";

/**
 * Resolves an entity entry to its specialized device controller card if matching,
 * otherwise falls back to the library's minimal control row card.
 */
export const resolveDeviceCard = (
  entry: EntityRegistryEntry,
  state?: HassEntity | null,
  registry?: DashboardRegistries | null,
  hass?: HomeAssistant | null,
): DeviceResolutionResult | null => {
  // 1. Check custom plugin resolvers first
  for (const resolve of customResolvers) {
    const result = resolve(entry, state, registry, hass);
    if (result) return result;
  }

  // 2. Check built-in appliance resolvers
  const splitAc = resolveSplitAc(entry, state, registry, hass);
  if (splitAc) return splitAc;

  const wled = resolveWled(entry, state, registry, hass);
  if (wled) return wled;

  const garage = resolveGarageDoor(entry, state, registry, hass);
  if (garage) return garage;

  const appleTv = resolveAppleTv(entry, state, registry, hass);
  if (appleTv) return appleTv;

  const camera = resolveCamera(entry, state, registry, hass);
  if (camera) return camera;

  // 3. Fallback to standard minimal control rows
  const id = entry.entity_id;
  const dom = domainOf(id);
  const title = stateNameOf(hass, entry, state);

  if (dom === "media_player") {
    return {
      cardConfig: {
        type: "custom:component-media-row-v2",
        entity: id,
        title,
      },
      claimedEntityIds: new Set([id]),
    };
  }

  if (
    [
      "light",
      "fan",
      "switch",
      "input_boolean",
      "cover",
      "lock",
      "vacuum",
      "button",
      "input_button",
      "select",
      "input_select",
      "number",
      "input_number",
    ].includes(dom)
  ) {
    return {
      cardConfig: {
        type: "custom:component-control-row-v2",
        entity: id,
        title,
        name: title,
      },
      claimedEntityIds: new Set([id]),
    };
  }

  return null;
};
