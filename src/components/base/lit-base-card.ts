import { LitElement, html, TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
  LovelaceGridOptions,
} from "../../types/home-assistant";
import { escapeHtml, toText } from "../../utils/escaping";
import { openMoreInfo, navigateTo, fireEvent } from "../../utils/navigation";
import {
  numberFormat,
  formatPower,
  formatEnergy,
  formatDate,
  formatTime,
  formatCalendarDay,
} from "../../utils/formatting";
import { createLifecycle, ComponentLifecycle } from "../../utils/lifecycle";

export abstract class LitBaseCard<
  T extends LovelaceCardConfig = LovelaceCardConfig,
>
  extends LitElement
  implements LovelaceCard
{
  @property({ attribute: false })
  public hass?: HomeAssistant;

  @state()
  protected _config?: T;

  @state()
  protected _cardError?: string | null = null;

  protected _lifecycle: ComponentLifecycle = createLifecycle(this);

  public static getGridOptions(): LovelaceGridOptions {
    return {
      columns: 12,
      rows: "auto",
    };
  }

  public setConfig(config: T): void {
    if (!config) {
      throw new Error("Invalid configuration");
    }
    this._config = { ...config };
    this._cardError = null;
  }

  public set config(config: T) {
    this.setConfig(config);
  }

  public get config(): T | undefined {
    return this._config;
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._lifecycle.connect();
  }

  public override disconnectedCallback(): void {
    this._lifecycle.disconnect();
    super.disconnectedCallback();
  }

  public getCardSize(): number | Promise<number> {
    return 1;
  }

  public getGridOptions(): LovelaceGridOptions {
    const staticOptions =
      (this.constructor as typeof LitBaseCard).getGridOptions?.() || {};
    const configOptions = this._config?.grid_options || {};
    return {
      columns: 12,
      rows: "auto",
      ...staticOptions,
      ...configOptions,
    };
  }

  // Shared utility methods for declarative templates
  protected esc(value: unknown): string {
    return escapeHtml(value);
  }

  protected toText(value: unknown): string {
    return toText(value);
  }

  protected moreInfo(entityId?: string | null): void {
    openMoreInfo(this, entityId);
  }

  protected navigate(path?: string | null): void {
    navigateTo(path);
  }

  protected fire<D = unknown>(type: string, detail?: D): CustomEvent<D> {
    return fireEvent(this, type, detail);
  }

  protected formatNum(
    value: unknown,
    options?: Intl.NumberFormatOptions,
  ): string {
    return numberFormat(this.hass, value, options);
  }

  protected fmtPower(value: unknown, options?: { absolute?: boolean }): string {
    return formatPower(this.hass, value, options);
  }

  protected fmtEnergy(value: unknown): string {
    return formatEnergy(this.hass, value);
  }

  protected fmtDate(
    value: Date | number | string,
    options?: Intl.DateTimeFormatOptions,
  ): string {
    return formatDate(this.hass, value, options);
  }

  protected fmtTime(
    value: Date | number | string,
    options?: Intl.DateTimeFormatOptions,
  ): string {
    return formatTime(this.hass, value, options);
  }

  protected fmtCalendarDay(
    value: unknown,
    options?: Intl.DateTimeFormatOptions,
  ): string {
    return formatCalendarDay(this.hass, value, options);
  }

  protected renderError(message: string): TemplateResult {
    return html`
      <ha-card class="error-card">
        <div
          style="padding: 16px; color: var(--error-color, #db4437); font-size: 13px; font-weight: 500;"
        >
          ⚠️ ${escapeHtml(message)}
        </div>
      </ha-card>
    `;
  }
}

export abstract class HaBaseCard<
  TConfig extends LovelaceCardConfig = LovelaceCardConfig,
> extends LitBaseCard<TConfig> {
  protected validateConfig(_config: TConfig): void {
    // Optional child validation hook
  }

  public override setConfig(config: TConfig): void {
    super.setConfig(config);
    this.validateConfig(config);
  }

  protected fireConfigChanged(): void {
    this.fire("config-changed", { config: this._config });
  }
}
