import { css, CSSResultGroup } from "lit";
import { updateCardStyles } from "../../utils/styles";

export const updateSummaryCardStyles: CSSResultGroup = [
  updateCardStyles,
  css`
    ha-card {
      position: relative;
    }
    .wrap {
      padding: 12px 14px;
      min-height: 72px;
      display: grid;
      grid-template-columns: auto minmax(0, 1fr) auto;
      align-items: center;
      gap: 12px;
    }
    .count {
      font-size: 27px;
      line-height: 1;
      font-weight: 650;
      letter-spacing: -0.035em;
    }
    .headline {
      font-size: 13px;
      font-weight: 600;
    }
    .desc {
      margin-top: 3px;
      font-size: 13px;
      line-height: 1.3;
      color: var(--secondary-text-color);
    }
    .desc.error {
      color: var(--error-color);
    }
    .all {
      appearance: none;
      border: 0;
      min-height: 44px;
      padding: 0 14px;
      border-radius: 11px;
      background: var(--primary-color);
      color: var(--text-primary-color);
      font-size: 13px;
      font-weight: 650;
      cursor: pointer;
      white-space: nowrap;
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
    }
    .progress {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 3px;
      border-radius: 0 999px 999px 0;
      background: var(--primary-color);
      pointer-events: none;
    }
    .progress.indeterminate {
      width: 34%;
      animation: update-slide 1.15s ease-in-out infinite;
    }
    @keyframes update-slide {
      0% {
        transform: translateX(-105%);
      }
      50% {
        transform: translateX(150%);
      }
      100% {
        transform: translateX(305%);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .progress.indeterminate {
        animation: none;
        width: 100%;
        opacity: 0.55;
      }
    }
    @media (max-width: 700px) {
      .wrap {
        padding: 12px;
        gap: 10px;
      }
      .count {
        font-size: 25px;
      }
      .all {
        padding: 0 12px;
      }
    }
  `,
];
