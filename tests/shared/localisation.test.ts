import { describe, it, expect } from 'vitest';
import {
  formatPower,
  formatEnergy,
  numberFormat,
  formatCalendarDay,
  calendarDayRange
} from "../../src/utils/formatting";
import { createMockHass } from '../fixtures/mock-hass';

describe('localisation formatter', () => {
  const hass = createMockHass();

  it('formats power correctly in W and kW', () => {
    expect(formatPower(hass, 450)).toBe('450 W');
    expect(formatPower(hass, 2500)).toBe('2.5 kW');
    expect(formatPower(hass, -1200, { absolute: true })).toBe('1.2 kW');
    expect(formatPower(hass, 'invalid')).toBe('—');
  });

  it('formats energy in kWh', () => {
    expect(formatEnergy(hass, 14.56)).toBe('14.6 kWh');
    expect(formatEnergy(hass, 0.45)).toBe('0.45 kWh');
    expect(formatEnergy(hass, null)).toBe('—');
  });

  it('formats numbers with locale decimals', () => {
    expect(numberFormat(hass, 1234.56)).toBe('1,234.56');
    expect(numberFormat(hass, NaN)).toBe('—');
  });

  it('formats calendar day and ranges', () => {
    const formatted = formatCalendarDay(hass, '2026-08-24');
    expect(formatted).not.toBe('—');

    const range = calendarDayRange(hass, '2026-08-24');
    expect(range).not.toBeNull();
    expect(range!.end).toBeGreaterThan(range!.start);
  });
});
