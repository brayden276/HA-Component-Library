export * from "./security-dashboard-card.types";
import type { SecurityDashboardConfig } from "./security-dashboard-card.types";
export * from "./security-dashboard-card.styles";
import { securityDashboardCardStyles } from "./security-dashboard-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import type { PropertyValues } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import type { LovelaceGridOptions } from "../../types/home-assistant";
import type {
  LoadedSecurityModel,
  SecurityCameraItem,
  SecurityEntryItem,
  SecurityQuickActionItem,
} from "../../services/security/security-runtime";
import { loadSecurityModel } from "../../services/security/security-runtime";
import { registerCard } from "../../utils/registration";

@customElement("component-security-dashboard-v1")
export class ComponentSecurityDashboardV1 extends LitBaseCard<SecurityDashboardConfig> {
  public static stubConfig = {
    profile: "household-security",
    camera_columns: 2,
  };

  @state()
  private _model: LoadedSecurityModel | null = null;

  @state()
  private _viewerCamera: SecurityCameraItem | null = null;

  @state()
  private _settingsCamera: SecurityCameraItem | null = null;

  @state()
  private _entryConfirmId: string | null = null;

  private _sequence = 0;
  private _snapshotTimer: ReturnType<typeof setInterval> | null = null;
  private _entryConfirmTimer: ReturnType<typeof setTimeout> | null = null;
  private _snapshotStamp = Math.floor(Date.now() / 10000);

  private _profileListener = (event: any) => {
    if (
      event.detail?.kind === "security" &&
      event.detail?.profileId ===
        (this._config?.profile || "household-security")
    ) {
      this._refresh(true);
    }
  };

  private _visibilityListener = () => {
    if (document.visibilityState !== "hidden") {
      this._snapshotStamp = Math.floor(Date.now() / 10000);
      this.requestUpdate();
    }
  };

  public static override getGridOptions(): LovelaceGridOptions {
    return { columns: 12, rows: "auto" };
  }

  public static override styles: CSSResultGroup = securityDashboardCardStyles;

  public override setConfig(config: SecurityDashboardConfig): void {
    super.setConfig({
      profile: "household-security",
      camera_columns: 2,
      refresh_seconds: 15,
      title: "Security",
      ...config,
      type: "custom:component-security-dashboard-v1",
    });
    const cols = Math.max(
      1,
      Math.min(3, Number(this._config?.camera_columns) || 2),
    );
    this.style.setProperty("--security-columns", String(cols));
    this._schedule();
    this._refresh(true);
  }

  public override getCardSize(): number {
    return 12;
  }

  private _schedule(): void {
    if (this._snapshotTimer) clearInterval(this._snapshotTimer);
    this._snapshotTimer = setInterval(
      () => {
        if (document.visibilityState !== "hidden" && this.isConnected) {
          this._snapshotStamp = Math.floor(Date.now() / 10000);
          this.requestUpdate();
        }
      },
      Math.max(10, Number(this._config?.refresh_seconds) || 15) * 1000,
    );
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener("visibilitychange", this._visibilityListener);
    window.addEventListener(
      "ha-component-profile-change",
      this._profileListener,
    );
    this._schedule();
    this._refresh();
  }

  public override disconnectedCallback(): void {
    document.removeEventListener("visibilitychange", this._visibilityListener);
    window.removeEventListener(
      "ha-component-profile-change",
      this._profileListener,
    );
    if (this._snapshotTimer) clearInterval(this._snapshotTimer);
    this._snapshotTimer = null;
    if (this._entryConfirmTimer) clearTimeout(this._entryConfirmTimer);
    this._entryConfirmTimer = null;
    super.disconnectedCallback();
  }

