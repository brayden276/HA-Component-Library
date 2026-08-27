/**
 * Shared interaction primitives for all HA Component Library controls.
 * Preserves exact pointer, hold, repeat, optimistic rollback, and accessibility semantics.
 */

export interface InteractionDefaults {
  holdDelay: number;
  moveTolerance: number;
  errorDuration: number;
  repeatDelay: number;
  repeatInterval: number;
  repeatMinimumInterval: number;
}

export const INTERACTION_DEFAULTS: InteractionDefaults = Object.freeze({
  holdDelay: 500,
  moveTolerance: 10,
  errorDuration: 1800,
  repeatDelay: 350,
  repeatInterval: 110,
  repeatMinimumInterval: 55,
});

export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  globalThis.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true;

export interface RepeatOptions {
  delay?: number;
  interval?: number;
  minimumInterval?: number;
  accelerate?: boolean;
}

export interface OptimisticAdapter<T = unknown> {
  capture: (element: HTMLElement, event?: Event) => T;
  apply: (element: HTMLElement, event?: Event, previous?: T) => void;
  rollback?: (
    previous: T,
    error?: unknown,
    element?: HTMLElement,
    event?: Event,
  ) => void;
}

export type OptimisticMode =
  | "toggle"
  | "selection"
  | boolean
  | OptimisticAdapter
  | ((element: HTMLElement) => void);

export interface InteractionOptions {
  primary?: (event?: Event) => Promise<unknown> | unknown;
  hold?: (event?: Event) => Promise<unknown> | unknown;
  repeat?: boolean | RepeatOptions;
  feedback?: boolean;
  singleFlight?: boolean;
  holdDelay?: number;
  moveTolerance?: number;
  errorDuration?: number;
  errorMessage?: string;
  optimistic?: OptimisticMode;
  signal?: AbortSignal;
  onPressChange?: (pressed: boolean, element: HTMLElement) => void;
}

export interface InteractionHandle {
  element: HTMLElement;
  readonly destroyed: boolean;
  destroy: () => void;
  invoke: (event?: Event) => Promise<unknown>;
}

export const interactionStyles = `
[data-interaction-pressed="true"] {
  transform: scale(.985);
  filter: brightness(.96);
  transition: transform var(--dashboard-transition-fast, 80ms) var(--dashboard-easing-standard, ease-out), filter var(--dashboard-transition-fast, 80ms) var(--dashboard-easing-standard, ease-out);
}
[data-interaction-pending="true"] {
  cursor: progress !important;
  opacity: .72;
  transition: opacity var(--dashboard-transition-standard, 120ms) var(--dashboard-easing-standard, ease-out);
}
[data-interaction-error="true"] {
  outline: 2px solid var(--error-color, #db4437) !important;
  outline-offset: 2px;
}
[data-ha-interaction-status="v2"] {
  position: fixed !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}
@media (prefers-reduced-motion: reduce) {
  [data-interaction-pressed="true"], [data-interaction-pending="true"] {
    transition-duration: 0s !important;
  }
}
`;

const normaliseRepeat = (
  repeat?: boolean | RepeatOptions,
): RepeatOptions | null => {
  if (!repeat) return null;
  if (repeat === true) return {};
  if (typeof repeat !== "object") {
    throw new TypeError(
      "interaction repeat must be false, true, or an options object",
    );
  }
  return repeat;
};

const buildOptimisticAdapter = (
  optimistic: OptimisticMode | undefined,
  element: HTMLElement,
): OptimisticAdapter | null => {
  if (!optimistic) return null;
  if (typeof optimistic === "function") {
    return { capture: () => undefined, apply: optimistic, rollback: undefined };
  }
  if (typeof optimistic === "object") {
    return {
      capture: optimistic.capture || (() => undefined),
      apply: optimistic.apply || (() => {}),
      rollback: optimistic.rollback || undefined,
    };
  }
  if (optimistic === "toggle") {
    return {
      capture: () => element.getAttribute("aria-pressed"),
      apply: () => {
        const current = element.getAttribute("aria-pressed") === "true";
        element.setAttribute("aria-pressed", String(!current));
      },
      rollback: (previous: unknown) => {
        if (previous === null) element.removeAttribute("aria-pressed");
        else element.setAttribute("aria-pressed", String(previous));
      },
    };
  }
  if (optimistic === "selection") {
    return {
      capture: () => ({
        selected: element.getAttribute("aria-selected"),
        checked: element.getAttribute("aria-checked"),
      }),
      apply: () => {
        if (element.hasAttribute("aria-selected"))
          element.setAttribute("aria-selected", "true");
        if (element.hasAttribute("aria-checked"))
          element.setAttribute("aria-checked", "true");
      },
      rollback: (previous: any) => {
        if (previous.selected === null)
          element.removeAttribute("aria-selected");
        else element.setAttribute("aria-selected", previous.selected);
        if (previous.checked === null) element.removeAttribute("aria-checked");
        else element.setAttribute("aria-checked", previous.checked);
      },
    };
  }
  throw new TypeError(`Unsupported optimistic interaction mode: ${optimistic}`);
};

