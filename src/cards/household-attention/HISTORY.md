# Component History: Household Attention Queue (`component-household-attention-v1` & `component-household-attention-v2`)

## 1. Overview & Lovelace Tag
- **Custom Element Tags:** `component-household-attention-v1`, `component-household-attention-v2`
- **Card Types:** `custom:component-household-attention-v1`, `custom:component-household-attention-v2`
- **Classes:** `ComponentHouseholdAttentionV1`, `ComponentHouseholdAttentionV2`
- **Directory:** `src/cards/household-attention/`

---

## 2. Intended Functionality
- **Domain Role:** Aggregated safety and hardware attention queue aggregating open exterior doors/windows, moisture/smoke/gas alarms, and low battery/offline sensors into a prioritized action queue.
- **Config Contract:**
  - `title` (optional, string): Attention header title (defaults to `"Attention"`).
  - `icon` (optional, string): Header icon (defaults to `"mdi:alert-circle-outline"`).
  - `quiet_title` (optional, string): Title when no issues exist (defaults to `"Everything quiet"`).
  - `quiet_subtitle` (optional, string): Subtitle when no issues exist (defaults to `"No security or hardware alerts"`).
  - `quiet_icon` (optional, string): Icon when quiet (defaults to `"mdi:check-circle-outline"`).
  - `demo` (optional, boolean): Offline demo preview mode.
- **Interactive & Presentation Rules:**
  - Dynamic Priority Sorting: Groups critical hazards (smoke, moisture, gas, fire) above warning alerts (open doors, unlocked exterior locks).
  - Quiet State: Displays reassuring all-clear card when issue count is zero.
  - Tap Action: Tapping an issue card dispatches `hass-more-info` for the target entity.

---

## 3. Actual Implementation Analysis
- **Architecture:** Inherits `LitBaseCard<HouseholdAttentionConfig>`.
- **Registry Integration:** Uses `centralRegistry` subscriptions with clean teardown.
- **Naming Fallback:** Uses `computeEntityDisplayName` cascade (friendly_name -> original_name -> entity_id).

---

## 4. Gaps Identified & Remediations
- **Audited Items:**
  - Verified `component-household-attention-v1` alias registration matches public inventory contracts.
  - Verified registry subscription ref-count unbinds on disconnect.
  - Verified touch target accessibility (>=44px).
- **Status:** Complete and verified.

---

## 5. Verification Status
- **TypeScript:** Pass (`tsc --noEmit`)
- **Contract Tests:** `tests/contracts/home.test.ts`, `tests/registration/public-inventory.test.ts`
- **Browser Smoke Test:** Pass
