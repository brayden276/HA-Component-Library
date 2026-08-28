import { css, CSSResultGroup } from "lit";
import { cardBaseStyles, typographyStyles, buttonStyles, iconWellStyles, separatorStyles } from "../../styles";

export const roomSheetCardStyles: CSSResultGroup = [
  cardBaseStyles,
  typographyStyles,
  buttonStyles,
  iconWellStyles,
  separatorStyles,
  css`
    .wrap {
      padding: 0;
    }
    .head {
      padding: 12px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--divider-color);
    }
    .head-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .head-left ha-icon {
      color: var(--primary-color);
      --mdc-icon-size: 20px;
    }
    .head h2 {
      font-size: 15px;
      font-weight: 650;
      color: var(--primary-text-color);
    }
    .close {
      width: 32px;
      height: 32px;
      border: var(--dashboard-card-border) !important;
      border-radius: var(--dashboard-radius-control) !important;
      color: var(--secondary-text-color);
      padding: 0 !important;
      display: grid;
      place-items: center;
      cursor: pointer;
    }
    .close:hover {
      background: var(--dashboard-card-muted-surface);
      color: var(--primary-text-color);
    }
    .body {
      padding: 10px 16px 14px;
    }
    .sep {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 10px 0 8px;
      font-size: 11.5px;
      font-weight: 650;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.04em;
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
      min-height: 44px;
      display: grid;
      grid-template-columns: 32px minmax(0, 1fr) auto;
      align-items: center;
      gap: 10px;
      border-radius: var(--dashboard-radius-control);
      cursor: pointer;
      padding: 6px 8px;
    }
    .row:hover {
      background: var(--dashboard-card-muted-surface);
    }
    .row:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    .row ha-icon {
      color: var(--primary-color);
      --mdc-icon-size: 18px;
    }
    .rname {
      font-size: 13px;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .rstate,
    .rvalue {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .rvalue {
      font-weight: 600;
      color: var(--primary-text-color);
      font-variant-numeric: tabular-nums;
    }
    .row:not(.actionable) {
      cursor: default;
    }
    .row:not(.actionable):hover {
      background: transparent;
    }
  `,
];
