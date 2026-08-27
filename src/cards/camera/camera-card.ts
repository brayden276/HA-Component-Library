export * from "./camera-card.types";
import type { CameraControllerConfig } from "./camera-card.types";
export * from "./camera-card.styles";
import { cameraCardStyles } from "./camera-card.styles";
import { html, TemplateResult, CSSResultGroup } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LitBaseCard } from "../../components/base/lit-base-card";
import type { LovelaceGridOptions } from "../../types/home-assistant";
import type {
  LoadedSecurityModel,
  SecurityCameraItem,
} from "../../services/security/security-runtime";
import { loadSecurityModel } from "../../services/security/security-runtime";
import { formatDate } from "../../utils/formatting";
import { registerCard } from "../../utils/registration";

@customElement("component-camera-controller-v2")
export class ComponentCameraControllerV2 extends LitBaseCard<CameraControllerConfig> {
  public static stubConfig = { profile: "household-security" };

  @state()
  private _model: LoadedSecurityModel | null = null;

  @state()
  private _camera: SecurityCameraItem | null = null;

  @state()
  private _confirmId: string | null = null;

  private _confirmTimer: ReturnType<typeof setTimeout> | null = null;
  private _profileListener = (event: any) => {
    if (
      event.detail?.kind === "security" &&
      event.detail?.profileId ===
        (this._config?.profile || "household-security")
    ) {
      this._refresh(true);
    }
  };

  public static override getGridOptions(): LovelaceGridOptions {
    return { columns: 12, rows: "auto" };
  }

  public static override styles: CSSResultGroup = cameraCardStyles;

  public override setConfig(config: CameraControllerConfig): void {
    super.setConfig({
      profile: "household-security",
      expanded: false,
      ...config,
      type: "custom:component-camera-controller-v2",
    });
    this._refresh();
  }

  public override getCardSize(): number {
    return this._config?.expanded ? 5 : 1;
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
    if (this._confirmTimer) clearTimeout(this._confirmTimer);
    super.disconnectedCallback();
  }

  protected override willUpdate(): void {
    if (!this._model && this.hass) {
      this._refresh();
    }
  }

  private async _refresh(force = false): Promise<void> {
    if (!this.hass || !this._config) return;
    try {
      const model = await loadSecurityModel(
        this.hass,
        this._config.profile || "household-security",
        { force },
      );
      this._model = model;
      this._camera =
        model.cameras.find(
          (cam) =>
            cam.entityId === this._config?.entity ||
            cam.deviceId === this._config?.device_id,
        ) ||
        model.cameras[0] ||
        null;
    } catch {
      this._model = null;
      this._camera = null;
    }
  }

  private _openCamera(): void {
    if (!this._camera?.online) return;
    this.dispatchEvent(
      new CustomEvent("security-camera-view-request", {
        bubbles: true,
        composed: true,
        detail: {
          camera: this._camera,
          trigger: this.renderRoot.querySelector(".view"),
        },
      }),
    );
  }

  private _askConfirmation(entityId: string): void {
    this._confirmId = entityId;
    if (this._confirmTimer) clearTimeout(this._confirmTimer);
    this._confirmTimer = setTimeout(() => {
      this._confirmId = null;
    }, 5000);
  }

  private async _toggleSwitch(
    capability: { entity: { entity_id: string }; role: string | null },
    wasOn: boolean,
  ): Promise<void> {
    const entityId = capability.entity.entity_id;
    const destructiveOff =
      wasOn && /^(Recording|Detection|Alerts)$/i.test(capability.role || "");
    if (destructiveOff && this._confirmId !== entityId) {
      this._askConfirmation(entityId);
      return;
    }
    this._confirmId = null;
    if (this._confirmTimer) clearTimeout(this._confirmTimer);
    try {
      await this.hass?.callService("switch", wasOn ? "turn_off" : "turn_on", {
        entity_id: entityId,
      });
      this._refresh(true);
    } catch {}
  }

