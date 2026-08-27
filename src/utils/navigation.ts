/**
 * Navigation and More-Info action helpers for Home Assistant Lovelace cards.
 */

export const fireEvent = <T = unknown>(
  node: HTMLElement | Window,
  type: string,
  detail?: T,
  options?: {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
  },
): CustomEvent<T> => {
  const event = new CustomEvent<T>(type, {
    bubbles: options?.bubbles ?? true,
    cancelable: Boolean(options?.cancelable),
    composed: options?.composed ?? true,
    detail,
  });
  node.dispatchEvent(event);
  return event;
};

export const openMoreInfo = (
  host: HTMLElement,
  entityId: string | null | undefined,
): void => {
  if (!entityId) return;
  fireEvent(host, "hass-more-info", { entityId });
};

export const navigateTo = (path: string | null | undefined): void => {
  if (!path) return;
  window.history.pushState(null, "", path);
  fireEvent(window, "location-changed", { replace: false });
};
