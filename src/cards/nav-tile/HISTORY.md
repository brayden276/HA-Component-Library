# History & Component Audit: Navigation Tile Card

## Component Overview
- **Public Custom Element Tag**: `<component-nav-tile-v2>`
- **Lovelace Type**: `custom:component-nav-tile-v2`
- **Module Location**: `src/cards/nav-tile/nav-tile-card.ts`
- **Styles Location**: `src/cards/nav-tile/nav-tile-card.styles.ts`
- **Types Location**: `src/cards/nav-tile/nav-tile-card.types.ts`
- **Role**: Compact, high-visibility destination tile providing dashboard-wide or area-level navigation with subtitle contextual hints and icon indicators.

---

## Intended Functionality

### 1. Purpose & Domain Role
The Navigation Tile provides a standardized gateway card for routing users between views, subviews, or external URLs across Lovelace dashboards. It displays a primary destination title, descriptive secondary context, and an icon.

### 2. Config Contract & Schema
```yaml
type: custom:component-nav-tile-v2
title: Master Bedroom          # Destination display name (Default: 'Destination')
context: 2 lights on           # Secondary context or state summary (Default: 'Navigation')
icon: mdi:door-open            # Material Design icon (Default: 'mdi:door-open')
navigation_path: /lovelace/bed # Lovelace navigation path or null (Default: null)
```

### 3. Interaction & Home Assistant Bindings
- **Primary Press**:
  - When `navigation_path` is configured: Triggers standard Lovelace routing via `navigateTo(path)` (`window.history.pushState` + `location-changed` event).
  - When `navigation_path` is null/empty: Card renders statically without clickable affordance.
- **Haptic & Visual Feedback**: Integrated with `interaction()` primitive for press-down scale transformation, active tinting, and keyboard activation (`Enter`/`Space`).

### 4. Accessibility & Visual Standards (WCAG 2.1 AA)
- **Minimum Touch Target**: Minimum height of 58px (`min-height: 58px`), well exceeding the 44px touch target requirement.
- **Focus Rings**: Clear 2px focus ring (`outline: 2px solid var(--primary-color); outline-offset: 2px`) on keyboard focus.
- **Accessible Labelling**: Semantics provided via structured heading/description text hierarchy within the button element.

---

## Actual Implementation

### 1. Architecture & DOM Structure
- Extends `LitBaseCard<NavigationTileCardConfig>` from `src/components/base/lit-base-card.ts`.
- Shadow DOM Layout:
  - `<ha-card>`
    - If `navigation_path` is defined: `<button class="i nav" type="button">`
    - If `navigation_path` is null: `<div class="nav nav-static">`
      - `<div class="wrap">`
        - `<span class="icon"><ha-icon icon="..."></ha-icon></span>`
        - `<span><div class="title">...</div><div class="desc">...</div></span>`

### 2. Sizing & Grid Options
- `getCardSize()`: Returns `1`.
- `getGridOptions()`: Inherited 12-column grid integration with auto row height.

### 3. Lifecycle & Memory Safety
- `updated()`: Manages `InteractionHandle` lifecycle, cleanly destroying previous bindings and attaching to `button.nav` when path is present.
- `disconnectedCallback()`: Unbinds all interaction listeners and cleans up timers.

---

## Gaps Identified & Remediations Applied

| Aspect | Initial State | Finding / Gap | Remediation Status |
| :--- | :--- | :--- | :--- |
| **Static State Fallback** | Handled | Renders `<div class="nav nav-static">` when `navigation_path` is omitted | Fully verified matching oracle intent |
| **Touch Target** | Handled | 58px min height exceeds WCAG AA 44px target | Fully verified |
| **HTML Escaping** | Handled | Escapes `title`, `context`, `icon` via `this.esc()` | Fully verified |
| **Lifecycle Cleanup** | Handled | `_interactionHandle?.destroy()` on disconnect | Fully verified |

---

## Verification Status & Test Evidence
- **Automated Contract Tests**: Verified via Vitest suite in `tests/contracts/navigation.test.ts`:
  - `component-nav-tile-v2 renders destination title and context`
  - `component-nav-tile-v2 renders static div when navigation_path is null`
- **Full Suite Status**: All 116 unit and contract tests passing (`npm test`).
- **Browser Verification**: Real Chromium headless smoke test passed (`npm run test:browser`).
