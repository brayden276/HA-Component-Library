# Component History & Specification: Energy Summary

## 1. Component Overview & Public Lovelace Tag(s)
- **Tag:** `<component-energy-summary-v1>`
- **Type Identifier:** `custom:component-energy-summary-v1` / `component-energy-summary-v1`
- **Class Name:** `ComponentEnergySummaryV1`
- **Module Path:** `src/cards/energy-summary/energy-summary-card.ts`
- **Role:** High-level Energy KPI card presenting real-time power metrics (House, Solar, Grid) alongside cumulative daily energy totals (Consumed, Generated, Imported, Exported kWh).

---

## 2. Intended Functionality

### 2.1 Purpose & Scope
Provides an instant overview of both immediate electrical demand and day-aggregate energy statistics. Coordinates with `energy-day-selector` to show live values when viewing "Today", or daily totals when viewing a historical date.

### 2.2 Config Contract (`EnergySummaryConfig`)
- `type`: `"custom:component-energy-summary-v1"`
- `profile` *(optional, default: `"household-energy"`)*: Backend energy profile ID.
- `day_channel` *(optional, default: `"energy-day"`)*: Named day synchronization channel.
- `title` *(optional, default: `"Energy"`)*: Card title header.

### 2.3 Interactions & Lovelace Contracts
- `getCardSize()`: Returns `3`.
- `getGridOptions()`: Returns `{ columns: 12, rows: "auto" }`.
- **Live Metric Buttons:**
  - **House now:** Opens more-info dialog for house power entity on click.
  - **Solar now:** Opens more-info dialog for solar power entity on click.
  - **Grid now:** Opens more-info dialog for grid power entity on click, showing import/export status.
- **Daily Totals:** Non-interactive summary metrics displaying Consumed kWh, Generated kWh, Imported kWh, and Exported kWh.

### 2.4 Accessibility & Visual Standards
- Live interactive buttons have touch target height >= 44px (`min-height: 68px;`) and descriptive `aria-label`s.
- Clear status feedback messages (`role="status"`) for loading, error, stale, and partial data states.
- Responsive layout adapting from 3 columns (live) and 4 columns (daily) on desktop to 1/2 columns on mobile.

---

## 3. Actual Implementation

### 3.1 Architecture & DOM Rendering
- Extends `LitBaseCard<EnergySummaryConfig>`.
- Renders:
  - Header: Card title, active day label, and "Now" / "Historical" status badge.
  - Live grid: House (W), Solar (W), Grid (W + direction label).
  - Daily grid: Consumed (kWh), Generated (kWh), Imported (kWh), Exported (kWh).
  - Feedback footer: Stale cache warnings or coverage statistics when available.

### 3.2 State / Data Flow & Lifecycle
- Subscribes to `energyDayState` channel for date changes.
- Fetches data from `energyDayData.get()` with automatic caching.
- Handles backend invalidation events via `ha-component-profile-change`.
- Destroys interaction handles, channel subscriptions, and event listeners on `disconnectedCallback()`.

---

## 4. Gaps Identified & Remediations Applied

| Area | Finding / Gap | Remediation Status |
|---|---|---|
| Dynamic Channel Updates | In `setConfig()`, if `day_channel` changed while connected, subscription was not updated dynamically. | **Patched:** Added automatic unsubscription and rebinding in `setConfig()`. |
| Screen-Reader Usability | Live power buttons lacked explicit `aria-label` properties. | **Patched:** Added informative `aria-label` attributes to House, Solar, and Grid buttons. |
| Grid Status Label | Directional text (Importing now, Exporting now, Grid balanced) gracefully falls back when data is missing or invalid. | Verified & intact. |

---

## 5. Verification Status & Test Evidence
- **Vitest Suite:** `tests/contracts/energy.test.ts`
- **Tests Executed:**
  - `component-energy-summary-v1 renders energy metrics, title, and accessible live buttons`
  - Integration verified against `public-inventory.test.ts` and `lovelace-yaml-fixtures.test.ts`.
- **Status:** All unit & integration tests passing.
