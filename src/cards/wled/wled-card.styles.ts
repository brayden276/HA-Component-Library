import { css, CSSResultGroup } from "lit";
import {
  assemblyStyles,
  buttonStyles,
  cardBaseStyles,
  controlStyles,
  dialogStyles,
  feedbackStyles,
  formControlStyles,
  iconButtonStyles,
  iconWellStyles,
  separatorStyles,
  surfaceStyles,
  typographyStyles,
} from "../../styles";

/**
 * WLED is assembled from the catalogue's card, header, action-pill, slider and
 * dialog parts. Keep layout rules here limited to composition; visual
 * primitives remain the shared catalogue styles above.
 */
export const wledCardStyles: CSSResultGroup = [
  cardBaseStyles,
  surfaceStyles,
  typographyStyles,
  buttonStyles,
  iconButtonStyles,
  iconWellStyles,
  formControlStyles,
  controlStyles,
  separatorStyles,
  dialogStyles,
  feedbackStyles,
  assemblyStyles,
  css`
    .wled-card {
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .wled-toolbar {
      display: grid;
      grid-template-columns: 40px minmax(0, 1fr) 44px;
      align-items: center;
      gap: 12px;
    }

    .identity {
      min-width: 0;
      min-height: 44px;
      padding: 0;
      display: block;
      text-align: left;
    }

    .identity .label-title,
    .identity .label-sub {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .power.on {
      color: var(--primary-color);
      background: var(--dashboard-active-surface);
      --action-glow-color: var(--error-color, #f44336);
    }

    .power:not(.on) {
      --action-glow-color: var(--success-color, #4caf50);
    }

    .preset-btn {
      --action-glow-color: var(--warning-color, #ff9800);
    }

    .preset-btn:active:not(:disabled) {
      border-color: var(--action-glow-color) !important;
      box-shadow:
        0 0 0 1px var(--action-glow-color),
        0 0 12px 2.5px
          color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
      transform: scale(0.97);
    }

    .brightness-control {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 8px 12px;
      align-items: center;
    }

    .brightness-control input,
    .fine-card input {
      width: 100%;
      height: 6px;
      accent-color: var(--primary-color);
      cursor: pointer;
    }

    .brightness-control input {
      grid-column: 1 / -1;
    }

    .brightness-value {
      margin: 0;
      color: var(--secondary-text-color);
      font-size: 12px;
      font-variant-numeric: tabular-nums;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .actions .action {
      flex: 1 1 110px;
    }

    .section + .section,
    .native {
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid var(--divider-color);
    }

    .section-title {
      margin-bottom: 8px;
      color: var(--secondary-text-color);
      font-size: 11.5px;
      font-weight: 650;
      letter-spacing: 0.04em;
      line-height: 1.25;
      text-transform: uppercase;
    }

    .preset-grid,
    .fields,
    .fine {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }

    .preset-btn {
      width: 100%;
      flex: initial;
    }

    .preset-btn.active {
      color: var(--primary-color);
      background: var(--dashboard-active-surface);
    }

    .field {
      display: grid;
      gap: 6px;
      min-width: 0;
      color: var(--secondary-text-color);
      font-size: 12.5px;
    }

    .field select {
      min-width: 0;
    }

    .fine-card {
      min-width: 0;
      padding: 12px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: var(--dashboard-card-muted-surface);
      color: var(--primary-text-color);
    }

    .fine-head {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 10px;
      font-size: 12.5px;
      font-weight: 600;
    }

    .fine-head output {
      color: var(--secondary-text-color);
      font-variant-numeric: tabular-nums;
    }

    .native .action {
      width: 100%;
      justify-content: flex-start;
      padding: 0 12px;
    }

    dialog {
      width: min(440px, calc(100vw - 32px));
    }

    dialog .close {
      border: var(--dashboard-card-border);
    }

    @container (max-width: 360px) {
      .preset-grid,
      .fields,
      .fine {
        grid-template-columns: 1fr;
      }
    }
  `,
];
