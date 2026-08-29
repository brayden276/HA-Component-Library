import { css, CSSResultGroup } from "lit";
import {
  cardBaseStyles,
  iconWellStyles,
  rowListStyles,
  surfaceStyles,
  typographyStyles,
} from "../../styles";

export const navTileCardStyles: CSSResultGroup = [
  cardBaseStyles,
  typographyStyles,
  iconWellStyles,
  rowListStyles,
  surfaceStyles,
  css`
    .nav {
      width: 100%;
      text-align: left;
    }
    .nav-static {
      border: 0;
      background: transparent;
      color: inherit;
      font: inherit;
      padding: 0;
    }
  `,
];
