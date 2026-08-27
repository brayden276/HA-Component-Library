export * from "./media-row-card.types";
import type { MediaRowCardConfig } from "./media-row-card.types";
export * from "./media-row-card.styles";
import { mediaRowCardStyles } from "./media-row-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import type { HassEntity } from "../../types/home-assistant";
import {
  interaction,
  InteractionHandle,
  waitForEntityState,
} from "../../utils/interaction";
import { registerCard } from "../../utils/registration";

const MEDIA_ROW_FEATURES = { pause: 1, previous: 16, next: 32, play: 512 };

const DEFAULTS: MediaRowCardConfig = {
  type: "custom:component-media-row-v2",
  icon: "mdi:speaker",
  title: "Media player",
  state: "Playing · Media title",
  entity: null,
};

@customElement("component-media-row-v2")
export class ComponentMediaRowV2 extends LitBaseCard<MediaRowCardConfig> {
  @state()
  private _playing = true;

  @state()
  private _optimisticPlaying: boolean | null = null;

  @state()
  private _busy = false;

  private _interactionHandles: InteractionHandle[] = [];

  public static override styles: CSSResultGroup = mediaRowCardStyles;

  public override setConfig(config: MediaRowCardConfig): void {
    super.setConfig({ ...DEFAULTS, ...config });
    this._playing = true;
    this._optimisticPlaying = null;
    this._busy = false;
  }

  public override getCardSize(): number {
    return 1;
  }

  private _liveState(): HassEntity | null {
    return this._config?.entity
      ? (this.hass?.states?.[this._config.entity] ?? null)
      : null;
  }

  private _available(st: HassEntity | null): boolean {
    return Boolean(
      st &&
      !["unknown", "unavailable"].includes(String(st.state).toLowerCase()),
    );
  }

  private _supported(st: HassEntity | null, feature: number): boolean {
    const value = Number(st?.attributes?.supported_features);
    return !Number.isFinite(value) || Boolean(value & feature);
  }

  private _description(st: HassEntity | null): string {
    if (!this._config?.entity) return this._config?.state || "";
    if (!this._available(st)) return "Unavailable";
    const status = String(st?.state || "")
      .replaceAll("_", " ")
      .replace(/^./, (x) => x.toUpperCase());
    return [status, st?.attributes?.media_title].filter(Boolean).join(" · ");
  }

  private async _playPause(wasPlaying: boolean): Promise<void> {
    if (this._busy || !this._config?.entity || !this.hass) return;
    this._busy = true;
    try {
      const service = wasPlaying ? "media_pause" : "media_play";
      await this.hass.callService("media_player", service, {
        entity_id: this._config.entity,
      });
      await waitForEntityState(
        this.hass,
        this._config.entity,
        (value) =>
          wasPlaying
            ? value !== "playing" &&
              !["unknown", "unavailable"].includes(String(value).toLowerCase())
            : value === "playing",
        { timeout: 9000 },
      );
      this._optimisticPlaying = null;
      this._busy = false;
    } catch (error) {
      this._busy = false;
      throw error;
    }
  }

  private _momentary(service: string): Promise<any> | void {
    if (!this._config?.entity || !this.hass) return;
    return this.hass.callService("media_player", service, {
      entity_id: this._config.entity,
    });
  }

