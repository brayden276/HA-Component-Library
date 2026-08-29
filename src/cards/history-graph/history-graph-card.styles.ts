import { css, CSSResultGroup } from "lit";
import {
  cardBaseStyles,
  typographyStyles,
  telemetryStyles,
} from "../../styles";

export const historyGraphCardStyles: CSSResultGroup = [
  cardBaseStyles,
  typographyStyles,
  telemetryStyles,
  css`
    .wrap {
      box-sizing: border-box;
      padding: 6px 8px 8px;
    }
    .top {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 0 6px;
    }
    .meta {
      font-size: 12px;
      font-weight: 600;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }
    .legend {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 14px;
      flex-wrap: wrap;
    }
    .legend button {
      appearance: none;
      min-height: 44px;
      border: 0;
      background: transparent;
      color: var(--secondary-text-color);
      font: inherit;
      font-size: 12px;
      font-weight: 600;
      padding: 3px 0;
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
    }
    .legend button:active {
      transform: scale(0.97);
    }
    .legend button:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
      border-radius: var(--dashboard-radius-control);
    }
    .sw {
      width: 18px;
      height: 4px;
      border-radius: 999px;
    }
    .s1 {
      background: var(--primary-color);
    }
    .s2 {
      background: var(--warning-color);
    }
    .s3 {
      background: var(--secondary-text-color);
    }
    .chart {
      position: relative;
      width: 100%;
      height: clamp(380px, 46vw, 500px);
    }
    svg {
      display: block;
      width: 100%;
      height: 100%;
      overflow: hidden;
      touch-action: none;
    }
    .axis {
      fill: var(--secondary-text-color);
      font-size: 11px;
      font-weight: 500;
      font-family: inherit;
    }
    .small {
      fill: var(--secondary-text-color);
      font-size: 10px;
      font-weight: 600;
      font-family: inherit;
    }
    .grid {
      stroke: var(--divider-color);
      stroke-width: 1px;
    }
    .scrub {
      position: absolute;
      top: 0;
      bottom: 24px;
      width: 1px;
      background: var(--primary-text-color);
      pointer-events: none;
      opacity: 0.7;
    }
    .tooltip {
      position: absolute;
      top: 8px;
      padding: 8px 12px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: var(--card-background-color);
      box-shadow: var(--dashboard-dialog-shadow);
      font-size: 11.5px;
      pointer-events: none;
      white-space: nowrap;
      z-index: 10;
    }
    .tooltip-time {
      font-weight: 650;
      margin-bottom: 4px;
      color: var(--primary-text-color);
    }
    .tooltip-row {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 2px;
      color: var(--secondary-text-color);
    }
    .tooltip-val {
      font-weight: 650;
      color: var(--primary-text-color);
      font-variant-numeric: tabular-nums;
    }
  `,
];
