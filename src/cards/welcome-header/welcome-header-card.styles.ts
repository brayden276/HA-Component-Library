import { css, CSSResultGroup } from "lit";
import {
  buttonStyles,
  cardBaseStyles,
  rowListStyles,
  surfaceStyles,
  typographyStyles,
} from "../../styles";

export const welcomeHeaderCardStyles: CSSResultGroup = [
  cardBaseStyles,
  typographyStyles,
  buttonStyles,
  rowListStyles,
  surfaceStyles,
  css`
    .time {
      min-width: 0;
      white-space: nowrap;
    }
    .weather {
      white-space: nowrap;
      text-align: right;
    }
  `,
];
