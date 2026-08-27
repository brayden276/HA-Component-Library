# Component History: Home Overview (`component-home-overview-v4` & `component-home-overview-v5`)

## 1. Overview & Lovelace Tag
- **Custom Element Tags:** `component-home-overview-v4`, `component-home-overview-v5` (Alias)
- **Card Types:** `custom:component-home-overview-v4`, `custom:component-home-overview-v5`
- **Classes:** `ComponentHomeOverviewV4`, `ComponentHomeOverviewV5`
- **Directory:** `src/cards/home-overview/`

---

## 2. Intended Functionality
- **Domain Role:** Single-card orchestrated Home overview dashboard providing unified clock/weather header, favourites bar, household directories, smart control collections, and swipeable room directory sheets.
- **Config Contract:**
  - `weather_entity` (optional, string): Weather entity ID for header ambient temperature/cloud summary (defaults to `weather.forecast_home`).
  - `base_path` (optional, string): Dashboard base path for navigation links (defaults to `"/home-control"`).
  - `current_dashboard` (optional, string): Current dashboard key.
- **Interactive & Presentation Rules:**
  - Header Clock & Weather: Wall-clock aligned minute scheduling without timer drift.
  - Composed Card Stack: Integrates `component-welcome-header-v1`, `component-favourites-v3`, `component-household-directory-v3`, `component-smart-collection-v3`, and `component-room-directory-v4`.

---

## 3. Actual Implementation Analysis
- **Architecture:** Inherits `LitBaseCard<HomeOverviewConfig>`.
- **Lifecycle:** Uses `createMinuteScheduler` to refresh clock display on exact `:00.000` minute ticks, cleanly canceled on `disconnectedCallback()`.
- **Interaction:** Manages weather button tap interactions with `hass-more-info` triggers.

---

## 4. Gaps Identified & Remediations
- **Audited Items:**
  - Verified minute timer is torn down on disconnect.
  - Verified both V4 and V5 custom elements and cards are registered in `window.customCards`.
  - Verified timezone and locale formatting adherence.
- **Status:** Complete and verified.

---

## 5. Verification Status
- **TypeScript:** Pass (`tsc --noEmit`)
- **Contract Tests:** `tests/contracts/home.test.ts`, `tests/registration/public-inventory.test.ts`
- **Browser Smoke Test:** Pass
