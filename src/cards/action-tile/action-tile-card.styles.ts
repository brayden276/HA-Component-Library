import { css, CSSResultGroup } from "lit";
import {
  cardBaseStyles,
  surfaceStyles,
  typographyStyles,
  badgeProgressStyles,
  iconWellStyles,
  rowListStyles,
} from "../../styles";

export const actionTileCardStyles: CSSResultGroup = [
  cardBaseStyles,
  surfaceStyles,
  typographyStyles,
  badgeProgressStyles,
  iconWellStyles,
  rowListStyles,
  css`
    :host {
      --tile-active-color: var(--primary-color, #03a9f4);
    }

    .tile-card {
      --action-glow-color: var(--tile-active-color, var(--primary-color, #03a9f4));
      transition:
        background-color 0.25s ease,
        border-color 0.4s ease,
        box-shadow 0.75s cubic-bezier(0.16, 1, 0.3, 1),
        transform 0.15s ease;
      cursor: pointer;
    }

    .tile-card.interactive:active:not(.unavailable) {
      border-color: var(--action-glow-color) !important;
      box-shadow: 0 0 0 1px var(--action-glow-color),
                  0 0 16px 3px color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
      transform: scale(0.985);
    }

    .tile-card.active {
      border-color: var(--tile-active-color);
    }

    .tile-row {
      grid-template-columns: 40px minmax(0, 1fr) auto;
    }

    .icon-well.active {
      color: var(--tile-active-color);
    }

    .tile-card.unavailable {
      opacity: 0.45;
      cursor: not-allowed;
    }

    .tile-card:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
  `,
];
