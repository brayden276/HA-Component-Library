import { css, CSSResultGroup } from "lit";
import {
  assemblyStyles,
  cardBaseStyles,
  rowListStyles,
  typographyStyles,
} from "../../styles";

export const listCardStyles: CSSResultGroup = [
  cardBaseStyles,
  typographyStyles,
  rowListStyles,
  assemblyStyles,
  css`
    .list-wrap {
      margin: -4px 0;
    }
    .row {
      appearance: none;
      width: 100%;
      border: 0;
      border-top: 1px solid var(--divider-color);
      background: transparent;
      color: inherit;
      font: inherit;
      min-height: 48px;
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: center;
      gap: 12px;
      padding: 8px 0;
      text-align: left;
      cursor: pointer;
    }
    .row:first-child {
      border-top: 0;
    }
    .row:active {
      background: var(--dashboard-card-muted-surface);
    }
    .row:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
      border-radius: var(--dashboard-radius-control);
    }
    .title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--primary-text-color);
    }
    .desc {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .metric {
      text-align: right;
      white-space: nowrap;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .metric b {
      font-size: 13px;
      font-weight: 650;
      color: var(--primary-text-color);
      font-variant-numeric: tabular-nums;
      margin-right: 4px;
    }
    .row:not(button) {
      cursor: default;
    }
    .row:not(button):active {
      background: transparent;
    }
    .row:not(button):focus-visible {
      outline: none;
    }
  `,
];
