import { css, CSSResultGroup } from "lit";
import { dashboardBaseCardStyles } from "../../utils/styles";

export const mediaRowCardStyles: CSSResultGroup = [
  dashboardBaseCardStyles,
  css`
    .wrap {
      min-height: 56px;
      display: grid;
      grid-template-columns: 36px minmax(0, 1fr) auto;
      align-items: center;
      gap: 10px;
    }
    .icon {
      width: 36px;
      height: 36px;
      display: grid;
      place-items: center;
      border-radius: var(--dashboard-radius-icon, 0px);
      background: transparent;
      color: var(--primary-color);
    }
    .buttons {
      display: flex;
      gap: 4px;
    }
    .btn {
      position: relative;
      width: 44px;
      height: 44px;
      border: 0 !important;
      border-radius: var(--dashboard-radius-control, 5px) !important;
      background: transparent !important;
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
      padding: 0 !important;
    }
    .btn:before {
      content: "";
      position: absolute;
      width: 30px;
      height: 30px;
      border: 1px solid var(--dashboard-card-border-color, var(--divider-color));
      border-radius: var(--dashboard-radius-control, 5px);
    }
    .btn.main {
      color: var(--primary-color);
    }
    .btn ha-icon {
      position: relative;
      --mdc-icon-size: 17px;
    }
  `,
];
