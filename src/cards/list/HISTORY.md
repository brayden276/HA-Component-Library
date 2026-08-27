# Component History & Architecture Audit: List / Ranking Card

## 1. Component Overview & Public Lovelace Tags
- **Component Identifier**: `list`
- **Public Custom Element**: `component-list-v2`
- **Public Lovelace Card Type**: `custom:component-list-v2`
- **Canonical Class**: `ComponentListV2` (inherits from `LitBaseCard<ListCardConfig>`)
- **Source Files**:
  - Implementation: [`list-card.ts`](file:///C:/Source%20Local/HA-Component-Library/src/cards/list/list-card.ts)
  - Styles: [`list-card.styles.ts`](file:///C:/Source%20Local/HA-Component-Library/src/cards/list/list-card.styles.ts)
  - Types: [`list-card.types.ts`](file:///C:/Source%20Local/HA-Component-Library/src/cards/list/list-card.types.ts)
  - Barrel Export: [`index.ts`](file:///C:/Source%20Local/HA-Component-Library/src/cards/list/index.ts)
- **Oracle Source Reference**: `HA-UI-Components/src/components/list-ranking.js`
- **Category**: Presentational / Ranked List
- **Card Size**: `3`

---

## 2. Intended Functionality

### 2.1 Purpose & Domain Role
The List / Ranking Card displays a structured list of up to 6 ranked items or metric rows (e.g. top energy consumers, recent events, or system status list). Each row contains a title, a supporting description, a primary bold metric value, and a metric label. Individual rows can be individually interactive (triggering custom callbacks, navigating, or opening more-info dialogs).

### 2.2 Configuration Schema Contract
```yaml
type: custom:component-list-v2
interactive: true                      # Global interactive toggle (boolean, default: true)
rows:                                 # Array of row objects (capped at 6 items)
  - title: "Air Conditioner"           # Row primary title (string)
    description: "Living Room HVAC"    # Row subtitle description (string)
    value: "2.4"                       # Primary bold metric (string)
    label: "kW"                        # Metric unit/label (string)
    navigation_path: "/lovelace/climate" # Optional SPA navigation path (string | null)
    entity: "climate.living_room"      # Optional HA entity ID for more-info popup (string | null)
    # action: (context) => void        # Optional programmatic callback hook
```

### 2.3 Interaction Model & Precedence Rules
Per-row interaction is resolved in `_getRowActions(row)`:
1. **Global Disable**: If `interactive: false`, all rows are rendered in static mode (`<div>` without event bindings).
2. **Custom Callback**: If `row.action` is a function, it is executed as `row.action({ host, hass, row })`.
3. **SPA Navigation**: If `row.navigation_path` or `row.path` is provided, primary tap triggers `this.navigate(path)`.
4. **Entity More-Info**: If only `row.entity` or `row.more_info_entity` is provided, primary tap triggers `this.moreInfo(entity)`.
5. **Hold Action**: If both navigation path AND an entity reference are present on a row, a short tap navigates and a long hold opens the entity more-info dialog.

### 2.4 Accessibility & Visual Standards
- **Touch Target**: Every row enforces `min-height: 54px` (exceeding WCAG 2.1 AA 44px min target).
- **Keyboard Navigation**: Interactive rows render as `<button class="row" type="button">`, providing standard keyboard focus with a primary-colored ring (`outline: 2px solid var(--primary-color)`). Static rows render as `<div class="row">`.
- **Divider Separation**: Rows are cleanly separated by `border-top: 1px solid var(--divider-color)`, with `:first-child` suppressing the top border.
- **Text Safety**: All string properties in each row are sanitized against XSS via `this.esc()`.

---

## 3. Actual Implementation Analysis

### 3.1 Architecture & DOM Structure
- Extends `LitBaseCard<ListCardConfig>`.
- Renders inside `<ha-card><div class="wrap">...</div></ha-card>`.
- Clamps rows via `this._config.rows.slice(0, 6)`.
- Each row uses a 2-column CSS Grid: `minmax(0, 1fr) auto` with `gap: 14px` and text ellipsis handling.

### 3.2 State Flow & Lifecycle
- Maintains an array of `InteractionHandle` references (`_interactionHandles`).
- In `updated()`:
  - Destroys all previous interaction handles in `_interactionHandles`.
  - Queries all rendered `button.row` elements by `dataset.index`.
  - Attaches fresh `interaction()` listeners for rows with resolved actions.
- In `disconnectedCallback()`:
  - Destroys all active interaction handles, preventing any dangling event listeners or leaks.

---

## 4. Gaps Identified & Remediations Applied

| Audit Category | Expected Behaviour | Actual Code Inspection | Status / Remediation |
| :--- | :--- | :--- | :--- |
| **Row Cap** | Limit rendering to maximum 6 rows | Enforced via `.slice(0, 6)` | Matches Spec |
| **Action Handling** | Support custom callback, path, entity, and dual hold | Resolved in `_getRowActions()` with full fallback priority | Matches Spec |
| **Lifecycle Cleanup** | Clean up all row listeners on update & unmount | Iterates and destroys in `updated()` and `disconnectedCallback()` | Verified Zero Leak |
| **Touch Targets** | Row height >= 44px | CSS defines `min-height: 54px` | Compliant WCAG 2.1 AA |
| **DOM Semantics** | Render `<button>` for active rows, `<div>` for static | Dynamic tag rendering based on `actions.primary` | Compliant |

---

## 5. Verification Status & Test Evidence
- **Vitest Unit Contract**: Tested in [`presentation.test.ts`](file:///C:/Source%20Local/HA-Component-Library/tests/contracts/presentation.test.ts) (`component-list-v2 renders rows up to limit`).
- **Lovelace YAML Fixtures**: Validated in [`lovelace-yaml-fixtures.test.ts`](file:///C:/Source%20Local/HA-Component-Library/tests/contracts/lovelace-yaml-fixtures.test.ts).
- **Public Inventory Registration**: Verified in [`public-inventory.test.ts`](file:///C:/Source%20Local/HA-Component-Library/tests/registration/public-inventory.test.ts).
- **Browser Smoke Test**: Verified custom element instantiation and rendering under Chromium browser harness.
