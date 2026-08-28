import { css, CSSResultGroup } from "lit";
import { cardBaseStyles, typographyStyles, iconWellStyles, surfaceStyles } from "../../styles";

export const roomNavigationCardStyles: CSSResultGroup = [
  cardBaseStyles,
  typographyStyles,
  iconWellStyles,
  surfaceStyles,
  css`
    ha-card {
      overflow: hidden;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-card);
      background: var(--dashboard-card-surface);
      box-shadow: none;
      color: var(--primary-text-color);
    }
    button {
      appearance: none;
      width: 100%;
      min-height: 48px;
      padding: 10px 14px;
      border: 0;
      border-left: 3px solid transparent;
      background: transparent;
      color: inherit;
      font: inherit;
      text-align: left;
      display: grid;
      grid-template-columns: 40px minmax(0, 1fr);
      align-items: center;
      gap: 12px;
      cursor: pointer;
    }
    .icon {
      width: 40px;
      height: 40px;
      border-radius: var(--dashboard-radius-control);
      background: var(--secondary-background-color);
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
      flex-shrink: 0;
    }
    .icon ha-icon {
      --mdc-icon-size: 20px;
    }
    .copy {
      min-width: 0;
    }
    .name,
    .summary {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .name {
      font-size: 13px;
      line-height: 1.25;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .summary {
      margin-top: 3px;
      font-size: 12px;
      line-height: 1.25;
      font-weight: 400;
      color: var(--secondary-text-color);
    }
    button.active {
      border-left-color: transparent;
      background: transparent;
    }
    button.active .icon {
      color: var(--primary-color);
    }
    button.warning {
      border-left-color: var(--warning-color);
      background: var(--dashboard-warning-surface);
    }
    button.warning .icon {
      color: var(--warning-color);
    }
    button.critical {
      border-left-color: var(--error-color);
      background: var(--dashboard-critical-surface);
    }
    button.critical .icon {
      color: var(--error-color);
    }
    button:hover {
      background: var(--dashboard-card-muted-surface);
    }
    button:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
      border-radius: var(--dashboard-radius-card);
    }
  `,
];
