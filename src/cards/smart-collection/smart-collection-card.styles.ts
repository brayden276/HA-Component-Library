import { css, CSSResultGroup } from "lit";
import { dashboardBaseCardStyles } from "../../utils/styles";

export const smartCollectionCardStyles: CSSResultGroup = [
  dashboardBaseCardStyles,
  css`
    :host {
      display: block;
      min-width: 0;
    }
    * {
      box-sizing: border-box;
    }
    [hidden] {
      display: none !important;
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
    .heading {
      display: flex;
      align-items: center;
      gap: 7px;
      min-width: 0;
    }
    .heading ha-icon {
      color: var(--secondary-text-color);
      --mdc-icon-size: 17px;
    }
    .heading h2 {
      margin: 0;
      font-size: 15px;
      line-height: 1.2;
      font-weight: 500;
    }
    .edit {
      appearance: none;
      width: 44px;
      height: 44px;
      border: 0;
      border-radius: var(--dashboard-radius-control, 8px);
      background: transparent;
      color: var(--secondary-text-color);
      display: grid;
      place-items: center;
      cursor: pointer;
    }
    .edit ha-icon {
      --mdc-icon-size: 16px;
    }
    .edit:hover,
    .edit:focus-visible {
      background: var(
        --dashboard-card-muted-surface,
        var(--secondary-background-color)
      );
      color: var(--primary-text-color);
    }
    .head.sep {
      min-height: 30px;
      margin: 2px 0 6px;
    }
    .head.sep .heading {
      flex: 1;
    }
    .head.sep .heading h2 {
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text-color);
    }
    .head.sep .heading ha-icon {
      display: none;
    }
    .head.sep .heading:after {
      content: "";
      height: 1px;
      background: var(--divider-color);
      flex: 1;
    }
    .body {
      display: grid;
      gap: 8px;
      min-width: 0;
    }
    .empty {
      min-height: 44px;
      padding: 8px 10px;
      border: var(--dashboard-card-border, 1px solid var(--divider-color));
      border-radius: var(--dashboard-radius-card, 8px);
      color: var(--secondary-text-color);
      font-size: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .empty ha-icon {
      color: var(--secondary-text-color);
      --mdc-icon-size: 17px;
    }
  `,
];
