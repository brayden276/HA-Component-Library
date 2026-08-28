import { css, CSSResultGroup } from "lit";
import { cardBaseStyles, typographyStyles } from "../../styles";

export const contextStripCardStyles: CSSResultGroup = [
  cardBaseStyles,
  typographyStyles,
  css`
    button {
      appearance: none;
      width: 100%;
      min-height: 44px;
      box-sizing: border-box;
      border: 0;
      background: transparent;
      font: inherit;
      padding: 10px 14px;
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
      align-items: center;
      gap: 12px;
      cursor: pointer;
      font-size: 12px;
      line-height: 1.25;
      white-space: nowrap;
      overflow: hidden;
      color: inherit;
    }
    button:active {
      transform: scale(0.997);
    }
    button:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
      border-radius: var(--dashboard-radius-card);
    }
    .phase {
      color: var(--primary-text-color);
      font-weight: 600;
      text-align: left;
      justify-self: start;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .event {
      color: var(--secondary-text-color);
      text-align: right;
      justify-self: end;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .mid {
      justify-self: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      min-width: 0;
      color: var(--secondary-text-color);
    }
    .item {
      display: flex;
      align-items: baseline;
      gap: 4px;
    }
    .lab {
      font-weight: 400;
    }
    .val {
      font-weight: 650;
      color: var(--primary-text-color);
      font-variant-numeric: tabular-nums;
    }
    @media (max-width: 900px) {
      button {
        gap: 10px;
        padding: 10px 12px;
      }
      .mid {
        gap: 10px;
      }
    }
    @media (max-width: 650px) {
      button {
        gap: 6px;
        padding: 8px 10px;
      }
      .mid {
        gap: 7px;
      }
    }
  `,
];
