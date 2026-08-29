/**
 * Home Assistant Component Library
 * Unified TypeScript / Lit Custom Cards & Services
 */

// Shared Utilities & Types
export * from "./types/home-assistant";
export * from "./types/registry";
export * from "./utils/index";
export * from "./styles/index";

// Base Components & Primitives
export * from "./components/base/lit-base-card";
export * from "./components/primitives/index";

// Services
export * from "./services/registry/dashboard-registry";
export * from "./services/registry/registry-cache";
export * from "./services/registry/registry-health";
export * from "./services/registry/area-summary";
export * from "./services/discovery/entity-classifier";
export * from "./services/discovery/control-resolver";
export * from "./services/discovery/discovery-engine";
export * from "./services/profiles/backend-profiles";
export * from "./services/energy/energy-store";
export * from "./services/security/security-runtime";
export * from "./services/devices/wled-runtime";

// Presentation Cards
export * from "./cards/action/action-card";
export * from "./cards/context-strip/context-strip-card";
export * from "./cards/empty-state/empty-state-card";
export * from "./cards/list/list-card";
export * from "./cards/notice/notice-card";
export * from "./cards/progress/progress-card";
export * from "./cards/section-separator/section-separator-card";
export * from "./cards/single-kpi/single-kpi-card";
export * from "./cards/status-row/status-row-card";
export * from "./cards/text-effect/text-effect-card";
export * from "./cards/three-stat/three-stat-card";

// Navigation Cards
export * from "./cards/nav-tile/nav-tile-card";
export * from "./cards/quick-nav/quick-nav-card";
export * from "./cards/room-navigation/room-navigation-card";
export * from "./cards/room-sheet/room-sheet-card";

// Control & System Cards
export * from "./cards/control-row/control-row-card";
export * from "./cards/media-row/media-row-card";
export * from "./cards/device-aware-auto-entities/device-aware-auto-entities-card";
export * from "./cards/device-discovery/device-discovery-card";
export * from "./cards/update-row/update-row-card";
export * from "./cards/update-summary/update-summary-card";

// Device Cards
export * from "./cards/apple-tv/apple-tv-card";
export * from "./cards/camera/camera-card";
export * from "./cards/garage-door/garage-door-card";
export * from "./cards/split-ac/split-ac-card";
export * from "./cards/wled/wled-card";

// Security Cards
export * from "./cards/security-camera-wall/security-camera-wall-card";
export * from "./cards/security-dashboard/security-dashboard-card";
export * from "./cards/security-entry-points/security-entry-points-card";
export * from "./cards/security-summary/security-summary-card";

// Energy Cards
export * from "./cards/energy-dashboard/energy-dashboard-card";
export * from "./cards/energy-day-selector/energy-day-selector-card";
export * from "./cards/energy-history/energy-history-card";
export * from "./cards/energy-summary/energy-summary-card";
export * from "./cards/history-graph/history-graph-card";
export * from "./cards/metric-pair/metric-pair-card";
export * from "./cards/solar-daylight/solar-daylight-card";

// Home Overview & Composition Cards
export * from "./cards/favourites/favourites-card";
export * from "./cards/home-overview/home-overview-card";
export * from "./cards/household-attention/household-attention-card";
export * from "./cards/household-directory/household-directory-card";
export * from "./cards/room-directory/room-directory-card";
export * from "./cards/smart-collection/smart-collection-card";
export * from "./cards/welcome-header/welcome-header-card";

// Standalone Cards
export * from "./cards/action-tile/action-tile-card";
export * from "./cards/metric-badge/metric-badge-card";
export * from "./cards/quick-bar/quick-bar-card";
export * from "./cards/status-card/status-card-card";

// Editors
export * from "./editor/config-editor";

// Console banner for Home Assistant Frontend
console.info(
  "%c HA-COMPONENT-LIBRARY %c 1.0.0 ",
  "color: white; background: #03a9f4; font-weight: 700; border-radius: 3px 0 0 3px;",
  "color: #03a9f4; background: #e1f5fe; font-weight: 700; border-radius: 0 3px 3px 0;",
);
