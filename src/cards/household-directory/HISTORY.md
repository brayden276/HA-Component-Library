# Component History: Household Directory (`component-household-directory-v3`)

## 1. Overview & Lovelace Tag
- **Custom Element Tag:** `component-household-directory-v3`
- **Card Type:** `custom:component-household-directory-v3`
- **Class:** `ComponentHouseholdDirectoryV3`
- **Directory:** `src/cards/household-directory/`

---

## 2. Intended Functionality
- **Domain Role:** Global household navigation and quick-actions directory discovering label-tagged scenes, automations, scripts, buttons, and system views.
- **Config Contract:**
  - `pref_key` (optional, string): Backend companion preference storage key.
  - `base_path` (optional, string): Dashboard base path for navigation links (defaults to `"/home-control"`).
  - `title` (optional, string): Card header title (defaults to `"Quick actions"`).
  - `icon` (optional, string): Card header icon (defaults to `"mdi:gesture-tap-button"`).
  - `quick_action_label` (optional, string): Home Assistant label key for discovery (defaults to `"dashboard_quick_action"`).
- **Interactive & Presentation Rules:**
  - Action Dispatches: Runs `automation.trigger`, `scene.turn_on`, `script.turn_on`, or `button.press` on primary tap.
  - Navigation: Dispatches `location-changed` CustomEvents for navigation items.

---

## 3. Actual Implementation Analysis
- **Architecture:** Inherits `LitBaseCard<HouseholdDirectoryConfig>`.
- **Registry Coordinator:** Subscribes to `centralRegistry` with automatic ref-counted event teardown.
- **Gesture Handling:** Holds `_interactionHandles: InteractionHandle[]`, cleanly created with sensory feedback in `updated()` and destroyed in `disconnectedCallback()`.

---

## 4. Gaps Identified & Remediations
- **Audited Items:**
  - Verified registry subscription ref-count unbinds on disconnect.
  - Verified touch target accessibility (>=44px).
  - Verified service execution error isolation.
- **Status:** Complete and verified.

---

## 5. Verification Status
- **TypeScript:** Pass (`tsc --noEmit`)
- **Contract Tests:** `tests/contracts/home.test.ts`
- **Browser Smoke Test:** Pass
