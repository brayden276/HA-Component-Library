# Component History: Single KPI (`component-single-kpi-v2`)

## 1. Overview & Lovelace Tag
- **Custom Element Tag:** `component-single-kpi-v2`
- **Card Type:** `custom:component-single-kpi-v2`
- **Class:** `ComponentSingleKpiV2`
- **Directory:** `src/cards/single-kpi/`

---

## 2. Intended Functionality
- **Domain Role:** Hero metric display showcasing a primary numeric or string KPI, a descriptive label, and secondary supporting context with optional tap actions.
- **Config Contract:**
  - `value` (optional, string): Primary hero value (e.g. `"24.5°"`, `"$142"`, `"98%"`). Defaults to `"00"`.
  - `label` (optional, string): Primary metric title (e.g. `"Solar Output"`, `"Indoor Temp"`). Defaults to `"Primary metric"`.
  - `support_value` (optional, string): Supporting metric number or status (defaults to `"00"`).
  - `support_label` (optional, string): Supporting context text (defaults to `"Supporting context"`).
  - `interactive` (optional, boolean): Whether the card behaves as a clickable button (defaults to `true`).
  - `entity` (optional, string): Entity ID for more-info popup on tap.
  - `navigation_path` (optional, string): URL/dashboard path to navigate on tap.
- **Interactive & Presentation Rules:**
  - If `navigation_path` is specified, tapping navigates to the target dashboard view.
  - If `entity` is specified (and no navigation path), tapping dispatches `hass-more-info`.
  - If non-interactive or no action is configured, renders a semantic non-interactive container without button wrappers.
  - Touch feedback and gesture handling via shared `interaction` utility with full teardown.

---

## 3. Actual Implementation Analysis
- **Architecture:** Inherits `LitBaseCard<SingleKpiCardConfig>`.
- **Interaction Management:** Holds `_interactionHandle: InteractionHandle | null`, properly created in `updated()` and destroyed in `disconnectedCallback()`.
- **Rendering:** Renders `<ha-card>` containing either `<button class="demo">` or `<div class="demo-static">`.
- **Escaping:** All user-supplied strings are sanitized with `this.esc()`.

---

## 4. Gaps Identified & Remediations
- **Audited Items:**
  - Verified touch target accessibility (>=44px).
  - Verified interaction teardown prevents listener accumulation across re-renders.
  - Verified navigation priority over more-info entity dispatch.
- **Status:** Complete and verified. Implementation conforms strictly to design.

---

## 5. Verification Status
- **TypeScript:** Pass (`tsc --noEmit`)
- **Contract Tests:** `tests/contracts/presentation.test.ts`, `tests/registration/public-inventory.test.ts`
- **Browser Smoke Test:** Pass
