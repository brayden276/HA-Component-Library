import { css, CSSResultGroup } from "lit";
import { dashboardBaseCardStyles } from "../../utils/styles";

export const historyGraphCardStyles: CSSResultGroup = [
  dashboardBaseCardStyles,
  css`
    :host {
      display: block;
      min-width: 0;
    }
    ha-card {
      overflow: hidden;
      border-radius: var(--ha-card-border-radius, 16px);
    }
    .wrap {
      box-sizing: border-box;
      padding: 4px 5px 5px;
    }
    .top {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 0 5px;
    }
    .meta {
      font-size: 11.5px;
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
      border-radius: 5px;
    }
    .sw {
      width: 17px;
      height: 3px;
      border-radius: 999px;
    }
    .s1 {
      background: var(--primary-color);
    }
    .s2 {
      background: var(--warning-color, #f5b942);
    }
    .s3 {
      background: var(--secondary-text-color);
    }
    .chart {
      position: relative;
      width: 100%;
      height: clamp(400px, 48vw, 520px);
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
      stroke-width: 1;
      opacity: 0.58;
    }
    .zero {
      stroke: var(--divider-color);
      stroke-width: 1.35;
      opacity: 0.95;
    }
    .l1 {
      fill: none;
      stroke: var(--primary-color);
      stroke-width: 3;
      stroke-linejoin: round;
      stroke-linecap: round;
      vector-effect: non-scaling-stroke;
    }
    .l2 {
      fill: none;
      stroke: var(--warning-color, #f5b942);
      stroke-width: 2.6;
      stroke-linejoin: round;
      stroke-linecap: round;
      vector-effect: non-scaling-stroke;
    }
    .f2 {
      fill: color-mix(in srgb, var(--warning-color, #f5b942) 12%, transparent);
    }
    .l3 {
      fill: none;
      stroke: var(--secondary-text-color);
      stroke-width: 2.2;
      stroke-linejoin: round;
      stroke-linecap: round;
      vector-effect: non-scaling-stroke;
    }
    .cursor {
      stroke: var(--secondary-text-color);
      stroke-width: 1;
      stroke-dasharray: 3 3;
    }
    .tip {
      position: absolute;
      min-width: 145px;
      padding: 9px 10px;
      border-radius: 11px;
      background: var(--card-background-color);
      border: 1px solid var(--divider-color);
      box-shadow: 0 7px 22px rgba(0, 0, 0, 0.2);
      pointer-events: none;
      opacity: 0;
      transform: translate(-50%, -100%);
      font-size: 11.5px;
      line-height: 1.45;
    }
    .tip.show {
      opacity: 1;
    }
    .tip b {
      color: var(--primary-text-color);
      font-weight: 650;
    }
    .tr {
      display: flex;
      justify-content: space-between;
      gap: 14px;
      color: var(--secondary-text-color);
    }
    @media (max-width: 700px) {
      .wrap {
        padding: 3px;
      }
      .legend {
        gap: 9px;
      }
      .legend button,
      .meta {
        font-size: 10.5px;
      }
      .chart {
        height: 400px;
      }
      .axis {
        font-size: 10px;
      }
      .small {
        font-size: 9.5px;
      }
    }
  `,
];
