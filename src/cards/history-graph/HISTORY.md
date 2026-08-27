# Component History & Specification: History Graph

## 1. Component Overview & Public Lovelace Tag(s)
- **Tag:** `<component-history-graph-v2>`
- **Type Identifier:** `custom:component-history-graph-v2` / `component-history-graph-v2`
- **Class Name:** `ComponentHistoryGraphV2`
- **Module Path:** `src/cards/history-graph/history-graph-card.ts`
- **Role:** General-purpose multi-series interactive history graph card with interactive series toggles, dynamic tooltip scrubbing, touch pinning, and zero-baseline bidirectional partitioning.

---

## 2. Intended Functionality

### 2.1 Purpose & Scope
Serves as an interactive charting component capable of visualizing multiple time-series curves (Primary, Secondary, and Supporting), enabling users to toggle individual series visibility and scrub across the timeline with a detailed floating tooltip.

### 2.2 Config Contract (`HistoryGraphConfig`)
- `type`: `"custom:component-history-graph-v2"`
- `meta_text` *(optional, default: `"Aggregation label"`)*: Top-left aggregation descriptor.
- `series_1_label` *(optional, default: `"Primary series"`)*: Label for series 1.
- `series_2_label` *(optional, default: `"Secondary series"`)*: Label for series 2.
- `series_3_label` *(optional, default: `"Supporting series"`)*: Label for series 3.
- `positive_label` *(optional, default: `"Positive"`)*: Indicator label for positive quadrant.
- `negative_label` *(optional, default: `"Negative"`)*: Indicator label for negative quadrant.

### 2.3 Interactions & Lovelace Contracts
- `getCardSize()`: Returns `7`.
- `getGridOptions()`: Returns `{ columns: 12, rows: "auto" }`.
- **Legend Toggles:** Buttons in the top-right toggle series visibility on/off via `aria-pressed`.
- **Timeline Scrubbing & Pinning:** Hover or drag moves the vertical cursor line and displays a tooltip with percentage and series values. Tapping pins the tooltip until an outside tap occurs.

### 2.4 Accessibility & Visual Standards
- All interactive legend buttons have `min-height: 44px;`, `aria-pressed`, and explicit `aria-label` attributes (`"Toggle Primary series"`, etc.).
- The SVG root element has `role="img"` and `aria-label="Interactive reusable graph example"`.
- Keyboard focusable with high-visibility `:focus-visible` outlines.

---

## 3. Actual Implementation

### 3.1 Architecture & DOM Rendering
- Extends `LitBaseCard<HistoryGraphConfig>`.
- Renders an SVG chart with viewBox `0 0 800 420`:
  - Y-axis gridlines and percentage/value markers.
  - X-axis temporal labels (Start, 1/4, 1/2, 3/4, End).
  - Upper and lower graph partitions with zero-line separator.
  - Dynamic cursor line and HTML floating tooltip.

### 3.2 State / Data Flow & Lifecycle
- Uses `ResizeObserver` to observe `.chart` dimensions and trigger re-renders on container size changes.
- Outside pointer events dismiss pinned tooltips.
- Properly detaches `ResizeObserver` and removes `pointerdown` listener on `disconnectedCallback()`.

---

## 4. Gaps Identified & Remediations Applied

| Area | Finding / Gap | Remediation Status |
|---|---|---|
| ResizeObserver Attachment | In `connectedCallback()`, `.chart` was queried before the initial DOM render completed, causing the observer to miss the chart element on initial mount. | **Patched:** Added `_attachResizeObserver()` invoked in both `firstUpdated()` and `connectedCallback()`. |
| Screen-Reader Usability | Legend toggle buttons lacked descriptive `aria-label` strings. | **Patched:** Added explicit `aria-label` attributes to Series 1, 2, and 3 buttons. |

---

## 5. Verification Status & Test Evidence
- **Vitest Suite:** `tests/contracts/energy.test.ts`
- **Tests Executed:**
  - `component-history-graph-v2 renders interactive SVG graph and toggle buttons with a11y`
  - Integration verified against `public-inventory.test.ts` and `lovelace-yaml-fixtures.test.ts`.
- **Status:** All unit & integration tests passing.
