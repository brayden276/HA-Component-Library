import type {
  EntityRegistryEntry,
  HassEntity,
  HomeAssistant,
} from "../../../types/home-assistant";
import type { DashboardRegistries } from "../../../types/registry";
import { domainOf } from "../../../utils/entity";

export interface DeviceResolutionResult {
  cardConfig: Record<string, any>;
  claimedEntityIds: Set<string>;
}

const splitIdentity = (
  entry?: EntityRegistryEntry | null,
  hass?: HomeAssistant | null,
): string =>
  `${entry?.entity_id || ""} ${entry?.name || ""} ${entry?.original_name || ""} ${hass?.states?.[entry?.entity_id || ""]?.attributes?.friendly_name || ""}`.toLowerCase();

const stateNameOf = (
  _hass?: HomeAssistant | null,
  entry?: EntityRegistryEntry | null,
  state?: HassEntity | null,
): string =>
  entry?.name ||
  entry?.original_name ||
  state?.attributes?.friendly_name ||
  entry?.entity_id ||
  "Split System";

const areaOf = (
  entry?: EntityRegistryEntry | null,
  registry?: DashboardRegistries | null,
): string | null =>
  entry?.area_id ||
  (entry?.device_id
    ? registry?.deviceArea?.get(entry.device_id) || null
    : null) ||
  null;

/**
 * Split AC Device Resolver:
 * Consolidates climate entity, sibling appliance entities (compressor speed, internal switches),
 * and helper entities (vertical/horizontal vane selectors, off timers, profile scripts/scenes)
 * into a single unified ComponentSplitControllerV4.
 */
export const resolveSplitAc = (
  entry: EntityRegistryEntry,
  state?: HassEntity | null,
  registry?: DashboardRegistries | null,
  hass?: HomeAssistant | null,
): DeviceResolutionResult | null => {
  if (domainOf(entry?.entity_id) !== "climate") return null;

  const claimed = new Set<string>();
  claimed.add(entry.entity_id);

  // Claim all sibling entities on the same Split AC device
  if (entry.device_id && registry?.byDevice) {
    const siblings = registry.byDevice.get(entry.device_id) || [];
    for (const sib of siblings) {
      claimed.add(sib.entity_id);
    }
  }

  const areaId = areaOf(entry, registry);
  const sameDevice = entry.device_id
    ? registry?.byDevice?.get(entry.device_id) || []
    : [];
  const sameArea = areaId
    ? (registry?.entities || []).filter(
        (candidate) => areaOf(candidate, registry) === areaId,
      )
    : [];
  const helpers = (registry?.entities || []).filter((candidate) =>
    ["timer", "script", "scene"].includes(domainOf(candidate?.entity_id)),
  );

  const candidates = [
    ...new Map(
      [...sameDevice, ...sameArea, ...helpers].map((candidate) => [
        candidate.entity_id,
        candidate,
      ]),
    ).values(),
  ].filter((candidate) => hass?.states?.[candidate.entity_id]);

  const climateName = splitIdentity(entry, hass)
    .replace(/climate\.|split|system|climate|air conditioner|aircon|hvac/g, " ")
    .trim()
    .split(/\s+/)
    .filter((part) => part.length > 2);

  const related = (candidate: EntityRegistryEntry) => {
    const identity = splitIdentity(candidate, hass);
    return (
      Boolean(entry.device_id && candidate.device_id === entry.device_id) ||
      (climateName.length > 0 &&
        climateName.some((part) => identity.includes(part)))
    );
  };

  const selectAxis = (axis: string) => {
    const matches = candidates.filter(
      (candidate) =>
        domainOf(candidate.entity_id) === "select" &&
        splitIdentity(candidate, hass).includes(axis) &&
        /(vane|swing)/.test(splitIdentity(candidate, hass)) &&
        related(candidate),
    );
    return matches.length === 1 ? matches[0].entity_id : null;
  };

  const verticalVane = selectAxis("vertical");
  const horizontalVane = selectAxis("horizontal");
  if (verticalVane) claimed.add(verticalVane);
  if (horizontalVane) claimed.add(horizontalVane);

  const timer =
    candidates.find(
      (candidate) =>
        domainOf(candidate.entity_id) === "timer" &&
        related(candidate) &&
        /(split|climate|air.?con|hvac|timer)/.test(
          splitIdentity(candidate, hass),
        ),
    )?.entity_id || null;
  if (timer) claimed.add(timer);

  const profiles = candidates
    .filter(
      (candidate) =>
        ["script", "scene"].includes(domainOf(candidate.entity_id)) &&
        related(candidate) &&
        /(split|climate|air.?con|hvac)/.test(splitIdentity(candidate, hass)),
    )
    .map((candidate) => {
      claimed.add(candidate.entity_id);
      return {
        entity: candidate.entity_id,
        name: stateNameOf(hass, candidate, hass?.states?.[candidate.entity_id]),
      };
    });

  return {
    cardConfig: {
      type: "custom:component-split-controller-v4",
      entity: entry.entity_id,
      title: stateNameOf(hass, entry, state),
      vertical_vane_entity: verticalVane,
      horizontal_vane_entity: horizontalVane,
      timer_entity: timer,
      profile_entities: profiles,
    },
    claimedEntityIds: claimed,
  };
};
