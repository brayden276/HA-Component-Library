import { css, CSSResultGroup } from "lit";
import { globalTokens } from "./tokens";

/**
 * Canonical Base Card Styles conforming 100% to Design Catalogue
 */
export const cardBaseStyles: CSSResultGroup = [
  globalTokens,
  css`
    :host {
      display: block;
      min-width: 0;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    [hidden] {
      display: none !important;
    }
    button,
    input,
    select {
      font: inherit;
      color: inherit;
      appearance: none;
      border: 0;
      background: transparent;
    }
    button {
      cursor: pointer;
      padding: 0;
    }
    button:disabled,
    input:disabled,
    select:disabled {
      opacity: 0.45;
      cursor: default;
    }
    :is(button, input, select):focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    ha-card {
      position: relative;
      overflow: hidden;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-card);
      background: var(--dashboard-card-surface);
      box-shadow: var(--ha-card-box-shadow, none);
      color: var(--primary-text-color);
      box-sizing: border-box;
    }
    .icon-svg,
    ha-icon {
      fill: currentColor;
      display: inline-block;
      vertical-align: middle;
      flex-shrink: 0;
      --mdc-icon-size: 20px;
    }
    .icon-svg.sm,
    ha-icon.sm {
      width: 18px;
      height: 18px;
      --mdc-icon-size: 18px;
    }
    .icon-svg.xs,
    ha-icon.xs {
      width: 14px;
      height: 14px;
      --mdc-icon-size: 14px;
    }
    .icon-svg.lg,
    ha-icon.lg {
      width: 32px;
      height: 32px;
      --mdc-icon-size: 32px;
    }
  `,
];

/**
 * 1. Surfaces (Section 1 in Design Catalogue)
 */
export const surfaceStyles = css`
  .surface-card {
    border: var(--dashboard-card-border);
    border-radius: var(--dashboard-radius-card);
    background: var(--dashboard-card-surface);
    color: var(--primary-text-color);
    padding: 14px;
  }
  .surface-card.muted {
    background: var(--dashboard-card-muted-surface);
  }
  .surface-card.active {
    background: var(--dashboard-active-surface);
    border-color: var(--primary-color);
  }
  .surface-card.warning {
    background: var(--dashboard-warning-surface);
    border-left: 3px solid var(--warning-color);
  }
  .surface-card.critical {
    background: var(--dashboard-critical-surface);
    border-left: 3px solid var(--error-color);
  }
`;

/**
 * 2. Typography Primitives & Signature Animated Text (Section 2 in Design Catalogue)
 */
export const typographyStyles = css`
  .kpi-metric-lg {
    font-size: 20px;
    font-weight: 550;
    line-height: 1;
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
  }
  .kpi-metric-md {
    font-size: 16px;
    font-weight: 550;
    line-height: 1;
    letter-spacing: -0.015em;
    font-variant-numeric: tabular-nums;
  }
  .kpi-metric-sm {
    font-size: 15px;
    font-weight: 550;
    line-height: 1.1;
    font-variant-numeric: tabular-nums;
  }
  .label-title {
    font-size: 13px;
    font-weight: 600;
    line-height: 1.25;
  }
  .label-sub {
    font-size: 12px;
    color: var(--secondary-text-color);
    line-height: 1.25;
    margin-top: 3px;
    font-weight: 400;
  }
  .label-micro {
    font-size: 10.5px;
    font-weight: 650;
    color: var(--secondary-text-color);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  /* Signature Animated Text */
  .effect-wrap {
    position: relative;
    display: inline-block;
    font-size: 13px;
    font-weight: 600;
  }
  .stamp-effect {
    padding-bottom: 4px;
  }
  .stamp-effect:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    border-radius: 999px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      var(--primary-color) 45%,
      var(--primary-color) 55%,
      transparent 100%
    );
    background-size: 220% 100%;
    animation: stampSweep 2.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
  @keyframes stampSweep {
    0% {
      background-position: 210% 0;
      opacity: 0;
    }
    45% {
      opacity: 0.8;
    }
    100% {
      background-position: -110% 0;
      opacity: 0;
    }
  }
  .signal-effect {
    padding-left: 16px;
  }
  .signal-effect:before {
    content: "";
    position: absolute;
    left: 1px;
    top: 50%;
    width: 7px;
    height: 7px;
    margin-top: -3.5px;
    border: 1.5px solid var(--primary-color);
    border-radius: 2px;
    transform: rotate(45deg);
    animation: signalPulse 2.4s infinite;
  }
  .signal-effect:after {
    content: "";
    position: absolute;
    left: 3.5px;
    top: 50%;
    width: 2.5px;
    height: 2.5px;
    margin-top: -1.25px;
    border-radius: 50%;
    background: var(--primary-color);
  }
  @keyframes signalPulse {
    0%,
    100% {
      opacity: 0.3;
      transform: rotate(45deg) scale(0.85);
    }
    50% {
      opacity: 0.85;
      transform: rotate(45deg) scale(1.1);
    }
  }
`;

