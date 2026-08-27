# Component Audit & History: Update Summary

## 1. Component Overview & Public Lovelace Tag(s)
- **Component Folder:** `src/cards/update-summary`
- **Class:** `ComponentUpdateSummaryV3`
- **Registered Custom Element:** `component-update-summary-v3`
- **Registered Card Type:** `custom:component-update-summary-v3`
- **Domain Role:** Aggregated system update status card with optional multi-entity batch installation ("Update all") and priority sequencing.

---

## 2. Intended Functionality

### Purpose & Scope
The Update Summary card presents a high-level summary of available updates across Home Assistant. It features a bold metric count, descriptive message, and an optional "Update all" action button capable of batch installing updates while respecting critical system upgrade order (Supervisor -> OS -> Core -> add-ons / integrations).

### Config Contract (`UpdateSummaryCardConfig`)
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `type` | `string` | `'custom:component-update-summary-v3'` | Public Lovelace card identifier |
| `count` | `string` | `'3'` | Static count display in preview mode |
| `title` | `string` | `'updates available'` | Static headline text in preview mode |
| `message` | `string` | `'Review the items below before installing.'` | Static status description in preview mode |
| `live_updates` | `boolean` | `false` | Dynamically queries Home Assistant states for pending `update.*` entities |
| `update_all` | `boolean` | `false` | Displays the "Update all" batch install button |
| `confirm` | `boolean` | `true` | Prompts browser confirmation dialog before starting batch installation |
| `entities` | `string[]` | `undefined` | Optional whitelist of specific `update.*` entity IDs to track/install |

### Home Assistant Bindings & Interactions
1. **Dynamic Update Aggregation (`live_updates: true`):**
   - Filters `hass.states` for entity IDs starting with `update.` (restricted to `config.entities` whitelist if specified).
   - Counts entities with `state === 'on'`.
   - Generates dynamic headline (`"update available"` vs `"updates available"`) and description (`"Review the items below..."` or `"Everything is current."`).
2. **Prioritized Batch Installation ("Update all"):**
   - Filters pending entities excluding those already marked `in_progress`.
   - If `confirm !== false`, prompts `window.confirm` warning that Home Assistant may restart.
   - Executes batch service calls in two distinct phases:
     1. **Normal Add-ons & Integrations:** Dispatches single batch call `update.install` with array of entity IDs.
     2. **Critical System Updates (Ordered):** Dispatches individual calls for Supervisor (`update.home_assistant_supervisor_update`), OS (`update.home_assistant_operating_system_update`), and Core (`update.home_assistant_core_update`).
   - Displays indeterminate progress bar while requests are dispatching.
   - Shows 5-second auto-clearing error banner upon service failure.

### Accessibility (a11y) & Visual Standards
- WCAG 2.1 AA 44px min touch target on `.all` button (`min-height: 44px`, padding 0 14px).
- ARIA live region: `role="status"` and `aria-live="polite"` on `.desc` message text.
- Progress bar semantics: `role="progressbar"`, `aria-label="Starting available updates"`.

---

## 3. Actual Implementation Architecture

- **Rendering Lifecycle:** Lit component extending `LitBaseCard<UpdateSummaryCardConfig>` with `updateSummaryCardStyles` + `updateCardStyles`.
- **DOM Structure:**
  - `<ha-card>` enclosing `.wrap` 3-column layout: `.count` (27px bold number), headline + description container, and `.all` action button.
  - Absolute positioned bottom indeterminate `.progress` indicator during service execution.
- **Timer Management:** Cleans up `_messageTimer` and interaction handles on `disconnectedCallback()`.

---

## 4. Gaps Identified & Remediations Applied

| Category | Finding | Remediation Applied |
| :--- | :--- | :--- |
| **System Priority Ordering** | Verified Supervisor, OS, and Core update sequencing in batch installs. | Verified; priority list is processed in correct sequence after non-system updates. |
| **Whitelisting Support** | Verified `config.entities` filtering for subset tracking. | Verified in `_all()` helper. |
| **Resource Cleanup** | Verified message dismissal timer and interaction handle destruction. | Verified in `disconnectedCallback()`. |

---

## 5. Verification Status & Test Evidence

- **Unit / Contract Tests:** `tests/contracts/controls-system.test.ts`
  - Validates dynamic live update count calculation and button rendering.
  - Validates `getCardSize()` returning 1.
- **Lovelace Inventory Registration:** Verified via `tests/registration/public-inventory.test.ts`.
- **Test Results:** 112/112 test suites passing cleanly with zero type errors.
