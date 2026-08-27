import { describe, it, expect } from 'vitest';
import "../../src/cards/control-row/control-row-card";
import "../../src/cards/media-row/media-row-card";
import "../../src/cards/update-summary/update-summary-card";
import "../../src/cards/update-row/update-row-card";
import "../../src/cards/device-discovery/device-discovery-card";
import "../../src/cards/device-aware-auto-entities/device-aware-auto-entities-card";
import { createMockHass } from '../fixtures/mock-hass';

describe('Stage 3 Controls and System Cards Contract Tests', () => {
  const hass = createMockHass({
    states: {
      'light.living_room': {
        state: 'on',
        attributes: { friendly_name: 'Living Room Light', brightness: 200 }
      } as any,
      'media_player.sonos': {
        state: 'playing',
        attributes: { friendly_name: 'Living Room Sonos', media_title: 'Starboy' }
      } as any,
      'update.home_assistant_core_update': {
        state: 'on',
        attributes: {
          friendly_name: 'Home Assistant Core Update',
          installed_version: '2026.7.0',
          latest_version: '2026.8.0'
        }
      } as any
    }
  });

  it('component-control-row-v2 renders live slider and entity description', async () => {
    const el = document.createElement('component-control-row-v2') as any;
    el.setConfig({
      title: 'Ceiling Light',
      mode: 'slider',
      entity: 'light.living_room'
    });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(1);
    expect(el.shadowRoot.textContent).toContain('Ceiling Light');
    expect(el.shadowRoot.querySelector('input.live-slider')).not.toBeNull();
    el.remove();
  });

  it('component-media-row-v2 renders media title and transport controls', async () => {
    const el = document.createElement('component-media-row-v2') as any;
    el.setConfig({
      title: 'Living Room Speaker',
      entity: 'media_player.sonos'
    });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(1);
    expect(el.shadowRoot.textContent).toContain('Living Room Speaker');
    expect(el.shadowRoot.textContent).toContain('Starboy');
    expect(el.shadowRoot.querySelector('button.btn.main')).not.toBeNull();
    el.remove();
  });

  it('component-update-summary-v3 renders update count and headline', async () => {
    const el = document.createElement('component-update-summary-v3') as any;
    el.setConfig({
      live_updates: true,
      update_all: true
    });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(1);
    expect(el.shadowRoot.textContent).toContain('1');
    expect(el.shadowRoot.textContent).toContain('update available');
    expect(el.shadowRoot.querySelector('button.all')).not.toBeNull();
    el.remove();
  });

  it('component-update-row-v3 renders versions and install button', async () => {
    const el = document.createElement('component-update-row-v3') as any;
    el.setConfig({
      entity: 'update.home_assistant_core_update'
    });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(1);
    expect(el.shadowRoot.textContent).toContain('Home Assistant Core');
    expect(el.shadowRoot.textContent).toContain('Current 2026.7.0');
    expect(el.shadowRoot.textContent).toContain('Available 2026.8.0');
    expect(el.shadowRoot.querySelector('button.action')).not.toBeNull();
    el.remove();
  });

  it('component-device-discovery-v2 renders demo rows in demo mode', async () => {
    const el = document.createElement('component-device-discovery-v2') as any;
    el.setConfig({ demo: true });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(3);
    expect(el.shadowRoot.textContent).toContain('Discovered device');
    expect(el.shadowRoot.textContent).toContain('Discovered bridge');
    el.remove();
  });

  it('component-control-row-v2 handles switch mode and unavailable entities', async () => {
    const unavailHass = createMockHass({
      states: {
        'switch.fan': {
          state: 'unavailable',
          attributes: { friendly_name: 'Ceiling Fan' }
        } as any
      }
    });
    const el = document.createElement('component-control-row-v2') as any;
    el.setConfig({
      title: 'Ceiling Fan',
      mode: 'switch',
      entity: 'switch.fan'
    });
    el.hass = unavailHass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot.textContent).toContain('Unavailable');
    const btn = el.shadowRoot.querySelector('button.row');
    expect(btn.hasAttribute('disabled')).toBe(true);
    el.remove();
  });

  it('component-media-row-v2 handles unavailable state gracefully', async () => {
    const unavailHass = createMockHass({
      states: {
        'media_player.offline': {
          state: 'unavailable',
          attributes: { friendly_name: 'Offline Speaker' }
        } as any
      }
    });
    const el = document.createElement('component-media-row-v2') as any;
    el.setConfig({
      title: 'Offline Speaker',
      entity: 'media_player.offline'
    });
    el.hass = unavailHass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot.textContent).toContain('Unavailable');
    const mainBtn = el.shadowRoot.querySelector('button.main');
    expect(mainBtn.hasAttribute('disabled')).toBe(true);
    el.remove();
  });

  it('component-update-row-v3 handles unavailable entity and progress states', async () => {
    const unavailHass = createMockHass({
      states: {
        'update.missing': {
          state: 'unavailable',
          attributes: {}
        } as any,
        'update.in_progress': {
          state: 'on',
          attributes: {
            friendly_name: 'Firmware Update',
            installed_version: '1.0',
            latest_version: '1.1',
            in_progress: 45
          }
        } as any
      }
    });

    const elUnavail = document.createElement('component-update-row-v3') as any;
    elUnavail.setConfig({ entity: 'update.missing' });
    elUnavail.hass = unavailHass;
    document.body.appendChild(elUnavail);
    await elUnavail.updateComplete;

    expect(elUnavail.shadowRoot.textContent).toContain('Unavailable');
    const actionBtn = elUnavail.shadowRoot.querySelector('button.action');
    expect(actionBtn.hasAttribute('disabled')).toBe(true);
    elUnavail.remove();

    const elProgress = document.createElement('component-update-row-v3') as any;
    elProgress.setConfig({ entity: 'update.in_progress' });
    elProgress.hass = unavailHass;
    document.body.appendChild(elProgress);
    await elProgress.updateComplete;

    expect(elProgress.shadowRoot.textContent).toContain('Updating…');
    const progressBar = elProgress.shadowRoot.querySelector('.progress.determinate');
    expect(progressBar).not.toBeNull();
    expect(progressBar.getAttribute('aria-valuenow')).toBe('45');
    elProgress.remove();
  });

  it('component-device-discovery-v2 initiates discovery when hass is set after connection', async () => {
    let wsCalled = false;
    const mockDiscoveryHass = {
      user: { is_admin: true },
      callWS: async (msg: any) => {
        if (msg.type === 'config_entries/flow/progress') {
          wsCalled = true;
          return [
            {
              handler: 'mqtt',
              context: {
                source: 'mqtt',
                title_placeholders: { name: 'Living Room Sensor' }
              }
            }
          ];
        }
        return [];
      }
    } as any;

    const el = document.createElement('component-device-discovery-v2') as any;
    el.setConfig({ demo: false });
    document.body.appendChild(el);
    await el.updateComplete;

    el.hass = mockDiscoveryHass;
    await el.updateComplete;
    // Allow async load to complete
    await new Promise((r) => setTimeout(r, 50));
    await el.updateComplete;

    expect(wsCalled).toBe(true);
    expect(el.shadowRoot.textContent).toContain('Living Room Sensor');
    el.remove();
  });

  it('component-device-aware-auto-entities-v1 handles delayed hass and card helper creation', async () => {
    let helperCreated = false;
    (globalThis as any).loadCardHelpers = async () => ({
      createCardElement: (cfg: any) => {
        helperCreated = true;
        const mockInner = document.createElement('div');
        mockInner.textContent = `Inner Auto Entities: ${cfg.type}`;
        return mockInner;
      }
    });

    const el = document.createElement('component-device-aware-auto-entities-v1') as any;
    el.setConfig({
      filter: { include: [{ domain: 'light' }] },
      header: { title: 'Dynamic Lights' }
    });
    document.body.appendChild(el);
    await el.updateComplete;

    el.hass = hass;
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 50));
    await el.updateComplete;

    expect(helperCreated).toBe(true);
    expect(el.shadowRoot.textContent).toContain('Dynamic Lights');
    expect(el.shadowRoot.textContent).toContain('Inner Auto Entities: custom:auto-entities');
    el.remove();
  });
});
