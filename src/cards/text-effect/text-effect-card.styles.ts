import { css, CSSResultGroup } from "lit";
import { cardBaseStyles, typographyStyles, iconWellStyles } from "../../styles";

export const textEffectCardStyles: CSSResultGroup = [
  cardBaseStyles,
  typographyStyles,
  iconWellStyles,
  css`
    .row {
      min-height: 64px;
      padding: 12px 14px;
      display: grid;
      align-items: center;
      gap: 12px;
    }
    .row.has-icon {
      grid-template-columns: 40px minmax(0, 1fr);
    }
    .row:not(.has-icon) {
      grid-template-columns: minmax(0, 1fr);
    }
    .icon {
      width: 40px;
      height: 40px;
      display: grid;
      place-items: center;
      border-radius: var(--dashboard-radius-control);
      background: var(--secondary-background-color);
      color: var(--primary-color);
    }
    .icon ha-icon {
      --mdc-icon-size: 20px;
    }
    .copy {
      min-width: 0;
    }
    .title {
      position: relative;
      display: inline-block;
      max-width: 100%;
      font-size: 13px;
      line-height: 1.25;
      font-weight: 650;
      letter-spacing: -0.005em;
      white-space: nowrap;
      color: var(--primary-text-color);
    }
    .base {
      position: relative;
      z-index: 2;
    }
    .desc {
      margin-top: 3px;
      font-size: 12px;
      line-height: 1.25;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .stamp .title {
      padding-bottom: 4px;
    }
    .stamp .title:after {
      content: "";
      position: absolute;
      z-index: 1;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      border-radius: 999px;
      background: linear-gradient(
        90deg,
        transparent 0%,
        var(--primary-color) 45%,
        var(--primary-color) 55%,
        transparent 100%
      );
      background-size: 220% 100%;
      animation: stampSweep var(--effect-speed, 2.6s) cubic-bezier(0.4, 0, 0.2, 1)
        infinite;
    }
    .typewave .title:after {
      content: attr(data-text);
      position: absolute;
      z-index: 3;
      inset: 0;
      color: var(--primary-color);
      clip-path: inset(0 100% 0 0);
      animation: textSweep var(--effect-speed, 2.6s) cubic-bezier(0.4, 0, 0.2, 1)
        infinite;
      pointer-events: none;
    }
    .overprint .title:after {
      content: attr(data-text);
      position: absolute;
      z-index: 1;
      inset: 0;
      color: var(--primary-color);
      opacity: 0;
      filter: blur(0.15px);
      animation: softPrint var(--effect-speed, 2.6s) ease-in-out infinite;
      pointer-events: none;
    }
    .signal .title {
      padding-left: 16px;
    }
    .signal .title:before {
      content: "";
      position: absolute;
      left: 1px;
      top: 50%;
      width: 7px;
      height: 7px;
      margin-top: -3.5px;
      border: 1.5px solid var(--primary-color);
      border-radius: 2px;
      transform: rotate(45deg);
      animation: signalPulse var(--effect-speed, 2.4s) infinite;
    }
    .signal .title:after {
      content: "";
      position: absolute;
      left: 3.5px;
      top: 50%;
      width: 2.5px;
      height: 2.5px;
      margin-top: -1.25px;
      border-radius: 50%;
      background: var(--primary-color);
    }

    @keyframes stampSweep {
      0% {
        background-position: 210% 0;
        opacity: 0;
      }
      45% {
        opacity: 0.8;
      }
      100% {
        background-position: -110% 0;
        opacity: 0;
      }
    }
    @keyframes textSweep {
      0% {
        clip-path: inset(0 100% 0 0);
        opacity: 0;
      }
      15% {
        opacity: 1;
      }
      85% {
        clip-path: inset(0 0 0 0);
        opacity: 1;
      }
      100% {
        clip-path: inset(0 0 0 0);
        opacity: 0;
      }
    }
    @keyframes softPrint {
      0%,
      100% {
        opacity: 0;
        transform: translateY(0);
      }
      50% {
        opacity: 0.9;
        transform: translateY(-0.5px);
      }
    }
    @keyframes signalPulse {
      0%,
      100% {
        opacity: 0.3;
        transform: rotate(45deg) scale(0.85);
      }
      50% {
        opacity: 0.85;
        transform: rotate(45deg) scale(1.1);
      }
    }
  `,
];
