export * from "./apple-tv-card.types";
import type { AppleTvControllerConfig } from "./apple-tv-card.types";
export * from "./apple-tv-card.styles";
import { appleTvCardStyles } from "./apple-tv-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import type {
  LovelaceCard,
  LovelaceGridOptions,
} from "../../types/home-assistant";
import { InteractionHandle } from "../../utils/interaction";
import { registerCard } from "../../utils/registration";

const APPLE_TV_REMOTE_COMMANDS = Object.freeze([
  ["up", "Up", "mdi:chevron-up"],
  ["left", "Left", "mdi:chevron-left"],
  ["select", "Select", "mdi:radiobox-marked"],
  ["right", "Right", "mdi:chevron-right"],
  ["down", "Down", "mdi:chevron-down"],
] as const);

const APPLE_TV_UTILITY_COMMANDS = Object.freeze([
  ["menu", "Menu", "mdi:menu"],
  ["home", "Home", "mdi:home-outline"],
  ["top_menu", "Top Menu", "mdi:format-list-bulleted"],
] as const);

const appleTvNativeTileConfig = (config: AppleTvControllerConfig) => ({
  type: "tile",
  entity: config.entity,
  ...(config.title ? { name: config.title } : {}),
  features_position: "bottom",
  features: [
    {
      type: "media-player-playback",
      controls: [
        "media_previous_track",
        "media_play_pause",
        "media_next_track",
      ],
    },
    { type: "media-player-volume-buttons", show_mute_button: true },
    { type: "media-player-source" },
  ],
});

@customElement("component-apple-tv-controller-v1")
export class ComponentAppleTvControllerV1 extends LitBaseCard<AppleTvControllerConfig> {
  @state()
  private _nativeCard: LovelaceCard | null = null;

  private _buildToken = 0;
  private _interactionHandles: InteractionHandle[] = [];

  public static override getGridOptions(): LovelaceGridOptions {
    return { columns: 12, rows: "auto" };
  }

  public static override styles: CSSResultGroup = appleTvCardStyles;

  public override setConfig(config: AppleTvControllerConfig): void {
    if (!config?.entity && !config?.demo) {
      throw new Error("An Apple TV media_player entity is required");
    }
    this._buildToken += 1;
    this._nativeCard = null;
    super.setConfig({
      type: "custom:component-apple-tv-controller-v1",
      entity: config?.entity || "media_player.demo_apple_tv",
      title: config?.title || undefined,
      demo: Boolean(config?.demo),
      remote_entity: config?.remote_entity || null,
      keyboard_entity: config?.keyboard_entity || null,
      keyboard_config_entry_id:
        config?.keyboard_config_entry_id || config?.config_entry_id || null,
    });
    this._buildNativeCard();
  }

  public override getCardSize(): number {
    return this._config?.remote_entity ? 4 : 2;
  }

  private async _buildNativeCard(): Promise<void> {
    if (!this._config || this._nativeCard || !this.isConnected) return;
    const loadCardHelpers = (globalThis as any).loadCardHelpers;
    if (typeof loadCardHelpers !== "function") return;
    const token = ++this._buildToken;
    try {
      const helpers = await loadCardHelpers();
      if (token !== this._buildToken || !this.isConnected) return;
      const card = helpers.createCardElement(
        appleTvNativeTileConfig(this._config),
      );
      card.hass = this.hass;
      this._nativeCard = card;
    } catch (error) {
      console.error("Could not create native Apple TV media tile", error);
    }
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._buildNativeCard();
  }

  public override disconnectedCallback(): void {
    this._buildToken += 1;
    for (const h of this._interactionHandles) h.destroy();
    this._interactionHandles = [];
    super.disconnectedCallback();
  }

  protected override willUpdate(): void {
    if (this._nativeCard && this.hass) {
      this._nativeCard.hass = this.hass;
    }
  }

  private async _remoteCommand(command: string): Promise<void> {
    const remoteId =
      this._config?.remote_entity ||
      (this._config?.entity?.startsWith("remote.")
        ? this._config?.entity
        : this._config?.entity?.replace(/^media_player\./, "remote."));
    if (this._config?.demo || !this.hass || !remoteId)
      return;
    try {
      await this.hass.callService("remote", "send_command", {
        entity_id: remoteId,
        command,
      });
    } catch (error) {
      console.error(`Apple TV remote command failed: ${command}`, error);
    }
  }

