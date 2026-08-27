export * from "./history-graph-card.types";
import type { HistoryGraphConfig } from "./history-graph-card.types";
export * from "./history-graph-card.styles";
import { historyGraphCardStyles } from "./history-graph-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import type { LovelaceGridOptions } from "../../types/home-assistant";
import { registerCard } from "../../utils/registration";

const DEFAULTS: HistoryGraphConfig = {
  type: "custom:component-history-graph-v2",
  meta_text: "Aggregation label",
  series_1_label: "Primary series",
  series_2_label: "Secondary series",
  series_3_label: "Supporting series",
  positive_label: "Positive",
  negative_label: "Negative",
};

@customElement("component-history-graph-v2")
export class ComponentHistoryGraphV2 extends LitBaseCard<HistoryGraphConfig> {
  @state()
  private _hiddenSeries = new Set<number>();

  @state()
  private _tooltip: { show: boolean; text: string; x: number; y: number } = {
    show: false,
    text: "",
    x: 0,
    y: 0,
  };

  private _pinned = false;
  private _pointerState: {
    id: number;
    x: number;
    y: number;
    moved: boolean;
  } | null = null;
  private _resizeObserver: ResizeObserver | null = null;

  private _outsideListener = (event: PointerEvent) => {
    if (!this._pinned || event.composedPath?.().includes(this)) return;
    this._pinned = false;
    this._hideTip();
  };

  public static override getGridOptions(): LovelaceGridOptions {
    return { columns: 12, rows: "auto" };
  }

  public static override styles: CSSResultGroup = historyGraphCardStyles;

  public override setConfig(config: HistoryGraphConfig): void {
    super.setConfig({ ...DEFAULTS, ...config });
  }

  public override getCardSize(): number {
    return 7;
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener("pointerdown", this._outsideListener, true);
    this._attachResizeObserver();
  }

  public override disconnectedCallback(): void {
    window.removeEventListener("pointerdown", this._outsideListener, true);
    this._resizeObserver?.disconnect();
    this._resizeObserver = null;
    super.disconnectedCallback();
  }

  protected override firstUpdated(): void {
    this._attachResizeObserver();
  }

  private _attachResizeObserver(): void {
    if (typeof ResizeObserver === "undefined") return;
    if (!this._resizeObserver) {
      this._resizeObserver = new ResizeObserver(() => {
        this.requestUpdate();
      });
    }
    const chart = this.renderRoot?.querySelector?.(".chart");
    if (chart) {
      this._resizeObserver.observe(chart);
    }
  }

  private _toggleSeries(index: number): void {
    const next = new Set(this._hiddenSeries);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    this._hiddenSeries = next;
  }

  private _hideTip(): void {
    this._tooltip = { show: false, text: "", x: 0, y: 0 };
  }

