import type { HomeAssistant } from "../../types/home-assistant";
import { connectionId } from "../profiles/backend-profiles";
import { createAsyncBroker } from "../../utils/async-broker";

/**
 * Replayable selected-day state and shared backend Energy day data broker.
 */

export interface EnergyDayDetail {
  channel: string;
  day: string;
  isToday: boolean;
}

export interface EnergyDaySeriesPoint {
  start: string;
  house: number;
  solar: number;
  grid: number;
}

export type EnergyDayDataResult = EnergyDayPayload;

interface DayChannel {
  value: string;
  usesDefault: boolean;
  subscribers: Set<(detail: EnergyDayDetail) => void>;
}

const dayChannels = new Map<string, DayChannel>();

const padDay = (value: number): string => String(value).padStart(2, "0");

export const dayKey = (date = new Date()): string =>
  `${date.getFullYear()}-${padDay(date.getMonth() + 1)}-${padDay(date.getDate())}`;

export const dayKeyInZone = (
  hass?: HomeAssistant | null,
  date = new Date(),
): string => {
  const timeZone = hass?.config?.time_zone;
  if (!timeZone) return dayKey(date);
  try {
    const parts = Object.fromEntries(
      new Intl.DateTimeFormat("en-AU", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
        .formatToParts(date)
        .map((part) => [part.type, part.value]),
    );
    return `${parts.year}-${parts.month}-${parts.day}`;
  } catch {
    return dayKey(date);
  }
};

export const validDay = (
  value?: string | null,
  today: string = dayKey(),
): string | null => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || ""));
  if (!match) return null;
  const date = new Date(
    Number(match[1]),
    Number(match[2]) - 1,
    Number(match[3]),
  );
  if (dayKey(date) !== value || value > today) return null;
  return value;
};

const getChannel = (name = "energy-day"): DayChannel => {
  const key = String(name || "energy-day");
  if (!dayChannels.has(key)) {
    let stored: string | null = null;
    try {
      stored = sessionStorage.getItem(`ha-component-library:${key}`);
    } catch {}
    const storedDay = validDay(stored);
    dayChannels.set(key, {
      value: storedDay || dayKey(),
      usesDefault: !storedDay,
      subscribers: new Set(),
    });
  }
  return dayChannels.get(key)!;
};

export const energyDayState = Object.freeze({
  get(name = "energy-day", hass?: HomeAssistant | null): string {
    const current = getChannel(name);
    if (current.usesDefault) current.value = dayKeyInZone(hass);
    return current.value;
  },
  set(
    name = "energy-day",
    value: string,
    options: { hass?: HomeAssistant | null; broadcast?: boolean } = {},
  ): string {
    const current = getChannel(name);
    const today = dayKeyInZone(options.hass);
    const next = validDay(value, today);
    if (!next || next === current.value) return current.value;
    current.value = next;
    current.usesDefault = false;
    try {
      sessionStorage.setItem(`ha-component-library:${name}`, next);
    } catch {}
    const detail: EnergyDayDetail = {
      channel: name,
      day: next,
      isToday: next === today,
    };
    for (const subscriber of [...current.subscribers]) subscriber(detail);
    if (options.broadcast !== false) {
      window.dispatchEvent(
        new CustomEvent("energy-day-selector-change", { detail }),
      );
    }
    return next;
  },
  subscribe(
    name = "energy-day",
    subscriber: (detail: EnergyDayDetail) => void,
    options: { hass?: HomeAssistant | null; replay?: boolean } = {},
  ): () => void {
    const current = getChannel(name);
    if (current.usesDefault) current.value = dayKeyInZone(options.hass);
    current.subscribers.add(subscriber);
    if (options.replay !== false) {
      subscriber({
        channel: name,
        day: current.value,
        isToday: current.value === dayKeyInZone(options.hass),
      });
    }
    return () => current.subscribers.delete(subscriber);
  },
  today: dayKeyInZone,
});

interface EnergyDayPayload {
  profile_id?: string;
  day?: string;
  totals?: {
    house?: number;
    solar?: number;
    grid_import?: number;
    grid_export?: number;
    self_consumption?: number;
  };
  series?: Array<{
    start: string;
    house: number;
    solar: number;
    grid: number;
  }>;
  coverage?: {
    solar_coverage_pct?: number;
    self_sufficiency_pct?: number;
  };
  [key: string]: any;
}

interface EnergyDataContext {
  hass: HomeAssistant;
  profileId: string;
  day: string;
}

const activeEnergyKeys = new Set<string>();
const dataKey = (hass: HomeAssistant, profileId: string, day: string): string =>
  `${connectionId(hass)}|${profileId}|${day}`;

const energyBroker = createAsyncBroker<EnergyDayPayload, EnergyDataContext>(
  async (_key: string, context?: EnergyDataContext) => {
    if (!context?.hass?.callWS)
      throw new Error("Home Assistant WebSocket connection is unavailable");
    return context.hass.callWS<EnergyDayPayload>({
      type: "ha_component_backend/energy/day",
      profile_id: context.profileId,
      day: context.day,
    });
  },
  { ttl: 120000, maxStale: 86400000, retryBase: 2500, retryMax: 60000 },
);

export const energyDayData = Object.freeze({
  async get(
    hass: HomeAssistant,
    profileId: string,
    day: string,
    options: { force?: boolean } = {},
  ): Promise<EnergyDayPayload> {
    const key = dataKey(hass, profileId, day);
    activeEnergyKeys.add(key);
    return energyBroker.read(key, { hass, profileId, day }, options);
  },
  invalidate(hass: HomeAssistant, profileId: string, day: string): void {
    energyBroker.invalidate(dataKey(hass, profileId, day));
  },
  invalidateProfile(hass: HomeAssistant, profileId: string): void {
    const prefix = `${connectionId(hass)}|${profileId}|`;
    for (const key of activeEnergyKeys) {
      if (key.startsWith(prefix)) {
        energyBroker.invalidate(key);
      }
    }
  },
  peek(hass: HomeAssistant, profileId: string, day: string) {
    return energyBroker.peek(dataKey(hass, profileId, day));
  },
  subscribe(
    hass: HomeAssistant,
    profileId: string,
    day: string,
    subscriber: (snapshot: any) => void,
  ): () => void {
    const key = dataKey(hass, profileId, day);
    activeEnergyKeys.add(key);
    return energyBroker.subscribe(key, subscriber);
  },
});
