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
      min-height: 58px;
      display: grid;
      grid-template-columns: 36px minmax(0, 1fr);
      align-items: center;
      gap: 10px;
    }
    .icon {
      width: 36px;
      height: 36px;
      display: grid;
      place-items: center;
      border-radius: var(--dashboard-radius-icon, 6px);
      background: transparent;
      color: var(--primary-color);
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
