import { css, CSSResultGroup } from "lit";

export const splitAcCardStyles: CSSResultGroup = css`
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
    background: transparent;
    cursor: pointer;
  }
  ha-card {
    container-type: inline-size;
    overflow: hidden;
    border: var(--dashboard-card-border, 1px solid var(--divider-color));
    border-radius: var(--dashboard-radius-card, var(--ha-card-border-radius, 6px));
    background: var(--dashboard-card-surface, var(--ha-card-background, var(--card-background-color)));
    box-shadow: none;
    color: var(--primary-text-color);
  }
  .w {
    padding: 12px 14px;
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
    border-radius: var(--dashboard-radius-control, 8px);
  }
  .iw {
    width: 40px;
    height: 40px;
    border-radius: var(--dashboard-radius-icon, 6px);
    display: grid;
    place-items: center;
    background: transparent;
    color: var(--primary-color);
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
    font-weight: 650;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .st {
    margin-top: 3px;
    font-size: 13px;
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
    border: 1px solid var(--dashboard-card-border-color, var(--divider-color));
    border-radius: var(--dashboard-radius-control, 5px);
    background: transparent;
    color: var(--secondary-text-color);
    display: grid;
    place-items: center;
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
    margin-top: 12px;
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
    font-size: 27px;
    line-height: 1;
    font-weight: 650;
    letter-spacing: -0.03em;
    font-variant-numeric: tabular-nums;
  }
  .ml {
    display: block;
    margin-top: 6px;
    color: var(--secondary-text-color);
    font-size: 13px;
    line-height: 1.2;
  }
  .tc {
    min-height: 48px;
    display: grid;
    grid-template-columns: 44px minmax(82px, auto) 44px;
    align-items: center;
    border: 1px solid var(--dashboard-card-border-color, var(--divider-color));
    border-radius: var(--dashboard-radius-control, 5px);
    background: transparent;
    overflow: hidden;
  }
  .tb {
    width: 44px;
    height: 48px;
    padding: 0;
    display: grid;
    place-items: center;
  }
  .tp {
    min-width: 0;
    padding: 0 8px;
    text-align: center;
  }
  .tv {
    font-size: 18px;
    line-height: 1.1;
    font-weight: 650;
    font-variant-numeric: tabular-nums;
  }
  .ts {
    margin-top: 3px;
    color: var(--secondary-text-color);
    font-size: 13px;
    line-height: 1.1;
    white-space: nowrap;
  }
  .os,
  .uv {
    font-size: 13px;
    line-height: 1.35;
    color: var(--secondary-text-color);
  }
  .as {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
  }
  .a {
    min-width: 0;
    min-height: 44px;
    flex: 1 1 118px;
    padding: 0 10px;
    border: 1px solid var(--dashboard-card-border-color, var(--divider-color));
    border-radius: var(--dashboard-radius-control, 5px);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    color: var(--secondary-text-color);
  }
  .a ha-icon {
    --mdc-icon-size: 18px;
  }
  .al {
    min-width: 0;
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .a.av,
  .a[aria-expanded="true"] {
    color: var(--primary-color);
    background: var(--dashboard-active-surface, var(--card-background-color));
  }
  .pn {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: grid;
    place-items: center;
    overscroll-behavior: contain;
    padding: 16px;
    background: var(--dashboard-modal-scrim, var(--ha-dialog-scrim-color, color-mix(in srgb, var(--primary-text-color) 32%, transparent)));
  }
  .pd {
    width: min(380px, calc(100vw - 32px));
    max-height: calc(100dvh - 32px);
    overflow: auto;
    overscroll-behavior: contain;
    padding: 12px 14px 14px;
    border: 1px solid var(--divider-color);
    border-radius: var(--dashboard-radius-dialog, 8px);
    background: var(--card-background-color);
    color: var(--primary-text-color);
    box-shadow: var(--dashboard-dialog-shadow, 0 16px 48px rgba(0, 0, 0, 0.22));
  }
  .ph {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  .pt {
    margin: 0;
    font-size: 18px;
    line-height: 1.2;
    font-weight: 650;
  }
  .x {
    width: 44px;
    height: 44px;
    border-radius: var(--dashboard-radius-control, 8px);
    display: grid;
    place-items: center;
  }
  .og + .og {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--divider-color);
  }
  .gt {
    margin: 0 4px 8px;
    font-size: 13px;
    font-weight: 650;
    color: var(--secondary-text-color);
  }
  .qs {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }
  .o {
    min-height: 50px;
    width: 100%;
    padding: 0 10px;
    border: 1px solid var(--dashboard-card-border-color, var(--divider-color));
    border-radius: var(--dashboard-radius-control, 5px);
    display: grid;
    grid-template-columns: 20px minmax(0, 1fr) 20px;
    align-items: center;
    gap: 8px;
    text-align: left;
    background: transparent;
    font-size: 13px;
    font-weight: 600;
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
    gap: 8px;
  }
  .tpr button,
  .tcu button,
  .tac button {
    min-height: 44px;
    border: 1px solid var(--dashboard-card-border-color, var(--divider-color));
    border-radius: var(--dashboard-radius-control, 5px);
    background: transparent;
    font-size: 13px;
    font-weight: 650;
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
    font-size: 13px;
    color: var(--secondary-text-color);
  }
  .tcu input {
    display: block;
    width: 100%;
    height: 44px;
    margin-top: 6px;
    padding: 0 11px;
    border: 1px solid var(--divider-color);
    border-radius: var(--dashboard-radius-control, 5px);
    background: transparent;
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
    font-size: 13px;
    line-height: 1.35;
    color: var(--secondary-text-color);
  }
  .fb:not(:empty) {
    margin-top: 10px;
  }
  .fb.er {
    color: var(--error-color);
  }
  :is(button, input):focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
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
`;

