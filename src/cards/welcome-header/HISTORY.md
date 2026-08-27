# Component History: Welcome Header (`component-welcome-header-v1`)

## 1. Overview & Lovelace Tag
- **Custom Element Tag:** `component-welcome-header-v1`
- **Card Type:** `custom:component-welcome-header-v1`
- **Class:** `ComponentWelcomeHeaderV1`
- **Directory:** `src/cards/welcome-header/`

---

## 2. Intended Functionality
- **Domain Role:** Minimal top-level dashboard header presenting the current wall-clock time and an interactive ambient weather button (temperature and cloud coverage).
- **Config Contract:**
  - `weather_entity` (required, string): Weather entity ID (defaults to `weather.forecast_home`).
- **Interactive & Presentation Rules:**
  - Wall-Clock Precision: Minute scheduling accurately aligned to the system minute boundary without setInterval clock drift.
  - Weather Pill: Formats temperature and cloud coverage according to Home Assistant unit preferences, opening weather more-info modal on tap.

---

## 3. Actual Implementation Analysis
- **Architecture:** Inherits `LitBaseCard<WelcomeHeaderConfig>`.
- **Lifecycle:** Uses `createMinuteScheduler` with automatic teardown in `disconnectedCallback()`.
- **Interaction:** Uses `interaction()` handle for the weather pill button with sensory feedback.

---

## 4. Gaps Identified & Remediations
- **Audited Items:**
  - Verified minute scheduler cleans up on disconnect to prevent timer leaks.
  - Verified touch target accessibility (>=44px).
  - Verified timezone and locale formatting adherence.
- **Status:** Complete and verified.

---

## 5. Verification Status
- **TypeScript:** Pass (`tsc --noEmit`)
- **Contract Tests:** `tests/contracts/home.test.ts`
- **Browser Smoke Test:** Pass
