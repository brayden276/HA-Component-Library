import { css, CSSResultGroup } from "lit";
import {
  cardBaseStyles,
  surfaceStyles,
  typographyStyles,
  buttonStyles,
  iconButtonStyles,
  iconWellStyles,
  controlStyles,
  separatorStyles,
  dialogStyles,
  assemblyStyles,
} from "../../styles";

export const splitAcCardStyles: CSSResultGroup = [
  cardBaseStyles,
  surfaceStyles,
  typographyStyles,
  buttonStyles,
  iconButtonStyles,
  iconWellStyles,
  controlStyles,
  separatorStyles,
  dialogStyles,
  assemblyStyles,
  css`
    ha-card {
      container-type: inline-size;
    }
    .w {
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .hd {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 44px;
      align-items: center;
      gap: 12px;
    }
    .hd.settings {
      grid-template-columns: minmax(0, 1fr) 44px 44px;
      gap: 8px;
    }
    .idn {
      min-width: 0;
      min-height: 44px;
      padding: 0;
      display: grid;
      grid-template-columns: 40px minmax(0, 1fr);
      align-items: center;
      gap: 12px;
      text-align: left;
      border-radius: var(--dashboard-radius-control);
    }
    .iw {
      width: 40px;
      height: 40px;
      border-radius: var(--dashboard-radius-icon);
      display: grid;
      place-items: center;
      background: transparent;
      color: var(--primary-color);
    }
    .iw.control-radius {
      border-radius: var(--dashboard-radius-control);
      background: var(--secondary-background-color);
    }
    ha-icon {
      --mdc-icon-size: 20px;
    }
    .cp {
      min-width: 0;
    }
    .nm,
    .st {
      display: block;
    }
    .nm {
      font-size: 13px;
      line-height: 1.25;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--primary-text-color);
    }
    .st {
      margin-top: 3px;
      font-size: 12px;
      line-height: 1.25;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .pw {
      width: 44px;
      height: 44px;
      padding: 0;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: transparent;
      color: var(--secondary-text-color);
      display: grid;
      place-items: center;
    }
    .pw:hover {
      background: var(--dashboard-card-muted-surface);
      color: var(--primary-text-color);
    }
    .pw.on {
      color: var(--primary-color);
    }
    button[disabled],
    button[aria-disabled="true"] {
      opacity: 0.45;
      cursor: default;
    }
    .ct {
      margin-top: 0;
      padding-top: 12px;
      border-top: 1px solid var(--divider-color);
    }
    .cr {
      display: grid;
      grid-template-columns: minmax(120px, 1fr) auto;
      align-items: center;
      gap: 16px;
    }
    .cr.to {
      grid-template-columns: auto;
      justify-content: end;
    }
    .rv {
      font-size: 20px;
      line-height: 1;
      font-weight: 550;
      letter-spacing: -0.02em;
      font-variant-numeric: tabular-nums;
      color: var(--primary-text-color);
    }
    .ml {
      display: block;
      margin-top: 4px;
      color: var(--secondary-text-color);
      font-size: 12px;
      line-height: 1.25;
    }
    .tc {
      min-height: 48px;
      display: inline-grid;
      grid-template-columns: 44px minmax(82px, auto) 44px;
      align-items: center;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: transparent;
      overflow: hidden;
    }
    .tb {
      width: 44px;
      height: 48px;
      padding: 0;
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
      background: transparent;
      border: 0;
    }
    .tb:hover {
      background: var(--dashboard-card-muted-surface);
      color: var(--primary-text-color);
    }
    .tp {
      min-width: 0;
      padding: 0 8px;
      text-align: center;
    }
    .tv {
      font-size: 15px;
      line-height: 1.1;
      font-weight: 550;
      font-variant-numeric: tabular-nums;
    }
    .ts {
      margin-top: 3px;
      color: var(--secondary-text-color);
      font-size: 11.5px;
      line-height: 1.1;
      white-space: nowrap;
    }
    .os,
    .uv {
      font-size: 12.5px;
      line-height: 1.35;
      color: var(--secondary-text-color);
    }
    .as {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 0;
    }
    .a {
      min-width: 0;
      min-height: 44px;
      flex: 1 1 110px;
      padding: 0 10px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      color: var(--secondary-text-color);
      background: transparent;
    }
    .a:hover {
      background: var(--dashboard-card-muted-surface);
      color: var(--primary-text-color);
    }
    .a ha-icon {
      --mdc-icon-size: 18px;
    }
    .al {
      min-width: 0;
      font-size: 12.5px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .a.av,
    .a[aria-expanded="true"] {
      color: var(--primary-color);
      background: var(--dashboard-active-surface);
    }
    .pn {
      position: fixed;
      inset: 0;
      z-index: 1000;
      display: grid;
      place-items: center;
      overscroll-behavior: contain;
      padding: 16px;
      background: var(--dashboard-modal-scrim);
    }
    .pd {
      width: min(380px, calc(100vw - 32px));
      max-height: calc(100dvh - 32px);
      overflow: auto;
      overscroll-behavior: contain;
      padding: 12px 16px 16px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-dialog);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      box-shadow: var(--dashboard-dialog-shadow);
    }
    .ph {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      border-bottom: 1px solid var(--divider-color);
      padding-bottom: 8px;
      margin-bottom: 12px;
    }
    .pt {
      margin: 0;
      font-size: 15px;
      line-height: 1.2;
      font-weight: 650;
    }
    .x {
      width: 32px;
      height: 32px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
      background: transparent;
    }
    .x:hover {
      background: var(--dashboard-card-muted-surface);
      color: var(--primary-text-color);
    }
    .og + .og {
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid var(--divider-color);
    }
    .gt {
      margin: 0 4px 8px;
      font-size: 11.5px;
      font-weight: 650;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .qs {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
    .o {
      min-height: 48px;
      width: 100%;
      padding: 0 12px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      display: grid;
      grid-template-columns: 20px minmax(0, 1fr) 20px;
      align-items: center;
      gap: 8px;
      text-align: left;
      background: transparent;
      font-size: 13px;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .o:hover {
      background: var(--dashboard-card-muted-surface);
    }
    .oi {
      color: var(--secondary-text-color);
    }
    .o[aria-selected="true"] {
      color: var(--primary-color);
      border-color: var(--primary-color);
      background: var(--dashboard-active-surface);
    }
    .o[aria-selected="true"] .oi {
      color: var(--primary-color);
    }
    .tpr {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
    }
    .tpr button,
    .tcu button,
    .tac button {
      min-height: 44px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: transparent;
      font-size: 13px;
      font-weight: 650;
    }
    .tpr button:hover,
    .tcu button:hover,
    .tac button:hover {
      background: var(--dashboard-card-muted-surface);
    }
    .tpr button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    .tcu {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: end;
      gap: 8px;
      margin-top: 12px;
    }
    .tcu label {
      font-size: 12.5px;
      color: var(--secondary-text-color);
    }
    .tcu input {
      display: block;
      width: 100%;
      height: 44px;
      margin-top: 6px;
      padding: 0 12px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: var(--dashboard-card-surface);
      color: var(--primary-text-color);
      font-size: 13px;
    }
    .tcu button {
      padding: 0 14px;
      color: var(--primary-color);
    }
    .tac {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-top: 12px;
    }
    .tac button:first-child {
      color: var(--primary-color);
    }
    .tac button:last-child {
      color: var(--error-color);
    }
    .fb {
      font-size: 12px;
      line-height: 1.35;
      color: var(--secondary-text-color);
    }
    .fb:not(:empty) {
      margin-top: 10px;
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
