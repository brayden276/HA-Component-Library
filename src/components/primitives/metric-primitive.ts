import { html, TemplateResult, css, CSSResultGroup } from "lit";
import { escapeHtml } from "../../utils/escaping";

export type MetricSeverity =
  "normal" | "info" | "warning" | "critical" | "success";

export interface MetricThresholds {
  warning?: number;
  critical?: number;
  info?: number;
  /** If true, values lower than or equal to threshold trigger severity instead of higher */
  invert?: boolean;
}

export interface MetricPrimitiveOptions {
  value: string | number;
  unit?: string;
  label?: string;
  supportValue?: string | number;
  supportLabel?: string;
  thresholds?: MetricThresholds;
  severity?: MetricSeverity;
  size?: "sm" | "md" | "lg";
  trend?: "up" | "down" | "neutral";
  icon?: string;
  interactive?: boolean;
  onClick?: (event: MouseEvent) => void;
  ariaLabel?: string;
  className?: string;
}

export function computeMetricSeverity(
  numericValue: number,
  thresholds?: MetricThresholds,
): MetricSeverity {
  if (!thresholds || !Number.isFinite(numericValue)) return "normal";
  const invert = Boolean(thresholds.invert);

  if (invert) {
    if (
      thresholds.critical !== undefined &&
      numericValue <= thresholds.critical
    ) {
      return "critical";
    }
    if (
      thresholds.warning !== undefined &&
      numericValue <= thresholds.warning
    ) {
      return "warning";
    }
    if (thresholds.info !== undefined && numericValue <= thresholds.info) {
      return "info";
    }
  } else {
    if (
      thresholds.critical !== undefined &&
      numericValue >= thresholds.critical
    ) {
      return "critical";
    }
    if (
      thresholds.warning !== undefined &&
      numericValue >= thresholds.warning
    ) {
      return "warning";
    }
    if (thresholds.info !== undefined && numericValue >= thresholds.info) {
      return "info";
    }
  }
  return "normal";
}

export const metricPrimitiveStyles: CSSResultGroup = css`
  .primitive-metric {
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: left;
    box-sizing: border-box;
    font: inherit;
    background: transparent;
    border: 0;
    padding: 0;
    color: var(--primary-text-color);
  }
  .primitive-metric.interactive {
    cursor: pointer;
    border-radius: var(--dashboard-radius-control, 6px);
    padding: 4px 6px;
    margin: -4px -6px;
    transition:
      background-color 0.2s ease,
      transform 0.15s ease;
  }
  .primitive-metric.interactive:hover {
    background: var(--dashboard-card-muted-surface, rgba(255, 255, 255, 0.04));
  }
  .primitive-metric.interactive:active {
    transform: scale(0.98);
  }
  .primitive-metric-main {
    display: inline-flex;
    align-items: baseline;
    gap: 4px;
  }
  .primitive-metric-icon {
    display: inline-flex;
    align-items: center;
    margin-right: 4px;
    color: var(--secondary-text-color);
  }
  .primitive-metric-value {
    font-weight: var(--c-font-weight-semibold, 550);
    font-variant-numeric: tabular-nums;
    line-height: var(--c-line-height-tight, 1.1);
    letter-spacing: -0.02em;
    color: var(--primary-text-color);
  }
  .primitive-metric-value.size-sm {
    font-size: var(--c-font-xl, 15px);
  }
  .primitive-metric-value.size-md {
    font-size: 16px;
  }
  .primitive-metric-value.size-lg {
    font-size: var(--c-font-display, 20px);
  }
  .primitive-metric-unit {
    font-size: var(--c-font-sm, 10.5px);
    font-weight: var(--c-font-weight-normal, 400);
    color: var(--secondary-text-color);
    margin-left: 2px;
  }
  .primitive-metric-trend {
    display: inline-flex;
    align-items: center;
    font-size: 12px;
    margin-left: 3px;
  }
  .primitive-metric-trend.up {
    color: var(--success-color, #4caf50);
  }
  .primitive-metric-trend.down {
    color: var(--warning-color, #f9a825);
  }
  .primitive-metric-label {
    font-size: var(--c-font-sm, 11.5px);
    font-weight: var(--c-font-weight-normal, 400);
    line-height: var(--c-line-height-normal, 1.25);
    color: var(--secondary-text-color);
  }
  .primitive-metric-support {
    font-size: var(--c-font-sm, 10.5px);
    line-height: var(--c-line-height-normal, 1.2);
    color: var(--secondary-text-color);
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
  .primitive-metric-support b {
    font-weight: var(--c-font-weight-semibold, 600);
    color: var(--primary-text-color);
  }
  /* Severity color mappings */
  .primitive-metric.severity-info .primitive-metric-value,
  .primitive-metric.severity-info .primitive-metric-icon {
    color: var(--info-color, #03a9f4);
  }
  .primitive-metric.severity-warning .primitive-metric-value,
  .primitive-metric.severity-warning .primitive-metric-icon {
    color: var(--warning-color, #f9a825);
  }
  .primitive-metric.severity-critical .primitive-metric-value,
  .primitive-metric.severity-critical .primitive-metric-icon {
    color: var(--error-color, #e53935);
  }
  .primitive-metric.severity-success .primitive-metric-value,
  .primitive-metric.severity-success .primitive-metric-icon {
    color: var(--success-color, #4caf50);
  }
`;