/**
 * 3. Buttons with Text (Section 3 in Design Catalogue)
 */
export const buttonStyles = css`
  .btn-primary-solid {
    min-height: 44px;
    padding: 0 16px;
    background: var(--primary-color);
    color: var(--text-primary-color);
    border-radius: var(--dashboard-radius-control);
    font-size: 13px;
    font-weight: 650;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    border: 0;
  }
  .btn-primary-solid:active {
    transform: scale(0.98);
  }
  .btn-secondary-outline {
    min-height: 44px;
    padding: 0 14px;
    border: var(--dashboard-card-border);
    border-radius: var(--dashboard-radius-control);
    color: var(--primary-color);
    font-size: 13px;
    font-weight: 650;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    background: transparent;
  }
  .btn-secondary-outline:hover {
    background: var(--dashboard-card-muted-surface);
  }
  .btn-secondary-outline.danger {
    color: var(--error-color);
  }
  .btn-action-pill {
    min-width: 0;
    min-height: 44px;
    flex: 1 1 110px;
    padding: 0 10px;
    border: var(--dashboard-card-border);
    border-radius: var(--dashboard-radius-control);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    color: var(--secondary-text-color);
    font-size: 12.5px;
    font-weight: 600;
    white-space: nowrap;
    background: transparent;
  }
  .btn-action-pill:hover {
    background: var(--dashboard-card-muted-surface);
    color: var(--primary-text-color);
  }
  .btn-action-pill.active {
    color: var(--primary-color);
    background: var(--dashboard-active-surface);
  }
  .btn-compact-pill {
    min-height: 32px;
    padding: 0 10px;
    border-radius: var(--dashboard-radius-control);
    border: var(--dashboard-card-border);
    background: var(--dashboard-card-muted-surface);
    color: var(--primary-color);
    font-size: 11.5px;
    font-weight: 650;
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }
  .btn-compact-pill:hover {
    background: var(--dashboard-active-surface);
  }
  .btn-dashed-add {
    width: 100%;
    min-height: 44px;
    border: 1px dashed var(--dashboard-card-border-color);
    border-radius: var(--dashboard-radius-control);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    color: var(--primary-color);
    font-size: 13px;
    font-weight: 650;
    background: transparent;
  }
  .btn-dashed-add:hover {
    background: var(--dashboard-card-muted-surface);
  }
  .option-select-btn {
    min-height: 48px;
    width: 100%;
    padding: 0 12px;
    border: var(--dashboard-card-border);
    border-radius: var(--dashboard-radius-control);
    display: grid;
    grid-template-columns: 20px minmax(0, 1fr) 20px;
    align-items: center;
    gap: 8px;
    text-align: left;
    font-size: 13px;
    font-weight: 600;
    color: var(--primary-text-color);
    background: transparent;
  }
  .option-select-btn:hover {
    background: var(--dashboard-card-muted-surface);
  }
  .option-select-btn.selected {
    color: var(--primary-color);
    border-color: var(--primary-color);
    background: var(--dashboard-active-surface);
  }
`;

