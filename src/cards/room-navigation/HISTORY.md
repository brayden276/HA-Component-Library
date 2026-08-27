# History & Component Audit: Room Navigation Card

## Component Overview
- **Public Custom Element Tag**: `<component-room-navigation-v1>`
- **Lovelace Type**: `custom:component-room-navigation-v1`
- **Module Location**: `src/cards/room-navigation/room-navigation-card.ts`
- **Styles Location**: `src/cards/room-navigation/room-navigation-card.styles.ts`
- **Types Location**: `src/cards/room-navigation/room-navigation-card.types.ts`
- **Role**: Area-aware navigation card providing live environmental context, active lighting counts, critical hazard badges, and ambient room presence glow.

---

## Intended Functionality

### 1. Purpose & Domain Role
Room Navigation provides a high-density, smart routing tile for individual rooms/areas. It automatically correlates all devices and entities within the designated area (via Home Assistant's Area and Device Registries) to compute an aggregated status summary (hazard alerts, garage warnings, climate/temperature, humidity, active lights) and presence state.

### 2. Config Contract & Schema
```yaml
type: custom:component-room-navigation-v1
area: living_room                 # REQUIRED: Target area ID or area name
navigation_path: /lovelace/living # REQUIRED: Lovelace path to navigate to on click
name: Living Room                 # Display name (Default: 'Room')
icon: mdi:sofa                    # Icon displayed on the left (Default: 'mdi:home-outline')
demo_presence: true               # Optional override for presence glow (true/false)
presence_entity: binary_sensor.lr # Optional explicit binary sensor for presence
presence_colour_key: living_room  # Optional string key for deterministic glow hue
```

### 3. Interaction & Home Assistant Bindings
- **Primary Press**: Navigates to `navigation_path` using `interaction()` feedback.
- **Area & Device Registry Integration**:
  - Automatically loads and subscribes to `centralRegistry` for area metadata and device/entity mappings.
  - Matches area by `area_id` or case-insensitive `name`.
- **Status Diagnostics & Summaries (`computeAreaStatusSummary`)**:
  - **Critical Hazards**: Smoke, moisture, gas binary sensors in `'on'` state -> severity `'critical'` ("Attention required").
  - **Warnings**: Open garage doors / covers -> severity `'warning'` ("Garage open").
  - **Active State**: Lights on count, climate active cooling/heating/fan, media player playing -> severity `'active'`.
  - **Environmental Context**: Filtered ambient room temperature (prioritizes climate `current_temperature`, then ambient `sensor.*_temperature` excluding internal CPU/board sensors), and humidity.
- **Presence Glow**:
  - Evaluates explicit entity or area binary sensors (occupancy, presence, mmwave).
  - Renders dynamic HSL ambient border and box-shadow glow using a deterministic 32-bit FNV-1a hash of the presence color key.

### 4. Accessibility & Visual Standards (WCAG 2.1 AA)
- **Touch Target**: Min height of 56px (`min-height: 56px`), exceeding the 44px standard.
- **Dynamic Accessible Name**: Button uses dynamic `aria-label`: `"Open [RoomName]. [Summary]"` to give screen readers full context.
- **Focus Rings**: Standardized 2px primary color outline with offset.

---

## Actual Implementation

### 1. Architecture & DOM Structure
- Extends `LitBaseCard<RoomNavigationCardConfig>`.
- Shadow DOM Layout:
  - `<ha-card style="..." ?data-presence=${presence}>`
    - `<button class="${severity}" type="button" aria-label="...">`
      - `<span class="icon"><ha-icon icon="..."></ha-icon></span>`
      - `<span class="copy">`
        - `<span class="name">${name}</span>`
        - `<span class="summary">${summary}</span>`

### 2. Grid & Layout Contracts
- `getGridOptions()`: Returns `{ columns: 6, rows: 1 }` for side-by-side 2-column grid arrangements in Lovelace.
- `getCardSize()`: Returns `1`.

### 3. Lifecycle & Subscription Management
- Validates configuration in `setConfig()`: Throws clear errors if `area` or `navigation_path` are missing.
- Subscribes to `centralRegistry` in both `connectedCallback()` and `willUpdate()` (ensuring late-assigned `hass` instances still establish WebSocket registry subscriptions).
- Cleans up subscriptions (`_unsubRegistry?.()`) and destroys interaction handles in `disconnectedCallback()`.

---

## Gaps Identified & Remediations Applied

| Aspect | Initial State | Finding / Gap | Remediation Status |
| :--- | :--- | :--- | :--- |
| **Late `hass` Binding Subscription** | Partial | If `hass` was assigned after `connectedCallback()`, live registry subscription was delayed until manual trigger | **Patched**: Added connection-aware subscription guard in `willUpdate()` |
| **Config Validation** | Handled | Throws if `area` or `navigation_path` is missing | Fully verified |
| **Noise Filtering for Temperature** | Handled | Regex excludes CPU, board, and internal hardware temperatures | Fully verified |
| **FNV-1a Deterministic Glow** | Handled | Hash computes stable 0-359° HSL hue per area | Fully verified |

---

## Verification Status & Test Evidence
- **Automated Contract Tests**: Verified in `tests/contracts/navigation.test.ts`:
  - `component-room-navigation-v1 requires area and navigation_path`
  - `component-room-navigation-v1 handles demo presence and grid options`
- **Full Suite Status**: All 116 tests passing.
- **Browser Smoke Test**: Verified working in Chromium browser execution.
