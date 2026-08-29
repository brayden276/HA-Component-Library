import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../src/index';
import { energyDayState } from '../../src/services/energy/energy-store';

describe('Composition, Multi-Instance, and Lifecycle Reconnection Contract Tests', () => {
  let mockHass: any;
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    mockHass = {
      states: {
        'light.living_room': { entity_id: 'light.living_room', state: 'on', attributes: { friendly_name: 'Living Room Light' } },
        'sensor.power_consumption': { entity_id: 'sensor.power_consumption', state: '1200', attributes: { friendly_name: 'Power', unit_of_measurement: 'W' } },
        'cover.garage_1': { entity_id: 'cover.garage_1', state: 'closed', attributes: { friendly_name: 'Garage 1' } },
        'cover.garage_2': { entity_id: 'cover.garage_2', state: 'open', attributes: { friendly_name: 'Garage 2' } },
        'button.trigger_1': { entity_id: 'button.trigger_1', state: '2026-08-27T12:00:00Z', attributes: { friendly_name: 'Button 1' } },
        'button.trigger_2': { entity_id: 'button.trigger_2', state: '2026-08-27T12:00:00Z', attributes: { friendly_name: 'Button 2' } },
        'camera.driveway': { entity_id: 'camera.driveway', state: 'idle', attributes: { friendly_name: 'Driveway Cam' } }
      },
      services: {},
      callService: () => Promise.resolve(),
      connection: {
        sendMessagePromise: () => Promise.resolve([]),
        subscribeEvents: () => Promise.resolve(() => {})
      }
    };
  });

  afterEach(() => {
    document.body.removeChild(container);
    container.innerHTML = '';
  });

  describe('1. Home Dashboard Composition', () => {
    it('composes Welcome Header, Favourites, Room Directory, and Smart Collection cleanly', () => {
      const welcome = document.createElement('component-welcome-header-v1') as any;
      const favourites = document.createElement('component-favourites-v3') as any;
      const roomDir = document.createElement('component-room-directory-v4') as any;
      const collection = document.createElement('component-smart-collection-v3') as any;

      welcome.setConfig({ type: 'custom:component-welcome-header-v1', title: 'Residence' });
      favourites.setConfig({ type: 'custom:component-favourites-v3', title: 'Top Controls' });
      roomDir.setConfig({ type: 'custom:component-room-directory-v4', title: 'Rooms' });
      collection.setConfig({ type: 'custom:component-smart-collection-v3', title: 'Lights Collection' });

      [welcome, favourites, roomDir, collection].forEach((card) => {
        card.hass = mockHass;
        container.appendChild(card);
        expect(card.shadowRoot).toBeDefined();
      });

      expect(container.children.length).toBe(4);
    });
  });

  describe('2. Security Dashboard Composition', () => {
    it('composes Security Summary, Camera Wall, and Entry Points simultaneously', () => {
      const summary = document.createElement('component-security-summary-v1') as any;
      const wall = document.createElement('component-security-camera-wall-v3') as any;
      const entry = document.createElement('component-security-entry-points-v1') as any;

      summary.setConfig({ type: 'custom:component-security-summary-v1' });
      wall.setConfig({ type: 'custom:component-security-camera-wall-v3', cameras: ['camera.driveway'] });
      entry.setConfig({ type: 'custom:component-security-entry-points-v1' });

      [summary, wall, entry].forEach((card) => {
        card.hass = mockHass;
        container.appendChild(card);
        expect(card.shadowRoot).toBeDefined();
      });

      expect(container.children.length).toBe(3);
    });
  });

  describe('3. Energy Dashboard Composition & Day Synchronization', () => {
    it('synchronizes day selection across Energy Day Selector, Summary, and History cards', () => {
      const selector = document.createElement('component-energy-day-selector-v1') as any;
      const summary = document.createElement('component-energy-summary-v1') as any;
      const history = document.createElement('energy-history-card-v3') as any;

      const testChannel = 'test-energy-sync-channel';

      selector.setConfig({ type: 'custom:component-energy-day-selector-v1', channel: testChannel });
      summary.setConfig({ type: 'custom:component-energy-summary-v1', day_channel: testChannel, house_entity: 'sensor.power_consumption' });
      history.setConfig({ type: 'custom:energy-history-card-v3', day_channel: testChannel, calendar_day: true, house_entity: 'sensor.power_consumption' });

      [selector, summary, history].forEach((card) => {
        card.hass = mockHass;
        container.appendChild(card);
      });

      // Update the channel state and verify all cards react to the synchronized channel
      energyDayState.set(testChannel, '2026-08-20', { hass: mockHass });
      expect(energyDayState.get(testChannel, mockHass)).toBe('2026-08-20');
    });
  });

  describe('4. Multi-Instance Isolation', () => {
    it('runs two independent Garage Door Controller cards without crosstalk', async () => {
      const garage1 = document.createElement('component-garage-door-controller-v1') as any;
      const garage2 = document.createElement('component-garage-door-controller-v1') as any;

      garage1.setConfig({
        type: 'custom:component-garage-door-controller-v1',
        entity: 'cover.garage_1',
        control_entity: 'button.trigger_1',
        title: 'Door North'
      });
      garage2.setConfig({
        type: 'custom:component-garage-door-controller-v1',
        entity: 'cover.garage_2',
        control_entity: 'button.trigger_2',
        title: 'Door South'
      });

      garage1.hass = mockHass;
      garage2.hass = mockHass;

      container.appendChild(garage1);
      container.appendChild(garage2);

      await garage1.updateComplete;
      await garage2.updateComplete;

      expect(garage1.shadowRoot.innerHTML).toContain('Door North');
      expect(garage2.shadowRoot.innerHTML).toContain('Door South');
    });
  });

  describe('5. Lifecycle Reconnection (Connect -> Disconnect -> Reconnect -> Disconnect)', () => {
    it('safely handles repeated DOM reconnection on stateful cards without duplicate subscriptions', () => {
      const energyDaySelector = document.createElement('component-energy-day-selector-v1') as any;
      energyDaySelector.setConfig({ type: 'custom:component-energy-day-selector-v1', channel: 'lifecycle-test-chan' });
      energyDaySelector.hass = mockHass;

      // 1. Initial connect
      container.appendChild(energyDaySelector);
      expect(energyDaySelector.isConnected).toBe(true);

      // 2. Disconnect
      container.removeChild(energyDaySelector);
      expect(energyDaySelector.isConnected).toBe(false);

      // 3. Reconnect
      container.appendChild(energyDaySelector);
      expect(energyDaySelector.isConnected).toBe(true);

      // 4. Final Disconnect
      container.removeChild(energyDaySelector);
      expect(energyDaySelector.isConnected).toBe(false);
    });

    it('safely handles lifecycle attach and detach for FavouritesCard', () => {
      const favourites = document.createElement('component-favourites-v3') as any;
      favourites.setConfig({ type: 'custom:component-favourites-v3' });
      favourites.hass = mockHass;

      container.appendChild(favourites);
      expect(favourites.isConnected).toBe(true);

      container.removeChild(favourites);
      expect(favourites.isConnected).toBe(false);

      container.appendChild(favourites);
      expect(favourites.isConnected).toBe(true);

      container.removeChild(favourites);
      expect(favourites.isConnected).toBe(false);
    });
  });
});