/**
 * 4. Icon Buttons & Triggers (Section 4 in Design Catalogue)
 */
export const iconButtonStyles = css`
  .btn-icon-44 {
    width: 44px;
    height: 44px;
    border: var(--dashboard-card-border);
    border-radius: var(--dashboard-radius-control);
    display: grid;
    place-items: center;
    color: var(--secondary-text-color);
    background: transparent;
  }
  .btn-icon-44:hover {
    background: var(--dashboard-card-muted-surface);
    color: var(--primary-text-color);
  }
  .btn-icon-44.on {
    color: var(--primary-color);
  }
  .btn-icon-36 {
    width: 36px;
    height: 36px;
    border: var(--dashboard-card-border);
    border-radius: var(--dashboard-radius-control);
    display: grid;
    place-items: center;
    color: var(--secondary-text-color);
    background: transparent;
  }
  .btn-icon-36:hover {
    background: var(--dashboard-card-muted-surface);
    color: var(--primary-text-color);
  }
  .btn-icon-30 {
    width: 30px;
    height: 30px;
    border: var(--dashboard-card-border);
    border-radius: var(--dashboard-radius-control);
    display: grid;
    place-items: center;
    color: var(--secondary-text-color);
    background: transparent;
  }
  .btn-icon-30:hover {
    background: var(--dashboard-card-muted-surface);
    color: var(--primary-text-color);
  }
  .btn-icon-30.main {
    color: var(--primary-color);
  }
  .btn-icon-circle {
    width: 44px;
    height: 44px;
    border: var(--dashboard-card-border);
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: var(--secondary-text-color);
    background: var(--dashboard-card-muted-surface);
  }
  .btn-icon-circle:hover {
    background: var(--dashboard-card-surface);
    color: var(--primary-text-color);
  }
  .btn-icon-circle.main {
    color: var(--primary-color);
    border-color: var(--primary-color);
  }
`;

/**
 * 5. Icons & Wells (Section 5 in Design Catalogue)
 */
export const iconWellStyles = css`
  .icon-well {
    width: 40px;
    height: 40px;
    border-radius: var(--dashboard-radius-icon);
    display: grid;
    place-items: center;
    color: var(--primary-color);
    background: transparent;
    flex-shrink: 0;
  }
  .icon-well.control-radius {
    border-radius: var(--dashboard-radius-control);
    background: var(--secondary-background-color);
  }
`;

/**
 * 6. Input Fields & Form Controls (Section 6 in Design Catalogue)
 */
export const formControlStyles = css`
  .text-input-control {
    width: 100%;
    height: 44px;
    padding: 0 12px;
    border: var(--dashboard-card-border);
    border-radius: var(--dashboard-radius-control);
    background: var(--dashboard-card-surface);
    color: var(--primary-text-color);
    font-size: 13px;
  }
  .text-input-control::placeholder {
    color: var(--disabled-text-color);
  }
  .search-input-wrap {
    position: relative;
    width: 100%;
  }
  .search-input-wrap .icon-svg,
  .search-input-wrap ha-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--secondary-text-color);
    pointer-events: none;
  }
  .search-input-wrap input {
    width: 100%;
    height: 40px;
    padding: 0 12px 0 38px;
    border: var(--dashboard-card-border);
    border-radius: var(--dashboard-radius-control);
    background: var(--dashboard-card-surface);
    color: var(--primary-text-color);
    font-size: 12.5px;
  }
  .select-dropdown-control {
    width: 100%;
    height: 44px;
    padding: 0 34px 0 12px;
    border: var(--dashboard-card-border);
    border-radius: var(--dashboard-radius-control);
    background: var(--dashboard-card-surface);
    color: var(--primary-text-color);
    font-size: 13px;
    cursor: pointer;
  }
`;

