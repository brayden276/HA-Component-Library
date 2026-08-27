# Component History & Specification: Energy Day Selector

## 1. Component Overview & Public Lovelace Tag(s)
- **Tag:** `<component-energy-day-selector-v1>`
- **Type Identifier:** `custom:component-energy-day-selector-v1` / `component-energy-day-selector-v1`
- **Class Name:** `ComponentEnergyDaySelectorV1`
- **Module Path:** `src/cards/energy-day-selector/energy-day-selector-card.ts`
- **Role:** Interactive date-navigation bar providing previous/next day stepping, native date picker integration, return-to-today shortcut, and cross-card date synchronization via `energyDayState`.

---

## 2. Intended Functionality

### 2.1 Purpose & Scope
The Energy Day Selector is the single source of truth for the active energy reporting date across all Energy cards in a view. It allows users to cycle through historical days or jump to a specific date, propagating date changes through session storage and subscriber channels.

### 2.2 Config Contract (`EnergyDaySelectorConfig`)
- `type`: `"custom:component-energy-day-selector-v1"`
- `channel` *(optional, default: `"energy-day"`)*: Named date synchronization channel.
- `title` *(optional, default: `"Energy day"`)*: Accessible title text.

### 2.3 Interactions & Lovelace Contracts
- `getCardSize()`: Returns `1`.
- `getGridOptions()`: Returns `{ columns: 12, rows: "auto" }`.
- **Navigation Controls:**
  - **Previous Day:** Decrements selected date by 1 day (with press-and-hold acceleration).
  - **Next Day:** Increments selected date by 1 day (disabled if currently on today).
  - **Date Picker:** Native invisible `<input type="date">` overlay with `max="${todayStr}"`.
  - **Today Shortcut:** Instantly jumps back to the current day in the Home Assistant timezone.

### 2.4 Accessibility & Visual Standards
- Touch targets conform to WCAG 2.1 AA (all buttons have `min-width: 44px; min-height: 44px`).
- Explicit `aria-label` attributes on Previous (`"Previous day"`), Next (`"Next day"`), Today (`"Return to today"`), and Date Input (`"Select Energy day"`).
- Current status pill with `role="status"` indicating `"Today"` or `"Historical"`.
- Keyboard accessible with `:focus-visible` outlines.

---

## 3. Actual Implementation

### 3.1 Architecture & DOM Rendering
- Built with LitElement extending `LitBaseCard<EnergyDaySelectorConfig>`.
- Renders a 4-column responsive grid layout:
  `[Previous Button] [Date Display + Native Date Input] [Next Button] [Today Button]`
- On small screens (`<= 420px`), collapses Today text to icon-only while preserving touch target.

### 3.2 State / Data Flow & Lifecycle
- Subscribes to `energyDayState` on `connectedCallback()` and unsubscribes on `disconnectedCallback()`.
- Updates dynamically if `channel` changes in `setConfig()`.
- Manages interaction handles through `interaction()` utility with repeat/accelerate support and clean teardown in `disconnectedCallback()`.

---

## 4. Gaps Identified & Remediations Applied

| Area | Finding / Gap | Remediation Status |
|---|---|---|
| Dynamic Channel Switching | In `setConfig()`, if the channel changed while the card was connected, subscription remained on the previous channel. | **Patched:** Added automatic unsubscription and rebinding in `setConfig()`. |
| Timezone Alignment | Date operations use `energyDayState.today(this.hass)` respecting HA configured time zone. | Verified & intact. |
| Memory Safety | All interaction handles and subscriptions cleanly destroyed on disconnect. | Verified & intact. |

---

## 5. Verification Status & Test Evidence
- **Vitest Suite:** `tests/contracts/energy.test.ts`
- **Tests Executed:**
  - `component-energy-day-selector-v1 renders day label and navigation buttons with a11y`
  - Integration verified against `public-inventory.test.ts` and `lovelace-yaml-fixtures.test.ts`.
- **Status:** All unit & integration tests passing.
