import { css, CSSResultGroup } from "lit";
import {
  assemblyStyles,
  buttonStyles,
  cardBaseStyles,
  controlStyles,
  dialogStyles,
  iconButtonStyles,
  iconWellStyles,
  separatorStyles,
  surfaceStyles,
  typographyStyles,
} from "../../styles";

/**
 * The Split controller follows the literal Split Climate Card recipe from the
 * component catalogue: a 14px composed card, 44px toolbar controls, the
 * catalogue divider/stepper, and 44px action pills.
 */
export const splitAcCardStyles: CSSResultGroup = [
  cardBaseStyles,
  surfaceStyles,
  typographyStyles,
  buttonStyles,
  iconButtonStyles,
  iconWellStyles,
  controlStyles,
  separatorStyles,
  dialogStyles,
  assemblyStyles,
  css`
    ha-card {
      container-type: inline-size;
    }

    .split-card {
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .split-toolbar {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 44px 44px 44px;
      gap: 8px;
      align-items: center;
    }

    .split-identity {
      min-width: 0;
      min-height: 44px;
      padding: 0;
      display: grid;
      grid-template-columns: 40px minmax(0, 1fr);
      align-items: center;
      gap: 10px;
      text-align: left;
    }

    .split-identity .label-title,
    .split-identity .label-sub {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .split-climate-row {
      display: grid;
      grid-template-columns: minmax(120px, 1fr) auto;
      align-items: center;
      gap: 16px;
    }

    .room-temperature {
      display: block;
      margin-top: 4px;
    }

    .split-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .action-label {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* The Split secondary panels pre-date the native-dialog component, but
     * intentionally use the same catalogue dialog shell, head and body parts.
     */
    .pn {
      position: fixed;
      inset: 0;
      z-index: 1000;
      display: grid;
      place-items: center;
      padding: 16px;
      background: var(--dashboard-modal-scrim);
    }

    .pd {
      width: min(440px, calc(100vw - 32px));
      max-height: calc(100dvh - 32px);
      overflow: auto;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-dialog);
      background: var(--card-background-color);
      box-shadow: var(--dashboard-dialog-shadow);
      color: var(--primary-text-color);
    }

    .ph {
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      border-bottom: 1px solid var(--divider-color);
      font-size: 15px;
      font-weight: 650;
    }

    .pt {
      margin: 0;
      font: inherit;
    }

    .x {
      width: 32px;
      height: 32px;
      display: grid;
      place-items: center;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      color: var(--secondary-text-color);
    }

    .x:hover {
      background: var(--dashboard-card-muted-surface);
      color: var(--primary-text-color);
    }

    .pb {
      padding: 16px;
      color: var(--secondary-text-color);
      font-size: 13px;
    }

    .og + .og {
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid var(--divider-color);
    }

    .gt {
      margin: 0 4px 8px;
      color: var(--secondary-text-color);
      font-size: 11.5px;
      font-weight: 650;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .qs {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }

    .o {
      min-height: 48px;
      width: 100%;
      padding: 0 12px;
      display: grid;
      grid-template-columns: 20px minmax(0, 1fr) 20px;
      align-items: center;
      gap: 8px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: transparent;
      color: var(--primary-text-color);
      font-size: 13px;
      font-weight: 600;
      text-align: left;
      --action-glow-color: var(--primary-color, #03a9f4);
      transition:
        transform 0.15s ease,
        border-color 0.4s ease,
        box-shadow 0.75s cubic-bezier(0.16, 1, 0.3, 1),
        background-color 0.25s ease,
        color 0.2s ease;
    }

    .o:hover {
      background: var(--dashboard-card-muted-surface);
    }

    .o:active {
      border-color: var(--action-glow-color) !important;
      box-shadow:
        0 0 0 1px var(--action-glow-color),
        0 0 12px 2.5px
          color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
      transform: scale(0.97);
    }

    .o[aria-selected="true"] {
      border-color: var(--primary-color);
      background: var(--dashboard-active-surface);
      color: var(--primary-color);
    }

    .oi {
      color: currentColor;
    }

    .tpr,
    .tac {
      display: grid;
      gap: 8px;
    }

    .tpr {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .tac {
      grid-template-columns: 1fr;
      margin-top: 12px;
    }

    .tpr button,
    .tac button {
      min-height: 44px;
      padding: 0 12px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: transparent;
      color: var(--primary-color);
      font-size: 13px;
      font-weight: 650;
      --action-glow-color: var(--primary-color, #03a9f4);
      transition:
        transform 0.15s ease,
        border-color 0.4s ease,
        box-shadow 0.75s cubic-bezier(0.16, 1, 0.3, 1),
        background-color 0.25s ease,
        color 0.2s ease;
    }

    .tpr button {
      --action-glow-color: var(--warning-color, #ff9800);
    }

    .tpr button:hover,
    .tac button:hover {
      background: var(--dashboard-card-muted-surface);
    }

    .tpr button:active,
    .tac button:active {
      border-color: var(--action-glow-color) !important;
      box-shadow:
        0 0 0 1px var(--action-glow-color),
        0 0 12px 2.5px
          color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
      transform: scale(0.97);
    }

    .tac button {
      color: var(--error-color);
      --action-glow-color: var(--error-color, #f44336);
    }

    .fb {
      margin: 0 0 12px;
      color: var(--secondary-text-color);
      font-size: 12px;
      line-height: 1.35;
    }

    @container (max-width: 400px) {
      .split-actions .btn-action-pill {
        flex-basis: calc(50% - 4px);
      }
    }

    @container (max-width: 340px) {
      .split-toolbar {
        grid-template-columns: repeat(3, 44px);
        justify-content: end;
      }

      .split-identity {
        grid-column: 1 / -1;
      }

      .split-climate-row {
        grid-template-columns: 1fr;
      }

      .stepper-control {
        width: 100%;
      }
    }
  `,
];
