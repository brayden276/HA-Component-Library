import { css, CSSResultGroup } from "lit";
import {
  cardBaseStyles,
  typographyStyles,
  buttonStyles,
  badgeProgressStyles,
} from "../../styles";

export const updateSummaryCardStyles: CSSResultGroup = [
  cardBaseStyles,
  typographyStyles,
  buttonStyles,
  badgeProgressStyles,
  css`
    ha-card {
      position: relative;
    }
    .wrap {
      padding: 12px 14px;
      min-height: 64px;
      display: grid;
      grid-template-columns: auto minmax(0, 1fr) auto;
      align-items: center;
      gap: 12px;
    }
    .count {
      font-size: 20px;
      line-height: 1;
      font-weight: 550;
      letter-spacing: -0.02em;
      font-variant-numeric: tabular-nums;
      color: var(--primary-text-color);
    }
    .headline {
      font-size: 13px;
      font-weight: 600;
      line-height: 1.25;
      color: var(--primary-text-color);
    }
    .desc {
      margin-top: 3px;
      font-size: 12px;
      line-height: 1.25;
      color: var(--secondary-text-color);
    }
    .desc.error {
      color: var(--error-color);
    }
    .all {
      appearance: none;
      border: 0;
      min-height: 44px;
      padding: 0 16px;
      border-radius: var(--dashboard-radius-control);
      background: var(--primary-color);
      color: var(--text-primary-color);
      font-size: 13px;
      font-weight: 650;
      cursor: pointer;
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .all:active {
      transform: scale(0.98);
    }
    .all:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    .all:disabled {
      cursor: default;
      background: var(--secondary-background-color);
      color: var(--secondary-text-color);
      opacity: 0.6;
    }
    .progress {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 3px;
      background: var(--divider-color);
      overflow: hidden;
      pointer-events: none;
    }
    .progress.indeterminate {
      width: 100%;
    }
    .progress.indeterminate:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 35%;
      background: var(--primary-color);
      animation: indeterminateSlide 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }
    @keyframes indeterminateSlide {
      0% {
        left: -35%;
      }
      100% {
        left: 100%;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .progress.indeterminate:after {
        animation: none;
        width: 100%;
        opacity: 0.55;
      }
    }
  `,
];
