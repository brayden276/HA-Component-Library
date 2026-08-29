import { css, CSSResultGroup } from "lit";
import {
  badgeProgressStyles,
  buttonStyles,
  cardBaseStyles,
  dialogStyles,
  iconButtonStyles,
  iconWellStyles,
  separatorStyles,
  surfaceStyles,
  typographyStyles,
} from "../../styles";

export const securityDashboardCardStyles: CSSResultGroup = [
  cardBaseStyles,
  typographyStyles,
  buttonStyles,
  iconButtonStyles,
  iconWellStyles,
  badgeProgressStyles,
  separatorStyles,
  surfaceStyles,
  dialogStyles,
  css`
    :host {
      display: block;
      min-width: 0;
      --security-gap: 10px;
    }
    * {
      box-sizing: border-box;
    }
    button {
      font: inherit;
      color: inherit;
    }
    .page {
      display: grid;
      gap: var(--security-gap);
    }
    .panel {
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-card);
      background: var(--dashboard-card-surface);
      color: var(--primary-text-color);
      overflow: hidden;
    }
    .hero {
      min-height: 88px;
      padding: 14px;
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: center;
      gap: 14px;
    }
    .hero-main {
      min-width: 0;
      display: grid;
      grid-template-columns: 44px minmax(0, 1fr);
      align-items: center;
      gap: 11px;
    }
    .hero-icon {
      width: 44px;
      height: 44px;
      border-radius: var(--dashboard-radius-control);
      display: grid;
      place-items: center;
      background: color-mix(in srgb, var(--primary-color) 10%, transparent);
      color: var(--primary-color);
    }
    .hero-icon.attention {
      background: color-mix(
        in srgb,
        var(--warning-color, var(--error-color)) 12%,
        transparent
      );
      color: var(--warning-color, var(--error-color));
    }
    .hero-icon ha-icon {
      --mdc-icon-size: 24px;
    }
    .page-title {
      margin: 0;
      font-size: 18px;
      line-height: 1.15;
      font-weight: 700;
    }
    .status-copy {
      margin-top: 4px;
      font-size: 13px;
      color: var(--secondary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .metrics {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      gap: 6px;
    }
    .metric {
      min-height: 34px;
      padding: 0 10px;
      border-radius: 999px;
      background: var(--dashboard-card-muted-surface);
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 650;
      white-space: nowrap;
    }
    .metric ha-icon {
      --mdc-icon-size: 17px;
      color: var(--secondary-text-color);
    }
    .metric.attention {
      color: var(--warning-color, var(--error-color));
    }
    .section {
      padding: 13px 14px 14px;
    }
    .section[hidden] {
      display: none;
    }
    .section-head {
      min-height: 34px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 8px;
    }
    .section-title {
      margin: 0;
      font-size: 15px;
      line-height: 1.2;
      font-weight: 650;
    }
    .section-meta {
      font-size: 12px;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }
    .quick-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
    .quick-action {
      appearance: none;
      min-width: 0;
      min-height: 58px;
      padding: 8px 10px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: transparent;
      text-align: left;
      display: grid;
      grid-template-columns: 36px minmax(0, 1fr);
      align-items: center;
      gap: 9px;
      cursor: pointer;
    }
    .quick-action:hover {
      background: var(--dashboard-card-muted-surface);
    }
    .quick-icon {
      width: 36px;
      height: 36px;
      border-radius: var(--dashboard-radius-control);
      display: grid;
      place-items: center;
      background: color-mix(in srgb, var(--primary-color) 9%, transparent);
      color: var(--primary-color);
    }
    .quick-icon ha-icon {
      --mdc-icon-size: 20px;
    }
    .quick-name,
    .quick-state {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .quick-name {
      font-size: 13px;
      font-weight: 650;
    }
    .quick-state {
      margin-top: 3px;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .camera-grid {
      display: grid;
      grid-template-columns: repeat(var(--security-columns, 2), minmax(0, 1fr));
      gap: 8px;
    }
    .camera {
      min-width: 0;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-card);
      overflow: hidden;
      background: var(--dashboard-card-surface);
    }
    .camera-media {
      position: relative;
      display: block;
      width: 100%;
      aspect-ratio: 16/9;
      padding: 0;
      border: 0;
      background: var(--dashboard-card-muted-surface);
      cursor: pointer;
      overflow: hidden;
    }
    .camera-media img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .camera-media.offline:after {
      content: "Camera unavailable";
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      padding: 12px;
      background: color-mix(
        in srgb,
        var(--dashboard-card-muted-surface) 72%,
        transparent
      );
      color: var(--primary-text-color);
      font-size: 13px;
      font-weight: 650;
    }
    .camera-badge {
      position: absolute;
      top: 9px;
      left: 9px;
      min-height: 28px;
      padding: 0 8px;
      border-radius: 999px;
      display: flex;
      align-items: center;
      gap: 5px;
      background: color-mix(
        in srgb,
        var(--dashboard-card-muted-surface) 78%,
        transparent
      );
      color: var(--primary-text-color);
      font-size: 11px;
      font-weight: 700;
    }
    .camera-badge.activity {
      background: color-mix(
        in srgb,
        var(--warning-color, #f4a100) 88%,
        transparent
      );
    }
    .camera-badge ha-icon {
      --mdc-icon-size: 14px;
    }
    .camera-copy {
      padding: 10px 11px 8px;
    }
    .camera-title-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 8px;
    }
    .camera-name {
      font-size: 14px;
      font-weight: 700;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .camera-state {
      margin-top: 3px;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .classification-summary {
      margin-top: 6px;
      font-size: 12px;
      color: var(--secondary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .camera-actions {
      padding: 0 7px 7px;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 5px;
    }
    .camera-action {
      appearance: none;
      min-width: 0;
      min-height: 44px;
      padding: 0 7px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 650;
    }
    .camera-action.primary {
      background: color-mix(in srgb, var(--primary-color) 9%, transparent);
      border-color: color-mix(
        in srgb,
        var(--primary-color) 28%,
        var(--divider-color)
      );
      color: var(--primary-color);
    }
    .camera-action:hover {
      background: var(--dashboard-card-muted-surface);
    }
    .camera-action ha-icon {
      --mdc-icon-size: 17px;
    }
    .entries {
      display: grid;
      gap: 7px;
    }
    .entry {
      min-height: 64px;
      padding: 7px 7px 7px 11px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      display: grid;
      grid-template-columns: 34px minmax(0, 1fr) auto;
      align-items: center;
      gap: 9px;
    }
    .entry-icon {
      width: 34px;
      height: 34px;
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
    }
    .entry-icon.attention {
      color: var(--warning-color, var(--error-color));
    }
    .entry-icon ha-icon {
      --mdc-icon-size: 20px;
    }
    .entry-name,
    .entry-state {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .entry-name {
      font-size: 13px;
      font-weight: 650;
    }
    .entry-state {
      margin-top: 3px;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .entry-actions {
      display: flex;
      gap: 4px;
    }
    .entry-detail,
    .entry-operate {
      appearance: none;
      min-height: 44px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: transparent;
      cursor: pointer;
    }
    .entry-detail {
      width: 44px;
      padding: 0;
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
    }
    .entry-operate {
      min-width: 92px;
      padding: 0 10px;
      color: var(--primary-color);
      font-size: 12px;
      font-weight: 700;
    }
    .entry-operate.confirm {
      color: var(--warning-color, var(--error-color));
      border-color: currentColor;
    }
    .entry-detail ha-icon {
      --mdc-icon-size: 18px;
    }
    .empty {
      min-height: 78px;
      display: grid;
      place-items: center;
      text-align: center;
      color: var(--secondary-text-color);
      font-size: 13px;
      padding: 12px;
    }
    dialog {
      padding: 0;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-dialog);
      background: var(--dashboard-card-surface);
      color: var(--primary-text-color);
      box-shadow: var(--dashboard-dialog-shadow);
      overflow: hidden;
    }
    dialog::backdrop {
      background: var(--dashboard-modal-scrim);
    }
    .dialog-shell {
      display: flex;
      flex-direction: column;
      max-height: calc(100dvh - 32px);
    }
    .dialog-head {
      min-height: 56px;
      padding: 12px 16px;
      border-bottom: 1px solid var(--divider-color);
      display: flex;
      align-items: center;
      gap: 7px;
    }
    .dialog-title {
      min-width: 0;
      flex: 1;
      font-size: 15px;
      font-weight: 650;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .dialog-button {
      appearance: none;
      min-width: 44px;
      height: 44px;
      padding: 0 10px;
      border: 0;
      border-radius: var(--dashboard-radius-control);
      background: transparent;
      color: var(--secondary-text-color);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      cursor: pointer;
    }
    .dialog-button:hover {
      background: var(--dashboard-card-muted-surface);
      color: var(--primary-text-color);
    }
    .dialog-button ha-icon {
      --mdc-icon-size: 19px;
    }
    .dialog-button span {
      font-size: 12px;
      font-weight: 650;
    }
    .dialog-body {
      min-height: 0;
      overflow: auto;
      overscroll-behavior: contain;
      padding: 16px 16px max(16px, env(safe-area-inset-bottom));
    }
    .viewer-dialog {
      width: min(1120px, calc(100vw - 32px));
      height: min(760px, calc(100dvh - 32px));
    }
    .viewer-shell {
      height: 100%;
    }
    .viewer-body {
      position: relative;
      min-height: 0;
      flex: 1;
      display: grid;
      place-items: center;
      background: var(--dashboard-card-muted-surface);
      overflow: hidden;
    }
    .settings-dialog {
      width: min(680px, calc(100vw - 32px));
      max-height: calc(100dvh - 32px);
    }
    .settings-groups {
      display: grid;
      gap: 18px;
    }
    .settings-group {
      display: grid;
      gap: 8px;
    }
    .settings-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      font-weight: 700;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .settings-title:after {
      content: "";
      height: 1px;
      background: var(--divider-color);
      flex: 1;
    }
    .detections {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
    .detection {
      appearance: none;
      min-width: 0;
      padding: 0;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: var(--dashboard-card-muted-surface);
      overflow: hidden;
      text-align: left;
      cursor: pointer;
    }
    .detection img {
      display: block;
      width: 100%;
      aspect-ratio: 16/9;
      object-fit: cover;
      background: var(--dashboard-card-muted-surface);
    }
    .detection-copy {
      display: block;
      padding: 8px 10px;
    }
    .detection-name,
    .detection-time {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .detection-name {
      font-size: 13px;
      font-weight: 700;
    }
    .detection-time {
      margin-top: 3px;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .status-list,
    .control-list {
      display: grid;
      gap: 6px;
    }
    .status-row,
    .control-row {
      min-height: 54px;
      padding: 5px 5px 5px 10px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: center;
      gap: 8px;
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
      font-weight: 650;
    }
    .control-state {
      margin-top: 3px;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .control-value {
      min-width: 74px;
      text-align: right;
      font-size: 12px;
      font-weight: 700;
    }
    .control-value.on {
      color: var(--warning-color, var(--primary-color));
    }
    .control-toggle {
      appearance: none;
      min-width: 88px;
      min-height: 44px;
      padding: 0 9px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: transparent;
      cursor: pointer;
      font-size: 12px;
      font-weight: 700;
    }
    .control-toggle.on {
      color: var(--primary-color);
      background: color-mix(in srgb, var(--primary-color) 8%, transparent);
      border-color: color-mix(
        in srgb,
        var(--primary-color) 30%,
        var(--divider-color)
      );
    }
    .settings-footer {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 7px;
    }
    .footer-action {
      appearance: none;
      min-height: 46px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 700;
    }
    .footer-action ha-icon {
      --mdc-icon-size: 18px;
    }
    :is(button):focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    button:disabled {
      cursor: default;
      opacity: 0.45;
    }
    @media (max-width: 700px) {
      :host {
        --security-gap: 8px;
      }
      .hero {
        grid-template-columns: 1fr;
        padding: 12px;
      }
      .metrics {
        justify-content: flex-start;
      }
      .section {
        padding: 12px;
      }
      .camera-grid,
      .quick-grid {
        grid-template-columns: 1fr;
      }
      .camera-actions {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
      .dialog-button span {
        display: none;
      }
      .dialog-button {
        padding: 0;
      }
      .viewer-dialog {
        width: 100vw;
        max-width: 100vw;
        height: 100dvh;
        max-height: 100dvh;
        border-width: 0;
        border-radius: 0;
      }
      .settings-dialog {
        width: 100vw;
        max-width: 100vw;
        max-height: 92dvh;
        margin: auto 0 0;
        border-width: 1px 0 0;
        border-radius: var(--dashboard-radius-dialog)
          var(--dashboard-radius-dialog) 0 0;
      }
      .detections {
        grid-template-columns: 1fr;
      }
      .entry {
        grid-template-columns: 34px minmax(0, 1fr);
      }
      .entry-actions {
        grid-column: 2;
        justify-content: flex-start;
      }
      .entry-operate {
        flex: 1;
      }
      .settings-footer {
        grid-template-columns: 1fr;
      }
    }
  `,
];
