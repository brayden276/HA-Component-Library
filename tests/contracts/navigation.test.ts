import { describe, it, expect } from 'vitest';
import "../../src/cards/quick-nav/quick-nav-card";
import "../../src/cards/nav-tile/nav-tile-card";
import "../../src/cards/room-navigation/room-navigation-card";
import "../../src/cards/room-sheet/room-sheet-card";
import { createMockHass } from '../fixtures/mock-hass';

describe('Stage 2 Navigation Cards Contract Tests', () => {
  const hass = createMockHass({
    states: {
      'light.living_room': { state: 'on', attributes: { friendly_name: 'Living Room Light' } } as any,
      'sensor.living_room_temperature': {
        state: '21.5',
        attributes: { device_class: 'temperature', unit_of_measurement: '°C' }
      } as any
    }
  });

  it('component-quick-nav-v2 renders context and action chips', async () => {
    const el = document.createElement('component-quick-nav-v2') as any;
    el.setConfig({
      left_text: 'Living Area',
      action_1_text: 'Lights',
      action_1_path: '/lovelace/lights',
      action_2_text: 'Climate',
      action_2_path: '/lovelace/climate'
    });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(1);
    expect(el.shadowRoot.textContent).toContain('Living Area');
    expect(el.shadowRoot.textContent).toContain('Lights');
    expect(el.shadowRoot.textContent).toContain('Climate');
    el.remove();
  });

  it('component-nav-tile-v2 renders destination title and context', async () => {
    const el = document.createElement('component-nav-tile-v2') as any;
    el.setConfig({
      title: 'Master Bedroom',
      context: '2 lights on',
      navigation_path: '/lovelace/bedroom'
    });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(1);
    expect(el.shadowRoot.textContent).toContain('Master Bedroom');
    expect(el.shadowRoot.textContent).toContain('2 lights on');
    expect(el.shadowRoot.querySelector('button.i.nav')).not.toBeNull();
    el.remove();
  });

  it('component-room-navigation-v1 requires area and navigation_path', async () => {
    const el = document.createElement('component-room-navigation-v1') as any;
    expect(() => el.setConfig({})).toThrowError('area is required');
    expect(() => el.setConfig({ area: 'living_room' })).toThrowError('navigation_path is required');

    el.setConfig({
      name: 'Living Room',
      area: 'living_room',
      navigation_path: '/lovelace/living-room'
    });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(1);
    expect(el.shadowRoot.textContent).toContain('Living Room');
    el.remove();
  });

  it('component-room-sheet-v2 renders sections and control rows', async () => {
    const el = document.createElement('component-room-sheet-v2') as any;
    el.setConfig({
      title: 'Kitchen Controls',
      rows: [
        { section: 'Environment', name: 'Kitchen Temp', value: '22°C' },
        { section: 'Lighting', name: 'Downlights', state: 'On', value: '80%' }
      ]
    });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(5);
    expect(el.shadowRoot.textContent).toContain('Kitchen Controls');
    expect(el.shadowRoot.textContent).toContain('Environment');
    expect(el.shadowRoot.textContent).toContain('Kitchen Temp');
    expect(el.shadowRoot.textContent).toContain('Lighting');
    expect(el.shadowRoot.textContent).toContain('Downlights');
    el.remove();
  });

  it('component-nav-tile-v2 renders static div when navigation_path is null', async () => {
    const el = document.createElement('component-nav-tile-v2') as any;
    el.setConfig({
      title: 'Static Destination',
      context: 'Informational',
      navigation_path: null
    });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot.querySelector('div.nav.nav-static')).not.toBeNull();
    expect(el.shadowRoot.querySelector('button.nav')).toBeNull();
    el.remove();
  });

  it('component-quick-nav-v2 handles entity state and unavailable fallback', async () => {
    const el = document.createElement('component-quick-nav-v2') as any;
    el.setConfig({
      left_entity: 'sensor.living_room_temperature',
      action_1_text: 'Lights',
      action_1_path: '/lovelace/lights'
    });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot.querySelector('#context-icon')).not.toBeNull();
    expect(el.shadowRoot.textContent).toContain('21.5');

    // Test unavailable entity fallback
    el.setConfig({
      left_entity: 'sensor.missing_sensor'
    });
    await el.updateComplete;
    expect(el.shadowRoot.textContent).toContain('Unavailable');
    el.remove();
  });

  it('component-room-navigation-v1 handles demo presence and grid options', async () => {
    const el = document.createElement('component-room-navigation-v1') as any;
    el.setConfig({
      name: 'Living Room',
      area: 'living_room',
      navigation_path: '/lovelace/living-room',
      demo_presence: true
    });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    const card = el.shadowRoot.querySelector('ha-card');
    expect(card.getAttribute('data-presence')).toBe('');
    expect(card.getAttribute('style')).toContain('border-color: hsl(');
    expect(el.constructor.getGridOptions()).toEqual({ columns: 6, rows: 1 });
    el.remove();
  });

  it('component-room-sheet-v2 renders default fallback rows and handles empty config', async () => {
    const el = document.createElement('component-room-sheet-v2') as any;
    el.setConfig({
      title: 'Default Room Sheet'
    });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(5);
    expect(el.shadowRoot.textContent).toContain('Default Room Sheet');
    expect(el.shadowRoot.textContent).toContain('Room state');
    expect(el.shadowRoot.textContent).toContain('Controls');
    el.remove();
  });
});

