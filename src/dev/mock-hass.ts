import {
  HomeAssistant,
  HassEntities,
  HassEntity,
  AreaRegistryEntry,
  DeviceRegistryEntry,
  EntityRegistryEntry,
} from "../types/home-assistant";

type StateChangeCallback = (hass: HomeAssistant) => void;

/**
 * Creates a reactive mock HomeAssistant instance for local Vite development and testing.
 */
export class MockHomeAssistant {
  private _listeners: Set<StateChangeCallback> = new Set();

  private _areas: AreaRegistryEntry[] = [
    { area_id: "living_room", name: "Living Room", icon: "mdi:sofa-outline", picture: null, aliases: [] },
    { area_id: "kitchen", name: "Kitchen", icon: "mdi:silverware-fork-knife", picture: null, aliases: [] },
    { area_id: "bedroom", name: "Bedroom", icon: "mdi:bed-outline", picture: null, aliases: [] },
    { area_id: "garage", name: "Garage", icon: "mdi:garage-open-variant", picture: null, aliases: [] },
    { area_id: "office", name: "Office", icon: "mdi:desktop-classic", picture: null, aliases: [] },
  ];

  private _devices: DeviceRegistryEntry[] = [
    { id: "dev_living_ac", name: "Living Room Split AC", area_id: "living_room", manufacturer: "Mitsubishi", model: "MSZ-AP25", sw_version: "2.1" },
    { id: "dev_wled", name: "Accent LED Strip", area_id: "living_room", manufacturer: "WLED", model: "ESP32", sw_version: "0.14.0" },
    { id: "dev_apple_tv", name: "Living Room Apple TV", area_id: "living_room", manufacturer: "Apple", model: "Apple TV 4K", sw_version: "17.4" },
    { id: "dev_garage", name: "Garage Door Opener", area_id: "garage", manufacturer: "Meross", model: "MSG100", sw_version: "4.2.8" },
    { id: "dev_front_doorbell", name: "Front Doorbell Camera", area_id: "living_room", manufacturer: "Reolink", model: "Video Doorbell", sw_version: "3.0" },
  ];

  private _entityRegistry: EntityRegistryEntry[] = [
    { entity_id: "light.living_room", name: "Living Room Light", area_id: "living_room", device_id: undefined, platform: "hue" },
    { entity_id: "light.kitchen", name: "Kitchen Light", area_id: "kitchen", device_id: undefined, platform: "hue" },
    { entity_id: "light.bedroom", name: "Bedroom Light", area_id: "bedroom", device_id: undefined, platform: "hue" },
    { entity_id: "switch.coffee_maker", name: "Coffee Maker", area_id: "kitchen", device_id: undefined, platform: "tasmota" },
    { entity_id: "climate.living_room_ac", name: "Living Room AC", area_id: "living_room", device_id: "dev_living_ac", platform: "climate" },
    { entity_id: "climate.thermostat", name: "Thermostat", area_id: "living_room", device_id: undefined, platform: "nest" },
    { entity_id: "cover.garage_door", name: "Garage Door", area_id: "garage", device_id: "dev_garage", platform: "cover" },
    { entity_id: "media_player.apple_tv", name: "Apple TV", area_id: "living_room", device_id: "dev_apple_tv", platform: "apple_tv" },
    { entity_id: "camera.front_doorbell", name: "Front Doorbell", area_id: "living_room", device_id: "dev_front_doorbell", platform: "reolink" },
    { entity_id: "update.ha_core", name: "Home Assistant Core", area_id: undefined, device_id: undefined, platform: "homeassistant" },
    { entity_id: "light.wled_strip", name: "Accent Strip", area_id: "living_room", device_id: "dev_wled", platform: "wled" },
    { entity_id: "select.wled_preset", name: "Accent Strip Preset", area_id: "living_room", device_id: "dev_wled", platform: "wled" },
    { entity_id: "select.wled_color_palette", name: "Accent Strip Palette", area_id: "living_room", device_id: "dev_wled", platform: "wled" },
    { entity_id: "number.wled_speed", name: "Accent Strip Speed", area_id: "living_room", device_id: "dev_wled", platform: "wled" },
    { entity_id: "number.wled_intensity", name: "Accent Strip Intensity", area_id: "living_room", device_id: "dev_wled", platform: "wled" },
    { entity_id: "lock.front_door", name: "Front Door Lock", area_id: "living_room", device_id: undefined, platform: "zigbee2mqtt" },
  ];


