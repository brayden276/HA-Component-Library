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
 * Creates high-fidelity mock SVG data URI for camera video stream previews.
 */
const createCameraSvg = (title: string, resolution = "1080P", color = "#03a9f4"): string => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#182230"/>
      <stop offset="100%" stop-color="#0c1219"/>
    </linearGradient>
    <linearGradient id="grid" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(255,255,255,0.04)"/>
      <stop offset="100%" stop-color="transparent"/>
    </linearGradient>
  </defs>
  <rect width="640" height="360" fill="url(#bg)"/>
  <rect width="640" height="360" fill="url(#grid)"/>
  <path d="M0 240 L320 180 L640 240 L640 360 L0 360 Z" fill="#202e40" opacity="0.6"/>
  <path d="M220 198 L420 198 L420 360 L220 360 Z" fill="#121b25" opacity="0.8"/>
  <circle cx="320" cy="270" r="5" fill="#f59e0b"/>
  <line x1="20" y1="180" x2="60" y2="180" stroke="${color}" stroke-width="1.5" opacity="0.6"/>
  <line x1="40" y1="160" x2="40" y2="200" stroke="${color}" stroke-width="1.5" opacity="0.6"/>
  <line x1="580" y1="180" x2="620" y2="180" stroke="${color}" stroke-width="1.5" opacity="0.6"/>
  <line x1="600" y1="160" x2="600" y2="200" stroke="${color}" stroke-width="1.5" opacity="0.6"/>
  <rect x="16" y="16" width="70" height="22" rx="4" fill="rgba(0,0,0,0.6)"/>
  <circle cx="27" cy="27" r="4" fill="#00e676"/>
  <text x="37" y="31" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="11" font-weight="700" letter-spacing="0.5">LIVE</text>
  <text x="96" y="32" fill="#f1f5f9" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="13" font-weight="600">${title} (${resolution})</text>
  <text x="624" y="32" fill="#94a3b8" font-family="ui-monospace, monospace" font-size="11" text-anchor="end">2026-08-29 18:52:00 UTC</text>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

/**
 * Creates a reactive, complete mock HomeAssistant instance for local Vite development and testing.
 */
export class MockHomeAssistant {
  private _listeners: Set<StateChangeCallback> = new Set();
  private _solarSimActive = true;

  private _areas: AreaRegistryEntry[] = [
    { area_id: "living_room", name: "Living Room", icon: "mdi:sofa-outline", picture: null, aliases: [] },
    { area_id: "kitchen", name: "Kitchen", icon: "mdi:silverware-fork-knife", picture: null, aliases: [] },
    { area_id: "bedroom", name: "Bedroom", icon: "mdi:bed-outline", picture: null, aliases: [] },
    { area_id: "garage", name: "Garage", icon: "mdi:garage-open-variant", picture: null, aliases: [] },
    { area_id: "office", name: "Office", icon: "mdi:desktop-classic", picture: null, aliases: [] },
    { area_id: "outdoor", name: "Outdoor & Porch", icon: "mdi:tree-outline", picture: null, aliases: [] },
  ];

  private _devices: DeviceRegistryEntry[] = [
    { id: "dev_living_ac", name: "Living Room Split AC", area_id: "living_room", manufacturer: "Mitsubishi", model: "MSZ-AP25", sw_version: "2.1" },
    { id: "dev_wled", name: "Accent LED Strip", area_id: "living_room", manufacturer: "WLED", model: "ESP32", sw_version: "0.14.0" },
    { id: "dev_apple_tv", name: "Living Room Apple TV", area_id: "living_room", manufacturer: "Apple", model: "Apple TV 4K", sw_version: "17.4" },
    { id: "dev_garage", name: "Garage Door Opener", area_id: "garage", manufacturer: "Meross", model: "MSG100", sw_version: "4.2.8" },
    { id: "dev_front_doorbell", name: "Front Doorbell Camera", area_id: "outdoor", manufacturer: "Reolink", model: "Video Doorbell", sw_version: "3.0" },
    { id: "dev_front_porch", name: "Front Porch Security Camera", area_id: "outdoor", manufacturer: "UniFi", model: "G4 Bullet", sw_version: "4.64" },
    { id: "dev_driveway", name: "Driveway Camera", area_id: "outdoor", manufacturer: "UniFi", model: "G4 Pro", sw_version: "4.64" },
    { id: "dev_thermostat", name: "Main Thermostat", area_id: "living_room", manufacturer: "Nest", model: "Learning 3rd Gen", sw_version: "1.2" },
  ];

