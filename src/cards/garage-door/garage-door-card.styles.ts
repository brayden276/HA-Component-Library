import { css, CSSResultGroup } from "lit";
import {
  cardBaseStyles,
  surfaceStyles,
  typographyStyles,
  buttonStyles,
  iconWellStyles,
  dialogStyles,
} from "../../styles";

export const garageDoorCardStyles: CSSResultGroup = [
  cardBaseStyles,
  surfaceStyles,
  typographyStyles,
  buttonStyles,
  iconWellStyles,
  dialogStyles,
  css`
    ha-card {
      container-type: inline-size;
    }
    .w {
      padding: 12px 14px;
      border-left: 3px solid transparent;
    }
    .w.warning-surface,
    .w:has(.well.not-closed) {
      border-left-color: var(--warning-color);
      background: var(--dashboard-warning-surface);
    }
    .row {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 12px;
      align-items: center;
    }
    .identity {
      min-width: 0;
      min-height: 44px;
      padding: 0;
      display: grid;
      grid-template-columns: 40px minmax(0, 1fr);
      gap: 12px;
      align-items: center;
      text-align: left;
      border-radius: var(--dashboard-radius-control);
    }
    .well {
      width: 40px;
      height: 40px;
      border-radius: var(--dashboard-radius-icon);
      display: grid;
      place-items: center;
      background: transparent;
      color: var(--secondary-text-color);
      flex-shrink: 0;
    }
    .well.not-closed {
      color: var(--warning-color);
    }
    ha-icon {
      --mdc-icon-size: 20px;
    }
    .copy {
      min-width: 0;
    }
    .name,
    .state {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .name {
      font-size: 13px;
      line-height: 1.25;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .state {
      margin-top: 3px;
      font-size: 12px;
      line-height: 1.25;
      color: var(--secondary-text-color);
    }
    .action {
      min-width: 104px;
      min-height: 44px;
      padding: 0 16px;
      border-radius: var(--dashboard-radius-control);
      font-size: 13px;
      font-weight: 650;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      background: var(--primary-color);
      color: var(--text-primary-color);
      cursor: pointer;
    }
    .action:active {
      transform: scale(0.98);
    }
    .action.secondary {
      background: transparent;
      border: var(--dashboard-card-border);
      color: var(--primary-color);
    }
    .action.secondary:hover {
      background: var(--dashboard-card-muted-surface);
    }
    .dialog-overlay {
      position: fixed;
      inset: 0;
      z-index: 1000;
      display: grid;
      place-items: center;
      padding: 16px;
      background: var(--dashboard-modal-scrim);
    }
    .dialog-box {
      width: min(380px, calc(100vw - 32px));
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
      color: var(--warning-color);
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
  `,
];
