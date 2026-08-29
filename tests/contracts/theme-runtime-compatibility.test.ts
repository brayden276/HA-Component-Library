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

  it("renders favourites card edit control with icon cleanly", async () => {
    const card = document.createElement("component-favourites-v3") as any;
    card.setConfig({ title: "Favourites", show_header: true });
    document.body.append(card);
    await card.updateComplete;

    expect(card.shadowRoot.querySelector(".edit")).not.toBeNull();
    expect(card.shadowRoot.textContent).toContain("Favourites");
    expect(card.shadowRoot.textContent).toContain("Edit");
    card.remove();
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
