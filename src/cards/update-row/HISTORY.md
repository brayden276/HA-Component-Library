# Component Audit & History: Update Row

## 1. Component Overview & Public Lovelace Tag(s)
- **Component Folder:** `src/cards/update-row`
- **Class:** `ComponentUpdateRowV3`
- **Registered Custom Element:** `component-update-row-v3`
- **Registered Card Type:** `custom:component-update-row-v3`
- **Domain Role:** Dedicated row card for Home Assistant `update.*` entities, displaying installed/latest version metadata, progress bars, and single-click installation with confirmation.

---

## 2. Intended Functionality

### Purpose & Scope
The Update Row card provides a clean, informative interface for managing individual Home Assistant update entities (such as Core, OS, Supervisor, add-ons, HACS integrations, or device firmwares). It displays current installed version, latest available version, update action button, and live installation progress tracking.

### Config Contract (`UpdateRowCardConfig`)
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `type` | `string` | `'custom:component-update-row-v3'` | Public Lovelace card identifier |
| `icon` | `string` | `'mdi:update'` | Leading icon |
| `title` | `string` | `'Update name'` | Fallback title when entity name is unavailable |
| `name` | `string` | `undefined` | Custom display title override |
| `current` | `string` | `'Current 1.0'` | Fallback installed version string |
| `available` | `string` | `'Available 1.1'` | Fallback latest version string |
| `action` | `string` | `'Update'` | Fallback button label |
| `confirm` | `boolean` | `true` | Prompts browser confirmation dialog before installing |
| `entity` | `string \| null` | `null` | Target `update.*` entity ID |

### Home Assistant Bindings & Interactions
1. **Entity Attributes & State Evaluation:**
   - Evaluates `state === 'on'` (update pending) vs `state === 'off'` (current/up-to-date).
   - Reads `attributes.installed_version` and `attributes.latest_version`.
   - Reads `attributes.in_progress`:
     - If numeric / parseable string: renders determinate progress bar (0–100%).
     - If boolean `true`: renders animated indeterminate progress bar.
2. **Update Installation Workflow:**
   - If `confirm !== false`, triggers `window.confirm` with entity name and latest version.
   - Calls `hass.callService('update', 'install', { entity_id })`.
   - Monitors for installation startup with 12s timeout (`_watchForStart`), displaying transient error message if the update fails to begin.
   - Displays 5s auto-dismissing error status if the service call rejects.
3. **Details Interaction:**
   - Clicking the title/version details area triggers `more-info` dialog on the entity.
4. **Offline & Edge Case Handling:**
   - Detects `unavailable` and `unknown` entity states, disabling action button and displaying `"Update entity unavailable"`.

### Accessibility (a11y) & Visual Standards
- WCAG 2.1 AA 44px min touch targets (`.action` min-height: 44px, `.wrap` min-height: 68px).
- ARIA live region: `role="status"` and `aria-live="polite"` on version/status text.
- Progress bar semantics: `role="progressbar"`, `aria-valuemin="0"`, `aria-valuemax="100"`, `aria-valuenow="<value>"`, and `aria-label="Updating <Title>"`.
- Reduced-motion media query support (`prefers-reduced-motion: reduce`) freezes indeterminate sliding animations.

---

## 3. Actual Implementation Architecture

- **Rendering Lifecycle:** Lit component extending `LitBaseCard<UpdateRowCardConfig>` with `updateRowCardStyles` + `updateCardStyles`.
- **DOM Structure:**
  - `<ha-card>` with 2-column grid (`.details` button + `.action` button).
  - Absolute positioned bottom `.progress` bar (determinate or indeterminate).
- **Timer Management:** Cleans up `_startTimer` and `_errorTimer` on `disconnectedCallback()`.

---

## 4. Gaps Identified & Remediations Applied

| Category | Finding | Remediation Applied |
| :--- | :--- | :--- |
| **Progress Attribute Flexibility** | Handles numeric, string number, and boolean `in_progress` attributes. | Fully supported in `_progress()` helper. |
| **Timeout & Error Safety** | Prevents stuck "Starting..." states via 12-second watchdog timer. | Verified in `_watchForStart()` and `_install()`. |
| **Resource Cleanup** | Timers and interaction listeners cleaned up on unmount. | Verified in `disconnectedCallback()`. |

---

## 5. Verification Status & Test Evidence

- **Unit / Contract Tests:** `tests/contracts/controls-system.test.ts`
  - Validates title, installed version, available version, and button text rendering.
  - Validates disabled state on unavailable entity.
  - Validates determinate progress bar rendering with `aria-valuenow="45"`.
- **Lovelace Inventory Registration:** Verified via `tests/registration/public-inventory.test.ts`.
- **Test Results:** 112/112 test suites passing cleanly with zero type errors.
