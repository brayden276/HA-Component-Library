import { css, type CSSResultGroup } from "lit";
import {
  buttonStyles,
  cardBaseStyles,
  controlStyles,
  dialogStyles,
  iconButtonStyles,
  iconWellStyles,
  remoteStyles,
  typographyStyles,
} from "../../styles";

/**
 * Apple TV is the catalogue's Apple TV assembly made interactive. These
 * classes only describe the assembly-specific layout; buttons, icon wells,
 * typography, remote and dialog deliberately use the catalogue parts.
 */
export const appleTvCardStyles: CSSResultGroup = [
  cardBaseStyles,
  typographyStyles,
  buttonStyles,
  iconButtonStyles,
  iconWellStyles,
  remoteStyles,
  controlStyles,
  dialogStyles,
  css`
    .apple-card {
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .apple-header {
      display: grid;
      grid-template-columns: 40px minmax(0, 1fr) auto;
      gap: 12px;
      align-items: center;
    }

    .apple-more-info {
      border: 0;
      padding: 0;
      cursor: pointer;
    }

    .apple-header-actions {
      display: flex;
      gap: 6px;
    }

    .apple-launchers {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    .apple-launcher {
      min-height: 56px;
      justify-content: flex-start;
      padding: 0 12px;
      text-align: left;
    }

    .apple-launch-icon {
      width: 34px;
      height: 34px;
      margin-right: 4px;
    }

    .apple-launch-copy {
      text-align: left;
    }

    .apple-launch-copy .label-title,
    .apple-launch-copy .label-sub {
      display: block;
    }

    .apple-launch-copy .label-title {
      font-size: 13px;
    }

    .apple-launch-copy .label-sub {
      margin-top: 1px;
    }

    .dialog-overlay {
      position: fixed;
      inset: 0;
      z-index: 1000;
      display: grid;
      place-items: center;
      padding: 16px;
      background: var(--dashboard-modal-scrim);
    }

    .dialog-content {
      width: min(380px, calc(100vw - 32px));
      max-height: calc(100dvh - 32px);
      overflow: auto;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-dialog);
      background: var(--card-background-color);
      box-shadow: var(--dashboard-dialog-shadow);
      color: var(--primary-text-color);
    }

    .dialog-header {
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--divider-color);
      font-size: 15px;
      font-weight: 650;
    }

    .dialog-header .btn-icon-44 {
      width: 32px;
      height: 32px;
    }

    .dialog-body {
      padding: 16px;
      font-size: 13px;
      color: var(--secondary-text-color);
    }

    .remote-toolbar {
      display: flex;
      justify-content: center;
      gap: 8px;
      margin-bottom: 12px;
    }

    .remote-power,
    .utility button,
    .keyboard button,
    .apple-launcher,
    .app-btn {
      --action-glow-color: var(--primary-color, #03a9f4);
      transition:
        transform 0.15s ease,
        border-color 0.4s ease,
        box-shadow 0.75s cubic-bezier(0.16, 1, 0.3, 1),
        background-color 0.25s ease,
        color 0.2s ease;
    }

    .remote-power:active:not(:disabled),
    .utility button:active:not(:disabled),
    .keyboard button:active:not(:disabled),
    .apple-launcher:active:not(:disabled),
    .app-btn:active:not(:disabled) {
      border-color: var(--action-glow-color) !important;
      box-shadow: 0 0 0 1px var(--action-glow-color),
                  0 0 12px 2.5px color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
      transform: scale(0.96);
    }

    .remote-power[data-cmd="wakeup"] {
      --action-glow-color: var(--success-color, #4caf50);
    }

    .remote-power[data-cmd="suspend"] {
      --action-glow-color: var(--error-color, #f44336);
    }

    .utility button[data-cmd="play"],
    .utility button[data-cmd="pause"],
    .utility button[data-cmd="play_pause"] {
      --action-glow-color: var(--warning-color, #ff9800);
    }

    .keyboard button[data-action="send"],
    .keyboard button[aria-label*="send" i] {
      --action-glow-color: var(--primary-color, #03a9f4);
    }

    .keyboard button[data-action="clear"],
    .keyboard button[aria-label*="clear" i] {
      --action-glow-color: var(--error-color, #f44336);
    }

    .remote-power,
    .utility button,
    .keyboard button {
      min-height: 44px;
      padding: 0 12px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      color: var(--secondary-text-color);
      font-size: 12.5px;
      font-weight: 600;
    }

    .remote-power:hover:not(:disabled),
    .utility button:hover:not(:disabled),
    .keyboard button:hover:not(:disabled) {
      background: var(--dashboard-card-muted-surface);
      color: var(--primary-text-color);
    }

    .remote-power ha-icon,
    .utility ha-icon,
    .keyboard ha-icon {
      --mdc-icon-size: 18px;
    }

    .dpad-cluster {
      max-width: 100%;
      box-sizing: border-box;
    }

    .dpad-btn:disabled {
      cursor: default;
    }

    .dpad-btn ha-icon {
      --mdc-icon-size: 22px;
    }

    .utility {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
      margin-top: 12px;
    }

    .utility button {
      width: 100%;
      padding: 0 8px;
    }

    .keyboard {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 44px 44px;
      gap: 8px;
      margin-top: 12px;
    }

    .keyboard input {
      min-width: 0;
      height: 44px;
      padding: 0 12px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: var(--dashboard-card-surface);
      color: var(--primary-text-color);
      font-size: 13px;
    }

    .keyboard input::placeholder {
      color: var(--disabled-text-color);
    }

    .keyboard button {
      width: 44px;
      padding: 0;
    }

    .app-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }

    .app-btn {
      min-height: 48px;
      padding: 0 12px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      display: grid;
      grid-template-columns: 20px minmax(0, 1fr);
      align-items: center;
      gap: 8px;
      text-align: left;
      color: var(--primary-text-color);
      font-size: 13px;
      font-weight: 600;
    }

    .app-btn:hover:not(:disabled) {
      background: var(--dashboard-card-muted-surface);
    }

    .app-btn.active {
      color: var(--primary-color);
      border-color: var(--primary-color);
      background: var(--dashboard-active-surface);
    }

    .empty-copy,
    .action-error {
      min-height: 18px;
      font-size: 12px;
      font-weight: 500;
      line-height: 1.35;
      color: var(--secondary-text-color);
    }

    .action-error {
      color: var(--error-color);
    }

    .volume-row {
      display: grid;
      grid-template-columns: 24px minmax(0, 1fr) 24px auto;
      align-items: center;
      gap: 10px;
      padding: 8px 12px;
      background: var(--dashboard-card-muted-surface);
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      margin: 8px 0;
    }

    .volume-row ha-icon {
      color: var(--secondary-text-color);
      --mdc-icon-size: 18px;
    }

    .volume-val {
      font-size: 11.5px;
      font-weight: 600;
      color: var(--secondary-text-color);
      font-variant-numeric: tabular-nums;
    }

    @media (max-width: 480px) {
      .apple-header {
        grid-template-columns: 40px minmax(0, 1fr);
      }

      .apple-header-actions {
        grid-column: 1 / -1;
        justify-content: flex-end;
      }

      .remote-toolbar {
        flex-wrap: wrap;
      }
    }
  `,
];
