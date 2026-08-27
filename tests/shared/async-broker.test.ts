import { describe, it, expect, vi } from 'vitest';
import { createAsyncBroker } from "../../src/utils/async-broker";

describe('createAsyncBroker', () => {
  it('loads and caches data correctly', async () => {
    let callCount = 0;
    const loader = vi.fn(async (key: string) => {
      callCount += 1;
      return { key, count: callCount };
    });

    const broker = createAsyncBroker(loader, { ttl: 5000 });
    const res1 = await broker.read('item-1');
    expect(res1).toEqual({ key: 'item-1', count: 1 });
    expect(loader).toHaveBeenCalledTimes(1);

    // Second read within TTL should return cached value without calling loader again
    const res2 = await broker.read('item-1');
    expect(res2).toEqual({ key: 'item-1', count: 1 });
    expect(loader).toHaveBeenCalledTimes(1);
  });

  it('coalesces multiple concurrent reads into a single loader execution', async () => {
    const loader = vi.fn(async (key: string) => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      return { key, timestamp: Date.now() };
    });

    const broker = createAsyncBroker(loader);
    const [p1, p2, p3] = await Promise.all([
      broker.read('same-key'),
      broker.read('same-key'),
      broker.read('same-key')
    ]);

    expect(p1).toBe(p2);
    expect(p2).toBe(p3);
    expect(loader).toHaveBeenCalledTimes(1);
  });

  it('invalidates cache correctly and refreshes data', async () => {
    let callCount = 0;
    const loader = vi.fn(async () => {
      callCount += 1;
      return callCount;
    });

    const broker = createAsyncBroker(loader);
    const val1 = await broker.read('test-key');
    expect(val1).toBe(1);

    broker.invalidate('test-key');
    const val2 = await broker.refresh('test-key');
    expect(val2).toBe(2);
    expect(loader).toHaveBeenCalledTimes(2);
  });

  it('handles subscribers and notifies on updates', async () => {
    const loader = vi.fn(async (key: string) => `data-${key}`);
    const broker = createAsyncBroker(loader);

    const snapshots: any[] = [];
    const unsub = broker.subscribe('sub-key', (snap) => {
      snapshots.push({ ...snap });
    });

    await broker.read('sub-key');
    expect(snapshots.length).toBeGreaterThanOrEqual(1);
    expect(snapshots.at(-1)?.value).toBe('data-sub-key');

    unsub();
  });
});
