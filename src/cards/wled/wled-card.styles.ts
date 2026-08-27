import { css, CSSResultGroup } from "lit";
import {
  cardBaseStyles,
  rowStyles,
  iconBoxStyles,
  buttonStyles,
  sheetStyles,
} from "../../styles";

export const wledCardStyles: CSSResultGroup = [
  cardBaseStyles,
  rowStyles,
  iconBoxStyles,
  buttonStyles,
  sheetStyles,
  css`
    .head {
      min-height: var(--c-row-min-height);
      padding: 6px 8px 6px var(--c-space-4);
      display: grid;
      grid-template-columns: var(--c-icon-box-size) minmax(0, 1fr) auto;
      align-items: center;
      gap: var(--c-space-3);
    }
    .body {
      padding: 0 var(--c-space-3) var(--c-space-3);
      display: grid;
      gap: var(--c-card-gap);
    }
    .slider-row {
      display: grid;
      grid-template-columns: 64px minmax(0, 1fr) 34px;
      align-items: center;
      gap: var(--c-space-2);
    }
    .label {
      font-size: var(--c-font-sm);
      color: var(--secondary-text-color);
    }
    .value {
      font-size: var(--c-font-sm);
      text-align: right;
      color: var(--secondary-text-color);
      font-variant-numeric: tabular-nums;
    }
    input[type="range"] {
      width: 100%;
      min-width: 0;
      accent-color: var(--primary-color);
    }
    .actions {
      display: flex;
      gap: var(--c-space-1);
      justify-content: flex-end;
      flex-wrap: wrap;
    }
    .section {
      display: grid;
      gap: var(--c-space-3);
    }
    .section-title {
      display: flex;
      align-items: center;
      gap: var(--c-space-2);
      font-size: var(--c-font-base);
      font-weight: var(--c-font-weight-medium);
      color: var(--secondary-text-color);
    }
    .section-title:after {
      content: "";
      height: 1px;
      background: var(--divider-color);
      flex: 1;
    }
    .preset-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: var(--c-grid-gap);
    }
    .preset-btn {
      min-height: 38px;
      padding: 4px 8px;
      border: 1px solid var(--divider-color);
      border-radius: var(--c-radius-control);
      background: transparent;
      color: var(--primary-text-color);
      text-align: left;
      font-size: var(--c-font-base);
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .preset-btn:hover,
    .preset-btn:focus-visible {
      background: var(--c-muted-surface);
    }
    .preset-btn.active {
      border-color: color-mix(in srgb, var(--primary-color) 55%, var(--divider-color));
      background: var(--c-active-surface);
      color: var(--primary-color);
    }
    .fields {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: var(--c-space-3);
    }
    .field {
      display: grid;
      gap: var(--c-space-1);
      min-width: 0;
    }
    .field > span {
      font-size: var(--c-font-sm);
      color: var(--secondary-text-color);
      padding-left: 2px;
    }
    select {
      width: 100%;
      height: var(--c-button-height);
      min-width: 0;
      padding: 0 24px 0 8px;
      border: 1px solid var(--divider-color);
      border-radius: var(--c-radius-control);
      background: var(--card-background-color);
      font-size: var(--c-font-base);
      outline: none;
    }
    .fine {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: var(--c-space-3);
    }
    .fine-card {
      min-width: 0;
      padding: 6px 8px;
      border: 1px solid var(--divider-color);
      border-radius: var(--c-radius-control);
    }
    .fine-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--c-space-2);
      margin-bottom: var(--c-space-1);
    }
    .fine-head span,
    .fine-head output {
      font-size: var(--c-font-sm);
      color: var(--secondary-text-color);
    }
    .fine-head output {
      font-variant-numeric: tabular-nums;
    }
  `,
];
