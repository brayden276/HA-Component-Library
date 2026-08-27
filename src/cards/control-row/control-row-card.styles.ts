import { css, CSSResultGroup } from "lit";
import { dashboardBaseCardStyles } from "../../utils/styles";

export const controlRowCardStyles: CSSResultGroup = [
  dashboardBaseCardStyles,
  css`
    .row {
      width: 100%;
      text-align: left;
    }
    .wrap {
      min-height: 56px;
      display: grid;
      grid-template-columns: 36px minmax(0, 1fr) minmax(72px, auto);
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
    .control {
      justify-self: end;
      min-width: 72px;
      display: flex;
      justify-content: flex-end;
    }
    .metric {
      font-size: 13px;
      font-weight: 600;
    }
    .slider {
      width: 96px;
      height: 5px;
      border-radius: var(--dashboard-radius-control, 8px);
      background: var(--divider-color);
      overflow: hidden;
    }
    .slider span {
      display: block;
      height: 100%;
      background: var(--primary-color);
      border-radius: var(--dashboard-radius-control, 8px);
    }
    .switch {
      width: 38px;
      height: 22px;
      border-radius: var(--dashboard-radius-control, 8px);
      background: var(--divider-color);
      padding: 3px;
      box-sizing: border-box;
    }
    .switch span {
      display: block;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--secondary-text-color);
      transition:
        margin 0.12s,
        background 0.12s;
    }
    .switch.on {
      background: color-mix(
        in srgb,
        var(--primary-color) 35%,
        var(--divider-color)
      );
    }
    .switch.on span {
      margin-left: 16px;
      background: var(--primary-color);
    }
    .action {
      min-height: 30px;
      padding: 0 10px;
      border: 1px solid var(--dashboard-card-border-color, var(--divider-color));
      border-radius: var(--dashboard-radius-control, 5px);
      background: transparent;
      color: var(--primary-color);
      font-size: 11.5px;
      font-weight: 600;
      display: grid;
      place-items: center;
    }
    .slider:has(.live-slider) {
      position: relative;
      overflow: visible;
    }
    .live-slider {
      position: absolute;
      inset: -19px 0;
      width: 100%;
      height: 44px;
      margin: 0;
      opacity: 0;
      cursor: pointer;
    }
    .row-static {
      width: 100%;
      text-align: left;
    }
    .row-static .identity {
      min-width: 0;
    }
  `,
];
