# Component History: Room Directory (`component-room-directory-v4`)

## 1. Overview & Lovelace Tag
- **Custom Element Tag:** `component-room-directory-v4`
- **Card Type:** `custom:component-room-directory-v4`
- **Class:** `ComponentRoomDirectoryV4`
- **Directory:** `src/cards/room-directory/`

---

## 2. Intended Functionality
- **Domain Role:** Household room directory displaying an interactive grid of all configured areas with live environmental metrics (noise-filtered temperature, active lights, hazard warnings) and full-height modal room-sheets.
- **Config Contract:**
  - `title` (optional, string): Header title (defaults to `"Rooms"`).
  - `icon` (optional, string): Header icon (defaults to `"mdi:floor-plan"`).
  - `mode` (optional, string): Display mode (defaults to `"home"`).
  - `pref_key` (optional, string): Preference storage key.
  - `base_path` (optional, string): Base navigation path (defaults to `"/home-control"`).
- **Interactive & Presentation Rules:**
  - Canonical Room Status: Uses `computeAreaStatusSummary` to extract room temperatures (filtering CPU/motherboard noise sensors) and active light counts.
  - Modal Room Sheet: Opens a `<dialog>` modal showing the active area title, ambient metrics, and an embedded `component-smart-collection-v3` targeting the room's devices.

---

## 3. Actual Implementation Analysis
- **Architecture:** Inherits `LitBaseCard<RoomDirectoryConfig>`.
- **Registry Integration:** Subscribes to `centralRegistry` in `connectedCallback()` and `willUpdate()`, cleanly detaching on `disconnectedCallback()`.
- **Dialog Modal State Machine:** Native HTML5 `<dialog>` using `showModal()` and backdrop dismissals.

---

## 4. Gaps Identified & Remediations
- **Audited Items:**
  - Verified `computeAreaStatusSummary` correctly falls back to "—" when no temperature sensors exist.
  - Verified registry subscription ref-count unbinds on disconnect.
  - Verified modal sheet closes on backdrop click and resets `_activeArea`.
- **Status:** Complete and verified.

---

## 5. Verification Status
- **TypeScript:** Pass (`tsc --noEmit`)
- **Contract Tests:** `tests/contracts/home.test.ts`
- **Browser Smoke Test:** Pass
