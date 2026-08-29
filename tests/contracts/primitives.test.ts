import { describe, it, expect, vi } from "vitest";
import { render } from "lit";
import {
  renderEntityRow,
  entityRowPrimitiveStyles,
  renderMetric,
  computeMetricSeverity,
  metricPrimitiveStyles,
  renderNavigationItem,
  navigationPrimitiveStyles,
} from "../../src/components/primitives";

describe("Shared Reusable Primitives Contract Tests", () => {
  describe("entity-row-primitive", () => {
    it("renders basic static entity row with title, subtitle, icon, state and badge", () => {
      const container = document.createElement("div");
      const template = renderEntityRow({
        title: "Living Room Light",
        subtitle: "Main ceiling fixture",
        icon: "mdi:lightbulb",
        iconColor: "#ff9800",
        state: "On",
        stateLabel: "100% Brightness",
        badge: { text: "Active", severity: "success" },
      });
      render(template, container);

      expect(container.textContent).toContain("Living Room Light");
      expect(container.textContent).toContain("Main ceiling fixture");
      expect(container.textContent).toContain("On");
      expect(container.textContent).toContain("100% Brightness");
      expect(container.textContent).toContain("Active");

      const icon = container.querySelector("ha-icon");
      expect(icon?.getAttribute("icon")).toBe("mdi:lightbulb");

      const badge = container.querySelector(".primitive-row-badge.success");
      expect(badge).not.toBeNull();
      expect(badge?.textContent?.trim()).toBe("Active");
    });

    it("renders interactive entity row button and triggers onClick", () => {
      const container = document.createElement("div");
      const handleClick = vi.fn();

      const template = renderEntityRow({
        title: "Front Door Lock",
        state: "Locked",
        interactive: true,
        onClick: handleClick,
      });
      render(template, container);

      const btn = container.querySelector("button.primitive-entity-row");
      expect(btn).not.toBeNull();
      expect(btn?.getAttribute("aria-label")).toBe("Front Door Lock. Locked");

      btn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("renders trailing toggle and handles toggle changes", () => {
      const container = document.createElement("div");
      const handleToggle = vi.fn();

      const template = renderEntityRow({
        title: "Night Mode",
        trailing: {
          type: "toggle",
          checked: true,
          onToggle: handleToggle,
        },
      });
      render(template, container);

      const toggleBtn = container.querySelector(".primitive-row-toggle.on") as HTMLButtonElement;
      expect(toggleBtn).not.toBeNull();
      expect(toggleBtn.getAttribute("aria-checked")).toBe("true");

      toggleBtn.click();
      expect(handleToggle).toHaveBeenCalledWith(false, expect.any(Object));
    });

    it("renders trailing action button and handles clicks", () => {
      const container = document.createElement("div");
      const handleAction = vi.fn();

      const template = renderEntityRow({
        title: "Firmware",
        subtitle: "Update available",
        trailing: {
          type: "action",
          label: "Install",
          icon: "mdi:download",
          onClick: handleAction,
        },
      });
      render(template, container);

      const actionBtn = container.querySelector(".primitive-row-action-btn") as HTMLButtonElement;
      expect(actionBtn).not.toBeNull();
      expect(actionBtn.textContent).toContain("Install");
      expect(actionBtn.querySelector("ha-icon")?.getAttribute("icon")).toBe("mdi:download");

      actionBtn.click();
      expect(handleAction).toHaveBeenCalledTimes(1);
    });

    it("renders trailing chevron", () => {
      const container = document.createElement("div");
      const template = renderEntityRow({
        title: "Settings",
        trailing: { type: "chevron" },
      });
      render(template, container);

      const chevron = container.querySelector(".primitive-row-chevron ha-icon");
      expect(chevron?.getAttribute("icon")).toBe("mdi:chevron-right");
    });

    it("exports entityRowPrimitiveStyles", () => {
      expect(entityRowPrimitiveStyles).toBeDefined();
    });
  });

  describe("metric-primitive", () => {
    it("renders metric with value, unit, label, support context and trend", () => {
      const container = document.createElement("div");
      const template = renderMetric({
        value: 4.8,
        unit: "kW",
        label: "Solar Generation",
        supportValue: "92%",
        supportLabel: "Self-sufficiency",
        trend: "up",
        size: "lg",
      });
      render(template, container);

      expect(container.textContent).toContain("4.8");
      expect(container.textContent).toContain("kW");
      expect(container.textContent).toContain("Solar Generation");
      expect(container.textContent).toContain("92%");
      expect(container.textContent).toContain("Self-sufficiency");

      const trend = container.querySelector(".primitive-metric-trend.up");
      expect(trend).not.toBeNull();

      const valEl = container.querySelector(".primitive-metric-value.size-lg");
      expect(valEl).not.toBeNull();
    });

    it("computes metric severity from thresholds correctly", () => {
      const thresholds = { warning: 75, critical: 90 };
      expect(computeMetricSeverity(50, thresholds)).toBe("normal");
      expect(computeMetricSeverity(75, thresholds)).toBe("warning");
      expect(computeMetricSeverity(85, thresholds)).toBe("warning");
      expect(computeMetricSeverity(90, thresholds)).toBe("critical");
      expect(computeMetricSeverity(99, thresholds)).toBe("critical");

      // Inverted thresholds (lower is worse)
      const invThresholds = { warning: 20, critical: 10, invert: true };
      expect(computeMetricSeverity(50, invThresholds)).toBe("normal");
      expect(computeMetricSeverity(20, invThresholds)).toBe("warning");
      expect(computeMetricSeverity(15, invThresholds)).toBe("warning");
      expect(computeMetricSeverity(10, invThresholds)).toBe("critical");
      expect(computeMetricSeverity(5, invThresholds)).toBe("critical");
    });

    it("applies severity class from calculated thresholds or explicit override", () => {
      const container = document.createElement("div");
      const template = renderMetric({
        value: 95,
        unit: "%",
        label: "CPU Load",
        thresholds: { warning: 70, critical: 90 },
      });
      render(template, container);

      const metricEl = container.querySelector(".primitive-metric.severity-critical");
      expect(metricEl).not.toBeNull();
    });

    it("renders interactive metric button and handles onClick", () => {
      const container = document.createElement("div");
      const handleClick = vi.fn();

      const template = renderMetric({
        value: "21.5",
        unit: "°C",
        label: "Temperature",
        interactive: true,
        onClick: handleClick,
      });
      render(template, container);

      const btn = container.querySelector("button.primitive-metric");
      expect(btn).not.toBeNull();

      btn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("exports metricPrimitiveStyles", () => {
      expect(metricPrimitiveStyles).toBeDefined();
    });
  });

  describe("navigation-primitive", () => {
    it("renders navigation item with icon, title, context, badge, and chevron", () => {
      const container = document.createElement("div");
      const template = renderNavigationItem({
        title: "Living Room",
        context: "3 lights on",
        icon: "mdi:sofa",
        path: "/lovelace/living-room",
        badge: { text: "3", severity: "info" },
      });
      render(template, container);

      expect(container.textContent).toContain("Living Room");
      expect(container.textContent).toContain("3 lights on");

      const icon = container.querySelector("ha-icon");
      expect(icon?.getAttribute("icon")).toBe("mdi:sofa");

      const badge = container.querySelector(".primitive-nav-badge.info");
      expect(badge?.textContent?.trim()).toBe("3");

      const chevron = container.querySelector(".primitive-nav-chevron ha-icon");
      expect(chevron?.getAttribute("icon")).toBe("mdi:chevron-right");
    });

    it("renders interactive navigation button and triggers onClick with path", () => {
      const container = document.createElement("div");
      const handleClick = vi.fn();

      const template = renderNavigationItem({
        title: "Security Dashboard",
        path: "/lovelace/security",
        onClick: handleClick,
      });
      render(template, container);

      const btn = container.querySelector("button.primitive-nav-item");
      expect(btn).not.toBeNull();
      expect(btn?.getAttribute("aria-label")).toBe("Security Dashboard. Navigate.");

      btn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      expect(handleClick).toHaveBeenCalledWith("/lovelace/security", expect.any(Object));
    });

    it("respects active and disabled states", () => {
      const container = document.createElement("div");
      const template = renderNavigationItem({
        title: "Home",
        active: true,
        disabled: true,
        path: "/lovelace/home",
      });
      render(template, container);

      const btn = container.querySelector("button.primitive-nav-item") as HTMLButtonElement;
      expect(btn.classList.contains("active")).toBe(true);
      expect(btn.classList.contains("disabled")).toBe(true);
      expect(btn.disabled).toBe(true);
    });

    it("exports navigationPrimitiveStyles", () => {
      expect(navigationPrimitiveStyles).toBeDefined();
    });
  });
});
