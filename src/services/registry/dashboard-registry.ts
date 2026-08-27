import type { HomeAssistant, HassEntity } from "../../types/home-assistant";
import type {
  AreaRegistryEntry,
  DeviceRegistryEntry,
  EntityRegistryEntry,
  DashboardRegistryEntry,
  DashboardRegistries,
} from "../../types/registry";
import { domainOf } from "../../utils/entity";
import { discoverControls } from "../discovery/discovery-engine";

export type EntryFilter = (entry: EntityRegistryEntry) => boolean;

export class DashboardRegistryCoordinator {
  private _connection: any = null;
  private _hass: HomeAssistant | null = null;
  private _data: DashboardRegistries | null = null;
  private _promise: Promise<DashboardRegistries> | null = null;
  private _refreshPromise: Promise<DashboardRegistries> | null = null;
  private _refreshQueued = false;
  private _subs = new Set<(data: DashboardRegistries) => void>();
  private _unsubs: Promise<() => void> | null = null;
  private _retry: ReturnType<typeof setTimeout> | null = null;

  public get data(): DashboardRegistries | null {
    return this._data;
  }

  public attach(h?: HomeAssistant | null): void {
    const c = h?.connection || null;
    if (this._connection === c) {
      this._hass = h || null;
      return;
    }
    this.detach();
    this._connection = c;
    this._hass = h || null;
    if (this._subs.size > 0) {
      this.listen();
    }
  }

  public detach(): void {
    const p = this._unsubs;
    this._unsubs = null;
    this._refreshPromise = null;
    this._refreshQueued = false;
    if (p) {
      Promise.resolve(p)
        .then((f) => f?.())
        .catch(() => {});
    }
    if (this._retry) {
      clearTimeout(this._retry);
      this._retry = null;
    }
    this._connection = null;
    this._data = null;
    this._promise = null;
  }

  public listen(): void {
    const c = this._connection;
    if (!c?.subscribeEvents || this._unsubs) return;
    const p = Promise.all([
      c.subscribeEvents(() => this.refresh(), "area_registry_updated"),
      c.subscribeEvents(() => this.refresh(), "device_registry_updated"),
      c.subscribeEvents(() => this.refresh(), "entity_registry_updated"),
    ]).then((a: Array<() => void>) => () => a.forEach((f) => f?.()));

    this._unsubs = p;
    p.catch(() => {
      if (this._unsubs === p) this._unsubs = null;
      if (this._connection && !this._retry) {
        this._retry = setTimeout(() => {
          this._retry = null;
          this.listen();
        }, 30000);
      }
    });
  }

  public async load(
    h?: HomeAssistant | null,
    force = false,
  ): Promise<DashboardRegistries> {
    this.attach(h);
    if (this._data && !force) return this._data;
    if (this._promise) return this._promise;
    const c = h?.connection;
    if (!c?.sendMessagePromise) {
      return {
        areas: [],
        devices: [],
        entities: [],
        dashboards: [],
        deviceArea: new Map(),
        byDevice: new Map(),
        areaMap: new Map(),
      };
    }

    this._promise = Promise.all([
      c.sendMessagePromise({ type: "config/area_registry/list" }),
      c.sendMessagePromise({ type: "config/device_registry/list" }),
      c.sendMessagePromise({ type: "config/entity_registry/list" }),
      h?.callWS
        ? h.callWS({ type: "lovelace/dashboards/list" }).catch(() => [])
        : Promise.resolve([]),
    ])
      .then(([areas, devices, entities, dashboards]) => {
        const areaList: AreaRegistryEntry[] = Array.isArray(areas) ? areas : [];
        const deviceList: DeviceRegistryEntry[] = Array.isArray(devices)
          ? devices
          : [];
        const entityList: EntityRegistryEntry[] = Array.isArray(entities)
          ? entities
          : [];
        const dashList: DashboardRegistryEntry[] = Array.isArray(dashboards)
          ? dashboards
          : [];

        const deviceArea = new Map<string, string | null>(
          deviceList.map((d) => [d.id, d.area_id || null]),
        );
        const byDevice = new Map<string, EntityRegistryEntry[]>();
        for (const e of entityList) {
          if (!e?.device_id) continue;
          const a = byDevice.get(e.device_id) || [];
          a.push(e);
          byDevice.set(e.device_id, a);
        }

        const areaMap = new Map<string, AreaRegistryEntry>(
          areaList.map((a) => [a.area_id, a]),
        );

        this._data = {
          areas: areaList,
          devices: deviceList,
          entities: entityList,
          dashboards: dashList,
          deviceArea,
          byDevice,
          areaMap,
        };
        return this._data;
      })
      .catch(() => {
        return (
          this._data || {
            areas: [],
            devices: [],
            entities: [],
            dashboards: [],
            deviceArea: new Map(),
            byDevice: new Map(),
            areaMap: new Map(),
          }
        );
      })
      .finally(() => {
        this._promise = null;
      });

    return this._promise;
  }

