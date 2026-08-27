# Component History: Favourites Cards (`component-favourites-v3` & `component-favourites-minimal-v1`)

## 1. Overview & Lovelace Tag
- **Custom Element Tags:** `component-favourites-v3`, `component-favourites-minimal-v1` (Minimal Display Adapter)
- **Card Types:** `custom:component-favourites-v3`, `custom:component-favourites-minimal-v1`
- **Classes:** `ComponentFavouritesV3`, `ComponentFavouritesMinimalV1`
- **Directory:** `src/cards/favourites/`

---

## 2. Intended Functionality
- **Domain Role:** Dynamic household favourites controller rendering quick-action tiles for up to 4 user-selected entities with entity discovery, optimistic toggling, brightness sliding, and hold-to-inspect gestures.
- **Config Contract:**
  - `helpers` (optional, string[]): Array of text input helper entities storing user favourite references.
  - `items` (optional, FavouriteRef[]): Static or pre-configured favourite items.
  - `preference_key` (optional, string): Backend storage key for multi-device synchronization.
  - `title` (optional, string): Card header title (defaults to `"Favourites"`).
  - `max` (optional, number): Maximum display items (defaults to 4).
  - `show_header` (optional, boolean): Whether to render top heading bar.
- **Interactive & Presentation Rules:**
  - Dynamic Control Resolution: Distinguishes switches, lights, covers, locks, and climate devices.
  - Hold Actions: Hold gesture opens Home Assistant more-info modal; primary tap executes toggle.
  - Minimal Adapter: `ComponentFavouritesMinimalV1` wraps `ComponentFavouritesV3` with restrained typography.

---

## 3. Actual Implementation Analysis
- **Architecture:** Inherits `LitBaseCard<FavouritesConfig>`.
- **Registry Coordinator:** Subscribes to `centralRegistry.subscribe(this.hass, ...)` and cleanly unbinds in `disconnectedCallback()`.
- **Interaction Management:** Holds `_interactionHandles: InteractionHandle[]`, created with primary tap + hold gestures and destroyed on every re-render and disconnect.

---

## 4. Gaps Identified & Remediations
- **Audited Items:**
  - Verified registry subscription ref-count unbinds on disconnect.
  - Verified invalid states (`unavailable`, `unknown`) disable interactive buttons and display warning icons.
  - Verified both V3 and Minimal V1 custom elements are registered with `registerCard`.
- **Status:** Complete and verified.

---

## 5. Verification Status
- **TypeScript:** Pass (`tsc --noEmit`)
- **Contract Tests:** `tests/contracts/home.test.ts`
- **Browser Smoke Test:** Pass
