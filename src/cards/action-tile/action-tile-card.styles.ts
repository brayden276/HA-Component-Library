import { css, CSSResultGroup } from "lit";
import { cardBaseStyles, typographyStyles, badgeProgressStyles, iconWellStyles } from "../../styles";

export const actionTileCardStyles: CSSResultGroup = [
  cardBaseStyles,
  typographyStyles,
  badgeProgressStyles,
  iconWellStyles,
  css`
    :host {
      --tile-active-color: var(--primary-color, #03a9f4);
    }

    .tile-card {
      height: 100%;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-card);
      background: var(--dashboard-card-surface);
      color: var(--primary-text-color);
      transition:
        transform 0.12s ease,
        background-color 0.15s ease;
      cursor: pointer;
    }

    .tile-card.active {
      background: var(--dashboard-active-surface);
      border-color: var(--primary-color);
    }

    .tile-body {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 12px 14px;
      min-height: 72px;
      box-sizing: border-box;
      gap: 8px;
    }

    .tile-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .tile-icon-box {
      display: grid;
      place-items: center;
      width: 36px;
      height: 36px;
      border-radius: var(--dashboard-radius-control);
      background-color: var(--secondary-background-color);
      color: var(--secondary-text-color);
      transition: all 0.15s ease;
      flex-shrink: 0;
    }

    .tile-icon-box ha-icon {
      --mdc-icon-size: 18px;
    }

    .tile-icon-box.active {
      background-color: var(--primary-color);
      color: var(--text-primary-color);
    }

    .badge-pill {
      padding: 3px 8px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 650;
      background-color: var(--dashboard-card-muted-surface);
      color: var(--secondary-text-color);
      border: var(--dashboard-card-border);
    }

    .tile-content {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .tile-card.unavailable {
      opacity: 0.45;
      cursor: not-allowed;
    }

    .tile-card:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
  `,
];
