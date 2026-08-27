import { css, CSSResultGroup } from "lit";
import { dashboardBaseCardStyles } from "../../utils/styles";

export const sectionSeparatorCardStyles: CSSResultGroup = [
  dashboardBaseCardStyles,
  css`
    ha-card {
      background: transparent;
      border: 0;
      box-shadow: none;
    }
    .wrap {
      padding: 7px 2px 5px;
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--secondary-text-color);
    }
    .wrap ha-icon {
      color: var(--primary-color);
      --mdc-icon-size: 18px;
    }
    .label {
      font-size: 12px;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .line {
      height: 1px;
      background: var(--divider-color);
      flex: 1;
    }
  `,
];
