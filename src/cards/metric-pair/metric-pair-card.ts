export * from "./metric-pair-card.types";
import type { MetricPairConfig } from "./metric-pair-card.types";
export * from "./metric-pair-card.styles";
import { metricPairCardStyles } from "./metric-pair-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import type { LovelaceGridOptions } from "../../types/home-assistant";
import {
  formatEnergy,
  formatPower,
  calendarDayRange,
} from "../../utils/formatting";
import { interaction, InteractionHandle } from "../../utils/interaction";
import { registerCard } from "../../utils/registration";

const DEFAULTS: MetricPairConfig = {
  type: "custom:metric-pair-card-v3",
  left_value: "Primary value",
  left_label: "Primary label",
  right_value: "Secondary value",
  right_label: "Secondary label",
  right_primary: "Primary text",
  right_secondary: "Secondary text",
  deadband: 15,
  day_channel: null,
};

import { energyDayState } from "../../services/energy/energy-store";

@customElement("metric-pair-card-v3")
export class ComponentMetricPairCardV3 extends LitBaseCard<MetricPairConfig> {
  @state()
  private _selectedDay: string = energyDayState.today();

  @state()
  private _stats: Record<string, { change?: number | null }> = {};

  @state()
  private _loading = false;

  @state()
  private _error = "";

  private _lastKey: string | null = null;
  private _interactionHandles: InteractionHandle[] = [];
  private _dayUnsubscribe?: () => void;

  private _onDayChange(day: string): void {
    if (!day || day === this._selectedDay) return;
    this._selectedDay = day;
    this._error = "";
    this._lastKey = null;
    this._scheduleStats();
  }

  public static override getGridOptions(): LovelaceGridOptions {
    return { columns: 12, rows: "auto" };
  }

  public static override styles: CSSResultGroup = metricPairCardStyles;

  public override setConfig(config: MetricPairConfig): void {
    const prevChannel = this._config?.day_channel;
    super.setConfig({ ...DEFAULTS, ...config });
    if (this.isConnected && prevChannel !== this._config?.day_channel) {
      this._dayUnsubscribe?.();
      const channel = this._config?.day_channel || "energy-day";
      this._selectedDay = energyDayState.get(channel, this.hass);
      this._dayUnsubscribe = energyDayState.subscribe(channel, (detail) =>
        this._onDayChange(detail.day),
      );
    }
    this._scheduleStats();
  }

  public override getCardSize(): number {
    return 2;
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    const channel = this._config?.day_channel || "energy-day";
    this._selectedDay = energyDayState.get(channel, this.hass);
    this._dayUnsubscribe = energyDayState.subscribe(channel, (detail) =>
      this._onDayChange(detail.day),
    );
    this._scheduleStats();
  }

