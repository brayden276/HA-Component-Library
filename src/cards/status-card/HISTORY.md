# Component History: Status Card (`ha-status-card`)

## 1. Overview & Lovelace Tag
- **Custom Element Tag:** `ha-status-card`
- **Card Type:** `custom:ha-status-card`
- **Class:** `HaStatusCard`
- **Editor Element:** `ha-status-card-editor` (`HaStatusCardEditor`)
- **Directory:** `src/cards/status-card/`

---

## 2. Intended Functionality
- **Domain Role:** Feature-rich status card showcasing an entity's live state, last-changed relative/time updates, domain icon, and an optional quick toggle switch.
- **Config Contract:**
  - `entity` (required, string): Target entity ID.
  - `name` (optional, string): Display title overriding friendly name.
  - `icon` (optional, string): Display icon overriding entity default.
  - `show_toggle` (optional, boolean): Whether to render dedicated toggle button (defaults to `true`).
  - `secondary_info` (optional, `"last-changed"` | `"state"` | `"entity-id"` | `"none"`): Secondary subtext format (defaults to `"last-changed"`).
  - `tap_action` (optional, ActionConfig): Action on card tap (defaults to `more-info`).
- **Interactive & Presentation Rules:**
  - Distinct Toggle Control: Toggle switch handles `e.stopPropagation()` to toggle entity without triggering card-level more-info tap.
  - Active Glow: Highlights icon container with accent color when entity is active.
  - Visual Editor: Schema-driven editor for live entity and secondary-info customization.

---

## 3. Actual Implementation Analysis
- **Architecture:** Inherits `HaBaseCard<HaStatusCardConfig>`.
- **Secondary Info Formatter:** Safely parses `entity.last_changed` ISO timestamps into localized time strings with error fallbacks.
- **Toggle Support:** Supports toggle service on `light`, `switch`, `input_boolean`, `fan`, and lock service on `lock`.

---

## 4. Gaps Identified & Remediations
- **Audited Items:**
  - Verified toggle button has dedicated `aria-label="Toggle <name>"` for screen readers.
  - Verified touch target accessibility (>=44px).
  - Verified missing entity error card rendering.
- **Status:** Complete and verified.

---

## 5. Verification Status
- **TypeScript:** Pass (`tsc --noEmit`)
- **Contract Tests:** `tests/contracts/standalone-cards.test.ts`
- **Browser Smoke Test:** Pass
