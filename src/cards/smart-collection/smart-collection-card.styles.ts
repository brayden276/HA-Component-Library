import { css, CSSResultGroup } from "lit";
import { cardBaseStyles, typographyStyles } from "../../styles";

export const smartCollectionCardStyles: CSSResultGroup = [
  cardBaseStyles,
  typographyStyles,
  css`
    ha-card {
      border: 0;
      box-shadow: none;
      background: transparent;
      overflow: visible;
    }
    .body {
      display: grid;
      gap: 8px;
      min-width: 0;
    }
    .empty {
      min-height: 48px;
      padding: 12px 14px;
      border: 1px dashed var(--dashboard-card-border-color);
      border-radius: var(--dashboard-radius-card);
      color: var(--secondary-text-color);
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .empty ha-icon {
      color: var(--secondary-text-color);
      --mdc-icon-size: 18px;
    }
  `,
];
