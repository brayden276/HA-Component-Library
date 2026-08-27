import { describe, it, expect, beforeEach } from 'vitest';
import '../../src/index';

describe('Lovelace YAML Dashboard Configurations Compatibility Fixtures', () => {
  let mockHass: any;

  beforeEach(() => {
    mockHass = {
      states: {
        'light.living_room': {
          entity_id: 'light.living_room',
          state: 'on',
          attributes: { friendly_name: 'Living Room Light', brightness: 200 }
        },
        'sensor.power_consumption': {
          entity_id: 'sensor.power_consumption',
          state: '1420',
          attributes: { friendly_name: 'Power Consumption', unit_of_measurement: 'W' }
        },
        'climate.ac_unit': {
          entity_id: 'climate.ac_unit',
          state: 'heat',
          attributes: {
            friendly_name: 'Living Room Split',
            temperature: 22,
            current_temperature: 21,
            hvac_modes: ['off', 'heat', 'cool', 'auto'],
            fan_modes: ['auto', 'low', 'high']
          }
        },
        'cover.garage_door': {
          entity_id: 'cover.garage_door',
          state: 'closed',
          attributes: { friendly_name: 'Garage Door' }
        },
        'button.garage_door_operator': {
          entity_id: 'button.garage_door_operator',
          state: '2026-08-27T12:00:00Z',
          attributes: { friendly_name: 'Garage Door Button' }
        },
        'media_player.apple_tv': {
          entity_id: 'media_player.apple_tv',
          state: 'playing',
          attributes: {
            friendly_name: 'Apple TV 4K',
            media_title: 'Movie',
            media_artist: 'Artist',
            volume_level: 0.5
          }
        },
        'light.wled_strip': {
          entity_id: 'light.wled_strip',
          state: 'on',
          attributes: { friendly_name: 'WLED Strip', effect_list: ['Solid', 'Rainbow', 'Blink'] }
        },
        'camera.front_porch': {
          entity_id: 'camera.front_porch',
          state: 'idle',
          attributes: { friendly_name: 'Front Porch Camera' }
        },
        'alarm_control_panel.home_alarm': {
          entity_id: 'alarm_control_panel.home_alarm',
          state: 'armed_home',
          attributes: { friendly_name: 'Home Alarm' }
        }
      },
      services: {},
      callService: () => Promise.resolve(),
      connection: {
        sendMessagePromise: () => Promise.resolve([]),
        subscribeEvents: () => Promise.resolve(() => {})
      }
    };
  });

  const representativeDashboardFixtures: Array<{
    name: string;
    tag: string;
    yamlConfig: Record<string, any>;
  }> = [
    {
      name: 'Context Strip Header with Chips',
      tag: 'component-context-strip-v3',
      yamlConfig: {
        type: 'custom:component-context-strip-v3',
        title: 'Downstairs Living',
        chips: [
          { icon: 'mdi:thermometer', label: '21.5°C' },
          { icon: 'mdi:lightbulb', label: '3 On' }
        ]
      }
    },
    {
      name: 'Single KPI Metric Card',
      tag: 'component-single-kpi-v2',
      yamlConfig: {
        type: 'custom:component-single-kpi-v2',
        title: 'Solar Generation',
        value: '4.8 kW',
        status: 'Optimal production',
        icon: 'mdi:solar-power'
      }
    },
    {
      name: 'Three Stat Summary Row',
      tag: 'component-three-stat-v2',
      yamlConfig: {
        type: 'custom:component-three-stat-v2',
        stats: [
          { label: 'Import', value: '1.2 kW' },
          { label: 'Solar', value: '3.4 kW' },
          { label: 'House', value: '2.2 kW' }
        ]
      }
    },
    {
      name: 'Status Row Component',
      tag: 'component-status-row-v2',
      yamlConfig: {
        type: 'custom:component-status-row-v2',
        entity: 'sensor.power_consumption',
        name: 'Whole House Power',
        icon: 'mdi:flash'
      }
    },
    {
      name: 'Action Trigger Card',
      tag: 'component-action-v2',
      yamlConfig: {
        type: 'custom:component-action-v2',
        title: 'Goodnight All',
        icon: 'mdi:bed',
        service: 'scene.turn_on',
        service_data: { entity_id: 'scene.goodnight' }
      }
    },
    {
      name: 'Apple TV Remote Controller',
      tag: 'component-apple-tv-controller-v1',
      yamlConfig: {
        type: 'custom:component-apple-tv-controller-v1',
        entity: 'media_player.apple_tv',
        name: 'Living Room Apple TV'
      }
    },
    {
      name: 'Split System AC Controller V4',
      tag: 'component-split-controller-v4',
      yamlConfig: {
        type: 'custom:component-split-controller-v4',
        entity: 'climate.ac_unit',
        name: 'Daikin Split System'
      }
    },
    {
      name: 'WLED Strip Controller',
      tag: 'component-wled-controller-v1',
      yamlConfig: {
        type: 'custom:component-wled-controller-v1',
        entity: 'light.wled_strip',
        name: 'Cabinet Accent Lighting'
      }
    },
    {
      name: 'Garage Door Reed & Momentary Controller',
      tag: 'component-garage-door-controller-v1',
      yamlConfig: {
        type: 'custom:component-garage-door-controller-v1',
        entity: 'cover.garage_door',
        control_entity: 'button.garage_door_operator',
        title: 'Main Garage'
      }
    },
    {
      name: 'Camera Controller V2',
      tag: 'component-camera-controller-v2',
      yamlConfig: {
        type: 'custom:component-camera-controller-v2',
        camera_entity: 'camera.front_porch',
        title: 'Front Porch Feed'
      }
    },
    {
      name: 'Legacy Camera Controller V1 Adapter',
      tag: 'component-camera-controller-v1',
      yamlConfig: {
        type: 'custom:component-camera-controller-v1',
        camera_entity: 'camera.front_porch',
        title: 'Porch Cam V1'
      }
    },
    {
      name: 'Energy Day Selector Navigation Bar',
      tag: 'component-energy-day-selector-v1',
      yamlConfig: {
        type: 'custom:component-energy-day-selector-v1',
        channel: 'energy-day'
      }
    },
    {
      name: 'Energy Summary Power Tile',
      tag: 'component-energy-summary-v1',
      yamlConfig: {
        type: 'custom:component-energy-summary-v1',
        house_entity: 'sensor.power_consumption',
        day_channel: 'energy-day'
      }
    },
    {
      name: 'Solar Daylight Card V7',
      tag: 'solar-daylight-card-v7',
      yamlConfig: {
        type: 'custom:solar-daylight-card-v7',
        solar_entity: 'sensor.power_consumption'
      }
    },
    {
      name: 'Energy History 24h/Day Card V3',
      tag: 'energy-history-card-v3',
      yamlConfig: {
        type: 'custom:energy-history-card-v3',
        house_entity: 'sensor.power_consumption',
        calendar_day: true,
        day_channel: 'energy-day'
      }
    },
    {
      name: 'Favourites V3 Grid Card',
      tag: 'component-favourites-v3',
      yamlConfig: {
        type: 'custom:component-favourites-v3',
        title: 'Frequent Controls',
        max: 4
      }
    },
    {
      name: 'Favourites Minimal V1 Adapter',
      tag: 'component-favourites-minimal-v1',
      yamlConfig: {
        type: 'custom:component-favourites-minimal-v1',
        preference_key: 'home-control.favourites.v1'
      }
    },
    {
      name: 'Home Overview V4 Board',
      tag: 'component-home-overview-v4',
      yamlConfig: {
        type: 'custom:component-home-overview-v4',
        title: 'Residence Overview'
      }
    },
    {
      name: 'Home Overview V5 Alias',
      tag: 'component-home-overview-v5',
      yamlConfig: {
        type: 'custom:component-home-overview-v5',
        title: 'Residence Overview V5'
      }
    },
    {
      name: 'Security Summary Panel',
      tag: 'component-security-summary-v1',
      yamlConfig: {
        type: 'custom:component-security-summary-v1',
        title: 'Perimeter Alarm'
      }
    },
    {
      name: 'Security Camera Wall V3',
      tag: 'component-security-camera-wall-v3',
      yamlConfig: {
        type: 'custom:component-security-camera-wall-v3',
        cameras: ['camera.front_porch']
      }
    },
    {
      name: 'Room Navigation Tile',
      tag: 'component-room-navigation-v1',
      yamlConfig: {
        type: 'custom:component-room-navigation-v1',
        area: 'living_room',
        navigation_path: '/lovelace/living-room'
      }
    },
    {
      name: 'Empty State V3 Card',
      tag: 'component-empty-state-v3',
      yamlConfig: {
        type: 'custom:component-empty-state-v3',
        title: 'All Clear',
        message: 'No pending alerts at this time.'
      }
    },
    {
      name: 'Empty State V2 Adapter',
      tag: 'component-empty-state-v2',
      yamlConfig: {
        type: 'custom:component-empty-state-v2',
        title: 'No issues',
        message: 'Everything running smoothly.'
      }
    }
  ];

  for (const fixture of representativeDashboardFixtures) {
    it(`accepts real YAML config for ${fixture.name} (${fixture.tag})`, () => {
      const el = document.createElement(fixture.tag) as any;
      expect(el).toBeDefined();
      expect(typeof el.setConfig).toBe('function');

      // Call setConfig with raw YAML object
      el.setConfig(fixture.yamlConfig);
      el.hass = mockHass;
      document.body.appendChild(el);

      expect(el.shadowRoot).toBeDefined();
      expect(typeof el.getCardSize).toBe('function');
      expect(el.getCardSize()).toBeGreaterThan(0);

      document.body.removeChild(el);
    });
  }
});
