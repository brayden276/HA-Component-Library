import {
  HomeAssistant,
  HassEntities,
  HassEntity,
} from "../types/home-assistant";

type StateChangeCallback = (hass: HomeAssistant) => void;

/**
 * Creates a reactive mock HomeAssistant instance for local Vite development and testing.
 */
export class MockHomeAssistant {
  private _listeners: Set<StateChangeCallback> = new Set();

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
    "climate.thermostat": {
      entity_id: "climate.thermostat",
      state: "heat",
      last_changed: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      attributes: {
        friendly_name: "Main Climate",
        icon: "mdi:thermostat",
        current_temperature: 21.5,
        temperature: 22.0,
        unit_of_measurement: "°C",
        hvac_action: "heating",
        hvac_modes: ["off", "heat", "cool", "auto"],
      },
      context: { id: "ctx-4" },
    },
    "sensor.temperature": {
      entity_id: "sensor.temperature",
      state: "22.4",
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
  };

  public get hass(): HomeAssistant {
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
        components: ["light", "switch", "sensor", "climate", "media_player"],
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
      localize: (key: string) => key,
      callService: this.callService.bind(this),
      callApi: async () => ({}) as any,
      callWS: async () => ({}) as any,
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
        newState = current.state === "on" ? "off" : "on";
      } else if (service === "turn_on") {
        newState = "on";
      } else if (service === "turn_off") {
        newState = "off";
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
