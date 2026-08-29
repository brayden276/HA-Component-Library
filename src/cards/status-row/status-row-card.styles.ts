import { css, CSSResultGroup } from "lit";
import {
  cardBaseStyles,
  iconWellStyles,
  rowListStyles,
  surfaceStyles,
  typographyStyles,
} from "../../styles";

export const statusRowCardStyles: CSSResultGroup = [
  cardBaseStyles,
  typographyStyles,
  iconWellStyles,
  rowListStyles,
  surfaceStyles,
  css`
    .demo {
      width: 100%;
      text-align: left;
    }
    .title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--primary-text-color);
    }
    .desc {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .status {
      text-align: right;
      white-space: nowrap;
    }
    .status b {
      display: block;
    }
    .status span {
      display: block;
      margin-top: 2px;
      font-size: 11.5px;
      color: var(--secondary-text-color);
    }
    .demo-static {
      width: 100%;
      border: 0;
      background: transparent;
      text-align: inherit;
      padding: 0;
    }
  `,
];
