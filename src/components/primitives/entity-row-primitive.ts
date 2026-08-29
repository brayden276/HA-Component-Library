import { html, TemplateResult, css, CSSResultGroup } from "lit";
import { escapeHtml } from "../../utils/escaping";

export type EntityRowBadgeSeverity =
  "info" | "warning" | "critical" | "success" | "neutral";

export interface EntityRowBadge {
  text: string;
  severity?: EntityRowBadgeSeverity;
}

export interface EntityRowTrailingToggle {
  type: "toggle";
  checked: boolean;
  disabled?: boolean;
  onToggle?: (checked: boolean, event: Event) => void;
  ariaLabel?: string;
}

export interface EntityRowTrailingAction {
  type: "action";
  label: string;
  icon?: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent) => void;
  ariaLabel?: string;
}

export interface EntityRowTrailingChevron {
  type: "chevron";
}

export interface EntityRowTrailingCustom {
  type: "custom";
  template: TemplateResult | string;
}

export type EntityRowTrailingOption =
  | EntityRowTrailingToggle
  | EntityRowTrailingAction
  | EntityRowTrailingChevron
  | EntityRowTrailingCustom
  | TemplateResult
  | string;

export interface EntityRowPrimitiveOptions {
  icon?: string;
  iconColor?: string;
  title: string;
  subtitle?: string;
  state?: string;
  stateLabel?: string;
  badge?: EntityRowBadge | string;
  trailing?: EntityRowTrailingOption;
  disabled?: boolean;
  active?: boolean;
  unavailable?: boolean;
  interactive?: boolean;
  onClick?: (event: MouseEvent) => void;
  ariaLabel?: string;
  className?: string;
}

