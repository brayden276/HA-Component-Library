# Component Audit & History: Device Discovery

## 1. Component Overview & Public Lovelace Tag(s)
- **Component Folder:** `src/cards/device-discovery`
- **Class:** `ComponentDeviceDiscoveryV2`
- **Registered Custom Element:** `component-device-discovery-v2`
- **Registered Card Type:** `custom:component-device-discovery-v2`
- **Domain Role:** System discovery summary and management card, surfacing newly discovered network and hardware devices ready for integration into Home Assistant.

---

## 2. Intended Functionality

### Purpose & Scope
Device Discovery communicates directly with the Home Assistant WebSocket API (`config_entries/flow/progress`) to discover devices waiting in integration queues (mDNS/zeroconf, DHCP, SSDP, Bluetooth, ESPHome, MQTT, USB, HomeKit, etc.). It displays actionable discovery suggestions, supports live background polling, enforces admin-only access control, and provides quick navigation to `/config/integrations/dashboard`.

### Config Contract (`DeviceDiscoveryCardConfig`)
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `type` | `string` | `'custom:component-device-discovery-v2'` | Public Lovelace card identifier |
| `demo` | `boolean` | `false` | Enables static demo mode with mock discovered flows |
| `refresh_seconds` | `number` | `60` | Background polling frequency in seconds (clamped to minimum 30s) |
| `max_rows` | `number` | `6` | Maximum number of discovery suggestion rows displayed before "X more" indicator |

### Home Assistant Bindings & Interactions
1. **WebSocket Discovery Flow:**
   - Issues WS request: `{ type: 'config_entries/flow/progress' }`.
   - Filters flows from known discovery sources (`bluetooth`, `dhcp`, `discovery`, `esphome`, `hardware`, `hassio`, `homekit`, `integration_discovery`, `mqtt`, `ssdp`, `usb`, `zeroconf`).
   - Normalizes friendly names from title placeholders (`name`, `device`, `host`, `handler`) and sorts alphabetically.
2. **Access Control & State Views:**
   - **Admin Access:** Verifies `hass.user.is_admin`. If non-admin, displays security lock state (`mdi:shield-lock-outline`) and cancels background polling.
   - **Loading State:** Displays progress indicator (`mdi:progress-clock`).
   - **Error & Retry State:** Displays error card (`mdi:alert-circle-outline`) with an interactive `Retry` button.
   - **Empty / Success State:** If no devices are waiting, displays check icon (`mdi:check-circle-outline`) and green accent.
   - **Active Flows:** Renders list of discovered devices with human-readable source chips (`mDNS`, `DHCP`, `Bluetooth`, etc.).
3. **Interactive Actions:**
   - Clicking any discovery row or "Review" button navigates to `/config/integrations/dashboard`.
   - Header contains a manual refresh button (`mdi:refresh`) that triggers immediate WS flow reload.
4. **Demo Mode:**
   - Renders static mock rows without initiating network requests or setting background timers.

### Accessibility (a11y) & Visual Standards
- WCAG 2.1 AA 44px min touch targets for refresh button, retry button, review badges, and row buttons.
- ARIA semantics: `aria-label="Refresh discovery"`, `aria-label="Review <Device Name>"`, focus rings (`:focus-visible`).

---

## 3. Actual Implementation Architecture

- **Rendering Lifecycle:** Lit component extending `LitBaseCard<DeviceDiscoveryCardConfig>` with `presentationalCardStyles`.
- **DOM Structure:**
  - Root `<ha-card>` enclosing `.summary` header and mapped `.row` buttons for each discovery flow.
  - Overflow indicator (`.more`) showing remaining suggestions count when total flows exceed `max_rows`.
- **Lifecycle & Resource Management:**
  - Starts background interval polling on connection; clears interval timer (`clearInterval`) and destroys interaction listeners in `disconnectedCallback()`.

---

## 4. Gaps Identified & Remediations Applied

| Category | Finding | Remediation Applied |
| :--- | :--- | :--- |
| **Lifecycle Gap (Delayed `hass`)** | When `connectedCallback()` ran before `hass` was populated on the element, `_start()` exited early. Subsequent updates to `card.hass` did not invoke `_start()`, preventing discovery checks and background polling from ever starting. | Added `willUpdate()` lifecycle hook: if `this.isConnected && this.hass && !this._config?.demo && !this._started`, invoke `this._start()`. |
| **State Reset on Disconnect** | Ensured `_started` flag is reset to `false` and load generation incremented on `disconnectedCallback()`. | Verified in code. |

---

## 5. Verification Status & Test Evidence

- **Unit / Contract Tests:** `tests/contracts/controls-system.test.ts`
  - Validates demo mode rendering and row structure.
  - Validates deferred `hass` assignment initiating discovery WS call and rendering discovered flow rows.
- **Lovelace Inventory Registration:** Verified via `tests/registration/public-inventory.test.ts`.
- **Test Results:** 112/112 test suites passing cleanly with zero type errors.
