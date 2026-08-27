import { css, CSSResultGroup } from "lit";
import { cardBaseStyles, headerStyles } from "../../styles";

export const smartCollectionCardStyles: CSSResultGroup = [
  cardBaseStyles,
  headerStyles,
  css`
    ha-card {
      border: 0;
      box-shadow: none;
      background: transparent;
      overflow: visible;
    }
    .body {
      display: grid;
      gap: var(--c-card-gap);
      min-width: 0;
    }
    .empty {
      min-height: 38px;
      padding: var(--c-card-padding-dense);
      border: var(--c-card-border);
      border-radius: var(--c-radius-card);
      color: var(--secondary-text-color);
      font-size: var(--c-font-base);
      display: flex;
      align-items: center;
      gap: var(--c-space-2);
    }
    .empty ha-icon {
      color: var(--secondary-text-color);
      --mdc-icon-size: var(--c-icon-sm-size);
    }
  `,
];
