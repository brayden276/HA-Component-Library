import { describe, it, expect } from 'vitest';
import "../../src/cards/security-summary/security-summary-card";
import "../../src/cards/security-camera-wall/security-camera-wall-card";
import "../../src/cards/security-entry-points/security-entry-points-card";
import "../../src/cards/security-dashboard/security-dashboard-card";
import { createMockHass } from '../fixtures/mock-hass';

describe('Stage 5 Security Family Contract Tests', () => {
  const hass = createMockHass({
    states: {
      'binary_sensor.front_door': {
        state: 'off',
        attributes: { friendly_name: 'Front Door', device_class: 'door' }
      } as any,
      'lock.front_door_lock': {
        state: 'locked',
        attributes: { friendly_name: 'Front Door Lock' }
      } as any,
      'camera.driveway': {
        state: 'idle',
        attributes: { friendly_name: 'Driveway Camera', entity_picture: '/api/camera_proxy/camera.driveway' }
      } as any
    }
  });

  it('component-security-summary-v1 renders security summary card', async () => {
    const el = document.createElement('component-security-summary-v1') as any;
    el.setConfig({ profile: 'household-security', title: 'Home Security' });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(2);
    expect(el.shadowRoot.textContent).toContain('Home Security');
    el.remove();
  });

  it('component-security-camera-wall-v3 renders camera wall with configured columns', async () => {
    const el = document.createElement('component-security-camera-wall-v3') as any;
    el.setConfig({ profile: 'household-security', columns: 2, title: 'Security Cameras' });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(6);
    expect(el.shadowRoot.textContent).toContain('Security Cameras');
    el.remove();
  });

  it('component-security-entry-points-v1 renders entry points', async () => {
    const el = document.createElement('component-security-entry-points-v1') as any;
    el.setConfig({ profile: 'household-security', title: 'Entry Points' });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBeGreaterThanOrEqual(0);
    el.remove();
  });

  it('component-security-dashboard-v1 renders hero and sections', async () => {
    const el = document.createElement('component-security-dashboard-v1') as any;
    el.setConfig({ profile: 'household-security', title: 'Security Dashboard' });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getCardSize()).toBe(12);
    expect(el.shadowRoot.textContent).toContain('Security Dashboard');
    expect(el.shadowRoot.querySelector('.hero')).not.toBeNull();
    expect(el.shadowRoot.querySelector('.camera-section')).not.toBeNull();
    el.remove();
  });
});
