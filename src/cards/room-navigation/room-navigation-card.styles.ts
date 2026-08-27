import { css, CSSResultGroup } from "lit";

export const roomNavigationCardStyles: CSSResultGroup = css`
  :host {
    display: block;
    min-width: 0;
  }
  * {
    box-sizing: border-box;
  }
  ha-card {
    overflow: hidden;
    border: var(--dashboard-card-border, 1px solid var(--divider-color));
    border-radius: var(--dashboard-radius-card, 6px);
    background: var(--dashboard-card-surface, var(--card-background-color));
    box-shadow: none;
    color: var(--primary-text-color);
    transition:
      border-color 220ms ease,
      box-shadow 220ms ease;
  }
  button {
    appearance: none;
    width: 100%;
    min-height: 56px;
    padding: 0 12px 0 10px;
    border: 0;
    border-left: 2px solid transparent;
    background: transparent;
    color: inherit;
    font: inherit;
    text-align: left;
    display: grid;
    grid-template-columns: 36px minmax(0, 1fr);
    align-items: center;
    gap: 10px;
    cursor: pointer;
  }
  .icon {
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    background: transparent;
    color: var(--secondary-text-color);
  }
  .icon ha-icon {
    --mdc-icon-size: 21px;
  }
  .copy {
    min-width: 0;
  }
  .name,
  .summary {
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
  .summary {
    margin-top: 3px;
    font-size: 12px;
    line-height: 1.25;
    font-weight: 400;
    color: var(--secondary-text-color);
  }
  button.active {
    border-left-color: transparent;
    background: transparent;
  }
  button.active .icon {
    color: color-mix(
      in srgb,
      var(--primary-color) 68%,
      var(--secondary-text-color)
    );
  }
  button.warning {
    border-left-color: var(--warning-color, #f9a825);
    background: var(--dashboard-warning-surface, var(--card-background-color));
  }
  button.warning .icon {
    color: var(--warning-color, #f9a825);
  }
  button.critical {
    border-left-color: var(--error-color);
    background: var(--dashboard-critical-surface, var(--card-background-color));
  }
  button.critical .icon {
    color: var(--error-color);
  }
  button:active {
    background: var(
      --dashboard-card-muted-surface,
      var(--secondary-background-color)
    );
  }
  button:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: -2px;
  }
  @media (max-width: 420px) {
    button {
      padding-right: 10px;
      gap: 8px;
    }
  }
`;
