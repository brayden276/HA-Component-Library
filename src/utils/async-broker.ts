/**
 * Stale-while-refresh async data broker with exponential backoff and in-flight request coalescing.
 */

export interface AsyncBrokerDefaults {
  ttl?: number;
  maxStale?: number;
  retryBase?: number;
  retryMax?: number;
}

export interface AsyncSnapshot<T> {
  readonly value: T | undefined;
  readonly error: Error | null;
  readonly loading: boolean;
  readonly stale: boolean;
  readonly updatedAt: number;
}

export interface AsyncBroker<T, C = unknown> {
  clear: () => void;
  invalidate: (key: string) => void;
  peek: (key: string) => AsyncSnapshot<T>;
  read: (key: string, context?: C, options?: { force?: boolean }) => Promise<T>;
  refresh: (key: string, context?: C) => Promise<T>;
  subscribe: (
    key: string,
    subscriber: (snapshot: AsyncSnapshot<T>) => void,
    options?: { replay?: boolean },
  ) => () => void;
}

interface BrokerEntry<T> {
  value: T | undefined;
  error: Error | null;
  updatedAt: number;
  promise: Promise<T> | null;
  failures: number;
  nextRetryAt: number;
  subscribers: Set<(snapshot: AsyncSnapshot<T>) => void>;
  sequence: number;
  invalidated: boolean;
  generation: number;
}

export const createAsyncBroker = <T, C = unknown>(
  loader: (key: string, context?: C, sequence?: number) => Promise<T>,
  defaults: AsyncBrokerDefaults = {},
): AsyncBroker<T, C> => {
  if (typeof loader !== "function")
    throw new TypeError("createAsyncBroker requires a loader");

  const entries = new Map<string, BrokerEntry<T>>();
  const ttl = Math.max(0, Number(defaults.ttl) || 120000);
  const maxStale = Math.max(ttl, Number(defaults.maxStale) || 86400000);
  const retryBase = Math.max(250, Number(defaults.retryBase) || 2000);
  const retryMax = Math.max(retryBase, Number(defaults.retryMax) || 60000);

  const entryFor = (key: string): BrokerEntry<T> => {
    if (!entries.has(key)) {
      entries.set(key, {
        value: undefined,
        error: null,
        updatedAt: 0,
        promise: null,
        failures: 0,
        nextRetryAt: 0,
        subscribers: new Set(),
        sequence: 0,
        invalidated: false,
        generation: 0,
      });
    }
    return entries.get(key)!;
  };

  const snapshot = (key: string): AsyncSnapshot<T> => {
    const entry = entryFor(key);
    const age = entry.updatedAt ? Date.now() - entry.updatedAt : Infinity;
    return Object.freeze({
      value: entry.value,
      error: entry.error,
      loading: Boolean(entry.promise),
      stale: entry.value !== undefined && (entry.invalidated || age > ttl),
      updatedAt: entry.updatedAt,
    });
  };

  const notify = (key: string): void => {
    const current = snapshot(key);
    for (const subscriber of [...entryFor(key).subscribers]) {
      try {
        subscriber(current);
      } catch {}
    }
  };

  const refresh = (key: string, context?: C, force = false): Promise<T> => {
    const entry = entryFor(key);
    const now = Date.now();
    if (entry.promise) return entry.promise;
    if (!force && now < entry.nextRetryAt) {
      return entry.value !== undefined
        ? Promise.resolve(entry.value)
        : Promise.reject(entry.error);
    }
    const sequence = ++entry.sequence;
    const generation = entry.generation;
    entry.promise = Promise.resolve()
      .then(() => loader(key, context, sequence))
      .then((value) => {
        if (sequence !== entry.sequence) return entry.value as T;
        entry.value = value;
        entry.error = null;
        entry.updatedAt = Date.now();
        entry.failures = 0;
        entry.nextRetryAt = 0;
        entry.invalidated = entry.generation !== generation;
        return value;
      })
      .catch((error) => {
        if (sequence !== entry.sequence) return entry.value as T;
        entry.error = error instanceof Error ? error : new Error(String(error));
        entry.failures += 1;
        entry.nextRetryAt =
          Date.now() +
          Math.min(retryMax, retryBase * Math.pow(2, entry.failures - 1));
        if (
          entry.value !== undefined &&
          Date.now() - entry.updatedAt <= maxStale
        )
          return entry.value;
        throw entry.error;
      })
      .finally(() => {
        if (sequence === entry.sequence) entry.promise = null;
        notify(key);
      });
    notify(key);
    return entry.promise;
  };

  return Object.freeze({
    clear() {
      entries.clear();
    },
    invalidate(key: string) {
      const entry = entries.get(key);
      if (!entry) return;
      entry.invalidated = true;
      entry.generation += 1;
      entry.nextRetryAt = 0;
      notify(key);
    },
    peek: snapshot,
    async read(
      key: string,
      context?: C,
      options: { force?: boolean } = {},
    ): Promise<T> {
      const current = snapshot(key);
      const age = current.updatedAt ? Date.now() - current.updatedAt : Infinity;
      const entry = entryFor(key);
      if (
        !options.force &&
        !entry.invalidated &&
        current.value !== undefined &&
        age <= ttl
      ) {
        return current.value;
      }
      if (!options.force && current.value !== undefined && age <= maxStale) {
        void refresh(key, context).catch(() => {});
        return current.value;
      }
      let value: T;
      try {
        value = await refresh(key, context, options.force === true);
      } catch (error) {
        if (options.force && entryFor(key).invalidated) {
          return refresh(key, context, true);
        }
        throw error;
      }
      if (options.force && entryFor(key).invalidated) {
        value = await refresh(key, context, true);
      }
      return value;
    },
    refresh: (key: string, context?: C) => refresh(key, context, true),
    subscribe(
      key: string,
      subscriber: (snapshot: AsyncSnapshot<T>) => void,
      options: { replay?: boolean } = {},
    ) {
      const entry = entryFor(key);
      entry.subscribers.add(subscriber);
      if (options.replay !== false) subscriber(snapshot(key));
      return () => {
        entry.subscribers.delete(subscriber);
      };
    },
  });
};
