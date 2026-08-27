import { css, CSSResultGroup } from "lit";
import { cardBaseStyles, iconBoxStyles, buttonStyles } from "../../styles";

export const appleTvCardStyles: CSSResultGroup = [
  cardBaseStyles,
  iconBoxStyles,
  buttonStyles,
  css`
    .stack {
      display: grid;
      gap: var(--c-card-gap);
    }
    .remote {
      padding: var(--c-card-padding);
      border: var(--c-card-border);
      border-radius: var(--c-radius-card);
      background: var(--c-card-surface);
      color: var(--primary-text-color);
    }
    .remote-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--c-space-2);
      margin-bottom: var(--c-space-2);
    }
    .remote-title {
      font-size: var(--c-font-base);
      font-weight: var(--c-font-weight-medium);
    }
    .power,
    .utility {
      display: flex;
      gap: var(--c-space-1);
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
      min-height: var(--c-button-height);
      padding: 0 var(--c-space-3);
      border-radius: var(--c-radius-control);
      display: inline-flex;
      align-items: center;
      gap: var(--c-space-1);
      font-size: var(--c-font-sm);
    }
    .power ha-icon,
    .utility ha-icon {
      --mdc-icon-size: var(--c-icon-sm-size);
    }
    .dpad {
      width: min(180px, 60vw);
      aspect-ratio: 1;
      margin: var(--c-space-2) auto var(--c-space-3);
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
      gap: 5px;
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
      --mdc-icon-size: 20px;
    }
    .utility {
      justify-content: center;
    }
    .keyboard {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto auto;
      gap: var(--c-space-1);
      margin-top: var(--c-space-2);
    }
    .keyboard input {
      min-width: 0;
      height: var(--c-button-height);
      padding: 0 var(--c-space-3);
      border: 1px solid var(--divider-color);
      border-radius: var(--c-radius-control);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      font-size: var(--c-font-base);
    }
    .keyboard button {
      width: var(--c-button-height);
      height: var(--c-button-height);
      border-radius: var(--c-radius-control);
      display: grid;
      place-items: center;
    }
    .keyboard ha-icon {
      --mdc-icon-size: var(--c-icon-size);
    }
  `,
];
