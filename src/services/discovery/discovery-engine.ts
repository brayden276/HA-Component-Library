import type {
  EntityRegistryEntry,
  HomeAssistant,
} from "../../types/home-assistant";
import type { DashboardRegistries } from "../../types/registry";
import { domainOf } from "../../utils/entity";
import {
  isDiagnosticOrPeripheral,
  isPrimaryControl,
  isControlActive,
} from "./entity-classifier";
import { resolveDeviceCard } from "./control-resolver";
import { applyPrefs, UserPreferences } from "../registry/dashboard-registry";

export interface DiscoveryOptions {
  mode?: "all" | "area" | "active" | "media" | "sound";
  area_id?: string;
  exclude_device_names?: string[];
  prefs?: UserPreferences | null;
}

export interface DiscoveredControlCard {
  entityId: string;
  cardConfig: Record<string, any>;
  signature: string;
}

const areaOf = (
  entry?: EntityRegistryEntry | null,
  registry?: DashboardRegistries | null,
): string | null =>
  entry?.area_id ||
  (entry?.device_id
    ? registry?.deviceArea?.get(entry.device_id) || null
    : null) ||
  null;

const stateNameOf = (
  hass?: HomeAssistant | null,
  entry?: EntityRegistryEntry | null,
): string => {
  const state = entry?.entity_id ? hass?.states?.[entry.entity_id] : undefined;
  return (
    entry?.name ||
    entry?.original_name ||
    state?.attributes?.friendly_name ||
    entry?.entity_id ||
    "Control"
  );
};

/**
 * Pure discovery engine for resolving dashboard device and control cards.
 */
export const discoverControls = (
  hass: HomeAssistant,
  registry: DashboardRegistries | null,
  options: DiscoveryOptions = {},
): DiscoveredControlCard[] => {
  if (!hass?.states) return [];

  const mode = options.mode || "all";
  const areaId = options.area_id;
  const excludedDeviceNames = new Set(options.exclude_device_names || []);

  const deviceNames = new Map(
    (registry?.devices || []).map((d) => [
      d.id,
      d.name_by_user || d.name || "",
    ]),
  );

  // 1. Source entities (with instant fallback to hass.states if registry is loading)
  const sourceEntities: EntityRegistryEntry[] =
    registry && registry.entities.length > 0
      ? registry.entities
      : Object.keys(hass.states).map((entity_id) => ({
          entity_id,
          device_id: null,
          area_id: null,
          name: hass.states[entity_id]?.attributes?.friendly_name || entity_id,
        }));

  // 2. Filter out disabled, hidden, excluded devices, and diagnostic entities
  const eligibleEntities = sourceEntities.filter((entry) => {
    if (!entry.entity_id || entry.disabled_by || entry.hidden_by) return false;
    const state = hass.states[entry.entity_id];
    if (!state) return false;

    // Check device name exclusions
    if (
      entry.device_id &&
      excludedDeviceNames.has(deviceNames.get(entry.device_id) || "")
    ) {
      return false;
    }

    // Check diagnostic / hardware telemetry filtering
    if (isDiagnosticOrPeripheral(entry, state)) {
      return false;
    }

    return true;
  });

  // 3. Run device bundle resolvers to discover specialized cards and claim subordinate entities
  const claimedEntityIds = new Set<string>();
  const discoveredCards: Array<{
    entityId: string;
    entry: EntityRegistryEntry;
    cardConfig: Record<string, any>;
  }> = [];

  for (const entry of eligibleEntities) {
    const domain = domainOf(entry.entity_id);
    const entryArea = areaOf(entry, registry);

    // If filtering by area, primary device entry must match area
    if (mode === "area" && areaId && entryArea !== areaId) {
      continue;
    }

    // Attempt specialized device resolution on primary device domains
    if (
      [
        "climate",
        "media_player",
        "camera",
        "binary_sensor",
        "cover",
        "light",
      ].includes(domain)
    ) {
      const state = hass.states[entry.entity_id];
      const result = resolveDeviceCard(entry, state, registry, hass);
      if (
        result &&
        result.cardConfig.type !== "custom:component-control-row-v2" &&
        result.cardConfig.type !== "custom:component-media-row-v2"
      ) {
        for (const claimedId of result.claimedEntityIds) {
          claimedEntityIds.add(claimedId);
        }
        discoveredCards.push({
          entityId: entry.entity_id,
          entry,
          cardConfig: result.cardConfig,
        });
      }
    }
  }

  // 4. Discover remaining unclaimed standalone controls
  for (const entry of eligibleEntities) {
    if (claimedEntityIds.has(entry.entity_id)) {
      continue;
    }

    const state = hass.states[entry.entity_id];
    const domain = domainOf(entry.entity_id);
    const entryArea = areaOf(entry, registry);

    // Mode-specific scoping
    if (mode === "area") {
      if (entryArea !== areaId || !isPrimaryControl(entry, state)) continue;
    } else if (mode === "media") {
      if (domain !== "media_player") continue;
    } else if (mode === "sound") {
      if (!["switch", "number", "select"].includes(domain)) continue;
    } else {
      if (!isPrimaryControl(entry, state)) continue;
    }

    const result = resolveDeviceCard(entry, state, registry, hass);
    if (result) {
      discoveredCards.push({
        entityId: entry.entity_id,
        entry,
        cardConfig: result.cardConfig,
      });
    }
  }

  // 5. Apply active filter if mode is 'active'
  const filteredCards =
    mode === "active"
      ? discoveredCards.filter((card) => {
          const state = hass.states[card.entityId];
          return isControlActive(card.entry, state);
        })
      : discoveredCards;

  // 6. Alphabetical default sort
  filteredCards.sort((a, b) =>
    stateNameOf(hass, a.entry).localeCompare(
      stateNameOf(hass, b.entry),
      undefined,
      { sensitivity: "base" },
    ),
  );

  // 7. Apply user ordering and hiding preferences
  const preferences = applyPrefs(
    filteredCards.map((c) => ({ id: c.entityId, card: c })),
    options.prefs,
  );

  return preferences.visible.map((item) => ({
    entityId: item.id,
    cardConfig: item.card.cardConfig,
    signature: JSON.stringify(item.card.cardConfig),
  }));
};
