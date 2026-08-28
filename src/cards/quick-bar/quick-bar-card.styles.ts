import { css, CSSResultGroup } from "lit";
import { cardBaseStyles, typographyStyles, badgeProgressStyles, iconButtonStyles } from "../../styles";

export const quickBarCardStyles: CSSResultGroup = [
  cardBaseStyles,
  typographyStyles,
  badgeProgressStyles,
  iconButtonStyles,
  css`
    .bar-items-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
      gap: 8px;
      padding: 12px 14px;
    }

    .quick-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: 10px 6px;
      border-radius: var(--dashboard-radius-control);
      background: var(--dashboard-card-muted-surface);
      border: var(--dashboard-card-border);
      transition: background-color 0.15s ease;
      cursor: pointer;
    }

    .quick-item.active {
      background: var(--dashboard-active-surface);
      border-color: var(--primary-color);
    }

    .item-icon-circle {
      display: grid;
      place-items: center;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      border: var(--dashboard-card-border);
      background-color: var(--dashboard-card-surface);
      color: var(--secondary-text-color);
      transition: all 0.15s ease;
    }

    .item-icon-circle.active {
      color: var(--primary-color);
      border-color: var(--primary-color);
      background-color: var(--dashboard-active-surface);
    }

    .item-icon-circle ha-icon {
      --mdc-icon-size: 20px;
    }

    .item-label {
      font-size: 12px;
      font-weight: 600;
      text-align: center;
      color: var(--primary-text-color);
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .active-badge {
      font-size: 11px;
      font-weight: 650;
      padding: 3px 8px;
      border-radius: 999px;
      background: var(--dashboard-card-surface);
      color: var(--secondary-text-color);
      border: var(--dashboard-card-border);
    }

    .active-badge.highlight {
      background: var(--dashboard-active-surface);
      color: var(--primary-color);
      border-color: var(--primary-color);
    }

    .quick-item.unavailable {
      opacity: 0.45;
      cursor: not-allowed;
    }

    .quick-item:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
  `,
];