export function renderMetric(options: MetricPrimitiveOptions): TemplateResult {
  const isInteractive = Boolean(options.interactive ?? options.onClick);
  const size = options.size || "lg";

  let effectiveSeverity: MetricSeverity = options.severity || "normal";
  if (!options.severity && options.thresholds) {
    const num =
      typeof options.value === "number"
        ? options.value
        : parseFloat(String(options.value).replace(/[^0-9.-]/g, ""));
    effectiveSeverity = computeMetricSeverity(num, options.thresholds);
  }

  const metricClasses = [
    "primitive-metric",
    `severity-${effectiveSeverity}`,
    isInteractive ? "interactive" : "",
    options.className || "",
  ]
    .filter(Boolean)
    .join(" ");

  const valStr = String(options.value ?? "");
  const defaultAria = `${options.label || "Metric"}: ${valStr}${options.unit ? ` ${options.unit}` : ""}${options.supportValue || options.supportLabel ? `. ${options.supportValue || ""} ${options.supportLabel || ""}` : ""}`;
  const ariaLabel = options.ariaLabel || defaultAria;

  const content = html`
    <div class="primitive-metric-main">
      ${options.icon ? html`<span class="primitive-metric-icon"><ha-icon icon="${escapeHtml(options.icon)}"></ha-icon></span>` : ""}
      <span class="primitive-metric-value size-${size}"
        >${escapeHtml(valStr)}</span
      >
      ${options.unit ? html`<span class="primitive-metric-unit">${escapeHtml(options.unit)}</span>` : ""}
      ${
        options.trend === "up"
          ? html`<span class="primitive-metric-trend up"
              ><ha-icon icon="mdi:arrow-up"></ha-icon
            ></span>`
          : options.trend === "down"
            ? html`<span class="primitive-metric-trend down"
                ><ha-icon icon="mdi:arrow-down"></ha-icon
              ></span>`
            : ""
      }
    </div>
    ${options.label ? html`<div class="primitive-metric-label">${escapeHtml(options.label)}</div>` : ""}
    ${
      options.supportValue || options.supportLabel
        ? html`
            <div class="primitive-metric-support">
              ${options.supportValue ? html`<b>${escapeHtml(String(options.supportValue))}</b>` : ""}
              ${options.supportLabel ? html`<span>${escapeHtml(options.supportLabel)}</span>` : ""}
            </div>
          `
        : ""
    }
  `;

  if (isInteractive) {
    return html`
      <button
        class="${metricClasses}"
        type="button"
        aria-label="${escapeHtml(ariaLabel)}"
        @click=${options.onClick}
      >
        ${content}
      </button>
    `;
  }

  return html`
    <div class="${metricClasses}" aria-label="${escapeHtml(ariaLabel)}">
      ${content}
    </div>
  `;
}
