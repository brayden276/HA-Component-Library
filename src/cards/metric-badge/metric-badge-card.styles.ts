import { css, CSSResultGroup } from "lit";
import { commonCardStyles } from "../../utils/styles";

export const metricBadgeCardStyles: CSSResultGroup = [
  commonCardStyles,
  css`
    .metric-badge-card {
      border-left: 4px solid var(--badge-accent-color);
    }

    .metric-body {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      gap: 12px;
    }

    .icon-bubble {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: var(
        --secondary-background-color,
        rgba(128, 128, 128, 0.1)
      );
      color: var(--badge-accent-color);
    }

    .metric-data {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .metric-value-line {
      display: flex;
      align-items: baseline;
      gap: 3px;
    }

    .value-text {
      font-size: 1.25rem;
      font-weight: 700;
      line-height: 1.1;
      color: var(--primary-text-color, #212121);
    }

    .unit-text {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--secondary-text-color, #757575);
    }

    .metric-label {
      font-size: 0.8rem;
      color: var(--secondary-text-color, #757575);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .metric-badge-card.unavailable {
      opacity: 0.55;
    }

    .metric-badge-card:focus-visible {
      outline: 2px solid var(--primary-color, #03a9f4);
      outline-offset: 2px;
    }
  `,
];

