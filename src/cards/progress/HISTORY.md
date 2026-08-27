# Component History & Architecture Audit: Progress / Target Card

## 1. Component Overview & Public Lovelace Tags
- **Component Identifier**: `progress`
- **Public Custom Element**: `component-progress-v2`
- **Public Lovelace Card Type**: `custom:component-progress-v2`
- **Canonical Class**: `ComponentProgressV2` (inherits from `LitBaseCard<ProgressCardConfig>`)
- **Source Files**:
  - Implementation: [`progress-card.ts`](file:///C:/Source%20Local/HA-Component-Library/src/cards/progress/progress-card.ts)
  - Styles: [`progress-card.styles.ts`](file:///C:/Source%20Local/HA-Component-Library/src/cards/progress/progress-card.styles.ts)
  - Types: [`progress-card.types.ts`](file:///C:/Source%20Local/HA-Component-Library/src/cards/progress/progress-card.types.ts)
  - Barrel Export: [`index.ts`](file:///C:/Source%20Local/HA-Component-Library/src/cards/progress/index.ts)
- **Oracle Source Reference**: `HA-UI-Components/src/components/progress-target.js`
- **Category**: Presentational / Metric Progress Bar
- **Card Size**: `2`

---

## 2. Intended Functionality

### 2.1 Purpose & Domain Role
The Progress / Target Card renders a prominent metric display combined with a visual percentage completion bar. It is ideal for monitoring battery charge levels, solar storage targets, budget thresholds, water storage capacity, or download progress. It displays a large primary KPI value and label on the left, an optional target goal value and label on the right, and a horizontal filled progress track.

### 2.2 Configuration Schema Contract
```yaml
type: custom:component-progress-v2
value: "78%"                           # Primary KPI text (string, default: "68%")
label: "Battery State of Charge"       # Primary KPI label (string, default: "Progress metric")
progress: 78                           # Numerical progress percentage 0-100 (number, default: 68)
target_value: "100%"                   # Goal / target KPI text (string, default: "100%")
target_label: "Full"                   # Goal label text (string, default: "Target")
navigation_path: "/lovelace/battery"   # Optional SPA route target (string | null)
entity: "sensor.battery_soc"           # Optional entity ID for more-info popup (string | null)
```

### 2.3 Value Clamping & Bar Sizing
- The percentage fill width is safely clamped to the `[0, 100]` range:
  ```ts
  const p = Math.min(100, Math.max(0, Number(this._config.progress) || 0));
  ```
- Protects against invalid, negative, or overflowing percentage values breaking DOM boundaries.

### 2.4 Interaction Model & Precedence Rules
- If `navigation_path` is configured, clicking navigates to the path via `this.navigate(path)`.
- If `navigation_path` is omitted and `entity` is configured, clicking opens more-info via `this.moreInfo(entity)`.
- In interactive mode: sets `role="button"` and `tabindex="0"`, adding tactile feedback.
- In static mode: sets `role="none"` and `tabindex="-1"`.

### 2.5 Accessibility & Visual Standards
- **Touch Target**: The outer `.wrap` container has a minimum height of `78px`, providing an expansive touch area (well above the 44px WCAG 2.1 AA requirement).
- **Typography & Layout**:
  - Main KPI: `font-size: 27px`, `line-height: 1`, `font-weight: 650`, `letter-spacing: -0.035em` (responsive scaling to `25px` on <= 700px screens).
  - Track: `height: 5px`, `border-radius: 999px`, background `--secondary-background-color`, fill `--primary-color`.
- **Keyboard Navigation**: Active cards support keyboard focus with standard high-visibility focus ring (`outline: 2px solid var(--primary-color); outline-offset: -2px; border-radius: var(--ha-card-border-radius, 16px)`).
- **Sanitization**: All dynamic text strings are escaped via `this.esc()`.

---

## 3. Actual Implementation Analysis

### 3.1 Architecture & DOM Structure
- Extends `LitBaseCard<ProgressCardConfig>`.
- Structure inside `<ha-card>`:
  ```html
  <div class="wrap actionable" role="button" tabindex="0">
    <div class="head">
      <div>
        <div class="value">78%</div>
        <div class="label">Battery State of Charge</div>
      </div>
      <div class="target">
        <b>100%</b> Full
      </div>
    </div>
    <div class="track">
      <div class="fill" style="width:78%"></div>
    </div>
  </div>
  ```

### 3.2 State Flow & Lifecycle
- `setConfig()` initializes configuration with defaults.
- `updated()` binds the micro-interaction handler dynamically to the `.wrap` element when actionable, destroying old handles.
- `disconnectedCallback()` releases the `_interactionHandle`.

---

## 4. Gaps Identified & Remediations Applied

| Audit Category | Expected Behaviour | Actual Code Inspection | Status / Remediation |
| :--- | :--- | :--- | :--- |
| **Progress Bounds** | Clamped strictly between 0 and 100 | Calculated via `Math.min(100, Math.max(0, Number(progress) || 0))` | Matches Spec |
| **Action Priority** | Navigation path > More-info entity | Resolved in `_getAction()` in proper priority order | Matches Spec |
| **A11y Target** | Min height >= 44px, keyboard accessible | `.wrap` has `min-height: 78px`, focus-visible ring | Compliant WCAG 2.1 AA |
| **Lifecycle Safety** | Teardown interaction on re-render / detach | Destroyed in `updated()` and `disconnectedCallback()` | Verified Zero Leak |
| **Visual Fidelity** | Exact match with oracle CSS metrics | Verbatim font-sizes, track height, and media queries preserved | Verified |

---

## 5. Verification Status & Test Evidence
- **Vitest Unit Contract**: Tested in [`presentation.test.ts`](file:///C:/Source%20Local/HA-Component-Library/tests/contracts/presentation.test.ts) (`component-progress-v2 renders bounded progress bar`).
- **Lovelace YAML Fixtures**: Validated in [`lovelace-yaml-fixtures.test.ts`](file:///C:/Source%20Local/HA-Component-Library/tests/contracts/lovelace-yaml-fixtures.test.ts).
- **Public Inventory Registration**: Verified in [`public-inventory.test.ts`](file:///C:/Source%20Local/HA-Component-Library/tests/registration/public-inventory.test.ts).
- **Browser Smoke Test**: Verified custom element instantiation and rendering under Chromium browser harness.
