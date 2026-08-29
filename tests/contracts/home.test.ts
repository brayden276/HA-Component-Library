import { describe, it, expect } from 'vitest';
import "../../src/cards/welcome-header/welcome-header-card";
import "../../src/cards/household-attention/household-attention-card";
import "../../src/cards/favourites/favourites-card";
import "../../src/cards/smart-collection/smart-collection-card";
import "../../src/cards/household-directory/household-directory-card";
import "../../src/cards/room-directory/room-directory-card";
import { createMockHass } from '../fixtures/mock-hass';

describe('Stage 7 Home Composition & Directories Contract Tests', () => {
  const hass = createMockHass({
    states: {
      'weather.forecast_home': {
        state: 'sunny',
        attributes: { temperature: 21.5, temperature_unit: '°C', cloud_coverage: 15 }
      } as any,
      'light.living_room': {
        state: 'on',
        attributes: { friendly_name: 'Living Room Light' }
      } as any
    }
  });

  it('component-welcome-header-v1 renders time and weather button', async () => {
    const el = document.createElement('component-welcome-header-v1') as any;
    el.setConfig({ weather_entity: 'weather.forecast_home' });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(1);
    expect(el.shadowRoot.querySelector('.time')).not.toBeNull();
    expect(el.shadowRoot.querySelector('.weather')).not.toBeNull();
    expect(el.shadowRoot.textContent).toContain('21.5°C · Cloud 15%');
    el.remove();
  });

  it('component-household-attention-v2 renders demo issues', async () => {
    const el = document.createElement('component-household-attention-v2') as any;
    el.setConfig({ demo: true, title: 'Attention items' });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(2);
    expect(el.shadowRoot.textContent).toContain('Attention items');
    expect(el.shadowRoot.textContent).toContain('Garage door');
    el.remove();
  });

  it('component-favourites-v3 renders favourites', async () => {
    const el = document.createElement('component-favourites-v3') as any;
    el.setConfig({
      items: [{ title: 'Ceiling Light', state: 'On', icon: 'mdi:lightbulb' }],
      title: 'Favourites'
    });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(2);
    expect(el.shadowRoot.textContent).toContain('Ceiling Light');
    el.remove();
  });

  it('component-smart-collection-v3 renders collection', async () => {
    const el = document.createElement('component-smart-collection-v3') as any;
    el.setConfig({ mode: 'active', title: 'Active now' });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(2);
    expect(el.shadowRoot.textContent).toContain('Active now');
    el.remove();
  });

  it('component-household-directory-v3 renders directory items', async () => {
    const el = document.createElement('component-household-directory-v3') as any;
    el.setConfig({ title: 'Quick actions' });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(2);
    expect(el.shadowRoot.textContent).toContain('Quick actions');
    expect(el.shadowRoot.textContent).toContain('Media');
    expect(el.shadowRoot.textContent).toContain('Controls');
    el.remove();
  });

  it('component-room-directory-v4 renders room directory', async () => {
    const el = document.createElement('component-room-directory-v4') as any;
    el.setConfig({ title: 'Rooms' });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(4);
    expect(el.shadowRoot.textContent).toContain('Rooms');
    el.remove();
  });
});
