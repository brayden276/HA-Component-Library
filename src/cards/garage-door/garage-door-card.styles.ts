import { css, CSSResultGroup } from "lit";

export const garageDoorCardStyles: CSSResultGroup = css`
  :host {
    display: block;
    min-width: 0;
  }
  * {
    box-sizing: border-box;
  }
  button {
    appearance: none;
    border: 0;
    background: transparent;
    font: inherit;
    color: inherit;
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
    border-left: 2px solid transparent;
  }
  .w:has(.well.not-closed) {
    border-left-color: var(
      --warning-color,
      var(--state-cover-open-color, var(--primary-color))
    );
    background: var(
      --dashboard-warning-surface,
      var(--card-background-color)
    );
  }
  .row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 12px;
    align-items: center;
  }
  .identity {
    min-width: 0;
    min-height: 44px;
    padding: 0;
    display: grid;
    grid-template-columns: 40px minmax(0, 1fr);
    gap: 12px;
    align-items: center;
    text-align: left;
    border-radius: var(--dashboard-radius-control, 8px);
  }
  .well {
    width: 40px;
    height: 40px;
    border-radius: var(--dashboard-radius-icon, 6px);
    display: grid;
    place-items: center;
    background: transparent;
    color: var(--secondary-text-color);
  }
  .well.not-closed {
    color: var(
      --warning-color,
      var(--state-cover-open-color, var(--primary-color))
    );
  }
  ha-icon {
    --mdc-icon-size: 20px;
  }
  .copy {
    min-width: 0;
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
    line-height: 1.25;
    font-weight: 650;
  }
  .state {
    margin-top: 3px;
    font-size: 13px;
    line-height: 1.25;
    color: var(--secondary-text-color);
  }
  .action {
    min-width: 104px;
    height: 44px;
    padding: 0 13px;
    border: 1px solid var(--dashboard-card-border-color, var(--divider-color));
    border-radius: var(--dashboard-radius-control, 5px);
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    color: var(--primary-color);
    font-size: 13px;
    font-weight: 650;
  }
  .action.pending {
    color: var(--secondary-text-color);
  }
  button[disabled],
  button[aria-disabled="true"] {
    opacity: 0.5;
    cursor: default;
  }
  .feedback {
    min-height: 0;
    margin: 0;
    font-size: 13px;
    line-height: 1.35;
    color: var(--secondary-text-color);
  }
  .feedback:not(:empty) {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid var(--divider-color);
  }
  .feedback.error {
    color: var(--error-color);
  }
  :is(button):focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
  @container (max-width: 340px) {
    .row {
      grid-template-columns: 1fr;
    }
    .action {
      width: 100%;
    }
  }
`;

