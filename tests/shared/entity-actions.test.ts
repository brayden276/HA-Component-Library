import { describe, expect, it } from "vitest";
import type { HassEntity } from "../../src/types/home-assistant";
import {
  handleAction,
  runServiceAction,
} from "../../src/utils/entity";
import { createMockHass } from "../fixtures/mock-hass";

const entity = (entityId: string, state: string): HassEntity => ({
  entity_id: entityId,
  state,
  attributes: {},
  last_changed: "2026-08-28T00:00:00Z",
  last_updated: "2026-08-28T00:00:00Z",
  context: { id: "test" },
});

describe("Home Assistant action boundary", () => {
  it("runs canonical perform-action using data and the fourth target argument", async () => {
    const calls: Array<unknown[]> = [];
    const hass = createMockHass({
      states: { "light.office": entity("light.office", "off") },
    });
    hass.callService = async (...args) => {
      calls.push(args);
      return {};
    };

    await handleAction(document.createElement("button"), hass, {
      action: "perform-action",
      perform_action: "light.turn_on",
      data: { brightness_pct: 60, entity_id: "light.office" },
    });

    expect(calls).toEqual([
      [
        "light",
        "turn_on",
        { brightness_pct: 60 },
        { entity_id: "light.office" },
      ],
    ]);
  });

  it("preserves legacy call-service YAML while separating entity_id from service data", async () => {
    const calls: Array<unknown[]> = [];
    const hass = createMockHass({
      states: { "light.office": entity("light.office", "off") },
    });
    const original = hass.callService;
    hass.callService = async (...args) => {
      calls.push(args);
      return original(...args);
    };

    await handleAction(document.createElement("button"), hass, {
      action: "call-service",
      service: "light.turn_on",
      service_data: { brightness_pct: 50, entity_id: "light.office" },
    });

    expect(calls).toEqual([
      [
        "light",
        "turn_on",
        { brightness_pct: 50 },
        { entity_id: "light.office" },
      ],
    ]);
  });

  it("uses the lock state to choose lock or unlock", async () => {
    const calls: Array<unknown[]> = [];
    const hass = createMockHass({
      states: { "lock.front_door": entity("lock.front_door", "locked") },
    });
    hass.callService = async (...args) => {
      calls.push(args);
      return {};
    };

    await handleAction(document.createElement("button"), hass, undefined, "lock.front_door");
    hass.states["lock.front_door"] = entity("lock.front_door", "unlocked");
    await handleAction(document.createElement("button"), hass, undefined, "lock.front_door");

    expect(calls.map((call) => call.slice(0, 2))).toEqual([
      ["lock", "unlock"],
      ["lock", "lock"],
    ]);
  });

  it.each([
    ["missing", "light.missing", "MISSING_TARGET_ENTITY"],
    ["unavailable", "light.office", "UNAVAILABLE_TARGET_ENTITY"],
  ])("rejects %s entity targets with a typed error", async (_name, entityId, code) => {
    const hass = createMockHass({
      states: { "light.office": entity("light.office", "unavailable") },
    });

    await expect(
      runServiceAction(hass, {
        domain: "light",
        service: "turn_on",
        target: { entity_id: entityId },
      }),
    ).rejects.toMatchObject({
      name: "HomeAssistantActionError",
      code,
    });
  });
});
