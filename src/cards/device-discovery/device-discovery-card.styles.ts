import { css, CSSResultGroup } from "lit";
import { presentationalCardStyles } from "../../utils/styles";

export const deviceDiscoveryCardStyles: CSSResultGroup = [
  presentationalCardStyles,
  css`
    .card {
      padding: 4px 14px;
    }
    .summary,
    .state {
      min-height: 64px;
      display: grid;
      grid-template-columns: 38px minmax(0, 1fr) auto;
      align-items: center;
      gap: 12px;
    }
    .state {
      padding: 8px 0;
    }
    .icon {
      width: 38px;
      height: 38px;
      display: grid;
      place-items: center;
      border-radius: 12px;
      background: var(--secondary-background-color);
      color: var(--primary-color);
    }
    ha-icon {
      --mdc-icon-size: 20px;
    }
    .title {
      font-size: 13px;
      line-height: 1.25;
      font-weight: 650;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .description {
      margin-top: 4px;
      font-size: 13px;
      line-height: 1.35;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .refresh,
    .review,
    .retry {
      appearance: none;
      min-width: 44px;
      min-height: 44px;
      border: 0;
      border-radius: 12px;
      background: var(--secondary-background-color);
      color: var(--primary-color);
      font: inherit;
      font-size: 13px;
      font-weight: 650;
      cursor: pointer;
    }
    .refresh {
      width: 44px;
      padding: 0;
      display: grid;
      place-items: center;
    }
    .review,
    .retry {
      padding: 0 12px;
      display: grid;
      place-items: center;
    }
    .refresh:active,
    .review:active,
    .retry:active {
      transform: scale(0.98);
    }
    .refresh:focus-visible,
    .review:focus-visible,
    .retry:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    .row {
      min-height: 64px;
      display: grid;
      grid-template-columns: 38px minmax(0, 1fr) auto;
      align-items: center;
      gap: 12px;
      border-top: 1px solid var(--divider-color);
    }
    .row .icon {
      background: var(--secondary-background-color);
    }
    button.row {
      appearance: none;
      width: 100%;
      border-right: 0;
      border-bottom: 0;
      border-left: 0;
      background: transparent;
      color: inherit;
      font: inherit;
      text-align: left;
      cursor: pointer;
    }
    button.row:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
      border-radius: 8px;
    }
    .more {
      min-height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-top: 1px solid var(--divider-color);
      color: var(--secondary-text-color);
      font-size: 13px;
    }
    .error .icon {
      color: var(--error-color, var(--primary-color));
    }
    .success .icon {
      color: var(--success-color, var(--primary-color));
    }
    @media (max-width: 700px) {
      .card {
        padding: 4px 12px;
      }
      .summary,
      .state,
      .row {
        gap: 10px;
      }
    }
  `,
];
