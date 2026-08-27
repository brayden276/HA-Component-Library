import { css, CSSResultGroup } from "lit";
import {
  cardBaseStyles,
  rowStyles,
  iconBoxStyles,
  buttonStyles,
  sheetStyles,
} from "../../styles";

export const cameraCardStyles: CSSResultGroup = [
  cardBaseStyles,
  rowStyles,
  iconBoxStyles,
  buttonStyles,
  sheetStyles,
  css`
    .actions {
      display: flex;
      gap: var(--c-space-1);
    }
    .action,
    .close {
      min-width: var(--c-button-icon-size);
      height: var(--c-button-icon-size);
      padding: 0 var(--c-space-3);
      border: 0;
      border-radius: var(--c-radius-control);
    }
    .head {
      min-height: 38px;
      padding: 4px 6px 4px var(--c-space-4);
      display: flex;
      align-items: center;
      gap: var(--c-space-3);
      border-bottom: 1px solid var(--divider-color);
    }
    .body,
    .inline {
      overflow: auto;
      overscroll-behavior: contain;
      padding: var(--c-card-padding);
    }
    .inline {
      border-top: 1px solid var(--divider-color);
    }
    .groups {
      display: grid;
      gap: var(--c-space-5);
    }
    .group {
      display: grid;
      gap: var(--c-space-2);
    }
    .group-list {
      display: grid;
      gap: var(--c-grid-gap);
    }
    .group-title {
      display: flex;
      align-items: center;
      gap: var(--c-space-3);
      color: var(--secondary-text-color);
      font-size: var(--c-font-base);
      font-weight: var(--c-font-weight-medium);
    }
    .group-title:after {
      content: "";
      height: 1px;
      background: var(--divider-color);
      flex: 1;
    }
    .classification-list {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: var(--c-grid-gap);
    }
    .classification {
      min-width: 0;
      overflow: hidden;
      border: var(--c-card-border);
      border-radius: var(--c-radius-card);
      background: var(--secondary-background-color);
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
      padding: var(--c-card-padding-dense);
    }
    .classification-name,
    .classification-time {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .classification-name {
      font-size: var(--c-font-md);
      font-weight: var(--c-font-weight-medium);
    }
    .classification-time {
      margin-top: 2px;
      color: var(--secondary-text-color);
      font-size: var(--c-font-sm);
    }
    .control {
      min-height: 44px;
      padding: 4px 4px 4px var(--c-space-3);
      border: var(--c-card-border);
      border-radius: var(--c-radius-card);
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: center;
      gap: var(--c-space-3);
    }
    .control button {
      width: 80px;
      min-height: var(--c-button-height);
      padding: 0 var(--c-space-3);
      border: 1px solid var(--divider-color);
      border-radius: var(--c-radius-control);
      background: transparent;
      cursor: pointer;
    }
    .control button.on {
      color: var(--primary-color);
      border-color: color-mix(in srgb, var(--primary-color) 45%, var(--divider-color));
      background: var(--c-active-surface);
    }
    .control button.confirm {
      color: var(--warning-color, var(--error-color));
      border-color: currentColor;
    }
    .detection.on {
      border-color: color-mix(in srgb, var(--primary-color) 40%, var(--divider-color));
    }
    .feedback {
      min-height: 18px;
      margin-top: var(--c-space-3);
      color: var(--secondary-text-color);
      font-size: var(--c-font-base);
    }
    .feedback.error {
      color: var(--error-color);
    }
    @media (max-width: 520px) {
      .classification-list {
        grid-template-columns: minmax(0, 1fr);
      }
    }
  `,
];
