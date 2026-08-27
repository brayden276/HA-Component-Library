import { describe, it, expect } from 'vitest';
import "../../src/cards/action-tile/action-tile-card";
import "../../src/cards/action-tile/action-tile-editor";
import "../../src/cards/metric-badge/metric-badge-card";
import "../../src/cards/quick-bar/quick-bar-card";
import "../../src/cards/status-card/status-card-card";
import "../../src/cards/status-card/status-card-editor";
import "../../src/editor/config-editor";
import { MockHassBuilder } from '../fixtures/mock-hass';

describe('Standalone Cards & Editors Contract Tests', () => {
  const createTestHass = () => {
    const builder = new MockHassBuilder();
    builder.setEntity('light.living_room_light', 'on', {
      friendly_name: 'Living Room Light',
      brightness: 200,
    });
    builder.setEntity('sensor.living_room_temperature', '21.5', {
      friendly_name: 'Living Room Temperature',
      unit_of_measurement: '°C',
    });
    builder.setEntity('switch.living_room_fan', 'on', {
      friendly_name: 'Ceiling Fan',
    });
    return { hass: builder.build(), builder };
  };

  it('ha-action-tile sets config, validates, and renders active tile with badge', async () => {
    const { hass } = createTestHass();
    const el = document.createElement('ha-action-tile') as any;
    expect(() => el.setConfig({})).toThrow('Please define an entity for ha-action-tile');

    el.setConfig({
      entity: 'light.living_room_light',
      name: 'Living Light',
      color: '#ff9800',
      badge_entity: 'sensor.living_room_temperature',
    });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(1);
    expect(el.getGridOptions()).toEqual({
      columns: 6,
      rows: 1,
      min_columns: 3,
      min_rows: 1,
    });
    expect(el.shadowRoot.textContent).toContain('Living Light');
    expect(el.shadowRoot.textContent).toContain('21.5 °C');
    expect(el.shadowRoot.querySelector('ha-card.interactive')).toBeTruthy();

    const configEl = await (el.constructor as any).getConfigElement();
    expect(configEl.tagName.toLowerCase()).toBe('ha-action-tile-editor');

    const stub = (el.constructor as any).getStubConfig(hass, ['light.test', 'sensor.temp'], []);
    expect(stub.entity).toBe('light.test');

    el.remove();
  });

  it('ha-action-tile triggers tap action on click', async () => {
    const { hass, builder } = createTestHass();
    const el = document.createElement('ha-action-tile') as any;
    el.setConfig({
      entity: 'light.living_room_light',
      tap_action: { action: 'toggle' },
    });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    const card = el.shadowRoot.querySelector('ha-card');
    card.click();
    expect(builder.getServiceCalls()).toEqual([
      {
        domain: 'light',
        service: 'toggle',
        data: undefined,
        target: { entity_id: 'light.living_room_light' },
      },
    ]);
    el.remove();
  });

  it('ha-metric-badge validates config and renders thresholds and units', async () => {
    const { hass } = createTestHass();
    const el = document.createElement('ha-metric-badge') as any;
    expect(() => el.setConfig({})).toThrow('Please define an entity for ha-metric-badge');

    el.setConfig({
      entity: 'sensor.living_room_temperature',
      name: 'Room Temp',
      thresholds: [
        { value: 18, color: '#03a9f4' },
        { value: 24, color: '#4caf50' },
      ],
    });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(1);
    expect(el.shadowRoot.textContent).toContain('Room Temp');
    expect(el.shadowRoot.textContent).toContain('21.5');
    expect(el.shadowRoot.textContent).toContain('°C');
    el.remove();
  });

  it('ha-quick-bar validates entities list and renders active items with header', async () => {
    const { hass } = createTestHass();
    const el = document.createElement('ha-quick-bar') as any;
    expect(() => el.setConfig({})).toThrow('Please specify at least one entity in entities list for ha-quick-bar');
    expect(() => el.setConfig({ entities: [] })).toThrow('Please specify at least one entity in entities list for ha-quick-bar');

    el.setConfig({
      title: 'Active Living Room',
      show_active_count: true,
      entities: [
        'light.living_room_light',
        { entity: 'switch.living_room_fan', name: 'Ceiling Fan' },
      ],
    });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(1);
    expect(el.shadowRoot.textContent).toContain('Active Living Room');
    expect(el.shadowRoot.textContent).toContain('2 Active');
    expect(el.shadowRoot.textContent).toContain('Ceiling Fan');

    const stub = (el.constructor as any).getStubConfig();
    expect(stub.title).toBe('Quick Controls');
    expect(stub.entities.length).toBeGreaterThan(0);

    el.remove();
  });

  it('ha-status-card validates config, renders status and executes toggle', async () => {
    const { hass, builder } = createTestHass();
    const el = document.createElement('ha-status-card') as any;
    expect(() => el.setConfig({})).toThrow('Please define an entity');

    el.setConfig({
      entity: 'light.living_room_light',
      name: 'Living Light Status',
      show_toggle: true,
      secondary_info: 'state',
    });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(1);
    expect(el.shadowRoot.textContent).toContain('Living Light Status');
    expect(el.shadowRoot.textContent).toContain('On');

    const toggleBtn = el.shadowRoot.querySelector('button.toggle-btn') as HTMLButtonElement;
    expect(toggleBtn).toBeTruthy();
    toggleBtn.click();

    expect(builder.getServiceCalls()).toEqual([
      {
        domain: 'light',
        service: 'toggle',
        data: undefined,
        target: { entity_id: 'light.living_room_light' },
      },
    ]);

    const configEl = await (el.constructor as any).getConfigElement();
    expect(configEl.tagName.toLowerCase()).toBe('ha-status-card-editor');

    el.remove();
  });

  it('ha-action-tile-editor renders and dispatches config-changed', async () => {
    const { hass } = createTestHass();
    const editor = document.createElement('ha-action-tile-editor') as any;
    editor.hass = hass;
    editor.setConfig({ entity: 'light.living_room_light' });
    document.body.appendChild(editor);
    await editor.updateComplete;

    const select = editor.shadowRoot.querySelector('#tile-entity') as HTMLSelectElement;
    expect(select).toBeTruthy();

    let changedConfig: any = null;
    editor.addEventListener('config-changed', (e: any) => {
      changedConfig = e.detail.config;
    });

    const nameInput = editor.shadowRoot.querySelector('#tile-name') as HTMLInputElement;
    nameInput.value = 'New Tile Name';
    nameInput.dispatchEvent(new Event('input'));

    expect(changedConfig).toBeTruthy();
    expect(changedConfig.name).toBe('New Tile Name');
    editor.remove();
  });

  it('ha-status-card-editor renders and dispatches config-changed', async () => {
    const { hass } = createTestHass();
    const editor = document.createElement('ha-status-card-editor') as any;
    editor.hass = hass;
    editor.setConfig({ entity: 'light.living_room_light', show_toggle: true });
    document.body.appendChild(editor);
    await editor.updateComplete;

    let changedConfig: any = null;
    editor.addEventListener('config-changed', (e: any) => {
      changedConfig = e.detail.config;
    });

    const nameInput = editor.shadowRoot.querySelector('#name-input') as HTMLInputElement;
    nameInput.value = 'Updated Card Name';
    nameInput.dispatchEvent(new Event('input'));

    expect(changedConfig).toBeTruthy();
    expect(changedConfig.name).toBe('Updated Card Name');
    editor.remove();
  });

  it('ha-component-library-config-editor renders json and dispatches valid config-changed', async () => {
    const { hass } = createTestHass();
    const editor = document.createElement('ha-component-library-config-editor') as any;
    editor.hass = hass;
    editor.cardType = 'component-action-v2';
    editor.setConfig({ type: 'custom:component-action-v2', title: 'Test Action' });
    document.body.appendChild(editor);
    await editor.updateComplete;

    expect(editor.shadowRoot.textContent).toContain('component-action-v2');
    const textarea = editor.shadowRoot.querySelector('textarea') as HTMLTextAreaElement;
    expect(textarea.value).toContain('Test Action');

    let changedConfig: any = null;
    editor.addEventListener('config-changed', (e: any) => {
      changedConfig = e.detail.config;
    });

    textarea.value = JSON.stringify({ type: 'custom:component-action-v2', title: 'Modified' });
    textarea.dispatchEvent(new Event('change'));

    expect(changedConfig).toBeTruthy();
    expect(changedConfig.title).toBe('Modified');
    editor.remove();
  });
});
