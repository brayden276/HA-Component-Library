import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '../..');
const distBundlePath = resolve(rootDir, 'dist/ha-component-library.js');

const bundleJs = readFileSync(distBundlePath, 'utf-8');

// Expected 48 custom elements
const EXPECTED_TAGS = [
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
  'component-quick-nav-v2',
  'component-nav-tile-v2',
  'component-room-navigation-v1',
  'component-room-sheet-v2',
  'component-control-row-v2',
  'component-media-row-v2',
  'component-update-summary-v3',
  'component-update-row-v3',
  'component-device-discovery-v2',
  'component-device-aware-auto-entities-v1',
  'component-garage-door-controller-v1',
  'component-wled-controller-v1',
  'component-split-controller-v4',
  'component-apple-tv-controller-v1',
  'component-camera-controller-v2',
  'component-camera-controller-v1',
  'component-security-summary-v1',
  'component-security-camera-wall-v3',
  'component-security-entry-points-v1',
  'component-security-dashboard-v1',
  'component-energy-day-selector-v1',
  'component-energy-summary-v1',
  'component-history-graph-v2',
  'solar-daylight-card-v7',
  'energy-history-card-v3',
  'metric-pair-card-v3',
  'component-energy-dashboard-v1',
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

async function runSmokeTest() {
  console.log('--- Starting Real Browser Smoke Test (Chromium) ---');
  console.log(`Checking bundle at: ${distBundlePath} (${(bundleJs.length / 1024).toFixed(1)} KB)`);

  // Start tiny HTTP server to serve the bundle as an ES module over HTTP
  const server = http.createServer((req, res) => {
    if (req.url === '/ha-component-library.js') {
      res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' });
      res.end(bundleJs);
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>HA Component Library Browser Smoke Test</title>
</head>
<body>
  <div id="test-container"></div>
  <script type="module" src="/ha-component-library.js"></script>
</body>
</html>`);
    }
  });

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;
  console.log(`Local HTTP test server listening on ${baseUrl}`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const consoleErrors = [];
  const pageErrors = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
      console.error(`[Browser Console Error] ${msg.text()}`);
    } else {
      // console.log(`[Browser Console ${msg.type()}] ${msg.text()}`);
    }
  });

  page.on('pageerror', (err) => {
    pageErrors.push(err.message);
    console.error(`[Browser Page Error] ${err.message}`);
  });

  try {
    await page.goto(baseUrl, { waitUntil: 'networkidle' });

    // 1. Verify module parsed and loaded
    const windowCustomCards = await page.evaluate(() => window.customCards);
    if (!Array.isArray(windowCustomCards)) {
      throw new Error('window.customCards was not initialized as an Array on window');
    }
    console.log(`✓ window.customCards populated with ${windowCustomCards.length} cards`);

    // 2. Verify all 48 custom elements are registered
    const registeredResults = await page.evaluate((tags) => {
      return tags.map((tag) => ({
        tag,
        isDefined: Boolean(customElements.get(tag))
      }));
    }, EXPECTED_TAGS);

    const missing = registeredResults.filter((r) => !r.isDefined);
    if (missing.length > 0) {
      throw new Error(`Missing custom element registrations: ${missing.map((m) => m.tag).join(', ')}`);
    }
    console.log(`✓ All ${EXPECTED_TAGS.length} expected custom elements successfully registered in Chromium`);

    // 3. Test element instantiation, configuration, sizing, and rendering in DOM
    const renderResults = await page.evaluate((tags) => {
      const results = [];
      const container = document.getElementById('test-container');

      const mockHass = {
        states: {
          'light.living_room': { entity_id: 'light.living_room', state: 'on', attributes: { friendly_name: 'Living Room Light' } },
          'sensor.temperature': { entity_id: 'sensor.temperature', state: '21.5', attributes: { friendly_name: 'Temperature', unit_of_measurement: '°C' } },
          'binary_sensor.front_door': { entity_id: 'binary_sensor.front_door', state: 'off', attributes: { friendly_name: 'Front Door' } },
          'cover.garage_door': { entity_id: 'cover.garage_door', state: 'closed', attributes: { friendly_name: 'Garage Door' } },
          'climate.living_room': { entity_id: 'climate.living_room', state: 'heat', attributes: { friendly_name: 'Split AC', temperature: 22, current_temperature: 20 } },
          'media_player.apple_tv': { entity_id: 'media_player.apple_tv', state: 'playing', attributes: { friendly_name: 'Apple TV', media_title: 'Sci-Fi Film' } },
          'light.wled': { entity_id: 'light.wled', state: 'on', attributes: { friendly_name: 'WLED Light' } }
        },
        services: {},
        callService: () => Promise.resolve(),
        connection: {
          sendMessagePromise: () => Promise.resolve([]),
          subscribeEvents: () => Promise.resolve(() => {})
        }
      };

      const sampleConfigs = {
        'component-text-effect-v1': { text: 'Welcome home' },
        'component-room-navigation-v1': { area: 'living_room', navigation_path: '/lovelace/living-room' },
        'component-device-aware-auto-entities-v1': { filter: { include: [{ domain: 'light' }] } },
        'component-garage-door-controller-v1': { entity: 'cover.garage_door', control_entity: 'button.garage_door_operator' },
        'component-wled-controller-v1': { entity: 'light.wled' },
        'component-split-controller-v4': { entity: 'climate.living_room' },
        'component-apple-tv-controller-v1': { entity: 'media_player.apple_tv' }
      };

      for (const tag of tags) {
        try {
          const el = document.createElement(tag);
          const config = { type: `custom:${tag}`, ...(sampleConfigs[tag] || {}) };
          if (typeof el.setConfig === 'function') {
            el.setConfig(config);
          }
          el.hass = mockHass;
          container.appendChild(el);

          const cardSize = typeof el.getCardSize === 'function' ? el.getCardSize() : null;
          const constructor = customElements.get(tag);
          const gridOptions = typeof constructor?.getGridOptions === 'function' ? constructor.getGridOptions() : null;

          results.push({
            tag,
            success: true,
            hasShadowRoot: Boolean(el.shadowRoot),
            cardSize,
            gridOptions
          });
        } catch (err) {
          results.push({ tag, success: false, error: err.message });
        }
      }
      return results;
    }, EXPECTED_TAGS);

    const renderFailures = renderResults.filter((r) => !r.success);
    if (renderFailures.length > 0) {
      throw new Error(`Element instantiation / rendering failures: ${JSON.stringify(renderFailures, null, 2)}`);
    }
    console.log(`✓ All ${EXPECTED_TAGS.length} custom elements instantiated and rendered with mock HomeAssistant`);

    // 4. Test re-importing / double evaluation of module script
    await page.evaluate(() => {
      const s = document.createElement('script');
      s.type = 'module';
      s.src = '/ha-component-library.js';
      document.body.appendChild(s);
    });
    console.log('✓ Double module script evaluation tested without exception');

    if (pageErrors.length > 0 || consoleErrors.length > 0) {
      throw new Error(`Browser reported errors during execution: Page errors: ${pageErrors.length}, Console errors: ${consoleErrors.length}`);
    }

    console.log('=== REAL BROWSER SMOKE TEST PASSED (0 errors) ===');
  } finally {
    await browser.close();
    server.close();
  }
}

runSmokeTest().catch((err) => {
  console.error('FAILED real browser smoke test:', err);
  process.exit(1);
});
