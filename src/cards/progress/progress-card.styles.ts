import { css, CSSResultGroup } from "lit";
import {
  cardBaseStyles,
  typographyStyles,
  badgeProgressStyles,
  assemblyStyles,
} from "../../styles";

export const progressCardStyles: CSSResultGroup = [
  cardBaseStyles,
  typographyStyles,
  badgeProgressStyles,
  assemblyStyles,
  css`
    .progress-head {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 10px;
    }
    .target {
      text-align: right;
      white-space: nowrap;
    }
    .target b {
      font-weight: 650;
      color: var(--primary-text-color);
      font-variant-numeric: tabular-nums;
    }
    .determinate-progress {
      margin-top: 8px;
    }
    .progress-card.actionable {
      cursor: pointer;
    }
    .progress-card.actionable:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
      border-radius: var(--dashboard-radius-control);
    }
  `,
];
