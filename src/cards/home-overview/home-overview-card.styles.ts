import { css, CSSResultGroup } from "lit";
import { dashboardBaseCardStyles } from "../../utils/styles";

export const homeOverviewCardStyles: CSSResultGroup = [
  dashboardBaseCardStyles,
  css`
    :host {
      display: block;
      min-width: 0;
    }
    * {
      box-sizing: border-box;
    }
    ha-card {
      display: block;
      border: 0;
      box-shadow: none;
      background: transparent;
      overflow: visible;
      color: var(--primary-text-color);
    }
    .top {
      min-height: 44px;
      padding: 0 2px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .time {
      min-width: 0;
      white-space: nowrap;
      color: var(--secondary-text-color);
      font-size: 14px;
      line-height: 1.2;
      font-weight: 400;
    }
    .weather {
      appearance: none;
      border: 0;
      min-height: 44px;
      padding: 0;
      background: transparent;
      color: var(--secondary-text-color);
      font: inherit;
      font-size: 13px;
      line-height: 1.2;
      font-weight: 400;
      white-space: nowrap;
      cursor: pointer;
    }
    .weather:hover {
      text-decoration: underline;
    }
    .weather:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
      border-radius: 6px;
    }
    .sections {
      margin-top: 8px;
      display: grid;
      gap: 16px;
    }
    @media (max-width: 520px) {
      .time {
        font-size: 13px;
      }
      .weather {
        font-size: 12px;
      }
    }
    @media (max-width: 350px) {
      .time {
        font-size: 12px;
      }
      .weather {
        font-size: 11px;
      }
    }
  `,
];
