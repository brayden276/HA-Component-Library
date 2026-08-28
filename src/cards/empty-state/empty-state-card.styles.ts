import { css, CSSResultGroup } from "lit";
import { cardBaseStyles, iconWellStyles, typographyStyles } from "../../styles";

export const emptyStateCardStyles: CSSResultGroup = [
  cardBaseStyles,
  iconWellStyles,
  typographyStyles,
  css`
    .wrap {
      padding: 14px 16px;
      min-height: 64px;
      display: grid;
      grid-template-columns: 40px minmax(0, 1fr);
      align-items: center;
      gap: 12px;
    }
    .icon {
      width: 40px;
      height: 40px;
      display: grid;
      place-items: center;
      border-radius: var(--dashboard-radius-control);
      background: var(--secondary-background-color);
      color: var(--primary-color);
    }
    ha-icon {
      --mdc-icon-size: 20px;
    }
    .title {
      font-size: 13px;
      line-height: 1.25;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .desc {
      margin-top: 3px;
      font-size: 12px;
      line-height: 1.25;
      color: var(--secondary-text-color);
    }
    @media (max-width: 700px) {
      .wrap {
        padding: 12px;
      }
    }
  `,
];