  private _states: HassEntities = {
    "light.living_room": {
      entity_id: "light.living_room",
      state: "on",
      last_changed: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      attributes: {
        friendly_name: "Living Room Ceiling",
        icon: "mdi:ceiling-light",
        brightness: 204,
        supported_color_modes: ["brightness", "color_temp"],
      },
      context: { id: "ctx-1" },
    },
    "light.kitchen": {
      entity_id: "light.kitchen",
      state: "on",
      last_changed: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      attributes: {
        friendly_name: "Kitchen Downlights",
        icon: "mdi:lightbulb-group",
        brightness: 180,
      },
      context: { id: "ctx-1b" },
    },
    "light.bedroom": {
      entity_id: "light.bedroom",
      state: "off",
      last_changed: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      attributes: {
        friendly_name: "Bedroom Lamp",
        icon: "mdi:lamp",
      },
      context: { id: "ctx-2" },
    },
    "switch.coffee_maker": {
      entity_id: "switch.coffee_maker",
      state: "on",
      last_changed: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      attributes: {
        friendly_name: "Espresso Machine",
        icon: "mdi:coffee-maker",
      },
      context: { id: "ctx-3" },
    },
    "climate.living_room_ac": {
      entity_id: "climate.living_room_ac",
      state: "cool",
      last_changed: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
      attributes: {
        friendly_name: "Living Room AC",
        icon: "mdi:air-conditioner",
        current_temperature: 23.0,
        temperature: 21.0,
        target_temp_low: 20,
        target_temp_high: 25,
        min_temp: 16,
        max_temp: 31,
        step: 0.5,
        hvac_modes: ["off", "cool", "heat", "fan_only", "dry", "auto"],
        hvac_mode: "cool",
        hvac_action: "cooling",
        fan_modes: ["auto", "low", "medium", "high", "quiet"],
        fan_mode: "auto",
        swing_modes: ["auto", "1", "2", "3", "swing"],
        swing_mode: "auto",
        unit_of_measurement: "°C",
      },
      context: { id: "ctx-ac" },
    },
    "climate.thermostat": {
      entity_id: "climate.thermostat",
      state: "heat",
      last_changed: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      attributes: {
        friendly_name: "Main Thermostat",
        icon: "mdi:thermostat",
        current_temperature: 21.5,
        temperature: 22.0,
        unit_of_measurement: "°C",
        hvac_action: "heating",
        hvac_modes: ["off", "heat", "cool", "auto"],
      },
      context: { id: "ctx-4" },
    },
    "cover.garage_door": {
      entity_id: "cover.garage_door",
      state: "closed",
      last_changed: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
      attributes: {
        friendly_name: "Garage Main Door",
        icon: "mdi:garage",
        device_class: "garage",
        supported_features: 7,
      },
      context: { id: "ctx-garage" },
    },
    "media_player.apple_tv": {
      entity_id: "media_player.apple_tv",
      state: "playing",
      last_changed: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      attributes: {
        friendly_name: "Apple TV 4K",
        icon: "mdi:apple",
        app_name: "Apple TV+",
        media_title: "Foundation",
        media_series_title: "Foundation",
        media_season: 2,
        media_episode: 8,
        media_duration: 3420,
        media_position: 1240,
        volume_level: 0.55,
      },
      context: { id: "ctx-appletv" },
    },
    "media_player.living_room_tv": {
      entity_id: "media_player.living_room_tv",
      state: "playing",
      last_changed: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
      attributes: {
        friendly_name: "Living Room TV",
        icon: "mdi:television",
        media_title: "Cosmos: A Spacetime Odyssey",
        media_artist: "Documentary",
        volume_level: 0.45,
      },
      context: { id: "ctx-8" },
    },
    "camera.front_doorbell": {
      entity_id: "camera.front_doorbell",
      state: "idle",
      last_changed: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
      attributes: {
        friendly_name: "Front Doorbell",
        icon: "mdi:doorbell-video",
        access_token: "mock-token-12345",
        entity_picture: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='180' viewBox='0 0 320 180'><rect width='100%' height='100%' fill='%232c3e50'/><circle cx='160' cy='90' r='30' fill='%2303a9f4'/><text x='160' y='140' fill='white' font-family='sans-serif' font-size='14' text-anchor='middle'>Front Porch Live</text></svg>",
      },
      context: { id: "ctx-cam" },
    },
    "update.ha_core": {
      entity_id: "update.ha_core",
      state: "on",
      last_changed: new Date(Date.now() - 1000 * 60 * 400).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 400).toISOString(),
      attributes: {
        friendly_name: "Home Assistant Core Update",
        title: "Home Assistant Core",
        installed_version: "2026.8.0",
        latest_version: "2026.8.1",
        release_url: "https://www.home-assistant.io",
      },
      context: { id: "ctx-up" },
    },
    "sensor.living_room_temperature": {
      entity_id: "sensor.living_room_temperature",
      state: "22.8",
      last_changed: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
      attributes: {
        friendly_name: "Living Room Temp",
        icon: "mdi:thermometer",
        unit_of_measurement: "°C",
        device_class: "temperature",
        state_class: "measurement",
      },
      context: { id: "ctx-5" },
    },
    "sensor.temperature": {
      entity_id: "sensor.temperature",
      state: "22.4",
      last_changed: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
      attributes: {
        friendly_name: "Primary Temp",
        icon: "mdi:thermometer",
        unit_of_measurement: "°C",
        device_class: "temperature",
        state_class: "measurement",
      },
      context: { id: "ctx-5b" },
    },
    "sensor.power_consumption": {
      entity_id: "sensor.power_consumption",
      state: "480",
      last_changed: new Date(Date.now() - 1000 * 30).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 30).toISOString(),
      attributes: {
        friendly_name: "Total Power Draw",
        icon: "mdi:flash",
        unit_of_measurement: "W",
        device_class: "power",
        state_class: "measurement",
      },
      context: { id: "ctx-6" },
    },
    "sensor.ha_component_house_power": {
      entity_id: "sensor.ha_component_house_power",
      state: "1240",
      last_changed: new Date(Date.now() - 1000 * 10).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 10).toISOString(),
      attributes: {
        friendly_name: "House Power",
        unit_of_measurement: "W",
        device_class: "power",
      },
      context: { id: "ctx-hp" },
    },
    "sensor.ha_component_solar_power": {
      entity_id: "sensor.ha_component_solar_power",
      state: "2850",
      last_changed: new Date(Date.now() - 1000 * 10).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 10).toISOString(),
      attributes: {
        friendly_name: "Solar Power",
        unit_of_measurement: "W",
        device_class: "power",
      },
      context: { id: "ctx-sp" },
    },
    "sensor.ha_component_grid_power": {
      entity_id: "sensor.ha_component_grid_power",
      state: "-1610",
      last_changed: new Date(Date.now() - 1000 * 10).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 10).toISOString(),
      attributes: {
        friendly_name: "Grid Power",
        unit_of_measurement: "W",
        device_class: "power",
      },
      context: { id: "ctx-gp" },
    },
    "binary_sensor.front_door": {
      entity_id: "binary_sensor.front_door",
      state: "off",
      last_changed: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      attributes: {
        friendly_name: "Front Door Contact",
        icon: "mdi:door-closed",
        device_class: "door",
      },
      context: { id: "ctx-7" },
    },
    "binary_sensor.kitchen_smoke": {
      entity_id: "binary_sensor.kitchen_smoke",
      state: "off",
      last_changed: new Date(Date.now() - 1000 * 60 * 1200).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 1200).toISOString(),
      attributes: {
        friendly_name: "Kitchen Smoke Alarm",
        icon: "mdi:smoke-detector",
        device_class: "smoke",
      },
      context: { id: "ctx-smoke" },
    },
    "lock.front_door": {
      entity_id: "lock.front_door",
      state: "locked",
      last_changed: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
      attributes: {
        friendly_name: "Front Door Lock",
        icon: "mdi:lock",
      },
      context: { id: "ctx-lock" },
    },
    "light.wled_strip": {
      entity_id: "light.wled_strip",
      state: "on",
      last_changed: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      attributes: {
        friendly_name: "Accent LED Strip",
        icon: "mdi:led-strip-variant",
        brightness: 180,
        effect_list: ["Solid", "Blink", "Breathe", "Rainbow", "Fire 2012", "Aurora", "Twinkle"],
        effect: "Aurora",
      },
      context: { id: "ctx-wled-main" },
    },
    "select.wled_preset": {
      entity_id: "select.wled_preset",
      state: "Evening Warm",
      last_changed: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      attributes: {
        friendly_name: "Accent Strip Preset",
        options: ["Evening Warm", "Movie Night", "Party Flash", "Aurora Glow", "Relax"],
      },
      context: { id: "ctx-wled-preset" },
    },
    "select.wled_color_palette": {
      entity_id: "select.wled_color_palette",
      state: "Sunset",
      last_changed: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      attributes: {
        friendly_name: "Accent Strip Palette",
        options: ["Default", "Party", "Cloud", "Sunset", "Forest", "Ocean", "Retro Clown"],
      },
      context: { id: "ctx-wled-palette" },
    },
    "number.wled_speed": {
      entity_id: "number.wled_speed",
      state: "128",
      last_changed: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      attributes: {
        friendly_name: "Accent Strip Speed",
        min: 0,
        max: 255,
        step: 1,
      },
      context: { id: "ctx-wled-speed" },
    },
    "number.wled_intensity": {
      entity_id: "number.wled_intensity",
      state: "192",
      last_changed: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      attributes: {
        friendly_name: "Accent Strip Intensity",
        min: 0,
        max: 255,
        step: 1,
      },
      context: { id: "ctx-wled-intensity" },
    },

    "weather.forecast_home": {
      entity_id: "weather.forecast_home",
      state: "sunny",
      last_changed: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      attributes: {
        friendly_name: "Home Weather",
        temperature: 22.5,
        temperature_unit: "°C",
        cloud_coverage: 15,
        humidity: 55,
        wind_speed: 12,
      },
      context: { id: "ctx-weather" },
    },
  };

  public get hass(): HomeAssistant {
    const self = this;
    return {
      states: { ...this._states },
      services: {},
      config: {
        latitude: -33.8688,
        longitude: 151.2093,
        elevation: 10,
        unit_system: {
          length: "km",
          mass: "kg",
          temperature: "°C",
          volume: "L",
          pressure: "hPa",
          wind_speed: "km/h",
          accumulated_precipitation: "mm",
        },
        location_name: "Home",
        time_zone: "Australia/Sydney",
        components: ["light", "switch", "sensor", "climate", "media_player", "camera", "cover", "lock"],
        config_dir: "/config",
        version: "2026.8.0",
        state: "RUNNING",
      },
      themes: {
        default_theme: "default",
        themes: {},
        darkMode: false,
      },
      language: "en",
      locale: {
        language: "en",
        number_format: "comma_decimal",
        time_format: "24",
        date_format: "day_month_year",
        first_weekday: "monday",
      },
      user: {
        id: "usr-1",
        name: "Brayden",
        is_owner: true,
        is_admin: true,
      },
      connection: {
        subscribeEvents: async (_cb: any, _event: string) => () => {},
        sendMessagePromise: async (msg: any) => {
          if (msg.type === "config/area_registry/list") return self._areas;
          if (msg.type === "config/device_registry/list") return self._devices;
          if (msg.type === "config/entity_registry/list") return self._entityRegistry;
          if (msg.type === "lovelace/dashboards/list") return [];
          return [];
        },
      } as any,
      localize: (key: string) => key,
      callService: this.callService.bind(this),
      callApi: async () => ({}) as any,
      callWS: async <T = any>(msg: Record<string, unknown>): Promise<T> => {
        if (msg.type === "config_entries/flow/progress") {
          return [
            {
              handler: "wled",
              context: { source: "zeroconf", title_placeholders: { name: "Balcony LED Strip" } },
            },
            {
              handler: "esphome",
              context: { source: "discovery", title_placeholders: { name: "Garden Moisture Sensor" } },
            },
          ] as unknown as T;
        }
        if (msg.type === "config/area_registry/list") return self._areas as unknown as T;
        if (msg.type === "config/device_registry/list") return self._devices as unknown as T;
        if (msg.type === "config/entity_registry/list") return self._entityRegistry as unknown as T;
        return [] as unknown as T;
      },

      sendWS: () => {},
      formatEntityState: (entity: HassEntity) => {
        const u = entity.attributes.unit_of_measurement;
        return u
          ? `${entity.state} ${u}`
          : entity.state.charAt(0).toUpperCase() + entity.state.slice(1);
      },
    };
  }

  public subscribe(cb: StateChangeCallback): () => void {
    this._listeners.add(cb);
    cb(this.hass);
    return () => this._listeners.delete(cb);
  }

  private _notify(): void {
    const currentHass = this.hass;
    this._listeners.forEach((cb) => cb(currentHass));
  }

  public async callService(
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
    target?: { entity_id?: string | string[] },
  ): Promise<any> {
    console.log(`[MockHass] callService: ${domain}.${service}`, {
      serviceData,
      target,
    });

    let entityIds: string[] = [];
    if (target?.entity_id) {
      entityIds = Array.isArray(target.entity_id)
        ? target.entity_id
        : [target.entity_id];
    } else if (serviceData?.entity_id) {
      const dataEntity = serviceData.entity_id as string | string[];
      entityIds = Array.isArray(dataEntity) ? dataEntity : [dataEntity];
    }

    entityIds.forEach((entId) => {
      const current = this._states[entId];
      if (!current) return;

      let newState = current.state;
      if (service === "toggle") {
        newState = current.state === "on" || current.state === "playing" ? "off" : "on";
      } else if (service === "turn_on") {
        newState = "on";
        if (serviceData?.brightness !== undefined) {
          current.attributes.brightness = Number(serviceData.brightness);
        }
        if (serviceData?.effect !== undefined) {
          current.attributes.effect = String(serviceData.effect);
        }
      } else if (service === "turn_off") {
        newState = "off";
      } else if (domain === "lock" && service === "lock") {
        newState = current.state === "locked" ? "unlocked" : "locked";
      } else if (domain === "cover" && service === "toggle") {
        newState = current.state === "closed" ? "open" : "closed";
      } else if (domain === "climate" && service === "set_temperature") {
        const t = Number(serviceData?.temperature);
        if (Number.isFinite(t)) {
          current.attributes.temperature = t;
        }
      } else if (domain === "climate" && service === "set_hvac_mode") {
        if (serviceData?.hvac_mode) {
          newState = String(serviceData.hvac_mode);
        }
      } else if (domain === "climate" && service === "set_fan_mode") {
        if (serviceData?.fan_mode) {
          current.attributes.fan_mode = String(serviceData.fan_mode);
        }
      } else if (domain === "select" && service === "select_option") {
        if (serviceData?.option) {
          newState = String(serviceData.option);
        }
      } else if (domain === "number" && service === "set_value") {
        if (serviceData?.value !== undefined) {
          newState = String(serviceData.value);
        }
      } else if (domain === "media_player" && service === "media_play_pause") {
        newState = current.state === "playing" ? "paused" : "playing";
      } else if (domain === "media_player" && service === "volume_up") {
        const vol = Number(current.attributes.volume_level ?? 0.5);
        current.attributes.volume_level = Math.min(1, vol + 0.05);
      } else if (domain === "media_player" && service === "volume_down") {
        const vol = Number(current.attributes.volume_level ?? 0.5);
        current.attributes.volume_level = Math.max(0, vol - 0.05);
      }


      this._states[entId] = {
        ...current,
        state: newState,
        last_changed: new Date().toISOString(),
        last_updated: new Date().toISOString(),
      };
    });

    this._notify();
    return { success: true };
  }

  public updateState(entityId: string, newState: Partial<HassEntity>): void {
    if (this._states[entityId]) {
      this._states[entityId] = {
        ...this._states[entityId],
        ...newState,
        last_updated: new Date().toISOString(),
      };
      this._notify();
    }
  }
}

