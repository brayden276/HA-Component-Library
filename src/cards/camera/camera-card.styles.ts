import { css, CSSResultGroup } from "lit";
import {
  cardBaseStyles,
  typographyStyles,
  buttonStyles,
  iconButtonStyles,
  iconWellStyles,
  dialogStyles,
} from "../../styles";

export const cameraCardStyles: CSSResultGroup = [
  cardBaseStyles,
  typographyStyles,
  buttonStyles,
  iconButtonStyles,
  iconWellStyles,
  dialogStyles,
  css`
    ha-card {
      display: block;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-card);
      background: var(--dashboard-card-surface);
      box-shadow: none;
      color: var(--primary-text-color);
      overflow: hidden;
    }
    .row {
      min-height: 44px;
      padding: 10px 14px;
      display: grid;
      grid-template-columns: 40px minmax(0, 1fr) auto;
      align-items: center;
      gap: 12px;
    }
    .ico {
      width: 40px;
      height: 40px;
      border-radius: var(--dashboard-radius-control);
      background: var(--secondary-background-color);
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
      flex-shrink: 0;
    }
    .ico ha-icon {
      --mdc-icon-size: 20px;
    }
    .activity .ico {
      color: var(--primary-color);
    }
    .offline .ico {
      color: var(--disabled-text-color);
    }
    .identity {
      appearance: none;
      border: 0;
      background: transparent;
      padding: 0;
      min-width: 0;
      text-align: left;
      cursor: pointer;
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
      font-weight: 600;
      line-height: 1.25;
      color: var(--primary-text-color);
    }
    .state {
      margin-top: 3px;
      font-size: 12px;
      color: var(--secondary-text-color);
      line-height: 1.25;
    }
    .actions {
      display: flex;
      gap: 6px;
    }
    .action,
    .close,
    .switchbtn,
    .maint {
      appearance: none;
      border: var(--dashboard-card-border);
      background: var(--dashboard-card-muted-surface);
      border-radius: var(--dashboard-radius-control);
      cursor: pointer;
    }
    .action {
      min-height: 32px;
      padding: 0 10px;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 11.5px;
      font-weight: 650;
      color: var(--primary-color);
    }
    .action:hover {
      background: var(--dashboard-active-surface);
    }
    .action ha-icon {
      --mdc-icon-size: 16px;
    }
    .action.active {
      color: var(--primary-color);
      background: var(--dashboard-active-surface);
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
      width: min(640px, calc(100vw - 32px));
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
  `,
];
