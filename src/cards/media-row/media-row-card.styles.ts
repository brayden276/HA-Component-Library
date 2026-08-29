import { css, CSSResultGroup } from "lit";
import {
  cardBaseStyles,
  typographyStyles,
  rowListStyles,
  iconWellStyles,
  buttonStyles,
  iconButtonStyles,
  surfaceStyles,
} from "../../styles";

export const mediaRowCardStyles: CSSResultGroup = [
  cardBaseStyles,
  typographyStyles,
  rowListStyles,
  iconWellStyles,
  buttonStyles,
  iconButtonStyles,
  surfaceStyles,
  css`
    .media-row {
      grid-template-columns: 40px minmax(0, 1fr) auto;
    }
    .identity {
      min-width: 0;
      min-height: 44px;
      text-align: left;
    }
    .identity .label-title,
    .identity .label-sub {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .buttons {
      display: flex;
      gap: 6px;
      align-items: center;
    }
    .btn {
      flex: 0 0 auto;
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
