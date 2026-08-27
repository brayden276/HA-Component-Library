export * from "./security-summary-card.types";
import type { SecuritySummaryConfig } from "./security-summary-card.types";
export * from "./security-summary-card.styles";
import { securitySummaryCardStyles } from "./security-summary-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import type { LovelaceGridOptions } from "../../types/home-assistant";
import type { LoadedSecurityModel } from "../../services/security/security-runtime";
import { loadSecurityModel } from "../../services/security/security-runtime";
import { interaction, InteractionHandle } from "../../utils/interaction";
import { registerCard } from "../../utils/registration";

@customElement("component-security-summary-v1")
export class ComponentSecuritySummaryV1 extends LitBaseCard<SecuritySummaryConfig> {
  public static stubConfig = { profile: "household-security" };

  @state()
  private _model: LoadedSecurityModel | null = null;

  private _sequence = 0;
  private _profileListener = (event: any) => {
    if (
      event.detail?.kind === "security" &&
      event.detail?.profileId ===
        (this._config?.profile || "household-security")
    ) {
      this._refresh(true);
    }
  };
  private _interactionHandles: InteractionHandle[] = [];

  public static override getGridOptions(): LovelaceGridOptions {
    return { columns: 12, rows: "auto" };
  }

  public static override styles: CSSResultGroup = securitySummaryCardStyles;

  public override setConfig(config: SecuritySummaryConfig): void {
    super.setConfig({
      profile: "household-security",
      title: "Security",
      ...config,
      type: "custom:component-security-summary-v1",
    });
    this._refresh();
  }

  public override getCardSize(): number {
    return 2;
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener(
      "ha-component-profile-change",
      this._profileListener,
    );
    this._refresh();
  }

  public override disconnectedCallback(): void {
    window.removeEventListener(
      "ha-component-profile-change",
      this._profileListener,
    );
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];
    super.disconnectedCallback();
  }

  private async _refresh(force = false): Promise<void> {
    if (!this.hass || !this._config) return;
    const sequence = ++this._sequence;
    try {
      const model = await loadSecurityModel(
        this.hass,
        this._config.profile || "household-security",
        { force },
      );
      if (sequence === this._sequence) {
        this._model = model;
      }
    } catch (err: any) {
      if (sequence === this._sequence) {
        this._model = {
          error: err,
          cameras: [],
          entries: [],
          attention: [],
          allClear: false,
          onlineCameras: 0,
        } as any;
      }
    }
  }

  protected override updated(): void {
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];

    const buttons = this.renderRoot.querySelectorAll(".attention button");
    buttons.forEach((btn) => {
      const entityId = (btn as HTMLElement).dataset.entityId;
      if (entityId) {
        this._interactionHandles.push(
          interaction(btn as HTMLElement, {
            primary: () => this.moreInfo(entityId),
            feedback: true,
          }),
        );
      }
    });
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const model = this._model;
    const error = model?.error || model?.profileError;
    const allClear = !error && Boolean(model?.allClear);

    const title = this._config.title || "Security";
    const detailText = model?.profileMissing
      ? `Configure ${this._config.profile || "household-security"} in HA Component Backend`
      : error
        ? error.message || "Security status is unavailable"
        : allClear
          ? "All clear"
          : `${model?.attention?.length || 0} item${(model?.attention?.length || 0) === 1 ? "" : "s"} need attention`;

    const countText = error
      ? "Unavailable"
      : `${model?.onlineCameras || 0}/${model?.cameras?.length || 0} cameras online`;

    const attentionItems = (model?.attention || []).slice(0, 4);

    return html`
      <ha-card>
        <div class="wrap ${allClear ? "ok" : ""}">
          <div class="top">
            <span class="icon">
              <ha-icon
                icon="${
                  error
                    ? "mdi:shield-alert-outline"
                    : allClear
                      ? "mdi:shield-check-outline"
                      : "mdi:shield-alert-outline"
                }"
              ></ha-icon>
            </span>
            <span class="copy">
              <span class="title">${this.esc(title)}</span>
              <span class="detail ${error ? "error" : ""}"
                >${this.esc(detailText)}</span
              >
            </span>
            <span class="count">${this.esc(countText)}</span>
          </div>

          ${
            attentionItems.length
              ? html`
                  <div class="attention">
                    ${attentionItems.map(
                      (item) => html`
                        <button
                          type="button"
                          data-entity-id="${item.entityId}"
                          aria-label="${this.esc(item.label)}. Open details."
                        >
                          <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
                          <span>${this.esc(item.label)}</span>
                        </button>
                      `,
                    )}
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
  type: "component-security-summary-v1",
  element: ComponentSecuritySummaryV1,
  name: "Security Summary V1",
  description:
    "Exception-first all-clear and attention summary discovered from Home Assistant capabilities.",
});