  private _handlePointer(ev: PointerEvent): void {
    const chart = this.renderRoot.querySelector(".chart") as HTMLElement | null;
    if (!chart) return;
    const r = chart.getBoundingClientRect();
    const W = Math.max(320, Math.round(r.width || 800));
    const L = W < 520 ? 48 : 58;
    const R = 8;
    const x0 = L;
    const x1 = W - R;

    const px = (ev.clientX - r.left) * (W / r.width);
    const x = Math.max(x0, Math.min(x1, px));
    const ratio = (x - x0) / (x1 - x0);
    const pct = Math.round(ratio * 100);

    const rows = [
      [
        1,
        this._config?.series_1_label || "Primary series",
        Math.round(20 + ratio * 80),
      ],
      [
        2,
        this._config?.series_2_label || "Secondary series",
        Math.round(75 - ratio * 45),
      ],
      [
        3,
        this._config?.series_3_label || "Supporting series",
        Math.round((ratio - 0.5) * 40),
      ],
    ].filter(([index]) => !this._hiddenSeries.has(Number(index)));

    const text = `<div style="font-weight:650;margin-bottom:4px">${pct}% through range</div>${rows
      .map(
        ([, label, val]) =>
          `<div class="tr"><span>${label}</span><b>${val}</b></div>`,
      )
      .join("")}`;

    this._tooltip = {
      show: true,
      text,
      x: (x / W) * r.width,
      y: Math.max(70, r.height * 0.42),
    };
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const W = 800;
    const H = 420;
    const L = 58;
    const R = 8;
    const T = 6;
    const B = Math.round(H * 0.7);
    const AY = B + 20;
    const GT = AY + 18;
    const GB = H - 18;
    const x0 = L;
    const x1 = W - R;
    const w = x1 - x0;
    const h = B - T;
    const z = (GT + GB) / 2;

    const p = (rx: number, ry: number) =>
      `${(x0 + w * rx).toFixed(1)},${(T + h * ry).toFixed(1)}`;
    const g = (rx: number, ry: number) =>
      `${(x0 + w * rx).toFixed(1)},${(z + (GB - GT) * 0.32 * ry).toFixed(1)}`;

    const d1 = `M${p(0, 0.68)} L${p(0.08, 0.61)} L${p(0.17, 0.7)} L${p(0.26, 0.38)} L${p(0.35, 0.52)} L${p(0.44, 0.24)} L${p(0.53, 0.43)} L${p(0.62, 0.35)} L${p(0.72, 0.63)} L${p(0.82, 0.48)} L${p(0.91, 0.59)} L${p(1, 0.44)}`;
    const d2 = `M${p(0, 0.86)} L${p(0.12, 0.75)} L${p(0.24, 0.52)} L${p(0.36, 0.42)} L${p(0.48, 0.55)} L${p(0.6, 0.72)} L${p(0.72, 0.82)} L${p(0.84, 0.91)} L${p(1, 0.94)}`;
    const d3 = `M${g(0, 0.08)} L${g(0.1, -0.1)} L${g(0.2, 0.12)} L${g(0.3, -0.2)} L${g(0.4, 0.02)} L${g(0.5, -0.35)} L${g(0.6, 0.16)} L${g(0.7, 0.28)} L${g(0.8, -0.12)} L${g(0.9, 0.05)} L${g(1, -0.08)}`;
    const fill = `${d2} L${x1},${B} L${x0},${B} Z`;

    return html`
      <ha-card>
        <div class="wrap">
          <div class="top">
            <div class="meta">
              ${this.esc(this._config.meta_text || "Aggregation label")}
            </div>
            <div class="legend">
              <button
                type="button"
                data-series="1"
                aria-pressed="${String(!this._hiddenSeries.has(1))}"
                aria-label="Toggle ${this.esc(this._config.series_1_label || "Primary series")}"
                @click=${() => this._toggleSeries(1)}
              >
                <span class="sw s1"></span>
                <span
                  >${this.esc(this._config.series_1_label || "Primary series")}</span
                >
              </button>
              <button
                type="button"
                data-series="2"
                aria-pressed="${String(!this._hiddenSeries.has(2))}"
                aria-label="Toggle ${this.esc(this._config.series_2_label || "Secondary series")}"
                @click=${() => this._toggleSeries(2)}
              >
                <span class="sw s2"></span>
                <span
                  >${this.esc(this._config.series_2_label || "Secondary series")}</span
                >
              </button>
              <button
                type="button"
                data-series="3"
                aria-pressed="${String(!this._hiddenSeries.has(3))}"
                aria-label="Toggle ${this.esc(this._config.series_3_label || "Supporting series")}"
                @click=${() => this._toggleSeries(3)}
              >
                <span class="sw s3"></span>
                <span
                  >${this.esc(this._config.series_3_label || "Supporting series")}</span
                >
              </button>
            </div>
          </div>

          <div class="chart">
            <svg
              viewBox="0 0 ${W} ${H}"
              role="img"
              aria-label="Interactive reusable graph example"
              @pointerdown=${(e: PointerEvent) => {
                this._pointerState = {
                  id: e.pointerId,
                  x: e.clientX,
                  y: e.clientY,
                  moved: false,
                };
                this._handlePointer(e);
              }}
              @pointermove=${(e: PointerEvent) => {
                if (this._pointerState?.id === e.pointerId) {
                  if (
                    Math.hypot(
                      e.clientX - this._pointerState.x,
                      e.clientY - this._pointerState.y,
                    ) > 6
                  ) {
                    this._pointerState.moved = true;
                  }
                  this._handlePointer(e);
                  return;
                }
                if (!this._pinned && e.pointerType !== "touch")
                  this._handlePointer(e);
              }}
              @pointerup=${(e: PointerEvent) => {
                const st = this._pointerState;
                if (!st || st.id !== e.pointerId) return;
                this._pointerState = null;
                if (!st.moved) {
                  if (this._pinned) {
                    this._pinned = false;
                    this._hideTip();
                  } else {
                    this._handlePointer(e);
                    this._pinned = true;
                  }
                } else {
                  this._pinned = false;
                  if (e.pointerType === "touch") this._hideTip();
                }
              }}
              @pointerleave=${() => {
                if (!this._pinned && !this._pointerState) this._hideTip();
              }}
            >
              ${["Max", "75%", "50%", "25%", "0"].map((t, i) => {
                const y = T + (h * i) / 4;
                return html`
                  <line
                    class="grid"
                    x1="${x0}"
                    y1="${y}"
                    x2="${x1}"
                    y2="${y}"
                  ></line>
                  <text
                    class="axis"
                    x="${x0 - 8}"
                    y="${y + 4}"
                    text-anchor="end"
                    >${t}</text
                  >
                `;
              })}
              ${["Start", "¼", "½", "¾", "End"].map((t, i) => {
                const x = x0 + (w * i) / 4;
                return html`
                  <text
                    class="axis"
                    x="${x}"
                    y="${AY}"
                    text-anchor="${i === 0 ? "start" : i === 4 ? "end" : "middle"}"
                  >
                    ${t}
                  </text>
                `;
              })}
              <line
                class="zero"
                x1="${x0}"
                y1="${z}"
                x2="${x1}"
                y2="${z}"
              ></line>
              <text
                class="small"
                x="${x1 - 2}"
                y="${GT + 10}"
                text-anchor="end"
              >
                ${this.esc(this._config.positive_label || "Positive")}
              </text>
              <text class="small" x="${x1 - 2}" y="${GB - 3}" text-anchor="end">
                ${this.esc(this._config.negative_label || "Negative")}
              </text>

              ${
                this._hiddenSeries.has(2)
                  ? ""
                  : html`
                      <path class="f2" d="${fill}"></path>
                      <path class="l2" d="${d2}"></path>
                    `
              }
              ${this._hiddenSeries.has(1) ? "" : html`<path class="l1" d="${d1}"></path>`}
              ${this._hiddenSeries.has(3) ? "" : html`<path class="l3" d="${d3}"></path>`}
              ${
                this._tooltip.show
                  ? html`<line
                      class="cursor"
                      x1="${this._tooltip.x}"
                      y1="${T}"
                      x2="${this._tooltip.x}"
                      y2="${GB}"
                    ></line>`
                  : ""
              }
            </svg>

            <div
              class="tip ${this._tooltip.show ? "show" : ""}"
              style="left:${this._tooltip.x}px; top:${this._tooltip.y}px;"
              .innerHTML=${this._tooltip.text}
            ></div>
          </div>
        </div>
      </ha-card>
    `;
  }
}

registerCard({
  type: "component-history-graph-v2",
  element: ComponentHistoryGraphV2,
  name: "History Graph",
  description: "Reusable interactive history graph component.",
});
