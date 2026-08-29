import { css, CSSResultGroup } from "lit";
import {
  cardBaseStyles,
  surfaceStyles,
  typographyStyles,
  iconWellStyles,
  rowListStyles,
} from "../../styles";

export const metricBadgeCardStyles: CSSResultGroup = [
  cardBaseStyles,
  surfaceStyles,
  typographyStyles,
  iconWellStyles,
  rowListStyles,
  css`
    .metric-badge-card {
      cursor: pointer;
    }

    .icon-well {
      color: var(--badge-accent-color, var(--primary-color));
    }

    .metric-value-line {
      display: flex;
      align-items: baseline;
      gap: 4px;
    }

    .unit-text {
      font-size: 13px;
      font-weight: 600;
      color: var(--secondary-text-color);
    }

    .metric-badge-card.unavailable {
      opacity: 0.55;
    }

    .metric-badge-card:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
  `,
];
