# Component History: Security Entry Points (`component-security-entry-points-v1`)

## 1. Overview & Lovelace Tag
- **Custom Element Tag:** `component-security-entry-points-v1`
- **Card Type:** `custom:component-security-entry-points-v1`
- **Class:** `ComponentSecurityEntryPointsV1`
- **Directory:** `src/cards/security-entry-points/`

---

## 2. Intended Functionality
- **Domain Role:** Focused security grid displaying all perimeter and interior entry points (doors, windows, garage, gates, locks) with live open/closed/locked state badges.
- **Config Contract:**
  - `profile` (optional, string): Security profile identifier (defaults to `"household-security"`).
  - `title` (optional, string): Card header title (defaults to `"Entry points"`).
- **Interactive & Presentation Rules:**
  - Capability-based Iconography: Resolves dynamic icons based on entity domain (`lock`, `cover`, `binary_sensor`) and device class (`door`, `window`, `garage_door`, `opening`).
  - Open State Highlight: Highlights active or unsecure entries with warning/critical color tokens.
  - More-Info on Tap: Dispatches `hass-more-info` for the target entry entity.

---

## 3. Actual Implementation Analysis
- **Architecture:** Inherits `LitBaseCard<SecurityEntryPointsConfig>`.
- **Runtime Flow:** Uses `loadSecurityModel` from `security-runtime` with monotonic `_sequence` token protection.
- **Lifecycle:** Manages `_interactionHandles` with clean destruction on disconnect.

---

## 4. Gaps Identified & Remediations
- **Audited Items:**
  - Verified profile listener attachment and removal on disconnect.
  - Verified touch target accessibility (>=44px).
  - Verified zero-entries state rendering.
- **Status:** Complete and verified.

---

## 5. Verification Status
- **TypeScript:** Pass (`tsc --noEmit`)
- **Contract Tests:** `tests/contracts/security.test.ts`
- **Browser Smoke Test:** Pass
