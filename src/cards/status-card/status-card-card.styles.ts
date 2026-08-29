import { css, CSSResultGroup } from "lit";
import {
  cardBaseStyles,
  typographyStyles,
  controlStyles,
  iconWellStyles,
  rowListStyles,
  assemblyStyles,
} from "../../styles";

export const statusCardCardStyles: CSSResultGroup = [
  cardBaseStyles,
  typographyStyles,
  controlStyles,
  iconWellStyles,
  rowListStyles,
  assemblyStyles,
  css`
    .status-card {
      transition:
        background-color 0.25s ease,
        border-color 0.4s ease,
        box-shadow 0.75s cubic-bezier(0.16, 1, 0.3, 1),
        transform 0.15s ease;
    }

    .status-card.interactive:active:not(.unavailable) {
      border-color: var(--primary-color) !important;
      box-shadow:
        0 0 0 1px var(--primary-color),
        0 0 16px 3px color-mix(in srgb, var(--primary-color) 50%, transparent) !important;
      transform: scale(0.985);
    }

    .icon-well.active {
      color: var(--primary-color);
    }

    .state-label {
      font-weight: 500;
      color: var(--state-color, inherit);
    }

    .toggle-btn {
      background: none;
      border: none;
      padding: 4px;
      cursor: pointer;
      outline: none;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 44px;
      min-height: 44px;
    }

    .toggle-btn:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
      border-radius: var(--dashboard-radius-control);
    }

    .status-card.unavailable {
      opacity: 0.45;
      cursor: not-allowed;
    }

    .status-card:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
  `,
];
