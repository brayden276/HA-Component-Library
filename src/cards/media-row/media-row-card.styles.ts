import { css, CSSResultGroup } from "lit";
import {
  cardBaseStyles,
  typographyStyles,
  rowListStyles,
  iconWellStyles,
  buttonStyles,
  iconButtonStyles,
} from "../../styles";

export const mediaRowCardStyles: CSSResultGroup = [
  cardBaseStyles,
  typographyStyles,
  rowListStyles,
  iconWellStyles,
  buttonStyles,
  iconButtonStyles,
  css`
    .buttons {
      display: flex;
      gap: 6px;
      align-items: center;
    }
    .btn {
      position: relative;
      width: 36px;
      height: 36px;
      border: var(--dashboard-card-border) !important;
      border-radius: var(--dashboard-radius-control) !important;
      background: var(--dashboard-card-muted-surface) !important;
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
      padding: 0 !important;
      cursor: pointer;
    }
    .btn:hover {
      background: var(--dashboard-active-surface) !important;
    }
    .btn.main {
      color: var(--primary-color);
    }
    .btn ha-icon {
      position: relative;
      --mdc-icon-size: 18px;
    }
  `,
];
