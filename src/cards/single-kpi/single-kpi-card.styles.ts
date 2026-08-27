import { css, CSSResultGroup } from "lit";
import { presentationalCardStyles } from "../../utils/styles";

export const singleKpiCardStyles: CSSResultGroup = [
  presentationalCardStyles,
  css`
    .wrap {
      padding: 12px 14px;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 16px;
      min-height: 70px;
    }
    .value {
      font-size: 27px;
      line-height: 1;
      font-weight: 650;
      letter-spacing: -0.035em;
      white-space: nowrap;
    }
    .label {
      margin-top: 4px;
      font-size: 11px;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }
    .support {
      text-align: right;
      font-size: 11.5px;
      line-height: 1.3;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }
    .support b {
      font-weight: 600;
      color: var(--primary-text-color);
    }
    @media (max-width: 700px) {
      .wrap {
        padding: 12px;
      }
      .value {
        font-size: 25px;
      }
      .support {
        font-size: 11px;
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
