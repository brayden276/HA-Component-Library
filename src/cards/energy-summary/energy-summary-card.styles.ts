import { css, CSSResultGroup } from "lit";
import { dashboardBaseCardStyles } from "../../utils/styles";

export const energySummaryCardStyles: CSSResultGroup = [
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
      overflow: hidden;
      border-radius: var(--ha-card-border-radius, 16px);
    }
    .wrap {
      padding: 12px 14px 14px;
    }
    .head {
      min-height: 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 8px;
    }
    h2 {
      margin: 0;
      font-size: 15px;
      line-height: 1.2;
      font-weight: 600;
    }
    .context {
      display: flex;
      align-items: center;
      gap: 7px;
      min-width: 0;
      color: var(--secondary-text-color);
      font-size: 13px;
    }
    .day {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .state {
      flex: 0 0 auto;
      padding: 3px 7px;
      border-radius: 999px;
      background: var(--secondary-background-color);
      font-weight: 600;
    }
    .state.now {
      color: var(--primary-color);
    }
    .live {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
      margin-bottom: 8px;
    }
    .daily {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 8px;
    }
    .metric {
      appearance: none;
      min-width: 0;
      min-height: 68px;
      padding: 10px 11px;
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-card-border-radius, 12px);
      background: transparent;
      color: inherit;
      font: inherit;
      text-align: left;
      display: flex;
      flex-direction: column;
      justify-content: center;
      cursor: pointer;
    }
    .metric:disabled {
      cursor: default;
      opacity: 1;
    }
    .metric:not(:disabled):hover {
      background: var(--secondary-background-color);
    }
    .metric:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    .value {
      font-size: 22px;
      line-height: 1;
      font-weight: 650;
      letter-spacing: -0.025em;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .label {
      margin-top: 6px;
      font-size: 13px;
      line-height: 1.2;
      font-weight: 500;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .daily .value {
      font-size: 18px;
    }
    .daily .metric {
      min-height: 62px;
    }
    .feedback {
      min-height: 18px;
      margin-top: 8px;
      color: var(--secondary-text-color);
      font-size: 13px;
      line-height: 1.35;
    }
    .feedback.error {
      color: var(--error-color);
    }
    @media (max-width: 700px) {
      .wrap {
        padding: 12px;
      }
      .daily {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      .value {
        font-size: 20px;
      }
    }
    @media (max-width: 420px) {
      .live {
        grid-template-columns: 1fr;
      }
      .metric {
        min-height: 58px;
      }
      .live .metric {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        align-items: center;
      }
      .live .label {
        grid-column: 1;
        grid-row: 1;
        margin: 0;
      }
      .live .value {
        grid-column: 2;
        grid-row: 1;
      }
      .head {
        align-items: flex-start;
      }
      .context {
        justify-content: flex-end;
      }
    }
  `,
];
