import { css, CSSResultGroup } from "lit";
import {
  cardBaseStyles,
  rowStyles,
  iconBoxStyles,
  buttonStyles,
  controlStyles,
  sheetStyles,
} from "../../styles";

export const splitAcCardStyles: CSSResultGroup = [
  cardBaseStyles,
  rowStyles,
  iconBoxStyles,
  buttonStyles,
  controlStyles,
  sheetStyles,
  css`
    ha-card {
      container-type: inline-size;
      overflow: hidden;
    }
    .w {
      padding: var(--c-card-padding);
    }
    .hd {
      display: grid;
      grid-template-columns: minmax(0, 1fr) var(--c-button-height);
      align-items: center;
      gap: var(--c-space-3);
    }
    .hd.settings {
      grid-template-columns: minmax(0, 1fr) var(--c-button-height) var(--c-button-height);
      gap: var(--c-space-2);
    }
    .ct {
      margin-top: var(--c-space-3);
      padding-top: var(--c-space-3);
      border-top: 1px solid var(--divider-color);
    }
    .cr {
      display: grid;
      grid-template-columns: minmax(100px, 1fr) auto;
      align-items: center;
      gap: var(--c-space-5);
    }
    .cr.to {
      grid-template-columns: auto;
      justify-content: end;
    }
    .rv {
      font-size: var(--c-font-hero);
      line-height: 1;
      font-weight: var(--c-font-weight-medium);
      letter-spacing: -0.02em;
      font-variant-numeric: tabular-nums;
    }
    .ml {
      display: block;
      margin-top: var(--c-space-1);
      color: var(--secondary-text-color);
      font-size: var(--c-font-base);
      line-height: var(--c-line-height-normal);
    }
    .tc {
      min-height: 38px;
      display: grid;
      grid-template-columns: var(--c-button-height) minmax(70px, auto) var(--c-button-height);
      align-items: center;
      border: 1px solid var(--c-card-border-color);
      border-radius: var(--c-radius-control);
      background: transparent;
      overflow: hidden;
    }
    .tb {
      width: var(--c-button-height);
      height: 38px;
      padding: 0;
      display: grid;
      place-items: center;
    }
    .tp {
      min-width: 0;
      padding: 0 var(--c-space-2);
      text-align: center;
    }
    .tv {
      font-size: var(--c-font-xl);
      line-height: var(--c-line-height-tight);
      font-weight: var(--c-font-weight-medium);
      font-variant-numeric: tabular-nums;
    }
    .ts {
      margin-top: 2px;
      color: var(--secondary-text-color);
      font-size: var(--c-font-sm);
      line-height: var(--c-line-height-tight);
      white-space: nowrap;
    }
    .os,
    .uv {
      font-size: var(--c-font-base);
      line-height: 1.3;
      color: var(--secondary-text-color);
    }
    .as {
      display: flex;
      flex-wrap: wrap;
      gap: var(--c-card-gap);
      margin-top: var(--c-space-3);
    }
    .a {
      min-width: 0;
      min-height: var(--c-button-height);
      flex: 1 1 100px;
      padding: 0 var(--c-space-3);
      border: 1px solid var(--c-card-border-color);
      border-radius: var(--c-radius-control);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--c-space-2);
      color: var(--secondary-text-color);
    }
    .a ha-icon {
      --mdc-icon-size: var(--c-icon-size);
    }
    .al {
      min-width: 0;
      font-size: var(--c-font-base);
      font-weight: var(--c-font-weight-medium);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .a.av,
    .a[aria-expanded="true"] {
      color: var(--primary-color);
      background: var(--c-active-surface);
    }
    .pn {
      position: fixed;
      inset: 0;
      z-index: 1000;
      display: grid;
      place-items: center;
      overscroll-behavior: contain;
      padding: var(--c-space-6);
      background: var(--c-modal-scrim);
    }
    .pd {
      width: min(380px, calc(100vw - 32px));
      max-height: calc(100dvh - 32px);
      overflow: auto;
      overscroll-behavior: contain;
      padding: var(--c-card-padding);
      border: var(--c-card-border);
      border-radius: var(--c-radius-dialog);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      box-shadow: var(--c-dialog-shadow);
    }
    .ph {
      min-height: 38px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--c-space-5);
    }
    .pt {
      margin: 0;
      font-size: var(--c-font-hero);
      line-height: var(--c-line-height-normal);
      font-weight: var(--c-font-weight-medium);
    }
    .x {
      width: var(--c-button-icon-size);
      height: var(--c-button-icon-size);
      border-radius: var(--c-radius-control);
      display: grid;
      place-items: center;
    }
    .og + .og {
      margin-top: var(--c-space-4);
      padding-top: var(--c-space-4);
      border-top: 1px solid var(--divider-color);
    }
    .gt {
      margin: 0 4px var(--c-space-3);
      font-size: var(--c-font-base);
      font-weight: var(--c-font-weight-medium);
      color: var(--secondary-text-color);
    }
    .qs {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: var(--c-grid-gap);
    }
    .o {
      min-height: 42px;
      width: 100%;
      padding: 0 var(--c-space-4);
      border: 1px solid var(--c-card-border-color);
      border-radius: var(--c-radius-control);
      display: grid;
      grid-template-columns: 20px minmax(0, 1fr) 20px;
      align-items: center;
      gap: var(--c-space-3);
      text-align: left;
      background: transparent;
      font-size: var(--c-font-base);
      font-weight: var(--c-font-weight-medium);
    }
    .oi {
      color: var(--secondary-text-color);
    }
    .o[aria-selected="true"] {
      color: var(--primary-color);
      box-shadow: inset 0 0 0 1px var(--primary-color);
    }
    .o[aria-selected="true"] .oi {
      color: var(--primary-color);
    }
    .tpr {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: var(--c-grid-gap);
    }
    .tpr button,
    .tcu button,
    .tac button {
      min-height: var(--c-button-height);
      border: 1px solid var(--c-card-border-color);
      border-radius: var(--c-radius-control);
      background: transparent;
      font-size: var(--c-font-base);
      font-weight: var(--c-font-weight-medium);
    }
    .tpr button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--c-space-2);
    }
    .tcu {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: end;
      gap: var(--c-space-3);
      margin-top: var(--c-space-4);
    }
    .tcu label {
      font-size: var(--c-font-base);
      color: var(--secondary-text-color);
    }
    .tcu input {
      display: block;
      width: 100%;
      height: var(--c-button-height);
      margin-top: var(--c-space-2);
      padding: 0 var(--c-space-4);
      border: 1px solid var(--divider-color);
      border-radius: var(--c-radius-control);
      background: transparent;
    }
    .tcu button {
      padding: 0 var(--c-space-5);
      color: var(--primary-color);
    }
    .tac {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--c-grid-gap);
      margin-top: var(--c-space-4);
    }
    .tac button:first-child {
      color: var(--primary-color);
    }
    .tac button:last-child {
      color: var(--error-color);
    }
    .fb {
      font-size: var(--c-font-base);
      line-height: 1.35;
      color: var(--secondary-text-color);
    }
    .fb:not(:empty) {
      margin-top: var(--c-space-4);
    }
    .fb.er {
      color: var(--error-color);
    }
    @container (max-width: 400px) {
      .as .a {
        flex-basis: calc(50% - 4px);
      }
    }
    @container (max-width: 340px) {
      .cr {
        grid-template-columns: 1fr;
        justify-content: stretch;
      }
      .tc {
        width: 100%;
      }
    }
  `,
];