  public refresh(): Promise<DashboardRegistries | null> {
    if (!this._hass) return Promise.resolve(this._data);
    if (this._refreshPromise) {
      this._refreshQueued = true;
      return this._refreshPromise;
    }

    const hass = this._hass;
    const loadFresh = () => {
      if (this._hass !== hass)
        return Promise.resolve(this._data || ({} as DashboardRegistries));
      this._data = null;
      this._promise = null;
      return this.load(hass, true);
    };

    const pending = this._promise
      ? Promise.resolve(this._promise)
          .catch(() => {})
          .then(loadFresh)
      : loadFresh();

    let refreshPromise: Promise<DashboardRegistries>;
    refreshPromise = Promise.resolve(pending)
      .then((data: DashboardRegistries) => {
        if (this._hass === hass) {
          for (const subscriber of [...this._subs]) {
            try {
              subscriber(data);
            } catch {}
          }
        }
        return data;
      })
      .finally(() => {
        if (this._refreshPromise !== refreshPromise) return;
        this._refreshPromise = null;
        if (this._refreshQueued) {
          this._refreshQueued = false;
          this.refresh();
        }
      });

    this._refreshPromise = refreshPromise;
    return refreshPromise;
  }

  public subscribe(
    h: HomeAssistant | null | undefined,
    fn: (data: DashboardRegistries) => void,
  ): () => void {
    this.attach(h);
    const wasEmpty = this._subs.size === 0;
    this._subs.add(fn);
    if (wasEmpty) {
      this.listen();
    }
    this.load(h).then(fn);
    return () => {
      this._subs.delete(fn);
      if (this._subs.size === 0) {
        this.detach();
      }
    };
  }
}

export const centralRegistry = new DashboardRegistryCoordinator();

export const entryFilters: EntryFilter[] = [];
export const registerEntryFilter = (filter: EntryFilter): (() => void) => {
  if (typeof filter !== "function")
    throw new TypeError("Dashboard entry filters must be functions");
  entryFilters.push(filter);
  return () => {
    const index = entryFilters.indexOf(filter);
    if (index >= 0) entryFilters.splice(index, 1);
  };
};

export const isPeripheralEntity = (
  entry?: EntityRegistryEntry | null,
  state?: HassEntity | null,
): boolean => {
  if (!entry?.entity_id) return false;
  if (
    entry.entity_category === "diagnostic" ||
    entry.entity_category === "config"
  ) {
    return true;
  }
  const deviceClass = String(
    state?.attributes?.device_class || entry.device_class || "",
  ).toLowerCase();
  if (
    [
      "battery",
      "signal_strength",
      "connectivity",
      "tamper",
      "update",
      "problem",
      "voltage",
      "current",
      "power_factor",
      "duration",
      "timestamp",
    ].includes(deviceClass)
  ) {
    return true;
  }
  const idAndName = `${entry.entity_id} ${entry.name || ""} ${entry.original_name || ""} ${state?.attributes?.friendly_name || ""}`.toLowerCase();
  return /\b(battery|battery_level|battery_low|battery_state|link_?quality|rssi|signal_strength|lqi|voltage|temp(erature)?_offset|humidity_offset|calibration_offset|firmware|ip_address|mac_address|device_temp(erature)?|cpu_temp(erature)?|ping|keep_alive|reporting_interval|uptime|free_heap|wifi_signal|compressor_speed|compressor_frequency)\b/i.test(
    idAndName,
  );
};

