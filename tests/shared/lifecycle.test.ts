import { describe, expect, it, vi } from "vitest";
import { createLifecycle, createMinuteScheduler } from "../../src/utils/lifecycle";

describe("component lifecycle", () => {
  it("aborts listeners and runs cleanup callbacks in reverse registration order", () => {
    const lifecycle = createLifecycle(document.createElement("div"));
    const listener = vi.fn();
    const cleanup = vi.fn();
    const target = new EventTarget();

    lifecycle.listen(target, "change", listener);
    lifecycle.cleanup(() => cleanup("first"));
    lifecycle.cleanup(() => cleanup("second"));
    target.dispatchEvent(new Event("change"));
    lifecycle.disconnect();
    target.dispatchEvent(new Event("change"));

    expect(listener).toHaveBeenCalledTimes(1);
    expect(cleanup.mock.calls).toEqual([["second"], ["first"]]);
    expect(lifecycle.connected).toBe(false);
  });

  it("cancels minute scheduling when its lifecycle disconnects", () => {
    vi.useFakeTimers();
    try {
      const lifecycle = createLifecycle(document.createElement("div"));
      const callback = vi.fn();
      createMinuteScheduler(callback, lifecycle);
      lifecycle.disconnect();
      vi.advanceTimersByTime(61_000);

      expect(callback).not.toHaveBeenCalled();
    } finally {
      vi.useRealTimers();
    }
  });
});
