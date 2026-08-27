# Component History & Specification: Energy Dashboard

## 1. Component Overview & Public Lovelace Tag(s)
- **Tag:** `<component-energy-dashboard-v1>`
- **Type Identifier:** `custom:component-energy-dashboard-v1` / `component-energy-dashboard-v1`
- **Class Name:** `ComponentEnergyDashboardV1`
- **Module Path:** `src/cards/energy-dashboard/energy-dashboard-card.ts`
- **Role:** Top-level composite Energy dashboard card coordinating the energy day selector, live/daily summary metrics, solar daylight context, and historical chart visualization.

---

## 2. Intended Functionality

### 2.1 Purpose & Scope
The Energy Dashboard provides a unified, single-card layout that orchestrates the primary energy sub-cards (`energy-day-selector`, `energy-summary`, `solar-daylight`, and `energy-history`). It coordinates their shared day state via an active energy day channel and shares backend energy profiles.

### 2.2 Config Contract (`EnergyDashboardConfig`)
- `type`: `"custom:component-energy-dashboard-v1"`
- `profile` *(optional, default: `"household-energy"`)*: Backend energy profile identifier.
- `day_channel` *(optional, default: `"energy-day"`)*: Pub/Sub broadcast channel for day synchronization.
- `weather_entity` *(optional, default: `"weather.forecast_home"`)*: Weather entity providing cloud coverage.
- `sun_entity` *(optional, default: `"sun.sun"`)*: Sun entity providing solar elevation and daylight phase.

### 2.3 Interactions & Lovelace Contracts
- `getCardSize()`: Returns `12` grid units.
- `getGridOptions()`: Returns `{ columns: 12, rows: "auto" }`.
- Passes the configured `profile`, `day_channel`, `weather_entity`, and `sun_entity` to nested sub-cards.

### 2.4 Accessibility & Visual Standards
- Responsive 12-column grid layout adapting cleanly across desktop, tablet, and mobile viewports.
- Non-blocking layout hierarchy allowing sub-elements to handle their respective touch targets (min 44px) and WCAG 2.1 AA screen-reader properties.

---

## 3. Actual Implementation

### 3.1 Architecture & DOM Rendering
- Extends `LitBaseCard<EnergyDashboardConfig>`.
- Employs a CSS grid container (`.layout`) hosting four key sub-elements:
  1. `<component-energy-day-selector-v1>` for date navigation.
  2. `<component-energy-summary-v1>` for live power & cumulative kWh metrics.
  3. `<solar-daylight-card-v7>` for daylight phase & cloud coverage forecasting.
  4. `<energy-history-card-v3>` for multi-series power trends (House, Solar, Grid).

### 3.2 State / Data Flow & Lifecycle
- Inherits lifecycle management from `LitBaseCard`.
- Sub-components are bound reactively via Lit properties (`.hass` and `.config`).
- Updates propagate cleanly without full-page reloads when HASS states or date channels shift.

---

## 4. Gaps Identified & Remediations Applied

| Area | Finding / Gap | Remediation Status |
|---|---|---|
| Child Binding | Verified that child cards receive complete configs with matching default fallbacks. | Verified & intact. |
| Grid Sizing | Verified card size (`12`) aligns with dashboard panel layout. | Compliant. |
| Error Handling | Gracefully yields empty template when configuration is invalid. | Verified & intact. |

---

## 5. Verification Status & Test Evidence
- **Vitest Suite:** `tests/contracts/energy.test.ts`
- **Tests Executed:**
  - `component-energy-dashboard-v1 renders unified dashboard with all child cards`
  - Integration verified against `public-inventory.test.ts`, `lovelace-yaml-fixtures.test.ts`, and `composition-multi-instance.test.ts`.
- **Status:** All unit & integration tests passing.
