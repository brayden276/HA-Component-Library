# Component History & Architecture Audit: Notice Card

## 1. Component Overview & Public Lovelace Tags
- **Component Identifier**: `notice`
- **Public Custom Element**: `component-notice-v2`
- **Public Lovelace Card Type**: `custom:component-notice-v2`
- **Canonical Class**: `ComponentNoticeV2` (inherits from `LitBaseCard<NoticeCardConfig>`)
- **Source Files**:
  - Implementation: [`notice-card.ts`](file:///C:/Source%20Local/HA-Component-Library/src/cards/notice/notice-card.ts)
  - Styles: [`notice-card.styles.ts`](file:///C:/Source%20Local/HA-Component-Library/src/cards/notice/notice-card.styles.ts)
  - Types: [`notice-card.types.ts`](file:///C:/Source%20Local/HA-Component-Library/src/cards/notice/notice-card.types.ts)
  - Barrel Export: [`index.ts`](file:///C:/Source%20Local/HA-Component-Library/src/cards/notice/index.ts)
- **Oracle Source Reference**: `HA-UI-Components/src/components/notice.js`
- **Category**: Presentational / Notice & Alert Banner
- **Card Size**: `2`

---

## 2. Intended Functionality

### 2.1 Purpose & Domain Role
The Notice Card is a prominent banner component designed to inform the user of system alerts, device notices, firmware updates, or urgent maintenance states. It pairs a styled icon badge with a title and detailed message, supporting four distinct semantic tones: `info`, `warning`, `error`, and `success`. It optionally supports interactive tap actions for navigation or entity inspection.

### 2.2 Configuration Schema Contract
```yaml
type: custom:component-notice-v2
title: "Firmware Update Available"  # Primary banner header (string, default: "Notice title")
message: "Zigbee Coordinator 2.4.1 ready to install." # Informational message (string)
tone: "warning"                     # Tone: "info" | "warning" | "error" | "success" (default: "info")
icon: "mdi:alert-circle-outline"    # MDI icon (default: "mdi:information-outline")
navigation_path: "/lovelace/updates" # Optional SPA route target (string | null)
entity: "update.zigbee_coordinator" # Optional entity ID for more-info popup (string | null)
```

### 2.3 Semantic Tones & Color Mapping
- **info (default)**: Icon colored with `--primary-color`.
- **warning**: Icon colored with `--warning-color` (fallback to `--primary-color`).
- **error**: Icon colored with `--error-color` (fallback to `--primary-color`).
- **success**: Icon colored with `--success-color` (fallback to `--primary-color`).

### 2.4 Interaction Model & Precedence Rules
- If `navigation_path` is present, clicking the card navigates via `this.navigate(navigation_path)`.
- If `navigation_path` is absent and `entity` is present, clicking opens more-info via `this.moreInfo(entity)`.
- When action is bound, the card adds `.actionable` class, sets `role="button"` and `tabindex="0"`, and attaches micro-interaction feedback.
- When no action is configured, sets `role="none"` and `tabindex="-1"`.

### 2.5 Accessibility & Visual Standards
- **Touch Target**: The banner `.wrap` has `min-height: 70px`, providing an expansive touch target (well above 44px minimum).
- **Keyboard Navigation**: In actionable mode, `tabindex="0"` allows tab focus, with a distinct outline ring (`outline: 2px solid var(--primary-color); outline-offset: -2px; border-radius: var(--ha-card-border-radius, 16px)`).
- **Sanitization**: All dynamic text strings and icon names are safely escaped via `this.esc()`.

---

## 3. Actual Implementation Analysis

### 3.1 Architecture & DOM Structure
- Extends `LitBaseCard<NoticeCardConfig>`.
- Root structure:
  ```html
  <ha-card>
    <div class="wrap warning actionable" role="button" tabindex="0">
      <span class="icon"><ha-icon icon="mdi:alert-circle-outline"></ha-icon></span>
      <div>
        <div class="title">Firmware Update Available</div>
        <div class="message">Zigbee Coordinator 2.4.1 ready to install.</div>
      </div>
    </div>
  </ha-card>
  ```
- Grid layout: 2 columns (`34px minmax(0, 1fr)`) with `gap: 10px`, `padding: 12px 14px`, and icon badge `34x34px` with `11px` radius.

### 3.2 State Flow & Lifecycle
- `setConfig()` applies default fallback properties.
- `updated()` manages the `InteractionHandle`, attaching interaction on `.wrap` if actionable and tearing down prior handles.
- `disconnectedCallback()` destroys `_interactionHandle` to prevent memory leaks.

---

## 4. Gaps Identified & Remediations Applied

| Audit Category | Expected Behaviour | Actual Code Inspection | Status / Remediation |
| :--- | :--- | :--- | :--- |
| **Tone Support** | Support "info", "warning", "error", "success" | Validated tone string checked against `["warning", "error", "success"]` | Matches Spec |
| **Action Priority** | Navigation path > More-info entity | Resolved in `_getAction()` in proper priority order | Matches Spec |
| **A11y Role & Focus** | Role and tabindex dynamically set based on action presence | Dynamically set: `role="button"` / `tabindex="0"` when action exists | Compliant WCAG 2.1 AA |
| **Lifecycle Safety** | Teardown interaction on re-render / detach | Destroyed in `updated()` and `disconnectedCallback()` | Verified Zero Leak |
| **Visual Fidelity** | Exact CSS grid, padding, and tone colors from oracle | Verbatim CSS tokens and rules preserved | Verified |

---

## 5. Verification Status & Test Evidence
- **Vitest Unit Contract**: Tested in [`presentation.test.ts`](file:///C:/Source%20Local/HA-Component-Library/tests/contracts/presentation.test.ts) (`component-notice-v2 renders with tone classes`).
- **Lovelace YAML Fixtures**: Validated in [`lovelace-yaml-fixtures.test.ts`](file:///C:/Source%20Local/HA-Component-Library/tests/contracts/lovelace-yaml-fixtures.test.ts).
- **Public Inventory Registration**: Verified in [`public-inventory.test.ts`](file:///C:/Source%20Local/HA-Component-Library/tests/registration/public-inventory.test.ts).
- **Browser Smoke Test**: Verified custom element instantiation and rendering under Chromium browser harness.
