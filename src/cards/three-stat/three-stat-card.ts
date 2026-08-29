export * from "./three-stat-card.types";
import type { ThreeStatCardConfig } from "./three-stat-card.types";
export * from "./three-stat-card.styles";
import { threeStatCardStyles } from "./three-stat-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import { interaction, InteractionHandle } from "../../utils/interaction";
import { registerCard } from "../../utils/registration";

import {
  computeEntityDisplayName,
  formatEntityState,
} from "../../utils/entity";

const DEFAULTS: ThreeStatCardConfig = {
  type: "custom:component-three-stat-v2",
  metric_1_value: "00",
  metric_1_label: "Metric one",
  metric_2_value: "00",
  metric_2_label: "Metric two",
  metric_3_value: "00",
  metric_3_label: "Metric three",
  interactive: true,
};

@customElement("component-three-stat-v2")
export class ComponentThreeStatV2 extends LitBaseCard<ThreeStatCardConfig> {
  private _interactionHandles: InteractionHandle[] = [];

  public static override styles: CSSResultGroup = threeStatCardStyles;

  public override setConfig(config: ThreeStatCardConfig): void {
    super.setConfig({ ...DEFAULTS, ...config });
  }

  public override getCardSize(): number {
    return 2;
  }

  private _getAction(i: number): (() => void) | null {
    if (!this._config || this._config.interactive === false) return null;

    const custom = (this._config as any)[`metric_${i}_action`];
    if (typeof custom === "function") {
      return () => custom({ host: this, hass: this.hass, index: i });
    }

    const path = (this._config as any)[`metric_${i}_navigation_path`];
    if (path) return () => this.navigate(path);

    const entity = (this._config as any)[`metric_${i}_entity`];
    if (entity) return () => this.moreInfo(entity);

    return null;
  }

  protected override updated(): void {
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];

    const buttons = this.renderRoot.querySelectorAll("button.stat");
    buttons.forEach((btn) => {
      const idx = Number((btn as HTMLElement).dataset.index);
      const action = this._getAction(idx);
      if (action) {
        this._interactionHandles.push(
          interaction(btn as HTMLElement, { primary: action, feedback: true }),
        );
      }
    });
  }

  public override disconnectedCallback(): void {
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];
    super.disconnectedCallback();
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;

    const metrics = [1, 2, 3].map((idx) => {
      const entityId = (this._config as any)[`metric_${idx}_entity`];
      const entity = entityId ? this.hass?.states[entityId] : null;

      let val = (this._config as any)[`metric_${idx}_value`];
      if (entity && (val === "00" || !val)) {
        val = formatEntityState(entity, this.hass);
      }
      let label = (this._config as any)[`metric_${idx}_label`];
      if (
        entity &&
        (label ===
          `Metric ${idx === 1 ? "one" : idx === 2 ? "two" : "three"}` ||
          !label)
      ) {
        label = computeEntityDisplayName({ state: entity });
      }

      const action = this._getAction(idx);
      const ariaLabel = `${label}: ${val}`;
      const content = html`
        <div class="kpi-metric-md value">${this.esc(val)}</div>
        <div class="label-sub label">${this.esc(label)}</div>
      `;

      return action
        ? html`<button
            class="stat"
            data-index="${idx}"
            type="button"
            aria-label="${this.esc(ariaLabel)}"
          >
            ${content}
          </button>`
        : html`<div
            class="stat"
            data-index="${idx}"
            aria-label="${this.esc(ariaLabel)}"
          >
            ${content}
          </div>`;
    });

    return html`
      <ha-card class="assembled-card">
        <div class="wrap">${metrics}</div>
      </ha-card>
    `;
  }
}

registerCard({
  type: "component-three-stat-v2",
  element: ComponentThreeStatV2,
  name: "Three-stat Summary",
  description: "Reusable three-stat summary component.",
});
