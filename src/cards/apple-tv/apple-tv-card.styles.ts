import { css, CSSResultGroup } from "lit";
import {
  cardBaseStyles,
  surfaceStyles,
  typographyStyles,
  buttonStyles,
  iconButtonStyles,
  iconWellStyles,
  remoteStyles,
  dialogStyles,
  assemblyStyles,
} from "../../styles";

export const appleTvCardStyles: CSSResultGroup = [
  cardBaseStyles,
  surfaceStyles,
  typographyStyles,
  buttonStyles,
  iconButtonStyles,
  iconWellStyles,
  remoteStyles,
  dialogStyles,
  assemblyStyles,
  css`
    .wrap {
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .identity {
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
    .ico.on {
      color: var(--primary-color);
    }
    .name,
    .status {
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
    .status {
      margin-top: 3px;
      font-size: 12px;
      line-height: 1.25;
      color: var(--secondary-text-color);
    }
    .header-actions {
      display: flex;
      gap: 6px;
      align-items: center;
    }
    .launchers {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
    }
    .launcher {
      min-height: 56px;
      padding: 0 12px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 8px;
      text-align: left;
      background: var(--dashboard-card-surface);
      color: var(--primary-text-color);
      cursor: pointer;
    }
    .launcher:hover {
      background: var(--dashboard-card-muted-surface);
    }
    .launcher ha-icon {
      --mdc-icon-size: 18px;
    }
    .launch-icon {
      width: 34px;
      height: 34px;
      border-radius: var(--dashboard-radius-control);
      background: var(--secondary-background-color);
      display: grid;
      place-items: center;
      color: var(--primary-color);
      flex-shrink: 0;
    }
    .launch-copy {
      min-width: 0;
    }
    .launch-title {
      display: block;
      font-size: 13px;
      font-weight: 600;
      line-height: 1.2;
      color: var(--primary-text-color);
    }
    .launch-sub {
      display: block;
      margin-top: 1px;
      font-size: 11.5px;
      color: var(--secondary-text-color);
    }
    .transport {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 4px 0;
    }
    .transport button {
      width: 44px;
      height: 44px;
      border: var(--dashboard-card-border);
      border-radius: 50%;
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
      background: var(--dashboard-card-muted-surface);
      cursor: pointer;
    }
    .transport button:hover {
      background: var(--dashboard-card-surface);
      color: var(--primary-text-color);
    }
    .transport button.main {
      color: var(--primary-color);
      border-color: var(--primary-color);
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
    .dialog-content {
      width: min(380px, calc(100vw - 32px));
      max-height: calc(100dvh - 32px);
      overflow: auto;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-dialog);
      background: var(--card-background-color);
      box-shadow: var(--dashboard-dialog-shadow);
      display: flex;
      flex-direction: column;
    }
    .dialog-header {
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
    .app-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
    .app-btn {
      min-height: 48px;
      padding: 0 12px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      display: grid;
      grid-template-columns: 20px minmax(0, 1fr);
      align-items: center;
      gap: 8px;
      text-align: left;
      font-size: 13px;
      font-weight: 600;
      color: var(--primary-text-color);
      background: transparent;
      cursor: pointer;
    }
    .app-btn:hover {
      background: var(--dashboard-card-muted-surface);
    }
    .app-btn.active {
      color: var(--primary-color);
      border-color: var(--primary-color);
      background: var(--dashboard-active-surface);
    }
  `,
];
