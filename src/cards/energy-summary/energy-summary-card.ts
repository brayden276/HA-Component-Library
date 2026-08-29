export * from "./energy-summary-card.types";
import type { EnergySummaryConfig } from "./energy-summary-card.types";
export * from "./energy-summary-card.styles";
import { energySummaryCardStyles } from "./energy-summary-card.styles";
import { html, TemplateResult, CSSResultGroup, PropertyValues } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import type { LovelaceGridOptions } from "../../types/home-assistant";
import {
  energyDayData,
  energyDayState,
  EnergyDayDataResult,
} from "../../services/energy/energy-store";
import {
  formatCalendarDay,
  formatEnergy,
  formatPower,
} from "../../utils/formatting";
import { interaction, InteractionHandle } from "../../utils/interaction";
import { registerCard } from "../../utils/registration";

@customElement("component-energy-summary-v1")
export class ComponentEnergySummaryV1 extends LitBaseCard<EnergySummaryConfig> {
  public static stubConfig = {
    profile: "household-energy",
    day_channel: "energy-day",
  };

  @state()
  private _data: EnergyDayDataResult | null = null;

  @state()
  private _error: Error | null = null;

  @state()
  private _loading = false;

  @state()
  private _day: string = energyDayState.today();

  private _sequence = 0;
  private _dayUnsub: (() => void) | null = null;
  private _dataUnsub: (() => void) | null = null;
  private _dataHass: typeof this.hass | null = null;
  private _dataProfile = "";
  private _dataDay = "";
  private _interactionHandles: InteractionHandle[] = [];

  private _profileListener = (event: any) => {
    if (
      event.detail?.kind === "energy" &&
      event.detail?.profileId === (this._config?.profile || "household-energy")
    ) {
      if (this.hass)
        energyDayData.invalidateProfile(
          this.hass,
          this._config?.profile || "household-energy",
        );
      this._load(true);
    }
  };

  public static override getGridOptions(): LovelaceGridOptions {
    return { columns: 12, rows: "auto" };
  }

  public static override styles: CSSResultGroup = energySummaryCardStyles;

  public override setConfig(config: EnergySummaryConfig): void {
    const prevChannel = this._config?.day_channel;
    super.setConfig({
      profile: "household-energy",
      day_channel: "energy-day",
      title: "Energy",
      ...config,
      type: "custom:component-energy-summary-v1",
    });
    const newChannel = this._config?.day_channel || "energy-day";
    this._day = energyDayState.get(newChannel, this.hass);
    if (this.isConnected && prevChannel !== newChannel) {
      this._bindDayChannel();
    }
    this._bindDataSubscription();
    this._load();
  }

  public override getCardSize(): number {
    return 3;
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener(
      "ha-component-profile-change",
      this._profileListener,
    );
    this._bindDayChannel();
    this._bindDataSubscription();
    this._load();
  }

