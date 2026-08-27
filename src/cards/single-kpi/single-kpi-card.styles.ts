import { css, CSSResultGroup } from "lit";
import { presentationalCardStyles } from "../../utils/styles";

export const singleKpiCardStyles: CSSResultGroup = [
  presentationalCardStyles,
  css`
    .wrap {
      padding: 8px 11px;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 12px;
      min-height: 52px;
    }
    .value {
      font-size: 20px;
      line-height: 1;
      font-weight: 500;
      letter-spacing: -0.025em;
      white-space: nowrap;
    }
    .label {
      margin-top: 2px;
      font-size: 10.5px;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }
    .support {
      text-align: right;
      font-size: 10.5px;
      line-height: 1.25;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }
    .support b {
      font-weight: 500;
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
