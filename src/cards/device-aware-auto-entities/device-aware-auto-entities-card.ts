export * from "./device-aware-auto-entities-card.types";
import type { DeviceAwareAutoEntitiesConfig } from "./device-aware-auto-entities-card.types";
export * from "./device-aware-auto-entities-card.styles";
import { deviceAwareAutoEntitiesCardStyles } from "./device-aware-auto-entities-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import type {
  LovelaceCard,
  LovelaceGridOptions,
} from "../../types/home-assistant";
import { registerCard } from "../../utils/registration";

const DEVICE_AWARE_INNER_TYPE = "custom:auto-entities";
const deviceAwareClone = <T>(value: T): T => JSON.parse(JSON.stringify(value));

@customElement("component-device-aware-auto-entities-v1")
export class ComponentDeviceAwareAutoEntitiesV1 extends LitBaseCard<DeviceAwareAutoEntitiesConfig> {
  @state()
  private _innerCard: LovelaceCard | null = null;

  @state()
  private _innerError = false;

  private _generation = 0;
  private _retryTimer: ReturnType<typeof setTimeout> | null = null;

  public static override getGridOptions(): LovelaceGridOptions {
    return { columns: 12, rows: "auto" };
  }

  public static override styles: CSSResultGroup =
    deviceAwareAutoEntitiesCardStyles;

  public override setConfig(config: DeviceAwareAutoEntitiesConfig): void {
    if (!config?.filter) throw new Error("An Auto-Entities filter is required");
    super.setConfig(deviceAwareClone(config));
    this._generation += 1;
    if (this._retryTimer) clearTimeout(this._retryTimer);
    this._retryTimer = null;
    this._buildCard();
  }

  public override getCardSize(): number {
    const hasHeader = Boolean(this._config?.header?.title?.trim());
    const innerSize =
      typeof this._innerCard?.getCardSize === "function"
        ? Number(this._innerCard.getCardSize()) || 1
        : 1;
    return innerSize + (hasHeader ? 1 : 0);
  }

  public getLayoutOptions(): Record<string, any> {
    return (this._innerCard as any)?.getLayoutOptions?.() ?? {};
  }

  private _cardConfig(): Record<string, any> {
    const config = deviceAwareClone(
      this._config || ({} as DeviceAwareAutoEntitiesConfig),
    );
    const excludeInvalid = config.exclude_invalid_states !== false;
    delete config.header;
    delete config.exclude_invalid_states;
    config.type = DEVICE_AWARE_INNER_TYPE;
    const filter = config.filter ?? {};
    filter.exclude = Array.isArray(filter.exclude) ? [...filter.exclude] : [];
    if (excludeInvalid) {
      for (const st of ["unavailable", "unknown"]) {
        if (
          !filter.exclude.some(
            (rule: any) => rule?.state === st && Object.keys(rule).length === 1,
          )
        ) {
          filter.exclude.push({ state: st });
        }
      }
    }
    config.filter = filter;
    config.unique = true;
    return config;
  }

  private async _buildCard(): Promise<void> {
    if (!this.isConnected || !this._config || !this.hass) return;
    const loadCardHelpers =
      (globalThis as any).loadCardHelpers ||
      (typeof window !== "undefined"
        ? (window as any).loadCardHelpers
        : undefined);
    if (typeof loadCardHelpers !== "function") return;

    const generation = ++this._generation;
    try {
      const helpers = await loadCardHelpers();
      if (generation !== this._generation || !this.isConnected) return;
      const card = helpers.createCardElement(this._cardConfig());
      card.hass = this.hass;
      this._innerCard = card;
      this._innerError = false;
    } catch {
      if (generation !== this._generation) return;
      if (this._retryTimer) clearTimeout(this._retryTimer);
      this._retryTimer = setTimeout(() => {
        this._retryTimer = null;
        this._buildCard();
      }, 31000);
      this._innerError = true;
    }
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    if (this._config && this.hass && !this._innerCard) {
      this._buildCard();
    }
  }

  public override disconnectedCallback(): void {
    if (this._retryTimer) clearTimeout(this._retryTimer);
    this._retryTimer = null;
    this._generation += 1;
    super.disconnectedCallback();
  }

  protected override willUpdate(): void {
    if (this._innerCard && this.hass) {
      this._innerCard.hass = this.hass;
    } else if (
      this.isConnected &&
      this._config &&
      this.hass &&
      !this._innerCard
    ) {
      void this._buildCard();
    }
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const header = this._config.header;
    const title = String(header?.title || "").trim();

    return html`
      ${
        title
          ? html`
              <div class="head">
                <ha-icon
                  icon="${this.esc(header?.icon || "mdi:format-list-bulleted")}"
                ></ha-icon>
                <h2>${this.esc(title)}</h2>
              </div>
            `
          : ""
      }
      <div class="body">
        ${
          this._innerCard
            ? this._innerCard
            : this._innerError
              ? html`
                  <ha-alert alert-type="error">
                    Household controls are temporarily unavailable.
                  </ha-alert>
                `
              : ""
        }
      </div>
    `;
  }
}

registerCard({
  type: "component-device-aware-auto-entities-v1",
  element: ComponentDeviceAwareAutoEntitiesV1,
  name: "Device Aware Auto Entities",
  description: "Presentation wrapper for Auto-Entities collections.",
});
