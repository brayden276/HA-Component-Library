import { css, CSSResultGroup } from "lit";
import { dashboardBaseCardStyles } from "../../utils/styles";

export const solarDaylightCardStyles: CSSResultGroup = [
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
    button {
      appearance: none;
      width: 100%;
      min-height: 44px;
      box-sizing: border-box;
      border: 0;
      background: transparent;
      font: inherit;
      padding: 12px 14px;
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
      align-items: center;
      gap: 16px;
      cursor: pointer;
      font-size: 11.5px;
      line-height: 1.3;
      white-space: nowrap;
      overflow: hidden;
    }
    button:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
      border-radius: var(--ha-card-border-radius, 16px);
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
    .clouds {
      justify-self: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 18px;
      min-width: 0;
      color: var(--secondary-text-color);
    }
    .cloud-item {
      display: flex;
      align-items: baseline;
      gap: 4px;
    }
    .cloud-label {
      font-weight: 500;
    }
    .cloud-value {
      font-weight: 600;
      color: var(--primary-text-color);
    }
    @media (max-width: 900px) {
      button {
        gap: 10px;
        padding: 11px 12px;
        font-size: 11px;
      }
      .clouds {
        gap: 10px;
      }
      .cloud-item {
        gap: 3px;
      }
    }
    @media (max-width: 650px) {
      button {
        font-size: 11px;
        gap: 6px;
        padding: 10px;
      }
      .clouds {
        gap: 7px;
      }
    }
  `,
];
