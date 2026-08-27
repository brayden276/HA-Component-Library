# Component History: Smart Control Collection (`component-smart-collection-v3`)

## 1. Overview & Lovelace Tag
- **Custom Element Tag:** `component-smart-collection-v3`
- **Card Type:** `custom:component-smart-collection-v3`
- **Class:** `ComponentSmartCollectionV3`
- **Directory:** `src/cards/smart-collection/`

---

## 2. Intended Functionality
- **Domain Role:** Dynamic registry-driven collection card discovering and grouping control rows by area, media domain, or active device state without refresh teardown.
- **Config Contract:**
  - `mode` (optional, `"all"` | `"area"` | `"media"` | `"active"`): Collection filter strategy (defaults to `"all"`).
  - `area_id` (optional, string): Target area ID when `mode: "area"`.
  - `title` (optional, string): Card header title (defaults to `"Controls"`).
  - `icon` (optional, string): Card header icon (defaults to `"mdi:tune-variant"`).
  - `show_header` (optional, boolean): Whether to render card header (defaults to `true`).
- **Interactive & Presentation Rules:**
  - Dynamic Discovery: Discovers active or area-assigned entities through `centralRegistry`.
  - Nested Rows: Renders embedded `component-control-row-v2` instances for each matching entity with full toggle, slider, and hold capabilities.

---

## 3. Actual Implementation Analysis
- **Architecture:** Inherits `LitBaseCard<SmartCollectionConfig>`.
- **Area Inheritance:** Maps entity area ID with fallback to device area ID via `registry.deviceArea`.
- **Lifecycle:** Subscribes to `centralRegistry` and unbinds cleanly on `disconnectedCallback()`.

---

## 4. Gaps Identified & Remediations
- **Audited Items:**
  - Verified registry subscription ref-count unbinds on disconnect.
  - Verified empty-state fallback when no entities match collection criteria.
  - Verified `isEntityActive` domain rules for `mode: "active"`.
- **Status:** Complete and verified.

---

## 5. Verification Status
- **TypeScript:** Pass (`tsc --noEmit`)
- **Contract Tests:** `tests/contracts/home.test.ts`
- **Browser Smoke Test:** Pass
