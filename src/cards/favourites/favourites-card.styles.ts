import { css, CSSResultGroup } from "lit";
import { dashboardBaseCardStyles } from "../../utils/styles";

export const favouritesCardStyles: CSSResultGroup = [
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
    button,
    input {
      font: inherit;
      color: inherit;
    }
    button {
      appearance: none;
      border: 0;
      cursor: pointer;
    }
    ha-card {
      border: 0;
      box-shadow: none;
      background: transparent;
      overflow: visible;
      color: var(--primary-text-color);
    }
    .wrap {
      padding: 0;
    }
    .head {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 8px;
    }
    .heading {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
    }
    .heading ha-icon {
      color: var(--primary-color);
      --mdc-icon-size: 19px;
    }
    .heading h2 {
      margin: 0;
      font-size: 18px;
      line-height: 1.2;
      font-weight: 650;
    }
    .edit {
      min-width: 44px;
      min-height: 44px;
      padding: 0 10px;
      border-radius: var(--dashboard-radius-control, 8px);
      background: transparent;
      color: var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      font-size: 13px;
      font-weight: 600;
    }
    .edit:hover,
    .edit:focus-visible {
      background: var(
        --dashboard-card-muted-surface,
        var(--secondary-background-color)
      );
    }
    .edit ha-icon {
      --mdc-icon-size: 18px;
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
      min-height: 52px;
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      border: var(--dashboard-card-border, 1px solid var(--divider-color));
      border-radius: var(--dashboard-radius-card, 6px);
      background: var(--dashboard-card-surface, var(--card-background-color));
      overflow: hidden;
    }
    .main {
      min-width: 0;
      min-height: 52px;
      padding: 6px 8px;
      text-align: left;
      background: transparent;
      display: grid;
      grid-template-columns: 32px minmax(0, 1fr);
      align-items: center;
      gap: 8px;
    }
    .item.has-quick .main {
      padding-right: 4px;
    }
    .main:active,
    .quick:active {
      background: color-mix(in srgb, var(--primary-color) 10%, transparent);
    }
    .main:focus-visible,
    .quick:focus-visible,
    .edit:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }
    .icon {
      width: 32px;
      height: 32px;
      display: grid;
      place-items: center;
      border-radius: var(--dashboard-radius-icon, 6px);
      background: transparent;
      color: var(--primary-color);
    }
    .icon ha-icon {
      --mdc-icon-size: 20px;
    }
    .copy {
      min-width: 0;
    }
    .name,
    .state {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .name {
      font-size: 13px;
      font-weight: 650;
    }
    .state {
      margin-top: 2px;
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    .item.active {
      background: var(--dashboard-active-surface, var(--card-background-color));
      box-shadow: inset 2px 0 0 var(--primary-color);
    }
    .item.active .icon {
      background: transparent;
      color: var(--primary-color);
    }
    .item.active .state {
      color: var(--primary-color);
      font-weight: 600;
    }
    .item.unavailable {
      opacity: 0.55;
    }
    .quick {
      width: 44px;
      min-height: 52px;
      padding: 0;
      border-left: 1px solid
        var(--dashboard-card-border-color, var(--divider-color));
      background: transparent;
      color: var(--primary-color);
      display: grid;
      place-items: center;
    }
    .quick ha-icon {
      --mdc-icon-size: 21px;
    }
    .empty,
    .load-error {
      grid-column: 1 / -1;
      min-height: 44px;
      padding: 9px 11px;
      border: 1px dashed
        var(--dashboard-card-border-color, var(--divider-color));
      border-radius: var(--dashboard-radius-card, 6px);
      background: transparent;
      color: var(--secondary-text-color);
      font-size: 13px;
      line-height: 1.35;
    }
    @media (max-width: 420px) {
      .head {
        margin-bottom: 6px;
      }
      .edit span {
        display: none;
      }
      .edit {
        padding: 0;
      }
      .grid {
        gap: 8px;
      }
      .main {
        padding: 6px;
      }
    }
  `,
];
