import type {
  AreaRegistryEntry,
  DeviceRegistryEntry,
  EntityRegistryEntry,
} from "../../types/registry";
import { centralRegistry } from "./dashboard-registry";

export interface ReadOnlyDashboardRegistries {
  areas: AreaRegistryEntry[];
  devices: DeviceRegistryEntry[];
  entities: EntityRegistryEntry[];
}

const READ_ONLY_CACHE = new WeakMap<object, ReadOnlyDashboardRegistries>();

/**
 * Loads registry entries delegating to centralRegistry for single-flight deduplication and event invalidation.
 */
export const loadDashboardRegistries = async (
  connection?: any,
): Promise<ReadOnlyDashboardRegistries> => {
  if (!connection || !connection.sendMessagePromise) {
    return { areas: [], devices: [], entities: [] };
  }
  const reg = await centralRegistry.load({ connection } as any);
  let cached = READ_ONLY_CACHE.get(reg);
  if (!cached) {
    cached = {
      areas: reg.areas,
      devices: reg.devices,
      entities: reg.entities,
    };
    READ_ONLY_CACHE.set(reg, cached);
  }
  return cached;
};
