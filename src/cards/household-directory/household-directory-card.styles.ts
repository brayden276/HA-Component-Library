import { css, CSSResultGroup } from "lit";
import {
  cardBaseStyles,
  typographyStyles,
  iconWellStyles,
  surfaceStyles,
} from "../../styles";

export const householdDirectoryCardStyles: CSSResultGroup = [
  cardBaseStyles,
  typographyStyles,
  iconWellStyles,
  surfaceStyles,
  css`
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
      gap: 8px;
    }
    .title-row ha-icon,
    .heading ha-icon {
      color: var(--secondary-text-color);
      --mdc-icon-size: 18px;
    }
    .title-row h2,
    .heading h2 {
      margin: 0;
      font-size: 15px;
      line-height: 1.2;
      font-weight: 650;
      color: var(--primary-text-color);
    }
    .list,
    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
    .item {
      appearance: none;
      min-height: 56px;
      padding: 8px 12px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-card);
      background: var(--dashboard-card-surface);
      color: var(--primary-text-color);
      font: inherit;
      text-align: left;
      display: grid;
      grid-template-columns: 36px minmax(0, 1fr) auto;
      align-items: center;
      gap: 10px;
      cursor: pointer;
    }
    .item:hover {
      background: var(--dashboard-card-muted-surface);
    }
    .item.active {
      background: var(--dashboard-active-surface);
      border-color: var(--primary-color);
    }
    .item:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    .icon {
      width: 36px;
      height: 36px;
      border-radius: var(--dashboard-radius-control);
      background: var(--secondary-background-color);
      display: grid;
      place-items: center;
      flex-shrink: 0;
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
      line-height: 1.25;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--primary-text-color);
    }
    .state {
      margin-top: 3px;
      font-size: 12px;
      line-height: 1.25;
      color: var(--secondary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    @media (max-width: 700px) {
      .list,
      .grid {
        grid-template-columns: 1fr;
      }
    }
  `,
];
