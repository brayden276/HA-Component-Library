import { css, CSSResultGroup } from "lit";

export const appleTvCardStyles: CSSResultGroup = css`
  :host {
    display: block;
    min-width: 0;
  }
  * {
    box-sizing: border-box;
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
    overflow: hidden;
    border: var(--dashboard-card-border, 1px solid var(--divider-color));
    border-radius: var(--dashboard-radius-card, 8px);
    background: var(--dashboard-card-surface, var(--card-background-color));
    box-shadow: none;
    color: var(--primary-text-color);
  }
  .wrap {
    padding: 14px 16px;
    display: grid;
    gap: 12px;
  }
  .identity {
    display: grid;
    grid-template-columns: 36px minmax(0, 1fr);
    align-items: center;
    gap: 10px;
  }
  .ico {
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    color: var(--secondary-text-color);
  }
  .ico ha-icon {
    --mdc-icon-size: 24px;
  }
  .ico.on {
    color: var(--primary-color);
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
    font-weight: 700;
    line-height: 1.2;
  }
  .status {
    margin-top: 3px;
    font-size: 12px;
    line-height: 1.2;
    color: var(--secondary-text-color);
  }
  .launchers {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }
  .launcher {
    min-height: 52px;
    padding: 0 12px;
    border: 1px solid var(--divider-color);
    border-radius: 14px;
    display: grid;
    grid-template-columns: 24px minmax(0, 1fr) 16px;
    align-items: center;
    gap: 8px;
    text-align: left;
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
  }
  .launcher ha-icon {
    --mdc-icon-size: 18px;
  }
  .launch-icon {
    display: grid;
    place-items: center;
    color: var(--primary-color);
  }
  .launch-copy {
    min-width: 0;
  }
  .launch-title,
  .launch-meta {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .launch-title {
    font-size: 12px;
    font-weight: 700;
    line-height: 1.2;
  }
  .launch-meta {
    margin-top: 2px;
    font-size: 11px;
    line-height: 1.2;
    color: var(--secondary-text-color);
  }
  .launcher:hover,
  .launcher:focus-visible {
    background: var(--dashboard-card-muted-surface, var(--secondary-background-color));
  }
  .stack {
    display: grid;
    gap: 8px;
  }
  .remote {
    padding: 12px 14px;
    border: var(--dashboard-card-border, 1px solid var(--divider-color));
    border-radius: var(--dashboard-radius-card, 8px);
    background: var(--dashboard-card-surface, var(--card-background-color));
    color: var(--primary-text-color);
  }
  .remote-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 8px;
  }
  .remote-title {
    font-size: 12px;
    font-weight: 650;
  }
  .power,
  .utility {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }
  .power button,
  .utility button,
  .dpad button,
  .keyboard button {
    border: 1px solid var(--divider-color);
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
  }
  .power button,
  .utility button {
    min-height: 44px;
    padding: 0 14px;
    border-radius: 14px;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 12px;
    font-weight: 650;
  }
  .power ha-icon,
  .utility ha-icon {
    --mdc-icon-size: 18px;
  }
  .dpad {
    width: min(286px, 78vw);
    aspect-ratio: 1;
    margin: 8px auto 12px;
    padding: 14px;
    border: 1px solid var(--divider-color);
    border-radius: 50%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 5px;
    background: color-mix(in srgb, var(--secondary-background-color) 72%, transparent);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }
  .dpad button {
    min-width: 0;
    min-height: 0;
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: var(--secondary-text-color);
  }
  .dpad button.select {
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
    color: var(--primary-color);
    box-shadow: 0 3px 14px rgba(0, 0, 0, 0.12);
  }
  .dpad button.blank {
    visibility: hidden;
  }
  .dpad ha-icon {
    --mdc-icon-size: 30px;
  }
  .utility {
    justify-content: center;
  }
  .keyboard {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto auto;
    gap: 8px;
    margin-top: 8px;
  }
  .keyboard input {
    width: 100%;
    min-height: 42px;
    padding: 0 11px;
    border: 1px solid var(--divider-color);
    border-radius: 12px;
    background: transparent;
    color: var(--primary-text-color);
    font-size: 13px;
  }
  .keyboard button {
    width: 44px;
    height: 44px;
    border-radius: 14px;
    display: grid;
    place-items: center;
  }
  .keyboard ha-icon {
    --mdc-icon-size: 18px;
  }
  .media-banner {
    padding: 12px 14px;
    border: var(--dashboard-card-border, 1px solid var(--divider-color));
    border-radius: var(--dashboard-radius-card, 8px);
    background: var(--dashboard-card-surface, var(--card-background-color));
    color: var(--primary-text-color);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .media-info {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .media-icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background: var(--secondary-background-color);
    display: grid;
    place-items: center;
    flex-shrink: 0;
  }
  .media-icon ha-icon {
    --mdc-icon-size: 22px;
  }
  .media-details {
    min-width: 0;
    flex: 1;
  }
  .media-title {
    font-size: 13px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .media-sub {
    font-size: 11.5px;
    color: var(--secondary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 2px;
  }
  .media-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
  }
  .media-controls button {
    min-height: 44px;
    min-width: 44px;
    padding: 0 10px;
    border: 1px solid var(--divider-color);
    border-radius: 14px;
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
    display: grid;
    place-items: center;
    cursor: pointer;
  }
  .media-controls button.play-pause {
    background: var(--card-background-color);
    color: var(--primary-color);
    border-color: var(--primary-color);
  }
  .media-controls button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  :is(button, input):focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
  @media (max-width: 420px) {
    .wrap {
      padding: 12px;
    }
    .dpad {
      width: min(270px, 78vw);
    }
  }
`;


