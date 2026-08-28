import { css, CSSResultGroup } from "lit";
import { cardBaseStyles, typographyStyles, controlStyles, iconWellStyles } from "../../styles";

export const statusCardCardStyles: CSSResultGroup = [
  cardBaseStyles,
  typographyStyles,
  controlStyles,
  iconWellStyles,
  css`
    .card-body {
      display: flex;
      align-items: center;
      padding: 12px 14px;
      gap: 12px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-card);
      background: var(--dashboard-card-surface);
    }

    .icon-container {
      display: grid;
      place-items: center;
      width: 40px;
      height: 40px;
      border-radius: var(--dashboard-radius-control);
      background-color: var(--secondary-background-color);
      color: var(--secondary-text-color);
      flex-shrink: 0;
    }

    .icon-container.active {
      color: var(--primary-color);
      background-color: var(--dashboard-active-surface);
    }

    .icon-container ha-icon {
      --mdc-icon-size: 20px;
    }

    .info-container {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 0;
      gap: 2px;
    }

    .primary-title {
      font-size: 13px;
      font-weight: 600;
      line-height: 1.25;
      color: var(--primary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .secondary-text {
      font-size: 12px;
      line-height: 1.25;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .state-label {
      font-weight: 500;
      color: var(--state-color, inherit);
    }

    /* Native Custom Toggle Switch adhering to Section 7 */
    .toggle-btn {
      background: none;
      border: none;
      padding: 4px;
      cursor: pointer;
      outline: none;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 44px;
      min-height: 44px;
    }

    .toggle-btn:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
      border-radius: var(--dashboard-radius-control);
    }

    .toggle-track {
      position: relative;
      width: 38px;
      height: 22px;
      background-color: var(--divider-color);
      border-radius: var(--dashboard-radius-control);
      padding: 3px;
      box-sizing: border-box;
      transition: background-color 0.12s ease;
    }

    .toggle-thumb {
      display: block;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: var(--secondary-text-color);
      transition:
        transform 0.12s ease,
        background-color 0.12s ease;
    }

    .toggle-track.active {
      background-color: color-mix(
        in srgb,
        var(--primary-color) 35%,
        var(--divider-color)
      );
    }

    .toggle-track.active .toggle-thumb {
      transform: translateX(16px);
      background-color: var(--primary-color);
    }

    .status-card.unavailable {
      opacity: 0.45;
      cursor: not-allowed;
    }

    .status-card:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
  `,
];
