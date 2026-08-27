import type { HomeAssistant, HassEntity } from "../../types/home-assistant";
import type {
  AreaRegistryEntry,
  DeviceRegistryEntry,
  EntityRegistryEntry,
  DashboardRegistryEntry,
  DashboardRegistries,
} from "../../types/registry";

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

export const uiEntry = (entry?: EntityRegistryEntry | null): boolean =>
  Boolean(
    entry?.entity_id &&
      !entry.disabled_by &&
      !entry.hidden_by &&
      !["diagnostic", "config"].includes(entry.entity_category || "") &&
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
