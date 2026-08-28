import { css, CSSResultGroup } from "lit";

export const cameraCardStyles: CSSResultGroup = css`
  :host {
    display: block;
    min-width: 0;
  }
  * {
    box-sizing: border-box;
  }
  button {
    font: inherit;
    color: inherit;
  }
  ha-card {
    display: block;
    border: var(--dashboard-card-border, 1px solid var(--divider-color));
    border-radius: var(--dashboard-radius-card, 8px);
    background: var(--dashboard-card-surface, var(--card-background-color));
    box-shadow: none;
    color: var(--primary-text-color);
    overflow: hidden;
  }
  .row {
    min-height: 62px;
    padding: 8px 9px 8px 10px;
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
  .activity .ico {
    color: var(--primary-color);
  }
  .offline .ico {
    color: var(--disabled-text-color, var(--secondary-text-color));
  }
  .identity {
    appearance: none;
    border: 0;
    background: transparent;
    padding: 0;
    min-width: 0;
    text-align: left;
    cursor: pointer;
  }
  .name,
  .state {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .name {
    font-size: 13px;
    font-weight: 500;
    line-height: 1.25;
  }
  .state {
    margin-top: 3px;
    font-size: 12px;
    color: var(--secondary-text-color);
    line-height: 1.25;
  }
  .actions {
    display: flex;
    gap: 6px;
  }
  .action,
  .close,
  .switchbtn,
  .maint {
    appearance: none;
    border: 1px solid var(--divider-color);
    background: transparent;
    border-radius: var(--dashboard-radius-control, 8px);
    cursor: pointer;
  }
  .action {
    min-height: 38px;
    padding: 0 9px;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 11.5px;
    color: var(--secondary-text-color);
  }
  .action ha-icon {
    --mdc-icon-size: 16px;
  }
  .action:hover,
  .action:focus-visible {
    background: var(--dashboard-card-muted-surface, var(--secondary-background-color));
    color: var(--primary-text-color);
  }
  button:disabled {
    opacity: 0.4;
    cursor: default;
  }
  dialog {
    width: min(560px, calc(100vw - 24px));
    max-height: min(720px, calc(100dvh - 24px));
    padding: 0;
    margin: auto;
    border: var(--dashboard-card-border, 1px solid var(--divider-color));
    border-radius: var(--dashboard-radius-dialog, 10px);
    background: var(--card-background-color);
    color: var(--primary-text-color);
    box-shadow: var(--dashboard-dialog-shadow, 0 16px 48px rgba(0, 0, 0, 0.22));
    overflow: hidden;
  }
  dialog::backdrop {
    background: var(--dashboard-modal-scrim, rgba(0, 0, 0, 0.16));
    backdrop-filter: blur(3px);
  }
  .sheet {
    display: flex;
    flex-direction: column;
    max-height: min(720px, calc(100dvh - 24px));
  }
  .head {
    min-height: 54px;
    padding: 6px 7px 6px 14px;
    display: flex;
    align-items: center;
    gap: 9px;
    border-bottom: 1px solid var(--divider-color);
  }
  .head > ha-icon {
    --mdc-icon-size: 18px;
    color: var(--secondary-text-color);
  }
  .title {
    min-width: 0;
    flex: 1;
  }
  .sheet-name,
  .sheet-state {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .sheet-name {
    font-size: 14px;
    font-weight: 500;
  }
  .sheet-state {
    margin-top: 2px;
    font-size: 11.5px;
    color: var(--secondary-text-color);
  }
  .close {
    width: 40px;
    height: 40px;
    border-color: transparent;
    display: grid;
    place-items: center;
    color: var(--secondary-text-color);
  }
  .close ha-icon {
    --mdc-icon-size: 18px;
  }
  .body {
    overflow: auto;
    overscroll-behavior: contain;
    padding: 12px 14px max(14px, env(safe-area-inset-bottom));
    display: grid;
    gap: 16px;
  }
  .section {
    display: grid;
    gap: 7px;
  }
  .section[hidden] {
    display: none;
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
  .control,
  .detect,
  .maintenance {
    min-height: 46px;
    padding: 5px 6px 5px 10px;
    border: 1px solid var(--divider-color);
    border-radius: var(--dashboard-radius-control, 8px);
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 8px;
  }
  .copy {
    min-width: 0;
  }
  .ctl-name,
  .ctl-state {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ctl-name {
    font-size: 12.5px;
  }
  .ctl-state {
    margin-top: 2px;
    font-size: 11px;
    color: var(--secondary-text-color);
  }
  .detect.on {
    border-color: color-mix(in srgb, var(--primary-color) 42%, var(--divider-color));
  }
  .detect .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--divider-color);
  }
  .detect.on .dot {
    background: var(--primary-color);
  }
  .switchbtn {
    min-width: 58px;
    height: 34px;
    padding: 0 9px;
    font-size: 11px;
    color: var(--secondary-text-color);
  }
  .switchbtn.on {
    color: var(--primary-color);
    border-color: color-mix(in srgb, var(--primary-color) 45%, var(--divider-color));
    background: color-mix(in srgb, var(--primary-color) 7%, transparent);
  }
  .maint {
    grid-template-columns: minmax(0, 1fr) auto;
  }
  .maint button {
    min-width: 78px;
    height: 34px;
    padding: 0 9px;
  }
  .maint button.confirm {
    border-color: var(--warning-color, var(--primary-color));
    color: var(--warning-color, var(--primary-color));
  }
  :is(button):focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
  @media (max-width: 520px) {
    .row {
      grid-template-columns: 34px minmax(0, 1fr) auto;
      padding-left: 8px;
    }
    .actions .action span {
      display: none;
    }
    .action {
      width: 40px;
      padding: 0;
      justify-content: center;
    }
    dialog {
      width: 100vw;
      max-width: 100vw;
      height: 88dvh;
      max-height: 88dvh;
      margin: auto 0 0;
      border-width: 1px 0 0;
      border-radius: 8px 8px 0 0;
    }
    .sheet {
      height: 88dvh;
      max-height: 88dvh;
    }
    .body {
      padding: 10px 12px max(18px, env(safe-area-inset-bottom));
    }
  }
`;

