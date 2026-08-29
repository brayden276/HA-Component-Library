/**
 * Owned lifecycle controller for components and long-lived subscriptions.
 */

export interface ComponentLifecycle {
  cleanup: <T extends () => void>(callback: T) => T;
  connect: () => AbortSignal;
  disconnect: () => void;
  readonly connected: boolean;
  readonly signal: AbortSignal;
  host: HTMLElement;
  listen: (
    target: EventTarget | null | undefined,
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: AddEventListenerOptions,
  ) => EventListenerOrEventListenerObject;
}

export const createLifecycle = (host: HTMLElement): ComponentLifecycle => {
  let controller: AbortController | null = null;
  let cleanups: Array<() => void> = [];

  const connect = (): AbortSignal => {
    if (controller && !controller.signal.aborted) return controller.signal;
    controller = new AbortController();
    return controller.signal;
  };

  const cleanup = <T extends () => void>(callback: T): T => {
    if (typeof callback !== "function") return callback;
    cleanups.push(callback);
    return callback;
  };

  const listen = (
    target: EventTarget | null | undefined,
    type: string,
    listener: EventListenerOrEventListenerObject,
    options: AddEventListenerOptions = {},
  ): EventListenerOrEventListenerObject => {
    const signal = connect();
    target?.addEventListener?.(type, listener, { ...options, signal });
    return listener;
  };

  const disconnect = (): void => {
    controller?.abort(new Error("Component disconnected"));
    controller = null;
    const pending = cleanups;
    cleanups = [];
    for (const callback of pending.reverse()) {
      try {
        callback();
      } catch {}
    }
  };

  return Object.freeze({
    cleanup,
    connect,
    disconnect,
    get connected() {
      return Boolean(controller && !controller.signal.aborted);
    },
    get signal() {
      return connect();
    },
    host,
    listen,
  });
};

/**
 * Schedules a callback to fire at the beginning of every wall-clock minute.
 * Automatically aligns with zero seconds and reschedules recursively.
 */
export const createMinuteScheduler = (
  callback: () => void,
  lifecycle?: ComponentLifecycle,
): (() => void) => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let active = true;

  const schedule = (): void => {
    if (!active) return;
    const delay = 60000 - (Date.now() % 60000) + 100;
    timer = setTimeout(() => {
      if (!active) return;
      try {
        callback();
      } catch {}
      schedule();
    }, delay);
  };

  schedule();

  const cancel = (): void => {
    active = false;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  if (lifecycle) {
    lifecycle.cleanup(cancel);
  }

  return cancel;
};
