import { css, unsafeCSS } from "lit";
export * from "../styles/tokens";
export * from "../styles/shared-styles";

/**
 * Shared dashboard CSS custom properties, preserved verbatim from the oracle.
 */
export const DASHBOARD_SHARED_STYLE_ID = "dashboard-shared-ui-tokens-v3";

export const DASHBOARD_SHARED_STYLE_CSS = `:root{--dashboard-space-1:3px;--dashboard-space-2:6px;--dashboard-space-3:10px;--dashboard-space-4:12px;--dashboard-space-5:18px;--dashboard-control-height:38px;--dashboard-icon-size:18px;--dashboard-transition-fast:80ms;--dashboard-transition-standard:160ms;--dashboard-easing-standard:cubic-bezier(.2,0,0,1);--dashboard-focus-ring:2px solid var(--primary-color);--dashboard-focus-offset:2px;--dashboard-layer-popover:20;--dashboard-layer-overlay:1000;--dashboard-media-surface:#111;--dashboard-media-on-surface:#fff;--dashboard-radius-card:7px;--dashboard-radius-control:5px;--dashboard-radius-dialog:8px;--dashboard-radius-icon:0px;--dashboard-modal-scrim:rgba(0,0,0,.16);--dashboard-card-surface:var(--ha-card-background,var(--card-background-color));--dashboard-card-muted-surface:color-mix(in srgb,var(--primary-text-color) 3%,var(--card-background-color));--dashboard-card-border-color:color-mix(in srgb,var(--primary-text-color) 10%,transparent);--dashboard-card-border:1px solid var(--dashboard-card-border-color);--dashboard-active-surface:color-mix(in srgb,var(--primary-color) 7%,var(--card-background-color));--dashboard-warning-surface:color-mix(in srgb,var(--warning-color,#f9a825) 9%,var(--card-background-color));--dashboard-critical-surface:color-mix(in srgb,var(--error-color) 8%,var(--card-background-color));--dashboard-dialog-shadow:0 12px 36px rgba(0,0,0,.18);--ha-card-border-radius:var(--dashboard-radius-card);--ha-card-box-shadow:none;--ha-card-border-width:1px;--ha-card-border-color:var(--dashboard-card-border-color)}@media(max-width:700px){:root{--dashboard-radius-dialog:7px}}@media(prefers-reduced-motion:reduce){:root{--dashboard-transition-fast:0ms;--dashboard-transition-standard:0ms}}`;

export const injectDashboardTokens = (): void => {
  if (typeof document === "undefined") return;
  let el = document.getElementById(DASHBOARD_SHARED_STYLE_ID);
  if (!el) {
    el = document.createElement("style");
    el.id = DASHBOARD_SHARED_STYLE_ID;
    document.head?.append(el);
  }
  el.textContent = DASHBOARD_SHARED_STYLE_CSS;
};

// Auto-inject tokens on load
injectDashboardTokens();

export const dashboardTokens = css`
  ${unsafeCSS(DASHBOARD_SHARED_STYLE_CSS)}
`;

/**
 * Shared presentational card CSS, preserved verbatim from the oracle.
 */
export const PRESENTATIONAL_CARD_STYLES = `:host{display:block;min-width:0}ha-card{overflow:hidden;border-radius:var(--ha-card-border-radius,12px);background:var(--ha-card-background,var(--card-background-color));color:var(--primary-text-color)}*{box-sizing:border-box}button{font:inherit;color:inherit}button.demo{appearance:none;width:100%;border:0;background:transparent;text-align:inherit;padding:0;cursor:pointer}button.demo:active{transform:scale(.992)}button.demo:focus-visible{outline:2px solid var(--primary-color);outline-offset:-2px;border-radius:var(--ha-card-border-radius,12px)}`;

/**
 * Dashboard base card styles (for metric/kpi/summary cards), preserved verbatim.
 */
export const DASHBOARD_BASE_CARD_STYLES = `:host{display:block;min-width:0}ha-card{overflow:hidden;border:var(--dashboard-card-border,1px solid var(--divider-color));border-radius:var(--dashboard-radius-card,var(--ha-card-border-radius,6px));background:var(--dashboard-card-surface,var(--ha-card-background,var(--card-background-color)));box-shadow:none;color:var(--primary-text-color);box-sizing:border-box}.wrap{box-sizing:border-box;padding:8px 11px}.title{font-size:12px;line-height:1.2;font-weight:500;color:var(--primary-text-color)}.desc{margin-top:2px;font-size:10.5px;line-height:1.25;color:var(--secondary-text-color)}ha-icon{--mdc-icon-size:17px}button{font:inherit;color:inherit}button.i{appearance:none;border:0;background:transparent;cursor:pointer}button.i:active{background:var(--dashboard-card-muted-surface,var(--secondary-background-color))}button.i:focus-visible{outline:2px solid var(--primary-color);outline-offset:2px;border-radius:var(--dashboard-radius-control,4px)}@media(max-width:700px){.wrap{padding:8px 10px}}`;

/**
 * Shared Update card presentation styles, preserved verbatim from the oracle.
 */
export const UPDATE_CARD_STYLES = `:host{display:block;min-width:0}ha-card{overflow:hidden;border-radius:var(--ha-card-border-radius,16px);background:var(--ha-card-background,var(--card-background-color));color:var(--primary-text-color)}*{box-sizing:border-box}button{font:inherit;color:inherit}`;

export const presentationalCardStyles = css`
  ${unsafeCSS(PRESENTATIONAL_CARD_STYLES)}
`;

export const dashboardBaseCardStyles = css`
  ${unsafeCSS(DASHBOARD_BASE_CARD_STYLES)}
`;

export const updateCardStyles = css`
  ${unsafeCSS(UPDATE_CARD_STYLES)}
`;

// Common card styles used by standalone HA cards (action-tile, status-card, etc.)
export const commonCardStyles = presentationalCardStyles;

export const editorStyles = css`
  .editor-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 8px 0;
  }
  .form-row {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .form-label {
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--secondary-text-color, #757575);
  }
  .form-input,
  .form-select {
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.25));
    background: var(--card-background-color, #ffffff);
    color: var(--primary-text-color, #212121);
    font-size: 0.9rem;
    outline: none;
  }
  .form-input:focus,
  .form-select:focus {
    border-color: var(--primary-color, #03a9f4);
  }
`;

// Re-export interaction styles constant for use in cards
export { interactionStyles, INTERACTION_DEFAULTS } from "./interaction";
