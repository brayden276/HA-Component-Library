import { css, CSSResultGroup } from "lit";
import {
  cardBaseStyles,
  typographyStyles,
  surfaceStyles,
  buttonStyles,
  iconWellStyles,
} from "../../styles";

export const favouritesCardStyles: CSSResultGroup = [
  cardBaseStyles,
  typographyStyles,
  surfaceStyles,
  buttonStyles,
  iconWellStyles,
  css`
    ha-card {
      border: 0;
      box-shadow: none;
      background: transparent;
      overflow: visible;
    }
    .wrap {
      padding: 0;
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
    .heading {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .heading ha-icon {
      color: var(--secondary-text-color);
      --mdc-icon-size: 18px;
    }
    .heading h2 {
      margin: 0;
      font-size: 15px;
      line-height: 1.2;
      font-weight: 650;
      color: var(--primary-text-color);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
      max-width: 448px;
    }
    .item {
      position: relative;
      min-width: 0;
      min-height: 48px;
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-card);
      background: var(--dashboard-card-surface);
      overflow: hidden;
      color: var(--primary-text-color);
    }
    .main {
      min-width: 0;
      min-height: 48px;
      padding: 6px 10px;
      text-align: left;
      background: transparent;
      display: grid;
      grid-template-columns: 28px minmax(0, 1fr);
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }
    .item.has-quick .main {
      padding-right: 4px;
    }
    .main:hover,
    .quick:hover {
      background: var(--dashboard-card-muted-surface);
    }
    .item.active {
      background: var(--dashboard-active-surface);
      border-color: var(--primary-color);
    }
    .item.active .state {
      color: var(--primary-color);
      font-weight: 600;
    }
    .item.unavailable {
      opacity: 0.45;
    }
    .quick {
      width: 40px;
      min-height: 48px;
      border-left: 1px solid var(--divider-color);
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
      cursor: pointer;
    }
    .icon {
      width: 28px;
      height: 28px;
      display: grid;
      place-items: center;
      color: var(--primary-color);
    }
    .icon ha-icon {
      --mdc-icon-size: 18px;
    }
    .copy {
      min-width: 0;
    }
    .name {
      display: block;
      font-size: 12.5px;
      font-weight: 600;
      line-height: 1.2;
      color: var(--primary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .state {
      display: block;
      margin-top: 2px;
      font-size: 11px;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .empty,
    .load-error {
      grid-column: 1 / -1;
      min-height: 48px;
      padding: 12px 14px;
      border: 1px dashed var(--dashboard-card-border-color);
      border-radius: var(--dashboard-radius-card);
      background: transparent;
      color: var(--secondary-text-color);
      font-size: 12px;
      line-height: 1.35;
      text-align: center;
    }
    @media (max-width: 520px) {
      .grid {
        grid-template-columns: 1fr;
      }
    }
  `,
];
