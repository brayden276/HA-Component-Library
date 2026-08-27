# Component History & Architecture Audit: Action Card

## 1. Component Overview & Public Lovelace Tags
- **Component Identifier**: `action`
- **Public Custom Element**: `component-action-v2`
- **Public Lovelace Card Type**: `custom:component-action-v2`
- **Canonical Class**: `ComponentActionV2` (inherits from `LitBaseCard<ActionCardConfig>`)
- **Source Files**:
  - Implementation: [`action-card.ts`](file:///C:/Source%20Local/HA-Component-Library/src/cards/action/action-card.ts)
  - Styles: [`action-card.styles.ts`](file:///C:/Source%20Local/HA-Component-Library/src/cards/action/action-card.styles.ts)
  - Types: [`action-card.types.ts`](file:///C:/Source%20Local/HA-Component-Library/src/cards/action/action-card.types.ts)
  - Barrel Export: [`index.ts`](file:///C:/Source%20Local/HA-Component-Library/src/cards/action/index.ts)
- **Oracle Source Reference**: `HA-UI-Components/src/components/action-card.js`
- **Category**: Entity-Aware / Standalone Action Tile
- **Card Size**: `2`

---

## 2. Intended Functionality

### 2.1 Purpose & Domain Role
The Action Card provides a dedicated, highly legible call-to-action tile designed for Home Assistant dashboards. It presents an icon badge, title, contextual subtitle description, and an action pill/badge. When configured with a navigation target or entity reference, the card delivers responsive tactile interaction (tap and optional hold).

### 2.2 Configuration Schema Contract
```yaml
type: custom:component-action-v2
title: "Arm Security"                  # Primary action header (string, default: "Action title")
description: "Arm all perimeter sensors" # Contextual description (string, default: "What this action will do")
action_text: "Arm Away"               # Text displayed in the action pill badge (string, default: "Open")
icon: "mdi:gesture-tap-button"        # MDI icon string (default: "mdi:gesture-tap-button")
navigation_path: "/lovelace/security" # Optional path for SPA routing (string | null)
entity: "alarm_control_panel.home"    # Optional target entity ID for more-info dialog (string | null)
more_info_entity: null                # Optional explicit more-info override entity (string | null)
```

### 2.3 Interaction Model & Precedence Rules
1. **Primary Action**:
   - If `navigation_path` is provided, primary tap triggers SPA navigation via `navigateTo(path)`.
   - If `navigation_path` is null and `entity` or `more_info_entity` is present, primary tap opens the entity more-info dialog via `openMoreInfo(this, entity)`.
   - If neither is provided, the card renders in static mode (no interactive button wrapper).
2. **Hold Action**:
   - If both `navigation_path` AND an entity reference are configured, a press-and-hold interaction opens the more-info dialog for the entity, while a short tap navigates to the path.
3. **Tactile Feedback**:
   - Uses the shared micro-interaction manager with CSS active scale (`transform: scale(0.992)`) and ripple/click feedback.

### 2.4 Accessibility & Visual Standards
- **Touch Target**: The outer `.wrap` has a minimum height of `70px`, exceeding the WCAG 2.1 AA 44x44px touch target requirement.
- **Keyboard Navigation**: In interactive mode, renders semantic `<button class="demo" type="button">` with standard `:focus-visible` primary-colored outline ring (`outline: 2px solid var(--primary-color)`).
- **Text Safety**: All string properties (`title`, `description`, `action_text`, `icon`) are sanitized and escaped against HTML injection via `this.esc()`.
- **Text Truncation**: Title and description enforce single-line ellipsis clipping to preserve strict grid alignment.

---

## 3. Actual Implementation Analysis

### 3.1 Architecture & DOM Structure
- Extends `LitBaseCard<ActionCardConfig>` with reactive properties and lifecycle management.
- Dynamic wrapper selection in `render()`:
  - Interactive: `<ha-card><button class="demo" type="button"><div class="wrap">...</div></button></ha-card>`
  - Static: `<ha-card><div class="demo-static"><div class="wrap">...</div></div></ha-card>`
- 3-column CSS Grid: `34px minmax(0, 1fr) auto` with `gap: 10px` and `padding: 12px 14px`.

### 3.2 State Flow & Lifecycle
- **Configuration**: Applied via `setConfig()`, merging default properties with user overrides.
- **Interaction Attachment**: In `updated()`, if interactive, cleans up any previous `InteractionHandle` and re-attaches `interaction(btn, { primary, hold, optimistic: false, repeat: false, feedback: true })`.
- **Teardown**: In `disconnectedCallback()`, safely destroys `_interactionHandle` to prevent memory leaks during DOM detachment or Lovelace tab transitions.

---

## 4. Gaps Identified & Remediations Applied

| Audit Category | Expected Behaviour | Actual Code Inspection | Status / Remediation |
| :--- | :--- | :--- | :--- |
| **Config Fallbacks** | Defaults populated for all visual text & icon fields | Defaults properly merged in `setConfig()` | Matches Spec |
| **Action Precedence** | SPA route > More-info dialog; dual navigation+hold when both present | Evaluated in `_getActions()` correctly | Matches Spec |
| **Interaction Teardown** | Event listeners destroyed on re-render & unmount | `_interactionHandle.destroy()` invoked in `updated()` and `disconnectedCallback()` | Verified Zero Leak |
| **A11y Target** | Min height >= 44px, keyboard accessible | `.wrap` has `min-height: 70px`, `<button type="button">` with focus outline | Compliant WCAG 2.1 AA |
| **Visual Fidelity** | Exact match with oracle CSS metrics | Verbatim preservation of padding, typography, border radii | Verified |

---

## 5. Verification Status & Test Evidence
- **Vitest Unit Contract**: Tested in [`presentation.test.ts`](file:///C:/Source%20Local/HA-Component-Library/tests/contracts/presentation.test.ts) (`component-action-v2 renders action button text`).
- **Lovelace YAML Fixtures**: Validated in [`lovelace-yaml-fixtures.test.ts`](file:///C:/Source%20Local/HA-Component-Library/tests/contracts/lovelace-yaml-fixtures.test.ts).
- **Public Inventory Registration**: Verified in [`public-inventory.test.ts`](file:///C:/Source%20Local/HA-Component-Library/tests/registration/public-inventory.test.ts).
- **Browser Smoke Test**: Verified custom element instantiation and rendering under Chromium browser harness.
