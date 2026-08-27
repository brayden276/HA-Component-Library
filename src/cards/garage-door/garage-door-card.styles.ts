import { css, CSSResultGroup } from "lit";
import {
  cardBaseStyles,
  rowStyles,
  iconBoxStyles,
  buttonStyles,
} from "../../styles";

export const garageDoorCardStyles: CSSResultGroup = [
  cardBaseStyles,
  rowStyles,
  iconBoxStyles,
  buttonStyles,
  css`
    ha-card {
      container-type: inline-size;
      overflow: hidden;
    }
    .w {
      padding: var(--c-card-padding);
      border-left: 2px solid transparent;
    }
    .w:has(.well.not-closed) {
      border-left-color: var(
        --warning-color,
        var(--state-cover-open-color, var(--primary-color))
      );
      background: var(
        --dashboard-warning-surface,
        var(--card-background-color)
      );
    }
    .row {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: var(--c-space-3);
      align-items: center;
    }
    .well.not-closed {
      color: var(
        --warning-color,
        var(--state-cover-open-color, var(--primary-color))
      );
    }
    .action {
      min-width: 84px;
      height: var(--c-button-height);
      padding: 0 var(--c-space-4);
      color: var(--primary-color);
      font-size: var(--c-font-base);
    }
    .action.pending {
      color: var(--secondary-text-color);
    }
    .feedback {
      min-height: 0;
      margin: 0;
      font-size: var(--c-font-base);
      line-height: 1.35;
      color: var(--secondary-text-color);
    }
    .feedback:not(:empty) {
      margin-top: var(--c-space-4);
      padding-top: var(--c-space-4);
      border-top: 1px solid var(--divider-color);
    }
    .feedback.error {
      color: var(--error-color);
    }
    @container (max-width: 340px) {
      .row {
        grid-template-columns: 1fr;
      }
      .action {
        width: 100%;
      }
    }
  `,
];