  public override disconnectedCallback(): void {
    window.removeEventListener(
      "ha-component-profile-change",
      this._profileListener,
    );
    this._dayUnsub?.();
    this._dayUnsub = null;
    this._dataUnsub?.();
    this._dataUnsub = null;
    this._dataHass = null;
    this._sequence++;
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];
    super.disconnectedCallback();
  }

  protected override willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);
    if (!changedProperties.has("hass") || !this.hass) return;
    this._day = energyDayState.get(
      this._config?.day_channel || "energy-day",
      this.hass,
    );
    this._bindDayChannel();
    this._bindDataSubscription();
    this._load();
  }

  private _bindDayChannel(): void {
    this._dayUnsub?.();
    this._dayUnsub = null;
    if (!this.isConnected) return;
    this._dayUnsub = energyDayState.subscribe(
      this._config?.day_channel || "energy-day",
      (detail) => {
        if (detail.day !== this._day) {
          this._day = detail.day;
          this._bindDataSubscription();
          this._load();
        }
      },
      { hass: this.hass },
    );
  }

  private _bindDataSubscription(): void {
    if (!this.isConnected || !this.hass || !this._config || !this._day) return;
    const hass = this.hass;
    const profile = this._config.profile || "household-energy";
    if (
      this._dataUnsub &&
      this._dataHass === hass &&
      this._dataProfile === profile &&
      this._dataDay === this._day
    ) {
      return;
    }
    this._dataUnsub?.();
    this._dataHass = hass;
    this._dataProfile = profile;
    this._dataDay = this._day;
    this._dataUnsub = energyDayData.subscribe(
      hass,
      profile,
      this._day,
      (snapshot) => {
        if (
          this._dataHass !== hass ||
          this._dataProfile !== profile ||
          this._dataDay !== this._day
        ) {
          return;
        }
        if (snapshot.value) this._data = snapshot.value;
        this._error = snapshot.error;
        this._loading = snapshot.loading;
      },
    );
  }

  private async _load(force = false): Promise<void> {
    if (!this.hass || !this._config || !this._day) return;
    const sequence = ++this._sequence;
    const hass = this.hass;
    const profile = this._config.profile || "household-energy";
    const day = this._day;
    this._loading = true;
    this._error = null;
    try {
      const data = await energyDayData.get(hass, profile, day, { force });
      if (
        sequence === this._sequence &&
        hass === this.hass &&
        day === this._day
      ) {
        this._data = data;
      }
    } catch (err: any) {
      if (
        sequence === this._sequence &&
        hass === this.hass &&
        day === this._day
      ) {
        this._error = err;
      }
    } finally {
      if (
        sequence === this._sequence &&
        hass === this.hass &&
        day === this._day
      ) {
        this._loading = false;
      }
    }
  }

  protected override updated(): void {
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];

    const bind = (sel: string, entityId: string) => {
      const el = this.renderRoot.querySelector(sel) as HTMLElement | null;
      if (el) {
        this._interactionHandles.push(
          interaction(el, {
            primary: () => this.moreInfo(entityId),
            feedback: true,
          }),
        );
      }
    };

    bind(".house", "sensor.ha_component_house_power");
    bind(".solar", "sensor.ha_component_solar_power");
    bind(".grid", "sensor.ha_component_grid_power");
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const data = this._data;
    const isToday = this._day === energyDayState.today(this.hass);
    const dayLabel = isToday
      ? "Today"
      : formatCalendarDay(this.hass, this._day, {
          weekday: "short",
          day: "numeric",
          month: "short",
        });

    const gridVal = data?.grid_w == null ? Number.NaN : Number(data.grid_w);
    const gridLabel = Number.isFinite(gridVal)
      ? gridVal > 15
        ? "Importing now"
        : gridVal < -15
          ? "Exporting now"
          : "Grid balanced"
      : "Grid unavailable";

    const coverage = Number(data?.coverage);
    const feedback = this._error
      ? /unknown energy profile/i.test(this._error.message || "")
        ? `Configure ${this._config.profile || "household-energy"} in HA Component Backend`
        : this._error.message || "Energy data is unavailable"
      : this._loading
        ? this._data
          ? "Updating…"
          : "Loading Energy data…"
        : data?.stale
          ? "Showing the last successful update"
          : Number.isFinite(coverage) && coverage < 1
            ? `${Math.round(coverage * 100)}% of source data available`
            : "";

    return html`
      <ha-card>
        <div class="wrap">
          <div class="head">
            <h2>${this._config.title || "Energy"}</h2>
            <div class="context">
              <span class="day">${dayLabel}</span>
              <span class="state ${isToday ? "now" : ""}"
                >${isToday ? "Now" : "Historical"}</span
              >
            </div>
          </div>

          <div class="live">
            <button
              class="metric house"
              type="button"
              aria-label="House power now: ${formatPower(this.hass, data?.house_w)}"
            >
              <span class="value"
                >${formatPower(this.hass, data?.house_w)}</span
              >
              <span class="label">House now</span>
            </button>
            <button
              class="metric solar"
              type="button"
              aria-label="Solar power now: ${formatPower(this.hass, data?.solar_w)}"
            >
              <span class="value"
                >${formatPower(this.hass, data?.solar_w)}</span
              >
              <span class="label">Solar now</span>
            </button>
            <button
              class="metric grid"
              type="button"
              aria-label="Grid power now: ${formatPower(this.hass, data?.grid_w, { absolute: true })}, ${gridLabel}"
            >
              <span class="value"
                >${formatPower(this.hass, data?.grid_w, { absolute: true })}</span
              >
              <span class="label">${this.esc(gridLabel)}</span>
            </button>
          </div>

          <div class="daily">
            <button class="metric consumed" type="button" disabled>
              <span class="value"
                >${formatEnergy(this.hass, data?.consumed_kwh)}</span
              >
              <span class="label">Consumed</span>
            </button>
            <button class="metric generated" type="button" disabled>
              <span class="value"
                >${formatEnergy(this.hass, data?.generated_kwh)}</span
              >
              <span class="label">Generated</span>
            </button>
            <button class="metric imported" type="button" disabled>
              <span class="value"
                >${formatEnergy(this.hass, data?.imported_kwh)}</span
              >
              <span class="label">Imported</span>
            </button>
            <button class="metric exported" type="button" disabled>
              <span class="value"
                >${formatEnergy(this.hass, data?.exported_kwh)}</span
              >
              <span class="label">Exported</span>
            </button>
          </div>

          ${
            feedback
              ? html`
                  <div
                    class="feedback ${this._error ? "error" : ""}"
                    role="status"
                  >
                    ${this.esc(feedback)}
                  </div>
                `
              : ""
          }
        </div>
      </ha-card>
    `;
  }
}

registerCard({
  type: "component-energy-summary-v1",
  element: ComponentEnergySummaryV1,
  name: "Energy Summary V1",
  description:
    "Stable backend-driven live power and selected-day Energy totals.",
});
