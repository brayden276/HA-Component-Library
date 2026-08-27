export * from "./energy-day-selector-card.types";
import type { EnergyDaySelectorConfig } from "./energy-day-selector-card.types";
export * from "./energy-day-selector-card.styles";
import { energyDaySelectorCardStyles } from "./energy-day-selector-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import type { LovelaceGridOptions } from "../../types/home-assistant";
import { energyDayState } from "../../services/energy/energy-store";
import { formatCalendarDay } from "../../utils/formatting";
import { interaction, InteractionHandle } from "../../utils/interaction";
import { registerCard } from "../../utils/registration";

@customElement("component-energy-day-selector-v1")
export class ComponentEnergyDaySelectorV1 extends LitBaseCard<EnergyDaySelectorConfig> {
  public static stubConfig = { channel: "energy-day" };

  @state()
  private _selected: string = energyDayState.today();

  private _unsubscribe: (() => void) | null = null;
  private _interactionHandles: InteractionHandle[] = [];

  public static override getGridOptions(): LovelaceGridOptions {
    return { columns: 12, rows: "auto" };
  }

  public static override styles: CSSResultGroup = energyDaySelectorCardStyles;

  public override setConfig(config: EnergyDaySelectorConfig): void {
    const prevChannel = this._config?.channel;
    super.setConfig({
      channel: "energy-day",
      title: "Energy day",
      ...config,
      type: "custom:component-energy-day-selector-v1",
    });
    const newChannel = this._config?.channel || "energy-day";
    this._selected = energyDayState.get(newChannel, this.hass);
    if (this.isConnected && prevChannel !== newChannel) {
      this._unsubscribe?.();
      this._unsubscribe = energyDayState.subscribe(
        newChannel,
        (detail) => {
          this._selected = detail.day;
        },
        { hass: this.hass },
      );
    }
  }

  public override getCardSize(): number {
    return 1;
  }

  private _parse(value: string): Date | null {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || ""));
    if (!match) return null;
    const date = new Date(
      Number(match[1]),
      Number(match[2]) - 1,
      Number(match[3]),
    );
    return this._key(date) === value ? date : null;
  }

  private _key(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }

  private _isToday(): boolean {
    return this._selected === energyDayState.today(this.hass);
  }

  private _setDay(value: string): void {
    this._selected = energyDayState.set(
      this._config?.channel || "energy-day",
      value,
      {
        hass: this.hass,
      },
    );
  }

  private _shift(days: number): void {
    const date = this._parse(this._selected) || new Date();
    date.setDate(date.getDate() + days);
    this._setDay(this._key(date));
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    if (!this._unsubscribe) {
      this._unsubscribe = energyDayState.subscribe(
        this._config?.channel || "energy-day",
        (detail) => {
          this._selected = detail.day;
        },
        { hass: this.hass },
      );
    }
  }

  public override disconnectedCallback(): void {
    this._unsubscribe?.();
    this._unsubscribe = null;
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];
    super.disconnectedCallback();
  }

  protected override updated(): void {
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];

    const repeat = { delay: 350, interval: 110, accelerate: true };
    const prevBtn = this.renderRoot.querySelector(
      ".previous",
    ) as HTMLElement | null;
    const nextBtn = this.renderRoot.querySelector(
      ".next",
    ) as HTMLElement | null;
    const todayBtn = this.renderRoot.querySelector(
      ".today",
    ) as HTMLElement | null;

    if (prevBtn) {
      this._interactionHandles.push(
        interaction(prevBtn, {
          primary: () => this._shift(-1),
          repeat,
          feedback: true,
        }),
      );
    }
    if (nextBtn) {
      this._interactionHandles.push(
        interaction(nextBtn, {
          primary: () => this._shift(1),
          repeat,
          feedback: true,
        }),
      );
    }
    if (todayBtn) {
      this._interactionHandles.push(
        interaction(todayBtn, {
          primary: () => this._setDay(energyDayState.today(this.hass)),
          feedback: true,
        }),
      );
    }
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const isToday = this._isToday();
    const todayStr = energyDayState.today(this.hass);
    const dayLabel = formatCalendarDay(this.hass, this._selected, {
      weekday: "short",
      day: "numeric",
      month: "short",
      ...(this._selected.slice(0, 4) === todayStr.slice(0, 4)
        ? {}
        : { year: "numeric" }),
    });

    return html`
      <ha-card>
        <div class="row">
          <button class="step previous" type="button" aria-label="Previous day">
            <ha-icon icon="mdi:chevron-left"></ha-icon>
          </button>

          <label class="date">
            <span class="label">${this.esc(dayLabel)}</span>
            <span class="state ${isToday ? "" : "historical"}" role="status">
              ${isToday ? "Today" : "Historical"}
            </span>
            <input
              type="date"
              aria-label="Select Energy day"
              .value=${this._selected}
              max="${todayStr}"
              @change=${(e: Event) => this._setDay((e.target as HTMLInputElement).value)}
            />
          </label>

          <button
            class="step next"
            type="button"
            aria-label="Next day"
            ?disabled=${isToday}
          >
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </button>

          <button
            class="today"
            type="button"
            aria-label="Return to today"
            ?disabled=${isToday}
          >
            <ha-icon icon="mdi:calendar-today-outline"></ha-icon>
            <span>Today</span>
          </button>
        </div>
      </ha-card>
    `;
  }
}

registerCard({
  type: "component-energy-day-selector-v1",
  element: ComponentEnergyDaySelectorV1,
  name: "Energy Day Selector",
  description: "Stable selected-day control shared by every Energy card.",
});
