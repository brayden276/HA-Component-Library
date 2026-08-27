import { describe, it, expect } from 'vitest';
import '../../src/index';

describe('Public Card Inventory & Registration Contract Tests', () => {
  const EXPECTED_CARDS = [
    // Presentation
    'component-context-strip-v3',
    'component-single-kpi-v2',
    'component-three-stat-v2',
    'component-status-row-v2',
    'component-progress-v2',
    'component-action-v2',
    'component-list-v2',
    'component-notice-v2',
    'component-text-effect-v1',
    'component-section-separator-v2',
    'component-empty-state-v3',
    'component-empty-state-v2',

    // Navigation
    'component-quick-nav-v2',
    'component-nav-tile-v2',
    'component-room-navigation-v1',
    'component-room-sheet-v2',

    // Controls & System
    'component-control-row-v2',
    'component-media-row-v2',
    'component-update-summary-v3',
    'component-update-row-v3',
    'component-device-discovery-v2',
    'component-device-aware-auto-entities-v1',

    // Devices
    'component-garage-door-controller-v1',
    'component-wled-controller-v1',
    'component-split-controller-v4',
    'component-apple-tv-controller-v1',
    'component-camera-controller-v2',
    'component-camera-controller-v1',

    // Security
    'component-security-summary-v1',
    'component-security-camera-wall-v3',
    'component-security-entry-points-v1',
    'component-security-dashboard-v1',

    // Energy
    'component-energy-day-selector-v1',
    'component-energy-summary-v1',
    'component-history-graph-v2',
    'solar-daylight-card-v7',
    'energy-history-card-v3',
    'metric-pair-card-v3',
    'component-energy-dashboard-v1',

    // Home
    'component-welcome-header-v1',
    'component-household-attention-v1',
    'component-favourites-v3',
    'component-favourites-minimal-v1',
    'component-smart-collection-v3',
    'component-household-directory-v3',
    'component-room-directory-v4',
    'component-home-overview-v4',
    'component-home-overview-v5'
  ];

  it('registers all 48 custom element tags in customElements registry', () => {
    for (const tag of EXPECTED_CARDS) {
      const cls = customElements.get(tag);
      expect(cls, `Expected custom element <${tag}> to be defined`).toBeDefined();
    }
  });

  it('registers Lovelace cards in window.customCards', () => {
    const customCards = (window as any).customCards || [];
    expect(customCards.length).toBeGreaterThanOrEqual(30);

    const registeredTypes = new Set(customCards.map((c: any) => c.type));
    expect(registeredTypes.has('component-context-strip-v3')).toBe(true);
    expect(registeredTypes.has('component-single-kpi-v2')).toBe(true);
    expect(registeredTypes.has('component-garage-door-controller-v1')).toBe(true);
    expect(registeredTypes.has('component-split-controller-v4')).toBe(true);
    expect(registeredTypes.has('component-security-dashboard-v1')).toBe(true);
    expect(registeredTypes.has('component-energy-dashboard-v1')).toBe(true);
    expect(registeredTypes.has('component-home-overview-v4')).toBe(true);
  });
});
