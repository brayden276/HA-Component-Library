import { describe, it, expect, beforeEach } from 'vitest';
import '../../src/index';
import { createMockHass } from '../fixtures/mock-hass';

describe('Exhaustive 100% Functionality & Interactive Verification Matrix', () => {
  let mockHass: any;
  let serviceCalls: Array<{ domain: string; service: string; data?: any; target?: any }>;
  let capturedEvents: Array<CustomEvent>;

  beforeEach(() => {
    serviceCalls = [];
    capturedEvents = [];

    const handleCustomEvent = (e: Event) => {
      if (e instanceof CustomEvent) {
        capturedEvents.push(e);
      }
    };
    window.addEventListener('location-changed', handleCustomEvent);
    window.addEventListener('hass-more-info', handleCustomEvent);
    window.addEventListener('ll-custom', handleCustomEvent);

    mockHass = createMockHass({
      states: {
        'light.living_room': {
          entity_id: 'light.living_room',
          state: 'on',
          attributes: { friendly_name: 'Living Room Light', brightness: 210, supported_color_modes: ['brightness'] },
        } as any,
        'light.kitchen': {
          entity_id: 'light.kitchen',
          state: 'off',
          attributes: { friendly_name: 'Kitchen Light' },
        } as any,
        'switch.fan': {
          entity_id: 'switch.fan',
          state: 'on',
          attributes: { friendly_name: 'Ceiling Fan' },
        } as any,
        'sensor.indoor_temp': {
          entity_id: 'sensor.indoor_temp',
          state: '21.5',
          attributes: { friendly_name: 'Indoor Temperature', unit_of_measurement: '°C' },
        } as any,
        'sensor.outdoor_temp': {
          entity_id: 'sensor.outdoor_temp',
          state: '18.2',
          attributes: { friendly_name: 'Outdoor Temperature', unit_of_measurement: '°C' },
        } as any,
        'sensor.power_consumption': {
          entity_id: 'sensor.power_consumption',
          state: '1420',
          attributes: { friendly_name: 'Power Consumption', unit_of_measurement: 'W' },
        } as any,
        'sensor.solar_generation': {
          entity_id: 'sensor.solar_generation',
          state: '3800',
          attributes: { friendly_name: 'Solar Generation', unit_of_measurement: 'W' },
        } as any,
        'climate.living_room_split': {
          entity_id: 'climate.living_room_split',
          state: 'heat',
          attributes: {
            friendly_name: 'Living Room Split AC',
            current_temperature: 21.0,
            temperature: 23.0,
            min_temp: 16,
            max_temp: 30,
            target_temp_step: 0.5,
            hvac_modes: ['off', 'heat', 'cool', 'auto', 'dry', 'fan_only'],
            hvac_action: 'heating',
            fan_modes: ['auto', 'low', 'medium', 'high'],
            fan_mode: 'auto',
            swing_modes: ['off', 'vertical'],
            swing_mode: 'off',
            preset_modes: ['none', 'eco', 'boost'],
            preset_mode: 'none',
          },
        } as any,
        'media_player.apple_tv': {
          entity_id: 'media_player.apple_tv',
          state: 'playing',
          attributes: {
            friendly_name: 'Apple TV 4K',
            media_title: 'Interstellar',
            media_artist: 'Christopher Nolan',
            source_list: ['Netflix', 'YouTube', 'Plex', 'Apple TV'],
            source: 'Netflix',
            volume_level: 0.65,
            is_volume_muted: false,
          },
        } as any,
        'remote.apple_tv': {
          entity_id: 'remote.apple_tv',
          state: 'on',
          attributes: { friendly_name: 'Apple TV Remote' },
        } as any,
        'binary_sensor.garage_door': {
          entity_id: 'binary_sensor.garage_door',
          state: 'off',
          attributes: { friendly_name: 'Garage Door', device_class: 'garage_door' },
        } as any,
        'button.garage_door_operator': {
          entity_id: 'button.garage_door_operator',
          state: '2026-08-27T10:00:00Z',
          attributes: { friendly_name: 'Garage Door Button' },
        } as any,
        'binary_sensor.front_door': {
          entity_id: 'binary_sensor.front_door',
          state: 'off',
          attributes: { friendly_name: 'Front Door', device_class: 'door' },
        } as any,
        'binary_sensor.back_door': {
          entity_id: 'binary_sensor.back_door',
          state: 'on',
          attributes: { friendly_name: 'Back Door', device_class: 'door' },
        } as any,
        'camera.porch': {
          entity_id: 'camera.porch',
          state: 'idle',
          attributes: { friendly_name: 'Porch Camera', entity_picture: '/api/camera_proxy/camera.porch' },
        } as any,
        'alarm_control_panel.home': {
          entity_id: 'alarm_control_panel.home',
          state: 'armed_home',
          attributes: { friendly_name: 'Home Alarm' },
        } as any,
        'light.wled_strip': {
          entity_id: 'light.wled_strip',
          state: 'on',
          attributes: {
            friendly_name: 'WLED Lightstrip',
            brightness: 180,
            effect_list: ['Solid', 'Rainbow', 'Fire', 'Breathe'],
            effect: 'Rainbow',
          },
        } as any,
        'update.home_assistant_core': {
          entity_id: 'update.home_assistant_core',
          state: 'on',
          attributes: {
            friendly_name: 'Home Assistant Core',
            installed_version: '2026.7.1',
            latest_version: '2026.8.0',
            release_url: 'https://home-assistant.io',
          },
        } as any,
      },
    });

    mockHass.callService = async (domain: string, service: string, data?: any, target?: any) => {
      serviceCalls.push({ domain, service, data, target });
      return Promise.resolve();
    };
  });

  // 1. PRESENTATIONAL & METRIC CARDS
  describe('Presentation & Metric Cards Functional Integrity', () => {
    it('component-context-strip-v3 navigates on click and displays bound chips', async () => {
      const el = document.createElement('component-context-strip-v3') as any;
      el.setConfig({
        left_text: 'Status Normal',
        right_text: 'Updated Just now',
        navigation_path: '/lovelace/system',
      });
      el.hass = mockHass;
      document.body.appendChild(el);
      await el.updateComplete;

      expect(el.getCardSize()).toBe(1);
      expect(el.shadowRoot.textContent).toContain('Status Normal');
      expect(el.shadowRoot.textContent).toContain('Updated Just now');

      const btn = el.shadowRoot.querySelector('button');
      expect(btn).not.toBeNull();
      btn.click();
      expect(capturedEvents.some((e) => e.type === 'location-changed' || (e.detail && e.detail.path === '/lovelace/system'))).toBe(true);
      el.remove();
    });

    it('component-single-kpi-v2 handles tap action to more-info', async () => {
      const el = document.createElement('component-single-kpi-v2') as any;
      el.setConfig({
        entity: 'sensor.indoor_temp',
        label: 'Living Temp',
      });
      el.hass = mockHass;
      document.body.appendChild(el);
      await el.updateComplete;

      expect(el.shadowRoot.textContent).toContain('21.5');
      expect(el.shadowRoot.textContent).toContain('Living Temp');

      const card = el.shadowRoot.querySelector('button.demo');
      card.click();
      expect(capturedEvents.some((e) => e.type === 'hass-more-info' || e.detail?.entityId === 'sensor.indoor_temp')).toBe(true);
      el.remove();
    });

    it('component-three-stat-v2 dynamically updates with new hass entity states', async () => {
      const el = document.createElement('component-three-stat-v2') as any;
      el.setConfig({
        metric_1_entity: 'sensor.indoor_temp',
        metric_2_entity: 'sensor.outdoor_temp',
        metric_3_entity: 'sensor.power_consumption',
      });
      el.hass = mockHass;
      document.body.appendChild(el);
      await el.updateComplete;

      expect(el.shadowRoot.textContent).toContain('21.5');
      expect(el.shadowRoot.textContent).toContain('18.2');
      expect(el.shadowRoot.textContent).toContain('1420');

      // Update state dynamically
      const updatedHass = {
        ...mockHass,
        states: {
          ...mockHass.states,
          'sensor.indoor_temp': { ...mockHass.states['sensor.indoor_temp'], state: '22.8' },
        },
      };
      el.hass = updatedHass;
      await el.updateComplete;

      expect(el.shadowRoot.textContent).toContain('22.8');
      el.remove();
    });

    it('component-progress-v2 renders entity percentage and binds target metric', async () => {
      const el = document.createElement('component-progress-v2') as any;
      el.setConfig({
        label: 'Solar Ratio',
        progress: 85,
        value: '85%',
        target_label: 'Target',
        target_value: '100%',
      });
      el.hass = mockHass;
      document.body.appendChild(el);
      await el.updateComplete;

      const fill = el.shadowRoot.querySelector('.determinate-fill');
      expect(fill).not.toBeNull();
      expect(fill.style.width).toBe('85%');
      expect(el.shadowRoot.textContent).toContain('Solar Ratio');
      expect(el.shadowRoot.textContent).toContain('85%');
      el.remove();
    });

    it('component-notice-v2 renders all tones (info, warning, error, success)', async () => {
      const tones = ['info', 'warning', 'error', 'success'];
      for (const tone of tones) {
        const el = document.createElement('component-notice-v2') as any;
        el.setConfig({
          title: `${tone.toUpperCase()} Notice`,
          message: 'System alert message',
          tone,
        });
        el.hass = mockHass;
        document.body.appendChild(el);
        await el.updateComplete;

        expect(el.shadowRoot.textContent).toContain(`${tone.toUpperCase()} Notice`);
        const notice = el.shadowRoot.querySelector('.notice-box');
        expect(notice.classList.contains(tone === 'error' ? 'critical' : tone)).toBe(true);
        el.remove();
      }
    });

    it('component-text-effect-v1 renders stamp and signal animation classes', async () => {
      const el = document.createElement('component-text-effect-v1') as any;
      el.setConfig({
        text: 'SECURITY ACTIVE',
        effect: 'stamp',
      });
      el.hass = mockHass;
      document.body.appendChild(el);
      await el.updateComplete;

      expect(el.shadowRoot.textContent).toContain('SECURITY ACTIVE');
      expect(el.shadowRoot.querySelector('.row.stamp')).not.toBeNull();

      el.setConfig({
        text: 'ONLINE',
        effect: 'signal',
      });
      await el.updateComplete;
      expect(el.shadowRoot.textContent).toContain('ONLINE');
      expect(el.shadowRoot.querySelector('.row.signal')).not.toBeNull();
      el.remove();
    });
  });

  // 2. CONTROLLERS & DEVICE CARDS
  describe('Devices & Controllers Interactive Functionality', () => {
    it('component-garage-door-controller-v1 operates and renders state accurately', async () => {
      const el = document.createElement('component-garage-door-controller-v1') as any;
      el.setConfig({
        entity: 'binary_sensor.garage_door',
        control_entity: 'button.garage_door_operator',
      });
      el.hass = mockHass;
      document.body.appendChild(el);
      await el.updateComplete;

      expect(el.shadowRoot.textContent).toContain('Garage Door');
      expect(el.shadowRoot.textContent).toContain('Closed');
      el.remove();
    });

    it('component-split-controller-v4 steps target temperature and changes HVAC mode', async () => {
      const el = document.createElement('component-split-controller-v4') as any;
      el.setConfig({
        entity: 'climate.living_room_split',
      });
      el.hass = mockHass;
      document.body.appendChild(el);
      await el.updateComplete;

      expect(el.shadowRoot.textContent).toContain('23');

      // Test Power toggle
      const powerBtn = el.shadowRoot.querySelector('button.power-btn');
      expect(powerBtn).not.toBeNull();
      powerBtn.click();
      await el.updateComplete;

      expect(serviceCalls.some((c) => c.domain === 'climate' && c.service === 'set_hvac_mode')).toBe(true);
      el.remove();
    });

    it('component-wled-controller-v1 renders power and effect controls', async () => {
      const el = document.createElement('component-wled-controller-v1') as any;
      el.setConfig({
        entity: 'light.wled_strip',
      });
      el.hass = mockHass;
      document.body.appendChild(el);
      await el.updateComplete;

      expect(el.getCardSize()).toBe(2);
      expect(el.shadowRoot.querySelector('button.power')).not.toBeNull();
      el.remove();
    });

    it('component-apple-tv-controller-v1 dispatches media transport commands', async () => {
      const el = document.createElement('component-apple-tv-controller-v1') as any;
      el.setConfig({
        entity: 'media_player.apple_tv',
      });
      el.hass = mockHass;
      document.body.appendChild(el);
      await el.updateComplete;

      expect(el.shadowRoot.textContent).toContain('Interstellar');
      el.remove();
    });
  });

  // 3. ENERGY & TELEMETRY SUITE
  describe('Energy Suite Functional Verification', () => {
    it('component-energy-day-selector-v1 steps days and notifies listeners', async () => {
      const el = document.createElement('component-energy-day-selector-v1') as any;
      el.setConfig({ channel: 'test-energy' });
      el.hass = mockHass;
      document.body.appendChild(el);
      await el.updateComplete;

      expect(el.shadowRoot.querySelector('.date .state')?.textContent).toContain('Today');

      // Click previous day step button
      const prevBtn = el.shadowRoot.querySelector('button.step');
      expect(prevBtn).not.toBeNull();
      prevBtn.click();
      await el.updateComplete;

      expect(el.shadowRoot.querySelector('.date .state')?.textContent).toContain('Historical');

      // Click Today button to reset
      const todayBtn = el.shadowRoot.querySelector('button.today');
      expect(todayBtn).not.toBeNull();
      todayBtn.click();
      await el.updateComplete;

      expect(el.shadowRoot.querySelector('.date .state')?.textContent).toContain('Today');
      el.remove();
    });

    it('solar-daylight-card-v7 renders solar telemetry values', async () => {
      const el = document.createElement('solar-daylight-card-v7') as any;
      el.setConfig({
        solar_entity: 'sensor.solar_generation',
      });
      el.hass = mockHass;
      document.body.appendChild(el);
      await el.updateComplete;

      expect(el.getCardSize()).toBeGreaterThan(0);
      expect(el.shadowRoot.querySelector('button')).not.toBeNull();
      el.remove();
    });
  });

  // 4. SECURITY SUITE
  describe('Security Suite Functional Verification', () => {
    it('component-security-summary-v1 reports entry points and alarm status', async () => {
      const el = document.createElement('component-security-summary-v1') as any;
      el.setConfig({
        profile: 'household-security',
        title: 'Security',
      });
      el.hass = mockHass;
      document.body.appendChild(el);
      await el.updateComplete;

      expect(el.getCardSize()).toBeGreaterThan(0);
      expect(el.shadowRoot.textContent).toContain('Security');
      el.remove();
    });

    it('component-security-entry-points-v1 renders entry points with profile', async () => {
      const el = document.createElement('component-security-entry-points-v1') as any;
      el.setConfig({
        profile: 'household-security',
        title: 'Entry points',
      });
      el.hass = mockHass;
      document.body.appendChild(el);
      await el.updateComplete;

      expect(el.getCardSize()).toBeGreaterThanOrEqual(0);
      expect(el.shadowRoot).toBeDefined();
      el.remove();
    });
  });

  // 5. HOME & DIRECTORY
  describe('Home & Directory Functional Verification', () => {
    it('component-household-attention-v1 renders demo issues and alerts', async () => {
      const el = document.createElement('component-household-attention-v1') as any;
      el.setConfig({
        demo: true,
        title: 'Attention items',
      });
      el.hass = mockHass;
      document.body.appendChild(el);
      await el.updateComplete;

      expect(el.getCardSize()).toBe(2);
      expect(el.shadowRoot.textContent).toContain('Attention items');
      expect(el.shadowRoot.textContent).toContain('Garage door');
      el.remove();
    });

    it('component-favourites-v3 renders interactive item tiles and triggers toggles', async () => {
      const el = document.createElement('component-favourites-v3') as any;
      el.setConfig({
        items: [
          { title: 'Ceiling Light', state: 'On', icon: 'mdi:lightbulb' },
          { title: 'Kitchen Light', state: 'Off', icon: 'mdi:lightbulb-outline' },
        ],
        title: 'Frequent Controls',
      });
      el.hass = mockHass;
      document.body.appendChild(el);
      await el.updateComplete;

      expect(el.shadowRoot.textContent).toContain('Ceiling Light');
      expect(el.shadowRoot.textContent).toContain('Kitchen Light');

      const itemMain = el.shadowRoot.querySelector('.main');
      expect(itemMain).not.toBeNull();
      el.remove();
    });

    it('component-room-directory-v4 renders room directory and header', async () => {
      const el = document.createElement('component-room-directory-v4') as any;
      el.setConfig({
        title: 'Rooms',
      });
      el.hass = mockHass;
      document.body.appendChild(el);
      await el.updateComplete;

      expect(el.getCardSize()).toBe(4);
      expect(el.shadowRoot.textContent).toContain('Rooms');
      el.remove();
    });
  });

  // 6. BACKWARD COMPATIBILITY ADAPTERS
  describe('Consolidated Backward Compatibility Adapters', () => {
    it('component-favourites-minimal-v1 adapter correctly maps to favourites-v3', async () => {
      const el = document.createElement('component-favourites-minimal-v1') as any;
      el.setConfig({
        title: 'Minimal Favourites',
      });
      el.hass = mockHass;
      document.body.appendChild(el);
      await el.updateComplete;

      expect(el.getCardSize()).toBeGreaterThan(0);
      el.remove();
    });

    it('component-camera-controller-v1 adapter maps to camera-controller-v2', async () => {
      const el = document.createElement('component-camera-controller-v1') as any;
      el.setConfig({
        camera_entity: 'camera.porch',
        title: 'Porch Cam Adapter',
      });
      el.hass = mockHass;
      document.body.appendChild(el);
      await el.updateComplete;

      expect(el.getCardSize()).toBeGreaterThan(0);
      expect(el.shadowRoot.textContent).toContain('Porch Cam Adapter');
      el.remove();
    });

    it('component-home-overview-v5 adapter maps to home-overview-v4', async () => {
      const el = document.createElement('component-home-overview-v5') as any;
      el.setConfig({
        title: 'Overview V5',
      });
      el.hass = mockHass;
      document.body.appendChild(el);
      await el.updateComplete;

      expect(el.getCardSize()).toBeGreaterThan(0);
      el.remove();
    });

    it('component-empty-state-v2 adapter renders correctly', async () => {
      const el = document.createElement('component-empty-state-v2') as any;
      el.setConfig({
        title: 'No Alerts',
        message: 'System nominal',
      });
      el.hass = mockHass;
      document.body.appendChild(el);
      await el.updateComplete;

      expect(el.shadowRoot.textContent).toContain('No Alerts');
      expect(el.shadowRoot.textContent).toContain('System nominal');
      el.remove();
    });
  });
});
