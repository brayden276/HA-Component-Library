import { describe, it, expect } from 'vitest';
import "../../src/cards/garage-door/garage-door-card";
import "../../src/cards/wled/wled-card";
import "../../src/cards/split-ac/split-ac-card";
import "../../src/cards/apple-tv/apple-tv-card";
import "../../src/cards/camera/camera-card";
import { createMockHass } from '../fixtures/mock-hass';

describe('Stage 4 Device Controllers Contract Tests', () => {
  const hass = createMockHass({
    states: {
      'binary_sensor.garage_door': {
        state: 'off',
        attributes: { friendly_name: 'Garage Door Status', device_class: 'garage_door' }
      } as any,
      'button.garage_door_operator': {
        state: '2026-08-27T00:00:00Z',
        attributes: { friendly_name: 'Garage Door Operator' }
      } as any,
      'climate.living_room_split': {
        state: 'heat',
        attributes: {
          friendly_name: 'Living Room Split',
          current_temperature: 21.0,
          temperature: 23.0,
          hvac_modes: ['off', 'heat', 'cool', 'auto'],
          fan_modes: ['auto', 'low', 'medium', 'high']
        }
      } as any,
      'light.wled_strip': {
        state: 'on',
        attributes: {
          friendly_name: 'WLED Strip',
          brightness: 180,
          effect_list: ['Solid', 'Blink', 'Rainbow']
        }
      } as any,
      'media_player.apple_tv': {
        state: 'playing',
        attributes: { friendly_name: 'Apple TV Living Room' }
      } as any,
      'remote.apple_tv': {
        state: 'on',
        attributes: { friendly_name: 'Apple TV Remote' }
      } as any
    }
  });

  it('component-garage-door-controller-v1 requires entity and control_entity', async () => {
    const el = document.createElement('component-garage-door-controller-v1') as any;
    expect(() => el.setConfig({})).toThrowError('A garage-door state entity is required');
    expect(() => el.setConfig({ entity: 'binary_sensor.garage_door' })).toThrowError(
      'A garage-door control entity is required'
    );

    el.setConfig({
      entity: 'binary_sensor.garage_door',
      control_entity: 'button.garage_door_operator'
    });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(1);
    expect(el.shadowRoot.textContent).toContain('Garage door');
    expect(el.shadowRoot.textContent).toContain('Closed');
    el.remove();
  });

  it('component-wled-controller-v1 requires entity and renders power and brightness', async () => {
    const el = document.createElement('component-wled-controller-v1') as any;
    expect(() => el.setConfig({})).toThrowError('WLED controller requires entity');

    el.setConfig({ entity: 'light.wled_strip' });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(2);
    expect(el.shadowRoot.textContent).toContain('WLED');
    expect(el.shadowRoot.querySelector('button.power')).not.toBeNull();
    el.remove();
  });

  it('component-split-controller-v4 requires climate entity and renders temperature', async () => {
    const el = document.createElement('component-split-controller-v4') as any;
    expect(() => el.setConfig({})).toThrowError('A climate entity is required');

    el.setConfig({ entity: 'climate.living_room_split' });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(1);
    expect(el.shadowRoot.textContent).toContain('Living Room Split');
    expect(el.shadowRoot.textContent).toContain('21°');
    expect(el.shadowRoot.textContent).toContain('23°');
    el.remove();
  });

  it('component-apple-tv-controller-v1 renders remote when remote_entity is configured', async () => {
    const el = document.createElement('component-apple-tv-controller-v1') as any;
    el.setConfig({
      entity: 'media_player.apple_tv',
      remote_entity: 'remote.apple_tv'
    });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(4);
    expect(el.shadowRoot.querySelector('.remote')).not.toBeNull();
    expect(el.shadowRoot.querySelector('.dpad')).not.toBeNull();
    el.remove();
  });

  it('component-camera-controller-v2 and v1 adapter render camera controller', async () => {
    const v2 = document.createElement('component-camera-controller-v2') as any;
    v2.setConfig({ profile: 'household-security' });
    v2.hass = hass;
    document.body.appendChild(v2);
    await v2.updateComplete;

    expect(v2.getCardSize()).toBe(1);
    expect(v2.shadowRoot.querySelector('button.view')).not.toBeNull();
    v2.remove();

    const v1 = document.createElement('component-camera-controller-v1') as any;
    v1.setConfig({ profile: 'household-security' });
    v1.hass = hass;
    document.body.appendChild(v1);
    await v1.updateComplete;

    expect(v1.getCardSize()).toBe(1);
    v1.remove();
  });
});
