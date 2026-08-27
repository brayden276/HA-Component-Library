import { css, CSSResultGroup } from "lit";
import { dashboardBaseCardStyles } from "../../utils/styles";

export const navTileCardStyles: CSSResultGroup = [
  dashboardBaseCardStyles,
  css`
    .nav {
      width: 100%;
      text-align: left;
    }
    .wrap {
      min-height: 44px;
      display: grid;
      grid-template-columns: 28px minmax(0, 1fr);
      align-items: center;
      gap: 8px;
    }
    .icon {
      width: 28px;
      height: 28px;
      display: grid;
      place-items: center;
      border-radius: var(--dashboard-radius-icon, 5px);
      background: transparent;
      color: var(--primary-color);
    }
    .icon ha-icon {
      --mdc-icon-size: 17px;
    }
    .nav-static {
      border: 0;
      background: transparent;
      color: inherit;
      font: inherit;
      padding: 0;
    }
  `,
];
