import { html, TemplateResult, css, CSSResultGroup } from "lit";
import { escapeHtml } from "../../utils/escaping";

export type NavigationBadgeSeverity =
  "info" | "warning" | "critical" | "success" | "neutral";

export interface NavigationBadge {
  text: string | number;
  severity?: NavigationBadgeSeverity;
}

export interface NavigationPrimitiveOptions {
  icon?: string;
  iconColor?: string;
  title: string;
  path?: string | null;
  context?: string;
  badge?: NavigationBadge | string | number;
  active?: boolean;
  disabled?: boolean;
  interactive?: boolean;
  showChevron?: boolean;
  onClick?: (path?: string | null, event?: MouseEvent) => void;
  ariaLabel?: string;
  className?: string;
}

export const navigationPrimitiveStyles: CSSResultGroup = css`
  .primitive-nav-item {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 10px;
    min-height: var(--c-row-min-height, 44px);
    padding: var(--c-space-2, 6px) var(--c-space-3, 8px);
    border-radius: var(--dashboard-radius-control, 6px);
    border: var(--dashboard-card-border, 1px solid rgba(255, 255, 255, 0.1));
    background: var(--dashboard-card-surface, transparent);
    color: var(--primary-text-color);
    text-align: left;
    width: 100%;
    box-sizing: border-box;
    font: inherit;
    transition:
      background-color 0.2s ease,
      border-color 0.2s ease,
      transform 0.15s ease;
  }
  .primitive-nav-item.interactive {
    cursor: pointer;
  }
  .primitive-nav-item.interactive:hover:not(:disabled):not(.disabled) {
    background: var(--dashboard-card-muted-surface, rgba(255, 255, 255, 0.04));
  }
  .primitive-nav-item.interactive:active:not(:disabled):not(.disabled) {
    transform: scale(0.985);
    border-color: var(--primary-color, #03a9f4);
  }
  .primitive-nav-item.active {
    background: var(--dashboard-active-surface, rgba(3, 169, 244, 0.07));
    border-color: var(--primary-color, #03a9f4);
  }
  .primitive-nav-item:disabled,
  .primitive-nav-item.disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
  .primitive-nav-leading {
    display: grid;
    place-items: center;
    width: var(--c-icon-box-size, 28px);
    height: var(--c-icon-box-size, 28px);
    flex-shrink: 0;
  }
  .primitive-nav-icon-well {
    width: 28px;
    height: 28px;
    display: grid;
    place-items: center;
    border-radius: var(--dashboard-radius-icon, 0px);
    color: var(--primary-color, #03a9f4);
  }
  .primitive-nav-content {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .primitive-nav-title {
    font-size: var(--c-font-md, 12px);
    font-weight: var(--c-font-weight-medium, 500);
    line-height: var(--c-line-height-normal, 1.2);
    color: var(--primary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .primitive-nav-context {
    font-size: var(--c-font-sm, 10.5px);
    font-weight: var(--c-font-weight-normal, 400);
    line-height: var(--c-line-height-normal, 1.2);
    color: var(--secondary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .primitive-nav-trailing {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }
  .primitive-nav-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 2px 7px;
    min-width: 18px;
    border-radius: var(--c-radius-pill, 999px);
    font-size: var(--c-font-xs, 10px);
    font-weight: var(--c-font-weight-semibold, 600);
    background: var(--dashboard-card-muted-surface, rgba(255, 255, 255, 0.04));
    color: var(--secondary-text-color);
    border: 1px solid
      var(--dashboard-card-border-color, rgba(255, 255, 255, 0.1));
  }
  .primitive-nav-badge.info {
    color: var(--info-color, #03a9f4);
    background: color-mix(in srgb, var(--info-color, #03a9f4) 12%, transparent);
    border-color: color-mix(
      in srgb,
      var(--info-color, #03a9f4) 30%,
      transparent
    );
  }
  .primitive-nav-badge.warning {
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
  .primitive-nav-badge.critical {
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
  .primitive-nav-badge.success {
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
  .primitive-nav-chevron {
    color: var(--secondary-text-color);
    display: grid;
    place-items: center;
  }
`;

export function renderNavigationItem(
  options: NavigationPrimitiveOptions,
): TemplateResult {
  const isInteractive = Boolean(
    options.interactive !== false && (options.path || options.onClick),
  );
  const isDisabled = Boolean(options.disabled);
  const showChevron =
    options.showChevron ?? (isInteractive || Boolean(options.path));

  let badgeObj: NavigationBadge | null = null;
  if (options.badge !== undefined && options.badge !== null) {
    if (typeof options.badge === "object") {
      badgeObj = options.badge;
    } else {
      badgeObj = { text: options.badge, severity: "neutral" };
    }
  }

  const navClasses = [
    "primitive-nav-item",
    isInteractive ? "interactive" : "",
    options.active ? "active" : "",
    isDisabled ? "disabled" : "",
    options.className || "",
  ]
    .filter(Boolean)
    .join(" ");

  const defaultAria = `${options.title}${options.context ? `: ${options.context}` : ""}. Navigate.`;
  const ariaLabel = options.ariaLabel || defaultAria;

  const content = html`
    ${
      options.icon
        ? html`
            <div class="primitive-nav-leading">
              <div
                class="primitive-nav-icon-well"
                style="${options.iconColor ? `color: ${options.iconColor};` : ""}"
              >
                <ha-icon icon="${escapeHtml(options.icon)}"></ha-icon>
              </div>
            </div>
          `
        : ""
    }
    <div class="primitive-nav-content">
      <div class="primitive-nav-title">${escapeHtml(options.title)}</div>
      ${
        options.context
          ? html`<div class="primitive-nav-context">
              ${escapeHtml(options.context)}
            </div>`
          : ""
      }
    </div>
    <div class="primitive-nav-trailing">
      ${
        badgeObj
          ? html`
              <span
                class="primitive-nav-badge ${badgeObj.severity || "neutral"}"
              >
                ${escapeHtml(String(badgeObj.text))}
              </span>
            `
          : ""
      }
      ${
        showChevron
          ? html`
              <span class="primitive-nav-chevron">
                <ha-icon icon="mdi:chevron-right"></ha-icon>
              </span>
            `
          : ""
      }
    </div>
  `;

  if (isInteractive) {
    return html`
      <button
        class="${navClasses}"
        type="button"
        aria-label="${escapeHtml(ariaLabel)}"
        ?disabled=${isDisabled}
        @click=${(e: MouseEvent) => {
          if (!isDisabled) options.onClick?.(options.path, e);
        }}
      >
        ${content}
      </button>
    `;
  }

  return html`
    <div class="${navClasses}" aria-label="${escapeHtml(ariaLabel)}">
      ${content}
    </div>
  `;
}
