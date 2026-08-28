import { css, unsafeCSS } from "lit";

export const GLOBAL_THEME_STYLE_ID = "dashboard-style-tokens";

export const GLOBAL_THEME_CSS = `
:root {
  /* Canonical Design Tokens from Design Catalogue */
  --dashboard-radius-card: 8px;
  --dashboard-radius-control: 6px;
  --dashboard-radius-dialog: 10px;
  --dashboard-radius-icon: 0px;
  --dashboard-modal-scrim: rgba(0, 0, 0, 0.16);
  --dashboard-dialog-shadow: 0 16px 48px rgba(0, 0, 0, 0.22);
  --ha-card-border-radius: var(--dashboard-radius-card);
  --ha-card-box-shadow: none;
  --ha-card-border-width: 1px;

  /* Backward compatibility aliases */
  --c-radius-card: var(--dashboard-radius-card);
  --c-radius-control: var(--dashboard-radius-control);
  --c-radius-dialog: var(--dashboard-radius-dialog);
  --c-radius-icon: var(--dashboard-radius-icon);
  --c-radius-pill: 999px;
  --c-card-surface: var(--dashboard-card-surface);
  --c-card-border-color: var(--dashboard-card-border-color);
  --c-card-border: var(--dashboard-card-border);
  --c-muted-surface: var(--dashboard-card-muted-surface);
  --c-active-surface: var(--dashboard-active-surface);
  --c-dialog-shadow: var(--dashboard-dialog-shadow);
  --c-modal-scrim: var(--dashboard-modal-scrim);
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
  --c-row-min-height: 44px;
  --c-head-min-height: 32px;
  --c-icon-box-size: 28px;
  --c-icon-size: 17px;
  --c-icon-sm-size: 15px;
  --c-button-height: 34px;
  --c-button-sm-height: 26px;
  --c-button-icon-size: 32px;
  --c-switch-width: 38px;
  --c-switch-height: 22px;
  --c-switch-knob-size: 16px;
  --c-slider-width: 80px;
  --c-slider-height: 6px;
}

[data-theme="dark"], :root {
  --primary-color: #03a9f4;
  --primary-text-color: #e1e1e1;
  --secondary-text-color: #9e9e9e;
  --disabled-text-color: #616161;
  --card-background-color: #1c1c1e;
  --secondary-background-color: #2c2c2e;
  --divider-color: rgba(255, 255, 255, 0.12);
  --ha-card-background: var(--card-background-color);
  --ha-card-border-color: color-mix(in srgb, var(--primary-text-color) 10%, transparent);
  --dashboard-card-surface: var(--ha-card-background, var(--card-background-color));
  --dashboard-card-muted-surface: color-mix(in srgb, var(--primary-text-color) 3%, var(--card-background-color));
  --dashboard-card-border-color: color-mix(in srgb, var(--primary-text-color) 10%, transparent);
  --dashboard-card-border: 1px solid var(--dashboard-card-border-color);
  --dashboard-active-surface: color-mix(in srgb, var(--primary-color) 7%, var(--card-background-color));
  --dashboard-warning-surface: color-mix(in srgb, var(--warning-color, #f9a825) 9%, var(--card-background-color));
  --dashboard-critical-surface: color-mix(in srgb, var(--error-color, #e53935) 8%, var(--card-background-color));
  --warning-color: #f9a825;
  --error-color: #e53935;
  --success-color: #43a047;
  --text-primary-color: #ffffff;
  --catalogue-page-bg: #121214;
  --catalogue-border: #2c2c2e;
}

[data-theme="light"] {
  --primary-color: #0288d1;
  --primary-text-color: #212121;
  --secondary-text-color: #757575;
  --disabled-text-color: #9e9e9e;
  --card-background-color: #ffffff;
  --secondary-background-color: #f5f5f7;
  --divider-color: rgba(0, 0, 0, 0.12);
  --ha-card-background: var(--card-background-color);
  --ha-card-border-color: color-mix(in srgb, var(--primary-text-color) 10%, transparent);
  --dashboard-card-surface: var(--ha-card-background, var(--card-background-color));
  --dashboard-card-muted-surface: color-mix(in srgb, var(--primary-text-color) 3%, var(--card-background-color));
  --dashboard-card-border-color: color-mix(in srgb, var(--primary-text-color) 10%, transparent);
  --dashboard-card-border: 1px solid var(--dashboard-card-border-color);
  --dashboard-active-surface: color-mix(in srgb, var(--primary-color) 7%, var(--card-background-color));
  --dashboard-warning-surface: color-mix(in srgb, var(--warning-color, #f9a825) 9%, var(--card-background-color));
  --dashboard-critical-surface: color-mix(in srgb, var(--error-color, #e53935) 8%, var(--card-background-color));
  --warning-color: #f57f17;
  --error-color: #d32f2f;
  --success-color: #388e3c;
  --text-primary-color: #ffffff;
  --catalogue-page-bg: #f8fafc;
  --catalogue-border: #e2e8f0;
}

@media (max-width: 700px) {
  :root {
    --dashboard-radius-dialog: 8px;
    --c-radius-dialog: 8px;
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
