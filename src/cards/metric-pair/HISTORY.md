# Component History: Metric Pair Card (`metric-pair-card-v3`)

## 1. Overview & Lovelace Tag
- **Custom Element Tag:** `metric-pair-card-v3`
- **Card Type:** `custom:metric-pair-card-v3`
- **Class:** `ComponentMetricPairCardV3`
- **Directory:** `src/cards/metric-pair/`

---

## 2. Intended Functionality
- **Domain Role:** High-density split-metric card designed for energy dashboards, displaying live instantaneous power on the left alongside selected-day cumulative energy statistics on the right.
- **Config Contract:**
  - `left_entity` / `power_entity` (optional, string): Live power sensor entity ID (e.g. `sensor.solar_power`).
  - `right_entity` / `energy_entity` (optional, string): Cumulative energy statistic entity ID.
  - `left_value`, `left_label`: Fallback/explicit left metric text.
  - `right_value`, `right_label`, `right_primary`, `right_secondary`: Fallback/explicit right metric text.
  - `deadband` (optional, number): Noise filtering threshold in Watts for live power (defaults to 15W).
  - `day_channel` (optional, string): Synchronization channel for `energyDayState` (defaults to `"energy-day"`).
- **Interactive & Presentation Rules:**
  - Shared Selected-Day Sync: Automatically synchronizes query date range with other Energy cards on the same channel.
  - Intelligent Formatting: Converts Watts/Kilowatts seamlessly via `formatPower` and `formatEnergy`.
  - Tap Actions: Left and right metric sides support independent more-info modals or navigation targets.

---

## 3. Actual Implementation Analysis
- **Architecture:** Inherits `LitBaseCard<MetricPairConfig>`.
- **Channel Synchronization:** Subscribes to `energyDayState` in `connectedCallback()` and unbinds cleanly in `disconnectedCallback()`.
- **Interaction:** Uses `interaction()` handle on all clickable panels with sensory feedback.

---

## 4. Gaps Identified & Remediations
- **Audited Items:**
  - Verified `_dayUnsubscribe` unbinds properly to prevent memory leaks across DOM detachments.
  - Verified deadband filtering prevents jitter around 0 Watts.
  - Verified touch targets (>=44px) across left and right action zones.
- **Status:** Complete and verified.

---

## 5. Verification Status
- **TypeScript:** Pass (`tsc --noEmit`)
- **Contract Tests:** `tests/contracts/energy.test.ts`
- **Browser Smoke Test:** Pass
