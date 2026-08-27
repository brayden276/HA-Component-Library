import { css, CSSResultGroup } from "lit";
import { presentationalCardStyles } from "../../utils/styles";

export const progressCardStyles: CSSResultGroup = [
  presentationalCardStyles,
  css`
    .wrap {
      padding: 8px 11px;
      min-height: 56px;
    }
    .head {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 10px;
    }
    .value {
      font-size: 20px;
      line-height: 1;
      font-weight: 500;
      letter-spacing: -0.025em;
    }
    .label {
      margin-top: 2px;
      font-size: 10.5px;
      color: var(--secondary-text-color);
    }
    .target {
      text-align: right;
      font-size: 10.5px;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }
    .target b {
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .track {
      height: 4px;
      margin-top: 8px;
      border-radius: 999px;
      background: var(--secondary-background-color);
      overflow: hidden;
    }
    .fill {
      height: 100%;
      border-radius: inherit;
      background: var(--primary-color);
    }
    @media (max-width: 700px) {
      .wrap {
        padding: 12px;
      }
      .value {
        font-size: 25px;
      }
      .target {
        font-size: 11px;
      }
    }
    .wrap.actionable {
      cursor: pointer;
    }
    .wrap.actionable:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
      border-radius: var(--ha-card-border-radius, 16px);
    }
  `,
];
