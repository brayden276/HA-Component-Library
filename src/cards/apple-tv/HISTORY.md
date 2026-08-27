# Component History: Apple TV Controller (`component-apple-tv-controller-v1`)

## 1. Overview & Lovelace Tag
- **Custom Element Tag:** `component-apple-tv-controller-v1`
- **Card Type:** `custom:component-apple-tv-controller-v1`
- **Class:** `ComponentAppleTvControllerV1`
- **Directory:** `src/cards/apple-tv/`

---

## 2. Intended Functionality
- **Domain Role:** Unified Apple TV media player and remote control card, embedding native HA Lovelace media tile controls with an integrated directional D-pad and text-entry keyboard surface.
- **Config Contract:**
  - `entity` (required unless demo, string): Apple TV `media_player` entity ID.
  - `title` (optional, string): Card header title.
  - `remote_entity` (optional, string): Companion `remote` entity ID for D-pad commands.
  - `keyboard_entity` (optional, string): Companion keyboard sensor/entry entity.
  - `keyboard_config_entry_id` (optional, string): Config entry ID for `apple_tv` text services.
  - `demo` (optional, boolean): Offline demo mode for card previews.
- **Interactive & Presentation Rules:**
  - Embedding: Lazily instantiates and updates native tile element via `loadCardHelpers`.
  - Directional D-pad: Dispatches `remote.send_command` for `up`, `down`, `left`, `right`, `select`, `menu`, `home`, `top_menu`.
  - Onscreen Keyboard: Provides text field invoking `apple_tv.set_keyboard_text` and `clear_keyboard_text`.

---

## 3. Actual Implementation Analysis
- **Architecture:** Inherits `LitBaseCard<AppleTvControllerConfig>`.
- **Async & Lifecycle:** Guarded by `_buildToken` sequence counter to prevent orphaned native card initialization across rapid reconfigurations.
- **Teardown:** `_interactionHandles` and embedded card references cleanly cleared on `disconnectedCallback()`.

---

## 4. Gaps Identified & Remediations
- **Audited Items:**
  - Verified `willUpdate` reliably updates `_nativeCard.hass` on state changes.
  - Verified remote commands gracefully handle offline or unconfigured remotes.
  - Verified accessible touch targets on all D-pad directional and utility buttons.
- **Status:** Complete and verified.

---

## 5. Verification Status
- **TypeScript:** Pass (`tsc --noEmit`)
- **Contract Tests:** `tests/contracts/devices.test.ts`
- **Browser Smoke Test:** Pass
