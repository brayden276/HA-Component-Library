import { css, CSSResultGroup } from "lit";
import { cardBaseStyles, typographyStyles, buttonStyles } from "../../styles";

export const quickNavCardStyles: CSSResultGroup = [
  cardBaseStyles,
  typographyStyles,
  buttonStyles,
  css`
    .wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 6px 10px;
      min-height: 44px;
    }
    .group {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .chip {
      min-height: 32px;
      border: var(--dashboard-card-border) !important;
      border-radius: var(--dashboard-radius-control);
      background: var(--dashboard-card-muted-surface);
      padding: 0 10px !important;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      color: var(--primary-text-color);
      font-size: 11.5px;
      font-weight: 650;
      white-space: nowrap;
      cursor: pointer;
    }
    .chip:hover {
      background: var(--dashboard-active-surface);
    }
    .chip ha-icon,
    .chip ha-state-icon {
      color: var(--primary-color);
      --mdc-icon-size: 16px;
    }
    .chip:disabled {
      cursor: default;
      opacity: 0.6;
    }
    @media (max-width: 520px) {
      .chip {
        width: 44px;
        padding: 0 !important;
        justify-content: center;
      }
      .chip span {
        display: none;
      }
      .context {
        width: auto;
        padding: 0 12px !important;
      }
      .context span {
        display: inline;
      }
    }
  `,
];
