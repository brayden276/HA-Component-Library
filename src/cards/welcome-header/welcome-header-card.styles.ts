import { css, CSSResultGroup } from "lit";
import { dashboardBaseCardStyles } from "../../utils/styles";

export const welcomeHeaderCardStyles: CSSResultGroup = [
  dashboardBaseCardStyles,
  css`
    :host {
      display: block;
      min-width: 0;
    }
    * {
      box-sizing: border-box;
    }
    button {
      font: inherit;
    }
    ha-card {
      border: 0;
      box-shadow: none;
      background: transparent;
      color: var(--primary-text-color);
    }
    .row {
      min-height: 32px;
      padding: 0 2px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .time {
      min-width: 0;
      white-space: nowrap;
      color: var(--secondary-text-color);
      font-size: 12.5px;
      line-height: 1.2;
      font-weight: 400;
    }
    .weather {
      appearance: none;
      border: 0;
      min-height: 32px;
      padding: 0;
      background: transparent;
      color: var(--secondary-text-color);
      font-size: 11.5px;
      line-height: 1.2;
      font-weight: 400;
      white-space: nowrap;
      cursor: pointer;
      text-align: right;
    }
    .weather:hover {
      text-decoration: underline;
    }
    .weather:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
      border-radius: 5px;
    }
    @media (max-width: 520px) {
      .row {
        gap: 8px;
      }
      .time {
        font-size: 13px;
      }
      .weather {
        font-size: 12px;
      }
    }
    @media (max-width: 350px) {
      .row {
        gap: 6px;
      }
      .time {
        font-size: 12px;
      }
      .weather {
        font-size: 11px;
      }
    }
  `,
];
