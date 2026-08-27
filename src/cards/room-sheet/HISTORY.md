# History & Component Audit: Room Sheet Card

## Component Overview
- **Public Custom Element Tag**: `<component-room-sheet-v2>`
- **Lovelace Type**: `custom:component-room-sheet-v2`
- **Module Location**: `src/cards/room-sheet/room-sheet-card.ts`
- **Styles Location**: `src/cards/room-sheet/room-sheet-card.styles.ts`
- **Types Location**: `src/cards/room-sheet/room-sheet-card.types.ts`
- **Role**: Structured multi-row control sheet providing room state metrics and action triggers divided into clear section categories.

---

## Intended Functionality

### 1. Purpose & Domain Role
Room Sheet acts as a detailed modal-style or embedded control card for a room. It groups controls into sections (e.g., Environment, Lighting, Media) and presents structured rows containing an icon, control name, supporting status description, and current metric value.

### 2. Config Contract & Schema
```yaml
type: custom:component-room-sheet-v2
title: Kitchen Controls               # Sheet header title (Default: 'Room name')
icon: mdi:silverware-fork-knife      # Sheet header icon (Default: 'mdi:bed-king-outline')
rows:                                # Array of up to 8 control rows (Default: 3 sample rows)
  - section: Environment             # Section group name
    icon: mdi:thermometer            # Row icon
    name: Kitchen Temp               # Row title
    state: Target 21°C               # Supporting context description
    value: 22.1°C                    # Trailing metric value
    entity: climate.kitchen          # Optional entity for more-info / service calls
    navigation_path: /lovelace/temp  # Optional path to navigate to on click
    service: climate.set_temperature # Optional service to trigger
    service_data: { temperature: 21 }
    aria_label: Kitchen Temperature Control
```

### 3. Interaction & Action Hierarchy
- **Action Resolution Order** (per row):
  1. `navigation_path`: Triggers dashboard navigation via `navigateTo(path)`.
  2. `service`: Calls Home Assistant service via `hass.callService(domain, service, { ...service_data, entity_id })`.
  3. `entity`: Opens entity more-info modal via `openMoreInfo(this, entity)`.
  4. Non-actionable: Rendered as static informative row without interactive handlers.
- **Hold Action**: When a row has both a `navigation_path` and an `entity`, primary press navigates while a hold gesture opens `moreInfo(entity)`.
- **Close Button Affordance**: Header contains a static preview close icon (`mdi:close`) marked `aria-hidden="true"`.

### 4. Accessibility & Visual Standards (WCAG 2.1 AA)
- **Minimum Touch Target**: Actionable rows render as `<button class="row actionable" type="button">` with `min-height: 46px` (>= 44px).
- **Accessible Labelling**: Each actionable row has an explicit `aria-label` (`row.aria_label || row.name || "Room control"`).
- **Semantics**: Non-actionable rows render as plain `<div>` elements rather than disabled buttons to preserve clean assistive technology navigation.
- **Focus Rings**: Focus-visible outlines configured with `outline: 2px solid var(--primary-color); outline-offset: -2px`.

---

## Actual Implementation

### 1. Architecture & DOM Structure
- Extends `LitBaseCard<RoomSheetCardConfig>`.
- Shadow DOM Layout:
  - `<ha-card>`
    - `<div class="wrap">`
      - `<div class="head">`
        - `<span class="head-left"><ha-icon icon="..."></ha-icon><span class="title">...</span></span>`
        - `<span class="i close preview-only" aria-hidden="true"><ha-icon icon="mdi:close"></ha-icon></span>`
      - `<div class="body">`
        - Repeated section separators: `<div class="sep">${sectionName}</div>`
        - Actionable rows: `<button class="row actionable" data-row="${index}" type="button">`
        - Non-actionable rows: `<div class="row" data-row="${index}">`

### 2. Sizing & Grid Options
- `getCardSize()`: Returns `5`.
- Maximum 8 rows rendered (`slice(0, 8)`).

### 3. Lifecycle & Memory Safety
- `_interactionHandles` array stores handles for actionable rows.
- `updated()` cleans up prior handles and reattaches listeners based on active rows.
- `disconnectedCallback()` destroys all handles.

---

## Gaps Identified & Remediations Applied

| Aspect | Initial State | Finding / Gap | Remediation Status |
| :--- | :--- | :--- | :--- |
| **Default Fallback Rows** | Handled | Renders 3 default rows if `rows` is omitted or empty | Fully verified |
| **Action Resolution** | Handled | Correctly prioritizes path > service > moreInfo | Fully verified |
| **Row Touch Target** | Handled | `min-height: 46px` satisfies WCAG 44px min touch target | Fully verified |
| **ARIA Cleanup** | Handled | Decorative close button has `aria-hidden="true"` | Fully verified |

---

## Verification Status & Test Evidence
- **Automated Contract Tests**: Verified in `tests/contracts/navigation.test.ts`:
  - `component-room-sheet-v2 renders sections and control rows`
  - `component-room-sheet-v2 renders default fallback rows and handles empty config`
- **Full Suite Status**: All 116 tests passing.
- **Browser Smoke Test**: Verified working in Chromium browser execution.