export const entityRowPrimitiveStyles: CSSResultGroup = css`
  .primitive-entity-row {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 10px;
    min-height: var(--c-row-min-height, 44px);
    padding: var(--c-space-2, 6px) var(--c-space-3, 8px);
    border-radius: var(--dashboard-radius-control, 6px);
    width: 100%;
    box-sizing: border-box;
    color: var(--primary-text-color);
    text-align: left;
    background: transparent;
    border: 0;
    font: inherit;
    transition:
      background-color 0.2s ease,
      border-color 0.2s ease,
      transform 0.15s ease;
  }
  .primitive-entity-row.interactive {
    cursor: pointer;
  }
  .primitive-entity-row.interactive:hover:not(.disabled):not(:disabled) {
    background: var(--dashboard-card-muted-surface, rgba(255, 255, 255, 0.04));
  }
  .primitive-entity-row.interactive:active:not(.disabled):not(:disabled) {
    transform: scale(0.985);
  }
  .primitive-entity-row.active {
    background: var(--dashboard-active-surface, rgba(3, 169, 244, 0.07));
  }
  .primitive-entity-row.disabled,
  .primitive-entity-row.unavailable {
    opacity: 0.55;
    cursor: not-allowed;
  }
  .primitive-row-leading {
    display: grid;
    place-items: center;
    width: var(--c-icon-box-size, 28px);
    height: var(--c-icon-box-size, 28px);
    flex-shrink: 0;
  }
  .primitive-row-icon-well {
    width: 28px;
    height: 28px;
    display: grid;
    place-items: center;
    border-radius: var(--dashboard-radius-icon, 0px);
    color: var(--primary-color, #03a9f4);
  }
  .primitive-row-copy {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .primitive-row-title {
    font-size: var(--c-font-md, 12px);
    font-weight: var(--c-font-weight-medium, 500);
    line-height: var(--c-line-height-normal, 1.2);
    color: var(--primary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .primitive-row-subtitle {
    font-size: var(--c-font-sm, 10.5px);
    font-weight: var(--c-font-weight-normal, 400);
    line-height: var(--c-line-height-normal, 1.2);
    color: var(--secondary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .primitive-row-trailing {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }
  .primitive-row-state-block {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
    text-align: right;
  }
  .primitive-row-state-val {
    font-size: var(--c-font-md, 12px);
    font-weight: var(--c-font-weight-medium, 500);
    font-variant-numeric: tabular-nums;
    color: var(--primary-text-color);
  }
  .primitive-row-state-lbl {
    font-size: var(--c-font-xs, 10px);
    color: var(--secondary-text-color);
  }
  .primitive-row-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 7px;
    border-radius: var(--c-radius-pill, 999px);
    font-size: var(--c-font-xs, 10px);
    font-weight: var(--c-font-weight-semibold, 600);
    text-transform: uppercase;
    letter-spacing: 0.03em;
    border: 1px solid
      var(--dashboard-card-border-color, rgba(255, 255, 255, 0.1));
    background: var(--dashboard-card-muted-surface, rgba(255, 255, 255, 0.04));
    color: var(--secondary-text-color);
  }
  .primitive-row-badge.info {
    color: var(--info-color, #03a9f4);
    background: color-mix(in srgb, var(--info-color, #03a9f4) 12%, transparent);
    border-color: color-mix(
      in srgb,
      var(--info-color, #03a9f4) 30%,
      transparent
    );
  }
  .primitive-row-badge.warning {
    color: var(--warning-color, #f9a825);
    background: var(
      --dashboard-warning-surface,
      color-mix(in srgb, var(--warning-color, #f9a825) 12%, transparent)
    );
    border-color: color-mix(
      in srgb,
      var(--warning-color, #f9a825) 30%,
      transparent
    );
  }
  .primitive-row-badge.critical {
    color: var(--error-color, #e53935);
    background: var(
      --dashboard-critical-surface,
      color-mix(in srgb, var(--error-color, #e53935) 12%, transparent)
    );
    border-color: color-mix(
      in srgb,
      var(--error-color, #e53935) 30%,
      transparent
    );
  }
  .primitive-row-badge.success {
    color: var(--success-color, #4caf50);
    background: color-mix(
      in srgb,
      var(--success-color, #4caf50) 12%,
      transparent
    );
    border-color: color-mix(
      in srgb,
      var(--success-color, #4caf50) 30%,
      transparent
    );
  }
  .primitive-row-toggle {
    width: var(--c-switch-width, 38px);
    height: var(--c-switch-height, 22px);
    border-radius: var(--dashboard-radius-control, 6px);
    background: var(--divider-color, rgba(255, 255, 255, 0.12));
    padding: 3px;
    cursor: pointer;
    border: 0;
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    transition: background-color 0.15s ease;
  }
  .primitive-row-toggle.on {
    background: color-mix(
      in srgb,
      var(--primary-color, #03a9f4) 40%,
      var(--divider-color, rgba(255, 255, 255, 0.12))
    );
  }
  .primitive-row-toggle-knob {
    display: block;
    width: var(--c-switch-knob-size, 16px);
    height: var(--c-switch-knob-size, 16px);
    border-radius: 50%;
    background: var(--secondary-text-color);
    transition:
      transform 0.15s ease,
      background-color 0.15s ease;
  }
  .primitive-row-toggle.on .primitive-row-toggle-knob {
    transform: translateX(16px);
    background: var(--primary-color, #03a9f4);
  }
  .primitive-row-action-btn {
    min-height: var(--c-button-sm-height, 26px);
    padding: 0 10px;
    border-radius: var(--dashboard-radius-control, 6px);
    border: var(--dashboard-card-border, 1px solid rgba(255, 255, 255, 0.1));
    background: var(--dashboard-card-muted-surface, rgba(255, 255, 255, 0.04));
    color: var(--primary-text-color);
    font-size: var(--c-font-sm, 10.5px);
    font-weight: var(--c-font-weight-medium, 500);
    display: inline-flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
  }
  .primitive-row-chevron {
    color: var(--secondary-text-color);
    display: grid;
    place-items: center;
  }
`;