export const ensureInteractionFeedback = (
  element: HTMLElement,
): HTMLSpanElement | null => {
  const root = element.getRootNode?.() as any;
  if (!root || root.__haInteractionFeedbackV2) return null;
  root.__haInteractionFeedbackV2 = true;
  const style = document.createElement("style");
  style.setAttribute("data-ha-interaction-styles", "v2");
  style.textContent = interactionStyles;
  const status = document.createElement("span");
  status.setAttribute("data-ha-interaction-status", "v2");
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  status.setAttribute("aria-atomic", "true");
  const targetContainer =
    root.nodeType === 9 || root.body
      ? root.body || root.head || root.documentElement
      : root;
  if (targetContainer && typeof targetContainer.append === "function") {
    targetContainer.append(style, status);
  }
  return status;
};

const NESTED_INTERACTIVE_SELECTOR = [
  "button",
  "a[href]",
  "input",
  "select",
  "textarea",
  "summary",
  '[contenteditable="true"]',
  '[role="button"]',
  '[role="link"]',
  '[role="checkbox"]',
  '[role="menuitem"]',
  '[role="option"]',
  '[role="radio"]',
  '[role="slider"]',
  '[role="switch"]',
  "[tabindex]",
].join(",");

export const interaction = (
  element: HTMLElement,
  options: InteractionOptions = {},
): InteractionHandle => {
  if (!element?.addEventListener) {
    throw new TypeError("interaction requires an EventTarget element");
  }
  const feedbackStatus = ensureInteractionFeedback(element);

  const primary =
    typeof options.primary === "function" ? options.primary : null;
  const hold = typeof options.hold === "function" ? options.hold : null;
  const repeat = normaliseRepeat(options.repeat);
  if (hold && repeat)
    throw new TypeError("interaction hold and repeat are mutually exclusive");
  if (!primary && (hold || repeat)) {
    throw new TypeError("interaction hold/repeat requires a primary action");
  }

  const feedback = options.feedback !== false;
  const singleFlight = options.singleFlight === true;
  const holdDelay = Math.max(
    250,
    Number(options.holdDelay) || INTERACTION_DEFAULTS.holdDelay,
  );
  const moveTolerance = Math.max(
    4,
    Number(options.moveTolerance) || INTERACTION_DEFAULTS.moveTolerance,
  );
  const optimistic = buildOptimisticAdapter(options.optimistic, element);
  const signal = options.signal;
  const onPressChange =
    typeof options.onPressChange === "function" ? options.onPressChange : null;

  let pointer: { id: number; x: number; y: number } | null = null;
  let holdTimer: ReturnType<typeof setTimeout> | null = null;
  let repeatTimer: ReturnType<typeof setTimeout> | null = null;
  let repeatInterval: ReturnType<typeof setInterval> | null = null;
  let repeatCount = 0;
  let suppressClick = false;
  let suppressClickTimer: ReturnType<typeof setTimeout> | null = null;
  let gestureConsumed = false;
  let pending = 0;
  let errorTimer: ReturnType<typeof setTimeout> | null = null;
  let destroyed = false;
  let pressedState = false;

  const fromNestedInteractive = (event?: Event): boolean => {
    const path = event?.composedPath?.();
    if (Array.isArray(path) && path.length) {
      for (const node of path) {
        if (node === element) return false;
        if ((node as Element)?.matches?.(NESTED_INTERACTIVE_SELECTOR))
          return true;
      }
    }
    const target = event?.target as Element | null;
    if (!target || target === element) return false;
    const nested = target.closest?.(NESTED_INTERACTIVE_SELECTOR);
    return Boolean(nested && nested !== element && element.contains?.(nested));
  };

  const disabled = (): boolean =>
    destroyed ||
    (singleFlight && pending > 0) ||
    (element as any).disabled === true ||
    element.getAttribute?.("aria-disabled") === "true";

  const clearClickSuppression = (): void => {
    if (suppressClickTimer) clearTimeout(suppressClickTimer);
    suppressClickTimer = null;
    suppressClick = false;
  };

  const suppressNextClick = (): void => {
    suppressClick = true;
    if (suppressClickTimer) clearTimeout(suppressClickTimer);
    suppressClickTimer = setTimeout(clearClickSuppression, 0);
  };

  const setPressed = (pressed: boolean): void => {
    if (pressedState === pressed) return;
    pressedState = pressed;
    if (feedback)
      element.toggleAttribute?.("data-interaction-pressed", pressed);
    if (!destroyed) onPressChange?.(pressed, element);
  };

  const setPending = (value: number): void => {
    pending = Math.max(0, pending + value);
    if (!feedback || destroyed) return;
    element.toggleAttribute?.("data-interaction-pending", pending > 0);
    element.setAttribute?.("aria-busy", String(pending > 0));
  };

  const setError = (): void => {
    if (!feedback || destroyed) return;
    if (errorTimer) clearTimeout(errorTimer);
    element.setAttribute?.("data-interaction-error", "true");
    const liveStatus =
      feedbackStatus ||
      (element.getRootNode?.() as ShadowRoot | Document)?.querySelector?.(
        "[data-ha-interaction-status]",
      );
    if (liveStatus)
      liveStatus.textContent =
        options.errorMessage || "Action failed. Try again.";
    errorTimer = setTimeout(
      () => {
        errorTimer = null;
        if (!destroyed) element.removeAttribute?.("data-interaction-error");
      },
      Math.max(
        250,
        Number(options.errorDuration) || INTERACTION_DEFAULTS.errorDuration,
      ),
    );
  };

  const dispatchError = (error: unknown): void => {
    if (destroyed) return;
    element.dispatchEvent?.(
      new CustomEvent("ha-interaction-error", {
        bubbles: true,
        composed: true,
        detail: { error },
      }),
    );
  };

  const invoke = (
    kind: "primary" | "hold",
    event?: Event,
  ): Promise<unknown> => {
    if (disabled()) return Promise.resolve(undefined);
    const action = kind === "hold" ? hold : primary;
    if (!action) return Promise.resolve(undefined);

    let previous: unknown;
    if (kind === "primary" && optimistic) {
      previous = optimistic.capture(element, event);
      optimistic.apply(element, event, previous);
    }

    let result: unknown;
    try {
      result = action(event);
    } catch (error) {
      if (!destroyed && kind === "primary" && optimistic?.rollback) {
        optimistic.rollback(previous, error, element, event);
      }
      setError();
      dispatchError(error);
      return Promise.reject(error);
    }

    if (!result || typeof (result as Promise<unknown>).then !== "function") {
      return Promise.resolve(result);
    }
    setPending(1);
    return Promise.resolve(result)
      .catch((error) => {
        if (!destroyed && kind === "primary" && optimistic?.rollback) {
          optimistic.rollback(previous, error, element, event);
        }
        setError();
        dispatchError(error);
        throw error;
      })
      .finally(() => {
        if (!destroyed) setPending(-1);
      });
  };

  const clearGestureTimers = (): void => {
    if (holdTimer) clearTimeout(holdTimer);
    holdTimer = null;
    if (repeatTimer) clearTimeout(repeatTimer);
    repeatTimer = null;
    if (repeatInterval) clearInterval(repeatInterval);
    repeatInterval = null;
  };

  const cancelPointer = (): void => {
    clearGestureTimers();
    pointer = null;
    setPressed(false);
  };

  const startRepeat = (event: PointerEvent): void => {
    if (!repeat || disabled()) return;
    const delay = Math.max(
      150,
      Number(repeat.delay) || INTERACTION_DEFAULTS.repeatDelay,
    );
    const baseInterval = Math.max(
      40,
      Number(repeat.interval) || INTERACTION_DEFAULTS.repeatInterval,
    );
    repeatCount = 0;
    repeatTimer = setTimeout(() => {
      repeatTimer = null;
      if (destroyed || !pointer) return;
      gestureConsumed = true;
      suppressNextClick();
      const tick = () => {
        if (destroyed || !pointer) {
          if (repeatInterval) clearInterval(repeatInterval);
          repeatInterval = null;
          return;
        }
        repeatCount += 1;
        void invoke("primary", event).catch(() => {});
        if (destroyed || !pointer) return;
        if (!repeat.accelerate) return;
        const next = Math.max(
          Number(repeat.minimumInterval) ||
            INTERACTION_DEFAULTS.repeatMinimumInterval,
          Math.round(baseInterval * Math.pow(0.93, repeatCount)),
        );
        if (repeatInterval) clearInterval(repeatInterval);
        repeatInterval = setInterval(tick, next);
      };
      void invoke("primary", event).catch(() => {});
      if (!destroyed && pointer)
        repeatInterval = setInterval(tick, baseInterval);
    }, delay);
  };

  const onPointerDown = (event: PointerEvent): void => {
    if (
      !primary ||
      disabled() ||
      event.button > 0 ||
      fromNestedInteractive(event)
    )
      return;
    pointer = { id: event.pointerId, x: event.clientX, y: event.clientY };
    gestureConsumed = false;
    clearClickSuppression();
    try {
      element.setPointerCapture?.(event.pointerId);
    } catch {}
    setPressed(true);
    if (hold) {
      holdTimer = setTimeout(() => {
        holdTimer = null;
        if (!pointer) return;
        gestureConsumed = true;
        suppressNextClick();
        setPressed(false);
        void invoke("hold", event).catch(() => {});
      }, holdDelay);
    } else if (repeat) {
      startRepeat(event);
    }
  };

  const onPointerMove = (event: PointerEvent): void => {
    if (!pointer || event.pointerId !== pointer.id) return;
    if (
      Math.hypot(event.clientX - pointer.x, event.clientY - pointer.y) <=
      moveTolerance
    )
      return;
    gestureConsumed = true;
    suppressNextClick();
    cancelPointer();
  };

  const onPointerUp = (event: PointerEvent): void => {
    if (!pointer || event.pointerId !== pointer.id) return;
    if (fromNestedInteractive(event)) {
      gestureConsumed = true;
      suppressNextClick();
      cancelPointer();
      return;
    }
    const wasConsumed = gestureConsumed;
    const wasRepeating =
      repeat && (repeatTimer === null || repeatInterval !== null);
    clearGestureTimers();
    pointer = null;
    gestureConsumed = false;
    setPressed(false);
    suppressNextClick();
    if (!wasConsumed && !wasRepeating)
      void invoke("primary", event).catch(() => {});
  };

  const onPointerCancel = (): void => {
    gestureConsumed = false;
    suppressNextClick();
    cancelPointer();
  };

  const onClick = (event: MouseEvent): void => {
    if (fromNestedInteractive(event)) return;
    if (suppressClick) {
      event.preventDefault();
      event.stopImmediatePropagation?.();
      clearClickSuppression();
      return;
    }
    if (!primary || disabled()) return;
    void invoke("primary", event).catch(() => {});
  };

  const onKeyDown = (event: KeyboardEvent): void => {
    if (!primary || disabled() || event.repeat || fromNestedInteractive(event))
      return;
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    setPressed(true);
  };

  const onKeyUp = (event: KeyboardEvent): void => {
    if (!primary || disabled() || fromNestedInteractive(event)) return;
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    setPressed(false);
    suppressNextClick();
    void invoke("primary", event).catch(() => {});
  };

  element.addEventListener("pointerdown", onPointerDown as EventListener, {
    passive: true,
  });
  element.addEventListener("pointermove", onPointerMove as EventListener, {
    passive: true,
  });
  element.addEventListener("pointerup", onPointerUp as EventListener, {
    passive: true,
  });
  element.addEventListener("pointercancel", onPointerCancel as EventListener, {
    passive: true,
  });
  element.addEventListener(
    "lostpointercapture",
    onPointerCancel as EventListener,
    { passive: true },
  );
  element.addEventListener("click", onClick as EventListener, true);
  element.addEventListener("keydown", onKeyDown as EventListener);
  element.addEventListener("keyup", onKeyUp as EventListener);

  const destroy = (): void => {
    if (destroyed) return;
    destroyed = true;
    clearGestureTimers();
    if (errorTimer) clearTimeout(errorTimer);
    if (suppressClickTimer) clearTimeout(suppressClickTimer);
    errorTimer = null;
    suppressClickTimer = null;
    signal?.removeEventListener?.("abort", destroy);
    pressedState = false;
    pending = 0;
    if (feedback) {
      element.removeAttribute?.("data-interaction-pressed");
      element.removeAttribute?.("data-interaction-pending");
      element.removeAttribute?.("data-interaction-error");
      element.setAttribute?.("aria-busy", "false");
    }
    element.removeEventListener("pointerdown", onPointerDown as EventListener);
    element.removeEventListener("pointermove", onPointerMove as EventListener);
    element.removeEventListener("pointerup", onPointerUp as EventListener);
    element.removeEventListener(
      "pointercancel",
      onPointerCancel as EventListener,
    );
    element.removeEventListener(
      "lostpointercapture",
      onPointerCancel as EventListener,
    );
    element.removeEventListener("click", onClick as EventListener, true);
    element.removeEventListener("keydown", onKeyDown as EventListener);
    element.removeEventListener("keyup", onKeyUp as EventListener);
  };

  signal?.addEventListener?.("abort", destroy, { once: true });

  return Object.freeze({
    element,
    destroy,
    get destroyed() {
      return destroyed;
    },
    invoke: (event?: Event) => invoke("primary", event),
  });
};

