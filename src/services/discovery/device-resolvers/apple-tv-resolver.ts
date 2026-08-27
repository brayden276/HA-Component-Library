import type {
  EntityRegistryEntry,
  HassEntity,
  HomeAssistant,
} from "../../../types/home-assistant";
import type { DashboardRegistries } from "../../../types/registry";
import { domainOf } from "../../../utils/entity";
import type { DeviceResolutionResult } from "./split-ac-resolver";

/**
 * Apple TV Device Resolver:
 * Consolidates Apple TV media player and device remote into ComponentAppleTvControllerV1.
 */
export const resolveAppleTv = (
  entry: EntityRegistryEntry,
  state?: HassEntity | null,
  registry?: DashboardRegistries | null,
  _hass?: HomeAssistant | null,
): DeviceResolutionResult | null => {
  if (
    domainOf(entry?.entity_id) !== "media_player" ||
    entry?.platform !== "apple_tv"
  ) {
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
    "Apple TV";

  return {
    cardConfig: {
      type: "custom:component-apple-tv-controller-v1",
      entity: entry.entity_id,
      title,
      icon: "mdi:apple",
    },
    claimedEntityIds: claimed,
  };
};
