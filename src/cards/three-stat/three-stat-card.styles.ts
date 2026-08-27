import { css, CSSResultGroup } from "lit";
import { presentationalCardStyles } from "../../utils/styles";

export const threeStatCardStyles: CSSResultGroup = [
  presentationalCardStyles,
  css`
    .wrap {
      padding: 8px 11px;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
      min-height: 52px;
      align-items: center;
    }
    .stat {
      appearance: none;
      border: 0;
      background: transparent;
      color: inherit;
      font: inherit;
      padding: 0;
      text-align: center;
      min-width: 0;
      cursor: pointer;
    }
    .stat:first-child {
      text-align: left;
    }
    .stat:last-child {
      text-align: right;
    }
    .stat:active {
      transform: scale(0.98);
    }
    .stat:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
      border-radius: 6px;
    }
    .value {
      font-size: 16px;
      line-height: 1;
      font-weight: 500;
      letter-spacing: -0.02em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .label {
      margin-top: 3px;
      font-size: 10px;
      line-height: 1.2;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    @media (max-width: 700px) {
      .wrap {
        padding: 12px;
        gap: 8px;
      }
      .value {
        font-size: 20px;
      }
      .label {
        font-size: 10px;
      }
    }
    .stat:not(button) {
      cursor: default;
    }
    .stat:not(button):active {
      transform: none;
    }
    .stat:not(button):focus-visible {
      outline: none;
    }
  `,
];