export interface CoalescerOptions<T = unknown> {
  onSuccess?: (value: T, sequence: number) => void;
  onError?: (error: unknown, value: T, sequence: number) => void;
  onIdle?: () => void;
  stopOnError?: boolean;
}

export interface RequestCoalescer<T = unknown> {
  request: (value: T) => void;
  readonly pending: boolean;
  readonly destroyed: boolean;
  destroy: () => void;
}

export const createRequestCoalescer = <T = unknown>(
  requestFn: (value: T, sequence: number) => Promise<void> | void,
  options: CoalescerOptions<T> = {},
): RequestCoalescer<T> => {
  if (typeof requestFn !== "function")
    throw new TypeError("createRequestCoalescer requires a request function");
  let running = false;
  let queued = false;
  let latest: T;
  let destroyed = false;
  let sequence = 0;

  const drain = async (): Promise<void> => {
    if (running || destroyed || !queued) return;
    running = true;
    while (!destroyed && queued) {
      queued = false;
      const value = latest;
      const current = ++sequence;
      try {
        await requestFn(value, current);
        if (!destroyed) options.onSuccess?.(value, current);
      } catch (error) {
        if (!destroyed) options.onError?.(error, value, current);
        if (options.stopOnError) queued = false;
      }
    }
    running = false;
    if (!destroyed) options.onIdle?.();
  };

  return Object.freeze({
    request(value: T) {
      if (destroyed) return;
      latest = value;
      queued = true;
      void drain();
    },
    get pending() {
      return !destroyed && (running || queued);
    },
    get destroyed() {
      return destroyed;
    },
    destroy() {
      destroyed = true;
      queued = false;
    },
  });
};

