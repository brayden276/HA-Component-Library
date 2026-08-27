import { css, CSSResultGroup } from "lit";
import {
  cardBaseStyles,
  rowStyles,
  iconBoxStyles,
  buttonStyles,
} from "../../styles";

export const mediaRowCardStyles: CSSResultGroup = [
  cardBaseStyles,
  rowStyles,
  iconBoxStyles,
  buttonStyles,
  css`
    .buttons {
      display: flex;
      gap: var(--c-space-1);
    }
    .btn {
      position: relative;
      width: 36px;
      height: 36px;
      border: 0 !important;
      border-radius: var(--c-radius-control) !important;
      background: transparent !important;
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
      padding: 0 !important;
    }
    .btn:before {
      content: "";
      position: absolute;
      width: 26px;
      height: 26px;
      border: 1px solid var(--c-card-border-color);
      border-radius: var(--c-radius-control);
    }
    .btn.main {
      color: var(--primary-color);
    }
    .btn ha-icon {
      position: relative;
      --mdc-icon-size: var(--c-icon-sm-size);
    }
  `,
];
