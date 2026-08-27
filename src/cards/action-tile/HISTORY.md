# Component History: Action Tile (`ha-action-tile`)

## 1. Overview & Lovelace Tag
- **Custom Element Tag:** `ha-action-tile`
- **Card Type:** `custom:ha-action-tile`
- **Class:** `HaActionTile`
- **Editor Element:** `ha-action-tile-editor` (`HaActionTileEditor`)
- **Directory:** `src/cards/action-tile/`

---

## 2. Intended Functionality
- **Domain Role:** Compact, responsive dashboard tile representing a single Home Assistant entity with rich active state visualization, custom icon styling, and dynamic contextual badge metrics.
- **Config Contract:**
  - `entity` (required, string): Target Home Assistant entity ID (e.g. `light.living_room`, `switch.fan`).
  - `name` (optional, string): Custom display label overriding `friendly_name`.
  - `icon` (optional, string): Custom MDI icon overriding entity/domain default.
  - `color` (optional, string): Custom active accent color token (defaults to `#03a9f4`).
  - `badge_entity` (optional, string): Secondary sensor entity whose formatted value is shown as a pill badge.
  - `tap_action` (optional, ActionConfig): Action executed on tile tap (defaults to `toggle`).
- **Interactive & Presentation Rules:**
  - Dynamic state awareness via `isEntityActive(entity)` applying active color variables and icon highlights.
  - Auto-badge fallback: If no explicit `badge_entity` is provided, automatically renders brightness percentage for active lights or current temperature for climate/temperature sensors.
  - Error state handling with `renderError` if entity is unconfigured or not found in `hass.states`.
  - Visual editor with schema-driven field pickers for entities, names, icons, and colors.

---

## 3. Actual Implementation Analysis
- **Architecture:** Inherits `HaBaseCard<HaActionTileConfig>` extending LitElement.
- **Rendering & DOM Flow:**
  - Renders `<ha-card class="interactive tile-card">` with CSS variable `--tile-active-color`.
  - Tile header groups the icon box and pill badge.
  - Tile body contains truncated primary title and formatted secondary state display via `formatEntityState(entity, hass)`.
- **Editor:** Bespoke `HaActionTileEditor` providing real-time entity selection dropdowns and text inputs.
- **Lifecycle & A11y:** Keyboard accessible, title attributes for long entity names, and touch target sized to full card bounds (>=44px).

---

## 4. Gaps Identified & Remediations
- **Audited Items:**
  - Verified `validateConfig` throws descriptive error when `config.entity` is omitted.
  - Verified `getStubConfig` returns intelligent light/switch entity defaults from available state registry.
  - Verified grid options provide 6x1 default sizing and 3x1 minimum constraint for Lovelace sections layout.
- **Status:** Complete and verified. Implementation strictly matches intended design.

---

## 5. Verification Status
- **TypeScript:** Pass (`tsc --noEmit`)
- **Contract Tests:** `tests/contracts/standalone-cards.test.ts` (HaActionTile & editor tests passing)
- **Browser Smoke Test:** Pass
