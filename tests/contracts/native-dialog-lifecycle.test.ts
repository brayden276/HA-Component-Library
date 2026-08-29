import { describe, expect, it } from "vitest";
import { dialogStyles } from "../../src/styles/shared-styles";
import "../../src/cards/wled/wled-card";
import { createMockHass } from "../fixtures/mock-hass";

describe("native dialog contract", () => {
  it("styles the native dialog host, backdrop, and sheet structure", () => {
    const cssText = String(dialogStyles);

    expect(cssText).toContain("dialog::backdrop");
    expect(cssText).toContain("dialog .sheet-head");
    expect(cssText).toContain("dialog .sheet-body");
    expect(cssText).toContain("max-height: calc(100dvh - 32px)");
  });

  it("restores focus to the WLED dialog opener after native close", async () => {
    const el = document.createElement("component-wled-controller-v1") as any;
    el.setConfig({ entity: "light.wled_strip" });
    el.hass = createMockHass({
      states: {
        "light.wled_strip": {
          state: "on",
          attributes: {
            friendly_name: "WLED Strip",
            brightness: 128,
            effect_list: ["Rainbow"],
          },
        } as any,
      },
    });
    document.body.appendChild(el);
    await el.updateComplete;

    const dialog = el.shadowRoot.querySelector("dialog") as any;
    let isOpen = false;
    dialog.showModal = () => {
      isOpen = true;
    };
    dialog.close = () => {
      isOpen = false;
      dialog.dispatchEvent(new Event("close"));
    };
    Object.defineProperty(dialog, "open", { get: () => isOpen });

    const opener = el.shadowRoot.querySelector(".advanced") as HTMLButtonElement;
    let restoredFocus = false;
    opener.focus = () => {
      restoredFocus = true;
    };

    el._openAdvanced(false, { currentTarget: opener });
    expect(dialog.open).toBe(true);
    el._closeDialog();

    expect(restoredFocus).toBe(true);
    el.remove();
  });
});
