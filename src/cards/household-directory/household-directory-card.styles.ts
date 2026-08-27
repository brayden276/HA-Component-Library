import { css, CSSResultGroup } from "lit";
import { dashboardBaseCardStyles } from "../../utils/styles";

export const householdDirectoryCardStyles: CSSResultGroup = [
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
      display: block;
      border: 0;
      box-shadow: none;
      background: transparent;
      overflow: visible;
      color: var(--primary-text-color);
    }
    .head {
      min-height: 38px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 6px;
      padding: 0 2px;
    }
    .title-row,
    .heading {
      display: flex;
      align-items: center;
      gap: 7px;
    }
    .title-row ha-icon,
    .heading ha-icon {
      color: var(--secondary-text-color);
      --mdc-icon-size: 17px;
    }
    .title-row h2,
    .heading h2 {
      margin: 0;
      font-size: 15px;
      line-height: 1.2;
      font-weight: 500;
    }
    .list,
    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
    .item {
      appearance: none;
      min-height: 52px;
      padding: 8px 10px;
      border: var(--dashboard-card-border, 1px solid var(--divider-color));
      border-radius: var(--dashboard-radius-card, 8px);
      background: var(--dashboard-card-surface, var(--card-background-color));
      color: var(--primary-text-color);
      font: inherit;
      text-align: left;
      display: grid;
      grid-template-columns: 32px minmax(0, 1fr) auto;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }
    .item:hover {
      background: var(
        --dashboard-card-muted-surface,
        var(--secondary-background-color)
      );
    }
    .item:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 1px;
    }
    .icon {
      width: 32px;
      height: 32px;
      display: grid;
      place-items: center;
    }
    .item ha-icon,
    .icon ha-icon {
      color: var(--primary-color);
      --mdc-icon-size: 20px;
    }
    .copy {
      min-width: 0;
      display: flex;
      flex-direction: column;
    }
    .name {
      font-size: 13px;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .meta {
      margin-top: 2px;
      font-size: 11px;
      color: var(--secondary-text-color);
    }
    .arrow {
      color: var(--secondary-text-color);
      display: grid;
      place-items: center;
    }
    .arrow ha-icon {
      --mdc-icon-size: 18px;
      color: var(--secondary-text-color);
    }
    .empty {
      margin: 0;
      padding: 9px 2px;
      color: var(--secondary-text-color);
      font-size: 13px;
      line-height: 1.35;
    }
    @media (max-width: 340px) {
      .list,
      .grid {
        grid-template-columns: minmax(0, 1fr);
      }
    }
  `,
];