  private async _pressAction(entityId: string): Promise<void> {
    if (this._confirmId !== entityId) {
      this._askConfirmation(entityId);
      return;
    }
    this._confirmId = null;
    if (this._confirmTimer) clearTimeout(this._confirmTimer);
    try {
      await this.hass?.callService("button", "press", { entity_id: entityId });
    } catch {}
  }

  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const camera = this._camera;
    const error = this._model?.error || this._model?.profileError;
    const name = camera?.name || this._config.title || "Camera";
    const stateText = this._model?.profileMissing
      ? `Configure ${this._config.profile || "household-security"}`
      : error
        ? "Controls unavailable"
        : camera?.active
          ? "Activity detected"
          : camera?.online
            ? "Online"
            : "Unavailable";

    const hasControls = Boolean(
      camera &&
      (camera.switches.length ||
        camera.detections.length ||
        camera.actions.length ||
        camera.ptz.length),
    );

    return html`
      <ha-card>
        <div class="row">
          <span class="icon"><ha-icon icon="mdi:cctv"></ha-icon></span>
          <button
            class="identity"
            type="button"
            ?disabled=${!camera?.online}
            @click=${this._openCamera}
          >
            <span class="name">${this.esc(name)}</span>
            <span class="state">${this.esc(stateText)}</span>
          </button>
          <span class="actions">
            <button
              class="action view"
              type="button"
              aria-label="View ${this.esc(name)}"
              ?disabled=${!camera?.online}
              @click=${this._openCamera}
            >
              <ha-icon icon="mdi:eye-outline"></ha-icon>
              <span>View</span>
            </button>
            <button
              class="action open-controls"
              type="button"
              aria-label="${this.esc(name)} controls"
              ?hidden=${this._config.expanded || !hasControls}
              @click=${() => {
                const dialog = this.renderRoot.querySelector("dialog");
                if (dialog && !dialog.open) dialog.showModal();
              }}
            >
              <ha-icon icon="mdi:tune-variant"></ha-icon>
              <span>Controls</span>
            </button>
          </span>
        </div>

        ${
          this._config.expanded
            ? html`<div class="inline">${this._renderControlsList()}</div>`
            : ""
        }
      </ha-card>

      <dialog
        role="dialog"
        aria-modal="true"
        aria-label="${this.esc(name)} controls"
        @click=${(e: MouseEvent) => {
          const dialog = this.renderRoot.querySelector("dialog");
          if (e.target === dialog) dialog?.close();
        }}
      >
        <div class="sheet">
          <div class="head">
            <span class="sheet-title">${this.esc(name)} controls</span>
            <button
              class="close"
              type="button"
              aria-label="Close"
              @click=${() => {
                const dialog = this.renderRoot.querySelector("dialog");
                if (dialog) dialog.close();
              }}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <div class="body">${this._renderControlsList()}</div>
        </div>
      </dialog>
    `;
  }

  private _renderControlsList(): TemplateResult {
    const camera = this._camera;
    if (!camera) return html`<div>Camera controls are unavailable</div>`;

    return html`
      <div class="groups">
        ${
          camera.classifications?.length
            ? html`
                <section class="group">
                  <div class="group-title">Last detections</div>
                  <div class="group-list classification-list">
                    ${camera.classifications.map((cls) => {
                      const entityId = cls.entity.entity_id;
                      const st = this.hass?.states[entityId];
                      const pic = st?.attributes?.entity_picture;
                      const updated = st?.last_updated;
                      const timestamp = updated && new Date(updated);
                      const timeText =
                        timestamp && Number.isFinite(timestamp.getTime())
                          ? formatDate(this.hass, timestamp, {
                              day: "numeric",
                              month: "short",
                              hour: "numeric",
                              minute: "2-digit",
                            })
                          : "No detection available";

                      return html`
                        <button
                          class="classification"
                          type="button"
                          @click=${() => this.moreInfo(entityId)}
                        >
                          ${
                          pic
                            ? html`<img
                                class="classification-image"
                                src="${pic}"
                                alt="${this.esc(cls.name)}"
                              />`
                            : html`<div class="classification-image"></div>`
                        }
                          <span class="classification-copy">
                            <span class="classification-name"
                              >${this.esc(cls.name)}</span
                            >
                            <span class="classification-time"
                              >${this.esc(timeText)}</span
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
          camera.detections?.length
            ? html`
                <section class="group">
                  <div class="group-title">Detection status</div>
                  <div class="group-list">
                    ${camera.detections.map((entity) => {
                      const st = this.hass?.states[entity.entity_id];
                      const on = st?.state === "on";
                      return html`
                        <div class="control detection ${on ? "on" : ""}">
                          <span class="copy">
                            <span class="control-name"
                              >${this.esc(entity.name || entity.original_name || "Detection")}</span
                            >
                            <span class="control-state"
                              >${on ? "Detected" : "Clear"}</span
                            >
                          </span>
                        </div>
                      `;
                    })}
                  </div>
                </section>
              `
            : ""
        }
        ${
          camera.switches?.length
            ? html`
                <section class="group">
                  <div class="group-title">Camera controls</div>
                  <div class="group-list">
                    ${camera.switches.map((cap) => {
                      const entityId = cap.entity.entity_id;
                      const st = this.hass?.states[entityId];
                      const on = st?.state === "on";
                      const confirm = this._confirmId === entityId;
                      return html`
                        <div class="control">
                          <span class="copy">
                            <span class="control-name"
                              >${this.esc(cap.role || "Control")}</span
                            >
                            <span class="control-state"
                              >${on ? "On" : "Off"}</span
                            >
                          </span>
                          <button
                            class="${on ? "on" : ""} ${confirm ? "confirm" : ""}"
                            type="button"
                            @click=${() => this._toggleSwitch(cap, on)}
                          >
                            ${confirm ? "Confirm off" : on ? "On" : "Off"}
                          </button>
                        </div>
                      `;
                    })}
                  </div>
                </section>
              `
            : ""
        }
        ${
          camera.actions?.length
            ? html`
                <section class="group">
                  <div class="group-title">Maintenance</div>
                  <div class="group-list">
                    ${camera.actions.map((act) => {
                      const entityId = act.entity.entity_id;
                      const confirm = this._confirmId === entityId;
                      return html`
                        <div class="control">
                          <span class="copy">
                            <span class="control-name"
                              >${this.esc(act.entity.name || act.entity.original_name || "Action")}</span
                            >
                            <span class="control-state">Available</span>
                          </span>
                          <button
                            class="${confirm ? "confirm" : ""}"
                            type="button"
                            @click=${() => this._pressAction(entityId)}
                          >
                            ${confirm ? "Confirm" : "Run"}
                          </button>
                        </div>
                      `;
                    })}
                  </div>
                </section>
              `
            : ""
        }
      </div>
    `;
  }
}

registerCard({
  type: "component-camera-controller-v2",
  element: ComponentCameraControllerV2,
  name: "Camera Controller V2",
  description:
    "Platform-adapted camera controls with explicit state and protected destructive changes.",
});

/** Backward-compatible V1 adapter delegating to V2 controller */
@customElement("component-camera-controller-v1")
export class ComponentCameraControllerV1 extends ComponentCameraControllerV2 {
  public override setConfig(config: CameraControllerConfig): void {
    super.setConfig({
      profile: "household-security",
      ...config,
      type: "custom:component-camera-controller-v1",
    });
  }
}

registerCard({
  type: "component-camera-controller-v1",
  element: ComponentCameraControllerV1,
  name: "Camera Controller V1",
  description:
    "Legacy camera controller adapter registering custom:component-camera-controller-v1.",
});