export const uiEntry = (
  entry?: EntityRegistryEntry | null,
  state?: HassEntity | null,
): boolean =>
  Boolean(
    entry?.entity_id &&
      !entry.disabled_by &&
      !entry.hidden_by &&
      !["diagnostic", "config"].includes(entry.entity_category || "") &&
      !isPeripheralEntity(entry, state) &&
      entryFilters.every((filter) => filter(entry)),
  );


export const stateNameOf = (
  _hass?: HomeAssistant | null,
  entry?: EntityRegistryEntry | null,
  state?: HassEntity | null,
): string =>
  entry?.name ||
  entry?.original_name ||
  state?.attributes?.friendly_name ||
  entry?.entity_id ||
  "Control";

export const areaOf = (
  entry?: EntityRegistryEntry | null,
  registry?: DashboardRegistries | null,
): string | null =>
  entry?.area_id ||
  (entry?.device_id
    ? registry?.deviceArea?.get(entry.device_id) || null
    : null) ||
  null;

export type ControlResolver = (
  entry: EntityRegistryEntry,
  state?: HassEntity | null,
  registry?: DashboardRegistries | null,
  hass?: HomeAssistant | null,
) => Record<string, any> | null;

export interface UserPreferences {
  order: string[];
  hidden: string[];
}

export const splitIdentity = (
  entry?: EntityRegistryEntry | null,
  hass?: HomeAssistant | null,
): string =>
  `${entry?.entity_id || ""} ${entry?.name || ""} ${entry?.original_name || ""} ${hass?.states?.[entry?.entity_id || ""]?.attributes?.friendly_name || ""}`.toLowerCase();

export const nativeClimateControlConfig = (
  entry: EntityRegistryEntry,
  state?: HassEntity | null,
  registry?: DashboardRegistries | null,
  hass?: HomeAssistant | null,
): Record<string, any> | null => {
  if (domainOf(entry?.entity_id) !== "climate") return null;
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
      climateName.some((part) => identity.includes(part))
    );
  };

  const select = (axis: string) => {
    const matches = candidates.filter(
      (candidate) =>
        domainOf(candidate.entity_id) === "select" &&
        splitIdentity(candidate, hass).includes(axis) &&
        /(vane|swing)/.test(splitIdentity(candidate, hass)) &&
        related(candidate),
    );
    return matches.length === 1 ? matches[0].entity_id : null;
  };

  const timer =
    candidates.find(
      (candidate) =>
        domainOf(candidate.entity_id) === "timer" &&
        related(candidate) &&
        /(split|climate|air.?con|hvac|timer)/.test(
          splitIdentity(candidate, hass),
        ),
    )?.entity_id || null;

  const profiles = candidates
    .filter(
      (candidate) =>
        ["script", "scene"].includes(domainOf(candidate.entity_id)) &&
        related(candidate) &&
        /(split|climate|air.?con|hvac)/.test(splitIdentity(candidate, hass)),
    )
    .map((candidate) => ({
      entity: candidate.entity_id,
      name: stateNameOf(hass, candidate, hass?.states?.[candidate.entity_id]),
    }));

  return {
    type: "custom:component-split-controller-v4",
    entity: entry.entity_id,
    title: stateNameOf(hass, entry, state),
    vertical_vane_entity: select("vertical"),
    horizontal_vane_entity: select("horizontal"),
    timer_entity: timer,
    profile_entities: profiles,
  };
};

const garageOperatorIdentity = (entry?: EntityRegistryEntry | null) =>
  `${entry?.entity_id || ""} ${entry?.name || ""} ${entry?.original_name || ""}`
    .toLowerCase()
    .replace(/[_./-]+/g, " ");

export const garageControl = (
  entry: EntityRegistryEntry,
  registry?: DashboardRegistries | null,
  hass?: HomeAssistant | null,
): string | null => {
  if (!entry?.device_id) return null;
  const buttons = (registry?.byDevice?.get(entry.device_id) || []).filter(
    (candidate) =>
      domainOf(candidate?.entity_id) === "button" &&
      uiEntry(candidate) &&
      hass?.states?.[candidate.entity_id] &&
      String(hass.states[candidate.entity_id].state).toLowerCase() !==
        "unavailable",
  );
  const explicit = buttons.filter((candidate) =>
    /\bgarage\s+door\b.*\b(trigger|operate|operator)\b|\b(trigger|operate|operator)\b.*\bgarage\s+door\b/.test(
      garageOperatorIdentity(candidate),
    ),
  );
  return explicit.length === 1 ? explicit[0].entity_id : null;
};

