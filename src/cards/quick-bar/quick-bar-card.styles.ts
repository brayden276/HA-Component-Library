import { css, CSSResultGroup } from "lit";
import {
  cardBaseStyles,
  typographyStyles,
  badgeProgressStyles,
  buttonStyles,
  assemblyStyles,
} from "../../styles";

export const quickBarCardStyles: CSSResultGroup = [
  cardBaseStyles,
  typographyStyles,
  badgeProgressStyles,
  buttonStyles,
  assemblyStyles,
  css`
    .quick-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .quick-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .quick-item {
      text-overflow: ellipsis;
      overflow: hidden;
    }
  `,
];
