import { css, CSSResultGroup } from "lit";
import {
  cardBaseStyles,
  typographyStyles,
  buttonStyles,
  iconWellStyles,
  surfaceStyles,
} from "../../styles";

export const securitySummaryCardStyles: CSSResultGroup = [
  cardBaseStyles,
  typographyStyles,
  buttonStyles,
  iconWellStyles,
  surfaceStyles,
  css`
    .wrap {
      padding: 14px;
    }
    .top {
      min-height: 44px;
      display: grid;
      grid-template-columns: 40px minmax(0, 1fr) auto;
      align-items: center;
      gap: 12px;
    }
    .icon {
      width: 40px;
      height: 40px;
      border-radius: var(--dashboard-radius-control);
      display: grid;
      place-items: center;
      background: var(--secondary-background-color);
      color: var(--secondary-text-color);
      flex-shrink: 0;
    }
    .icon ha-icon {
      --mdc-icon-size: 20px;
    }
    .ok .icon {
      color: var(--primary-color);
    }
    .copy {
      min-width: 0;
    }
    .title,
    .detail {
      display: block;
    }
    .title {
      font-size: 13px;
      line-height: 1.25;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .detail {
      margin-top: 3px;
      color: var(--secondary-text-color);
      font-size: 12px;
      line-height: 1.25;
    }
    .count {
      font-size: 12px;
      font-weight: 600;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }
    .attention {
      display: grid;
      gap: 8px;
      margin-top: 10px;
    }
    .attention button {
      appearance: none;
      width: 100%;
      min-height: 44px;
      padding: 8px 12px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: var(--dashboard-card-muted-surface);
      color: inherit;
      font: inherit;
      text-align: left;
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }
    .attention button:hover {
      background: var(--dashboard-active-surface);
    }
    .attention button:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    .attention ha-icon {
      --mdc-icon-size: 18px;
      color: var(--warning-color);
    }
    .attention span {
      font-size: 12.5px;
      font-weight: 500;
      color: var(--primary-text-color);
    }
  `,
];
