# Component History & Architecture Audit: Context Strip

## 1. Component Overview & Public Lovelace Tags
- **Component Identifier**: `context-strip`
- **Public Custom Element**: `component-context-strip-v3`
- **Public Lovelace Card Type**: `custom:component-context-strip-v3`
- **Canonical Class**: `ComponentContextStripV3` (inherits from `LitBaseCard<ContextStripCardConfig>`)
- **Source Files**:
  - Implementation: [`context-strip-card.ts`](file:///C:/Source%20Local/HA-Component-Library/src/cards/context-strip/context-strip-card.ts)
  - Styles: [`context-strip-card.styles.ts`](file:///C:/Source%20Local/HA-Component-Library/src/cards/context-strip/context-strip-card.styles.ts)
  - Types: [`context-strip-card.types.ts`](file:///C:/Source%20Local/HA-Component-Library/src/cards/context-strip/context-strip-card.types.ts)
  - Barrel Export: [`index.ts`](file:///C:/Source%20Local/HA-Component-Library/src/cards/context-strip/index.ts)
- **Oracle Source Reference**: `HA-UI-Components/src/components/context-strip.js`
- **Category**: Presentational / Header Strip
- **Card Size**: `1`

---

## 2. Intended Functionality

### 2.1 Purpose & Domain Role
The Context Strip card delivers a dense, single-row contextual summary designed for the top of dashboards, sections, or room sheets. It pairs a left-aligned status/phase text, up to three center-aligned key-value metric pills, and a right-aligned secondary status or timestamp. Optional interaction enables navigating to a sub-view or inspecting a designated entity.

### 2.2 Configuration Schema Contract
```yaml
type: custom:component-context-strip-v3
left_text: "Normal Operation"         # Left-aligned status text (string, default: "Left context")
center_1_label: "Solar"               # Metric 1 descriptor (string, default: "Primary metric")
center_1_value: "4.8 kW"              # Metric 1 primary value (string, default: "00%")
center_2_label: "Grid"                # Metric 2 descriptor (string, default: "Secondary metric")
center_2_value: "0.2 kW"              # Metric 2 primary value (string, default: "00%")
center_3_label: "Battery"             # Metric 3 descriptor (string, default: "Tertiary metric")
center_3_value: "95%"                 # Metric 3 primary value (string, default: "00%")
right_text: "Updated 2m ago"          # Right-aligned status/timestamp (string, default: "Right context")
navigation_path: "/lovelace/energy"   # Optional SPA route target (string | null)
entity: "sensor.power_summary"        # Optional entity for more-info popup (string | null)
```

### 2.3 Interaction Model & Precedence Rules
- **Navigation Precedence**: If `navigation_path` is defined, clicking the strip triggers SPA navigation via `this.navigate(path)`.
- **Entity Dialog Fallback**: If `navigation_path` is omitted and `entity` is defined, clicking triggers `this.moreInfo(entity)`.
- **Static Mode**: If neither navigation path nor entity is defined, the element renders as a non-interactive `<div class="context-static">`.
- **Feedback**: Interactive button wraps with active scale transform (`transform: scale(0.997)`) and feedback ripple via `interaction()`.

### 2.4 Accessibility & Visual Standards
- **Touch Target**: Strict `min-height: 44px` specified on both `button` and `.context-static` elements, satisfying WCAG 2.1 AA min touch target requirement.
- **Keyboard Navigation**: In interactive mode, `<button type="button">` is rendered with high-contrast `:focus-visible` ring (`outline: 2px solid var(--primary-color); outline-offset: -2px`).
- **Responsive Layout**:
  - Desktop (> 900px): `padding: 12px 14px`, `gap: 16px`, center metrics gap `18px`.
  - Tablet (<= 900px): `gap: 10px`, `padding: 11px 12px`, `font-size: 11px`.
  - Mobile (<= 650px): `gap: 6px`, `padding: 10px`, center metrics gap `7px`.
- **Text Safety**: All metric labels, values, left phase, and right event strings are escaped safely against injection via `this.esc()`.

---

## 3. Actual Implementation Analysis

### 3.1 Architecture & DOM Structure
- Extends `LitBaseCard<ContextStripCardConfig>`.
- Root structure inside `<ha-card>`:
  - Interactive: `<button type="button"><span class="phase">...</span><span class="mid"><span class="item">...</span></span><span class="event">...</span></button>`
  - Static: `<div class="context-static"><span class="phase">...</span><span class="mid"><span class="item">...</span></span><span class="event">...</span></div>`
- 3-column CSS Grid: `minmax(0, 1fr) auto minmax(0, 1fr)` ensuring the center metrics remain perfectly centered while left/right elements truncate gracefully with `ellipsis`.

### 3.2 State Flow & Lifecycle
- `setConfig()` initializes configuration with comprehensive defaults for all 3 center metrics and text labels.
- `updated()` binds the micro-interaction handler dynamically to the `<button>` element if an action is available, destroying previous handles to avoid duplicate listener registrations.
- `disconnectedCallback()` releases the `_interactionHandle`.

---

## 4. Gaps Identified & Remediations Applied

| Audit Category | Expected Behaviour | Actual Code Inspection | Status / Remediation |
| :--- | :--- | :--- | :--- |
| **Config Fallbacks** | Default labels and values for 3 center metrics | All defaults populated in `DEFAULTS` constant | Matches Spec |
| **Touch Target** | Min height >= 44px | CSS defines `min-height: 44px` on `button` and `.context-static` | Compliant WCAG 2.1 AA |
| **Responsive Grid** | Three breakpoint tiers (desktop, <=900px, <=650px) | Exact media queries implemented | Matches Spec |
| **Memory Lifecycle** | Destroy `_interactionHandle` on detach | Cleared in `disconnectedCallback()` & re-render | Verified Zero Leak |
| **Escaping** | Sanitization on all user-controlled text | `this.esc()` applied to all dynamic spans | Verified Secure |

---

## 5. Verification Status & Test Evidence
- **Vitest Unit Contract**: Tested in [`presentation.test.ts`](file:///C:/Source%20Local/HA-Component-Library/tests/contracts/presentation.test.ts) (`component-context-strip-v3 sets config and renders default metrics`).
- **Lovelace YAML Fixtures**: Validated in [`lovelace-yaml-fixtures.test.ts`](file:///C:/Source%20Local/HA-Component-Library/tests/contracts/lovelace-yaml-fixtures.test.ts).
- **Public Inventory Registration**: Verified in [`public-inventory.test.ts`](file:///C:/Source%20Local/HA-Component-Library/tests/registration/public-inventory.test.ts).
- **Browser Smoke Test**: Verified custom element instantiation and rendering under Chromium browser harness.
