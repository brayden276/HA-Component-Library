# Component History & Specification: Energy History Card

## 1. Component Overview & Public Lovelace Tag(s)
- **Tag:** `<energy-history-card-v3>`
- **Type Identifier:** `custom:energy-history-card-v3` / `energy-history-card-v3`
- **Class Name:** `EnergyHistoryCardV3`
- **Module Path:** `src/cards/energy-history/energy-history-card.ts`
- **Role:** High-density, readable power history chart rendering House consumption, Solar generation, and signed Grid import/export curves across rolling windows or synchronized calendar days.

---

## 2. Intended Functionality

### 2.1 Purpose & Scope
Displays real-time and historical power usage in watts across house load, solar PV output, and grid power. Supports both live rolling windows (e.g. 24-hour) and full calendar day views driven by the selected day channel or backend energy profile.

### 2.2 Config Contract (`EnergyHistoryConfig`)
- `type`: `"custom:energy-history-card-v3"`
- `profile` *(optional, default: `null`)*: Backend energy profile ID.
- `house_entity` *(optional, default: `"sensor.house_consumption_power"`)*: House consumption power sensor.
- `solar_entity` *(optional, default: `"sensor.total_solar_power"`)*: Solar generation power sensor.
- `grid_entity` *(optional, default: `"sensor.refoss_smart_energy_monitor_em_channel_3_power"`)*: Grid bidirectional power sensor.
- `hours` *(optional, default: `24`)*: Number of hours to display in rolling mode.
- `bucket_minutes` *(optional, default: `10`)*: Averaging bucket resolution.
- `calendar_day` *(optional, default: `false`)*: Whether to anchor the chart to a local midnight-to-midnight day.
- `day_channel` *(optional, default: `null`)*: Date sync channel name.

### 2.3 Interactions & Lovelace Contracts
- `getCardSize()`: Returns `7`.
- `getGridOptions()`: Returns `{ columns: 12, rows: "auto" }`.
- **Legend Buttons:** House, Solar, and Grid buttons in the header open the Home Assistant "More Info" dialog for the respective entity on tap/click.
- **Interactive SVG:** Renders dynamic grid lines, power axis formatting, time scale markers, and signed grid partition.

### 2.4 Accessibility & Visual Standards
- Legend action buttons have `min-height: 44px;` and explicit `aria-label` attributes (`"House power history details"`, `"Solar power history details"`, `"Grid power history details"`).
- SVG has `role="img"` and `aria-label="Household power history"`.
- Loading and empty states render friendly status messages with appropriate contrast.

---

## 3. Actual Implementation

### 3.1 Architecture & DOM Rendering
- Extends `LitBaseCard<EnergyHistoryConfig>`.
- Generates a vector SVG with viewBox `0 0 800 420` containing:
  - Upper section: Solar fill, Solar line (warning color), House line (primary color), Y-axis power labels.
  - Middle section: Time axis labels formatted to user locale.
  - Lower section: Signed zero-line with Grid import/export line and text indicators.

### 3.2 State / Data Flow & Lifecycle
- Subscribes to `ha-component-profile-change` and `energyDayState` channel.
- Fetches profile series data via `energyDayData.get()` with stale cache management.
- Cleans up window event listeners, day subscription, and interaction handles in `disconnectedCallback()`.

---

## 4. Gaps Identified & Remediations Applied

| Area | Finding / Gap | Remediation Status |
|---|---|---|
| Dynamic Channel Switching | In `setConfig()`, if `day_channel` changed dynamically while connected, subscription was not refreshed until reconnect. | **Patched:** Added `_bindDayChannel()` call inside `setConfig()`. |
| Screen-Reader Usability | Legend buttons lacked descriptive `aria-label` attributes. | **Patched:** Added explicit `aria-label` attributes to House, Solar, and Grid buttons. |
| Invalidation | Profiles invalidated on backend profile event broadcasts. | Verified & intact. |

---

## 5. Verification Status & Test Evidence
- **Vitest Suite:** `tests/contracts/energy.test.ts`
- **Tests Executed:**
  - `energy-history-card-v3 renders chart, legend keys, and accessible labels`
  - Integration verified against `public-inventory.test.ts` and `lovelace-yaml-fixtures.test.ts`.
- **Status:** All unit & integration tests passing.
