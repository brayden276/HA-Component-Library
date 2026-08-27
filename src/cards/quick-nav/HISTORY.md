# History & Component Audit: Quick Navigation Card

## Component Overview
- **Public Custom Element Tag**: `<component-quick-nav-v2>`
- **Lovelace Type**: `custom:component-quick-nav-v2`
- **Module Location**: `src/cards/quick-nav/quick-nav-card.ts`
- **Styles Location**: `src/cards/quick-nav/quick-nav-card.styles.ts`
- **Types Location**: `src/cards/quick-nav/quick-nav-card.types.ts`
- **Role**: Responsive contextual navigation bar combining live entity status / more-info access on the left with configurable action navigation chips on the right.

---

## Intended Functionality

### 1. Purpose & Domain Role
Quick Navigation serves as a high-efficiency dashboard header or section banner. It pairs a contextual indicator (e.g. ambient weather sensor, room temperature, occupancy) with quick-jump destination chips (e.g. lights view, climate view, settings).

### 2. Config Contract & Schema
```yaml
type: custom:component-quick-nav-v2
left_icon: mdi:weather-partly-cloudy   # Context chip fallback icon (Default: 'mdi:weather-partly-cloudy')
left_text: Context                     # Context chip fallback label (Default: 'Context')
left_entity: sensor.outdoor_temp       # Optional entity ID for live state & more-info (Default: null)
action_1_icon: mdi:view-dashboard      # First action chip icon (Default: 'mdi:view-dashboard-outline')
action_1_text: Dashboard               # First action chip label (Default: 'Destination')
action_1_path: /lovelace/main          # First action navigation path (Default: null)
action_2_icon: mdi:cog-outline         # Second action chip icon (Default: 'mdi:cog-outline')
action_2_text: Settings                # Second action chip label (Default: 'Settings')
action_2_path: /lovelace/settings      # Second action navigation path (Default: null)
```

### 3. Interaction & Home Assistant Bindings
- **Left Context Chip**:
  - When `left_entity` is supplied: Formats live state via `hass.formatEntityState(stateObj)` (or `stateObj.state`), displays dynamic `<ha-state-icon>`, and triggers `moreInfo(left_entity)` on press.
  - When `left_entity` is missing or in `unavailable`/`unknown` state: Displays `"Unavailable"` or configured fallback text, preventing unhandled exceptions.
  - When `left_entity` is null/empty: Rendered with `disabled` attribute, displaying `left_icon` and `left_text`.
- **Action Chips (1 & 2)**:
  - When `action_X_path` is configured: Triggers `navigateTo(path)`.
  - When `action_X_path` is null: Chip button is marked `disabled`.

### 4. Accessibility & Visual Standards (WCAG 2.1 AA)
- **Minimum Touch Target**: All chips have `min-height: 44px` with minimum padding of `0 13px`.
- **Mobile Responsiveness**: At `<= 520px` viewport width, action chips transition to icon-only buttons with `width: 44px; min-height: 44px; justify-content: center`, strictly preserving the 44px touch target.
- **ARIA & Labelling**: All buttons maintain explicit `aria-label` matching their configured text.

---

## Actual Implementation

### 1. Architecture & DOM Structure
- Extends `LitBaseCard<QuickNavigationCardConfig>`.
- Shadow DOM Layout:
  - `<ha-card>`
    - `<div class="wrap">`
      - `<button class="i chip context" id="context" type="button" aria-label="..." ?disabled=...>`
        - Dynamic icon (`<ha-state-icon>` or `<ha-icon>`) + `<span>${leftText}</span>`
      - `<div class="group">`
        - `<button class="i chip" id="action-1" type="button" aria-label="..." ?disabled=...>`
        - `<button class="i chip" id="action-2" type="button" aria-label="..." ?disabled=...>`

### 2. State & Data Flow
- `_formatState()` safely reads `this.hass.states[this._config.left_entity]`.
- Implements try-catch fallback around `formatEntityState`.

### 3. Lifecycle & Memory Safety
- `_interactionHandles` array stores handles for all active buttons.
- `updated()` cleanly tears down previous handles before reattaching.
- `disconnectedCallback()` destroys all handles.

---

## Gaps Identified & Remediations Applied

| Aspect | Initial State | Finding / Gap | Remediation Status |
| :--- | :--- | :--- | :--- |
| **Missing Entity Handling** | Handled | Returns `"Unavailable"` if `left_entity` is not in `hass.states` | Fully verified |
| **Mobile Touch Targets** | Handled | CSS `@media (max-width: 520px)` maintains 44px min height & width | Fully verified |
| **Disabled Action State** | Handled | `?disabled` attribute set when path is omitted | Fully verified |
| **Lifecycle Cleanup** | Handled | Complete teardown in `disconnectedCallback()` | Fully verified |

---

## Verification Status & Test Evidence
- **Automated Contract Tests**: Verified in `tests/contracts/navigation.test.ts`:
  - `component-quick-nav-v2 renders context and action chips`
  - `component-quick-nav-v2 handles entity state and unavailable fallback`
- **Full Suite Status**: All 116 tests passing.
- **Browser Smoke Test**: Verified working in Chromium browser execution.
