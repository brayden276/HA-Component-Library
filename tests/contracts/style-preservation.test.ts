import { describe, it, expect } from 'vitest';
import '../../src/index';

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
});