  private _entityRegistry: EntityRegistryEntry[] = [
    { entity_id: "light.living_room", name: "Living Room Light", area_id: "living_room", device_id: undefined, platform: "hue" },
    { entity_id: "light.kitchen", name: "Kitchen Light", area_id: "kitchen", device_id: undefined, platform: "hue" },
    { entity_id: "light.bedroom", name: "Bedroom Light", area_id: "bedroom", device_id: undefined, platform: "hue" },
    { entity_id: "switch.coffee_maker", name: "Coffee Maker", area_id: "kitchen", device_id: undefined, platform: "tasmota" },
    { entity_id: "switch.living_room_fan", name: "Living Room Fan", area_id: "living_room", device_id: undefined, platform: "tuya" },
    { entity_id: "climate.living_room_ac", name: "Living Room AC", area_id: "living_room", device_id: "dev_living_ac", platform: "climate" },
    { entity_id: "climate.thermostat", name: "Thermostat", area_id: "living_room", device_id: "dev_thermostat", platform: "nest" },
    { entity_id: "cover.garage_door", name: "Garage Door", area_id: "garage", device_id: "dev_garage", platform: "cover" },
    { entity_id: "button.garage_door_operator", name: "Garage Door Operator", area_id: "garage", device_id: "dev_garage", platform: "button" },
    { entity_id: "media_player.apple_tv", name: "Apple TV", area_id: "living_room", device_id: "dev_apple_tv", platform: "apple_tv" },
    { entity_id: "remote.living_room_apple_tv", name: "Living Room Apple TV Remote", area_id: "living_room", device_id: "dev_apple_tv", platform: "apple_tv" },
    { entity_id: "remote.apple_tv", name: "Apple TV Remote", area_id: "living_room", device_id: "dev_apple_tv", platform: "apple_tv" },
    { entity_id: "camera.front_doorbell", name: "Front Doorbell", area_id: "outdoor", device_id: "dev_front_doorbell", platform: "reolink" },
    { entity_id: "camera.front_porch", name: "Front Porch Feed", area_id: "outdoor", device_id: "dev_front_porch", platform: "unifi" },
    { entity_id: "camera.driveway", name: "Driveway Camera", area_id: "outdoor", device_id: "dev_driveway", platform: "unifi" },
    { entity_id: "update.ha_core", name: "Home Assistant Core", area_id: undefined, device_id: undefined, platform: "homeassistant" },
    { entity_id: "update.home_assistant_core", name: "Home Assistant Core", area_id: undefined, device_id: undefined, platform: "homeassistant" },
    { entity_id: "light.wled_strip", name: "Accent Strip", area_id: "living_room", device_id: "dev_wled", platform: "wled" },
    { entity_id: "select.wled_preset", name: "Accent Strip Preset", area_id: "living_room", device_id: "dev_wled", platform: "wled" },
    { entity_id: "select.wled_color_palette", name: "Accent Strip Palette", area_id: "living_room", device_id: "dev_wled", platform: "wled" },
    { entity_id: "number.wled_speed", name: "Accent Strip Speed", area_id: "living_room", device_id: "dev_wled", platform: "wled" },
    { entity_id: "number.wled_intensity", name: "Accent Strip Intensity", area_id: "living_room", device_id: "dev_wled", platform: "wled" },
    { entity_id: "lock.front_door", name: "Front Door Lock", area_id: "outdoor", device_id: undefined, platform: "zigbee2mqtt" },
    { entity_id: "lock.front_door_lock", name: "Front Door Lock", area_id: "outdoor", device_id: undefined, platform: "zigbee2mqtt" },
    { entity_id: "binary_sensor.front_door", name: "Front Door Contact", area_id: "outdoor", device_id: undefined, platform: "zigbee2mqtt" },
    { entity_id: "binary_sensor.back_door", name: "Back Door Contact", area_id: "living_room", device_id: undefined, platform: "zigbee2mqtt" },
    { entity_id: "binary_sensor.garage_entry_door", name: "Garage Entry Door", area_id: "garage", device_id: undefined, platform: "zigbee2mqtt" },
    { entity_id: "binary_sensor.kitchen_smoke", name: "Kitchen Smoke Alarm", area_id: "kitchen", device_id: undefined, platform: "zigbee2mqtt" },
    { entity_id: "binary_sensor.living_room_motion", name: "Living Room Motion", area_id: "living_room", device_id: undefined, platform: "zigbee2mqtt" },
    { entity_id: "alarm_control_panel.home", name: "Home Security Alarm", area_id: "living_room", device_id: undefined, platform: "manual" },
    { entity_id: "alarm_control_panel.home_alarm", name: "Home Security Alarm", area_id: "living_room", device_id: undefined, platform: "manual" },
    { entity_id: "sensor.living_room_temperature", name: "Living Room Temperature", area_id: "living_room", device_id: undefined, platform: "sensor" },
    { entity_id: "sensor.temperature", name: "Primary Temperature", area_id: "living_room", device_id: undefined, platform: "sensor" },
    { entity_id: "sensor.indoor_temp", name: "Indoor Temperature", area_id: "living_room", device_id: undefined, platform: "sensor" },
    { entity_id: "sensor.outdoor_temp", name: "Outdoor Temperature", area_id: "outdoor", device_id: undefined, platform: "sensor" },
    { entity_id: "sensor.living_room_humidity", name: "Living Room Humidity", area_id: "living_room", device_id: undefined, platform: "sensor" },
    { entity_id: "sensor.power_consumption", name: "Total Power Draw", area_id: undefined, device_id: undefined, platform: "sensor" },
    { entity_id: "sensor.ha_component_house_power", name: "House Power Consumption", area_id: undefined, device_id: undefined, platform: "sensor" },
    { entity_id: "sensor.house_consumption_power", name: "House Power Consumption", area_id: undefined, device_id: undefined, platform: "sensor" },
    { entity_id: "sensor.ha_component_solar_power", name: "Solar Generation Power", area_id: undefined, device_id: undefined, platform: "sensor" },
    { entity_id: "sensor.solar_generation", name: "Solar Generation Power", area_id: undefined, device_id: undefined, platform: "sensor" },
    { entity_id: "sensor.total_solar_power", name: "Total Solar Power", area_id: undefined, device_id: undefined, platform: "sensor" },
    { entity_id: "sensor.ha_component_grid_power", name: "Grid Power Flow", area_id: undefined, device_id: undefined, platform: "sensor" },
    { entity_id: "sensor.refoss_smart_energy_monitor_em_channel_3_power", name: "Refoss Grid Channel 3 Power", area_id: undefined, device_id: undefined, platform: "sensor" },
    { entity_id: "weather.forecast_home", name: "Home Weather", area_id: undefined, device_id: undefined, platform: "weather" },
    { entity_id: "sun.sun", name: "Sun", area_id: undefined, device_id: undefined, platform: "sun" },
    { entity_id: "scene.goodnight", name: "Goodnight All", area_id: undefined, device_id: undefined, platform: "scene" },
    { entity_id: "scene.movie_night", name: "Movie Night Cinema", area_id: undefined, device_id: undefined, platform: "scene" },
    { entity_id: "automation.evening_lighting", name: "Evening Lighting Automation", area_id: undefined, device_id: undefined, platform: "automation" },
    { entity_id: "script.welcome_home", name: "Welcome Home Sequence", area_id: undefined, device_id: undefined, platform: "script" },
    { entity_id: "input_button.restart_network", name: "Restart Network", area_id: undefined, device_id: undefined, platform: "input_button" },
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
        brightness: 0,
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
    "switch.living_room_fan": {
      entity_id: "switch.living_room_fan",
      state: "on",
      last_changed: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
      attributes: {
        friendly_name: "Ceiling Fan",
        icon: "mdi:fan",
      },
      context: { id: "ctx-fan" },
    },
    "climate.living_room_ac": {
      entity_id: "climate.living_room_ac",
      state: "cool",
      last_changed: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
      attributes: {
        friendly_name: "Living Room AC",
        icon: "mdi:air-conditioner",
        current_temperature: 22.8,
        temperature: 21.0,
        target_temp_low: 20,
        target_temp_high: 25,
        min_temp: 16,
        max_temp: 31,
        target_temp_step: 0.5,
        step: 0.5,
        hvac_modes: ["off", "cool", "heat", "fan_only", "dry", "auto"],
        hvac_mode: "cool",
        hvac_action: "cooling",
        fan_modes: ["auto", "quiet", "speed_1", "speed_2", "speed_3", "speed_4"],
        fan_mode: "auto",
        swing_modes: ["auto", "1_up", "2_up_middle", "3_middle", "4_down_middle", "5_down", "swing"],
        swing_mode: "auto",
        swing_horizontal_modes: ["auto", "1_left", "2_left_center", "3_center", "4_right_center", "5_right", "left_right", "swing"],
        swing_horizontal_mode: "auto",
        preset_modes: ["eco", "boost", "comfort"],
        preset_mode: "eco",
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
    "button.garage_door_operator": {
      entity_id: "button.garage_door_operator",
      state: "2026-08-29T18:00:00Z",
      last_changed: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
      attributes: {
        friendly_name: "Garage Door Trigger Button",
        icon: "mdi:gesture-tap-button",
      },
      context: { id: "ctx-gbutton" },
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
        media_artist: "Isaac Asimov",
        media_season: 2,
        media_episode: 8,
        media_duration: 3420,
        media_position: 1240,
        volume_level: 0.55,
        source_list: ["Apple TV+", "Netflix", "YouTube", "Plex", "Prime Video"],
        source: "Apple TV+",
      },
      context: { id: "ctx-appletv" },
    },
    "remote.living_room_apple_tv": {
      entity_id: "remote.living_room_apple_tv",
      state: "on",
      last_changed: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      attributes: {
        friendly_name: "Living Room Apple TV Remote",
        icon: "mdi:remote",
      },
      context: { id: "ctx-appletv-rem" },
    },
    "remote.apple_tv": {
      entity_id: "remote.apple_tv",
      state: "on",
      last_changed: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      attributes: {
        friendly_name: "Apple TV Remote",
        icon: "mdi:remote",
      },
      context: { id: "ctx-appletv-rem2" },
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
        entity_picture: createCameraSvg("FRONT DOORBELL", "1080P", "#03a9f4"),
      },
      context: { id: "ctx-cam" },
    },
    "camera.front_porch": {
      entity_id: "camera.front_porch",
      state: "idle",
      last_changed: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
      attributes: {
        friendly_name: "Front Porch Feed",
        icon: "mdi:cctv",
        access_token: "mock-token-porch",
        entity_picture: createCameraSvg("FRONT PORCH", "2K HDR", "#4caf50"),
      },
      context: { id: "ctx-cam-porch" },
    },
    "camera.driveway": {
      entity_id: "camera.driveway",
      state: "idle",
      last_changed: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
      attributes: {
        friendly_name: "Driveway Camera",
        icon: "mdi:cctv",
        access_token: "mock-token-driveway",
        entity_picture: createCameraSvg("DRIVEWAY ENTRY", "4K", "#ff9800"),
      },
      context: { id: "ctx-cam-driveway" },
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
    "update.home_assistant_core": {
      entity_id: "update.home_assistant_core",
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
      context: { id: "ctx-up2" },
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
    "sensor.indoor_temp": {
      entity_id: "sensor.indoor_temp",
      state: "22.8",
      last_changed: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
      attributes: {
        friendly_name: "Indoor Temperature",
        icon: "mdi:thermometer",
        unit_of_measurement: "°C",
        device_class: "temperature",
        state_class: "measurement",
      },
      context: { id: "ctx-5c" },
    },
    "sensor.outdoor_temp": {
      entity_id: "sensor.outdoor_temp",
      state: "19.4",
      last_changed: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
      attributes: {
        friendly_name: "Outdoor Temperature",
        icon: "mdi:thermometer",
        unit_of_measurement: "°C",
        device_class: "temperature",
        state_class: "measurement",
      },
      context: { id: "ctx-5d" },
    },
    "sensor.living_room_humidity": {
      entity_id: "sensor.living_room_humidity",
      state: "55",
      last_changed: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      attributes: {
        friendly_name: "Living Room Humidity",
        icon: "mdi:water-percent",
        unit_of_measurement: "%",
        device_class: "humidity",
        state_class: "measurement",
      },
      context: { id: "ctx-hum" },
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
    "sensor.house_consumption_power": {
      entity_id: "sensor.house_consumption_power",
      state: "1240",
      last_changed: new Date(Date.now() - 1000 * 10).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 10).toISOString(),
      attributes: {
        friendly_name: "House Consumption",
        unit_of_measurement: "W",
        device_class: "power",
      },
      context: { id: "ctx-hp2" },
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
    "sensor.solar_generation": {
      entity_id: "sensor.solar_generation",
      state: "2850",
      last_changed: new Date(Date.now() - 1000 * 10).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 10).toISOString(),
      attributes: {
        friendly_name: "Solar Generation",
        unit_of_measurement: "W",
        device_class: "power",
      },
      context: { id: "ctx-sp2" },
    },
    "sensor.total_solar_power": {
      entity_id: "sensor.total_solar_power",
      state: "2850",
      last_changed: new Date(Date.now() - 1000 * 10).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 10).toISOString(),
      attributes: {
        friendly_name: "Total Solar Power",
        unit_of_measurement: "W",
        device_class: "power",
      },
      context: { id: "ctx-sp3" },
    },
    "sensor.ha_component_grid_power": {
      entity_id: "sensor.ha_component_grid_power",
      state: "-1610",
      last_changed: new Date(Date.now() - 1000 * 10).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 10).toISOString(),
      attributes: {
        friendly_name: "Grid Power Flow",
        unit_of_measurement: "W",
        device_class: "power",
      },
      context: { id: "ctx-gp" },
    },
    "sensor.refoss_smart_energy_monitor_em_channel_3_power": {
      entity_id: "sensor.refoss_smart_energy_monitor_em_channel_3_power",
      state: "-1610",
      last_changed: new Date(Date.now() - 1000 * 10).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 10).toISOString(),
      attributes: {
        friendly_name: "Grid Net Power",
        unit_of_measurement: "W",
        device_class: "power",
      },
      context: { id: "ctx-gp2" },
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
    "binary_sensor.back_door": {
      entity_id: "binary_sensor.back_door",
      state: "off",
      last_changed: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
      attributes: {
        friendly_name: "Back Door Contact",
        icon: "mdi:door-closed",
        device_class: "door",
      },
      context: { id: "ctx-7b" },
    },
    "binary_sensor.garage_entry_door": {
      entity_id: "binary_sensor.garage_entry_door",
      state: "off",
      last_changed: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
      attributes: {
        friendly_name: "Garage Entry Door",
        icon: "mdi:door-closed",
        device_class: "door",
      },
      context: { id: "ctx-7c" },
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
    "binary_sensor.living_room_motion": {
      entity_id: "binary_sensor.living_room_motion",
      state: "off",
      last_changed: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      attributes: {
        friendly_name: "Living Room Motion",
        icon: "mdi:motion-sensor",
        device_class: "motion",
      },
      context: { id: "ctx-motion" },
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
    "lock.front_door_lock": {
      entity_id: "lock.front_door_lock",
      state: "locked",
      last_changed: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
      attributes: {
        friendly_name: "Front Door Lock",
        icon: "mdi:lock",
      },
      context: { id: "ctx-lock2" },
    },
    "alarm_control_panel.home": {
      entity_id: "alarm_control_panel.home",
      state: "armed_home",
      last_changed: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
      attributes: {
        friendly_name: "Home Security Alarm",
        icon: "mdi:shield-home",
        code_format: "number",
        changed_by: "Brayden",
      },
      context: { id: "ctx-alarm" },
    },
    "alarm_control_panel.home_alarm": {
      entity_id: "alarm_control_panel.home_alarm",
      state: "armed_home",
      last_changed: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
      attributes: {
        friendly_name: "Home Security Alarm",
        icon: "mdi:shield-home",
        code_format: "number",
      },
      context: { id: "ctx-alarm2" },
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
        forecast: [
          { datetime: "2026-08-29T12:00:00Z", condition: "sunny", temperature: 24, templow: 14 },
          { datetime: "2026-08-30T12:00:00Z", condition: "partlycloudy", temperature: 22, templow: 13 },
          { datetime: "2026-08-31T12:00:00Z", condition: "rainy", temperature: 19, templow: 12 },
        ],
      },
      context: { id: "ctx-weather" },
    },
    "sun.sun": {
      entity_id: "sun.sun",
      state: "above_horizon",
      last_changed: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
      attributes: {
        friendly_name: "Sun",
        elevation: 36.2,
        azimuth: 310.5,
        rising: false,
        next_setting: new Date(Date.now() + 1000 * 60 * 90).toISOString(),
      },
      context: { id: "ctx-sun" },
    },
    "scene.goodnight": {
      entity_id: "scene.goodnight",
      state: "2026-08-29T22:00:00Z",
      last_changed: new Date(Date.now() - 1000 * 60 * 500).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 500).toISOString(),
      attributes: {
        friendly_name: "Goodnight All Routine",
        icon: "mdi:bed-clock",
      },
      context: { id: "ctx-scn1" },
    },
    "scene.movie_night": {
      entity_id: "scene.movie_night",
      state: "2026-08-29T20:00:00Z",
      last_changed: new Date(Date.now() - 1000 * 60 * 500).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 500).toISOString(),
      attributes: {
        friendly_name: "Movie Night Cinema",
        icon: "mdi:movie-open",
      },
      context: { id: "ctx-scn2" },
    },
    "automation.evening_lighting": {
      entity_id: "automation.evening_lighting",
      state: "on",
      last_changed: new Date(Date.now() - 1000 * 60 * 600).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 600).toISOString(),
      attributes: {
        friendly_name: "Evening Lighting Automation",
        icon: "mdi:robot",
      },
      context: { id: "ctx-auto" },
    },
    "script.welcome_home": {
      entity_id: "script.welcome_home",
      state: "off",
      last_changed: new Date(Date.now() - 1000 * 60 * 600).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 600).toISOString(),
      attributes: {
        friendly_name: "Welcome Home Sequence",
        icon: "mdi:script-text",
      },
      context: { id: "ctx-scrip" },
    },
    "input_button.restart_network": {
      entity_id: "input_button.restart_network",
      state: "unknown",
      last_changed: new Date(Date.now() - 1000 * 60 * 600).toISOString(),
      last_updated: new Date(Date.now() - 1000 * 60 * 600).toISOString(),
      attributes: {
        friendly_name: "Restart Network",
        icon: "mdi:restart",
      },
      context: { id: "ctx-inbtn" },
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
        location_name: "Residence",
        time_zone: "Australia/Sydney",
        components: [
          "light",
          "switch",
          "sensor",
          "binary_sensor",
          "climate",
          "media_player",
          "camera",
          "cover",
          "lock",
          "alarm_control_panel",
          "scene",
          "automation",
          "script",
          "update",
        ],
        config_dir: "/config",
        version: "2026.8.0",
        state: "RUNNING",
      },
      themes: {
        default_theme: "default",
        themes: {},
        darkMode: true,
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
          return self._handleWsMessage(msg);
        },
      } as any,
      localize: (key: string) => key,
      callService: this.callService.bind(this),
      callApi: async () => ({}) as any,
      callWS: async <T = any>(msg: Record<string, unknown>): Promise<T> => {
        return self._handleWsMessage(msg) as unknown as T;
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

  private _handleWsMessage(msg: Record<string, any>): any {
    if (msg.type === "config/area_registry/list") return this._areas;
    if (msg.type === "config/device_registry/list") return this._devices;
    if (msg.type === "config/entity_registry/list") return this._entityRegistry;
    if (msg.type === "lovelace/dashboards/list") return [];
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
      ];
    }
    if (msg.type === "ha_component_backend/energy/day") {
      const day = String(msg.day || "2026-08-29");
      const series = [];
      for (let h = 0; h < 24; h++) {
        const hourStr = `${String(h).padStart(2, "0")}:00`;
        const isDay = h >= 6 && h <= 18;
        const solarFactor = isDay ? Math.sin(((h - 6) / 12) * Math.PI) : 0;
        const solar = Math.round(solarFactor * 3850);
        const house = Math.round(550 + Math.sin(h / 2.5) * 250 + (h === 8 || h === 19 ? 850 : 0));
        const grid = house - solar;
        series.push({
          start: `${day}T${hourStr}:00Z`,
          house,
          solar,
          grid,
        });
      }
      return {
        profile_id: msg.profile_id || "household-energy",
        day,
        totals: {
          house: 14.8,
          solar: 25.4,
          grid_import: 3.1,
          grid_export: 13.7,
          self_consumption: 11.7,
        },
        series,
        coverage: {
          solar_coverage_pct: 79,
          self_sufficiency_pct: 84,
        },
      };
    }
    if (msg.type === "ha_component_backend/profile/get") {
      if (msg.kind === "energy") {
        return {
          found: true,
          profile: {
            house_entity: "sensor.ha_component_house_power",
            solar_entity: "sensor.ha_component_solar_power",
            grid_entity: "sensor.ha_component_grid_power",
          },
        };
      }
      if (msg.kind === "security") {
        return {
          found: true,
          profile: {
            cameras: ["camera.front_doorbell", "camera.front_porch", "camera.driveway"],
            alarm_panel: "alarm_control_panel.home",
            entry_sensors: ["binary_sensor.front_door", "binary_sensor.back_door", "lock.front_door"],
          },
        };
      }
      return { found: false, profile: null };
    }
    return [];
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

  public toggleSolarSim(): void {
    this._solarSimActive = !this._solarSimActive;
    const solarVal = this._solarSimActive ? "2850" : "0";
    const gridVal = this._solarSimActive ? "-1610" : "1240";
    this.updateState("sensor.ha_component_solar_power", { state: solarVal });
    this.updateState("sensor.solar_generation", { state: solarVal });
    this.updateState("sensor.total_solar_power", { state: solarVal });
    this.updateState("sensor.ha_component_grid_power", { state: gridVal });
    this.updateState("sensor.refoss_smart_energy_monitor_em_channel_3_power", { state: gridVal });
  }

  public toggleAlarmState(): void {
    const cur = this._states["alarm_control_panel.home"]?.state;
    const next = cur === "armed_home" ? "disarmed" : "armed_home";
    this.updateState("alarm_control_panel.home", { state: next });
    this.updateState("alarm_control_panel.home_alarm", { state: next });
  }

  public cycleClimateState(): void {
    const cur = this._states["climate.living_room_ac"]?.state;
    const modes = ["cool", "heat", "fan_only", "off"];
    const nextIdx = (modes.indexOf(cur) + 1) % modes.length;
    const nextMode = modes[nextIdx];
    this.updateState("climate.living_room_ac", {
      state: nextMode,
      attributes: {
        ...this._states["climate.living_room_ac"].attributes,
        hvac_mode: nextMode,
        hvac_action: nextMode === "cool" ? "cooling" : nextMode === "heat" ? "heating" : nextMode === "fan_only" ? "fan" : "off",
      },
    });
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

    if (entityIds.length === 0 && (domain === "scene" || domain === "script" || domain === "automation")) {
      // Scene, script or automation triggered without explicit entity ID array
      this._notify();
      return { success: true };
    }

    entityIds.forEach((entId) => {
      const current = this._states[entId];
      if (!current) return;

      let newState = current.state;
      if (service === "toggle") {
        newState = current.state === "on" || current.state === "playing" || current.state === "cool" || current.state === "heat" ? "off" : "on";
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
        newState = "locked";
      } else if (domain === "lock" && service === "unlock") {
        newState = "unlocked";
      } else if (domain === "cover" && (service === "open_cover" || service === "open")) {
        newState = "open";
      } else if (domain === "cover" && (service === "close_cover" || service === "close")) {
        newState = "closed";
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
          current.attributes.hvac_mode = newState;
          current.attributes.hvac_action = newState === "cool" ? "cooling" : newState === "heat" ? "heating" : newState === "fan_only" ? "fan" : "off";
        }
      } else if (domain === "climate" && service === "set_fan_mode") {
        if (serviceData?.fan_mode) {
          current.attributes.fan_mode = String(serviceData.fan_mode);
        }
      } else if (domain === "climate" && service === "set_swing_mode") {
        if (serviceData?.swing_mode) {
          current.attributes.swing_mode = String(serviceData.swing_mode);
        }
      } else if (domain === "climate" && service === "set_preset_mode") {
        if (serviceData?.preset_mode) {
          current.attributes.preset_mode = String(serviceData.preset_mode);
        }
      } else if (domain === "alarm_control_panel" && service.startsWith("alarm_arm")) {
        newState = service === "alarm_arm_away" ? "armed_away" : "armed_home";
      } else if (domain === "alarm_control_panel" && service === "alarm_disarm") {
        newState = "disarmed";
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
      } else if (domain === "media_player" && service === "media_play") {
        newState = "playing";
      } else if (domain === "media_player" && service === "media_pause") {
        newState = "paused";
      } else if (domain === "media_player" && service === "volume_up") {
        const vol = Number(current.attributes.volume_level ?? 0.5);
        current.attributes.volume_level = Math.min(1, vol + 0.05);
      } else if (domain === "media_player" && service === "volume_down") {
        const vol = Number(current.attributes.volume_level ?? 0.5);
        current.attributes.volume_level = Math.max(0, vol - 0.05);
      } else if (domain === "media_player" && service === "volume_set") {
        if (serviceData?.volume_level !== undefined) {
          current.attributes.volume_level = Number(serviceData.volume_level);
        }
      } else if (domain === "media_player" && service === "select_source") {
        if (serviceData?.source) {
          current.attributes.source = String(serviceData.source);
        }
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
