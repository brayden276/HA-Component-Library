import { describe, it, expect, vi } from 'vitest';
import {
  interaction,
  createRequestCoalescer,
  waitForEntityState
} from "../../src/utils/interaction";

describe('interaction handler', () => {
  it('dispatches primary action on click', async () => {
    const el = document.createElement('button');
    document.body.appendChild(el);
    const primary = vi.fn();

    const handle = interaction(el, { primary });
    el.click();

    expect(primary).toHaveBeenCalledTimes(1);
    handle.destroy();
    el.remove();
  });

  it('applies and rolls back optimistic state on error', async () => {
    const el = document.createElement('button');
    el.setAttribute('aria-pressed', 'false');
    document.body.appendChild(el);

    const failingPrimary = vi.fn().mockRejectedValue(new Error('Network error'));
    const handle = interaction(el, {
      primary: failingPrimary,
      optimistic: 'toggle'
    });

    try {
      await handle.invoke();
    } catch {}

    // Should have rolled back to false after failure
    expect(el.getAttribute('aria-pressed')).toBe('false');
    handle.destroy();
    el.remove();
  });

  it('coalesces rapid requests with createRequestCoalescer', async () => {
    const executed: number[] = [];
    const requestFn = vi.fn(async (val: number) => {
      await new Promise((r) => setTimeout(r, 20));
      executed.push(val);
    });

    const coalescer = createRequestCoalescer(requestFn);
    coalescer.request(1);
    coalescer.request(2);
    coalescer.request(3);

    await new Promise((r) => setTimeout(r, 100));

    // First one runs, then coalesced latest value (3) runs
    expect(executed).toContain(1);
    expect(executed).toContain(3);
    coalescer.destroy();
  });

  it('waits for entity state with waitForEntityState', async () => {
    const mockHass = {
      states: {
        'light.test': { state: 'off' }
      }
    };

    const promise = waitForEntityState(
      mockHass,
      'light.test',
      (state) => state === 'on',
      { interval: 20, timeout: 500 }
    );

    setTimeout(() => {
      mockHass.states['light.test'] = { state: 'on' };
    }, 50);

    const result = await promise;
    expect(result?.state).toBe('on');
  });
});