/**
 * 7. Controls & Steppers (Section 7 in Design Catalogue)
 */
export const controlStyles = css`
  .switch-pill {
    width: 38px;
    height: 22px;
    border-radius: var(--dashboard-radius-control);
    background: var(--divider-color);
    padding: 3px;
    cursor: pointer;
    display: inline-block;
    transition: background 0.12s;
  }
  .switch-pill span {
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--secondary-text-color);
    transition: margin 0.12s, background 0.12s;
  }
  .switch-pill.on {
    background: color-mix(
      in srgb,
      var(--primary-color) 35%,
      var(--divider-color)
    );
  }
  .switch-pill.on span {
    margin-left: 16px;
    background: var(--primary-color);
  }
  .stepper-control {
    min-height: 48px;
    display: inline-grid;
    grid-template-columns: 44px minmax(82px, auto) 44px;
    align-items: center;
    border: var(--dashboard-card-border);
    border-radius: var(--dashboard-radius-control);
    background: transparent;
    overflow: hidden;
  }
  .stepper-step-btn {
    width: 44px;
    height: 48px;
    display: grid;
    place-items: center;
    color: var(--secondary-text-color);
    background: transparent;
    border: 0;
  }
  .stepper-step-btn:hover {
    background: var(--dashboard-card-muted-surface);
    color: var(--primary-text-color);
  }
  .stepper-display {
    min-width: 0;
    padding: 0 8px;
    text-align: center;
  }
  .stepper-main-val {
    font-size: 15px;
    font-weight: 550;
    font-variant-numeric: tabular-nums;
    line-height: 1.1;
  }
  .stepper-sub-lbl {
    margin-top: 3px;
    color: var(--secondary-text-color);
    font-size: 11.5px;
    line-height: 1.1;
  }
  .slider-track {
    width: 100%;
    height: 6px;
    border-radius: var(--dashboard-radius-control);
    background: var(--divider-color);
    overflow: hidden;
  }
  .slider-fill {
    height: 100%;
    background: var(--primary-color);
    border-radius: inherit;
  }
`;

/**
 * 8. Dividers & Separators (Section 8 in Design Catalogue)
 */
export const separatorStyles = css`
  .card-divider-line {
    height: 1px;
    background: var(--divider-color);
  }
  .labeled-separator {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 6px 0;
  }
  .labeled-separator-title {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11.5px;
    font-weight: 650;
    color: var(--secondary-text-color);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .labeled-separator-line {
    flex: 1;
    height: 1px;
    background: var(--divider-color);
  }
`;

/**
 * 9. Badges & Progress Indicators (Section 9 in Design Catalogue)
 */
export const badgeProgressStyles = css`
  .capsule-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 3px 8px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 650;
    background: var(--dashboard-card-muted-surface);
    color: var(--secondary-text-color);
    border: var(--dashboard-card-border);
  }
  .capsule-badge.active {
    background: var(--dashboard-active-surface);
    color: var(--primary-color);
    border-color: var(--primary-color);
  }
  .capsule-badge.live {
    background: var(--dashboard-active-surface);
    color: var(--primary-color);
  }
  .capsule-badge.live:before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--primary-color);
  }
  .determinate-progress {
    width: 100%;
    height: 5px;
    border-radius: 999px;
    background: var(--divider-color);
    overflow: hidden;
  }
  .determinate-fill {
    height: 100%;
    background: var(--primary-color);
    border-radius: inherit;
  }
  .indeterminate-progress {
    width: 100%;
    height: 3px;
    position: relative;
    background: var(--divider-color);
    overflow: hidden;
  }
  .indeterminate-progress:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 35%;
    background: var(--primary-color);
    animation: indeterminateSlide 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
  @keyframes indeterminateSlide {
    0% {
      left: -35%;
    }
    100% {
      left: 100%;
    }
  }
`;

/**
 * 10. Feedback, Notices & Empty States (Section 10 in Design Catalogue)
 */
