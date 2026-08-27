import { css, CSSResultGroup } from "lit";

export const appleTvCardStyles: CSSResultGroup = css`
  :host {
    display: block;
    min-width: 0;
  }
  * {
    box-sizing: border-box;
  }
  .stack {
    display: grid;
    gap: 8px;
  }
  .remote {
    padding: 12px;
    border: var(--dashboard-card-border, 1px solid var(--divider-color));
    border-radius: var(
      --dashboard-radius-card,
      var(--ha-card-border-radius, 8px)
    );
    background: var(
      --dashboard-card-surface,
      var(--ha-card-background, var(--card-background-color))
    );
    color: var(--primary-text-color);
  }
  .remote[hidden] {
    display: none;
  }
  .remote-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 10px;
  }
  .remote-title {
    font-size: 13px;
    font-weight: 600;
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
    appearance: none;
    border: 1px solid var(--divider-color);
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
    font: inherit;
    cursor: pointer;
  }
  .power button,
  .utility button {
    min-height: 44px;
    padding: 0 10px;
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
  }
  .power ha-icon,
  .utility ha-icon {
    --mdc-icon-size: 17px;
  }
  .dpad {
    width: min(230px, 72vw);
    aspect-ratio: 1;
    margin: 8px auto 10px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 6px;
  }
  .dpad button {
    border-radius: 50%;
    display: grid;
    place-items: center;
  }
  .dpad button.select {
    background: var(--card-background-color);
    color: var(--primary-color);
  }
  .dpad button.blank {
    visibility: hidden;
  }
  .dpad ha-icon {
    --mdc-icon-size: 26px;
  }
  .utility {
    justify-content: center;
  }
  .keyboard {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto auto;
    gap: 6px;
    margin-top: 10px;
  }
  .keyboard[hidden] {
    display: none;
  }
  .keyboard input {
    min-width: 0;
    height: 44px;
    padding: 0 10px;
    border: 1px solid var(--divider-color);
    border-radius: 10px;
    background: var(--card-background-color);
    color: var(--primary-text-color);
    font: inherit;
  }
  .keyboard button {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    display: grid;
    place-items: center;
  }
  .keyboard ha-icon {
    --mdc-icon-size: 18px;
  }
  :is(button, input):focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
  button:disabled,
  input:disabled {
    opacity: 0.45;
    cursor: default;
  }
`;
