export * from "./security-camera-wall-card.types";
import type { SecurityCameraWallConfig } from "./security-camera-wall-card.types";
export * from "./security-camera-wall-card.styles";
import { securityCameraWallCardStyles } from "./security-camera-wall-card.styles";
import { html, TemplateResult, CSSResultGroup, PropertyValues } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import type { LovelaceGridOptions } from "../../types/home-assistant";
import type {
  LoadedSecurityModel,
  SecurityCameraItem,
} from "../../services/security/security-runtime";
import { loadSecurityModel } from "../../services/security/security-runtime";
import { registerCard } from "../../utils/registration";

@customElement("component-security-camera-wall-v3")
export class ComponentSecurityCameraWallV3 extends LitBaseCard<SecurityCameraWallConfig> {
  public static stubConfig = { profile: "household-security", columns: 2 };

  @state()
  private _model: LoadedSecurityModel | null = null;

  private _sequence = 0;
  private _timer: ReturnType<typeof setInterval> | null = null;
  private _visible = true;
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
    this._visible = document.visibilityState !== "hidden";
    if (this._visible) {
      this._snapshotStamp = Math.floor(Date.now() / 10000);
      this.requestUpdate();
    }
  };

  public static override getGridOptions(): LovelaceGridOptions {
    return { columns: 12, rows: "auto" };
  }

  public static override styles: CSSResultGroup = securityCameraWallCardStyles;

  public override setConfig(config: SecurityCameraWallConfig): void {
    super.setConfig({
      profile: "household-security",
      columns: 2,
      title: "Camera wall",
      refresh_seconds: 15,
      ...config,
      type: "custom:component-security-camera-wall-v3",
    });
    const cols = Math.max(1, Math.min(3, Number(this._config?.columns) || 2));
    this.style.setProperty("--security-columns", String(cols));
    this._schedule();
    this._refresh();
  }

  public override getCardSize(): number {
    return 6;
  }

  private _schedule(): void {
    if (this._timer) clearInterval(this._timer);
    this._timer = setInterval(
      () => {
        if (this._visible && this.isConnected) {
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
    if (this._timer) clearInterval(this._timer);
    this._timer = null;
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
        this._model = { error: err, cameras: [] } as any;
      }
    }
  }

  private _requestViewer(
    camera: SecurityCameraItem,
    trigger?: HTMLElement | null,
  ): void {
    this.dispatchEvent(
      new CustomEvent("security-camera-view-request", {
        bubbles: true,
        composed: true,
        detail: { camera, trigger },
      }),
    );
  }

  private _requestControls(
    camera: SecurityCameraItem,
    trigger?: HTMLElement | null,
  ): void {
    this.dispatchEvent(
      new CustomEvent("security-camera-control-request", {
        bubbles: true,
        composed: true,
        detail: { camera, trigger },
      }),
    );
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const configuredCameras = this._config.cameras
      ? Array.isArray(this._config.cameras)
        ? this._config.cameras
        : [this._config.cameras]
      : this._config.entities;

    const allCameras = this._model?.cameras || [];
    const cameras =
      configuredCameras && configuredCameras.length > 0
        ? allCameras.filter(
            (c) =>
              configuredCameras.includes(c.entityId) ||
              (c.deviceId && configuredCameras.includes(c.deviceId)) ||
              configuredCameras.includes(c.id),
          )
        : allCameras;

    const onlineCount = cameras.filter((c) => c.online).length;
    const metaText = this._model?.error
      ? "Unavailable"
      : `${onlineCount}/${cameras.length} online`;

    const emptyText = this._model?.profileMissing
      ? `Configure ${this._config.profile || "household-security"} in HA Component Backend`
      : this._model?.error
        ? this._model.error.message || "Camera discovery is unavailable"
        : "No cameras available";

    return html`
      <ha-card>
        <div class="wrap">
          <div class="head">
            <h2>${this.esc(this._config.title || "Camera wall")}</h2>
            <span class="meta">${this.esc(metaText)}</span>
          </div>

          ${
            cameras.length === 0
              ? html`<div class="empty">${this.esc(emptyText)}</div>`
              : html`
                  <div class="grid">
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

                      return html`
                        <article
                          class="tile ${camera.online ? "" : "offline"} ${camera.active ? "activity" : ""}"
                        >
                          <button
                            class="media"
                            type="button"
                            ?disabled=${!camera.online}
                            aria-label="Open full live view for ${this.esc(camera.name)}"
                            @click=${(e: MouseEvent) => this._requestViewer(camera, e.currentTarget as HTMLElement)}
                          >
                            ${
                            snapshotUrl
                              ? html`
                                  <img
                                    class="snapshot ready"
                                    src="${snapshotUrl}"
                                    alt="${this.esc(camera.name)} camera snapshot"
                                    loading="lazy"
                                  />
                                `
                              : ""
                          }
                            <span class="live-label">
                              <ha-icon icon="mdi:fullscreen"></ha-icon>
                              <span>Full view</span>
                            </span>
                          </button>
                          <div class="footer">
                            <button
                              class="identity"
                              type="button"
                              ?disabled=${!camera.online}
                              aria-label="Open full live view for ${this.esc(camera.name)}"
                              @click=${(e: MouseEvent) => this._requestViewer(camera, e.currentTarget as HTMLElement)}
                            >
                              <span class="name">${this.esc(camera.name)}</span>
                              <span class="state">
                                ${camera.active ? "Activity detected" : camera.online ? "Online" : "Unavailable"}
                              </span>
                            </button>
                            <button
                              class="more"
                              type="button"
                              aria-label="Open settings for ${this.esc(camera.name)}"
                              @click=${(e: MouseEvent) => this._requestControls(camera, e.currentTarget as HTMLElement)}
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
        </div>
      </ha-card>
    `;
  }
}

registerCard({
  type: "component-security-camera-wall-v3",
  element: ComponentSecurityCameraWallV3,
  name: "Security Camera Wall V3",
  description:
    "Snapshot-first, lazy live camera wall with capability-driven controls.",
});
