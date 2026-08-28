import { css, CSSResultGroup } from "lit";
import { cardBaseStyles, separatorStyles } from "../../styles";

export const sectionSeparatorCardStyles: CSSResultGroup = [
  cardBaseStyles,
  separatorStyles,
  css`
    ha-card {
      background: transparent;
      border: 0;
      box-shadow: none;
    }
    .wrap {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 6px 0;
      padding: 0 2px;
    }
    .wrap ha-icon {
      color: var(--secondary-text-color);
      --mdc-icon-size: 14px;
    }
    .label {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11.5px;
      font-weight: 650;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }
    .line {
      flex: 1;
      height: 1px;
      background: var(--divider-color);
    }
  `,
];
