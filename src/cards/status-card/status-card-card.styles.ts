import { css, CSSResultGroup } from "lit";
import { commonCardStyles } from "../../utils/styles";

export const statusCardCardStyles: CSSResultGroup = [
  commonCardStyles,
  css`
    .card-body {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      gap: 14px;
    }

    .icon-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: var(
        --secondary-background-color,
        rgba(128, 128, 128, 0.1)
      );
      color: var(--secondary-text-color, #757575);
      flex-shrink: 0;
    }

    .icon-container.active {
      color: var(--primary-color, #03a9f4);
      background-color: color-mix(in srgb, var(--primary-color, #03a9f4) 12%, transparent);
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
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--primary-text-color, #212121);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .secondary-text {
      font-size: 0.8rem;
      color: var(--secondary-text-color, #757575);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .state-label {
      font-weight: 500;
      color: var(--state-color, inherit);
    }

    /* Native Custom Toggle Switch */
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
      outline: 2px solid var(--primary-color, #03a9f4);
      outline-offset: 2px;
      border-radius: 12px;
    }

    .toggle-track {
      position: relative;
      width: 44px;
      height: 24px;
      background-color: var(--divider-color, rgba(128, 128, 128, 0.3));
      border-radius: 12px;
      transition: background-color 0.25s ease;
    }

    .toggle-thumb {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 20px;
      height: 20px;
      background-color: #ffffff;
      border-radius: 50%;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
      transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .toggle-btn.active .toggle-track {
      background-color: var(--primary-color, #03a9f4);
    }

    .toggle-btn.active .toggle-thumb {
      transform: translateX(20px);
    }
  `,
];
