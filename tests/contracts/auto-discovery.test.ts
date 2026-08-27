import { describe, it, expect } from "vitest";
import "../../src/index";
import {
  nativeClimateControlConfig,
  garageControl,
  appleTvBundle,
  controlConfig,
  registerControlResolver,
  uiEntry,
  centralRegistry,
} from "../../src/services/registry/dashboard-registry";
import { createMockHass } from "../fixtures/mock-hass";

describe("Auto Discovery and Control Resolution Contracts", () => {
  it("nativeClimateControlConfig discovers and composes split-system controller with vanes, timers and profiles", () => {
    const climate: any = {
      entity_id: "climate.living_room_split_climate",
      device_id: "split-device",
      name: "Living room split",
    };
    const splitEntries: any[] = [
      climate,
      {
        entity_id: "select.living_room_split_vertical_vane",
        device_id: "split-device",
        name: "Vertical vane",
      },
      {
        entity_id: "select.living_room_split_horizontal_vane",
        device_id: "split-device",
        name: "Horizontal vane",
      },
      {
        entity_id: "timer.living_room_split",
        area_id: "living_room",
        name: "Living room split timer",
      },
      {
        entity_id: "script.living_room_split_profile",
        area_id: "living_room",
        name: "Living room split profile",
      },
      {
        entity_id: "scene.living_room_evening",
        area_id: "living_room",
        name: "Living room evening",
      },
    ];
    const splitRegistry: any = {
      entities: splitEntries,
      byDevice: new Map([["split-device", splitEntries.slice(0, 3)]]),
      deviceArea: new Map([["split-device", "living_room"]]),
    };
    const splitHass: any = {
      states: Object.fromEntries(
        splitEntries.map((entry) => [
          entry.entity_id,
          { state: "idle", attributes: { friendly_name: entry.name } },
        ]),
      ),
    };

    const config = nativeClimateControlConfig(
      climate,
      splitHass.states[climate.entity_id],
      splitRegistry,
      splitHass,
    );

    expect(config).toEqual({
      type: "custom:component-split-controller-v4",
      entity: "climate.living_room_split_climate",
      title: "Living room split",
      vertical_vane_entity: "select.living_room_split_vertical_vane",
      horizontal_vane_entity: "select.living_room_split_horizontal_vane",
      timer_entity: "timer.living_room_split",
      profile_entities: [
        {
          entity: "script.living_room_split_profile",
          name: "Living room split profile",
        },
      ],
    });
  });

  it("garageControl discovers single explicit operator and fails closed if ambiguous", () => {
    const garage: any = {
      entity_id: "binary_sensor.garage_status",
      device_id: "garage-device",
    };
    const registry: any = {
      byDevice: new Map([
        [
          "garage-device",
          [
            {
              entity_id: "button.garage_door_trigger",
              name: "Garage Door Trigger",
            },
            { entity_id: "button.garage_light", name: "Garage light" },
          ],
        ],
      ]),
    };
    const hass: any = {
      states: {
        "button.garage_door_trigger": { state: "unknown" },
        "button.garage_light": { state: "unknown" },
      },
    };

    expect(garageControl(garage, registry, hass)).toBe(
      "button.garage_door_trigger",
    );

    // Ambiguous buttons fail closed
    registry.byDevice
      .get("garage-device")
      .push({
        entity_id: "button.other_garage_door_operator",
        name: "Garage Door Operator",
      });
    hass.states["button.other_garage_door_operator"] = { state: "unknown" };
    expect(garageControl(garage, registry, hass)).toBeNull();
  });

  it("appleTvBundle discovers Apple TV platform media player", () => {
    const atv: any = {
      entity_id: "media_player.lounge_apple_tv",
      platform: "apple_tv",
      name: "Lounge Apple TV",
    };
    const hass: any = {
      states: {
        "media_player.lounge_apple_tv": {
          state: "playing",
          attributes: { friendly_name: "Lounge Apple TV" },
        },
      },
    };

    const config = appleTvBundle(atv, hass.states[atv.entity_id], null, hass);
    expect(config).toEqual({
      type: "custom:component-apple-tv-controller-v1",
      entity: "media_player.lounge_apple_tv",
      title: "Lounge Apple TV",
      icon: "mdi:apple",
    });
  });

  it("WLED discovery resolves main light to component-wled-controller-v1 and filters segments", () => {
    const mainLight: any = {
      entity_id: "light.wled_main",
      platform: "wled",
      device_id: "wled-device",
      original_name: "Main",
      unique_id: "wled-main",
    };
    const segmentLight: any = {
      entity_id: "light.wled_segment",
      platform: "wled",
      original_name: "Segment 1",
      unique_id: "wled_1",
    };

    expect(uiEntry(mainLight)).toBe(true);
    expect(uiEntry(segmentLight)).toBe(false);

    const config = controlConfig(mainLight, null, null, null);
    expect(config).toEqual({
      type: "custom:component-wled-controller-v1",
      entity: "light.wled_main",
      device_id: "wled-device",
    });
  });

  it("ComponentSmartCollectionV3 automatically uses Split System component and suppresses individual subordinate controls", async () => {
    const climateEntry = {
      entity_id: "climate.living_split",
      device_id: "split-dev",
      area_id: "living_room",
      name: "Living Room Split",
    };
    const vaneEntry = {
      entity_id: "select.living_split_vertical_vane",
      device_id: "split-dev",
      area_id: "living_room",
      name: "Living Split Vertical Vane",
    };
    const timerEntry = {
      entity_id: "timer.living_split",
      area_id: "living_room",
      name: "Living Split Timer",
    };
    const lightEntry = {
      entity_id: "light.living_ceiling",
      area_id: "living_room",
      name: "Living Ceiling Light",
    };

    const mockHass = createMockHass({
      states: {
        "climate.living_split": {
          state: "heat",
          attributes: { friendly_name: "Living Room Split", temperature: 22 },
        } as any,
        "select.living_split_vertical_vane": {
          state: "auto",
          attributes: { friendly_name: "Living Split Vertical Vane" },
        } as any,
        "timer.living_split": {
          state: "idle",
          attributes: { friendly_name: "Living Split Timer" },
        } as any,
        "light.living_ceiling": {
          state: "on",
          attributes: { friendly_name: "Living Ceiling Light" },
        } as any,
      },
      wsHandler: (msg) => {
        if (msg.type === "config/area_registry/list") {
          return [{ area_id: "living_room", name: "Living Room" }];
        }
        if (msg.type === "config/device_registry/list") {
          return [{ id: "split-dev", area_id: "living_room", name: "Split AC" }];
        }
        if (msg.type === "config/entity_registry/list") {
          return [climateEntry, vaneEntry, timerEntry, lightEntry];
        }
        return [];
      },
    });

    const el = document.createElement("component-smart-collection-v3") as any;
    el.setConfig({ mode: "area", area_id: "living_room", title: "Living Room Controls" });
    el.hass = mockHass;
    document.body.appendChild(el);

    // Allow registry and microtasks to reconcile
    await centralRegistry.load(mockHass, true);
    await new Promise((r) => setTimeout(r, 50));
    await el.updateComplete;

    // Verify rendered cards:
    // Should render component-split-controller-v4 for climate.living_split
    // Should NOT render separate select or timer controls for the subordinate vane/timer
    const splitCard = el.shadowRoot.querySelector("component-split-controller-v4");
    expect(splitCard).not.toBeNull();
    expect(splitCard._config.entity).toBe("climate.living_split");
    expect(splitCard._config.vertical_vane_entity).toBe("select.living_split_vertical_vane");
    expect(splitCard._config.timer_entity).toBe("timer.living_split");

    // Ceiling light is rendered as a control row
    const controlRows = el.shadowRoot.querySelectorAll("component-control-row-v2");
    expect(controlRows.length).toBe(1);

    el.remove();
  });

  it("filters out peripheral entities (battery, linkquality, diagnostic metrics) and climate compressor speed", async () => {
    const climateEntry = {
      entity_id: "climate.living_split",
      device_id: "split-dev",
      area_id: "living_room",
      name: "Living Room Split",
    };
    const compressorSpeedEntry = {
      entity_id: "number.living_split_compressor_speed",
      device_id: "split-dev",
      area_id: "living_room",
      name: "Compressor Speed",
    };
    const beepSwitchEntry = {
      entity_id: "switch.living_split_beep",
      device_id: "split-dev",
      area_id: "living_room",
      name: "Beeper Switch",
    };
    const tempSensorBattery = {
      entity_id: "sensor.temp_sensor_battery",
      device_id: "temp-sensor-dev",
      area_id: "living_room",
      name: "Living Room Temp Battery",
      device_class: "battery",
    };
    const tempSensorLinkQuality = {
      entity_id: "sensor.temp_sensor_linkquality",
      device_id: "temp-sensor-dev",
      area_id: "living_room",
      name: "Living Room Temp Linkquality",
    };
    const tempSensorLowBatteryBinary = {
      entity_id: "binary_sensor.temp_sensor_low_battery",
      device_id: "temp-sensor-dev",
      area_id: "living_room",
      name: "Living Room Temp Battery Low",
      device_class: "battery",
    };
    const lampLight = {
      entity_id: "light.living_lamp",
      device_id: "lamp-dev",
      area_id: "living_room",
      name: "Living Lamp",
    };

    const mockHass = createMockHass({
      states: {
        "climate.living_split": {
          state: "heat",
          attributes: { friendly_name: "Living Room Split", temperature: 22 },
        } as any,
        "number.living_split_compressor_speed": {
          state: "45",
          attributes: { friendly_name: "Compressor Speed" },
        } as any,
        "switch.living_split_beep": {
          state: "on",
          attributes: { friendly_name: "Beeper Switch" },
        } as any,
        "sensor.temp_sensor_battery": {
          state: "95",
          attributes: { friendly_name: "Living Room Temp Battery", device_class: "battery" },
        } as any,
        "sensor.temp_sensor_linkquality": {
          state: "120",
          attributes: { friendly_name: "Living Room Temp Linkquality" },
        } as any,
        "binary_sensor.temp_sensor_low_battery": {
          state: "off",
          attributes: { friendly_name: "Living Room Temp Battery Low", device_class: "battery" },
        } as any,
        "light.living_lamp": {
          state: "on",
          attributes: { friendly_name: "Living Lamp" },
        } as any,
      },
      wsHandler: (msg) => {
        if (msg.type === "config/area_registry/list") {
          return [{ area_id: "living_room", name: "Living Room" }];
        }
        if (msg.type === "config/device_registry/list") {
          return [
            { id: "split-dev", area_id: "living_room", name: "Split AC" },
            { id: "temp-sensor-dev", area_id: "living_room", name: "Aqara Sensor" },
            { id: "lamp-dev", area_id: "living_room", name: "Living Lamp" },
          ];
        }
        if (msg.type === "config/entity_registry/list") {
          return [
            climateEntry,
            compressorSpeedEntry,
            beepSwitchEntry,
            tempSensorBattery,
            tempSensorLinkQuality,
            tempSensorLowBatteryBinary,
            lampLight,
          ];
        }
        return [];
      },
    });

    const el = document.createElement("component-smart-collection-v3") as any;
    el.setConfig({ mode: "area", area_id: "living_room", title: "Living Room Controls" });
    el.hass = mockHass;
    document.body.appendChild(el);

    await centralRegistry.load(mockHass, true);
    await new Promise((r) => setTimeout(r, 50));
    await el.updateComplete;

    // Split controller is rendered
    const splitCard = el.shadowRoot.querySelector("component-split-controller-v4");
    expect(splitCard).not.toBeNull();

    // Only 1 standalone control row is rendered (light.living_lamp)
    // No controls rendered for compressor speed, beep switch, temp sensor battery, linkquality, or low battery binary sensor
    const controlRows = el.shadowRoot.querySelectorAll("component-control-row-v2");
    expect(controlRows.length).toBe(1);
    expect(controlRows[0]._config.entity).toBe("light.living_lamp");

    el.remove();
  });

  it("discoverControls pure function resolves cards, claims subordinate entities and applies mode filters", () => {
    const mockHass: any = {
      states: {
        "climate.bedroom_split": {
          state: "cool",
          attributes: { friendly_name: "Bedroom AC" },
        },
        "number.bedroom_split_compressor": {
          state: "50",
          attributes: { friendly_name: "Compressor" },
        },
        "select.bedroom_split_vertical_vane": {
          state: "swing",
          attributes: { friendly_name: "Bedroom Split Vertical Vane" },
        },
        "light.bedroom_ceiling": {
          state: "on",
          attributes: { friendly_name: "Bedroom Ceiling" },
        },
        "sensor.bedroom_temp_battery": {
          state: "88",
          attributes: { friendly_name: "Bedroom Temp Battery", device_class: "battery" },
        },
      },
    };

    const mockRegistry: any = {
      entities: [
        {
          entity_id: "climate.bedroom_split",
          device_id: "bedroom-ac-device",
          area_id: "bedroom",
          name: "Bedroom AC",
        },
        {
          entity_id: "number.bedroom_split_compressor",
          device_id: "bedroom-ac-device",
          area_id: "bedroom",
          name: "Compressor",
        },
        {
          entity_id: "select.bedroom_split_vertical_vane",
          device_id: "bedroom-ac-device",
          area_id: "bedroom",
          name: "Bedroom Split Vertical Vane",
        },
        {
          entity_id: "light.bedroom_ceiling",
          device_id: "bedroom-light-device",
          area_id: "bedroom",
          name: "Bedroom Ceiling",
        },
        {
          entity_id: "sensor.bedroom_temp_battery",
          device_id: "bedroom-sensor-device",
          area_id: "bedroom",
          name: "Bedroom Temp Battery",
          device_class: "battery",
        },
      ],
      devices: [
        { id: "bedroom-ac-device", area_id: "bedroom", name: "Bedroom AC" },
        { id: "bedroom-light-device", area_id: "bedroom", name: "Bedroom Light" },
        { id: "bedroom-sensor-device", area_id: "bedroom", name: "Aqara Sensor" },
      ],
      deviceArea: new Map([
        ["bedroom-ac-device", "bedroom"],
        ["bedroom-light-device", "bedroom"],
        ["bedroom-sensor-device", "bedroom"],
      ]),
      byDevice: new Map([
        [
          "bedroom-ac-device",
          [
            { entity_id: "climate.bedroom_split" },
            { entity_id: "number.bedroom_split_compressor" },
            { entity_id: "select.bedroom_split_vertical_vane" },
          ],
        ],
      ]),
    };

    const cards = (globalThis as any).__homeDashboardV2.discoverControls
      ? (globalThis as any).__homeDashboardV2.discoverControls(mockHass, mockRegistry, {
          mode: "area",
          area_id: "bedroom",
        })
      : [];

    // Should return 2 cards:
    // 1. component-split-controller-v4 (claims compressor + vertical vane)
    // 2. component-control-row-v2 (for bedroom ceiling light)
    // Battery sensor is ignored.
    expect(cards.length).toBe(2);
    expect(cards[0].cardConfig.type).toBe("custom:component-split-controller-v4");
    expect(cards[0].cardConfig.entity).toBe("climate.bedroom_split");
    expect(cards[0].cardConfig.vertical_vane_entity).toBe("select.bedroom_split_vertical_vane");
    expect(cards[1].cardConfig.type).toBe("custom:component-control-row-v2");
    expect(cards[1].cardConfig.entity).toBe("light.bedroom_ceiling");
  });
});
