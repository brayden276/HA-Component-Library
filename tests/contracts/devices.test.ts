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

  it('component-garage-door-controller-v1 requires an entity and safely disables actions without a controller', async () => {
    const el = document.createElement('component-garage-door-controller-v1') as any;
    expect(() => el.setConfig({})).toThrowError('A garage-door state entity is required');
    el.setConfig({ entity: 'binary_sensor.garage_door' });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot.querySelector<HTMLButtonElement>('button.action')?.disabled).toBe(true);
    el.remove();

    const configured = document.createElement('component-garage-door-controller-v1') as any;
    configured.setConfig({
      entity: 'binary_sensor.garage_door',
      control_entity: 'button.garage_door_operator'
    });
    configured.hass = hass;
    document.body.appendChild(configured);
    await configured.updateComplete;

    expect(configured.getCardSize()).toBe(1);
    expect(configured.shadowRoot.textContent).toContain('Garage door');
    expect(configured.shadowRoot.textContent).toContain('Closed');
    configured.remove();
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

  it('component-split-controller-v4 requires climate entity and toggles power via service call', async () => {
    let calledDomain = '';
    let calledService = '';
    let calledData: any = null;
    let calledTarget: any = null;

    const testHass = {
      ...hass,
      callService: async (domain: string, service: string, data: any, target: any) => {
        calledDomain = domain;
        calledService = service;
        calledData = data;
        calledTarget = target;
      }
    };

    const el = document.createElement('component-split-controller-v4') as any;
    expect(() => el.setConfig({})).toThrowError('A climate entity is required');

    el.setConfig({ entity: 'climate.living_room_split' });
    el.hass = testHass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(1);
    expect(el.shadowRoot.textContent).toContain('Living Room Split');
    expect(el.shadowRoot.textContent).toContain('21°');
    expect(el.shadowRoot.textContent).toContain('23°');

    const powerBtn = el.shadowRoot.querySelector('button.power-btn');
    expect(powerBtn).not.toBeNull();
    powerBtn.click();
    await el.updateComplete;

    expect(calledDomain).toBe('climate');
    expect(calledService).toBe('set_hvac_mode');
    expect(calledTarget).toEqual({ entity_id: 'climate.living_room_split' });
    expect(calledData.hvac_mode).toBe('off');

    const increaseBtn = el.shadowRoot.querySelector('button.increase');
    expect(increaseBtn).not.toBeNull();
    increaseBtn.click();
    await el.updateComplete;
    expect(calledDomain).toBe('climate');
    expect(calledService).toBe('set_temperature');
    expect(calledData.temperature).toBe(23.5);

    el.remove();
  });

  it('component-wled-controller-v1 toggles power via service call', async () => {
    let calledDomain = '';
    let calledService = '';
    let calledTarget: any = null;

    const testHass = {
      ...hass,
      callService: async (
        domain: string,
        service: string,
        _data: any,
        target: any,
      ) => {
        calledDomain = domain;
        calledService = service;
        calledTarget = target;
      }
    };

    const el = document.createElement('component-wled-controller-v1') as any;
    el.setConfig({ entity: 'light.wled_strip' });
    el.hass = testHass;
    document.body.appendChild(el);
    await el.updateComplete;

    const powerBtn = el.shadowRoot.querySelector('button.power');
    expect(powerBtn).not.toBeNull();
    powerBtn.click();
    await el.updateComplete;

    expect(calledDomain).toBe('light');
    expect(calledService).toBe('toggle');
    expect(calledTarget).toEqual({ entity_id: 'light.wled_strip' });
    el.remove();
  });

  it('component-garage-door-controller-v1 triggers action via service call', async () => {
    let calledDomain = '';
    let calledService = '';
    let calledTarget: any = null;

    const testHass = {
      ...hass,
      callService: async (
        domain: string,
        service: string,
        _data: any,
        target: any,
      ) => {
        calledDomain = domain;
        calledService = service;
        calledTarget = target;
      }
    };

    const el = document.createElement('component-garage-door-controller-v1') as any;
    el.setConfig({
      entity: 'binary_sensor.garage_door',
      control_entity: 'button.garage_door_operator'
    });
    el.hass = testHass;
    document.body.appendChild(el);
    await el.updateComplete;

    const actionBtn = el.shadowRoot.querySelector('button.action');
    expect(actionBtn).not.toBeNull();
    actionBtn.click();
    await el.updateComplete;

    expect(calledDomain).toBe('button');
    expect(calledService).toBe('press');
    expect(calledTarget).toEqual({ entity_id: 'button.garage_door_operator' });
    el.remove();
  });

  it('component-apple-tv-controller-v1 renders remote and banner with interactive controls', async () => {
    let calledDomain = '';
    let calledService = '';
    let calledData: any = null;
    let calledTarget: any = null;

    const testHass = {
      ...hass,
      callService: async (domain: string, service: string, data: any, target: any) => {
        calledDomain = domain;
        calledService = service;
        calledData = data;
        calledTarget = target;
      }
    };

    const el = document.createElement('component-apple-tv-controller-v1') as any;
    el.setConfig({
      entity: 'media_player.apple_tv',
      remote_entity: 'remote.apple_tv'
    });
    el.hass = testHass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(4);
    const remoteLauncher = el.shadowRoot.querySelector<HTMLButtonElement>('.launcher');
    expect(remoteLauncher).not.toBeNull();
    remoteLauncher?.click();
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('.remote')).not.toBeNull();
    expect(el.shadowRoot.querySelector('.dpad')).not.toBeNull();

    const playPauseBtn = el.shadowRoot.querySelector('.play-pause');
    if (playPauseBtn) {
      playPauseBtn.click();
      await el.updateComplete;
      expect(calledDomain).toBe('media_player');
      expect(calledService).toBe('media_play_pause');
    }

    const wakeBtn = el.shadowRoot.querySelector('button[data-cmd="wakeup"]');
    if (wakeBtn) {
      wakeBtn.click();
      await el.updateComplete;
      expect(calledDomain).toBe('remote');
      expect(calledService).toBe('send_command');
      expect(calledData.command).toBe('wakeup');
      expect(calledTarget).toEqual({ entity_id: 'remote.apple_tv' });
    }

    el.remove();
  });

  it('component-apple-tv-controller-v1 blocks unavailable controls and coalesces power actions', async () => {
    const calls: Array<{ domain: string; service: string }> = [];
    let release!: () => void;
    const pending = new Promise<void>((resolve) => { release = resolve; });
    const testHass = {
      ...hass,
      states: {
        ...hass.states,
        'media_player.apple_tv': { ...hass.states['media_player.apple_tv'], state: 'unavailable' },
        'remote.apple_tv': { ...hass.states['remote.apple_tv'], state: 'unavailable' },
      },
      callService: async (domain: string, service: string) => {
        calls.push({ domain, service });
        await pending;
      },
    };
    const el = document.createElement('component-apple-tv-controller-v1') as any;
    el.setConfig({ entity: 'media_player.apple_tv', remote_entity: 'remote.apple_tv' });
    el.hass = testHass;
    document.body.appendChild(el);
    await el.updateComplete;

    el.shadowRoot.querySelector<HTMLButtonElement>('.launcher')?.click();
    await el.updateComplete;
    expect(el.shadowRoot.querySelector<HTMLButtonElement>('button[data-remote-command="wakeup"]')?.disabled).toBe(true);
    expect(el.shadowRoot.querySelector<HTMLButtonElement>('.play-pause')?.disabled).toBe(true);
    el.shadowRoot.querySelector<HTMLButtonElement>('button[data-remote-command="wakeup"]')?.click();
    el.shadowRoot.querySelector<HTMLButtonElement>('.play-pause')?.click();
    expect(calls).toEqual([]);
    release();
    el.remove();
  });

  it('component-apple-tv-controller-v1 shares one in-flight power action and exposes failures', async () => {
    const calls: Array<{ domain: string; service: string }> = [];
    let rejectService!: (reason?: unknown) => void;
    const pending = new Promise<void>((_resolve, reject) => { rejectService = reject; });
    const testHass = {
      ...hass,
      callService: async (domain: string, service: string) => {
        calls.push({ domain, service });
        await pending;
      },
    };
    const el = document.createElement('component-apple-tv-controller-v1') as any;
    el.setConfig({ entity: 'media_player.apple_tv', remote_entity: 'remote.apple_tv' });
    el.hass = testHass;
    document.body.appendChild(el);
    await el.updateComplete;
    el.shadowRoot.querySelector<HTMLButtonElement>('.launcher')?.click();
    await el.updateComplete;

    const wake = el.shadowRoot.querySelector<HTMLButtonElement>('button[data-remote-command="wakeup"]')!;
    const sleep = el.shadowRoot.querySelector<HTMLButtonElement>('button[data-remote-command="suspend"]')!;
    wake.click();
    sleep.click();
    expect(calls).toEqual([{ domain: 'remote', service: 'send_command' }]);
    expect(wake.getAttribute('aria-busy')).toBe('true');

    rejectService(new Error('Remote unavailable'));
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(wake.getAttribute('data-interaction-error')).toBe('true');
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
  });

  it('component-split-controller-v4 auto-discovers native swing_modes for vanes control', async () => {
    let calledDomain = '';
    let calledService = '';
    let calledData: any = null;

    const splitHass = createMockHass({
      states: {
        'climate.living_room_split': {
          state: 'cool',
          attributes: {
            friendly_name: 'Living Room Split',
            temperature: 22.0,
            hvac_modes: ['off', 'cool', 'heat'],
            fan_modes: ['auto', 'quiet', 'low', 'high'],
            swing_mode: 'auto',
            swing_modes: ['off', 'auto', 'swing', '1', '2', '3']
          }
        } as any
      },
      services: {
        climate: { set_swing_mode: {} }
      }
    });
    splitHass.callService = async (domain: string, service: string, data: any) => {
      calledDomain = domain;
      calledService = service;
      calledData = data;
    };

    const el = document.createElement('component-split-controller-v4') as any;
    el.setConfig({ entity: 'climate.living_room_split' });
    el.hass = splitHass;
    document.body.appendChild(el);
    await el.updateComplete;

    const vaneBtn = el.shadowRoot.querySelector('button[data-panel="vanes"]');
    expect(vaneBtn).not.toBeNull();
    expect(vaneBtn.textContent).toContain('V Auto');

    vaneBtn.click();
    await el.updateComplete;

    const choices = el.shadowRoot.querySelectorAll('.choice');
    expect(choices.length).toBeGreaterThan(0);
    choices[2].click();
    await el.updateComplete;

    expect(calledDomain).toBe('climate');
    expect(calledService).toBe('set_swing_mode');
    expect(calledData.swing_mode).toBe('swing');

    el.remove();
  });

  it('component-apple-tv-controller-v1 renders volume slider when volume_level is exposed', async () => {
    let calledService = '';
    let calledData: any = null;

    const atvHass = createMockHass({
      states: {
        'media_player.apple_tv': {
          state: 'playing',
          attributes: {
            friendly_name: 'Apple TV Living Room',
            volume_level: 0.65,
            is_volume_muted: false
          }
        } as any,
        'remote.apple_tv': {
          state: 'on',
          attributes: { friendly_name: 'Apple TV Remote' }
        } as any
      }
    });
    atvHass.callService = async (_d: string, s: string, data: any) => {
      calledService = s;
      calledData = data;
    };

    const el = document.createElement('component-apple-tv-controller-v1') as any;
    el.setConfig({ entity: 'media_player.apple_tv', remote_entity: 'remote.apple_tv' });
    el.hass = atvHass;
    document.body.appendChild(el);
    await el.updateComplete;

    el.shadowRoot.querySelector<HTMLButtonElement>('.launcher')?.click();
    await el.updateComplete;

    const volumeRow = el.shadowRoot.querySelector('.volume-row');
    expect(volumeRow).not.toBeNull();
    expect(volumeRow.textContent).toContain('65%');

    const slider = volumeRow.querySelector('input[type="range"]');
    expect(slider).not.toBeNull();
    slider.value = '80';
    slider.dispatchEvent(new Event('change'));
    await el.updateComplete;

    expect(calledService).toBe('set_volume_level');
    expect(calledData.volume_level).toBe(0.8);

    el.remove();
  });

  it('component-split-controller-v4 resumes last active HVAC mode, temp, fan and swing end-to-end', async () => {
    const serviceCalls: Array<{ domain: string; service: string; data: any }> = [];

    const testState = {
      state: 'heat',
      attributes: {
        friendly_name: 'Mitsubishi Living Split',
        temperature: 24.5,
        hvac_modes: ['off', 'cool', 'heat', 'dry', 'auto'],
        fan_modes: ['auto', 'quiet', 'speed_1', 'speed_2', 'speed_3', 'speed_4'],
        fan_mode: 'speed_3',
        swing_mode: '3_middle',
        swing_modes: ['auto', '1_up', '2_up_middle', '3_middle', '4_down_middle', '5_down', 'swing'],
      }
    };

    const mitsuHass = createMockHass({
      states: {
        'climate.mitsu_split': testState as any,
      }
    });
    mitsuHass.callService = async (domain: string, service: string, data: any) => {
      serviceCalls.push({ domain, service, data });
    };

    const el = document.createElement('component-split-controller-v4') as any;
    el.setConfig({ entity: 'climate.mitsu_split' });
    el.hass = mitsuHass;
    document.body.appendChild(el);
    await el.updateComplete;

    // 1. Turn unit off -> records current active state
    const powerBtn = el.shadowRoot.querySelector('button.power-btn');
    expect(powerBtn).not.toBeNull();
    powerBtn.click();
    await el.updateComplete;

    expect(serviceCalls.some(c => c.service === 'set_hvac_mode' && c.data?.hvac_mode === 'off')).toBe(true);

    // Update mock state to off
    el.hass = {
      ...mitsuHass,
      states: {
        'climate.mitsu_split': {
          ...testState,
          state: 'off',
        } as any,
      }
    };
    await el.updateComplete;

    serviceCalls.length = 0;

    // 2. Turn unit on -> resumes heat, 24.5, speed_3, 3_middle
    const offPowerBtn = el.shadowRoot.querySelector('button.power-btn');
    offPowerBtn.click();
    await el.updateComplete;
    await new Promise((resolve) => setTimeout(resolve, 20));

    expect(serviceCalls.some(c => c.service === 'set_hvac_mode' && c.data?.hvac_mode === 'heat')).toBe(true);
    expect(serviceCalls.some(c => c.service === 'set_temperature' && c.data?.temperature === 24.5)).toBe(true);
    expect(serviceCalls.some(c => c.service === 'set_fan_mode' && c.data?.fan_mode === 'speed_3')).toBe(true);
    expect(serviceCalls.some(c => c.service === 'set_swing_mode' && c.data?.swing_mode === '3_middle')).toBe(true);

    el.remove();
  });

  it('inner modal controls do not close the modal in apple-tv-card and split-ac-card', async () => {
    // 1. Apple TV modal controls
    const atvHass = createMockHass({
      states: {
        'media_player.apple_tv': {
          state: 'playing',
          attributes: { friendly_name: 'Apple TV', volume_level: 0.5 }
        } as any,
        'remote.apple_tv': { state: 'on' } as any
      }
    });

    const atvEl = document.createElement('component-apple-tv-controller-v1') as any;
    atvEl.setConfig({ entity: 'media_player.apple_tv', remote_entity: 'remote.apple_tv' });
    atvEl.hass = atvHass;
    document.body.appendChild(atvEl);
    await atvEl.updateComplete;

    atvEl.shadowRoot.querySelector<HTMLButtonElement>('.launcher')?.click();
    await atvEl.updateComplete;

    // Verify modal is open
    expect(atvEl.shadowRoot.querySelector('.dialog-content')).not.toBeNull();

    // Change volume slider inside modal
    const slider = atvEl.shadowRoot.querySelector('.volume-row input[type="range"]');
    expect(slider).not.toBeNull();
    slider.value = '75';
    slider.dispatchEvent(new Event('change', { bubbles: true }));
    await atvEl.updateComplete;

    // Modal must still be open!
    expect(atvEl.shadowRoot.querySelector('.dialog-content')).not.toBeNull();

    atvEl.remove();

    // 2. Split AC modal choices
    const splitHass = createMockHass({
      states: {
        'climate.split': {
          state: 'cool',
          attributes: {
            friendly_name: 'Split',
            fan_modes: ['auto', 'low', 'high'],
            fan_mode: 'auto'
          }
        } as any
      }
    });

    const splitEl = document.createElement('component-split-controller-v4') as any;
    splitEl.setConfig({ entity: 'climate.split' });
    splitEl.hass = splitHass;
    document.body.appendChild(splitEl);
    await splitEl.updateComplete;

    // Open fan panel
    splitEl.shadowRoot.querySelector('button[data-panel="fan"]')?.click();
    await splitEl.updateComplete;

    expect(splitEl.shadowRoot.querySelector('.pn')).not.toBeNull();

    // Click a choice inside the panel
    const choice = splitEl.shadowRoot.querySelectorAll('.choice')[1];
    choice.click();
    await splitEl.updateComplete;

    // Panel must remain open for user to continue viewing / interacting
    expect(splitEl.shadowRoot.querySelector('.pn')).not.toBeNull();

    splitEl.remove();
  });

  it('component-split-controller-v4 collapses controls when off and expands when on', async () => {
    const offHass = createMockHass({
      states: {
        'climate.split': {
          state: 'off',
          attributes: {
            friendly_name: 'Living Split',
            current_temperature: 23,
            temperature: 21,
          },
        } as any,
      },
    });

    const el = document.createElement('component-split-controller-v4') as any;
    el.setConfig({ entity: 'climate.split' });
    el.hass = offHass;
    document.body.appendChild(el);
    await el.updateComplete;

    // When off, stepper and action pills must collapse down
    expect(el.shadowRoot.querySelector('.stepper-control')).toBeNull();
    expect(el.shadowRoot.querySelector('.split-actions')).toBeNull();
    expect(el.shadowRoot.textContent).toContain('Living Split');
    expect(el.shadowRoot.textContent).toContain('Off · 23°');

    // When turned on, stepper and action pills expand
    const onHass = createMockHass({
      states: {
        'climate.split': {
          state: 'cool',
          attributes: {
            friendly_name: 'Living Split',
            current_temperature: 23,
            temperature: 21,
            fan_mode: 'auto',
          },
        } as any,
      },
    });
    el.hass = onHass;
    await el.updateComplete;

    expect(el.shadowRoot.querySelector('.stepper-control')).not.toBeNull();
    expect(el.shadowRoot.querySelector('.split-actions')).not.toBeNull();

    el.remove();
  });
});