function renderTrailing(trailing: EntityRowTrailingOption): TemplateResult {
  if (typeof trailing === "string") {
    return html`<span class="primitive-row-trailing-text"
      >${escapeHtml(trailing)}</span
    >`;
  }
  if ("strings" in trailing) {
    return trailing as TemplateResult;
  }
  if (trailing.type === "toggle") {
    return html`
      <button
        class="primitive-row-toggle ${trailing.checked ? "on" : ""}"
        type="button"
        role="switch"
        aria-checked="${trailing.checked ? "true" : "false"}"
        aria-label="${escapeHtml(trailing.ariaLabel || "Toggle")}"
        ?disabled=${trailing.disabled}
        @click=${(e: Event) => {
          e.stopPropagation();
          trailing.onToggle?.(!trailing.checked, e);
        }}
      >
        <span class="primitive-row-toggle-knob"></span>
      </button>
    `;
  }
  if (trailing.type === "action") {
    return html`
      <button
        class="primitive-row-action-btn"
        type="button"
        aria-label="${escapeHtml(trailing.ariaLabel || trailing.label)}"
        ?disabled=${trailing.disabled}
        @click=${(e: MouseEvent) => {
          e.stopPropagation();
          trailing.onClick?.(e);
        }}
      >
        ${trailing.icon ? html`<ha-icon icon="${escapeHtml(trailing.icon)}"></ha-icon>` : ""}
        <span>${escapeHtml(trailing.label)}</span>
      </button>
    `;
  }
  if (trailing.type === "chevron") {
    return html`
      <span class="primitive-row-chevron">
        <ha-icon icon="mdi:chevron-right"></ha-icon>
      </span>
    `;
  }
  if (trailing.type === "custom") {
    return typeof trailing.template === "string"
      ? html`${trailing.template}`
      : trailing.template;
  }
  return html``;
}

export function renderEntityRow(
  options: EntityRowPrimitiveOptions,
): TemplateResult {
  const isInteractive = Boolean(options.interactive ?? options.onClick);
  const isUnavailable = Boolean(options.unavailable);
  const isDisabled = Boolean(options.disabled || isUnavailable);

  const badgeObj: EntityRowBadge | null =
    typeof options.badge === "string"
      ? { text: options.badge, severity: "neutral" }
      : options.badge || null;

  const rowClasses = [
    "primitive-entity-row",
    isInteractive ? "interactive" : "",
    options.active ? "active" : "",
    isDisabled ? "disabled" : "",
    isUnavailable ? "unavailable" : "",
    options.className || "",
  ]
    .filter(Boolean)
    .join(" ");

  const defaultAria = `${options.title}${options.subtitle ? `: ${options.subtitle}` : ""}${options.state ? `. ${options.state}` : ""}`;
  const ariaLabel = options.ariaLabel || defaultAria;

  const content = html`
    ${
      options.icon
        ? html`
            <div class="primitive-row-leading">
              <div
                class="primitive-row-icon-well"
                style="${options.iconColor ? `color: ${options.iconColor};` : ""}"
              >
                <ha-icon icon="${escapeHtml(options.icon)}"></ha-icon>
              </div>
            </div>
          `
        : ""
    }
    <div class="primitive-row-copy">
      <div class="primitive-row-title">${escapeHtml(options.title)}</div>
      ${
        options.subtitle
          ? html`<div class="primitive-row-subtitle">
              ${escapeHtml(options.subtitle)}
            </div>`
          : ""
      }
    </div>
    <div class="primitive-row-trailing">
      ${
        options.state || options.stateLabel
          ? html`
              <div class="primitive-row-state-block">
                ${
                  options.state
                    ? html`<span class="primitive-row-state-val"
                        >${escapeHtml(options.state)}</span
                      >`
                    : ""
                }
                ${
                  options.stateLabel
                    ? html`<span class="primitive-row-state-lbl"
                        >${escapeHtml(options.stateLabel)}</span
                      >`
                    : ""
                }
              </div>
            `
          : ""
      }
      ${
        badgeObj
          ? html`
              <span
                class="primitive-row-badge ${badgeObj.severity || "neutral"}"
              >
                ${escapeHtml(badgeObj.text)}
              </span>
            `
          : ""
      }
      ${options.trailing ? renderTrailing(options.trailing) : ""}
    </div>
  `;

  if (isInteractive) {
    return html`
      <button
        class="${rowClasses}"
        type="button"
        aria-label="${escapeHtml(ariaLabel)}"
        ?disabled=${isDisabled}
        @click=${(e: MouseEvent) => {
          if (!isDisabled) options.onClick?.(e);
        }}
      >
        ${content}
      </button>
    `;
  }

  return html`
    <div class="${rowClasses}" aria-label="${escapeHtml(ariaLabel)}">
      ${content}
    </div>
  `;
}
