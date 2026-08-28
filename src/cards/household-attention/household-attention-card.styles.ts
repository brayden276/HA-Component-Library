import { css, CSSResultGroup } from "lit";
import {
  cardBaseStyles,
  typographyStyles,
  iconWellStyles,
  surfaceStyles,
  badgeProgressStyles,
  dialogStyles,
} from "../../styles";

export const householdAttentionCardStyles: CSSResultGroup = [
  cardBaseStyles,
  typographyStyles,
  iconWellStyles,
  surfaceStyles,
  badgeProgressStyles,
  dialogStyles,
  css`
    ha-card {
      border: 0;
      box-shadow: none;
      background: transparent;
      color: var(--primary-text-color);
    }
    .head {
      min-height: 36px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 6px;
      padding: 0 2px;
    }
    .title-row {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
    }
    .title-row ha-icon,
    .head ha-icon {
      color: var(--error-color);
      --mdc-icon-size: 19px;
    }
    .head h2 {
      margin: 0;
      font-size: 15px;
      line-height: 1.2;
      font-weight: 650;
      color: var(--primary-text-color);
    }
    .count {
      font-size: 11px;
      font-weight: 650;
      padding: 3px 8px;
      border-radius: 999px;
      background: var(--dashboard-warning-surface);
      color: var(--warning-color);
      border: 1px solid var(--warning-color);
    }
    .list,
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 8px;
    }
    .issue {
      appearance: none;
      width: 100%;
      min-height: 56px;
      padding: 8px 12px;
      border: var(--dashboard-card-border);
      border-left: 3px solid var(--warning-color);
      border-radius: var(--dashboard-radius-card);
      background: var(--dashboard-warning-surface);
      display: grid;
      grid-template-columns: 36px minmax(0, 1fr) auto auto;
      align-items: center;
      gap: 10px;
      text-align: left;
      cursor: pointer;
      color: inherit;
    }
    .issue.critical {
      border-left-color: var(--error-color);
      background: var(--dashboard-critical-surface);
    }
    .issue:hover,
    .issue:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 1px;
    }
    .icon,
    .issue-icon {
      width: 36px;
      height: 36px;
      border-radius: var(--dashboard-radius-control);
      background: var(--secondary-background-color);
      display: grid;
      place-items: center;
      color: var(--warning-color);
      flex-shrink: 0;
    }
    .issue.critical .icon,
    .issue.critical .issue-icon {
      color: var(--error-color);
    }
    .issue-icon ha-icon {
      --mdc-icon-size: 20px;
    }
    .copy {
      min-width: 0;
    }
    .title,
    .name {
      font-size: 13px;
      font-weight: 600;
      line-height: 1.25;
      color: var(--primary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .detail,
    .reason {
      margin-top: 3px;
      font-size: 12px;
      line-height: 1.25;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `,
];
