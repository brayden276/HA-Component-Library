import type { HomeAssistant } from "../../types/home-assistant";
import type { DashboardRegistries } from "../../types/registry";
import { centralRegistry } from "./dashboard-registry";

/**
 * Health-aware registry loading delegating cleanly to centralRegistry.
 */
export const healthAwareRegistryLoad = async (
  hass?: HomeAssistant | null,
  force = false,
): Promise<DashboardRegistries> => {
  return centralRegistry.load(hass, force);
};
