import { css, CSSResultGroup } from "lit";
import { cardBaseStyles } from "../../styles";

export const homeOverviewCardStyles: CSSResultGroup = [
  cardBaseStyles,
  css`
    ha-card {
      border: 0;
      box-shadow: none;
      background: transparent;
      overflow: visible;
    }
    .top {
      min-height: var(--c-head-min-height);
      padding: 0 2px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--c-space-3);
    }
    .time {
      min-width: 0;
      white-space: nowrap;
      color: var(--secondary-text-color);
      font-size: var(--c-font-base);
      line-height: var(--c-line-height-normal);
      font-weight: var(--c-font-weight-normal);
    }
    .weather {
      min-height: var(--c-head-min-height);
      color: var(--secondary-text-color);
      font-size: var(--c-font-base);
      line-height: var(--c-line-height-normal);
      font-weight: var(--c-font-weight-normal);
      white-space: nowrap;
      text-align: right;
    }
    .weather:hover {
      text-decoration: underline;
    }
    .sections {
      margin-top: var(--c-space-2);
      display: grid;
      gap: var(--c-space-4);
    }
  `,
];