export const appleTvBundle = (
  entry: EntityRegistryEntry,
  state?: HassEntity | null,
  _registry?: DashboardRegistries | null,
  hass?: HomeAssistant | null,
): Record<string, any> | null =>
  domainOf(entry?.entity_id) === "media_player" &&
  entry?.platform === "apple_tv"
    ? {
        type: "custom:component-apple-tv-controller-v1",
        entity: entry.entity_id,
        title: stateNameOf(hass, entry, state),
        icon: "mdi:apple",
      }
    : null;

export const controlDomains = new Set([
  "light",
  "fan",
  "switch",
  "input_boolean",
  "media_player",
  "climate",
  "cover",
  "lock",
  "vacuum",
  "button",
  "select",
  "number",
]);

export const isPotential = (
  entry: EntityRegistryEntry,
  state?: HassEntity | null,
): boolean =>
  uiEntry(entry, state) &&
  (controlDomains.has(domainOf(entry.entity_id)) ||
    (domainOf(entry.entity_id) === "binary_sensor" &&
      state?.attributes?.device_class === "garage_door"));

export const isActive = (
  entry: EntityRegistryEntry,
  state?: HassEntity | null,
): boolean => {
  if (!uiEntry(entry, state) || !state) return false;
  const d = domainOf(entry.entity_id);
  const st = state.state;
  const a = state.attributes || {};
  if (["light", "fan", "switch", "input_boolean"].includes(d))
    return st === "on";
  if (d === "media_player") {
    if (["playing", "paused", "buffering", "on"].includes(st)) return true;
    if (st === "idle") {
      const v = String(a.media_title || a.app_name || "");
      return Boolean(
        v && !/^(idle|home(?: screen)?|default media receiver)$/i.test(v),
      );
    }
    return false;
  }
  if (d === "climate")
    return /^(heat|cool|heat_cool|auto|dry|fan_only)$/.test(st);
  if (d === "cover") return /^(open|opening|closing)$/.test(st);
  if (d === "lock") return st === "unlocked";
  if (d === "vacuum") return /^(cleaning|returning)$/.test(st);
  if (d === "binary_sensor")
    return (
      st === "on" &&
      /^(door|window|garage_door|smoke|moisture|gas)$/.test(
        a.device_class || "",
      )
    );
  return false;
};

export const controlResolvers: ControlResolver[] = [];

export const registerControlResolver = (
  resolver: ControlResolver,
): (() => void) => {
  if (typeof resolver !== "function")
    throw new TypeError("Dashboard control resolvers must be functions");
  controlResolvers.push(resolver);
  return () => {
    const index = controlResolvers.indexOf(resolver);
    if (index >= 0) controlResolvers.splice(index, 1);
  };
};

export const defaultControlConfig = (
  entry: EntityRegistryEntry,
  state?: HassEntity | null,
  registry?: DashboardRegistries | null,
  hass?: HomeAssistant | null,
): Record<string, any> | null => {
  const id = entry.entity_id;
  const dom = domainOf(id);

  if (dom === "climate") {
    return (
      nativeClimateControlConfig(entry, state, registry, hass) || {
        type: "custom:component-split-controller-v4",
        entity: id,
        title: stateNameOf(hass, entry, state),
      }
    );
  }

  if (
    dom === "binary_sensor" &&
    state?.attributes?.device_class === "garage_door"
  ) {
    const b = garageControl(entry, registry, hass);
    return b
      ? {
          type: "custom:component-garage-door-controller-v1",
          title: stateNameOf(hass, entry, state).replace(
            / Garage Door Status$/i,
            "",
          ),
          entity: id,
          control_entity: b,
        }
      : {
          type: "custom:component-control-row-v2",
          entity: id,
          title: stateNameOf(hass, entry, state),
        };
  }

  if (dom === "media_player") {
    return (
      appleTvBundle(entry, state, registry, hass) || {
        type: "custom:component-media-row-v2",
        entity: id,
        title: stateNameOf(hass, entry, state),
      }
    );
  }

  if (dom === "camera") {
    return {
      type: "custom:component-camera-controller-v1",
      entity: id,
      title: stateNameOf(hass, entry, state),
      device_id: entry.device_id,
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
      "select",
      "number",
      "binary_sensor",
    ].includes(dom)
  ) {
    return {
      type: "custom:component-control-row-v2",
      entity: id,
      title: stateNameOf(hass, entry, state),
      name: stateNameOf(hass, entry, state),
    };
  }

  return null;
};

