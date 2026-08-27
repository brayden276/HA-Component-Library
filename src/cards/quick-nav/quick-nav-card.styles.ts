import { css, CSSResultGroup } from "lit";
import { dashboardBaseCardStyles } from "../../utils/styles";

export const quickNavCardStyles: CSSResultGroup = [
  dashboardBaseCardStyles,
  css`
    .wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      min-height: 56px;
    }
    .group {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .chip {
      min-height: 44px;
      border: 1px solid var(--divider-color) !important;
      border-radius: var(--dashboard-radius-control, 8px);
      padding: 0 13px !important;
      display: flex;
      align-items: center;
      gap: 7px;
      color: var(--primary-text-color);
      font-size: 13px;
      font-weight: 600;
      white-space: nowrap;
    }
    .chip ha-icon,
    .chip ha-state-icon {
      color: var(--primary-color);
      --mdc-icon-size: 19px;
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
