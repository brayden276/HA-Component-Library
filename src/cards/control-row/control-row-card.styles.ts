import { css, CSSResultGroup } from "lit";
import {
  cardBaseStyles,
  rowStyles,
  iconBoxStyles,
  buttonStyles,
  controlStyles,
} from "../../styles";

export const controlRowCardStyles: CSSResultGroup = [
  cardBaseStyles,
  rowStyles,
  iconBoxStyles,
  buttonStyles,
  controlStyles,
  css`
    .control {
      justify-self: end;
      min-width: 64px;
      display: flex;
      justify-content: flex-end;
    }
    .slider:has(.live-slider) {
      position: relative;
      overflow: visible;
    }
    .live-slider {
      position: absolute;
      inset: -15px 0;
      width: 100%;
      height: 34px;
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
