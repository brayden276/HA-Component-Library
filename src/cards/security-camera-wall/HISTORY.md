# Component History: Security Camera Wall (`component-security-camera-wall-v3`)

## 1. Overview & Lovelace Tag
- **Custom Element Tag:** `component-security-camera-wall-v3`
- **Card Type:** `custom:component-security-camera-wall-v3`
- **Class:** `ComponentSecurityCameraWallV3`
- **Directory:** `src/cards/security-camera-wall/`

---

## 2. Intended Functionality
- **Domain Role:** Multi-camera surveillance wall providing low-bandwidth snapshot matrix previews, capability detection pills, and click-to-view live streaming.
- **Config Contract:**
  - `profile` (optional, string): Security profile identifier (defaults to `"household-security"`).
  - `columns` (optional, number): Number of grid columns (1 to 3, defaults to 2).
  - `title` (optional, string): Card header title (defaults to `"Camera wall"`).
  - `refresh_seconds` (optional, number): Snapshot refresh interval in seconds (minimum 10s, defaults to 15s).
  - `cameras` (optional, string[]): Explicit array of camera entity IDs to filter.
- **Interactive & Presentation Rules:**
  - Visibility Awareness: Pauses snapshot refreshing when browser tab is inactive (`document.visibilityState === "hidden"`) to save network/HA CPU bandwidth.
  - Live View Event: Clicking a camera card dispatches `security-camera-view-request` to open modal stream viewers.

---

## 3. Actual Implementation Analysis
- **Architecture:** Inherits `LitBaseCard<SecurityCameraWallConfig>`.
- **Runtime Integration:** Integrates with `loadSecurityModel` from `security-runtime`.
- **Lifecycle & Cleanups:** Cleans up `visibilitychange`, `ha-component-profile-change` listeners, and refresh interval in `disconnectedCallback()`.

---

## 4. Gaps Identified & Remediations
- **Audited Items:**
  - Verified refresh interval is cleared on disconnect.
  - Verified visibilitychange handler resumes snapshot updates immediately on tab focus.
  - Verified grid columns style variable adapts properly.
- **Status:** Complete and verified.

---

## 5. Verification Status
- **TypeScript:** Pass (`tsc --noEmit`)
- **Contract Tests:** `tests/contracts/security.test.ts`, `tests/contracts/composition-multi-instance.test.ts`
- **Browser Smoke Test:** Pass
