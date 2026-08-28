import { css, CSSResultGroup } from "lit";
import { cardBaseStyles, feedbackStyles } from "../../styles";

export const noticeCardStyles: CSSResultGroup = [
  cardBaseStyles,
  feedbackStyles,
  css`
    .wrap {
      padding: 12px 14px;
      display: grid;
      grid-template-columns: 20px minmax(0, 1fr);
      align-items: flex-start;
      gap: 10px;
      min-height: 48px;
      font-size: 12.5px;
      line-height: 1.35;
      border-radius: var(--dashboard-radius-control);
      background: var(--dashboard-card-muted-surface);
      color: var(--primary-text-color);
    }
    .wrap.warning {
      background: var(--dashboard-warning-surface);
      border: 1px solid var(--warning-color);
      color: var(--warning-color);
    }
    .wrap.error,
    .wrap.critical {
      background: var(--dashboard-critical-surface);
      border: 1px solid var(--error-color);
      color: var(--error-color);
    }
    .wrap.success {
      background: color-mix(
        in srgb,
        var(--success-color) 10%,
        var(--card-background-color)
      );
      border: 1px solid var(--success-color);
      color: var(--success-color);
    }
    .icon {
      display: grid;
      place-items: center;
      color: inherit;
    }
    ha-icon {
      --mdc-icon-size: 20px;
    }
    .title {
      font-size: 13px;
      font-weight: 600;
      line-height: 1.25;
    }
    .message {
      margin-top: 2px;
      font-size: 12px;
      line-height: 1.25;
      color: inherit;
      opacity: 0.9;
    }
    .wrap.actionable {
      cursor: pointer;
    }
    .wrap.actionable:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
  `,
];
