import { describe, it, expect } from 'vitest';
import { loadDashboardRegistries } from '../../src/services/registry/registry-cache';

describe('loadDashboardRegistries', () => {
  it('loads and caches registries per connection instance', async () => {
    let callCount = 0;
    const mockConnection = {
      sendMessagePromise: async (msg: any) => {
        callCount += 1;
        if (msg.type === 'config/area_registry/list') return [{ area_id: 'living_room', name: 'Living Room' }];
        if (msg.type === 'config/device_registry/list') return [{ id: 'dev_1', area_id: 'living_room' }];
        if (msg.type === 'config/entity_registry/list') return [{ entity_id: 'light.living_room', device_id: 'dev_1' }];
        return [];
      }
    };

    const registries1 = await loadDashboardRegistries(mockConnection);
    expect(registries1.areas).toHaveLength(1);
    expect(registries1.devices).toHaveLength(1);
    expect(registries1.entities).toHaveLength(1);
    expect(callCount).toBe(3);

    // Second call should return cached object without new WS queries
    const registries2 = await loadDashboardRegistries(mockConnection);
    expect(registries2).toBe(registries1);
    expect(callCount).toBe(3);
  });

  it('handles empty or broken connections gracefully', async () => {
    const registries = await loadDashboardRegistries(null);
    expect(registries).toEqual({ areas: [], devices: [], entities: [] });
  });
});