export const controlConfig = (
  entry: EntityRegistryEntry,
  state?: HassEntity | null,
  registry?: DashboardRegistries | null,
  hass?: HomeAssistant | null,
): Record<string, any> | null => {
  for (const resolveControl of controlResolvers) {
    const configuration = resolveControl(entry, state, registry, hass);
    if (configuration) return configuration;
  }
  return defaultControlConfig(entry, state, registry, hass);
};

export const loadPrefs = async (
  h?: HomeAssistant | null,
  key?: string | null,
): Promise<UserPreferences> => {
  if (!h || !key) return { order: [], hidden: [] };
  try {
    const res = await h.callWS<{ value: UserPreferences }>({
      type: "frontend/get_user_data",
      key,
    });
    return res?.value || { order: [], hidden: [] };
  } catch {
    return { order: [], hidden: [] };
  }
};

export const savePrefs = (
  h: HomeAssistant,
  key: string,
  value: UserPreferences,
) => {
  return h.callWS({ type: "frontend/set_user_data", key, value });
};

export const applyPrefs = <T extends { id: string }>(
  items: T[],
  prefs?: UserPreferences | null,
): { all: T[]; visible: T[]; hidden: Set<string> } => {
  const by = new Map(items.map((x) => [x.id, x]));
  const seen = new Set<string>();
  const all: T[] = [];
  for (const id of prefs?.order || []) {
    const x = by.get(id);
    if (x) {
      all.push(x);
      seen.add(id);
    }
  }
  for (const x of items) {
    if (!seen.has(x.id)) all.push(x);
  }
  const hidden = new Set(prefs?.hidden || []);
  return { all, visible: all.filter((x) => !hidden.has(x.id)), hidden };
};

export const createCardElement = async (
  config: Record<string, any>,
  hass?: HomeAssistant | null,
): Promise<HTMLElement> => {
  const rawType = String(config?.type || "");
  const tag = rawType.startsWith("custom:") ? rawType.slice(7) : rawType;
  let element: any;

  if (customElements.get(tag)) {
    element = document.createElement(tag);
  } else {
    const loadCardHelpers =
      (globalThis as any).loadCardHelpers ||
      (typeof window !== "undefined"
        ? (window as any).loadCardHelpers
        : undefined);
    if (typeof loadCardHelpers === "function") {
      try {
        const helpers = await loadCardHelpers();
        const card = helpers.createCardElement(config);
        if (hass) card.hass = hass;
        return card;
      } catch {}
    }
    const entityId = config?.entity || "";
    const dom = domainOf(entityId);
    if (dom === "media_player") {
      element = document.createElement("component-media-row-v2");
    } else {
      element = document.createElement("component-control-row-v2");
    }
  }

  if (typeof element.setConfig === "function") {
    try {
      element.setConfig(config);
    } catch {}
  }
  if (hass) element.hass = hass;
  return element;
};

(globalThis as any).__homeDashboardV2 ??= {};
const HD2 = (globalThis as any).__homeDashboardV2;
HD2.REG = centralRegistry;
HD2.entryFilters = entryFilters;
HD2.registerEntryFilter = registerEntryFilter;
HD2.uiEntry = uiEntry;
HD2.stateName = stateNameOf;
HD2.areaOf = areaOf;
HD2.domain = domainOf;
HD2.controlResolvers = controlResolvers;
HD2.registerControlResolver = registerControlResolver;
HD2.nativeClimateControlConfig = nativeClimateControlConfig;
HD2.garageControl = garageControl;
HD2.appleTvBundle = appleTvBundle;
HD2.controlConfig = controlConfig;
HD2.defaultControlConfig = defaultControlConfig;
HD2.controlDomains = controlDomains;
HD2.isPotential = isPotential;
HD2.isActive = isActive;
HD2.isPeripheral = isPeripheralEntity;
HD2.prefs = loadPrefs;
HD2.savePrefs = savePrefs;
HD2.applyPrefs = applyPrefs;
HD2.card = createCardElement;
HD2.discoverControls = discoverControls;
