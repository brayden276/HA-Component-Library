# Component History: Solar Daylight Context (`solar-daylight-card-v7`)

## 1. Overview & Lovelace Tag
- **Custom Element Tag:** `solar-daylight-card-v7`
- **Card Type:** `custom:solar-daylight-card-v7`
- **Class:** `SolarDaylightCardV7`
- **Directory:** `src/cards/solar-daylight/`

---

## 2. Intended Functionality
- **Domain Role:** Ambient solar and daylight forecasting card calculating next solar transitions (dawn, sunrise, solar noon, sunset, dusk) alongside real-time and projected cloud coverage (+4 hours, +8 hours).
- **Config Contract:**
  - `weather_entity` (optional, string): Weather entity for hourly cloud forecasts (defaults to `weather.forecast_home`).
  - `sun_entity` (optional, string): Sun entity for solar event calculations (defaults to `sun.sun`).
- **Interactive & Presentation Rules:**
  - Forecast Retrieval: Queries `weather.get_forecasts` with type `hourly`, extracting cloud coverage with exponential backoff on failure.
  - Solar Event Inference: Calculates next upcoming solar milestone and renders a contextual icon and formatted timestamp.
  - Tap Action: Dispatches `hass-more-info` for the weather entity.

---

## 3. Actual Implementation Analysis
- **Architecture:** Inherits `LitBaseCard<SolarDaylightCardConfig>`.
- **Forecast Interpolation:** Finds closest hourly forecast timestamp within a ±90 minute window for +4h and +8h projections.
- **Lifecycle:** `_interactionHandle` is cleanly created in `updated()` and destroyed in `disconnectedCallback()`.

---

## 4. Gaps Identified & Remediations
- **Audited Items:**
  - Verified compatibility with Home Assistant Core 2024+ `weather.get_forecasts` response envelope.
  - Verified touch target accessibility (>=44px).
  - Verified null/undefined safety on missing sun attributes.
- **Status:** Complete and verified.

---

## 5. Verification Status
- **TypeScript:** Pass (`tsc --noEmit`)
- **Contract Tests:** `tests/contracts/energy.test.ts`
- **Browser Smoke Test:** Pass
