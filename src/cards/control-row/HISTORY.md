# Component Audit & History: Control Row

## 1. Component Overview & Public Lovelace Tag(s)
- **Component Folder:** `src/cards/control-row`
- **Class:** `ComponentControlRowV2`
- **Registered Custom Element:** `component-control-row-v2`
- **Registered Card Type:** `custom:component-control-row-v2`
- **Domain Role:** Universal compact entity control row for Lovelace dashboards, supporting sliders, switches, static state values, and custom service actions.

---

## 2. Intended Functionality

### Purpose & Scope
The Control Row provides a high-density, versatile entity control interface designed for dashboards. It offers 4 distinct operation modes (`slider`, `switch`, `state`, `action`), enabling seamless control over lights, fans, numeric helpers, switches, and custom service targets with unified visual alignment and interaction mechanics.

### Config Contract (`ControlRowCardConfig`)
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `type` | `string` | `'custom:component-control-row-v2'` | Public Lovelace card identifier |
| `icon` | `string` | `'mdi:lightbulb-outline'` | Leading icon |
| `title` | `string` | `'Control name'` | Primary display headline |
| `state` | `string` | `'Current state'` | Static secondary text or fallback state string |
| `mode` | `'slider' \| 'switch' \| 'state' \| 'action'` | `'slider'` | Operation mode of the trailing control |
| `value` | `number` | `68` | Default percentage/value (0–100) or fallback metric |
| `entity` | `string \| null` | `null` | Target Home Assistant entity ID |
| `on` | `boolean` | `true` | Fallback switch toggle state in preview mode |
| `slider_service` | `object` | `undefined` | Custom service call override for slider value changes |
| `service` | `string` | `undefined` | Service string (`domain.service`) for action mode |
| `service_data` | `Record<string, any>` | `undefined` | Service data payload for action mode |

### Home Assistant Bindings & Interactions
1. **Slider Mode:**
   - **Lights (`light.*`):** Maps 0–100% to `brightness` (0–255), calling `light.turn_on` (with `brightness_pct`) or `light.turn_off` at 0%.
   - **Fans (`fan.*`):** Maps percentage directly via `fan.set_percentage`.
   - **Numbers (`number.*`, `input_number.*`):** Linearly maps 0–100% across the entity's configured `min` and `max` attributes via `set_value`.
   - **Request Coalescing:** Throttles rapid slider input via `RequestCoalescer`, rolling back visually on service error.
   - **Details Interaction:** Clicking the identity text area triggers `more-info` for the target entity.
2. **Switch Mode:**
   - Calls `homeassistant.toggle` on the target entity.
   - Applies optimistic UI toggling with automatic rollback on service failure or timeout via `waitForEntityState`.
   - Long-press / hold triggers `more-info`.
3. **State Mode:**
   - Displays live formatted entity state via `hass.formatEntityState(state)`.
4. **Action Mode:**
   - Calls the configured `service` with `service_data`, or falls back to opening `more-info`.
5. **Disconnected / Preview Mode:**
   - If `entity` is not configured, clicking the row cycles slider values or toggles the switch in interactive preview.

### Accessibility (a11y) & Visual Standards
- Touch targets conform to WCAG 2.1 AA (44px min hit area via `.live-slider` transparent hit target and 56px minimum row height).
- ARIA semantics: `aria-label`, `aria-pressed` on switch buttons, `role="button"` and `tabindex="0"` on identity area when interactive.
- Full keyboard focus outlines (`:focus-visible`) and native keyboard handling on sliders (`<input type="range">`).

---

## 3. Actual Implementation Architecture

- **Rendering Lifecycle:** Implemented as a reactive Lit component (`LitBaseCard<ControlRowCardConfig>`) extending base styles (`controlRowCardStyles` + `dashboardBaseCardStyles`).
- **DOM Structure:**
  - Outer `<ha-card>` enclosing either an interactive `<button class="i row">` or static `<div class="row row-static">`.
  - Inner 3-column CSS grid: leading `.icon` (36px), `.identity` (title + description), trailing `.control` (slider, switch, metric, or action button).
- **State Handling:**
  - Evaluates `unavailable` and `unknown` states to safely disable interactive controls and render `"Unavailable"` status text.
  - Lifecycle cleanup: destroys all `InteractionHandle` listeners and cleans up the active `RequestCoalescer` in `disconnectedCallback()`.

---

## 4. Gaps Identified & Remediations Applied

| Category | Finding | Remediation |
| :--- | :--- | :--- |
| **Availability Fallbacks** | Entity state checks properly verify `unavailable` and `unknown`. | Verified; handles missing and unavailable entities with disabled states and descriptive text. |
| **Lifecycle & Cleanup** | Slider coalescer and DOM event listeners must release on disconnect. | Verified; `_resetCoalescer()` and `_interactionHandles` cleanup in `disconnectedCallback()`. |
| **Accessibility** | 44px touch target on range slider overlay. | Verified; `.live-slider` uses `inset: -19px 0` over 5px bar for 44px hit target. |

---

## 5. Verification Status & Test Evidence

- **Unit / Contract Tests:** `tests/contracts/controls-system.test.ts`
  - Validates live slider rendering, entity description, and card size calculation.
  - Validates switch mode toggling and unavailable entity fallback handling.
- **Lovelace Inventory Registration:** Verified via `tests/registration/public-inventory.test.ts`.
- **Test Results:** 112/112 test suites passing cleanly with zero type errors.
