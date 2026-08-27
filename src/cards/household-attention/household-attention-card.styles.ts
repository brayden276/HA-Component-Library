import { css, CSSResultGroup } from "lit";
import { dashboardBaseCardStyles } from "../../utils/styles";

export const householdAttentionCardStyles: CSSResultGroup = [
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
      color: inherit;
    }
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
      color: var(--error-color, #db4437);
      --mdc-icon-size: 19px;
    }
    .head h2 {
      margin: 0;
      font-size: 18px;
      line-height: 1.2;
      font-weight: 650;
    }
    .count {
      font-size: 12px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 10px;
      background: color-mix(in srgb, var(--warning-color, #f9a825) 15%, transparent);
      color: var(--warning-color, #f9a825);
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
      min-height: 52px;
      padding: 6px 10px;
      border: var(--dashboard-card-border, 1px solid var(--divider-color));
      border-left: 3px solid var(--warning-color, #f9a825);
      border-radius: var(--dashboard-radius-card, 6px);
      background: var(
        --dashboard-warning-surface,
        var(--card-background-color)
      );
      display: grid;
      grid-template-columns: 36px minmax(0, 1fr) auto auto;
      align-items: center;
      gap: 8px;
      text-align: left;
      cursor: pointer;
    }
    .issue.critical {
      border-left-color: var(--error-color, #db4437);
      background: var(
        --dashboard-critical-surface,
        var(--card-background-color)
      );
    }
    .issue:hover,
    .issue:focus-visible {
      background: var(
        --dashboard-card-muted-surface,
        var(--card-background-color)
      );
      outline: 2px solid var(--primary-color);
      outline-offset: 1px;
    }
    .icon,
    .issue-icon {
      width: 36px;
      height: 36px;
      border-radius: var(--dashboard-radius-icon, 6px);
      display: grid;
      place-items: center;
      color: var(--warning-color, #f9a825);
      background: transparent;
    }
    .critical .icon,
    .critical .issue-icon {
      color: var(--error-color, #db4437);
    }
    .icon ha-icon,
    .issue-icon ha-icon {
      --mdc-icon-size: 20px;
    }
    .copy {
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .name {
      font-size: 13px;
      line-height: 1.25;
      font-weight: 650;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .status,
    .state {
      font-size: 13px;
      line-height: 1.25;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .badge,
    .severity {
      font-size: 12px;
      font-weight: 650;
      color: var(--warning-color, #f9a825);
      padding: 2px 6px;
      border-radius: 4px;
    }
    .badge.critical,
    .critical .severity {
      color: var(--error-color, #db4437);
    }
    .arrow {
      color: var(--secondary-text-color);
      display: grid;
      place-items: center;
    }
    .arrow ha-icon {
      --mdc-icon-size: 18px;
    }
    .quiet {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      border: var(--dashboard-card-border, 1px solid var(--divider-color));
      border-radius: var(--dashboard-radius-card, 6px);
      background: var(--dashboard-card-surface, var(--card-background-color));
    }
    .quiet-icon {
      color: var(--success-color, #4caf50);
      display: grid;
      place-items: center;
      flex-shrink: 0;
    }
    .quiet-icon ha-icon {
      --mdc-icon-size: 24px;
    }
    .quiet-text h3 {
      margin: 0;
      font-size: 14px;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .quiet-text p {
      margin: 2px 0 0 0;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    @media (max-width: 700px) {
      .list,
      .grid {
        grid-template-columns: 1fr;
      }
      .issue {
        min-height: 56px;
      }
    }
  `,
];
