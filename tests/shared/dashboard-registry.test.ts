import { describe, it, expect, vi } from 'vitest';
import {
  DashboardRegistryCoordinator,
  stateNameOf,
  areaOf,
  uiEntry,
} from '../../src/services/registry/dashboard-registry';
import { domainOf } from '../../src/utils/entity';

describe('DashboardRegistryCoordinator and Registry Helpers', () => {
  const createMockConnection = () => {
    let callCount = 0;
    const wsCalls: any[] = [];
    const eventSubs: { type: string; callback: (e: any) => void }[] = [];

    const connection = {
      sendMessagePromise: async (msg: any) => {
        callCount += 1;
        wsCalls.push(msg);
        if (msg.type === 'config/area_registry/list') {
          return [{ area_id: 'living_room', name: 'Living Room' }];
        }
        if (msg.type === 'config/device_registry/list') {
          return [{ id: 'dev_1', area_id: 'living_room', name: 'Hue Bridge' }];
        }
        if (msg.type === 'config/entity_registry/list') {
          return [
            {
              entity_id: 'light.living_room_light',
              device_id: 'dev_1',
              area_id: 'living_room',
              name: 'Living Light',
            },
          ];
        }
        return [];
      },
      subscribeEvents: async (callback: (e: any) => void, eventType: string) => {
        eventSubs.push({ type: eventType, callback });
        return () => {
          const idx = eventSubs.findIndex((s) => s.callback === callback);
          if (idx >= 0) eventSubs.splice(idx, 1);
        };
      },
      get callCount() {
        return callCount;
      },
      get eventSubs() {
        return eventSubs;
      },
    };

    const hass: any = {
      connection,
      callWS: async () => [],
      states: {
        'light.living_room_light': {
          entity_id: 'light.living_room_light',
          state: 'on',
          attributes: { friendly_name: 'Living Room Light Friendly' },
        },
      },
    };

    return { hass, connection };
  };

  it('loads and caches registries per HomeAssistant connection', async () => {
    const coordinator = new DashboardRegistryCoordinator();
    const { hass, connection } = createMockConnection();

    const data1 = await coordinator.load(hass);
    expect(data1.areas).toHaveLength(1);
    expect(data1.devices).toHaveLength(1);
    expect(data1.entities).toHaveLength(1);
    expect(data1.deviceArea.get('dev_1')).toBe('living_room');
    expect(data1.byDevice.get('dev_1')).toHaveLength(1);
    expect(connection.callCount).toBe(3);

    // Second call without force should return cached data without extra WS calls
    const data2 = await coordinator.load(hass);
    expect(data2).toBe(data1);
    expect(connection.callCount).toBe(3);

    coordinator.detach();
  });

  it('subscribes and notifies listeners on registry events', async () => {
    const coordinator = new DashboardRegistryCoordinator();
    const { hass, connection } = createMockConnection();

    const callback = vi.fn();
    const unsubscribe = coordinator.subscribe(hass, callback);

    // Wait for initial load
    await new Promise((r) => setTimeout(r, 10));
    expect(callback).toHaveBeenCalledTimes(1);
    expect(connection.eventSubs).toHaveLength(3);

    // Trigger an entity registry update
    const entitySub = connection.eventSubs.find(
      (s) => s.type === 'entity_registry_updated',
    );
    expect(entitySub).toBeTruthy();

    await coordinator.refresh();
    expect(callback).toHaveBeenCalledTimes(2);

    unsubscribe();
    expect(coordinator.data).toBeNull();
  });

  it('handles empty or broken connections gracefully', async () => {
    const coordinator = new DashboardRegistryCoordinator();
    const data = await coordinator.load(null);
    expect(data).toEqual({
      areas: [],
      devices: [],
      entities: [],
      dashboards: [],
      deviceArea: new Map(),
      byDevice: new Map(),
      areaMap: new Map(),
    });
  });

  it('helpers domainOf, stateNameOf, areaOf, uiEntry operate accurately', () => {
    expect(domainOf('light.kitchen_lights')).toBe('light');
    expect(domainOf(null)).toBe('');

    const entry: any = {
      entity_id: 'light.kitchen_lights',
      name: 'Custom Kitchen Light',
      original_name: 'Original Kitchen',
      device_id: 'dev_10',
    };
    const state: any = {
      entity_id: 'light.kitchen_lights',
      state: 'on',
      attributes: { friendly_name: 'Friendly Kitchen' },
    };

    expect(stateNameOf(null, entry, state)).toBe('Custom Kitchen Light');
    expect(stateNameOf(null, { ...entry, name: undefined }, state)).toBe('Original Kitchen');
    expect(stateNameOf(null, null, state)).toBe('Friendly Kitchen');
    expect(stateNameOf(null, null, null)).toBe('Control');

    const reg: any = {
      deviceArea: new Map([['dev_10', 'kitchen_area']]),
    };
    expect(areaOf(entry, reg)).toBe('kitchen_area');
    expect(areaOf({ ...entry, area_id: 'direct_area' }, reg)).toBe('direct_area');

    expect(uiEntry(entry)).toBe(true);
    expect(uiEntry({ ...entry, disabled_by: 'user' })).toBe(false);
    expect(uiEntry({ ...entry, hidden_by: 'integration' })).toBe(false);
    expect(uiEntry({ ...entry, entity_category: 'diagnostic' })).toBe(false);
  });
});
