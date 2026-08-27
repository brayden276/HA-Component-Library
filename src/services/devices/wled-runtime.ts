import type { EntityRegistryEntry } from "../../types/registry";
import {
  registerEntryFilter,
  registerControlResolver,
  centralRegistry,
} from "../registry/dashboard-registry";
import { domainOf } from "../../utils/entity";

/**
 * Shared WLED registry helpers used by the controller and dashboard integration.
 */

export const WLED_DOMAIN = domainOf;
export const WLED_INVALID = new Set(["unknown", "unavailable", "none", ""]);
export const WLED_NAME = (entry?: EntityRegistryEntry | null): string =>
  String(
    entry?.original_name || entry?.name || entry?.entity_id || "",
  ).toLowerCase();

let wledRegistered = false;
export const initWledIntegration = (): void => {
  if (wledRegistered) return;
  wledRegistered = true;

  registerEntryFilter((entry: EntityRegistryEntry) => {
    if (entry?.platform !== "wled") return true;
    if (domainOf(entry.entity_id) !== "light") return false;
    const name = WLED_NAME(entry);
    return name === "main" || !/_\d+$/.test(String(entry.unique_id || ""));
  });

  registerControlResolver((entry) => {
    if (entry?.platform !== "wled" || domainOf(entry.entity_id) !== "light")
      return null;
    return {
      type: "custom:component-wled-controller-v1",
      entity: entry.entity_id,
      device_id: entry.device_id,
    };
  });

  centralRegistry.refresh();
};

initWledIntegration();
