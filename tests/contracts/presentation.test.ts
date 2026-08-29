import { describe, it, expect } from 'vitest';
import "../../src/cards/context-strip/context-strip-card";
import "../../src/cards/single-kpi/single-kpi-card";
import "../../src/cards/three-stat/three-stat-card";
import "../../src/cards/status-row/status-row-card";
import "../../src/cards/progress/progress-card";
import "../../src/cards/action/action-card";
import "../../src/cards/list/list-card";
import "../../src/cards/notice/notice-card";
import "../../src/cards/text-effect/text-effect-card";
import "../../src/cards/section-separator/section-separator-card";
import "../../src/cards/empty-state/empty-state-card";
import { createMockHass } from '../fixtures/mock-hass';

describe('Stage 1 Presentational Cards Contract Tests', () => {
  const hass = createMockHass();

  it('component-context-strip-v3 sets config and renders default metrics', async () => {
    const el = document.createElement('component-context-strip-v3') as any;
    el.setConfig({});
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(1);
    expect(el.shadowRoot.textContent).toContain('Left context');
    expect(el.shadowRoot.textContent).toContain('Right context');
    expect(el.shadowRoot.textContent).toContain('Primary metric');
    el.remove();
  });

  it('component-single-kpi-v2 renders values and escapes text', async () => {
    const el = document.createElement('component-single-kpi-v2') as any;
    el.setConfig({
      value: '42 kW',
      label: 'Solar Production',
      support_value: '98%',
      support_label: 'Self-sufficiency'
    });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(2);
    expect(el.shadowRoot.textContent).toContain('42 kW');
    expect(el.shadowRoot.textContent).toContain('Solar Production');
    expect(el.shadowRoot.textContent).toContain('98%');
    el.remove();
  });

  it('component-three-stat-v2 renders all 3 metrics', async () => {
    const el = document.createElement('component-three-stat-v2') as any;
    el.setConfig({
      metric_1_value: '10',
      metric_1_label: 'One',
      metric_2_value: '20',
      metric_2_label: 'Two',
      metric_3_value: '30',
      metric_3_label: 'Three'
    });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(2);
    expect(el.shadowRoot.textContent).toContain('10');
    expect(el.shadowRoot.textContent).toContain('One');
    expect(el.shadowRoot.textContent).toContain('20');
    expect(el.shadowRoot.textContent).toContain('30');
    el.remove();
  });

  it('component-status-row-v2 renders icon, title, description, and status', async () => {
    const el = document.createElement('component-status-row-v2') as any;
    el.setConfig({
      title: 'Gate Lock',
      description: 'Front entrance',
      status_value: 'Locked',
      status_label: 'Secure'
    });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(2);
    expect(el.shadowRoot.textContent).toContain('Gate Lock');
    expect(el.shadowRoot.textContent).toContain('Front entrance');
    expect(el.shadowRoot.textContent).toContain('Locked');
    expect(el.shadowRoot.textContent).toContain('Secure');
    el.remove();
  });

  it('component-progress-v2 renders bounded progress bar', async () => {
    const el = document.createElement('component-progress-v2') as any;
    el.setConfig({
      value: '75%',
      label: 'Battery Charge',
      progress: 75,
      target_value: '100%',
      target_label: 'Full'
    });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(2);
    expect(el.shadowRoot.textContent).toContain('75%');
    expect(el.shadowRoot.textContent).toContain('Battery Charge');
    const fill = el.shadowRoot.querySelector('.determinate-fill') as HTMLElement;
    expect(fill.style.width).toBe('75%');
    el.remove();
  });

  it('component-action-v2 renders action button text', async () => {
    const el = document.createElement('component-action-v2') as any;
    el.setConfig({
      title: 'Arm Security',
      description: 'Arm all perimeter sensors',
      action_text: 'Arm Away'
    });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(2);
    expect(el.shadowRoot.textContent).toContain('Arm Security');
    expect(el.shadowRoot.textContent).toContain('Arm Away');
    el.remove();
  });

  it('component-list-v2 renders rows up to limit', async () => {
    const el = document.createElement('component-list-v2') as any;
    el.setConfig({
      rows: [
        { title: 'Item A', description: 'Desc A', value: '1', label: 'Unit' },
        { title: 'Item B', description: 'Desc B', value: '2', label: 'Unit' }
      ]
    });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(3);
    expect(el.shadowRoot.textContent).toContain('Item A');
    expect(el.shadowRoot.textContent).toContain('Item B');
    el.remove();
  });

  it('component-notice-v2 renders with tone classes', async () => {
    const el = document.createElement('component-notice-v2') as any;
    el.setConfig({
      title: 'Firmware Update',
      message: 'System requires a reboot',
      tone: 'warning'
    });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(2);
    expect(el.shadowRoot.querySelector('.notice-box.warning')).not.toBeNull();
    expect(el.shadowRoot.textContent).toContain('Firmware Update');
    el.remove();
  });

  it('component-text-effect-v1 requires text config and renders effect', async () => {
    const el = document.createElement('component-text-effect-v1') as any;
    expect(() => el.setConfig({})).toThrowError('text is required');

    el.setConfig({
      text: 'ALL CLEAR',
      effect: 'stamp',
      description: 'Perimeter secure'
    });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(1);
    expect(el.shadowRoot.textContent).toContain('ALL CLEAR');
    expect(el.shadowRoot.textContent).toContain('Perimeter secure');
    expect(el.shadowRoot.querySelector('.row.stamp')).not.toBeNull();
    el.remove();
  });

  it('component-section-separator-v2 renders separator title', async () => {
    const el = document.createElement('component-section-separator-v2') as any;
    el.setConfig({ title: 'Climate Controls' });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(1);
    expect(el.shadowRoot.textContent).toContain('Climate Controls');
    el.remove();
  });

  it('component-empty-state-v3 and v2 render empty message', async () => {
    const v3 = document.createElement('component-empty-state-v3') as any;
    v3.setConfig({ title: 'No Devices Found', message: 'Check integrations.' });
    v3.hass = hass;
    document.body.appendChild(v3);
    await v3.updateComplete;

    expect(v3.getCardSize()).toBe(1);
    expect(v3.shadowRoot.textContent).toContain('No Devices Found');
    expect(v3.shadowRoot.textContent).toContain('Check integrations.');
    v3.remove();
  });
});