  private async _keyboardAction(service: string): Promise<void> {
    if (
      this._config?.demo ||
      !this.hass ||
      !this._config?.keyboard_config_entry_id
    )
      return;
    const data: Record<string, any> = {
      config_entry_id: this._config.keyboard_config_entry_id,
    };
    const input = this.renderRoot.querySelector(
      ".keyboard input",
    ) as HTMLInputElement | null;
    if (service === "set_keyboard_text") {
      const text = input?.value;
      if (!text) return;
      data.text = text;
    } else if (service === "clear_keyboard_text") {
      if (input) input.value = "";
    }
    try {
      await this.hass.callService("apple_tv", service, data);
    } catch (error) {
      console.error(`Apple TV keyboard action failed: ${service}`, error);
    }
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const remoteEntity =
      this._config.remote_entity ||
      (this._config.entity?.startsWith("remote.")
        ? this._config.entity
        : this._config.entity?.replace(/^media_player\./, "remote."));
    const remote = remoteEntity && this.hass?.states?.[remoteEntity];
    const remoteAvailable =
      this._config.demo ||
      Boolean(
        remote &&
          remote.state !== "unavailable" &&
          remote.state !== "unknown",
      );

    const hasKeyboard = Boolean(
      this._config.keyboard_entity && this._config.keyboard_config_entry_id,
    );
    const keyboardFocused =
      this._config.demo ||
      (hasKeyboard &&
        this.hass?.states?.[this._config.keyboard_entity!]?.state === "on");

    const byCommand = new Map(
      APPLE_TV_REMOTE_COMMANDS.map((item) => [item[0], item]),
    );
    const layout = [
      null,
      "up",
      null,
      "left",
      "select",
      "right",
      null,
      "down",
      null,
    ] as const;

    return html`
      <div class="stack">
        <div class="native">${this._nativeCard || this._renderMediaBanner()}</div>

        ${
          remoteEntity
            ? html`
                <section class="remote">
                  <div class="remote-head">
                    <span class="remote-title">Remote</span>
                    <span class="power">
                      <button
                        type="button"
                        data-cmd="wakeup"
                        aria-label="Wake"
                        ?disabled=${!remoteAvailable}
                        @click=${() => this._remoteCommand("wakeup")}
                      >
                        <ha-icon icon="mdi:power-on"></ha-icon>
                        <span>Wake</span>
                      </button>
                      <button
                        type="button"
                        data-cmd="suspend"
                        aria-label="Sleep"
                        ?disabled=${!remoteAvailable}
                        @click=${() => this._remoteCommand("suspend")}
                      >
                        <ha-icon icon="mdi:power-sleep"></ha-icon>
                        <span>Sleep</span>
                      </button>
                    </span>
                  </div>

                  <div
                    class="dpad"
                    aria-label="Apple TV directional remote"
                    tabindex="0"
                    role="group"
                    @keydown=${(e: KeyboardEvent) => {
                      if (!remoteAvailable) return;
                      if (e.key === "ArrowUp") {
                        e.preventDefault();
                        this._remoteCommand("up");
                      } else if (e.key === "ArrowDown") {
                        e.preventDefault();
                        this._remoteCommand("down");
                      } else if (e.key === "ArrowLeft") {
                        e.preventDefault();
                        this._remoteCommand("left");
                      } else if (e.key === "ArrowRight") {
                        e.preventDefault();
                        this._remoteCommand("right");
                      } else if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        this._remoteCommand("select");
                      }
                    }}
                  >
                    ${layout.map((cmd) => {
                      if (!cmd) {
                        return html`<button
                          class="blank"
                          type="button"
                          tabindex="-1"
                          aria-hidden="true"
                        ></button>`;
                      }
                      const [, labelText, icon] = byCommand.get(cmd)!;
                      return html`
                        <button
                          class="${cmd === "select" ? "select" : "direction"}"
                          type="button"
                          data-cmd="${cmd}"
                          aria-label="${labelText}"
                          ?disabled=${!remoteAvailable}
                          @click=${() => this._remoteCommand(cmd)}
                        >
                          <ha-icon icon="${icon}"></ha-icon>
                        </button>
                      `;
                    })}
                  </div>

                  <div class="utility">
                    ${APPLE_TV_UTILITY_COMMANDS.map(
                      ([cmd, labelText, icon]) => html`
                        <button
                          type="button"
                          data-cmd="${cmd}"
                          aria-label="${labelText}"
                          ?disabled=${!remoteAvailable}
                          @click=${() => this._remoteCommand(cmd)}
                        >
                          <ha-icon icon="${icon}"></ha-icon>
                          <span>${labelText}</span>
                        </button>
                      `,
                    )}
                  </div>

