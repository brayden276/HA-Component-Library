# Component History: Security Dashboard (`component-security-dashboard-v1`)

## 1. Overview & Lovelace Tag
- **Custom Element Tag:** `component-security-dashboard-v1`
- **Card Type:** `custom:component-security-dashboard-v1`
- **Class:** `ComponentSecurityDashboardV1`
- **Directory:** `src/cards/security-dashboard/`

---

## 2. Intended Functionality
- **Domain Role:** Single-card flagship security station bringing together security summaries, quick actions (arm home/away, lock all), entry point statuses (doors, windows, garage, locks), and live camera feeds into an orchestrated master layout.
- **Config Contract:**
  - `profile` (optional, string): Security profile identifier (defaults to `"household-security"`).
  - `title` (optional, string): Card title (defaults to `"Security"`).
  - `camera_columns` (optional, number): Camera grid columns (1 to 3, defaults to 2).
  - `refresh_seconds` (optional, number): Snapshot refresh interval (defaults to 15s).
- **Interactive & Presentation Rules:**
  - Integrated Security Summary: Shows alarm system status, unacknowledged exceptions, open entry count, and active alerts.
  - Entry Points Grid: Interactive entry status pills with 2-step confirmation on lock/unlock and garage door toggles.
  - Camera Wall & Live Modal: Snapshot grid with live streaming dialog modal (`<dialog>`) on camera card tap.

---

## 3. Actual Implementation Analysis
- **Architecture:** Inherits `LitBaseCard<SecurityDashboardConfig>`.
- **Runtime Flow:** Uses `loadSecurityModel` from `security-runtime` to discover capabilities and entities dynamically.
- **Async & Lifecycle:** Implements `_sequence` tracking, visibility-aware refresh timers, profile update custom event listeners, and clean dialog teardown.

---

## 4. Gaps Identified & Remediations
- **Audited Items:**
  - Verified snapshot intervals and confirmation timers are cleared on disconnect.
  - Verified native `<dialog>` handles backdrop clicks and ESC key dismissal cleanly.
  - Verified responsive container query CSS variables `--security-columns`.
- **Status:** Complete and verified.

---

## 5. Verification Status
- **TypeScript:** Pass (`tsc --noEmit`)
- **Contract Tests:** `tests/contracts/security.test.ts`
- **Browser Smoke Test:** Pass
