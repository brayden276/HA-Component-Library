# Component History: Metric Badge (`ha-metric-badge`)

## 1. Overview & Lovelace Tag
- **Custom Element Tag:** `ha-metric-badge`
- **Card Type:** `custom:ha-metric-badge`
- **Class:** `HaMetricBadge`
- **Directory:** `src/cards/metric-badge/`

---

## 2. Intended Functionality
- **Domain Role:** Micro-metric badge card designed for dense KPI grids, showing an icon bubble, live numeric sensor value with unit, and dynamic color progression based on user-defined numeric thresholds.
- **Config Contract:**
  - `entity` (required, string): Sensor entity ID.
  - `name` (optional, string): Custom label overriding `friendly_name`.
  - `icon` (optional, string): Custom icon overriding entity default.
  - `unit` (optional, string): Custom unit overriding `unit_of_measurement`.
  - `thresholds` (optional, Array<{ value: number, color: string }>): Numeric threshold array sorting colors from low to high.
  - `tap_action` (optional, ActionConfig): Action executed on click/tap (defaults to `more-info`).
- **Interactive & Presentation Rules:**
  - Dynamic color evaluation: Compares numeric entity state against sorted thresholds to dynamically set `--badge-accent-color`.
  - Full keyboard navigation: `tabindex="0"`, `role="button"`, and Space/Enter key handlers.
  - Accessible `aria-label` combining entity name, value, and unit.

---

## 3. Actual Implementation Analysis
- **Architecture:** Inherits `HaBaseCard<HaMetricBadgeConfig>`.
- **Rendering:** `<ha-card class="interactive metric-badge-card">` with `.icon-bubble` and `.metric-data`.
- **Threshold Algorithm:** Correctly sorts thresholds ascending and applies the highest matched threshold color.

---

## 4. Gaps Identified & Remediations
- **Audited Items:**
  - Verified non-numeric state fallback (e.g. `"unavailable"`, string statuses) gracefully defaults to `--primary-color`.
  - Verified keyboard accessibility (Space/Enter) triggers `_handleTap`.
  - Verified `validateConfig` throws descriptive error when `entity` is omitted.
- **Status:** Complete and verified.

---

## 5. Verification Status
- **TypeScript:** Pass (`tsc --noEmit`)
- **Contract Tests:** `tests/contracts/standalone-cards.test.ts`
- **Browser Smoke Test:** Pass