  public override disconnectedCallback(): void {
    this._dayUnsubscribe?.();
    this._dayUnsubscribe = undefined;
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];
    super.disconnectedCallback();
  }

  private _isToday(): boolean {
    return this._selectedDay === energyDayState.today(this.hass);
  }

  private _range(): { start: number; end: number } {
    const range = calendarDayRange(this.hass, this._selectedDay);
    if (range) return range;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return { start: now.getTime(), end: now.getTime() + 86400000 };
  }

  private _entity(v: any): string | null {
    if (!v || typeof v !== "object") return null;
    if (typeof v.entity === "string") return v.entity;
    if (Array.isArray(v.entities))
      return v.entities.find((x: any) => typeof x === "string") || null;
    if (Array.isArray(v.terms)) {
      const t = v.terms.find((x: any) => x && typeof x.entity === "string");
      return t?.entity || null;
    }
    return null;
  }

  private _clickEntity(side: "left" | "right"): string | null {
    if (side === "left") {
      return (
        this._config?.left_more_info_entity ||
        this._entity(this._config?.left_value) ||
        this._entity(this._config?.left_label) ||
        null
      );
    }
    return (
      this._config?.right_more_info_entity ||
      this._entity(this._config?.right_value) ||
      this._entity(this._config?.right_label) ||
      this._entity(this._config?.right_primary) ||
      this._entity(this._config?.right_secondary) ||
      null
    );
  }

  private _formatNeeds(v: any): string | null {
    if (!v || typeof v !== "object") return null;
    return String(v.format || "").startsWith("energy_kwh_day")
      ? "change"
      : null;
  }

  private _statEntities(): { change: string[] } {
    const change = new Set<string>();
    const vals = [
      this._config?.left_value,
      this._config?.left_label,
      this._config?.right_value,
      this._config?.right_label,
      this._config?.right_primary,
      this._config?.right_secondary,
    ];
    for (const v of vals) {
      if (this._formatNeeds(v) !== "change" || typeof v !== "object" || !v)
        continue;
      if (typeof v.entity === "string") change.add(v.entity);
      for (const id of v.entities || [])
        if (typeof id === "string") change.add(id);
      for (const term of v.terms || [])
        if (typeof term?.entity === "string") change.add(term.entity);
    }
    return { change: [...change].sort() };
  }

  private _currentKey(): string {
    const ids = this._statEntities();
    const refresh = this._isToday() ? Math.floor(Date.now() / 300000) : "fixed";
    return `${this._selectedDay}|${refresh}|c:${ids.change.join(",")}`;
  }

  private async _scheduleStats(): Promise<void> {
    if (!this.hass || !this._config?.day_channel) return;
    const ids = this._statEntities();
    if (!ids.change.length) return;
    const key = this._currentKey();
    if (this._loading || key === this._lastKey) return;

    this._loading = true;
    this._error = "";
    const range = this._range();

    try {
      const result = await this.hass.callWS<any>({
        type: "recorder/statistics_during_period",
        start_time: new Date(range.start).toISOString(),
        end_time: new Date(range.end).toISOString(),
        statistic_ids: ids.change,
        period: "5minute",
        types: ["change"],
      });

      if (key !== this._currentKey()) return;
      const stats: Record<string, { change?: number | null }> = {};
      for (const entity of ids.change) {
        const rows = (result?.[entity] || []).filter((row: any) => {
          const s =
            typeof row.start === "number" ? row.start : Date.parse(row.start);
          return Number.isFinite(s) && s >= range.start && s < range.end;
        });
        const changes = rows
          .map((r: any) => Number(r.change))
          .filter(Number.isFinite);
        stats[entity] = {
          change: changes.length
            ? changes.reduce((a: number, b: number) => a + b, 0)
            : null,
        };
      }
      this._stats = stats;
      this._lastKey = key;
    } catch {
      if (key === this._currentKey()) {
        this._error = "Data unavailable";
      }
    } finally {
      this._loading = false;
    }
  }

  private _number(entity: string, type: "change"): number | null {
    const v = this._stats?.[entity]?.[type];
    return Number.isFinite(v) ? (v as number) : null;
  }

  private _liveNumber(entity: string): number | null {
    const s = this.hass?.states?.[entity];
    if (!s || ["unknown", "unavailable"].includes(s.state)) return null;
    const n = Number(s.state);
    return Number.isFinite(n) ? n : null;
  }

  private _resolve(v: any): string {
    if (v === null || v === undefined) return "";
    if (typeof v !== "object") return String(v);
    if (v.text !== undefined) return String(v.text);

    const f = String(v.format || "");
    if (this._formatNeeds(v)) {
      if (this._loading) return "Loading…";
      if (this._error) return this._error;
    }

    if (f === "energy_kwh_day")
      return formatEnergy(this.hass, this._number(v.entity, "change"));
    if (f === "energy_kwh_day_sum") {
      if (!Array.isArray(v.entities) || !v.entities.length) return "—";
      let total = 0;
      for (const id of v.entities) {
        const n = this._number(id, "change");
        if (n === null) return "—";
        total += n;
      }
      return formatEnergy(this.hass, total);
    }
    if (f === "energy_kwh_day_formula") {
      if (!Array.isArray(v.terms) || !v.terms.length) return "—";
      let total = 0;
      for (const term of v.terms) {
        const n = this._number(term?.entity, "change");
        if (n === null) return "—";
        total +=
          n * (Number.isFinite(Number(term.factor)) ? Number(term.factor) : 1);
      }
      return formatEnergy(this.hass, total);
    }
    if (["watts", "watts_abs"].includes(f)) {
      return formatPower(this.hass, this._liveNumber(v.entity), {
        absolute: f === "watts_abs",
      });
    }
    if (f === "grid_import_watts") {
      const n = this._liveNumber(v.entity);
      const d = Math.max(0, Number(v.deadband ?? this._config?.deadband) || 15);
      if (n === null) return "—";
      return `${Math.round(n >= d ? n : 0)} W`;
    }
    if (f === "grid_export_watts") {
      const n = this._liveNumber(v.entity);
      const d = Math.max(0, Number(v.deadband ?? this._config?.deadband) || 15);
      if (n === null) return "—";
      return `${Math.round(n <= -d ? Math.abs(n) : 0)} W`;
    }
    if (f === "grid_label") {
      const n = this._liveNumber(v.entity);
      const d = Math.max(0, Number(v.deadband ?? this._config?.deadband) || 15);
      if (n === null) return "Live grid";
      return n >= d
        ? "Live grid import"
        : n <= -d
          ? "Live grid export"
          : "Live grid flow";
    }
    if (f === "grid_direction") {
      const n = this._liveNumber(v.entity);
      const d = Math.max(0, Number(v.deadband ?? this._config?.deadband) || 15);
      if (n === null) return "Unavailable";
      return n >= d
        ? "Importing now"
        : n <= -d
          ? "Exporting now"
          : "Balanced now";
    }
    if (!v.entity) return "";
    const s = this.hass?.states?.[v.entity];
    return s ? String(s.state) : v.unavailable || "Unavailable";
  }

  protected override updated(): void {
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];

    const leftBtn = this.renderRoot.querySelector(
      ".left",
    ) as HTMLElement | null;
    const rightBtn = this.renderRoot.querySelector(
      ".right",
    ) as HTMLElement | null;
    const l = this._clickEntity("left");
    const r = this._clickEntity("right");

    if (leftBtn && l) {
      this._interactionHandles.push(
        interaction(leftBtn, {
          primary: () => this.moreInfo(l),
          feedback: true,
        }),
      );
    }
    if (rightBtn && r) {
      this._interactionHandles.push(
        interaction(rightBtn, {
          primary: () => this.moreInfo(r),
          feedback: true,
        }),
      );
    }
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const leftVal = this._resolve(this._config.left_value);
    const leftLbl = this._resolve(this._config.left_label);
    const rightVal = this._resolve(this._config.right_value);
    const rightLbl = this._resolve(this._config.right_label);
    const rightPri = this._resolve(this._config.right_primary);
    const rightSec = this._resolve(this._config.right_secondary);

    const l = this._clickEntity("left");
    const r = this._clickEntity("right");

    const leftAria = [leftLbl, leftVal].filter(Boolean).join(": ");
    const rightAria = [rightVal, rightLbl, rightPri, rightSec]
      .filter(Boolean)
      .join(" ");

    return html`
      <ha-card>
        <div class="wrap">
          <button
            class="left"
            type="button"
            ?disabled=${!l}
            aria-label="${this.esc(leftAria || "Left metric")}"
          >
            <div class="left-value">${this.esc(leftVal)}</div>
            <div class="left-label">${this.esc(leftLbl)}</div>
          </button>
          <button
            class="right"
            type="button"
            ?disabled=${!r}
            aria-label="${this.esc(rightAria || "Right metric")}"
          >
            <div class="right-top">
              <span class="right-value">${this.esc(rightVal)}</span>
              <span class="right-label">${this.esc(rightLbl)}</span>
            </div>
            <div class="right-bottom">
              <span class="right-primary">${this.esc(rightPri)}</span>
              <span class="right-secondary">${this.esc(rightSec)}</span>
            </div>
          </button>
        </div>
      </ha-card>
    `;
  }
}

registerCard({
  type: "metric-pair-card-v3",
  element: ComponentMetricPairCardV3,
  name: "Metric Pair",
  description: "Live power metrics with selected-day energy totals.",
});
