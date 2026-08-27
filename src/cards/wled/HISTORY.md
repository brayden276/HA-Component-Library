# Component History: WLED Controller (`component-wled-controller-v1`)

## 1. Overview & Lovelace Tag
- **Custom Element Tag:** `component-wled-controller-v1`
- **Card Type:** `custom:component-wled-controller-v1`
- **Class:** `ComponentWledControllerV1`
- **Directory:** `src/cards/wled/`

---

## 2. Intended Functionality
- **Domain Role:** Device-aware WLED lighting controller discovering and bundling all segment lights, preset selects, color palettes, effect speeds, and intensity numbers under the target WLED device.
- **Config Contract:**
  - `entity` (required, string): Master WLED light entity (e.g. `light.wled_strip`).
  - `name` (optional, string): Custom display name.
- **Interactive & Presentation Rules:**
  - Device Bundle Discovery: Automatically locates companion entities (`select.wled_preset`, `select.wled_color_palette`, `number.wled_speed`, `number.wled_intensity`, segment lights) via `centralRegistry`.
  - Smooth Brightness Coalescing: Live touch/mouse brightness slider using `createRequestCoalescer` with optimistic local intent tracking and rollback.
  - Preset & Effect Modal: Native `<dialog>` modal with instant preset activation and live segment toggles.

---

## 3. Actual Implementation Analysis
- **Architecture:** Inherits `LitBaseCard<WledControllerConfig>`.
- **Registry Integration:** Subscribes to `centralRegistry.subscribe(this.hass, ...)` on connection and cleanly unbinds on disconnect.
- **Async Safety:** `_brightnessCoalescer` cleans up debounce timers and handles on `disconnectedCallback()`.

---

## 4. Gaps Identified & Remediations
- **Audited Items:**
  - Verified registry subscription ref-count unbinds on disconnect.
  - Verified brightness slider hit target conforms to WCAG 2.1 AA (>=44px).
  - Verified modal backdrop click dismisses dialog cleanly.
- **Status:** Complete and verified.

---

## 5. Verification Status
- **TypeScript:** Pass (`tsc --noEmit`)
- **Contract Tests:** `tests/contracts/devices.test.ts`
- **Browser Smoke Test:** Pass
