import { css, CSSResultGroup } from "lit";
import { globalTokens } from "./tokens";

/**
 * Base card styles applied across all component cards.
 */
export const cardBaseStyles: CSSResultGroup = [
  globalTokens,
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
    input,
    select {
      font: inherit;
      color: inherit;
    }
    button {
      appearance: none;
      border: 0;
      background: transparent;
      padding: 0;
      cursor: pointer;
    }
    button:disabled,
    input:disabled,
    select:disabled {
      opacity: 0.45;
      cursor: default;
    }
    :is(button, input, select):focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    ha-card {
      overflow: hidden;
      border: var(--c-card-border);
      border-radius: var(--c-radius-card);
      background: var(--c-card-surface);
      box-shadow: none;
      color: var(--primary-text-color);
    }
  `,
];

/**
 * Shared header styles for card headers, section titles, and edit buttons.
 */
export const headerStyles = css`
  .head {
    min-height: var(--c-head-min-height);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--c-space-2);
    margin-bottom: var(--c-space-1);
    padding: 0 2px;
  }
  .heading {
    display: flex;
    align-items: center;
    gap: var(--c-space-2);
    min-width: 0;
  }
  .heading ha-icon {
    color: var(--secondary-text-color);
    --mdc-icon-size: var(--c-icon-sm-size);
  }
  .heading h2 {
    margin: 0;
    font-size: var(--c-font-lg);
    line-height: var(--c-line-height-normal);
    font-weight: var(--c-font-weight-medium);
  }
  .head.sep {
    min-height: 26px;
    margin: 2px 0 4px;
  }
  .head.sep .heading {
    flex: 1;
  }
  .head.sep .heading h2 {
    font-size: var(--c-font-base);
    font-weight: var(--c-font-weight-medium);
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
  .edit {
    width: var(--c-button-icon-size);
    height: var(--c-button-icon-size);
    border-radius: var(--c-radius-control);
    color: var(--secondary-text-color);
    display: grid;
    place-items: center;
  }
  .edit ha-icon {
    --mdc-icon-size: var(--c-icon-sm-size);
  }
  .edit:hover,
  .edit:focus-visible {
    background: var(--c-muted-surface);
    color: var(--primary-text-color);
  }
`;

/**
 * Shared row and identity typography styles.
 */
export const rowStyles = css`
  .row {
    width: 100%;
    text-align: left;
  }
  .wrap {
    min-height: var(--c-row-min-height);
    padding: var(--c-card-padding);
    display: grid;
    grid-template-columns: var(--c-icon-box-size) minmax(0, 1fr) auto;
    align-items: center;
    gap: var(--c-space-3);
  }
  .identity {
    min-width: 0;
    min-height: 32px;
    padding: 0;
    display: flex;
    align-items: center;
    gap: var(--c-space-3);
    text-align: left;
  }
  .copy {
    min-width: 0;
  }
  .name,
  .title {
    display: block;
    font-size: var(--c-font-md);
    line-height: var(--c-line-height-normal);
    font-weight: var(--c-font-weight-medium);
    color: var(--primary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .state,
  .desc,
  .status {
    display: block;
    margin-top: 2px;
    font-size: var(--c-font-sm);
    line-height: var(--c-line-height-normal);
    font-weight: var(--c-font-weight-normal);
    color: var(--secondary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

/**
 * Standardized icon box styles.
 */
export const iconBoxStyles = css`
  .icon,
  .ico,
  .iw,
  .well {
    width: var(--c-icon-box-size);
    height: var(--c-icon-box-size);
    display: grid;
    place-items: center;
    border-radius: var(--c-radius-icon);
    background: transparent;
    color: var(--primary-color);
    flex-shrink: 0;
  }
  .icon ha-icon,
  .ico ha-icon,
  .iw ha-icon,
  .well ha-icon,
  ha-icon {
    --mdc-icon-size: var(--c-icon-size);
  }
`;

/**
 * Standardized button & action pill styles.
 */
export const buttonStyles = css`
  .action,
  .btn,
  .pw,
  .quick,
  .close {
    border: 1px solid var(--c-card-border-color);
    border-radius: var(--c-radius-control);
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--c-space-2);
    font-size: var(--c-font-base);
    font-weight: var(--c-font-weight-medium);
    color: var(--secondary-text-color);
    transition: background 0.12s, color 0.12s, border-color 0.12s;
  }
  .action {
    min-height: var(--c-button-sm-height);
    padding: 0 8px;
    color: var(--primary-color);
  }
  .pw,
  .close {
    width: var(--c-button-height);
    height: var(--c-button-height);
    padding: 0;
  }
  .pw.on {
    color: var(--primary-color);
    background: var(--c-active-surface);
  }
  .action:hover,
  .btn:hover,
  .pw:hover,
  .close:hover {
    background: var(--c-muted-surface);
    color: var(--primary-text-color);
  }
`;

/**
 * Standardized control controls: switch, slider, stepper.
 */
export const controlStyles = css`
  .switch {
    width: var(--c-switch-width);
    height: var(--c-switch-height);
    border-radius: var(--c-radius-control);
    background: var(--divider-color);
    padding: 2px;
    box-sizing: border-box;
    cursor: pointer;
  }
  .switch span {
    display: block;
    width: var(--c-switch-knob-size);
    height: var(--c-switch-knob-size);
    border-radius: 50%;
    background: var(--secondary-text-color);
    transition: margin 0.12s, background 0.12s;
  }
  .switch.on {
    background: color-mix(in srgb, var(--primary-color) 35%, var(--divider-color));
  }
  .switch.on span {
    margin-left: 14px;
    background: var(--primary-color);
  }
  .slider {
    width: var(--c-slider-width);
    height: var(--c-slider-height);
    border-radius: var(--c-radius-control);
    background: var(--divider-color);
    overflow: hidden;
  }
  .slider span {
    display: block;
    height: 100%;
    background: var(--primary-color);
    border-radius: var(--c-radius-control);
  }
  .metric {
    font-size: var(--c-font-base);
    font-weight: var(--c-font-weight-medium);
  }
`;

/**
 * Standardized modal sheet dialog styles.
 */
export const sheetStyles = css`
  dialog {
    width: min(720px, calc(100vw - 24px));
    height: min(760px, calc(100dvh - 32px));
    min-height: min(560px, calc(100dvh - 32px));
    margin: auto;
    padding: 0;
    border: var(--c-card-border);
    border-radius: var(--c-radius-dialog);
    background: var(--card-background-color);
    color: var(--primary-text-color);
    box-shadow: var(--c-dialog-shadow);
    overflow: hidden;
  }
  dialog::backdrop {
    background: var(--c-modal-scrim);
    backdrop-filter: blur(3px);
  }
  .sheet {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .sheet-head {
    flex: 0 0 auto;
    min-height: 42px;
    padding: 4px 8px;
    display: flex;
    align-items: center;
    gap: var(--c-space-3);
    border-bottom: 1px solid var(--divider-color);
  }
  .sheet-name,
  .sheet-title {
    font-size: var(--c-font-lg);
    line-height: var(--c-line-height-normal);
    font-weight: var(--c-font-weight-medium);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .sheet-body {
    flex: 1 1 auto;
    min-height: 0;
    overflow: auto;
    padding: var(--c-card-padding);
  }
  @media (max-width: 700px) {
    dialog {
      width: 100vw;
      max-width: 100vw;
      height: 92dvh;
      min-height: 92dvh;
      max-height: 92dvh;
      margin: auto 0 0;
      border-width: 1px 0 0;
      border-radius: var(--c-radius-dialog) var(--c-radius-dialog) 0 0;
    }
  }
`;
