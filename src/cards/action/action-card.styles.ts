import { css, CSSResultGroup } from "lit";
import { cardBaseStyles, typographyStyles, buttonStyles, iconWellStyles, rowListStyles } from "../../styles";

export const actionCardStyles: CSSResultGroup = [
  cardBaseStyles,
  typographyStyles,
  buttonStyles,
  iconWellStyles,
  rowListStyles,
  css`
    .wrap {
      padding: 10px 14px;
      display: grid;
      grid-template-columns: 40px minmax(0, 1fr) auto;
      align-items: center;
      gap: 12px;
      min-height: 44px;
    }
    .icon {
      width: 40px;
      height: 40px;
      display: grid;
      place-items: center;
      border-radius: var(--dashboard-radius-control);
      background: var(--secondary-background-color);
      color: var(--primary-color);
      flex-shrink: 0;
    }
    ha-icon {
      --mdc-icon-size: 20px;
    }
    .title {
      font-size: 13px;
      font-weight: 600;
      line-height: 1.25;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--primary-text-color);
    }
    .desc {
      margin-top: 3px;
      font-size: 12px;
      color: var(--secondary-text-color);
      line-height: 1.25;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .action {
      min-height: 32px;
      padding: 0 10px;
      border-radius: var(--dashboard-radius-control);
      border: var(--dashboard-card-border);
      background: var(--dashboard-card-muted-surface);
      color: var(--primary-color);
      font-size: 11.5px;
      font-weight: 650;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      white-space: nowrap;
    }
    .action:hover {
      background: var(--dashboard-active-surface);
    }
    .demo-static {
      width: 100%;
      border: 0;
      background: transparent;
      text-align: inherit;
      padding: 0;
    }
  `,
];
