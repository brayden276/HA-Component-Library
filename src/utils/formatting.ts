import type { HomeAssistant } from "../types/home-assistant";

/**
 * Home Assistant-aware locale, timezone, number, power, energy, and date/time formatting.
 */

export const localeOf = (hass?: HomeAssistant | null): string => {
  const locale =
    (hass?.locale?.language as string) ||
    (typeof navigator !== "undefined" ? navigator.language : "en-AU") ||
    "en-AU";
  return locale === "en" ? "en-AU" : locale;
};

export const timeZoneOf = (hass?: HomeAssistant | null): string | undefined =>
  hass?.config?.time_zone || undefined;

export const numberFormat = (
  hass: HomeAssistant | null | undefined,
  value: unknown,
  options: Intl.NumberFormatOptions = {},
): string => {
  const number = Number(value);
  return Number.isFinite(number)
    ? new Intl.NumberFormat(localeOf(hass), options).format(number)
    : "—";
};

export const formatPower = (
  hass: HomeAssistant | null | undefined,
  value: unknown,
  options: { absolute?: boolean } = {},
): string => {
  if (value == null || value === "") return "—";
  const number = Number(value);
  if (!Number.isFinite(number)) return "—";
  const absolute = options.absolute ? Math.abs(number) : number;
  if (Math.abs(absolute) >= 1000) {
    return `${numberFormat(hass, absolute / 1000, { maximumFractionDigits: 1 })} kW`;
  }
  return `${numberFormat(hass, Math.round(absolute), { maximumFractionDigits: 0 })} W`;
};

export const formatEnergy = (
  hass: HomeAssistant | null | undefined,
  value: unknown,
): string => {
  if (value == null || value === "") return "—";
  const number = Number(value);
  if (!Number.isFinite(number)) return "—";
  return `${numberFormat(hass, number, { maximumFractionDigits: Math.abs(number) < 1 ? 2 : 1 })} kWh`;
};

export const formatDate = (
  hass: HomeAssistant | null | undefined,
  value: Date | number | string,
  options?: Intl.DateTimeFormatOptions,
): string =>
  new Intl.DateTimeFormat(localeOf(hass), {
    timeZone: timeZoneOf(hass),
    ...options,
  }).format(new Date(value));

export const formatCalendarDay = (
  hass: HomeAssistant | null | undefined,
  value: unknown,
  options: Intl.DateTimeFormatOptions = {},
): string => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || ""));
  if (!match) return "—";
  return formatDate(
    hass,
    Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]), 12),
    {
      timeZone: "UTC",
      ...options,
    },
  );
};

export interface CalendarDayRange {
  start: number;
  end: number;
}

export const calendarDayRange = (
  hass: HomeAssistant | null | undefined,
  value: unknown,
): CalendarDayRange | null => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || ""));
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);
  const zone = timeZoneOf(hass);
  if (!zone) {
    const start = new Date(year, month, day).getTime();
    return { start, end: new Date(year, month, day + 1).getTime() };
  }
  const formatter = new Intl.DateTimeFormat("en-AU", {
    timeZone: zone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  const instantFor = (
    targetYear: number,
    targetMonth: number,
    targetDay: number,
  ): number => {
    const target = Date.UTC(targetYear, targetMonth, targetDay);
    let instant = target;
    for (let attempt = 0; attempt < 2; attempt += 1) {
      const parts = Object.fromEntries(
        formatter
          .formatToParts(new Date(instant))
          .map((part) => [part.type, part.value]),
      );
      const represented = Date.UTC(
        Number(parts.year),
        Number(parts.month) - 1,
        Number(parts.day),
        Number(parts.hour),
        Number(parts.minute),
        Number(parts.second),
      );
      instant += target - represented;
    }
    return instant;
  };
  return {
    start: instantFor(year, month, day),
    end: instantFor(year, month, day + 1),
  };
};

export const formatTime = (
  hass: HomeAssistant | null | undefined,
  value: Date | number | string,
  options: Intl.DateTimeFormatOptions = {},
): string =>
  formatDate(hass, value, {
    hour: "numeric",
    minute: "2-digit",
    ...options,
  });
