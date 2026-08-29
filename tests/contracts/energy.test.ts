import { describe, it, expect } from 'vitest';
import "../../src/cards/energy-day-selector/energy-day-selector-card";
import "../../src/cards/energy-summary/energy-summary-card";
import "../../src/cards/history-graph/history-graph-card";
import "../../src/cards/solar-daylight/solar-daylight-card";
import "../../src/cards/energy-history/energy-history-card";
import "../../src/cards/metric-pair/metric-pair-card";
import { createMockHass } from '../fixtures/mock-hass';

describe('Stage 6 Energy Family Contract Tests', () => {
  const hass = createMockHass({
    states: {
      'sun.sun': {
        state: 'above_horizon',
        attributes: { elevation: 35.5, next_setting: '2026-08-27T08:00:00Z' }
      } as any,
      'weather.forecast_home': {
        state: 'sunny',
        attributes: { cloud_coverage: 12 }
      } as any,
      'sensor.house_consumption_power': {
        state: '1420',
        attributes: { unit_of_measurement: 'W' }
      } as any,
      'sensor.total_solar_power': {
        state: '3850',
        attributes: { unit_of_measurement: 'W' }
      } as any,
      'sensor.refoss_smart_energy_monitor_em_channel_3_power': {
        state: '-2430',
        attributes: { unit_of_measurement: 'W' }
      } as any
    }
  });

  it('component-energy-day-selector-v1 renders day label and navigation buttons with a11y', async () => {
    const el = document.createElement('component-energy-day-selector-v1') as any;
    el.setConfig({ channel: 'energy-day' });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(1);
    const prev = el.shadowRoot.querySelector('button.step.previous');
    const next = el.shadowRoot.querySelector('button.step.next');
    const today = el.shadowRoot.querySelector('button.today');
    const input = el.shadowRoot.querySelector('input[type="date"]');

    expect(prev).not.toBeNull();
    expect(next).not.toBeNull();
    expect(today).not.toBeNull();
    expect(prev.getAttribute('aria-label')).toBe('Previous day');
    expect(next.getAttribute('aria-label')).toBe('Next day');
    expect(today.getAttribute('aria-label')).toBe('Return to today');
    expect(input.getAttribute('aria-label')).toBe('Select Energy day');

    // Dynamic config channel update
    el.setConfig({ channel: 'energy-day-alt' });
    await el.updateComplete;
    expect(el.config.channel).toBe('energy-day-alt');

    el.remove();
  });

  it('component-energy-summary-v1 renders energy metrics, title, and accessible live buttons', async () => {
    const el = document.createElement('component-energy-summary-v1') as any;
    el.setConfig({ profile: 'household-energy', title: 'Solar & Grid Energy' });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(3);
    expect(el.shadowRoot.textContent).toContain('Solar & Grid Energy');
    expect(el.shadowRoot.querySelector('.live')).not.toBeNull();
    expect(el.shadowRoot.querySelector('.daily')).not.toBeNull();

    const houseBtn = el.shadowRoot.querySelector('.metric.house');
    expect(houseBtn).not.toBeNull();
    expect(houseBtn.getAttribute('aria-label')).toContain('House power now');

    // Dynamic config update
    el.setConfig({ profile: 'household-energy', day_channel: 'custom-day-channel' });
    await el.updateComplete;
    expect(el.config.day_channel).toBe('custom-day-channel');

    el.remove();
  });

  it('component-history-graph-v2 renders interactive SVG graph and toggle buttons with a11y', async () => {
    const el = document.createElement('component-history-graph-v2') as any;
    el.setConfig({ meta_text: 'Household Profile', series_1_label: 'Generation' });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(7);
    expect(el.shadowRoot.textContent).toContain('Household Profile');
    expect(el.shadowRoot.textContent).toContain('Generation');
    expect(el.shadowRoot.querySelector('svg')).not.toBeNull();

    const s1Btn = el.shadowRoot.querySelector('button[data-series="1"]');
    expect(s1Btn).not.toBeNull();
    expect(s1Btn.getAttribute('aria-label')).toBe('Toggle Generation');
    expect(s1Btn.getAttribute('aria-pressed')).toBe('true');

    el.remove();
  });

  it('solar-daylight-card-v7 renders solar elevation, cloud coverage, and descriptive aria-label', async () => {
    const el = document.createElement('solar-daylight-card-v7') as any;
    el.setConfig({ weather_entity: 'weather.forecast_home', sun_entity: 'sun.sun' });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(1);
    expect(el.shadowRoot.textContent).toContain('Sun 36°');
    expect(el.shadowRoot.textContent).toContain('12%');

    const button = el.shadowRoot.querySelector('button');
    expect(button).not.toBeNull();
    expect(button.getAttribute('aria-label')).toContain('Sun 36°');
    expect(button.getAttribute('aria-label')).toContain('Tap for sun details; hold for weather details');

    el.remove();
  });

  it('energy-history-card-v3 renders chart, legend keys, and accessible labels', async () => {
    const el = document.createElement('energy-history-card-v3') as any;
    el.setConfig({
      house_entity: 'sensor.house_consumption_power',
      solar_entity: 'sensor.total_solar_power',
      grid_entity: 'sensor.refoss_smart_energy_monitor_em_channel_3_power'
    });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(7);
    expect(el.shadowRoot.querySelector('.chart')).not.toBeNull();
    const houseKey = el.shadowRoot.querySelector('.house-key');
    expect(houseKey).not.toBeNull();
    expect(houseKey.getAttribute('aria-label')).toBe('House power history details');

    // Dynamic config change
    el.setConfig({
      house_entity: 'sensor.house_consumption_power',
      day_channel: 'alt-channel'
    });
    await el.updateComplete;
    expect(el.config.day_channel).toBe('alt-channel');

    el.remove();
  });

  it('metric-pair-card-v3 renders metric pair with accessible button labels', async () => {
    const el = document.createElement('metric-pair-card-v3') as any;
    el.setConfig({
      left_value: '1.4 kW',
      left_label: 'Current Draw',
      right_value: '3.8 kW',
      right_label: 'Solar Output',
      left_more_info_entity: 'sensor.house_consumption_power'
    });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(2);
    expect(el.shadowRoot.textContent).toContain('1.4 kW');
    expect(el.shadowRoot.textContent).toContain('Current Draw');
    expect(el.shadowRoot.textContent).toContain('3.8 kW');

    const leftBtn = el.shadowRoot.querySelector('button.left');
    expect(leftBtn).not.toBeNull();
    expect(leftBtn.getAttribute('aria-label')).toBe('Current Draw: 1.4 kW');

    // Dynamic config update
    el.setConfig({
      left_value: '2.0 kW',
      left_label: 'Grid Draw',
      day_channel: 'new-channel'
    });
    await el.updateComplete;
    expect(el.config.day_channel).toBe('new-channel');

    el.remove();
  });
});
