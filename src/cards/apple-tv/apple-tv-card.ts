export * from "./apple-tv-card.types";
import type { AppleTvControllerConfig } from "./apple-tv-card.types";
export * from "./apple-tv-card.styles";
import { appleTvCardStyles } from "./apple-tv-card.styles";
import {
  html,
  nothing,
  type CSSResultGroup,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import { customElement, state } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import type { LovelaceGridOptions } from "../../types/home-assistant";
import { runServiceAction } from "../../utils/entity";
import { registerCard } from "../../utils/registration";

const REMOTE_COMMANDS = Object.freeze([
  ["up", "Up", "mdi:chevron-up"],
  ["left", "Left", "mdi:chevron-left"],
  ["select", "Select", "mdi:circle"],
  ["right", "Right", "mdi:chevron-right"],
  ["down", "Down", "mdi:chevron-down"],
] as const);
const UTILITY_COMMANDS = Object.freeze([
  ["menu", "Menu", "mdi:menu"],
  ["home", "Home", "mdi:home-outline"],
  ["top_menu", "Top menu", "mdi:format-list-bulleted"],
] as const);
type Panel = "remote" | "apps" | null;

@customElement("component-apple-tv-controller-v1")
export class ComponentAppleTvControllerV1 extends LitBaseCard<AppleTvControllerConfig> {
  @state() private _activePanel: Panel = null;
  @state() private _actionError: string | null = null;
  @state() private _busyAction: string | null = null;
  private _inFlightActions = new Set<string>();
  private _lastFocused: HTMLElement | null = null;

  public static override getGridOptions(): LovelaceGridOptions {
    return { columns: 12, rows: "auto" };
  }
  public static override styles: CSSResultGroup = appleTvCardStyles;

  public override setConfig(config: AppleTvControllerConfig): void {
    if (!config?.entity && !config?.demo)
      throw new Error("An Apple TV media_player entity is required");
    this._activePanel = null;
    this._actionError = null;
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
  }
  public override getCardSize(): number {
    return this._config?.remote_entity ? 4 : 2;
  }
  public override disconnectedCallback(): void {
    this._activePanel = null;
    this._lastFocused = null;
    super.disconnectedCallback();
  }
  protected override updated(changed: PropertyValues): void {
    if (changed.has("_activePanel") && this._activePanel) {
      this.updateComplete.then(() =>
        this.renderRoot
          .querySelector<HTMLElement>("[data-dialog-close]")
          ?.focus(),
      );
    }
  }

  private _isAvailable(entityId?: string | null): boolean {
    const value = entityId ? this.hass?.states?.[entityId]?.state : undefined;
    return (
      value !== undefined && value !== "unavailable" && value !== "unknown"
    );
  }
  private _serviceSupported(domain: string, service: string): boolean {
    const services = this.hass?.services;
    return (
      !services ||
      Object.keys(services).length === 0 ||
      Boolean(services[domain]?.[service])
    );
  }
  private _remoteEntity(): string | null {
    const entity = this._config?.entity;
    return (
      this._config?.remote_entity ||
      (entity
        ? entity.startsWith("remote.")
          ? entity
          : entity.replace(/^media_player\./, "remote.")
        : null)
    );
  }
  private _remoteAvailable(): boolean {
    const entity = this._remoteEntity();
    return Boolean(
      this._config?.demo ||
      (entity &&
        this._isAvailable(entity) &&
        this._serviceSupported("remote", "send_command")),
    );
  }
  private _mediaAvailable(service: string): boolean {
    return Boolean(
      this._config?.demo ||
      (this._isAvailable(this._config?.entity) &&
        this._serviceSupported("media_player", service)),
    );
  }
  private _openPanel(panel: Exclude<Panel, null>, event: Event): void {
    this._lastFocused =
      event.currentTarget instanceof HTMLElement ? event.currentTarget : null;
    this._actionError = null;
    this._activePanel = panel;
  }
  private _closePanel(): void {
    this._activePanel = null;
    const lastFocused = this._lastFocused;
    this._lastFocused = null;
    lastFocused?.focus();
  }
  private _setPowerActionFeedback(busy: boolean, failed = false): void {
    for (const button of this.renderRoot.querySelectorAll<HTMLButtonElement>(
      "[data-remote-command='wakeup'], [data-remote-command='suspend']",
    )) {
      button.setAttribute("aria-busy", String(busy));
      button.disabled = busy || !this._remoteAvailable();
      if (failed) button.setAttribute("data-interaction-error", "true");
      else button.removeAttribute("data-interaction-error");
    }
  }
  private async _callService(
    key: string,
    domain: string,
    service: string,
    data?: Record<string, unknown>,
    targetEntity?: string | null,
  ): Promise<void> {
    if (
      !this.hass ||
      !this._serviceSupported(domain, service) ||
      (targetEntity && !this._isAvailable(targetEntity)) ||
      this._inFlightActions.has(key)
    )
      return;
    this._inFlightActions.add(key);
    this._busyAction = key;
    if (key === "remote:power") this._setPowerActionFeedback(true);
    this._actionError = null;
    try {
      await runServiceAction(this.hass, {
        domain,
        service,
        data,
        target: targetEntity ? { entity_id: targetEntity } : undefined,
      });
    } catch {
      this._actionError =
        "Action failed. Check that the Apple TV is available.";
      if (key === "remote:power") this._setPowerActionFeedback(true, true);
    } finally {
      this._inFlightActions.delete(key);
      if (this._busyAction === key) this._busyAction = null;
      if (key === "remote:power")
        this._setPowerActionFeedback(false, this._actionError !== null);
    }
  }
  private _mediaAction(service: string): Promise<void> {
    return this._callService(
      `media:${service}`,
      "media_player",
      service,
      undefined,
      this._config?.entity,
    );
  }
  private _remoteAction(command: string): Promise<void> {
    return this._callService(
      `remote:${command === "wakeup" || command === "suspend" ? "power" : command}`,
      "remote",
      "send_command",
      { command },
      this._remoteEntity(),
    );
  }
  private async _keyboardAction(
    service: "set_keyboard_text" | "clear_keyboard_text",
  ): Promise<void> {
    const config = this._config;
    if (
      !config?.keyboard_entity ||
      !config.keyboard_config_entry_id ||
      !this._isAvailable(config.keyboard_entity)
    )
      return;
    const input =
      this.renderRoot.querySelector<HTMLInputElement>(".keyboard input");
    const data: Record<string, unknown> = {
      config_entry_id: config.keyboard_config_entry_id,
    };
    if (service === "set_keyboard_text") {
      if (!input?.value.trim()) return;
      data.text = input.value;
    } else if (input) input.value = "";
    await this._callService(`keyboard:${service}`, "apple_tv", service, data);
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const entityId = this._config.entity || "media_player.demo_apple_tv";
    const state = this.hass?.states?.[entityId];
    const attributes = state?.attributes || {};
    const isPlaying = state?.state === "playing";
    const available = this._mediaAvailable("toggle");
    const title = this._config.title || attributes.friendly_name || "Apple TV";
    const subtitle =
      state?.state === "unavailable" || state?.state === "unknown"
        ? "Unavailable"
        : [
            isPlaying ? "Playing" : state?.state === "off" ? "Off" : "Idle",
            attributes.app_name || attributes.media_title,
          ]
            .filter(Boolean)
            .join(" · ");
    const appCount = Array.isArray(attributes.source_list)
      ? attributes.source_list.length
      : 0;
    return html`
      <ha-card>
        <div class="apple-card">
          <div class="apple-header">
            <button
              class="icon-well control-radius apple-more-info"
              type="button"
              aria-label="Show ${title} details"
              @click=${() => this.moreInfo(this._config?.entity)}
            >
              <ha-icon icon=${attributes.icon || "mdi:apple"}></ha-icon>
            </button>
            <div class="copy-block">
              <div class="label-title">${this.esc(title)}</div>
              <div class="label-sub" role="status">
                ${this.esc(subtitle || "Idle")}
              </div>
            </div>
            <div class="apple-header-actions">
              <button
                class="btn-icon-44 ${isPlaying ? "on" : ""}"
                type="button"
                aria-label="Play or pause"
                ?disabled=${!this._mediaAvailable("media_play_pause")}
                @click=${() => void this._mediaAction("media_play_pause")}
              >
                <ha-icon
                  class="sm"
                  icon="${isPlaying ? "mdi:pause" : "mdi:play"}"
                ></ha-icon>
              </button>
              <button
                class="btn-icon-44"
                type="button"
                aria-label="Volume down"
                ?disabled=${!this._mediaAvailable("volume_down")}
                @click=${() => void this._mediaAction("volume_down")}
              >
                <ha-icon class="sm" icon="mdi:volume-minus"></ha-icon>
              </button>
              <button
                class="btn-icon-44"
                type="button"
                aria-label="Volume up"
                ?disabled=${!this._mediaAvailable("volume_up")}
                @click=${() => void this._mediaAction("volume_up")}
              >
                <ha-icon class="sm" icon="mdi:volume-plus"></ha-icon>
              </button>
              <button
                class="btn-icon-44 ${available ? "on" : ""}"
                type="button"
                aria-label="Toggle Apple TV power"
                aria-pressed=${String(state?.state !== "off")}
                ?disabled=${!available}
                @click=${() => void this._mediaAction("toggle")}
              >
                <ha-icon class="sm" icon="mdi:power"></ha-icon>
              </button>
            </div>
          </div>
          <div class="apple-launchers">
            <button
              class="btn-action-pill apple-launcher launcher"
              type="button"
              @click=${(event: Event) => this._openPanel("remote", event)}
            >
              <div class="icon-well control-radius apple-launch-icon">
                <ha-icon class="sm" icon="mdi:remote"></ha-icon>
              </div>
              <div class="copy-block apple-launch-copy">
                <div class="label-title">Remote</div>
                <div class="label-sub">Navigation</div>
              </div>
            </button>
            <button
              class="btn-action-pill apple-launcher launcher"
              type="button"
              ?disabled=${!available}
              @click=${(event: Event) => this._openPanel("apps", event)}
            >
              <div class="icon-well control-radius apple-launch-icon">
                <ha-icon class="sm" icon="mdi:apps"></ha-icon>
              </div>
              <div class="copy-block apple-launch-copy">
                <div class="label-title">Apps</div>
                <div class="label-sub">
                  ${appCount ? `${appCount} available` : "Sources"}
                </div>
              </div>
            </button>
          </div>
          ${this._actionError ? html`<p class="action-error" role="alert">${this._actionError}</p>` : ""}
        </div>
      </ha-card>
      ${this._activePanel ? this._renderDialog() : ""}
    `;
  }

  private _backdropMouseDown = false;

  private _renderDialog(): TemplateResult {
    const title = this._activePanel === "remote" ? "Remote" : "Apps";
    return html`<section
      class="dialog-overlay"
      role="presentation"
      @mousedown=${(event: MouseEvent) => {
        this._backdropMouseDown = event.target === event.currentTarget;
      }}
      @click=${(event: MouseEvent) => {
        if (event.target === event.currentTarget && this._backdropMouseDown) {
          this._closePanel();
        }
        this._backdropMouseDown = false;
      }}
    >
      <section
        class="dialog-content"
        role="dialog"
        aria-modal="true"
        aria-label=${title}
        @click=${(e: MouseEvent) => e.stopPropagation()}
        @mousedown=${(e: MouseEvent) => e.stopPropagation()}
        @keydown=${(event: KeyboardEvent) => {
          if (event.key === "Escape") {
            event.stopPropagation();
            this._closePanel();
          }
        }}
      >
        <header class="dialog-header">
          <span>${title}</span>
          <button
            data-dialog-close
            class="btn-icon-44"
            type="button"
            aria-label="Close ${title}"
            @click=${this._closePanel}
          >
            <ha-icon class="sm" icon="mdi:close"></ha-icon>
          </button>
        </header>
        <div class="dialog-body">
          ${
            this._activePanel === "remote"
              ? this._renderRemote()
              : this._renderApps()
          }
        </div>
      </section>
    </section>`;
  }

  private _renderRemote(): TemplateResult {
    const available = this._remoteAvailable();
    const entityId = this._config?.entity || "media_player.demo_apple_tv";
    const state = this.hass?.states?.[entityId];
    const attributes = state?.attributes || {};
    const volumeLevel =
      attributes.volume_level !== undefined
        ? Math.round(Number(attributes.volume_level) * 100)
        : null;
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
    const commands = new Map(
      REMOTE_COMMANDS.map((command) => [command[0], command]),
    );
    const keyboardVisible = Boolean(
      this._config?.keyboard_entity && this._config?.keyboard_config_entry_id,
    );
    const keyboardAvailable = Boolean(
      this._config?.demo ||
      (this._config?.keyboard_entity &&
        this._isAvailable(this._config.keyboard_entity) &&
        this.hass?.states?.[this._config.keyboard_entity]?.state === "on"),
    );
    return html`<section
      class="remote"
      @click=${(e: MouseEvent) => e.stopPropagation()}
      @mousedown=${(e: MouseEvent) => e.stopPropagation()}
    >
      <div class="remote-toolbar">
        <button
          type="button"
          class="remote-power"
          data-remote-command="wakeup"
          data-cmd="wakeup"
          aria-busy=${String(this._busyAction === "remote:power")}
          data-interaction-error=${this._actionError ? "true" : nothing}
          ?disabled=${!available || this._busyAction === "remote:power"}
          @click=${(e: Event) => {
            e.stopPropagation();
            void this._remoteAction("wakeup");
          }}
        >
          <ha-icon icon="mdi:power-on"></ha-icon>
          <span>Wake</span>
        </button>
        <button
          type="button"
          class="remote-power"
          data-remote-command="suspend"
          data-cmd="suspend"
          aria-busy=${String(this._busyAction === "remote:power")}
          ?disabled=${!available || this._busyAction === "remote:power"}
          @click=${(e: Event) => {
            e.stopPropagation();
            void this._remoteAction("suspend");
          }}
        >
          <ha-icon icon="mdi:power-sleep"></ha-icon>
          <span>Sleep</span>
        </button>
        <button
          type="button"
          class="remote-power play-pause"
          ?disabled=${!this._mediaAvailable("media_play_pause")}
          @click=${(e: Event) => {
            e.stopPropagation();
            void this._mediaAction("media_play_pause");
          }}
        >
          <ha-icon icon="mdi:play-pause"></ha-icon>
          <span>Play/pause</span>
        </button>
      </div>
      ${
        volumeLevel !== null
          ? html`<div
              class="volume-row"
              @click=${(e: MouseEvent) => e.stopPropagation()}
              @mousedown=${(e: MouseEvent) => e.stopPropagation()}
            >
              <button
                class="btn-icon-30"
                type="button"
                aria-label="Toggle mute"
                @click=${(e: Event) => {
                e.stopPropagation();
                void this._callService(
                  "media:volume_mute",
                  "media_player",
                  "volume_mute",
                  { is_volume_muted: !attributes.is_volume_muted },
                  this._config?.entity,
                );
              }}
              >
                <ha-icon
                  icon="${attributes.is_volume_muted ? "mdi:volume-off" : "mdi:volume-high"}"
                ></ha-icon>
              </button>
              <input
                type="range"
                min="0"
                max="100"
                .value=${String(volumeLevel)}
                aria-label="Volume"
                @click=${(e: Event) => e.stopPropagation()}
                @mousedown=${(e: Event) => e.stopPropagation()}
                @change=${(e: Event) => {
                e.stopPropagation();
                const val = Number((e.target as HTMLInputElement).value) / 100;
                void this._callService(
                  "media:volume_set",
                  "media_player",
                  "set_volume_level",
                  { volume_level: val },
                  this._config?.entity,
                );
              }}
              />
              <span class="volume-val">${volumeLevel}%</span>
            </div>`
          : ""
      }
      <div
        class="dpad dpad-cluster"
        role="group"
        aria-label="Apple TV directional remote"
        tabindex=${available ? "0" : "-1"}
        @keydown=${(event: KeyboardEvent) => this._handleRemoteKey(event, available)}
      >
        ${layout.map((key) => {
          if (!key) return html`<span class="blank" aria-hidden="true"></span>`;
          const [, label, icon] = commands.get(key)!;
          return html`<button
            class="dpad-btn ${key === "select" ? "select-center select" : "direction"}"
            data-key=${key}
            type="button"
            aria-label=${label}
            ?disabled=${!available}
            @click=${(e: Event) => {
              e.stopPropagation();
              void this._remoteAction(key);
            }}
          >
            <ha-icon icon=${icon}></ha-icon>
          </button>`;
        })}
      </div>
      <div class="utility">
        ${UTILITY_COMMANDS.map(
          ([command, label, icon]) =>
            html`<button
              type="button"
              ?disabled=${!available}
              @click=${(e: Event) => {
                e.stopPropagation();
                void this._remoteAction(command);
              }}
            >
              <ha-icon icon=${icon}></ha-icon>
              <span>${label}</span>
            </button>`,
        )}
      </div>
      ${
        keyboardVisible
          ? html`<div
              class="keyboard"
              @click=${(e: MouseEvent) => e.stopPropagation()}
              @mousedown=${(e: MouseEvent) => e.stopPropagation()}
            >
              <input
                type="text"
                aria-label="Apple TV keyboard text"
                placeholder="Type on Apple TV"
                ?disabled=${!keyboardAvailable}
                @keydown=${(event: KeyboardEvent) => {
                if (event.key === "Enter")
                  void this._keyboardAction("set_keyboard_text");
              }}
              />
              <button
                type="button"
                aria-label="Send keyboard text"
                ?disabled=${!keyboardAvailable}
                @click=${(e: Event) => {
                e.stopPropagation();
                void this._keyboardAction("set_keyboard_text");
              }}
              >
                <ha-icon icon="mdi:keyboard"></ha-icon>
              </button>
              <button
                type="button"
                aria-label="Clear keyboard text"
                ?disabled=${!keyboardAvailable}
                @click=${(e: Event) => {
                e.stopPropagation();
                void this._keyboardAction("clear_keyboard_text");
              }}
              >
                <ha-icon icon="mdi:backspace-outline"></ha-icon>
              </button>
            </div>`
          : ""
      }
    </section>`;
  }

  private _handleRemoteKey(event: KeyboardEvent, available: boolean): void {
    if (!available) return;
    const commands: Record<string, string> = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
      Enter: "select",
      " ": "select",
    };
    const command = commands[event.key];
    if (command) {
      event.preventDefault();
      void this._remoteAction(command);
    }
  }

  private _renderApps(): TemplateResult {
    const entityId = this._config?.entity || "media_player.demo_apple_tv";
    const attributes = this.hass?.states?.[entityId]?.attributes;
    const sources = attributes?.source_list;
    const active = attributes?.source;
    const apps = Array.isArray(sources)
      ? sources.filter((source): source is string => typeof source === "string")
      : [];
    return apps.length
      ? html`<div
          class="app-grid"
          @click=${(e: MouseEvent) => e.stopPropagation()}
          @mousedown=${(e: MouseEvent) => e.stopPropagation()}
        >
          ${apps.map(
            (app) =>
              html`<button
                class="app-btn ${app === active ? "active" : ""}"
                type="button"
                aria-pressed=${String(app === active)}
                @click=${(e: Event) => {
                  e.stopPropagation();
                  void this._callService(
                    `source:${app}`,
                    "media_player",
                    "select_source",
                    { source: app },
                    this._config?.entity,
                  );
                }}
              >
                <ha-icon icon="mdi:play-box-outline"></ha-icon>
                <span>${this.esc(app)}</span>
              </button>`,
          )}
        </div>`
      : html`<p class="empty-copy">
          No app sources are currently exposed by this Apple TV.
        </p>`;
  }
}

registerCard({
  type: "component-apple-tv-controller-v1",
  element: ComponentAppleTvControllerV1,
  name: "Apple TV Controller",
  description:
    "Apple TV media, remote and source controls with the established dashboard presentation.",
});