export const feedbackStyles = css`
  .notice-box {
    padding: 12px 14px;
    border-radius: var(--dashboard-radius-control);
    display: grid;
    grid-template-columns: 20px minmax(0, 1fr);
    gap: 10px;
    align-items: flex-start;
    font-size: 12.5px;
    line-height: 1.35;
  }
  .notice-box.info {
    background: var(--dashboard-card-muted-surface);
    border: var(--dashboard-card-border);
    color: var(--primary-text-color);
  }
  .notice-box.warning {
    background: var(--dashboard-warning-surface);
    border: 1px solid var(--warning-color);
    color: var(--warning-color);
  }
  .notice-box.critical {
    background: var(--dashboard-critical-surface);
    border: 1px solid var(--error-color);
    color: var(--error-color);
  }
  .notice-box.success {
    background: color-mix(
      in srgb,
      var(--success-color) 10%,
      var(--card-background-color)
    );
    border: 1px solid var(--success-color);
    color: var(--success-color);
  }
  .feedback-line {
    font-size: 12px;
    font-weight: 500;
    color: var(--secondary-text-color);
    min-height: 18px;
  }
  .feedback-line.err {
    color: var(--error-color);
  }
  .empty-state-dashed {
    border: 1px dashed var(--catalogue-border, var(--dashboard-card-border-color));
    border-radius: var(--dashboard-radius-card);
    padding: 24px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 8px;
    color: var(--secondary-text-color);
  }
  .empty-state-dashed .icon-svg,
  .empty-state-dashed ha-icon {
    color: var(--disabled-text-color);
    --mdc-icon-size: 32px;
  }
  .empty-state-dashed .empty-title {
    font-size: 13.5px;
    font-weight: 650;
    color: var(--primary-text-color);
  }
  .empty-state-dashed .empty-desc {
    font-size: 12px;
    max-width: 260px;
  }
`;

/**
 * 11. Rows & Lists (Section 11 in Design Catalogue)
 */
export const rowListStyles = css`
  .header-row {
    display: grid;
    grid-template-columns: 40px minmax(0, 1fr) auto;
    align-items: center;
    gap: 12px;
    min-height: 44px;
  }
  .copy-block {
    min-width: 0;
  }
  .control-item-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 0;
  }
  .control-item-row + .control-item-row {
    border-top: 1px solid var(--divider-color);
  }
  .ranking-item-row {
    display: grid;
    grid-template-columns: 28px minmax(0, 1fr) auto;
    align-items: center;
    gap: 10px;
    padding: 8px 0;
    font-size: 13px;
  }
  .ranking-item-row + .ranking-item-row {
    border-top: 1px solid var(--divider-color);
  }
  .ranking-badge {
    font-weight: 700;
    color: var(--secondary-text-color);
  }
  .ranking-val {
    font-weight: 650;
    font-variant-numeric: tabular-nums;
  }
  .update-item-row {
    display: grid;
    grid-template-columns: 40px minmax(0, 1fr) auto;
    align-items: center;
    gap: 12px;
    padding: 10px 0;
  }
  .version-tag {
    font-size: 11px;
    font-family: monospace;
    color: var(--secondary-text-color);
  }
`;

/**
 * 12. Date Steppers & Charts (Section 12 in Design Catalogue)
 */
export const telemetryStyles = css`
  .date-stepper-cluster {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  .chart-svg-frame {
    width: 100%;
    height: 120px;
  }
`;

/**
 * 13. Remotes & Directional Controls (Section 13 in Design Catalogue)
 */
export const remoteStyles = css`
  .dpad-cluster {
    width: 220px;
    height: 220px;
    padding: 10px;
    border: var(--dashboard-card-border);
    border-radius: var(--dashboard-radius-card);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 6px;
    background: var(--dashboard-card-muted-surface);
    margin: 0 auto;
  }
  .dpad-btn {
    border-radius: var(--dashboard-radius-control);
    border: var(--dashboard-card-border);
    display: grid;
    place-items: center;
    color: var(--secondary-text-color);
    background: var(--dashboard-card-surface);
  }
  .dpad-btn:hover {
    color: var(--primary-text-color);
    background: var(--dashboard-card-muted-surface);
  }
  .dpad-btn.select-center {
    background: var(--dashboard-active-surface);
    color: var(--primary-color);
  }
`;

