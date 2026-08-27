import { css, CSSResultGroup } from "lit";
import {
  cardBaseStyles,
  headerStyles,
  rowStyles,
  iconBoxStyles,
  buttonStyles,
} from "../../styles";

export const favouritesCardStyles: CSSResultGroup = [
  cardBaseStyles,
  headerStyles,
  rowStyles,
  iconBoxStyles,
  buttonStyles,
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
    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: var(--c-grid-gap);
      max-width: 448px;
    }
    .item {
      position: relative;
      min-width: 0;
      min-height: 42px;
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      border: var(--c-card-border);
      border-radius: var(--c-radius-card);
      background: var(--c-card-surface);
      overflow: hidden;
    }
    .main {
      min-width: 0;
      min-height: 42px;
      padding: 4px 6px;
      text-align: left;
      background: transparent;
      display: grid;
      grid-template-columns: 26px minmax(0, 1fr);
      align-items: center;
      gap: var(--c-space-2);
    }
    .item.has-quick .main {
      padding-right: 2px;
    }
    .main:active,
    .quick:active {
      background: color-mix(in srgb, var(--primary-color) 10%, transparent);
    }
    .item.active {
      background: var(--c-active-surface);
      box-shadow: inset 2px 0 0 var(--primary-color);
    }
    .item.active .state {
      color: var(--primary-color);
      font-weight: var(--c-font-weight-medium);
    }
    .item.unavailable {
      opacity: 0.55;
    }
    .quick {
      width: 36px;
      min-height: 42px;
      border-left: 1px solid var(--c-card-border-color);
    }
    .empty,
    .load-error {
      grid-column: 1 / -1;
      min-height: 38px;
      padding: var(--c-card-padding-dense);
      border: 1px dashed var(--c-card-border-color);
      border-radius: var(--c-radius-card);
      background: transparent;
      color: var(--secondary-text-color);
      font-size: var(--c-font-base);
      line-height: var(--c-line-height-relaxed);
    }
  `,
];
