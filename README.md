# Home Assistant Component Library 🏠

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7%20(Strict)-blue.svg)](https://www.typescriptlang.org/)
[![Lit](https://img.shields.io/badge/Lit-3.2-blueviolet.svg)](https://lit.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF.svg)](https://vitejs.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-4.1%20(63%20passed)-green.svg)](https://vitest.dev/)
[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-Lovelace%20(48%20Cards)-41BDF5.svg)](https://www.home-assistant.io/)

A modern, high-performance, strictly-typed Web Component library and custom Lovelace card suite for **Home Assistant**, authored in **TypeScript** + **Lit 3** and compiled using **Vite**.

This repository is the clean, modern architectural destination for all cards previously housed in `HA-UI-Components`, preserving 100% of existing visual styling, touch interactions, micro-styling, responsive behaviours, and Lovelace YAML compatibility.

---

## 🌟 Architectural Features

- **Strict TypeScript & Zero Build Errors**: Comprehensive type safety with zero implicit `any`, strictly typed entity/device/area registries, and Home Assistant interface bindings.
- **Lit 3 Reactive Lifecycle**: High-performance shadow DOM encapsulation, micro-styled tokens, CSS custom properties, and declarative templates.
- **Micro-Styling & Touch Geometry Preservation**: Exact adherence to 44px touch targets, subtle responsive transitions, interactive dials, tactile feedback, and dashboard typography tokens.
- **Consolidated Adapters**:
  - `component-camera-controller-v1` delegates to `component-camera-controller-v2` architecture.
  - `component-empty-state-v2` delegates to `component-empty-state-v3` architecture.
  - `component-favourites-minimal-v1` delegates to `component-favourites-v3` with typed variants.
  - `component-home-overview-v5` registered alias of `component-home-overview-v4`.
- **Reusable Shared Services & Shared Primitives**:
  - `interaction()`: Unified pointerdown/up/move, hold-to-more-info, optimistic state management, repeating stepped buttons, and haptic feedback.
  - `createAsyncBroker()`: Smart caching broker with in-flight deduplication, TTL expirations, and WebSocket connection subscriptions.
  - `energyDayState` / `energyDayData`: Cross-card synchronized calendar day channel navigation and 10-minute bucket statistics broker.
  - `centralRegistry`: Shared entity, device, and area registries with dynamic change subscription.
- **Automated CI & Contract Test Validation**: 13 Vitest test suites executing 63 contract and regression tests across all 48 cards and shared services.
- **HACS Ready**: Single ES module compilation into `dist/ha-component-library.js` with automated card picker registration via `window.customCards`.

---

## 📦 Card Inventory (48 Custom Cards)

### 1. Presentation Family (12 Cards)
| Lovelace Card Type | Custom Element Tag | Description |
| :--- | :--- | :--- |
| `custom:component-context-strip-v3` | `component-context-strip-v3` | Responsive header strip with status chips |
| `custom:component-single-kpi-v2` | `component-single-kpi-v2` | Focused primary metric display with sub-text |
| `custom:component-three-stat-v2` | `component-three-stat-v2` | Triple balanced metric display row |
| `custom:component-status-row-v2` | `component-status-row-v2` | High-density status indicator row |
| `custom:component-progress-v2` | `component-progress-v2` | Visual target completion bar |
| `custom:component-action-v2` | `component-action-v2` | Standalone action trigger tile |
| `custom:component-list-v2` | `component-list-v2` | Ranked list item presentation |
| `custom:component-notice-v2` | `component-notice-v2` | Information, warning, and alert banners |
| `custom:component-text-effect-v1` | `component-text-effect-v1` | Kinetic typing and animated text effects |
| `custom:component-section-separator-v2` | `component-section-separator-v2` | Labeled section division rule |
| `custom:component-empty-state-v3` | `component-empty-state-v3` | Structured placeholder for empty views |
| `custom:component-empty-state-v2` | `component-empty-state-v2` | Backward-compatible empty-state adapter |

### 2. Navigation Family (4 Cards)
| Lovelace Card Type | Custom Element Tag | Description |
| :--- | :--- | :--- |
| `custom:component-quick-nav-v2` | `component-quick-nav-v2` | Fast dashboard section switcher |
| `custom:component-nav-tile-v2` | `component-nav-tile-v2` | Iconographic destination tile |
| `custom:component-room-navigation-v1` | `component-room-navigation-v1` | Area switcher with active state indicators |
| `custom:component-room-sheet-v2` | `component-room-sheet-v2` | Full-height swipeable room detail sheet |

### 3. Controls & System Family (6 Cards)
| Lovelace Card Type | Custom Element Tag | Description |
| :--- | :--- | :--- |
| `custom:component-control-row-v2` | `component-control-row-v2` | Multi-mode slider, switch, and state control row |
| `custom:component-media-row-v2` | `component-media-row-v2` | Media playback row with inline volume & controls |
| `custom:component-update-summary-v3` | `component-update-summary-v3` | System pending update monitor |
| `custom:component-update-row-v3` | `component-update-row-v3` | Individual entity update action row |
| `custom:component-device-discovery-v2` | `component-device-discovery-v2` | Discovered device status card |
| `custom:component-device-aware-auto-entities-v1` | `component-device-aware-auto-entities-v1` | Dynamic registry-filtered entity list |

### 4. Device Controllers Family (6 Cards)
| Lovelace Card Type | Custom Element Tag | Description |
| :--- | :--- | :--- |
| `custom:component-garage-door-controller-v1` | `component-garage-door-controller-v1` | Interactive garage controller with door animation |
| `custom:component-wled-controller-v1` | `component-wled-controller-v1` | WLED controller with preset selector & sliders |
| `custom:component-split-controller-v4` | `component-split-controller-v4` | Climate split-system controller with vanes & modes |
| `custom:component-apple-tv-controller-v1` | `component-apple-tv-controller-v1` | Apple TV media player with directional remote |
| `custom:component-camera-controller-v2` | `component-camera-controller-v2` | Camera feed controller with live detection list |
| `custom:component-camera-controller-v1` | `component-camera-controller-v1` | Legacy camera controller adapter |

### 5. Security Family (4 Cards)
| Lovelace Card Type | Custom Element Tag | Description |
| :--- | :--- | :--- |
| `custom:component-security-summary-v1` | `component-security-summary-v1` | Real-time security subsystem overview |
| `custom:component-security-camera-wall-v3` | `component-security-camera-wall-v3` | Multi-camera wall layout with live event stream |
| `custom:component-security-entry-points-v1` | `component-security-entry-points-v1` | Perimeter and entry sensor monitor |
| `custom:component-security-dashboard-v1` | `component-security-dashboard-v1` | Unified security dashboard coordinator |

### 6. Energy Family (7 Cards)
| Lovelace Card Type | Custom Element Tag | Description |
| :--- | :--- | :--- |
| `custom:component-energy-day-selector-v1` | `component-energy-day-selector-v1` | Synchronized day navigation bar |
| `custom:component-energy-summary-v1` | `component-energy-summary-v1` | Live house, solar, and grid power overview |
| `custom:component-history-graph-v2` | `component-history-graph-v2` | Interactive SVG energy history graph |
| `custom:solar-daylight-card-v7` | `solar-daylight-card-v7` | Solar generation curve and daylight estimator |
| `custom:energy-history-card-v3` | `energy-history-card-v3` | Dense rolling / calendar-day power graph |
| `custom:metric-pair-card-v3` | `metric-pair-card-v3` | Dual metric tile with statistics integration |
| `custom:component-energy-dashboard-v1` | `component-energy-dashboard-v1` | Unified energy dashboard coordinator |

### 7. Home Composition & Directories Family (9 Cards)
| Lovelace Card Type | Custom Element Tag | Description |
| :--- | :--- | :--- |
| `custom:component-welcome-header-v1` | `component-welcome-header-v1` | Household greeting header with weather summary |
| `custom:component-household-attention-v1` | `component-household-attention-v1` | Dynamic attention filter for urgent home alerts |
| `custom:component-favourites-v3` | `component-favourites-v3` | Customisable quick-slot favourites grid |
| `custom:component-favourites-minimal-v1` | `component-favourites-minimal-v1` | Restrained typography favourites adapter |
| `custom:component-smart-collection-v3` | `component-smart-collection-v3` | Dynamic registry collection with embedded controls |
| `custom:component-household-directory-v3` | `component-household-directory-v3` | Quick actions and view directory |
| `custom:component-room-directory-v4` | `component-room-directory-v4` | Room cards with room-sheet modal launch |
| `custom:component-home-overview-v4` | `component-home-overview-v4` | Complete modular home overview board |
| `custom:component-home-overview-v5` | `component-home-overview-v5` | Registered alias of Home Overview |

---

## 🚀 Quick Start & Development

### 1. Prerequisites
- **Node.js** v20+
- **NPM** v10+

### 2. Installation
```bash
npm install
```

### 3. Running Contract Tests
```bash
npm test
```

### 4. Strict Typecheck & Production Build
```bash
npm run typecheck
npm run build
```

---

## 🛠️ Home Assistant Installation

### Option 1: Via HACS (Recommended)
1. Add this repository URL to **HACS** > **Frontend** > **Custom Repositories** (Category: *Lovelace*).
2. Click **Download**.

### Option 2: Manual Installation
1. Compile the bundle using `npm run build`.
2. Copy `dist/ha-component-library.js` to your Home Assistant `config/www/` directory.
3. In Home Assistant, navigate to **Settings** > **Dashboards** > **Resources** > **Add Resource**:
   - **URL**: `/local/ha-component-library.js`
   - **Type**: `JavaScript Module`

---

## 📄 License
MIT
