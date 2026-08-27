import type {
  EntityRegistryEntry,
  HassEntity,
  HomeAssistant,
} from "../../../types/home-assistant";
import type { DashboardRegistries } from "../../../types/registry";
import { domainOf } from "../../../utils/entity";
import type { DeviceResolutionResult } from "./split-ac-resolver";

/**
 * WLED Device Resolver:
 * Consolidates canonical WLED main light, subordinate segment lights,
 * preset/palette selects, and speed/intensity numbers into ComponentWledControllerV1.
 */
export const resolveWled = (
  entry: EntityRegistryEntry,
  _state?: HassEntity | null,
  registry?: DashboardRegistries | null,
  _hass?: HomeAssistant | null,
): DeviceResolutionResult | null => {
  if (entry?.platform !== "wled" || domainOf(entry.entity_id) !== "light") {
    return null;
  }

  const name = String(
    entry.original_name || entry.name || entry.entity_id || "",
  ).toLowerCase();
  const isSegment = /_\d+$/.test(String(entry.unique_id || ""));
  if (isSegment && name !== "main") {
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

  return {
    cardConfig: {
      type: "custom:component-wled-controller-v1",
      entity: entry.entity_id,
      device_id: entry.device_id,
    },
    claimedEntityIds: claimed,
  };
};
