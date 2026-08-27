import { css, CSSResultGroup } from "lit";
import { dashboardBaseCardStyles } from "../../utils/styles";

export const wledCardStyles: CSSResultGroup = [
  dashboardBaseCardStyles,
  css`
    :host {
      display: block;
      min-width: 0;
    }
    * {
      box-sizing: border-box;
    }
    button,
    select,
    input {
      font: inherit;
      color: inherit;
    }
    ha-card {
      display: block;
      overflow: hidden;
    }
    .head {
      min-height: 58px;
      padding: 8px 8px 7px 10px;
      display: grid;
      grid-template-columns: 34px minmax(0, 1fr) auto;
      align-items: center;
      gap: 9px;
    }
    .ico {
      width: 34px;
      height: 34px;
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
    }
    .ico ha-icon {
      --mdc-icon-size: 20px;
    }
    .on .ico {
      color: var(--primary-color);
    }
    .identity {
      appearance: none;
      border: 0;
      background: transparent;
      min-width: 0;
      padding: 0;
      text-align: left;
      cursor: pointer;
    }
    .name,
    .status {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .name {
      font-size: 13px;
      line-height: 1.25;
      font-weight: 500;
    }
    .status {
      margin-top: 3px;
      font-size: 12px;
      line-height: 1.25;
      color: var(--secondary-text-color);
    }
    .power,
    .action,
    .close {
      appearance: none;
      border: 1px solid var(--divider-color);
      background: transparent;
      border-radius: var(--dashboard-radius-control, 8px);
      cursor: pointer;
    }
    .power {
      width: 44px;
      height: 44px;
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
    }
    .power ha-icon {
      --mdc-icon-size: 18px;
    }
    .on .power {
      color: var(--primary-color);
      background: color-mix(in srgb, var(--primary-color) 8%, transparent);
    }
    .body {
      padding: 0 10px 10px;
      display: grid;
      gap: 8px;
    }
    .slider-row {
      display: grid;
      grid-template-columns: 74px minmax(0, 1fr) 38px;
      align-items: center;
      gap: 8px;
    }
    .label {
      font-size: 11px;
      color: var(--secondary-text-color);
    }
    .value {
      font-size: 11px;
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
      gap: 6px;
      justify-content: flex-end;
      flex-wrap: wrap;
    }
    .action {
      min-height: 44px;
      padding: 0 9px;
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 11.5px;
      color: var(--secondary-text-color);
    }
    .action ha-icon {
      --mdc-icon-size: 15px;
    }
    .action:hover,
    .action:focus-visible {
      color: var(--primary-text-color);
      background: var(
        --dashboard-card-muted-surface,
        var(--secondary-background-color)
      );
    }
    dialog {
      width: min(620px, calc(100vw - 24px));
      max-height: min(760px, calc(100dvh - 24px));
      padding: 0;
      margin: auto;
      border: var(--dashboard-card-border, 1px solid var(--divider-color));
      border-radius: var(--dashboard-radius-dialog, 10px);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      box-shadow: var(
        --dashboard-dialog-shadow,
        0 16px 48px rgba(0, 0, 0, 0.22)
      );
      overflow: hidden;
    }
    dialog::backdrop {
      background: var(--dashboard-modal-scrim, rgba(0, 0, 0, 0.16));
      backdrop-filter: blur(3px);
    }
    .sheet {
      display: flex;
      flex-direction: column;
      max-height: min(760px, calc(100dvh - 24px));
    }
    .sheet-head {
      min-height: 54px;
      padding: 5px 7px 5px 14px;
      display: flex;
      align-items: center;
      gap: 9px;
      border-bottom: 1px solid var(--divider-color);
    }
    .sheet-head ha-icon {
      --mdc-icon-size: 18px;
      color: var(--secondary-text-color);
    }
    .sheet-title {
      min-width: 0;
      flex: 1;
    }
    .sheet-name {
      font-size: 14px;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .sheet-state {
      margin-top: 2px;
      font-size: 11.5px;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .close {
      width: 44px;
      height: 44px;
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
      border-color: transparent;
    }
    .close ha-icon {
      --mdc-icon-size: 18px;
    }
    .sheet-body {
      overflow: auto;
      overscroll-behavior: contain;
      padding: 12px 14px max(14px, env(safe-area-inset-bottom));
      display: grid;
      gap: 16px;
    }
    .section {
      display: grid;
      gap: 8px;
    }
    .section-title {
      display: flex;
      align-items: center;
      gap: 7px;
      font-size: 12px;
      font-weight: 500;
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
      gap: 6px;
    }
    .preset-btn {
      appearance: none;
      min-height: 44px;
      padding: 6px 9px;
      border: 1px solid var(--divider-color);
      border-radius: var(--dashboard-radius-control, 8px);
      background: transparent;
      color: var(--primary-text-color);
      text-align: left;
      font-size: 12px;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .preset-btn:hover,
    .preset-btn:focus-visible {
      background: var(
        --dashboard-card-muted-surface,
        var(--secondary-background-color)
      );
    }
    .preset-btn.active {
      border-color: color-mix(
        in srgb,
        var(--primary-color) 55%,
        var(--divider-color)
      );
      background: color-mix(in srgb, var(--primary-color) 8%, transparent);
      color: var(--primary-color);
    }
    .fields {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
    .field {
      display: grid;
      gap: 4px;
      min-width: 0;
    }
    .field > span {
      font-size: 11px;
      color: var(--secondary-text-color);
      padding-left: 2px;
    }
    select {
      width: 100%;
      height: 44px;
      min-width: 0;
      padding: 0 28px 0 9px;
      border: 1px solid var(--divider-color);
      border-radius: var(--dashboard-radius-control, 8px);
      background: var(--card-background-color);
      font-size: 12px;
      outline: none;
    }
    .fine {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
    .fine-card {
      min-width: 0;
      padding: 8px 9px;
      border: 1px solid var(--divider-color);
      border-radius: var(--dashboard-radius-control, 8px);
    }
    .fine-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
      margin-bottom: 4px;
    }
    .fine-head span,
    .fine-head output {
      font-size: 11px;
      color: var(--secondary-text-color);
    }
    .fine-head output {
      font-variant-numeric: tabular-nums;
    }
    .native {
      display: flex;
      justify-content: flex-end;
    }
    :is(button, select, input):focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    button:disabled,
    select:disabled,
    input:disabled {
      opacity: 0.45;
      cursor: default;
    }
    @media (max-width: 520px) {
      dialog {
        width: 100vw;
        max-width: 100vw;
        height: 88dvh;
        max-height: 88dvh;
        margin: auto 0 0;
        border-width: 1px 0 0;
        border-radius: var(--dashboard-radius-dialog, 8px)
          var(--dashboard-radius-dialog, 8px) 0 0;
      }
      .sheet {
        height: 88dvh;
        max-height: 88dvh;
      }
      .sheet-body {
        padding: 10px 12px max(18px, env(safe-area-inset-bottom));
      }
      .preset-grid {
        grid-template-columns: 1fr;
      }
      .fields,
      .fine {
        grid-template-columns: 1fr;
      }
      .body {
        padding-left: 9px;
        padding-right: 9px;
      }
      .head {
        padding-left: 8px;
      }
      .slider-row {
        grid-template-columns: 68px minmax(0, 1fr) 36px;
      }
      .actions {
        justify-content: stretch;
      }
      .actions .action {
        flex: 1;
        justify-content: center;
      }
    }
  `,
];
