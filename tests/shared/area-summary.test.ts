import { describe, it, expect } from 'vitest';
import { computeAreaStatusSummary } from '../../src/services/registry/area-summary';

describe('computeAreaStatusSummary Domain Service', () => {
  const createMockAreaTest = () => {
    const area: any = { area_id: 'living_room', name: 'Living Room' };
    const registry: any = {
      entities: [
        { entity_id: 'light.living_room_1', area_id: 'living_room' },
        { entity_id: 'light.living_room_2', area_id: 'living_room' },
        { entity_id: 'sensor.living_room_temp', area_id: 'living_room', device_class: 'temperature' },
        { entity_id: 'sensor.cpu_temperature', area_id: 'living_room', device_class: 'temperature' },
        { entity_id: 'binary_sensor.living_room_smoke', area_id: 'living_room', device_class: 'smoke' },
        { entity_id: 'cover.living_room_garage', area_id: 'living_room', device_class: 'garage' },
      ],
      deviceArea: new Map(),
    };

    const hass: any = {
      states: {
        'light.living_room_1': { entity_id: 'light.living_room_1', state: 'on' },
        'light.living_room_2': { entity_id: 'light.living_room_2', state: 'off' },
        'sensor.living_room_temp': {
          entity_id: 'sensor.living_room_temp',
          state: '22.4',
          attributes: { unit_of_measurement: '°C' },
        },
        'sensor.cpu_temperature': {
          entity_id: 'sensor.cpu_temperature',
          state: '58.0',
          attributes: { unit_of_measurement: '°C' },
        },
        'binary_sensor.living_room_smoke': {
          entity_id: 'binary_sensor.living_room_smoke',
          state: 'off',
          attributes: { device_class: 'smoke' },
        },
        'cover.living_room_garage': {
          entity_id: 'cover.living_room_garage',
          state: 'closed',
          attributes: { device_class: 'garage' },
        },
      },
      config: { unit_system: { temperature: '°C' } },
    };

    return { area, registry, hass };
  };

  it('computes temperature (excluding noisy internal CPU sensors) and light count', () => {
    const { area, registry, hass } = createMockAreaTest();
    const result = computeAreaStatusSummary(area, registry, hass);

    expect(result.lightsOn).toBe(1);
    expect(result.temperatureText).toBe('22.4 °C');
    expect(result.severity).toBe('active');
    expect(result.summary).toBe('22.4 °C · 1 light on');
  });

  it('flags critical severity when hazard alarms trigger', () => {
    const { area, registry, hass } = createMockAreaTest();
    hass.states['binary_sensor.living_room_smoke'].state = 'on';

    const result = computeAreaStatusSummary(area, registry, hass);
    expect(result.hasCritical).toBe(true);
    expect(result.severity).toBe('critical');
    expect(result.summary).toContain('Attention required');
  });

  it('flags warning severity when garage cover is open', () => {
    const { area, registry, hass } = createMockAreaTest();
    hass.states['cover.living_room_garage'].state = 'open';

    const result = computeAreaStatusSummary(area, registry, hass);
    expect(result.hasWarning).toBe(true);
    expect(result.severity).toBe('warning');
    expect(result.summary).toContain('Garage open');
  });
});