export interface WaitForEntityOptions {
  timeout?: number;
  interval?: number;
  signal?: AbortSignal;
}

export const waitForEntityState = (
  hassOrProvider: any,
  entityId: string,
  predicate: (state: string | undefined, entityObj: any) => boolean,
  options: WaitForEntityOptions = {},
): Promise<any> => {
  if (!entityId || typeof predicate !== "function") {
    return Promise.reject(
      new TypeError("waitForEntityState requires an entity and predicate"),
    );
  }
  const provider =
    typeof hassOrProvider === "function"
      ? hassOrProvider
      : () => hassOrProvider;
  const timeout = Math.max(250, Number(options.timeout) || 9000);
  const interval = Math.max(40, Number(options.interval) || 160);
  const signal = options.signal;

  return new Promise((resolve, reject) => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let settled = false;

    const cleanup = () => {
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
      signal?.removeEventListener?.("abort", abort);
    };

    const finish = (callback: (val?: any) => void, value?: any) => {
      if (settled) return;
      settled = true;
      cleanup();
      callback(value);
    };

    const abort = () =>
      finish(reject, signal?.reason || new Error("State confirmation aborted"));

    const check = () => {
      const state = provider()?.states?.[entityId] ?? null;
      try {
        if (predicate(state?.state, state)) finish(resolve, state);
      } catch (error) {
        finish(reject, error);
      }
    };

    if (signal?.aborted) return abort();
    signal?.addEventListener?.("abort", abort, { once: true });
    intervalId = setInterval(check, interval);
    timeoutId = setTimeout(
      () => finish(reject, new Error("State confirmation timed out")),
      timeout,
    );
    check();
  });
};
