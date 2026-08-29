import type {
  HassConnection,
  HassEvent,
  HomeAssistant,
} from "../../types/home-assistant";
import { createAsyncBroker } from "../../utils/async-broker";

/**
 * Validated backend profile client shared by Energy and Security dashboards.
 */

const connectionIds = new WeakMap<object, number>();
let nextConnectionId = 1;

export const connectionId = (hass?: HomeAssistant | null): string | number => {
  const connection = hass?.connection;
  if (!connection) return "none";
  if (!connectionIds.has(connection))
    connectionIds.set(connection, nextConnectionId++);
  return connectionIds.get(connection)!;
};

const profileKey = (
  hass: HomeAssistant,
  kind: string,
  profileId: string,
): string => `${connectionId(hass)}|${kind}|${profileId}`;

interface ProfileContext {
  hass: HomeAssistant;
  kind: "energy" | "security";
  profileId: string;
}

type ProfileEventUnsubscribe = () => void;
type ProfileEventSubscription =
  ProfileEventUnsubscribe | Promise<ProfileEventUnsubscribe>;

const profileSubscriptions = new WeakMap<
  HassConnection,
  ProfileEventSubscription
>();
let activeProfileConnection: HassConnection | null = null;

const detachProfileEvents = (connection: HassConnection): void => {
  const subscription = profileSubscriptions.get(connection);
  profileSubscriptions.delete(connection);
  if (activeProfileConnection === connection) {
    activeProfileConnection = null;
  }
  if (!subscription) return;
  Promise.resolve(subscription)
    .then((unsubscribe) => unsubscribe())
    .catch(() => {});
};

const attachProfileEvents = (hass: HomeAssistant): void => {
  const connection = hass?.connection;
  if (!connection?.subscribeEvents) return;
  if (activeProfileConnection && activeProfileConnection !== connection) {
    detachProfileEvents(activeProfileConnection);
  }
  activeProfileConnection = connection;
  if (profileSubscriptions.has(connection)) return;

  const subscription = connection.subscribeEvents((event: HassEvent) => {
    const match = /^dashboard-profile\.(energy|security)\.([a-z0-9-]+)$/.exec(
      String(event?.data?.key || ""),
    );
    if (match) {
      profileBroker.invalidate(profileKey(hass, match[1], match[2]));
      globalThis.dispatchEvent(
        new CustomEvent("ha-component-profile-change", {
          detail: { kind: match[1], profileId: match[2] },
        }),
      );
    }
  }, "ha_component_backend_preferences_updated");
  profileSubscriptions.set(connection, subscription);
  Promise.resolve(subscription).catch(() =>
    profileSubscriptions.get(connection) === subscription
      ? profileSubscriptions.delete(connection)
      : undefined,
  );
};

export interface ProfileResponse<T = Record<string, any>> {
  found: boolean;
  profile: T | null;
  error?: unknown;
}

const profileBroker = createAsyncBroker<ProfileResponse, ProfileContext>(
  async (_key: string, context?: ProfileContext) => {
    if (!context?.hass?.callWS)
      throw new Error("Home Assistant WebSocket connection is unavailable");
    return context.hass.callWS<ProfileResponse>({
      type: "ha_component_backend/profile/get",
      kind: context.kind,
      profile_id: context.profileId,
    });
  },
  { ttl: 300000, maxStale: 86400000, retryBase: 3000, retryMax: 60000 },
);

export const dashboardProfiles = Object.freeze({
  async get<T = Record<string, any>>(
    hass: HomeAssistant,
    kind: "energy" | "security",
    profileId: string,
    options: { force?: boolean } = {},
  ): Promise<ProfileResponse<T>> {
    attachProfileEvents(hass);
    const key = profileKey(hass, kind, profileId);
    return profileBroker.read(
      key,
      { hass, kind, profileId },
      options,
    ) as Promise<ProfileResponse<T>>;
  },
  invalidate(hass: HomeAssistant, kind: string, profileId: string): void {
    profileBroker.invalidate(profileKey(hass, kind, profileId));
  },
  peek(hass: HomeAssistant, kind: string, profileId: string) {
    return profileBroker.peek(profileKey(hass, kind, profileId));
  },
  async save(
    hass: HomeAssistant,
    kind: "energy" | "security",
    profileId: string,
    profile: Record<string, unknown>,
    expectedRevision?: number,
  ): Promise<unknown> {
    const message: Record<string, unknown> = {
      type: "ha_component_backend/profile/update",
      kind,
      profile_id: profileId,
      profile,
    };
    if (Number.isFinite(Number(expectedRevision))) {
      message.expected_revision = Number(expectedRevision);
    }
    const result = await hass.callWS(message);
    profileBroker.invalidate(profileKey(hass, kind, profileId));
    return result;
  },
  subscribe(
    hass: HomeAssistant,
    kind: "energy" | "security",
    profileId: string,
    subscriber: (snapshot: any) => void,
  ): () => void {
    attachProfileEvents(hass);
    const key = profileKey(hass, kind, profileId);
    return profileBroker.subscribe(key, subscriber);
  },
});
