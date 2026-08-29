import { describe, expect, it } from "vitest";
import { injectGlobalTokens, GLOBAL_THEME_CSS } from "../../src/styles/tokens";
import "../../src/cards/favourites/favourites-card";
import "../../src/cards/history-graph/history-graph-card";

describe("theme and runtime compatibility", () => {
  it("keeps catalogue token fallbacks local to the component host", () => {
    const headBefore = document.head.querySelectorAll("style").length;

    injectGlobalTokens();

    expect(document.head.querySelectorAll("style")).toHaveLength(headBefore);
    expect(GLOBAL_THEME_CSS).toContain(":host");
    expect(GLOBAL_THEME_CSS).not.toContain(":root");
    expect(GLOBAL_THEME_CSS).not.toContain("[data-theme");
  });

  it("uses the explicit minimal compatibility path without reaching into a child shadow root", async () => {
    const host = document.createElement("component-favourites-minimal-v1") as any;
    host.setConfig({ title: "Favourites" });
    document.body.append(host);
    await host.updateComplete;

    const child = host.shadowRoot.querySelector("component-favourites-v3") as any;
    await child.updateComplete;

    expect(child.minimal).toBe(true);
    expect(child.shadowRoot.querySelector(".edit ha-icon")?.getAttribute("icon")).toBe("mdi:dots-horizontal");
    host.remove();
  });

  it("renders tooltip values as Lit text rather than assigning HTML", async () => {
    const card = document.createElement("component-history-graph-v2") as any;
    card.setConfig({ series_1_label: '<img src=x onerror="throw 1">' });
    document.body.append(card);
    await card.updateComplete;

    const chart = card.shadowRoot.querySelector(".chart") as HTMLElement;
    Object.defineProperty(chart, "getBoundingClientRect", {
      value: () => ({ left: 0, top: 0, width: 800, height: 420 }),
    });
    card._handlePointer({ clientX: 400, clientY: 100 });
    await card.updateComplete;

    const tooltip = card.shadowRoot.querySelector(".tooltip");
    expect(tooltip).not.toBeNull();
    expect(tooltip.querySelector("img")).toBeNull();
    expect(tooltip.textContent).toContain('<img src=x onerror="throw 1">');
    card.remove();
  });
});
