import { css, unsafeCSS } from "lit";

export const GLOBAL_THEME_STYLE_ID = "ha-component-library-theme-tokens";

export const GLOBAL_THEME_CSS = `
:root {
  /* ==========================================================================
     SPACING & LAYOUT TOKENS
     ========================================================================== */
  --c-space-1: 3px;
  --c-space-2: 6px;
  --c-space-3: 8px;
  --c-space-4: 10px;
  --c-space-5: 12px;
  --c-space-6: 16px;

  --c-card-padding: 8px 11px;
  --c-card-padding-dense: 6px 10px;
  --c-card-gap: 6px;
  --c-grid-gap: 6px;

  /* ==========================================================================
     TYPOGRAPHY SCALE
     ========================================================================== */
  --c-font-xs: 10px;
  --c-font-sm: 10.5px;
  --c-font-base: 11.5px;
  --c-font-md: 12px;
  --c-font-lg: 13.5px;
  --c-font-xl: 15px;
  --c-font-display: 20px;
  --c-font-hero: 22px;

  --c-font-weight-normal: 400;
  --c-font-weight-medium: 500;
  --c-font-weight-semibold: 600;

  --c-line-height-tight: 1.1;
  --c-line-height-normal: 1.2;
  --c-line-height-relaxed: 1.25;

  /* ==========================================================================
     COMPONENT DIMENSIONS
     ========================================================================== */
  --c-row-min-height: 44px;
  --c-head-min-height: 32px;
  --c-icon-box-size: 28px;
  --c-icon-size: 17px;
  --c-icon-sm-size: 15px;
  
  --c-button-height: 34px;
  --c-button-sm-height: 26px;
  --c-button-icon-size: 32px;
  
  --c-switch-width: 32px;
  --c-switch-height: 18px;
  --c-switch-knob-size: 14px;
  --c-slider-width: 80px;
  --c-slider-height: 4px;

  /* ==========================================================================
     BORDER RADII
     ========================================================================== */
  --c-radius-card: 7px;
  --c-radius-control: 5px;
  --c-radius-icon: 5px;
  --c-radius-dialog: 8px;
  --c-radius-pill: 999px;

  /* ==========================================================================
     SURFACES & BORDERS
     ========================================================================== */
  --c-card-surface: var(--ha-card-background, var(--card-background-color));
  --c-card-border-color: color-mix(in srgb, var(--primary-text-color) 10%, transparent);
  --c-card-border: 1px solid var(--c-card-border-color);
  --c-muted-surface: color-mix(in srgb, var(--primary-text-color) 3%, var(--card-background-color));
  --c-active-surface: color-mix(in srgb, var(--primary-color) 7%, var(--card-background-color));
  --c-dialog-shadow: 0 12px 36px rgba(0, 0, 0, 0.18);
  --c-modal-scrim: rgba(0, 0, 0, 0.16);

  /* Home Assistant Core Fallbacks */
  --ha-card-border-radius: var(--c-radius-card);
  --ha-card-box-shadow: none;
  --ha-card-border-width: 1px;
  --ha-card-border-color: var(--c-card-border-color);
}

@media (max-width: 700px) {
  :root {
    --c-card-padding: 8px 10px;
    --c-radius-dialog: 7px;
  }
}
`;

export const injectGlobalTokens = (): void => {
  if (typeof document === "undefined") return;
  let el = document.getElementById(GLOBAL_THEME_STYLE_ID);
  if (!el) {
    el = document.createElement("style");
    el.id = GLOBAL_THEME_STYLE_ID;
    document.head?.append(el);
  }
  el.textContent = GLOBAL_THEME_CSS;
};

// Auto-inject tokens immediately
injectGlobalTokens();

export const globalTokens = css`
  ${unsafeCSS(GLOBAL_THEME_CSS)}
`;
