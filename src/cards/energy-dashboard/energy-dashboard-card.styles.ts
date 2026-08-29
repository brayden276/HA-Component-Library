import { css, CSSResultGroup } from "lit";
import { globalTokens } from "../../styles/tokens";

export const energyDashboardCardStyles: CSSResultGroup = [
  globalTokens,
  css`
  :host {
    display: block;
    min-width: 0;
  }
  .layout {
    display: grid;
    gap: 8px;
    grid-template-columns: minmax(0, 1fr);
  }
  .context {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 8px;
  }
`,
];