/**
 * 14. Modals & Dialog Overlays (Section 14 in Design Catalogue)
 */
export const dialogStyles = css`
  .dialog-shell-box {
    border: var(--dashboard-card-border);
    border-radius: var(--dashboard-radius-dialog);
    background: var(--card-background-color);
    box-shadow: var(--dashboard-dialog-shadow);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .dialog-head {
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--divider-color);
    font-size: 15px;
    font-weight: 650;
  }
  .dialog-body {
    padding: 16px;
    font-size: 13px;
    color: var(--secondary-text-color);
  }
  .dialog-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding: 12px 16px;
    border-top: 1px solid var(--divider-color);
  }
`;

/**
 * 15. Assembled Component Recipes (Section 15 in Design Catalogue)
 */
export const assemblyStyles = css`
  .assembled-card {
    border: var(--dashboard-card-border);
    border-radius: var(--dashboard-radius-card);
    background: var(--dashboard-card-surface);
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

// Backward-compatible alias exports
export const headerStyles = css`
  .head {
    min-height: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    margin-bottom: 3px;
    padding: 0 2px;
  }
  .heading {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
  }
  .heading ha-icon {
    color: var(--secondary-text-color);
    --mdc-icon-size: 15px;
  }
  .heading h2 {
    margin: 0;
    font-size: 13.5px;
    line-height: 1.2;
    font-weight: 500;
  }
  .head.sep {
    min-height: 26px;
    margin: 2px 0 4px;
  }
  .head.sep .heading {
    flex: 1;
  }
  .head.sep .heading h2 {
    font-size: 11.5px;
    font-weight: 500;
    color: var(--secondary-text-color);
  }
  .head.sep .heading ha-icon {
    display: none;
  }
  .head.sep .heading:after {
    content: "";
    height: 1px;
    background: var(--divider-color);
    flex: 1;
  }
  .edit {
    width: 32px;
    height: 32px;
    border-radius: var(--dashboard-radius-control);
    color: var(--secondary-text-color);
    display: grid;
    place-items: center;
  }
  .edit ha-icon {
    --mdc-icon-size: 15px;
  }
  .edit:hover,
  .edit:focus-visible {
    background: var(--dashboard-card-muted-surface);
    color: var(--primary-text-color);
  }
`;

export const rowStyles = css`
  .row {
    width: 100%;
    text-align: left;
  }
  .wrap {
    min-height: 44px;
    padding: 8px 11px;
    display: grid;
    grid-template-columns: 28px minmax(0, 1fr) auto;
    align-items: center;
    gap: 8px;
  }
  .identity {
    min-width: 0;
    min-height: 32px;
    padding: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    text-align: left;
  }
  .copy {
    min-width: 0;
  }
  .name,
  .title {
    display: block;
    font-size: 12px;
    line-height: 1.2;
    font-weight: 500;
    color: var(--primary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .state,
  .desc,
  .status {
    display: block;
    margin-top: 2px;
    font-size: 10.5px;
    line-height: 1.2;
    font-weight: 400;
    color: var(--secondary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const iconBoxStyles = css`
  .icon,
  .ico,
  .iw,
  .well {
    width: 28px;
    height: 28px;
    display: grid;
    place-items: center;
    border-radius: var(--dashboard-radius-icon);
    background: transparent;
    color: var(--primary-color);
    flex-shrink: 0;
  }
  .icon ha-icon,
  .ico ha-icon,
  .iw ha-icon,
  .well ha-icon,
  ha-icon {
    --mdc-icon-size: 17px;
  }
`;
