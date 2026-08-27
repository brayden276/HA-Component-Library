import { css, CSSResultGroup } from "lit";
import { dashboardBaseCardStyles } from "../../utils/styles";

export const roomSheetCardStyles: CSSResultGroup = [
  dashboardBaseCardStyles,
  css`
    .wrap {
      padding: 0;
    }
    .head {
      padding: 13px 14px 11px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--divider-color);
    }
    .head-left {
      display: flex;
      align-items: center;
      gap: 9px;
    }
    .head-left ha-icon {
      color: var(--primary-color);
    }
    .close {
      width: 32px;
      height: 32px;
      border: 1px solid var(--dashboard-card-border-color, var(--divider-color)) !important;
      border-radius: var(--dashboard-radius-control, 5px) !important;
      color: var(--secondary-text-color);
      padding: 0 !important;
    }
    .body {
      padding: 8px 14px 12px;
    }
    .sep {
      display: flex;
      align-items: center;
      gap: 7px;
      margin: 8px 0 6px;
      font-size: 11px;
      font-weight: 600;
      color: var(--secondary-text-color);
    }
    .sep:after {
      content: "";
      height: 1px;
      background: var(--divider-color);
      flex: 1;
    }
    .row {
      appearance: none;
      width: 100%;
      border: 0;
      background: transparent;
      color: inherit;
      font: inherit;
      text-align: left;
      min-height: 46px;
      display: grid;
      grid-template-columns: 30px minmax(0, 1fr) auto;
      align-items: center;
      gap: 8px;
      border-radius: var(--dashboard-radius-control, 8px);
      cursor: pointer;
      padding: 0;
    }
    .row:active {
      background: var(--secondary-background-color);
    }
    .row:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }
    .row ha-icon {
      color: var(--primary-color);
      --mdc-icon-size: 18px;
    }
    .rname {
      font-size: 12px;
      font-weight: 600;
    }
    .rstate,
    .rvalue {
      font-size: 10.5px;
      color: var(--secondary-text-color);
    }
    .rvalue {
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .row:not(.actionable) {
      cursor: default;
    }
    .row:not(.actionable):active {
      background: transparent;
    }
    .close.preview-only {
      display: grid;
      place-items: center;
    }
  `,
];
