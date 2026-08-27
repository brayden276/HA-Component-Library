import { css, CSSResultGroup } from "lit";
import {
  cardBaseStyles,
  headerStyles,
  rowStyles,
  iconBoxStyles,
  buttonStyles,
  sheetStyles,
} from "../../styles";

export const roomDirectoryCardStyles: CSSResultGroup = [
  cardBaseStyles,
  headerStyles,
  rowStyles,
  iconBoxStyles,
  buttonStyles,
  sheetStyles,
  css`
    ha-card {
      border: 0;
      box-shadow: none;
      background: transparent;
      overflow: visible;
    }
    .open-view {
      display: flex;
      align-items: center;
      gap: var(--c-space-2);
      min-height: var(--c-head-min-height);
    }
    .open-view ha-icon {
      color: var(--secondary-text-color);
      --mdc-icon-size: var(--c-icon-sm-size);
    }
    .open-view h2 {
      margin: 0;
      font-size: var(--c-font-lg);
      line-height: var(--c-line-height-normal);
      font-weight: var(--c-font-weight-medium);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: var(--c-grid-gap);
    }
    .room {
      min-width: 0;
      min-height: var(--c-row-min-height);
      padding: 0 var(--c-space-4) 0 var(--c-space-3);
      border: var(--c-card-border);
      border-radius: var(--c-radius-card);
      background: var(--c-card-surface);
      text-align: left;
      display: grid;
      grid-template-columns: var(--c-icon-box-size) minmax(0, 1fr);
      align-items: center;
      gap: var(--c-space-3);
      cursor: pointer;
    }
    .room:active {
      background: var(--c-muted-surface);
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
    .summary {
      font-weight: var(--c-font-weight-normal);
    }
    .close {
      margin-left: auto;
    }
  `,
];
