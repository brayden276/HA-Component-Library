import { css, CSSResultGroup } from "lit";
import { dashboardBaseCardStyles } from "../../utils/styles";

export const roomDirectoryCardStyles: CSSResultGroup = [
  dashboardBaseCardStyles,
  css`
    :host {
      display: block;
      min-width: 0;
    }
    * {
      box-sizing: border-box;
    }
    ha-card {
      display: block;
      border: 0;
      box-shadow: none;
      background: transparent;
      overflow: visible;
      color: var(--primary-text-color);
    }
    button {
      font: inherit;
      color: inherit;
    }
    .head {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 6px;
      padding: 0 2px;
    }
    .open-view {
      appearance: none;
      border: 0;
      background: transparent;
      display: flex;
      align-items: center;
      gap: 7px;
      min-height: 44px;
      padding: 0;
      cursor: pointer;
    }
    .open-view ha-icon {
      color: var(--secondary-text-color);
      --mdc-icon-size: 17px;
    }
    .open-view h2 {
      margin: 0;
      font-size: 15px;
      line-height: 1.2;
      font-weight: 500;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
    .room {
      appearance: none;
      min-width: 0;
      min-height: 56px;
      padding: 0 12px 0 10px;
      border: var(--dashboard-card-border, 1px solid var(--divider-color));
      border-radius: var(--dashboard-radius-card, 8px);
      background: var(--dashboard-card-surface, var(--card-background-color));
      text-align: left;
      display: grid;
      grid-template-columns: 34px minmax(0, 1fr);
      align-items: center;
      gap: 9px;
      cursor: pointer;
    }
    .room:active {
      background: var(
        --dashboard-card-muted-surface,
        var(--secondary-background-color)
      );
    }
    .room:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }
    .ico {
      width: 34px;
      height: 34px;
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
    }
    .ico ha-icon {
      --mdc-icon-size: 19px;
    }
    .copy {
      min-width: 0;
    }
    .name,
    .summary {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .name {
      font-size: 13px;
      line-height: 1.25;
      font-weight: 500;
    }
    .summary {
      margin-top: 3px;
      font-size: 12px;
      line-height: 1.25;
      font-weight: 400;
      color: var(--secondary-text-color);
    }
    .room.active .ico {
      color: var(--primary-color);
    }
    .room.warning {
      border-left-color: var(--warning-color, #f9a825);
    }
    .room.warning .ico {
      color: var(--warning-color, #f9a825);
    }
    .room.critical {
      border-left-color: var(--error-color);
    }
    .room.critical .ico {
      color: var(--error-color);
    }
    dialog {
      width: min(720px, calc(100vw - 24px));
      height: min(760px, calc(100dvh - 32px));
      min-height: min(560px, calc(100dvh - 32px));
      margin: auto;
      padding: 0;
      border: var(--dashboard-card-border, 1px solid var(--divider-color));
      border-radius: var(--dashboard-radius-dialog, 10px);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      box-shadow: var(
        --dashboard-dialog-shadow,
        0 16px 48px rgba(0, 0, 0, 0.22)
      );
      overflow: hidden;
    }
    dialog::backdrop {
      background: var(--dashboard-modal-scrim, rgba(0, 0, 0, 0.16));
      backdrop-filter: blur(3px);
    }
    .sheet {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .sheet-head {
      flex: 0 0 auto;
      min-height: 54px;
      padding: 5px 6px 5px 14px;
      display: flex;
      align-items: center;
      gap: 8px;
      border-bottom: 1px solid var(--divider-color);
    }
    .identity {
      min-width: 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .identity ha-icon {
      color: var(--secondary-text-color);
      --mdc-icon-size: 18px;
    }
    .sheet-name {
      font-size: 14px;
      line-height: 1.2;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .close {
      appearance: none;
      width: 44px;
      height: 44px;
      padding: 0;
      border: 0;
      border-radius: var(--dashboard-radius-control, 8px);
      background: transparent;
      color: var(--secondary-text-color);
      display: grid;
      place-items: center;
      cursor: pointer;
      margin-left: auto;
    }
    .sheet-body {
      flex: 1 1 auto;
      min-height: 0;
      overflow: auto;
      padding: 10px 14px max(14px, env(safe-area-inset-bottom));
    }
    @media (max-width: 700px) {
      dialog {
        width: 100vw;
        max-width: 100vw;
        height: 92dvh;
        min-height: 92dvh;
        max-height: 92dvh;
        margin: auto 0 0;
        border-width: 1px 0 0;
        border-radius: var(--dashboard-radius-dialog, 8px)
          var(--dashboard-radius-dialog, 8px) 0 0;
      }
    }
  `,
];