  protected override willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has("hass") && this.hass) {
      this._refresh();
    }
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
          quickActions: [],
          attention: [],
          allClear: false,
          onlineCameras: 0,
        } as any;
      }
    }
  }

  private async _runQuickAction(
    action: SecurityQuickActionItem,
  ): Promise<void> {
    if (!this.hass || !action.available) return;
    await this.hass.callService(action.domain, action.service, {
      entity_id: action.entityId,
    });
    this._refresh(true);
  }

  private async _operateEntry(entry: SecurityEntryItem): Promise<void> {
    if (this._entryConfirmId !== entry.entityId) {
      this._entryConfirmId = entry.entityId;
      if (this._entryConfirmTimer) clearTimeout(this._entryConfirmTimer);
      this._entryConfirmTimer = setTimeout(() => {
        this._entryConfirmId = null;
      }, 3000);
      return;
    }

    this._entryConfirmId = null;
    if (this._entryConfirmTimer) clearTimeout(this._entryConfirmTimer);
    this._entryConfirmTimer = null;

    if (!this.hass) return;
    if (entry.controlEntityId) {
      const domain = entry.controlEntityId.split(".")[0];
      if (domain === "button") {
        await this.hass.callService("button", "press", {
          entity_id: entry.controlEntityId,
        });
      } else if (domain === "cover") {
        await this.hass.callService(
          "cover",
          entry.open ? "close_cover" : "open_cover",
          {
            entity_id: entry.controlEntityId,
          },
        );
      } else if (domain === "lock") {
        await this.hass.callService("lock", entry.open ? "lock" : "unlock", {
          entity_id: entry.controlEntityId,
        });
      } else {
        await this.hass.callService("homeassistant", "toggle", {
          entity_id: entry.controlEntityId,
        });
      }
    } else if (entry.domain === "lock") {
      await this.hass.callService("lock", entry.open ? "lock" : "unlock", {
        entity_id: entry.entityId,
      });
    } else if (entry.domain === "cover") {
      await this.hass.callService(
        "cover",
        entry.open ? "close_cover" : "open_cover",
        {
          entity_id: entry.entityId,
        },
      );
    }
    this._refresh(true);
  }

  private _openViewer(camera: SecurityCameraItem): void {
    this._viewerCamera = camera;
    const dialog = this.renderRoot.querySelector(
      ".viewer-dialog",
    ) as HTMLDialogElement | null;
    if (dialog && !dialog.open) dialog.showModal();
  }

  private _closeViewer(): void {
    const dialog = this.renderRoot.querySelector(
      ".viewer-dialog",
    ) as HTMLDialogElement | null;
    if (dialog?.open) dialog.close();
    this._viewerCamera = null;
  }

  private _openSettings(camera: SecurityCameraItem): void {
    this._settingsCamera = camera;
    const dialog = this.renderRoot.querySelector(
      ".settings-dialog",
    ) as HTMLDialogElement | null;
    if (dialog && !dialog.open) dialog.showModal();
  }

  private _closeSettings(): void {
    const dialog = this.renderRoot.querySelector(
      ".settings-dialog",
    ) as HTMLDialogElement | null;
    if (dialog?.open) dialog.close();
    this._settingsCamera = null;
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const model = this._model || ({} as LoadedSecurityModel);
    const configuredCameras = this._config.cameras;
    const allCameras = model.cameras || [];
    const cameras =
      configuredCameras && configuredCameras.length > 0
        ? allCameras.filter(
            (c) =>
              configuredCameras.includes(c.entityId) ||
              (c.deviceId && configuredCameras.includes(c.deviceId)) ||
              configuredCameras.includes(c.id),
          )
        : allCameras;

    const configuredEntries = this._config.entries;
    const allEntries = model.entries || [];
    const entries =
      configuredEntries && configuredEntries.length > 0
        ? allEntries.filter(
            (e) =>
              configuredEntries.includes(e.entityId) ||
              (e.deviceId && configuredEntries.includes(e.deviceId)),
          )
        : allEntries;

    const quickActions = model.quickActions || [];
    const attentionCount = (model.attention || []).length;
    const hasError = Boolean(
      model.error || model.profileError || model.profileMissing,
    );

    const activeDetections = cameras.reduce(
      (count, cam) =>
        count +
        (cam.detections || []).filter(
          (entity) => this.hass?.states?.[entity.entity_id]?.state === "on",
        ).length,
      0,
    );
    const openEntries = entries.filter((e) => e.available && e.open).length;

    return html`
      <div class="page">
        <section class="panel hero">
          <div class="hero-main">
            <span
              class="hero-icon ${attentionCount > 0 || hasError ? "attention" : ""}"
            >
              <ha-icon
                icon="${
                  hasError
                    ? "mdi:shield-alert-outline"
                    : attentionCount > 0
                      ? "mdi:shield-alert-outline"
                      : "mdi:shield-check-outline"
                }"
              ></ha-icon>
            </span>
            <div>
              <h1 class="page-title">
                ${this.esc(this._config.title || "Security")}
              </h1>
              <div class="status-copy">
                ${this.esc(
                  model.profileMissing
                    ? `Configure ${this._config.profile || "household-security"} in HA Component Backend`
                    : model.error || model.profileError
                      ? "Security status is temporarily unavailable"
                      : attentionCount > 0
                        ? `${attentionCount} ${attentionCount === 1 ? "item needs" : "items need"} attention`
                        : "All clear",
                )}
              </div>
            </div>
          </div>
          <div class="metrics">
            <span
              class="metric ${cameras.length > 0 && (model.onlineCameras || 0) < cameras.length ? "attention" : ""}"
            >
              <ha-icon icon="mdi:cctv"></ha-icon>
              <span>${model.onlineCameras || 0}/${cameras.length} cameras</span>
            </span>
            <span class="metric ${activeDetections > 0 ? "attention" : ""}">
              <ha-icon icon="mdi:motion-sensor"></ha-icon>
              <span>${activeDetections} active</span>
            </span>
            <span class="metric ${openEntries > 0 ? "attention" : ""}">
              <ha-icon icon="mdi:door"></ha-icon>
              <span>${openEntries} open</span>
            </span>
          </div>
        </section>

        ${
          quickActions.length
            ? html`
                <section class="panel section quick-section">
                  <div class="section-head">
                    <h2 class="section-title">Quick actions</h2>
                    <span class="section-meta"
                      >${quickActions.length} actions</span
                    >
                  </div>
                  <div class="quick-grid">
                    ${quickActions.map(
                      (action) => html`
                        <button
                          class="quick-action"
                          type="button"
                          ?disabled=${!action.available}
                          aria-label="${this.esc(action.name)}, ${action.available ? "Run" : "Unavailable"}"
                          @click=${() => this._runQuickAction(action)}
                        >
                          <span class="quick-icon"
                            ><ha-icon icon="${this.esc(action.icon)}"></ha-icon
                          ></span>
                          <span>
                            <span class="quick-name"
                              >${this.esc(action.name)}</span
                            >
                            <span class="quick-state"
                              >${action.available ? "Run" : "Unavailable"}</span
                            >
                          </span>
                        </button>
                      `,
                    )}
                  </div>
                </section>
              `
            : ""
        }

        <section class="panel section camera-section">
          <div class="section-head">
            <h2 class="section-title">Cameras</h2>
            <span class="section-meta"
              >${cameras.filter((c) => c.online).length}/${cameras.length}
              online</span
            >
          </div>
          ${
            cameras.length === 0
              ? html`<div class="empty">
                  No security cameras are configured
                </div>`
              : html`
                  <div class="camera-grid">
                    ${cameras.map((camera) => {
                      const st = this.hass?.states[camera.entityId];
                      const pic = st?.attributes?.entity_picture;
                      const base = pic
                        ? this.hass?.hassUrl
                          ? this.hass.hassUrl(pic)
                          : pic
                        : "";
                      const snapshotUrl = base
                        ? `${base}${base.includes("?") ? "&" : "?"}_=${this._snapshotStamp}`
                        : "";
                      const classifications = camera.classifications || [];

                      return html`
                        <article class="camera">
                          <button
                            class="camera-media ${camera.online ? "" : "offline"}"
                            type="button"
                            ?disabled=${!camera.online}
                            aria-label="Open live view for ${this.esc(camera.name)}"
                            @click=${() => this._openViewer(camera)}
                          >
                            ${
                            snapshotUrl
                              ? html`<img
                                  src="${snapshotUrl}"
                                  alt="${this.esc(camera.name)} snapshot"
                                />`
                              : ""
                          }
                            <span
                              class="camera-badge ${camera.active ? "activity" : ""}"
                            >
                              <ha-icon
                                icon="${camera.active ? "mdi:motion-sensor" : "mdi:cctv"}"
                              ></ha-icon>
                              <span
                                >${camera.active ? "Activity" : camera.online ? "Live" : "Offline"}</span
                              >
                            </span>
                          </button>
                          <div class="camera-copy">
                            <div class="camera-title-row">
                              <span class="camera-name"
                                >${this.esc(camera.name)}</span
                              >
                            </div>
                            <div class="camera-state">
                              ${camera.active ? "Activity detected" : camera.online ? "Online" : "Unavailable"}
                            </div>
                            <div class="classification-summary">
                              ${
                              classifications.length
                                ? `Recent: ${classifications.map((c) => c.name).join(" · ")}`
                                : "No detection image entities"
                            }
                            </div>
                          </div>
                          <div class="camera-actions">
                            <button
                              class="camera-action primary"
                              type="button"
                              ?disabled=${!camera.online}
                              aria-label="Live view for ${this.esc(camera.name)}"
                              @click=${() => this._openViewer(camera)}
                            >
                              <ha-icon icon="mdi:play-circle-outline"></ha-icon>
                              <span>Live</span>
                            </button>
                            <button
                              class="camera-action"
                              type="button"
                              ?disabled=${!(classifications.length || camera.detections?.length)}
                              aria-label="Detections for ${this.esc(camera.name)}"
                              @click=${() => this._openSettings(camera)}
                            >
                              <ha-icon icon="mdi:motion-sensor"></ha-icon>
                              <span>Detections</span>
                            </button>
                            <button
                              class="camera-action"
                              type="button"
                              aria-label="Settings for ${this.esc(camera.name)}"
                              @click=${() => this._openSettings(camera)}
                            >
                              <ha-icon icon="mdi:tune-variant"></ha-icon>
                              <span>Settings</span>
                            </button>
                          </div>
                        </article>
                      `;
                    })}
                  </div>
                `
          }
        </section>

        ${
          entries.length
            ? html`
                <section class="panel section entry-section">
                  <div class="section-head">
                    <h2 class="section-title">Entry points</h2>
                    <span class="section-meta">${openEntries} open</span>
                  </div>
                  <div class="entries">
                    ${entries.map((entry) => {
                      const isConfirm = this._entryConfirmId === entry.entityId;
                      const canOperate = Boolean(
                        entry.controlEntityId ||
                          entry.domain === "lock" ||
                          entry.domain === "cover",
                      );
                      const actionLabel =
                        entry.domain === "lock"
                          ? entry.open
                            ? "Lock"
                            : "Unlock"
                          : entry.open
                            ? "Close"
                            : "Open";

                      return html`
                        <article class="entry">
                          <span
                            class="entry-icon ${entry.open ? "attention" : ""}"
                          >
                            <ha-icon
                              icon="${
                              entry.domain === "lock"
                                ? entry.open
                                  ? "mdi:lock-open-outline"
                                  : "mdi:lock-outline"
                                : entry.open
                                  ? "mdi:door-open"
                                  : "mdi:door-closed"
                            }"
                            ></ha-icon>
                          </span>
                          <span>
                            <span class="entry-name"
                              >${this.esc(entry.name)}</span
                            >
                            <span class="entry-state">
                              ${
                              !entry.available
                                ? "Unavailable"
                                : entry.domain === "lock"
                                  ? entry.open
                                    ? "Unlocked"
                                    : "Locked"
                                  : entry.open
                                    ? "Open"
                                    : "Closed"
                            }
                            </span>
                          </span>
                          <span class="entry-actions">
                            <button
                              class="entry-detail"
                              type="button"
                              aria-label="Open details for ${this.esc(entry.name)}"
                              @click=${() => this.moreInfo(entry.entityId)}
                            >
                              <ha-icon icon="mdi:information-outline"></ha-icon>
                            </button>
                            ${
                              canOperate
                                ? html`
                                    <button
                                      class="entry-operate ${isConfirm ? "confirm" : ""}"
                                      type="button"
                                      ?disabled=${!entry.available}
                                      aria-label="${isConfirm ? "Confirm " + actionLabel : actionLabel} for ${this.esc(entry.name)}"
                                      @click=${() => this._operateEntry(entry)}
                                    >
                                      ${isConfirm ? "Confirm" : actionLabel}
                                    </button>
                                  `
                                : ""
                            }
                          </span>
                        </article>
                      `;
                    })}
                  </div>
                </section>
              `
            : ""
        }
      </div>

      <dialog
        class="viewer-dialog"
        aria-label="Camera live stream"
        @click=${(e: MouseEvent) => {
          const dialog = this.renderRoot.querySelector(".viewer-dialog");
          if (e.target === dialog) this._closeViewer();
        }}
      >
        <div class="dialog-shell viewer-shell">
          <div class="dialog-head">
            <span class="dialog-title"
              >${this.esc(this._viewerCamera?.name || "Camera")} live</span
            >
            <button
              class="dialog-button"
              type="button"
              @click=${() => {
                const cam = this._viewerCamera;
                this._closeViewer();
                if (cam) this._openSettings(cam);
              }}
            >
              <ha-icon icon="mdi:tune-variant"></ha-icon>
              <span>Settings</span>
            </button>
            <button
              class="dialog-button"
              type="button"
              @click=${() => {
                if (this._viewerCamera)
                  this.moreInfo(this._viewerCamera.entityId);
                this._closeViewer();
              }}
            >
              <ha-icon icon="mdi:information-outline"></ha-icon>
              <span>Details</span>
            </button>
            <button
              class="dialog-button"
              type="button"
              aria-label="Close"
              @click=${this._closeViewer}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <div class="viewer-body">
            <div class="viewer-message">Live stream ready</div>
          </div>
        </div>
      </dialog>

      <dialog
        class="settings-dialog"
        aria-label="Camera settings"
        @click=${(e: MouseEvent) => {
          const dialog = this.renderRoot.querySelector(".settings-dialog");
          if (e.target === dialog) this._closeSettings();
        }}
      >
        <div class="dialog-shell">
          <div class="dialog-head">
            <span class="dialog-title"
              >${this.esc(this._settingsCamera?.name || "Camera")}
              settings</span
            >
            <button
              class="dialog-button"
              type="button"
              @click=${() => {
                const cam = this._settingsCamera;
                this._closeSettings();
                if (cam) this._openViewer(cam);
              }}
            >
              <ha-icon icon="mdi:play-circle-outline"></ha-icon>
              <span>Live</span>
            </button>
            <button
              class="dialog-button"
              type="button"
              aria-label="Close"
              @click=${this._closeSettings}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <div class="dialog-body">
            <div class="settings-groups">
              ${
                this._settingsCamera?.classifications?.length
                  ? html`
                      <section class="settings-group">
                        <div class="settings-title">Recent detections</div>
                        <div class="detections">
                          ${this._settingsCamera.classifications.map((cls) => {
                            const st = this.hass?.states[cls.entity.entity_id];
                            const pic = st?.attributes?.entity_picture;
                            return html`
                              <button
                                class="detection"
                                type="button"
                                @click=${() => {
                                this._closeSettings();
                                this.moreInfo(cls.entity.entity_id);
                              }}
                              >
                                ${pic ? html`<img src="${pic}" alt="${this.esc(cls.name)}" />` : ""}
                                <span class="detection-copy">
                                  <span class="detection-name"
                                    >${this.esc(cls.name)}</span
                                  >
                                </span>
                              </button>
                            `;
                          })}
                        </div>
                      </section>
                    `
                  : ""
              }
              ${
                this._settingsCamera?.switches?.length
                  ? html`
                      <section class="settings-group">
                        <div class="settings-title">Camera controls</div>
                        <div class="control-list">
                          ${this._settingsCamera.switches.map((cap) => {
                            const st = this.hass?.states[cap.entity.entity_id];
                            const on = st?.state === "on";
                            return html`
                              <div class="control-row">
                                <span>
                                  <span class="control-name"
                                    >${this.esc(cap.role || "Control")}</span
                                  >
                                  <span class="control-state"
                                    >${on ? "On" : "Off"}</span
                                  >
                                </span>
                                <button
                                  class="control-toggle ${on ? "on" : ""}"
                                  type="button"
                                  @click=${async () => {
                                  await this.hass?.callService(
                                    "switch",
                                    on ? "turn_off" : "turn_on",
                                    { entity_id: cap.entity.entity_id },
                                  );
                                  this._refresh(true);
                                }}
                                >
                                  ${on ? "Turn off" : "Turn on"}
                                </button>
                              </div>
                            `;
                          })}
                        </div>
                      </section>
                    `
                  : ""
              }

              <div class="settings-footer">
                <button
                  class="footer-action"
                  type="button"
                  @click=${() => {
                    if (this._settingsCamera)
                      this.moreInfo(this._settingsCamera.entityId);
                    this._closeSettings();
                  }}
                >
                  <ha-icon icon="mdi:information-outline"></ha-icon>
                  <span>Home Assistant details</span>
                </button>
                <button
                  class="footer-action"
                  type="button"
                  ?disabled=${!this._settingsCamera?.online}
                  @click=${() => {
                    const cam = this._settingsCamera;
                    this._closeSettings();
                    if (cam) this._openViewer(cam);
                  }}
                >
                  <ha-icon icon="mdi:play-circle-outline"></ha-icon>
                  <span>Open live view</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    `;
  }
}

registerCard({
  type: "component-security-dashboard-v1",
  element: ComponentSecurityDashboardV1,
  name: "Security Dashboard V1",
  description:
    "Single-owner Security dashboard with on-demand live video, detections, controls, quick actions and entry points.",
});
