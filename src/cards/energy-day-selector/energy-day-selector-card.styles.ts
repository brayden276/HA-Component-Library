import { css, CSSResultGroup } from "lit";
import { cardBaseStyles, typographyStyles, buttonStyles, badgeProgressStyles, telemetryStyles } from "../../styles";

export const energyDaySelectorCardStyles: CSSResultGroup = [
  cardBaseStyles,
  typographyStyles,
  buttonStyles,
  badgeProgressStyles,
  telemetryStyles,
  css`
    .row {
      min-height: 48px;
      padding: 6px 10px;
      display: grid;
      grid-template-columns: 40px minmax(0, 1fr) 40px auto;
      align-items: center;
      gap: 8px;
    }
    button {
      appearance: none;
      min-width: 40px;
      min-height: 40px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: transparent;
      color: inherit;
      font: inherit;
      cursor: pointer;
    }
    button:hover {
      background: var(--dashboard-card-muted-surface);
    }
    button:focus-visible,
    .date:focus-within {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    button:disabled {
      color: var(--disabled-text-color);
      cursor: default;
      opacity: 0.45;
    }
    .step {
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
    }
    ha-icon {
      --mdc-icon-size: 20px;
    }
    .date {
      position: relative;
      min-width: 0;
      min-height: 40px;
      padding: 4px 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      border-radius: var(--dashboard-radius-control);
      border: var(--dashboard-card-border);
      background: var(--dashboard-card-muted-surface);
      overflow: hidden;
    }
    .label {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 13px;
      font-weight: 650;
      color: var(--primary-text-color);
    }
    .state {
      flex: 0 0 auto;
      padding: 3px 8px;
      border-radius: 999px;
      background: var(--dashboard-card-surface);
      border: var(--dashboard-card-border);
      color: var(--secondary-text-color);
      font-size: 11px;
      font-weight: 650;
    }
    .state.historical {
      color: var(--primary-color);
      border-color: var(--primary-color);
      background: var(--dashboard-active-surface);
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
      min-height: 36px;
      padding: 0 12px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      color: var(--primary-color);
      background: var(--dashboard-card-muted-surface);
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      font-size: 12px;
      font-weight: 650;
    }
    .today:hover {
      background: var(--dashboard-active-surface);
    }
    .today:disabled {
      opacity: 0.45;
    }
    @media (max-width: 420px) {
      .row {
        grid-template-columns: 40px minmax(0, 1fr) 40px 40px;
        gap: 4px;
        padding: 6px;
      }
      .today {
        width: 40px;
        padding: 0;
      }
      .today span {
        display: none;
      }
    }
  `,
];
