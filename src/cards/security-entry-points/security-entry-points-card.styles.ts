import { css, CSSResultGroup } from "lit";
import {
  assemblyStyles,
  cardBaseStyles,
  iconWellStyles,
  typographyStyles,
} from "../../styles";

export const securityEntryPointsCardStyles: CSSResultGroup = [
  cardBaseStyles,
  typographyStyles,
  iconWellStyles,
  assemblyStyles,
  css`
    .list {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
    .entry {
      appearance: none;
      min-width: 0;
      min-height: 44px;
      padding: 8px 10px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: transparent;
      color: var(--primary-text-color);
      font: inherit;
      text-align: left;
      display: grid;
      grid-template-columns: 40px minmax(0, 1fr);
      align-items: center;
      gap: 12px;
      cursor: pointer;
    }
    .entry:hover {
      background: var(--dashboard-card-muted-surface);
    }
    .entry.open {
      border-color: var(--warning-color);
      background: var(--dashboard-warning-surface);
    }
    .entry:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    .open .icon {
      color: var(--warning-color);
    }
    .copy {
      min-width: 0;
    }
    .name,
    .state {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    @media (max-width: 700px) {
      .list {
        grid-template-columns: 1fr;
      }
    }
  `,
];
