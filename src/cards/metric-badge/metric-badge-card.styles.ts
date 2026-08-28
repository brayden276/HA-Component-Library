import { css, CSSResultGroup } from "lit";
import { cardBaseStyles, typographyStyles, iconWellStyles } from "../../styles";

export const metricBadgeCardStyles: CSSResultGroup = [
  cardBaseStyles,
  typographyStyles,
  iconWellStyles,
  css`
    .metric-badge-card {
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-card);
      background: var(--dashboard-card-surface);
      border-left: 3px solid var(--badge-accent-color, var(--primary-color));
      cursor: pointer;
    }

    .metric-body {
      display: grid;
      grid-template-columns: 40px minmax(0, 1fr);
      align-items: center;
      padding: 12px 14px;
      gap: 12px;
    }

    .icon-bubble {
      width: 40px;
      height: 40px;
      border-radius: var(--dashboard-radius-control);
      background: var(--secondary-background-color);
      color: var(--badge-accent-color, var(--primary-color));
      display: grid;
      place-items: center;
      flex-shrink: 0;
    }

    .icon-bubble ha-icon {
      --mdc-icon-size: 20px;
    }

    .metric-data {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .metric-value-line {
      display: flex;
      align-items: baseline;
      gap: 4px;
    }

    .value-text {
      font-size: 20px;
      font-weight: 550;
      line-height: 1;
      letter-spacing: -0.02em;
      font-variant-numeric: tabular-nums;
      color: var(--primary-text-color);
    }

    .unit-text {
      font-size: 13px;
      font-weight: 600;
      color: var(--secondary-text-color);
    }

    .metric-label {
      font-size: 12px;
      color: var(--secondary-text-color);
      line-height: 1.25;
      margin-top: 3px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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
