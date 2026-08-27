import { css, CSSResultGroup } from "lit";
import { dashboardBaseCardStyles } from "../../utils/styles";

export const quickNavCardStyles: CSSResultGroup = [
  dashboardBaseCardStyles,
  css`
    .wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      min-height: 42px;
    }
    .group {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .chip {
      min-height: 32px;
      border: 1px solid var(--divider-color) !important;
      border-radius: var(--dashboard-radius-control, 6px);
      padding: 0 9px !important;
      display: flex;
      align-items: center;
      gap: 5px;
      color: var(--primary-text-color);
      font-size: 11.5px;
      font-weight: 500;
      white-space: nowrap;
    }
    .chip ha-icon,
    .chip ha-state-icon {
      color: var(--primary-color);
      --mdc-icon-size: 15px;
    }
    .chip:disabled {
      cursor: default;
      opacity: 1;
    }
    @media (max-width: 520px) {
      .chip {
        width: 44px;
        padding: 0 !important;
        justify-content: center;
      }
      .chip span {
        display: none;
      }
      .context {
        width: auto;
        padding: 0 12px !important;
      }
      .context span {
        display: inline;
      }
    }
  `,
];
