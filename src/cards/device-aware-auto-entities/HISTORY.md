# Component Audit & History: Device-Aware Auto-Entities

## 1. Component Overview & Public Lovelace Tag(s)
- **Component Folder:** `src/cards/device-aware-auto-entities`
- **Class:** `ComponentDeviceAwareAutoEntitiesV1`
- **Registered Custom Element:** `component-device-aware-auto-entities-v1`
- **Registered Card Type:** `custom:component-device-aware-auto-entities-v1`
- **Domain Role:** Dynamic presentation wrapper and bridge for auto-entities collections, providing cohesive section headers, automated exclusion of invalid states, and resilient fallback handling.

---

## 2. Intended Functionality

### Purpose & Scope
This card acts as a decorator/wrapper around `custom:auto-entities`. Rather than manually duplicating entity filters and card configurations across dashboards, this component coordinates clean header rendering, automatically appends state exclusions (`unavailable` and `unknown`), and delegates child card rendering dynamically using Lovelace card helpers.

### Config Contract (`DeviceAwareAutoEntitiesConfig`)
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `type` | `string` | `'custom:component-device-aware-auto-entities-v1'` | Public Lovelace card identifier |
| `filter` | `Record<string, any>` | *(Required)* | Auto-Entities filter criteria (includes/excludes) |
| `header` | `AutoEntitiesHeader` | `undefined` | Optional header configuration containing `title` and `icon` |
| `exclude_invalid_states` | `boolean` | `true` | Automatically excludes entities in `'unavailable'` or `'unknown'` state |
| `...customProps` | `any` | `undefined` | Passthrough properties forwarded directly to inner `custom:auto-entities` |

### Home Assistant Bindings & Lifecycle Delegation
1. **Header Rendering:**
   - If `header.title` is defined, renders a 44px min-height header block (`.head`) with a leading icon (`header.icon` or default `mdi:format-list-bulleted`) and an `<h2>` heading.
2. **Inner Card Construction:**
   - Strips header properties and clones configuration with `type: 'custom:auto-entities'`.
   - Injects exclusion rules for `state: 'unavailable'` and `state: 'unknown'` when `exclude_invalid_states !== false`.
   - Uses `loadCardHelpers()` to instantiate the inner card element dynamically.
3. **Resilient Error Recovery & Retries:**
   - If card helper creation fails or `custom:auto-entities` is not yet registered, schedules a 31-second retry timer and displays a graceful fallback error alert (`<ha-alert alert-type="error">`).
4. **Size & Layout Protocol:**
   - Proxies `getCardSize()` by summing the child card's size plus 1 if a header is present.
   - Proxies `getLayoutOptions()` and `getGridOptions()`.

---

## 3. Actual Implementation Architecture

- **Rendering Lifecycle:** Implemented as a Lit component (`LitBaseCard<DeviceAwareAutoEntitiesConfig>`).
- **DOM Structure:**
  - Optional `.head` section with icon and title.
  - `.body` container holding the instantiated `_innerCard` element (or `<ha-alert>` upon failure).
- **State Synchronization:** Propagates `hass` updates directly to `_innerCard.hass` via `willUpdate()`.

---

## 4. Gaps Identified & Remediations Applied

| Category | Finding | Remediation Applied |
| :--- | :--- | :--- |
| **Lifecycle Gap (Delayed `hass`)** | If `setConfig()` and `connectedCallback()` occurred prior to `hass` assignment (the default Lovelace initialization order), `_buildCard()` exited early. Subsequent updates to `hass` did not invoke `_buildCard()`, leaving the card blank. | Added check in `willUpdate()`: if `!this._innerCard && this.isConnected && this._config && this.hass`, trigger `_buildCard()`. |
| **Environment Helper Fallback** | `loadCardHelpers` was only checked on `globalThis`. In some environments, it may reside on `window`. | Extended loader lookup to check `(globalThis as any).loadCardHelpers || (window as any).loadCardHelpers`. |

---

## 5. Verification Status & Test Evidence

- **Unit / Contract Tests:** `tests/contracts/controls-system.test.ts`
  - Validates error when `filter` config is missing.
  - Validates header rendering and child card instantiation when `hass` is supplied after connection.
- **Lovelace Inventory Registration:** Verified via `tests/registration/public-inventory.test.ts`.
- **Test Results:** 112/112 test suites passing cleanly with zero type errors.
