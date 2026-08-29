import { css, unsafeCSS } from "lit";
import { GLOBAL_THEME_CSS, GLOBAL_THEME_STYLE_ID, injectGlobalTokens } from "../styles/tokens";
export * from "../styles/tokens";
export * from "../styles/shared-styles";

/**
 * Shared dashboard CSS custom properties, strictly matching Design Catalogue.
 */
export const DASHBOARD_SHARED_STYLE_ID = GLOBAL_THEME_STYLE_ID;
export const DASHBOARD_SHARED_STYLE_CSS = GLOBAL_THEME_CSS;

export const injectDashboardTokens = (): void => {
  injectGlobalTokens();
};

// Auto-inject tokens on load
injectDashboardTokens();

export const dashboardTokens = css`
  ${unsafeCSS(DASHBOARD_SHARED_STYLE_CSS)}
`;

/**
 * Shared presentational card CSS conforming 100% to Design Catalogue.
 */
// These string-based compatibility styles are used by a small set of older
// public cards. Keep the catalogue tokens in the same shadow root: Home
// Assistant themes still win through inheritance, while standalone previews
// receive the documented fallbacks instead of unstyled CSS variables.
export const PRESENTATIONAL_CARD_STYLES = `${DASHBOARD_SHARED_STYLE_CSS}:host{display:block;min-width:0}ha-card{overflow:hidden;border:var(--dashboard-card-border);border-radius:var(--dashboard-radius-card);background:var(--dashboard-card-surface);color:var(--primary-text-color);box-shadow:none}*{box-sizing:border-box}button{font:inherit;color:inherit}button.demo{appearance:none;width:100%;border:0;background:transparent;text-align:inherit;padding:0;cursor:pointer}button.demo:active{transform:scale(.992)}button.demo:focus-visible{outline:2px solid var(--primary-color);outline-offset:-2px;border-radius:var(--dashboard-radius-card)}`;

/**
 * Dashboard base card styles (for metric/kpi/summary cards).
 */
export const DASHBOARD_BASE_CARD_STYLES = `${DASHBOARD_SHARED_STYLE_CSS}:host{display:block;min-width:0}ha-card{overflow:hidden;border:var(--dashboard-card-border);border-radius:var(--dashboard-radius-card);background:var(--dashboard-card-surface);box-shadow:none;color:var(--primary-text-color);box-sizing:border-box}.wrap{box-sizing:border-box;padding:8px 11px}.title{font-size:13px;line-height:1.25;font-weight:600;color:var(--primary-text-color)}.desc{margin-top:2px;font-size:12px;line-height:1.25;color:var(--secondary-text-color)}ha-icon{--mdc-icon-size:20px}button{font:inherit;color:inherit}button.i{appearance:none;border:0;background:transparent;cursor:pointer}button.i:active{background:var(--dashboard-card-muted-surface)}button.i:focus-visible{outline:2px solid var(--primary-color);outline-offset:2px;border-radius:var(--dashboard-radius-control)}@media(max-width:700px){.wrap{padding:8px 10px}}`;

/**
 * Shared Update card presentation styles.
 */
export const UPDATE_CARD_STYLES = `${DASHBOARD_SHARED_STYLE_CSS}:host{display:block;min-width:0}ha-card{overflow:hidden;border:var(--dashboard-card-border);border-radius:var(--dashboard-radius-card);background:var(--dashboard-card-surface);color:var(--primary-text-color)}*{box-sizing:border-box}button{font:inherit;color:inherit}`;

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
    font-size: 12.5px;
    font-weight: 600;
    color: var(--secondary-text-color);
  }
  .form-input,
  .form-select {
    padding: 0 12px;
    height: 44px;
    border-radius: var(--dashboard-radius-control);
    border: var(--dashboard-card-border);
    background: var(--dashboard-card-surface);
    color: var(--primary-text-color);
    font-size: 13px;
    outline: none;
    box-sizing: border-box;
  }
  .form-input:focus,
  .form-select:focus {
    border-color: var(--primary-color);
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
`;

// Re-export interaction styles constant for use in cards
export { interactionStyles, INTERACTION_DEFAULTS } from "./interaction";