  public override disconnectedCallback(): void {
    this._busy = false;
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];
    super.disconnectedCallback();
  }

  protected override updated(): void {
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];

    const live = Boolean(this._config?.entity);
    const state = this._liveState();
    const available = live && this._available(state);
    const reportedPlaying = available
      ? state?.state === "playing"
      : this._playing;

    if (live) {
      const identity = this.renderRoot.querySelector(
        ".identity",
      ) as HTMLElement | null;
      if (identity) {
        identity.setAttribute(
          "aria-label",
          `Open details for ${this._config?.title}`,
        );
        this._interactionHandles.push(
          interaction(identity, {
            primary: () => this.moreInfo(this._config?.entity),
            feedback: true,
          }),
        );
      }
      const prevBtn = this.renderRoot.querySelector(
        ".previous",
      ) as HTMLElement | null;
      const nextBtn = this.renderRoot.querySelector(
        ".next",
      ) as HTMLElement | null;
      if (prevBtn) {
        this._interactionHandles.push(
          interaction(prevBtn, {
            primary: () => this._momentary("media_previous_track"),
            feedback: true,
          }),
        );
      }
      if (nextBtn) {
        this._interactionHandles.push(
          interaction(nextBtn, {
            primary: () => this._momentary("media_next_track"),
            feedback: true,
          }),
        );
      }
    }

    const mainBtn = this.renderRoot.querySelector(
      ".main",
    ) as HTMLElement | null;
    if (mainBtn) {
      if (!live) {
        this._interactionHandles.push(
          interaction(mainBtn, {
            primary: () => {
              this._playing = !this._playing;
            },
            optimistic: false,
            feedback: true,
          }),
        );
      } else {
        this._interactionHandles.push(
          interaction(mainBtn, {
            primary: () => this._playPause(reportedPlaying),
            optimistic: {
              capture: () => reportedPlaying,
              apply: () => {
                this._optimisticPlaying = !reportedPlaying;
                mainBtn.setAttribute(
                  "aria-label",
                  reportedPlaying ? "Play" : "Pause",
                );
                mainBtn
                  .querySelector("ha-icon")
                  ?.setAttribute(
                    "icon",
                    `mdi:${reportedPlaying ? "play" : "pause"}`,
                  );
              },
              rollback: () => {
                this._optimisticPlaying = null;
              },
            },
            feedback: true,
          }),
        );
      }
    }
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const state = this._liveState();
    const live = Boolean(this._config.entity);
    const available = live && this._available(state);
    const reportedPlaying = available
      ? state?.state === "playing"
      : this._playing;
    const playing = this._optimisticPlaying ?? reportedPlaying;
    const previousEnabled =
      available && this._supported(state, MEDIA_ROW_FEATURES.previous);
    const nextEnabled =
      available && this._supported(state, MEDIA_ROW_FEATURES.next);
    const mainEnabled =
      !this._busy &&
      (!live ||
        (available &&
          this._supported(
            state,
            playing ? MEDIA_ROW_FEATURES.pause : MEDIA_ROW_FEATURES.play,
          )));

    return html`
      <ha-card>
        <div class="wrap">
          <span class="icon">
            <ha-icon icon="${this.esc(this._config.icon)}"></ha-icon>
          </span>
          ${
            live
              ? html`
                  <span class="identity" role="button" tabindex="0">
                    <div class="title">${this.esc(this._config.title)}</div>
                    <div class="desc">
                      ${this.esc(this._description(state))}
                    </div>
                  </span>
                `
              : html`
                  <span>
                    <div class="title">${this.esc(this._config.title)}</div>
                    <div class="desc">
                      ${this.esc(this._description(state))}
                    </div>
                  </span>
                `
          }
          <span class="buttons">
            ${
              live
                ? html`
                    <button
                      class="i btn previous"
                      type="button"
                      aria-label="Previous"
                      ?disabled=${!previousEnabled}
                    >
                      <ha-icon icon="mdi:skip-previous"></ha-icon>
                    </button>
                  `
                : html`
                    <span class="btn" aria-hidden="true">
                      <ha-icon icon="mdi:skip-previous"></ha-icon>
                    </span>
                  `
            }
            <button
              class="i btn main"
              type="button"
              aria-label="${playing ? "Pause" : "Play"}"
              ?disabled=${!mainEnabled}
            >
              <ha-icon icon="mdi:${playing ? "pause" : "play"}"></ha-icon>
            </button>
            ${
              live
                ? html`
                    <button
                      class="i btn next"
                      type="button"
                      aria-label="Next"
                      ?disabled=${!nextEnabled}
                    >
                      <ha-icon icon="mdi:skip-next"></ha-icon>
                    </button>
                  `
                : html`
                    <span class="btn" aria-hidden="true">
                      <ha-icon icon="mdi:skip-next"></ha-icon>
                    </span>
                  `
            }
          </span>
        </div>
      </ha-card>
    `;
  }
}

registerCard({
  type: "component-media-row-v2",
  element: ComponentMediaRowV2,
  name: "Media Row",
  description: "Reusable media-row component.",
});
