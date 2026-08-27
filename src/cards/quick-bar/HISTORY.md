# Component History: Quick Bar (`ha-quick-bar`)

## 1. Overview & Lovelace Tag
- **Custom Element Tag:** `ha-quick-bar`
- **Card Type:** `custom:ha-quick-bar`
- **Class:** `HaQuickBar`
- **Directory:** `src/cards/quick-bar/`

---

## 2. Intended Functionality
- **Domain Role:** Horizontal quick-action bar displaying a scrollable row of interactive circular entity controls with real-time active status counters and toggle execution.
- **Config Contract:**
  - `entities` (required, Array<string | QuickBarEntityConfig>): List of entities or detailed entity configs.
  - `title` (optional, string): Card header title (defaults to `"Quick Controls"`).
  - `show_active_count` (optional, boolean): Whether to render top-right active count badge (defaults to `true`).
- **Interactive & Presentation Rules:**
  - Active Status Tally: Dynamically calculates and highlights active entity count in the header.
  - Normalization: Accepts both simple entity strings (`"light.living_room"`) and full config objects (`{ entity: "...", name: "...", icon: "..." }`).
  - Tap Action: Tapping an item triggers `handleAction` (defaults to `toggle`).

---

## 3. Actual Implementation Analysis
- **Architecture:** Inherits `HaBaseCard<HaQuickBarConfig>`.
- **Validation:** Throws error if `entities` array is empty or missing.
- **Layout & CSS:** Horizontal scrollable flex bar with circular icon badges and active glow styling.

---

## 4. Gaps Identified & Remediations
- **Audited Items:**
  - Verified `validateConfig` catches empty arrays.
  - Verified touch target accessibility (>=44px).
  - Verified domain default icons and friendly name fallbacks.
- **Status:** Complete and verified.

---

## 5. Verification Status
- **TypeScript:** Pass (`tsc --noEmit`)
- **Contract Tests:** `tests/contracts/standalone-cards.test.ts`
- **Browser Smoke Test:** Pass
