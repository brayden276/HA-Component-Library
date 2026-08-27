export * from "./energy-history-card.types";
import type {
  EnergyHistoryConfig,
  HistoryDataPoint,
} from "./energy-history-card.types";
export * from "./energy-history-card.styles";
import { energyHistoryCardStyles } from "./energy-history-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import type { LovelaceGridOptions } from "../../types/home-assistant";
import {
  energyDayData,
  energyDayState,
} from "../../services/energy/energy-store";
import {
  calendarDayRange,
  formatCalendarDay,
  formatPower,
  formatTime,
} from "../../utils/formatting";
import { interaction, InteractionHandle } from "../../utils/interaction";
import { registerCard } from "../../utils/registration";

const DEFAULTS: EnergyHistoryConfig = {
  type: "custom:energy-history-card-v3",
  profile: null,
  house_entity: "sensor.house_consumption_power",
  solar_entity: "sensor.total_solar_power",
  grid_entity: "sensor.refoss_smart_energy_monitor_em_channel_3_power",
  hours: 24,
  bucket_minutes: 10,
  calendar_day: false,
  day_channel: null,
};

@customElement("energy-history-card-v3")
export class EnergyHistoryCardV3 extends LitBaseCard<EnergyHistoryConfig> {
  @state()
  private _series: {
    house?: HistoryDataPoint[];
    solar?: HistoryDataPoint[];
    grid?: HistoryDataPoint[];
  } = {};

  @state()
  private _loading = false;

  @state()
  private _selectedDay: string | null = null;

  private _start = 0;
  private _end = 0;
  private _lastRangeKey: string | null = null;
  private _forceRefresh = false;
  private _fetchSequence = 0;
  private _dayUnsubscribe: (() => void) | null = null;
  private _pinned = false;
  private _pointerState: {
    id: number;
    x: number;
    y: number;
    moved: boolean;
  } | null = null;
  private _resizeObserver: ResizeObserver | null = null;
  private _interactionHandles: InteractionHandle[] = [];

  private _profileListener = (e: any) => {
    if (
      e.detail?.kind === "energy" &&
      e.detail?.profileId === this._config?.profile
    ) {
      if (this.hass && this._config?.profile)
        energyDayData.invalidateProfile(this.hass, this._config.profile);
      this._forceRefresh = true;
      this._lastRangeKey = null;
      this._fetchData();
    }
  };

  private _outsideListener = (e: PointerEvent) => {
    if (this._pinned && !e.composedPath?.().includes(this)) {
      this._pinned = false;
    }
  };

  public static override getGridOptions(): LovelaceGridOptions {
    return { columns: 12, rows: "auto" };
  }

  public static override styles: CSSResultGroup = energyHistoryCardStyles;

  public override setConfig(config: EnergyHistoryConfig): void {
    const next = { ...DEFAULTS, ...(config || {}) };
    if (next.profile) next.calendar_day = true;
    super.setConfig(next);
    if (this._config?.day_channel && this.hass) {
      this._selectedDay = energyDayState.get(
        this._config.day_channel,
        this.hass,
      );
    }
    if (this.isConnected) {
      this._bindDayChannel();
    }
    this._fetchData();
  }

  public override getCardSize(): number {
    return 7;
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener("pointerdown", this._outsideListener, true);
    window.addEventListener(
      "ha-component-profile-change",
      this._profileListener,
    );
    this._bindDayChannel();
    this._fetchData();
  }

