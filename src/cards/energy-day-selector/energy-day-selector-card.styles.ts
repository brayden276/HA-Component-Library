import { css, CSSResultGroup } from "lit";
import { dashboardBaseCardStyles } from "../../utils/styles";

export const energyDaySelectorCardStyles: CSSResultGroup = [
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
    .row {
      min-height: 56px;
      padding: 6px 8px;
      display: grid;
      grid-template-columns: 44px minmax(0, 1fr) 44px auto;
      align-items: center;
      gap: 8px;
    }
    button {
      appearance: none;
      min-width: 44px;
      min-height: 44px;
      border: 0;
      border-radius: 12px;
      background: transparent;
      color: inherit;
      font: inherit;
      cursor: pointer;
    }
    button:focus-visible,
    .date:focus-within {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    button:disabled {
      color: var(--disabled-text-color, var(--secondary-text-color));
      cursor: default;
      opacity: 0.45;
    }
    .step {
      display: grid;
      place-items: center;
    }
    ha-icon {
      --mdc-icon-size: 22px;
    }
    .date {
      position: relative;
      min-width: 0;
      min-height: 44px;
      padding: 4px 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      border-radius: 12px;
      background: var(--secondary-background-color);
      overflow: hidden;
    }
    .label {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 13px;
      font-weight: 650;
    }
    .state {
      flex: 0 0 auto;
      padding: 3px 7px;
      border-radius: 999px;
      background: var(--card-background-color);
      color: var(--secondary-text-color);
      font-size: 13px;
      font-weight: 600;
    }
    .state.historical {
      color: var(--primary-color);
    }
    input {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
    .today {
      padding: 0 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      color: var(--primary-color);
      background: var(--secondary-background-color);
      font-size: 13px;
      font-weight: 650;
    }
    .today:disabled {
      opacity: 0.55;
    }
    @media (max-width: 420px) {
      .row {
        grid-template-columns: 44px minmax(0, 1fr) 44px 44px;
        gap: 4px;
        padding: 6px;
      }
      .today {
        width: 44px;
        padding: 0;
      }
      .today span {
        display: none;
      }
    }
  `,
];
