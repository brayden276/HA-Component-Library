import { css, CSSResultGroup } from "lit";
import { commonCardStyles } from "../../utils/styles";

export const actionTileCardStyles: CSSResultGroup = [
  commonCardStyles,
  css`
    :host {
      --tile-active-color: var(--primary-color, #03a9f4);
    }

    .tile-card {
      height: 100%;
      transition:
        transform 0.15s ease,
        box-shadow 0.15s ease,
        background-color 0.2s ease;
    }

    .tile-card.active {
      background: linear-gradient(
        135deg,
        var(--ha-card-background, #ffffff) 60%,
        rgba(3, 169, 244, 0.08) 100%
      );
    }

    .tile-body {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px 12px;
      min-height: 64px;
      box-sizing: border-box;
    }

    .tile-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 6px;
    }

    .tile-icon-box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 6px;
      background-color: var(
        --secondary-background-color,
        rgba(128, 128, 128, 0.1)
      );
      color: var(--secondary-text-color, #757575);
      transition: all 0.25s ease;
    }

    .tile-icon-box ha-icon {
      --mdc-icon-size: 16px;
    }

    .tile-icon-box.active {
      background-color: var(--tile-active-color);
      color: #ffffff;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
    }

    .badge-pill {
      padding: 2px 6px;
      border-radius: 8px;
      font-size: 0.7rem;
      font-weight: 500;
      background-color: var(
        --secondary-background-color,
        rgba(128, 128, 128, 0.12)
      );
      color: var(--primary-text-color, #212121);
    }

    .tile-content {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
  `,
];