  public override disconnectedCallback(): void {
    window.removeEventListener("pointerdown", this._outsideListener, true);
    window.removeEventListener(
      "ha-component-profile-change",
      this._profileListener,
    );
    this._dayUnsubscribe?.();
    this._dayUnsubscribe = null;
    this._resizeObserver?.disconnect();
    this._resizeObserver = null;
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];
    super.disconnectedCallback();
  }

  private _bindDayChannel(): void {
    this._dayUnsubscribe?.();
    this._dayUnsubscribe = null;
    if (!this._config?.calendar_day || !this._config?.day_channel) return;
    this._dayUnsubscribe = energyDayState.subscribe(
      this._config.day_channel,
      (detail) => {
        if (detail.day !== this._selectedDay) {
          this._selectedDay = detail.day;
          this._lastRangeKey = null;
          this._fetchData();
        }
      },
      { hass: this.hass },
    );
  }

  private _range() {
    if (this._config?.calendar_day) {
      const today = energyDayState.today(this.hass);
      const day =
        this._selectedDay && this._selectedDay <= today
          ? this._selectedDay
          : today;
      const bounds = calendarDayRange(this.hass, day);
      const start = bounds?.start ?? Date.now() - 86400000;
      const end = bounds?.end ?? Date.now();
      return { start, end, day, isToday: day === today };
    }
    const bucket =
      Math.max(5, Number(this._config?.bucket_minutes) || 10) * 60000;
    const end = Math.floor(Date.now() / bucket) * bucket;
    const hours = Math.max(1, Number(this._config?.hours) || 24);
    return { start: end - hours * 3600000, end, isToday: false, day: "" };
  }

  private _rangeKey(r: {
    day: string;
    start: number;
    end: number;
    isToday: boolean;
  }): string {
    return `${r.day}:${r.start}:${r.end}:${r.isToday ? Math.floor(Date.now() / 300000) : "fixed"}:${this._config?.profile || ""}:${this._config?.house_entity}:${this._config?.solar_entity}:${this._config?.grid_entity}:${this._config?.bucket_minutes}`;
  }

  private async _fetchData(): Promise<void> {
    if (!this.hass || !this._config) return;
    const range = this._range();
    const key = this._rangeKey(range);
    if (key === this._lastRangeKey && !this._forceRefresh) return;

    const seq = ++this._fetchSequence;
    this._loading = true;
    const force = this._forceRefresh;
    this._forceRefresh = false;

    try {
      if (this._config.profile) {
        const result = await energyDayData.get(
          this.hass,
          this._config.profile,
          range.day,
          { force },
        );
        if (seq !== this._fetchSequence) return;
        const rawSeries = Array.isArray(result?.series) ? result.series : [];
        this._series = {
          house: rawSeries.map((p: any) => ({
            t: new Date(p.start).getTime(),
            v: Number(p.house) || 0,
          })),
          solar: rawSeries.map((p: any) => ({
            t: new Date(p.start).getTime(),
            v: Number(p.solar) || 0,
          })),
          grid: rawSeries.map((p: any) => ({
            t: new Date(p.start).getTime(),
            v: Number(p.grid) || 0,
          })),
        };
        this._start = Number(result?.range?.start) || range.start;
        this._end = Number(result?.range?.end) || range.end;
      } else {
        this._start = range.start;
        this._end = range.end;
      }
      this._lastRangeKey = key;
    } catch {
      // Keep previous data if any
    } finally {
      if (seq === this._fetchSequence) {
        this._loading = false;
      }
    }
  }

  private _niceMax(v: number): number {
    if (v <= 0) return 1000;
    const mag = 10 ** Math.floor(Math.log10(v));
    const n = v / mag;
    const nice = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
    return nice * mag;
  }

  private _paths(
    series: HistoryDataPoint[] | undefined,
    x: (t: number) => number,
    y: (v: number) => number,
    baseline: number | null = null,
  ) {
    const parts: string[] = [];
    let fill = "";
    let last: number | null = null;
    let segment: HistoryDataPoint[] = [];

    const flush = () => {
      if (!segment.length) return;
      const d = segment
        .map(
          (p, i) => `${i ? "L" : "M"}${x(p.t).toFixed(1)},${y(p.v).toFixed(1)}`,
        )
        .join(" ");
      parts.push(d);
      if (baseline !== null) {
        const first = segment[0];
        const end = segment[segment.length - 1];
        fill += `${d} L${x(end.t).toFixed(1)},${baseline.toFixed(1)} L${x(first.t).toFixed(1)},${baseline.toFixed(1)} Z `;
      }
      segment = [];
    };

    for (const p of series || []) {
      if (last !== null && p.t - last > 15 * 60000) flush();
      segment.push(p);
      last = p.t;
    }
    flush();
    return { line: parts.join(" "), fill: fill.trim() };
  }

  protected override updated(): void {
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];

    const bind = (sel: string, entityId?: string) => {
      const el = this.renderRoot.querySelector(sel) as HTMLElement | null;
      if (el && entityId) {
        this._interactionHandles.push(
          interaction(el, {
            primary: () => this.moreInfo(entityId),
            feedback: true,
          }),
        );
      }
    };

    bind(".house-key", this._config?.house_entity);
    bind(".solar-key", this._config?.solar_entity);
    bind(".grid-key", this._config?.grid_entity);
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const hasData =
      (this._series.house?.length || 0) > 0 ||
      (this._series.solar?.length || 0) > 0 ||
      (this._series.grid?.length || 0) > 0;

    const dayLabel = this._config.calendar_day
      ? this._selectedDay === energyDayState.today(this.hass)
        ? "Today"
        : formatCalendarDay(this.hass, this._selectedDay || "", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })
      : null;

    const metaText = dayLabel
      ? `${dayLabel} · ${this._config.bucket_minutes || 10}-minute average`
      : `${this._config.bucket_minutes || 10}-minute average`;

    const W = 800;
    const H = 420;
    const L = 58;
    const R = 8;
    const T = 6;
    const mainB = Math.round(H * 0.7);
    const axisY = mainB + 20;
    const gridT = axisY + 18;
    const gridB = H - 18;
    const x0 = L;
    const x1 = W - R;
    const start = this._start || Date.now() - 86400000;
    const end = this._end || Date.now();

    const x = (t: number) => x0 + ((t - start) / (end - start)) * (x1 - x0);
    const mainValues = [
      ...(this._series.house || []),
      ...(this._series.solar || []),
    ].map((p) => Math.max(0, p.v));
    const yMax = this._niceMax(Math.max(1, ...mainValues) * 1.06);
    const y = (v: number) => mainB - (Math.max(0, v) / yMax) * (mainB - T);

    const gridAbs = Math.max(
      100,
      ...(this._series.grid || []).map((p) => Math.abs(p.v)),
    );
    const gridMax = this._niceMax(gridAbs * 1.08);
    const gridZero = (gridT + gridB) / 2;
    const yg = (v: number) => gridZero - (v / gridMax) * ((gridB - gridT) / 2);

    const hp = this._paths(this._series.house, x, y);
    const sp = this._paths(this._series.solar, x, y, mainB);
    const gp = this._paths(this._series.grid, x, yg);

    return html`
      <ha-card>
        <div class="wrap">
          <div class="top">
            <div class="meta">${this.esc(metaText)}</div>
            <div class="legend">
              <button
                class="house-key"
                type="button"
                aria-label="House power history details"
              >
                <span class="swatch house-swatch"></span>
                <span>House</span>
              </button>
              <button
                class="solar-key"
                type="button"
                aria-label="Solar power history details"
              >
                <span class="swatch solar-swatch"></span>
                <span>Solar</span>
              </button>
              <button
                class="grid-key"
                type="button"
                aria-label="Grid power history details"
              >
                <span class="swatch grid-swatch"></span>
                <span>Grid</span>
              </button>
            </div>
          </div>

          <div class="chart">
            <svg
              viewBox="0 0 ${W} ${H}"
              role="img"
              aria-label="Household power history"
              @pointerdown=${(ev: PointerEvent) => {
                this._pointerState = {
                  id: ev.pointerId,
                  x: ev.clientX,
                  y: ev.clientY,
                  moved: false,
                };
              }}
              @pointermove=${(ev: PointerEvent) => {
                if (
                  this._pointerState &&
                  Math.hypot(
                    ev.clientX - this._pointerState.x,
                    ev.clientY - this._pointerState.y,
                  ) > 6
                ) {
                  this._pointerState.moved = true;
                }
              }}
              @pointerup=${() => {
                this._pointerState = null;
              }}
            >
              ${[0, 1, 2, 3, 4].map((i) => {
                const v = yMax * (1 - i / 4);
                const yy = T + (mainB - T) * (i / 4);
                return html`
                  <line
                    class="gridline"
                    x1="${x0}"
                    y1="${yy}"
                    x2="${x1}"
                    y2="${yy}"
                  ></line>
                  <text
                    class="axis"
                    x="${x0 - 8}"
                    y="${yy + 4}"
                    text-anchor="end"
                  >
                    ${formatPower(this.hass, v)}
                  </text>
                `;
              })}
              ${[0, 1, 2, 3, 4, 5, 6].map((i) => {
                const t = start + ((end - start) * i) / 6;
                const xx = x(t);
                const d = new Date(t);
                const timeStr =
                  d.getMinutes() === 0
                    ? formatTime(this.hass, t, { minute: undefined })
                    : formatTime(this.hass, t);
                return html`
                  <text
                    class="axis"
                    x="${xx}"
                    y="${axisY}"
                    text-anchor="${i === 0 ? "start" : i === 6 ? "end" : "middle"}"
                  >
                    ${timeStr}
                  </text>
                `;
              })}

              <line
                class="zero"
                x1="${x0}"
                y1="${gridZero}"
                x2="${x1}"
                y2="${gridZero}"
              ></line>
              <text
                class="axis-small"
                x="${x1 - 2}"
                y="${gridT + 10}"
                text-anchor="end"
              >
                Import
              </text>
              <text
                class="axis-small"
                x="${x1 - 2}"
                y="${gridB - 3}"
                text-anchor="end"
              >
                Export
              </text>

              ${sp.fill ? html`<path class="solar-fill" d="${sp.fill}"></path>` : ""}
              ${sp.line ? html`<path class="solar-line" d="${sp.line}"></path>` : ""}
              ${hp.line ? html`<path class="house-line" d="${hp.line}"></path>` : ""}
              ${gp.line ? html`<path class="grid-line" d="${gp.line}"></path>` : ""}
            </svg>

            ${
              !hasData
                ? html`<div class="status">
                    ${this._loading ? "Loading history…" : "No recorded data for this day"}
                  </div>`
                : ""
            }
          </div>
        </div>
      </ha-card>
    `;
  }
}

registerCard({
  type: "energy-history-card-v3",
  element: EnergyHistoryCardV3,
  name: "Energy History",
  description:
    "Dense readable power history supporting rolling or local calendar-day ranges using completed 10-minute averages and a signed grid strip.",
});
