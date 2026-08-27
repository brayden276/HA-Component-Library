import type {
  EntityRegistryEntry,
  HassEntity,
  HomeAssistant,
} from "../../../types/home-assistant";
import type { DashboardRegistries } from "../../../types/registry";
import { domainOf } from "../../../utils/entity";
import type { DeviceResolutionResult } from "./split-ac-resolver";

/**
 * Camera Device Resolver:
 * Resolves main camera stream into ComponentCameraControllerV1,
 * claiming substreams and internal PTZ/diagnostic entities.
 */
export const resolveCamera = (
  entry: EntityRegistryEntry,
  state?: HassEntity | null,
  registry?: DashboardRegistries | null,
  _hass?: HomeAssistant | null,
): DeviceResolutionResult | null => {
  if (domainOf(entry?.entity_id) !== "camera") {
    return null;
  }

  const identity = `${entry.entity_id} ${entry.name || entry.original_name || ""}`;
  if (/sub.?stream/i.test(identity)) {
    return null;
  }

  const claimed = new Set<string>();
  claimed.add(entry.entity_id);

  if (entry.device_id && registry?.byDevice) {
    const siblings = registry.byDevice.get(entry.device_id) || [];
    for (const sib of siblings) {
      claimed.add(sib.entity_id);
    }
  }

  const title =
    entry.name ||
    entry.original_name ||
    state?.attributes?.friendly_name ||
    "Camera";

  return {
    cardConfig: {
      type: "custom:component-camera-controller-v1",
      entity: entry.entity_id,
      title,
      device_id: entry.device_id,
    },
    claimedEntityIds: claimed,
  };
};
