import { css, CSSResultGroup } from "lit";

export const contextStripCardStyles: CSSResultGroup = css`
  :host {
    display: block;
    min-width: 0;
  }
  ha-card {
    overflow: hidden;
    border-radius: var(--ha-card-border-radius, 16px);
    background: var(--ha-card-background, var(--card-background-color));
    color: var(--primary-text-color);
  }
  button {
    appearance: none;
    width: 100%;
    min-height: 44px;
    box-sizing: border-box;
    border: 0;
    background: transparent;
    font: inherit;
    padding: 12px 14px;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    align-items: center;
    gap: 16px;
    cursor: pointer;
    font-size: 11.5px;
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    color: inherit;
  }
  button:active {
    transform: scale(0.997);
  }
  button:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: -2px;
    border-radius: var(--ha-card-border-radius, 16px);
  }
  .phase {
    color: var(--primary-text-color);
    font-weight: 600;
    text-align: left;
    justify-self: start;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .event {
    color: var(--secondary-text-color);
    text-align: right;
    justify-self: end;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .mid {
    justify-self: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 18px;
    min-width: 0;
    color: var(--secondary-text-color);
  }
  .item {
    display: flex;
    align-items: baseline;
    gap: 4px;
  }
  .lab {
    font-weight: 500;
  }
  .val {
    font-weight: 600;
    color: var(--primary-text-color);
  }
  @media (max-width: 900px) {
    button {
      gap: 10px;
      padding: 11px 12px;
      font-size: 11px;
    }
    .mid {
      gap: 10px;
    }
    .item {
      gap: 3px;
    }
  }
  @media (max-width: 650px) {
    button {
      font-size: 11px;
      gap: 6px;
      padding: 10px;
    }
    .mid {
      gap: 7px;
    }
  }
  .context-static {
    width: 100%;
    min-height: 44px;
    box-sizing: border-box;
    padding: 12px 14px;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    align-items: center;
    gap: 16px;
    font-size: 11.5px;
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
  }
  @media (max-width: 900px) {
    .context-static {
      gap: 10px;
      padding: 11px 12px;
      font-size: 11px;
    }
  }
  @media (max-width: 650px) {
    .context-static {
      font-size: 11px;
      gap: 6px;
      padding: 10px;
    }
  }
`;
