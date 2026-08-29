import { css, CSSResultGroup } from "lit";
import { assemblyStyles, cardBaseStyles, typographyStyles } from "../../styles";

export const singleKpiCardStyles: CSSResultGroup = [
  cardBaseStyles,
  typographyStyles,
  assemblyStyles,
  css`
    .kpi-row {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 12px;
      min-height: 56px;
    }
    .value {
      white-space: nowrap;
    }
    .label {
      white-space: nowrap;
    }
    .support {
      text-align: right;
      font-size: 11.5px;
      line-height: 1.25;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }
    .support b {
      font-weight: 650;
      color: var(--primary-text-color);
      font-variant-numeric: tabular-nums;
    }
    .demo-static {
      width: 100%;
      border: 0;
      background: transparent;
      text-align: inherit;
      padding: 0;
    }
    .demo {
      width: 100%;
      text-align: left;
    }
  `,
];
