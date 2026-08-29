import { css, CSSResultGroup } from "lit";
import {
  cardBaseStyles,
  typographyStyles,
  buttonStyles,
  iconWellStyles,
} from "../../styles";

export const deviceDiscoveryCardStyles: CSSResultGroup = [
  cardBaseStyles,
  typographyStyles,
  buttonStyles,
  iconWellStyles,
  css`
    .card {
      padding: 4px 14px;
    }
    .summary,
    .state {
      min-height: 56px;
      display: grid;
      grid-template-columns: 40px minmax(0, 1fr) auto;
      align-items: center;
      gap: 12px;
    }
    .state {
      padding: 8px 0;
    }
    .icon {
      width: 40px;
      height: 40px;
      display: grid;
      place-items: center;
      border-radius: var(--dashboard-radius-control);
      background: var(--secondary-background-color);
      color: var(--primary-color);
      flex-shrink: 0;
    }
    ha-icon {
      --mdc-icon-size: 20px;
    }
    .title {
      font-size: 13px;
      line-height: 1.25;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--primary-text-color);
    }
    .description {
      margin-top: 3px;
      font-size: 12px;
      line-height: 1.25;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .refresh,
    .review,
    .retry {
      appearance: none;
      min-height: 36px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: var(--dashboard-card-muted-surface);
      color: var(--primary-color);
      font: inherit;
      font-size: 12.5px;
      font-weight: 650;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .refresh {
      width: 36px;
      padding: 0;
    }
    .review,
    .retry {
      padding: 0 12px;
    }
    .refresh:hover,
    .review:hover,
    .retry:hover {
      background: var(--dashboard-active-surface);
    }
    .refresh:focus-visible,
    .review:focus-visible,
    .retry:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    .row {
      min-height: 56px;
      display: grid;
      grid-template-columns: 40px minmax(0, 1fr) auto;
      align-items: center;
      gap: 12px;
      border-top: 1px solid var(--divider-color);
    }
    .row .icon {
      background: var(--secondary-background-color);
    }
    button.row {
      appearance: none;
      width: 100%;
      border-left: 0;
      border-right: 0;
      border-bottom: 0;
      background: transparent;
      color: inherit;
      font: inherit;
      text-align: left;
      cursor: pointer;
    }
    button.row:hover {
      background: var(--dashboard-card-muted-surface);
    }
    button.row:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }
  `,
];
