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
    overflow: hidden;
    border-radius: var(--ha-card-border-radius, 16px);
    background: var(--ha-card-background, var(--card-background-color));
    color: var(--primary-text-color);
  }
  .row {
    min-height: 62px;
    padding: 8px 9px 8px 12px;
    display: grid;
    grid-template-columns: 36px minmax(0, 1fr) auto;
    align-items: center;
    gap: 9px;
  }
  .icon {
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    color: var(--secondary-text-color);
  }
  .icon ha-icon {
    --mdc-icon-size: 21px;
  }
  .identity {
    appearance: none;
    border: 0;
    background: transparent;
    min-width: 0;
    min-height: 44px;
    padding: 4px 0;
    text-align: left;
    cursor: pointer;
  }
  .name,
  .state {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .name {
    font-size: 13px;
    font-weight: 650;
  }
  .state {
    margin-top: 3px;
    font-size: 13px;
    color: var(--secondary-text-color);
  }
  .actions {
    display: flex;
    gap: 4px;
  }
  .action,
  .close {
    appearance: none;
    min-width: 44px;
    height: 44px;
    padding: 0 10px;
    border: 0;
    border-radius: 10px;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    cursor: pointer;
    color: var(--secondary-text-color);
  }
  .action:hover,
  .close:hover {
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
  }
  .action ha-icon,
  .close ha-icon {
    --mdc-icon-size: 19px;
  }
  button:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
  button:disabled {
    cursor: default;
    opacity: 0.45;
  }
  dialog {
    width: min(560px, calc(100vw - 24px));
    max-height: calc(100dvh - 24px);
    padding: 0;
    border: 1px solid var(--divider-color);
    border-radius: var(--ha-card-border-radius, 16px);
    background: var(--card-background-color);
    color: var(--primary-text-color);
    box-shadow: var(--dashboard-dialog-shadow, 0 16px 48px rgba(0, 0, 0, 0.24));
    overflow: hidden;
  }
  dialog::backdrop {
    background: var(--dashboard-modal-scrim, rgba(0, 0, 0, 0.32));
    backdrop-filter: blur(3px);
  }
  .sheet {
    display: flex;
    flex-direction: column;
    max-height: calc(100dvh - 24px);
  }
  .head {
    min-height: 56px;
    padding: 6px 7px 6px 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid var(--divider-color);
  }
  .sheet-title {
    min-width: 0;
    flex: 1;
    font-size: 14px;
    font-weight: 650;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .body,
  .inline {
    overflow: auto;
    overscroll-behavior: contain;
    padding: 12px 14px max(14px, env(safe-area-inset-bottom));
  }
  .inline {
    border-top: 1px solid var(--divider-color);
  }
  .inline[hidden] {
    display: none;
  }
  .groups {
    display: grid;
    gap: 16px;
  }
  .group {
    display: grid;
    gap: 7px;
  }
  .group-list {
    display: grid;
    gap: 6px;
  }
  .group-title {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--secondary-text-color);
    font-size: 13px;
    font-weight: 600;
  }
  .group-title:after {
    content: "";
    height: 1px;
    background: var(--divider-color);
    flex: 1;
  }
  .classification-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }
  .classification {
    appearance: none;
    min-width: 0;
    padding: 0;
    overflow: hidden;
    border: 1px solid var(--divider-color);
    border-radius: 12px;
    background: var(--secondary-background-color);
    color: inherit;
    text-align: left;
    cursor: pointer;
  }
  .classification-image {
    display: block;
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    background: var(--dashboard-media-surface, #111);
  }
  .classification-copy {
    display: block;
    min-height: 52px;
    padding: 8px 10px;
  }
  .classification-name,
  .classification-time {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .classification-name {
    font-size: 13px;
    font-weight: 650;
  }
  .classification-time {
    margin-top: 3px;
    color: var(--secondary-text-color);
    font-size: 13px;
  }
  .classification:hover {
    border-color: color-mix(
      in srgb,
      var(--primary-color) 36%,
      var(--divider-color)
    );
  }
  .classification:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
  .control {
    min-height: 52px;
    padding: 5px 5px 5px 10px;
    border: 1px solid var(--divider-color);
    border-radius: 12px;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 8px;
  }
  .copy {
    min-width: 0;
  }
  .control-name,
  .control-state {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .control-name {
    font-size: 13px;
    font-weight: 600;
  }
  .control-state {
    margin-top: 3px;
    font-size: 13px;
    color: var(--secondary-text-color);
  }
  .control button {
    appearance: none;
    width: 96px;
    min-height: 44px;
    padding: 0 10px;
    border: 1px solid var(--divider-color);
    border-radius: 10px;
    background: transparent;
    cursor: pointer;
  }
  .control button.on {
    color: var(--primary-color);
    border-color: color-mix(
      in srgb,
      var(--primary-color) 45%,
      var(--divider-color)
    );
    background: color-mix(in srgb, var(--primary-color) 8%, transparent);
  }
  .control button.confirm {
    color: var(--warning-color, var(--error-color));
    border-color: currentColor;
  }
  .detection.on {
    border-color: color-mix(
      in srgb,
      var(--primary-color) 40%,
      var(--divider-color)
    );
  }
  .feedback {
    min-height: 18px;
    margin-top: 8px;
    color: var(--secondary-text-color);
    font-size: 13px;
  }
  .feedback.error {
    color: var(--error-color);
  }
  @media (max-width: 520px) {
    .action span {
      display: none;
    }
    .action {
      padding: 0;
    }
    dialog {
      width: 100vw;
      max-width: 100vw;
      max-height: 90dvh;
      margin: auto 0 0;
      border-width: 1px 0 0;
      border-radius: 16px 16px 0 0;
    }
    .sheet {
      max-height: 90dvh;
    }
    .body {
      padding: 10px 12px max(18px, env(safe-area-inset-bottom));
    }
    .classification-list {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;
