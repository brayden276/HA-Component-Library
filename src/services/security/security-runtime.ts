import type { HomeAssistant } from "../../types/home-assistant";
import type {
  DashboardRegistries,
  EntityRegistryEntry,
} from "../../types/registry";
import { centralRegistry, areaOf } from "../registry/dashboard-registry";
import { domainOf } from "../../utils/entity";
import { dashboardProfiles } from "../profiles/backend-profiles";

/**
 * Capability-driven Security discovery shared by every Security component.
 */

const badSecurityState = new Set(["unknown", "unavailable"]);

export const securityCapabilityText = (
  entity?: EntityRegistryEntry | null,
): string =>
  [
    entity?.translation_key,
    entity?.unique_id,
    entity?.entity_id,
    entity?.platform,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

export const securityEntityLabel = (
  hass?: HomeAssistant | null,
  entity?: EntityRegistryEntry | null,
): string =>
  entity?.name ||
  entity?.original_name ||
  (entity?.entity_id
    ? hass?.states?.[entity.entity_id]?.attributes?.friendly_name
    : "") ||
  entity?.entity_id ||
  "Control";

export const switchRole = (entity: EntityRegistryEntry): string | null => {
  const text = securityCapabilityText(entity);
  if (/record/.test(text)) return "Recording";
  if (/detect|motion/.test(text)) return "Detection";
  if (/alert|notification/.test(text)) return "Alerts";
  if (/audio|sound/.test(text)) return "Audio";
  return null;
};

export const ptzRole = (entity: EntityRegistryEntry): boolean =>
  /(^|[_ :.-])(ptz|pan|tilt|zoom)([_ :.-]|$)/.test(
    securityCapabilityText(entity),
  );

export const actionRole = (
  entity: EntityRegistryEntry,
): "operate" | "restart" | "action" => {
  const text = securityCapabilityText(entity);
  if (/trigger|operate|open|close/.test(text)) return "operate";
  if (/restart|reboot/.test(text)) return "restart";
  return "action";
};

export interface SecurityCameraItem {
  id: string;
  deviceId: string | null;
  entityId: string;
  entities: string[];
  name: string;
  areaId: string | null;
  areaName: string;
  online: boolean;
  active: boolean;
  streamEntityId: string;
  switches: Array<{ entity: EntityRegistryEntry; role: string | null }>;
  detections: EntityRegistryEntry[];
  classifications: Array<{ entity: EntityRegistryEntry; name: string }>;
  actions: Array<{ entity: EntityRegistryEntry; role: string }>;
  ptz: EntityRegistryEntry[];
}

export interface SecurityEntryItem {
  entityId: string;
  deviceId: string | null;
  controlEntityId: string | null;
  domain: string;
  deviceClass: string;
  name: string;
  state: string;
  open: boolean;
  available: boolean;
  areaId: string | null;
}

export interface SecurityQuickActionItem {
  id: string;
  entityId: string;
  domain: string;
  service: string;
  name: string;
  icon: string;
  available: boolean;
}

export interface SecurityAttentionItem {
  type: "camera-offline" | "camera-activity" | "entry-open";
  label: string;
  entityId: string;
}

export interface SecurityModelResult {
  error: any | null;
  cameras: SecurityCameraItem[];
  entries: SecurityEntryItem[];
  quickActions: SecurityQuickActionItem[];
  attention: SecurityAttentionItem[];
  allClear: boolean;
  onlineCameras: number;
}

export interface SecurityProfile {
  include_entities?: string[];
  exclude_entities?: string[];
  area_ids?: string[];
  mappings?: Record<string, string>;
  [key: string]: any;
}

export const securityModel = (
  hass: HomeAssistant,
  registry?: DashboardRegistries | null,
  profile: SecurityProfile = {},
): SecurityModelResult => {
  if (registry?.error) {
    return {
      error: registry.error,
      cameras: [],
      entries: [],
      quickActions: [],
      attention: [],
      allClear: false,
      onlineCameras: 0,
    };
  }

  const include = new Set(profile.include_entities || []);
  const exclude = new Set(profile.exclude_entities || []);
  const areas = new Set(profile.area_ids || []);

  const availableEntities = (registry?.entities || []).filter((entity) => {
    if (
      !entity?.entity_id ||
      entity.disabled_by ||
      entity.hidden_by ||
      !hass?.states?.[entity.entity_id]
    ) {
      return false;
    }
    return !exclude.has(entity.entity_id);
  });

  const candidates = availableEntities.filter((entity) => {
    if (include.has(entity.entity_id)) return true;
    const a = areaOf(entity, registry);
    return !areas.size || (a ? areas.has(a) : false);
  });

  const entities = candidates.filter(
    (entity) => !entity.disabled_by && !entity.hidden_by,
  );
  const eligibleOwners = new Set(
    candidates.map((entity) => entity.device_id || entity.entity_id),
  );
  const byDevice = new Map<string, EntityRegistryEntry[]>();

  for (const entity of availableEntities) {
    const owner = entity.device_id || entity.entity_id;
    const siblings = byDevice.get(owner) || [];
    siblings.push(entity);
    byDevice.set(owner, siblings);
  }

  const cameras: SecurityCameraItem[] = [];
  for (const [owner, siblings] of byDevice) {
    if (!eligibleOwners.has(owner)) continue;
    const cameraEntities = siblings.filter(
      (entity) =>
        domainOf(entity.entity_id) === "camera" &&
        !entity.disabled_by &&
        !entity.hidden_by,
    );
    if (!cameraEntities.length) continue;

    cameraEntities.sort((left, right) => {
      const score = (entity: EntityRegistryEntry) => {
        const state = hass.states[entity.entity_id];
        return (
          (include.has(entity.entity_id) ? 100 : 0) +
          (state?.attributes?.entity_picture ? 20 : 0) +
          (state?.attributes?.frontend_stream_type ? 10 : 0)
        );
      };
      return (
        score(right) - score(left) ||
        String(left.unique_id || left.entity_id).localeCompare(
          String(right.unique_id || right.entity_id),
        )
      );
    });

    const entity = cameraEntities[0];
    const state = hass.states[entity.entity_id];
    const device =
      (registry?.devices || []).find((item) => item.id === entity.device_id) ||
      ({} as any);
    const areaId = areaOf(entity, registry);
    const areaName = (areaId ? registry?.areaMap?.get(areaId)?.name : "") || "";

    const switches = siblings
      .filter(
        (item) => domainOf(item.entity_id) === "switch" && switchRole(item),
      )
      .map((item) => ({ entity: item, role: switchRole(item) }));

    const detections = siblings.filter((item) => {
      if (domainOf(item.entity_id) !== "binary_sensor") return false;
      const deviceClass =
        hass.states[item.entity_id]?.attributes?.device_class || "";
      return (
        /^(motion|occupancy|presence|sound)$/.test(deviceClass) ||
        /detect|motion|person|human/.test(securityCapabilityText(item))
      );
    });

    const classifications = siblings
      .filter((item) => domainOf(item.entity_id) === "image")
      .map((item) => {
        const label = securityEntityLabel(hass, item);
        const deviceName = String(
          device.name_by_user || device.name || "",
        ).trim();
        const name =
          deviceName &&
          label.toLowerCase().startsWith(`${deviceName.toLowerCase()} `)
            ? label.slice(deviceName.length).trim()
            : label;
        return { entity: item, name };
      });

    const actions = siblings
      .filter(
        (item) =>
          domainOf(item.entity_id) === "button" &&
          actionRole(item) !== "action",
      )
      .map((item) => ({ entity: item, role: actionRole(item) }));

    const ptz = siblings.filter(
      (item) =>
        ["button", "number", "select"].includes(domainOf(item.entity_id)) &&
        ptzRole(item),
    );

    const mappedStream =
      profile.mappings?.[`camera_stream:${entity.entity_id}`] ||
      profile.mappings?.[`camera_stream:${owner}`] ||
      null;
    const mappedStreamState = mappedStream ? hass.states[mappedStream] : null;
    const streamEntityId =
      (mappedStreamState &&
      !badSecurityState.has(String(mappedStreamState.state).toLowerCase())
        ? mappedStream
        : entity.entity_id) || entity.entity_id;

    const online = Boolean(
      state && !badSecurityState.has(String(state.state).toLowerCase()),
    );
    const active = detections.some(
      (item) => hass.states[item.entity_id]?.state === "on",
    );

    cameras.push({
      id: owner,
      deviceId: entity.device_id || null,
      entityId: entity.entity_id,
      entities: cameraEntities.map((item) => item.entity_id),
      name:
        String(device.name_by_user || device.name || "").trim() ||
        areaName ||
        securityEntityLabel(hass, entity),
      areaId,
      areaName,
      online,
      active,
      streamEntityId,
      switches,
      detections,
      classifications,
      actions,
      ptz,
    });
  }
  cameras.sort((left, right) =>
    left.name.localeCompare(right.name, undefined, { sensitivity: "base" }),
  );

  const entries: SecurityEntryItem[] = [];
  for (const entity of entities) {
    const domain = domainOf(entity.entity_id);
    const state = hass.states[entity.entity_id];
    const deviceClass = state?.attributes?.device_class || "";
    const isBinaryEntry =
      domain === "binary_sensor" &&
      /^(door|window|garage_door|opening)$/.test(deviceClass);
    const isEntry =
      isBinaryEntry ||
      domain === "lock" ||
      (domain === "cover" && /^(door|garage)$/.test(deviceClass));
    if (!isEntry) continue;

    const siblings = entity.device_id
      ? byDevice.get(entity.device_id) || []
      : [];
    const mapped = profile.mappings?.[`entry_control:${entity.entity_id}`];
    const control =
      mapped ||
      siblings
        .filter((item) => domainOf(item.entity_id) === "button")
        .sort(
          (left, right) =>
            (actionRole(left) === "operate" ? -1 : 1) -
            (actionRole(right) === "operate" ? -1 : 1),
        )[0]?.entity_id ||
      null;

    const open =
      domain === "lock"
        ? state.state === "unlocked"
        : /^(on|open|opening)$/.test(state.state);
    entries.push({
      entityId: entity.entity_id,
      deviceId: entity.device_id || null,
      controlEntityId: control,
      domain,
      deviceClass,
      name: securityEntityLabel(hass, entity),
      state: state.state,
      open,
      available: !badSecurityState.has(String(state.state).toLowerCase()),
      areaId: areaOf(entity, registry),
    });
  }
  entries.sort((left, right) =>
    left.name.localeCompare(right.name, undefined, { sensitivity: "base" }),
  );

  const supportedQuickActions = new Map<string, string>([
    ["automation", "trigger"],
    ["scene", "turn_on"],
    ["script", "turn_on"],
  ]);

  const quickActions: SecurityQuickActionItem[] = Object.entries(
    profile.mappings || {},
  ).flatMap(([role, entityId]) => {
    if (!role.startsWith("quick_action:")) return [];
    const domain = domainOf(entityId);
    const service = supportedQuickActions.get(domain);
    const state = hass?.states?.[entityId];
    if (!service || !state) return [];
    const entity = (registry?.entities || []).find(
      (item) => item.entity_id === entityId,
    ) || {
      entity_id: entityId,
    };
    return [
      {
        id: role.slice("quick_action:".length),
        entityId,
        domain,
        service,
        name: securityEntityLabel(hass, entity),
        icon:
          state.attributes?.icon ||
          (domain === "script"
            ? "mdi:script-text-outline"
            : domain === "scene"
              ? "mdi:palette-outline"
              : "mdi:robot-outline"),
        available: !badSecurityState.has(String(state.state).toLowerCase()),
      },
    ];
  });
  quickActions.sort((left, right) =>
    left.name.localeCompare(right.name, undefined, { sensitivity: "base" }),
  );

  const attention: SecurityAttentionItem[] = [
    ...cameras
      .filter((camera) => !camera.online)
      .map((camera) => ({
        type: "camera-offline" as const,
        label: `${camera.name} unavailable`,
        entityId: camera.entityId,
      })),
    ...cameras
      .filter((camera) => camera.active)
      .map((camera) => ({
        type: "camera-activity" as const,
        label: `${camera.name} activity`,
        entityId: camera.entityId,
      })),
    ...entries
      .filter((entry) => entry.available && entry.open)
      .map((entry) => ({
        type: "entry-open" as const,
        label: `${entry.name} open`,
        entityId: entry.entityId,
      })),
  ];

  return {
    error: null,
    cameras,
    entries,
    quickActions,
    attention,
    allClear: attention.length === 0,
    onlineCameras: cameras.filter((camera) => camera.online).length,
  };
};

export interface LoadedSecurityModel extends SecurityModelResult {
  profile: SecurityProfile | null;
  profileMissing: boolean;
  profileError: any;
}

export const loadSecurityModel = async (
  hass: HomeAssistant,
  profileId = "household-security",
  options: { force?: boolean } = {},
): Promise<LoadedSecurityModel> => {
  const [profileResult, registry] = await Promise.all([
    dashboardProfiles
      .get<SecurityProfile>(hass, "security", profileId, options)
      .catch((error) => ({ found: false, profile: null, error })),
    centralRegistry.load(hass),
  ]);

  if (!profileResult?.found) {
    const error =
      profileResult?.error ||
      new Error(`Security profile ${profileId} is not configured`);
    return {
      error,
      cameras: [],
      entries: [],
      quickActions: [],
      attention: [],
      allClear: false,
      onlineCameras: 0,
      profile: null,
      profileMissing: true,
      profileError: profileResult?.error || null,
    };
  }

  const model = securityModel(hass, registry, profileResult.profile || {});
  return {
    ...model,
    profile: profileResult?.profile || null,
    profileMissing: !profileResult?.found,
    profileError: profileResult?.error || null,
  };
};
