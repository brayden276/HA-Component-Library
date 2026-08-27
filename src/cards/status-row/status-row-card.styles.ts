import { css, CSSResultGroup } from "lit";
import { presentationalCardStyles } from "../../utils/styles";

export const statusRowCardStyles: CSSResultGroup = [
  presentationalCardStyles,
  css`
    .wrap {
      padding: 8px 11px;
      display: grid;
      grid-template-columns: 28px minmax(0, 1fr) auto;
      align-items: center;
      gap: 8px;
      min-height: 48px;
    }
    .icon {
      width: 28px;
      height: 28px;
      display: grid;
      place-items: center;
      border-radius: 6px;
      background: var(--secondary-background-color);
      color: var(--primary-color);
    }
    ha-icon {
      --mdc-icon-size: 16px;
    }
    .title {
      font-size: 12px;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .desc {
      margin-top: 2px;
      font-size: 10px;
      line-height: 1.25;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .status {
      text-align: right;
      white-space: nowrap;
    }
    .status b {
      display: block;
      font-size: 11px;
      font-weight: 500;
    }
    .status span {
      display: block;
      margin-top: 2px;
      font-size: 10px;
      color: var(--secondary-text-color);
    }
    @media (max-width: 700px) {
      .wrap {
        padding: 12px;
      }
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
