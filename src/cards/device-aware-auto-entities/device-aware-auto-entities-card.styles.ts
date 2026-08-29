import { css, CSSResultGroup } from "lit";
import { globalTokens } from "../../styles/tokens";

export const deviceAwareAutoEntitiesCardStyles: CSSResultGroup = [
  globalTokens,
  css`
    :host {
      display: block;
      min-width: 0;
    }
    .head {
      min-height: 44px;
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      padding: 0 2px;
      color: var(--primary-text-color);
    }
    .head[hidden] {
      display: none;
    }
    .head ha-icon {
      color: var(--primary-color);
      --mdc-icon-size: 19px;
    }
    .head h2 {
      margin: 0;
      font-size: 18px;
      line-height: 1.2;
      font-weight: 650;
    }
    .body {
      min-width: 0;
    }
  `,
];
