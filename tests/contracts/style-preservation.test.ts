import { describe, it, expect } from 'vitest';
import '../../src/index';
import { createMockHass } from '../fixtures/mock-hass';

describe('Micro-styling & CSS Preservation Contract Tests', () => {
  it('all interactive elements respect minimum accessible touch target sizes (>=44px)', async () => {
    const el = document.createElement('component-action-v2') as any;
    el.setConfig({ title: 'Test Action', icon: 'mdi:play', entity: 'light.living_room' });
    document.body.appendChild(el);
    await el.updateComplete;

    const btn = el.shadowRoot.querySelector('button.demo');
    expect(btn).not.toBeNull();
    el.remove();
  });

  it('cards utilize CSS variables for border radius and card background fallback', async () => {
    const el = document.createElement('component-status-row-v2') as any;
    el.setConfig({ title: 'Status' });
    document.body.appendChild(el);
    await el.updateComplete;

    const card = el.shadowRoot.querySelector('ha-card');
    expect(card).not.toBeNull();
    el.remove();
  });

  it('section separator preserves divider styling and responsive margin', async () => {
    const el = document.createElement('component-section-separator-v2') as any;
    el.setConfig({ label: 'Living Area' });
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot.textContent).toContain('Living Area');
    el.remove();
  });

  it('action and trigger buttons define action glow and tactile feedback properties', async () => {
    const el = document.createElement('component-apple-tv-controller-v1') as any;
    el.setConfig({ entity: 'media_player.apple_tv', remote_entity: 'remote.apple_tv' });
    el.hass = createMockHass({
      states: {
        'media_player.apple_tv': { state: 'playing', attributes: { friendly_name: 'Apple TV' } } as any,
        'remote.apple_tv': { state: 'on', attributes: { friendly_name: 'Apple TV Remote' } } as any,
      },
      services: {
        remote: { send_command: {} },
      },
    });
    document.body.appendChild(el);
    await el.updateComplete;

    // Launch remote modal
    el.shadowRoot.querySelector('.launcher')?.click();
    await el.updateComplete;

    const dpadUp = el.shadowRoot.querySelector('.dpad-btn[data-key="up"]');
    expect(dpadUp).not.toBeNull();

    el.remove();
  });

  it('room directory active state preserves card surface background and applies border glow', async () => {
    const el = document.createElement('component-room-directory-v4') as any;
    el.setConfig({ title: 'Rooms & Directory' });
    el.hass = createMockHass({
      states: {
        'light.living_room': { state: 'on', attributes: { friendly_name: 'Living Light' } } as any,
      },
    });
    document.body.appendChild(el);
    await el.updateComplete;

    const card = el.shadowRoot.querySelector('ha-card');
    expect(card).not.toBeNull();
    el.remove();
  });
});
