import { css, CSSResultGroup } from "lit";
import { commonCardStyles } from "../../utils/styles";

export const quickBarCardStyles: CSSResultGroup = [
  commonCardStyles,
  css`
    .bar-items-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
      gap: 8px;
      padding: 12px 16px 16px 16px;
    }

    .quick-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: 8px 4px;
      border-radius: 10px;
      background: var(--secondary-background-color, rgba(128, 128, 128, 0.05));
      transition:
        background-color 0.2s ease,
        transform 0.15s ease;
    }

    .quick-item.active {
      background: var(--state-color-container, rgba(3, 169, 244, 0.12));
    }

    .item-icon-circle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background-color: var(--card-background-color, #ffffff);
      color: var(--secondary-text-color, #757575);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      transition: all 0.25s ease;
    }

    .item-icon-circle.active {
      background-color: var(--primary-color, #03a9f4);
      color: #ffffff;
    }

    .item-label {
      font-size: 0.75rem;
      font-weight: 500;
      text-align: center;
      color: var(--primary-text-color, #212121);
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .active-badge {
      font-size: 0.75rem;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 10px;
      background: var(--divider-color, rgba(128, 128, 128, 0.2));
      color: var(--secondary-text-color, #757575);
    }

    .active-badge.highlight {
      background: var(--primary-color, #03a9f4);
      color: #ffffff;
    }

    .quick-item.unavailable {
      opacity: 0.45;
      cursor: not-allowed;
    }

    .quick-item:focus-visible {
      outline: 2px solid var(--primary-color, #03a9f4);
      outline-offset: 2px;
    }
  `,
];

