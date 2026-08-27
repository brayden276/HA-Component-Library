import type {
  HomeAssistant,
  HassEntities,
  HassEntity,
  HassServices,
  HassConfig,
  HassLocale,
  HassUser
} from '../../src/types/home-assistant';

export interface MockHassOptions {
  states?: HassEntities;
  services?: HassServices;
  config?: Partial<HassConfig>;
  locale?: Partial<HassLocale>;
  wsHandler?: (msg: Record<string, unknown>) => Promise<any> | any;
}

export class MockHassBuilder {
  private _states: HassEntities = {};
  private _services: HassServices = {};
  private _serviceCalls: Array<{ domain: string; service: string; data?: any; target?: any }> = [];
  private _wsCalls: Array<Record<string, unknown>> = [];
  private _wsHandler?: (msg: Record<string, unknown>) => Promise<any> | any;
  private _eventListeners = new Map<string, Set<(event: any) => void>>();

  constructor(options: MockHassOptions = {}) {
    for (const [entityId, stateObj] of Object.entries(options.states || {})) {
      this._states[entityId] = {
        entity_id: entityId,
        ...stateObj
      } as HassEntity;
    }
    this._services = { ...(options.services || {}) };
    this._wsHandler = options.wsHandler;
  }

  public setEntity(entityId: string, state: string, attributes: Record<string, any> = {}): this {
    this._states[entityId] = {
      entity_id: entityId,
      state,
      attributes: {
        friendly_name: entityId.split('.')[1]?.replace(/_/g, ' '),
        ...attributes
      },
      last_changed: new Date().toISOString(),
      last_updated: new Date().toISOString(),
      context: { id: 'mock-context-id' }
    };
    return this;
  }

  public getServiceCalls() {
    return [...this._serviceCalls];
  }

  public getWSCalls() {
    return [...this._wsCalls];
  }

  public clearCalls() {
    this._serviceCalls = [];
    this._wsCalls = [];
  }

  public emitEvent(eventType: string, eventData: any = {}) {
    const listeners = this._eventListeners.get(eventType);
    if (listeners) {
      for (const listener of [...listeners]) {
        try {
          listener({ data: eventData });
        } catch {}
      }
    }
  }

  public build(): HomeAssistant {
    const builder = this;

    const connection = {
      sendMessagePromise: (msg: Record<string, unknown>) => {
        builder._wsCalls.push(msg);
        if (builder._wsHandler) {
          return Promise.resolve(builder._wsHandler(msg));
        }
        if (msg.type === 'config/area_registry/list') return Promise.resolve([]);
        if (msg.type === 'config/device_registry/list') return Promise.resolve([]);
        if (msg.type === 'config/entity_registry/list') return Promise.resolve([]);
        return Promise.resolve([]);
      },
      subscribeEvents: (callback: (event: any) => void, eventType: string) => {
        if (!builder._eventListeners.has(eventType)) {
          builder._eventListeners.set(eventType, new Set());
        }
        builder._eventListeners.get(eventType)!.add(callback);
        return () => {
          builder._eventListeners.get(eventType)?.delete(callback);
        };
      }
    };

    const hass: HomeAssistant = {
      states: builder._states,
      services: builder._services,
      config: {
        latitude: -33.8688,
        longitude: 151.2093,
        elevation: 0,
        unit_system: {
          length: 'km',
          mass: 'kg',
          temperature: '°C',
          volume: 'L',
          pressure: 'hPa',
          wind_speed: 'km/h',
          accumulated_precipitation: 'mm'
        },
        location_name: 'Home',
        time_zone: 'Australia/Sydney',
        components: ['sensor', 'light', 'climate'],
        config_dir: '/config',
        version: '2026.8.0',
        state: 'RUNNING'
      },
      themes: {
        default_theme: 'default',
        themes: {},
        darkMode: true
      },
      selectedTheme: 'default',
      language: 'en',
      locale: {
        language: 'en-AU',
        number_format: 'comma_decimal',
        time_format: '24',
        date_format: 'day_month_year',
        first_weekday: 'monday'
      },
      user: {
        id: 'mock-user-id',
        name: 'Mock User',
        is_owner: true,
        is_admin: true
      },
      localize: (key: string, ...args: any[]) => key,
      callService: async (domain: string, service: string, serviceData?: any, target?: any) => {
        builder._serviceCalls.push({ domain, service, data: serviceData, target });
        return { context: { id: 'call-service-id' } };
      },
      callApi: async <T>(_method: string, _path: string) => {
        return {} as T;
      },
      callWS: async <T>(msg: Record<string, unknown>) => {
        builder._wsCalls.push(msg);
        if (builder._wsHandler) {
          return (await builder._wsHandler(msg)) as T;
        }
        if (msg.type === 'lovelace/dashboards/list') {
          return [] as unknown as T;
        }
        return {} as T;
      },
      sendWS: (msg: Record<string, unknown>) => {
        builder._wsCalls.push(msg);
      },
      ...( { connection } as any)
    };

    return hass;
  }
}

export const createMockHass = (options: MockHassOptions = {}): HomeAssistant =>
  new MockHassBuilder(options).build();
