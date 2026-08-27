import { css, CSSResultGroup } from "lit";
import { presentationalCardStyles } from "../../utils/styles";

export const noticeCardStyles: CSSResultGroup = [
  presentationalCardStyles,
  css`
    .wrap {
      padding: 8px 11px;
      display: grid;
      grid-template-columns: 28px minmax(0, 1fr);
      align-items: center;
      gap: 8px;
      min-height: 48px;
    }
    .icon {
      width: 28px;
      height: 28px;
      display: grid;
      place-items: center;
      border-radius: 6px;
      background: var(--secondary-background-color);
      color: var(--primary-color);
    }
    .warning .icon {
      color: var(--warning-color, var(--primary-color));
    }
    .error .icon {
      color: var(--error-color, var(--primary-color));
    }
    .success .icon {
      color: var(--success-color, var(--primary-color));
    }
    ha-icon {
      --mdc-icon-size: 16px;
    }
    .title {
      font-size: 12px;
      font-weight: 500;
    }
    .message {
      margin-top: 2px;
      font-size: 10px;
      line-height: 1.25;
      color: var(--secondary-text-color);
    }
    .wrap.actionable {
      cursor: pointer;
    }
    .wrap.actionable:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
      border-radius: var(--ha-card-border-radius, 16px);
    }
  `,
];