                  ${
                    hasKeyboard
                      ? html`
                          <div class="keyboard">
                            <input
                              type="text"
                              aria-label="Apple TV keyboard text"
                              placeholder="Type on Apple TV"
                              ?disabled=${!keyboardFocused}
                              @keydown=${(e: KeyboardEvent) => {
                                if (e.key === "Enter") {
                                  this._keyboardAction("set_keyboard_text");
                                }
                              }}
                            />
                            <button
                              class="keyboard-set"
                              type="button"
                              aria-label="Set keyboard text"
                              ?disabled=${!keyboardFocused}
                              @click=${() => this._keyboardAction("set_keyboard_text")}
                            >
                              <ha-icon icon="mdi:keyboard"></ha-icon>
                            </button>
                            <button
                              class="keyboard-clear"
                              type="button"
                              aria-label="Clear keyboard text"
                              ?disabled=${!keyboardFocused}
                              @click=${() => this._keyboardAction("clear_keyboard_text")}
                            >
                              <ha-icon icon="mdi:backspace-outline"></ha-icon>
                            </button>
                          </div>
                        `
                      : ""
                  }
                </section>
              `
            : ""
        }
      </div>
    `;
  }

  private _renderMediaBanner(): TemplateResult {
    const mediaEntity = this._config?.entity;
    const st = mediaEntity ? this.hass?.states?.[mediaEntity] : null;
    const attr = st?.attributes || {};
    const isPlaying = st?.state === "playing";
    const isOff = !st || st.state === "off" || st.state === "unavailable" || st.state === "unknown";

    const title =
      attr.media_title ||
      attr.app_name ||
      this._config?.title ||
      attr.friendly_name ||
      "Apple TV";

    const subtitleParts = [
      attr.app_name && attr.media_title ? attr.app_name : null,
      attr.media_artist,
      attr.media_series_title
        ? `${attr.media_series_title}${attr.media_season ? ` S${attr.media_season}:E${attr.media_episode}` : ""}`
        : null,
      !isPlaying && st?.state ? st.state.charAt(0).toUpperCase() + st.state.slice(1) : null,
    ].filter(Boolean);

    const subtitle = subtitleParts.join(" · ") || (isOff ? "Off" : "Idle");

    return html`
      <div class="media-banner">
        <div class="media-info">
          <div class="media-icon">
            <ha-icon icon="${attr.icon || "mdi:apple"}"></ha-icon>
          </div>
          <div class="media-details">
            <div class="media-title">${this.esc(title)}</div>
            <div class="media-sub">${this.esc(subtitle)}</div>
          </div>
          <button
            class="media-power"
            type="button"
            aria-label="Toggle Apple TV Power"
            @click=${() => {
              if (mediaEntity && this.hass) {
                this.hass.callService("media_player", "toggle", { entity_id: mediaEntity });
              }
            }}
          >
            <ha-icon icon="mdi:power"></ha-icon>
          </button>
        </div>

        <div class="media-controls">
          <button
            type="button"
            aria-label="Previous Track"
            ?disabled=${isOff}
            @click=${() => {
              if (mediaEntity && this.hass) {
                this.hass.callService("media_player", "media_previous_track", { entity_id: mediaEntity });
              }
            }}
          >
            <ha-icon icon="mdi:skip-previous"></ha-icon>
          </button>

          <button
            class="play-pause"
            type="button"
            aria-label="${isPlaying ? "Pause" : "Play"}"
            ?disabled=${isOff}
            @click=${() => {
              if (mediaEntity && this.hass) {
                this.hass.callService("media_player", "media_play_pause", { entity_id: mediaEntity });
              }
            }}
          >
            <ha-icon icon="${isPlaying ? "mdi:pause" : "mdi:play"}"></ha-icon>
          </button>

          <button
            type="button"
            aria-label="Next Track"
            ?disabled=${isOff}
            @click=${() => {
              if (mediaEntity && this.hass) {
                this.hass.callService("media_player", "media_next_track", { entity_id: mediaEntity });
              }
            }}
          >
            <ha-icon icon="mdi:skip-next"></ha-icon>
          </button>

          <button
            type="button"
            aria-label="Volume Down"
            ?disabled=${isOff}
            @click=${() => {
              if (mediaEntity && this.hass) {
                this.hass.callService("media_player", "volume_down", { entity_id: mediaEntity });
              }
            }}
          >
            <ha-icon icon="mdi:volume-minus"></ha-icon>
          </button>

          <button
            type="button"
            aria-label="Volume Up"
            ?disabled=${isOff}
            @click=${() => {
              if (mediaEntity && this.hass) {
                this.hass.callService("media_player", "volume_up", { entity_id: mediaEntity });
              }
            }}
          >
            <ha-icon icon="mdi:volume-plus"></ha-icon>
          </button>
        </div>
      </div>
    `;
  }
}


registerCard({
  type: "component-apple-tv-controller-v1",
  element: ComponentAppleTvControllerV1,
  name: "Apple TV Controller",
  description:
    "Native Home Assistant media controls with an optional explicit Apple TV remote.",
});
