import type { HomeAssistant, HassEntity } from "../../types/home-assistant";
import type { AreaRegistryEntry, DashboardRegistries } from "../../types/registry";
import { isEntityAvailable, formatEntityState } from "../../utils/entity";

export interface AreaStatusSummary {
  summary: string;
  severity: "critical" | "warning" | "active" | "";
  lightsOn: number;
  temperatureText: string;
  humidityText: string;
  hasCritical: boolean;
  hasWarning: boolean;
}

const BLOCKED_TEMPERATURE_REGEX =
  /(_controller_temperature|_outside_air_temperature|cpu_temperature|processor_temperature|board_temperature|chip_temperature|internal_temperature)$/i;

/**
 * Computes unified status diagnostics, active light count, noise-filtered temperature,
 * and critical hazard alerts for an area.
 */
export function computeAreaStatusSummary(
  area: AreaRegistryEntry,
  registry: DashboardRegistries | null | undefined,
  hass: HomeAssistant | null | undefined,
): AreaStatusSummary {
  if (!hass) {
    return {
      summary: "",
      severity: "",
      lightsOn: 0,
      temperatureText: "",
      humidityText: "",
      hasCritical: false,
      hasWarning: false,
    };
  }

  const entities = registry?.entities || [];
  const areaEntities = entities.filter((e) => {
    const entArea =
      e.area_id ||
      (e.device_id ? registry?.deviceArea?.get(e.device_id) : null);
    return entArea === area.area_id;
  });

  const states: HassEntity[] = [];
  for (const ent of areaEntities) {
    const st = hass.states[ent.entity_id];
    if (st && isEntityAvailable(st)) {
      states.push(st);
    }
  }

  let lightsOn = 0;
  let temperatureText = "";
  let humidityText = "";
  let hasCritical = false;
  let hasWarning = false;

  // Temperature extraction: prefer climate, then sensor
  const climate = states.find(
    (st) =>
      st.entity_id.startsWith("climate.") &&
      st.attributes &&
      !Number.isNaN(
        Number.parseFloat(String(st.attributes.current_temperature ?? "")),
      ),
  );

  if (climate && climate.attributes?.current_temperature !== undefined) {
    const tempNum = Number.parseFloat(
      String(climate.attributes.current_temperature),
    );
    const unit =
      climate.attributes.temperature_unit ||
      hass.config?.unit_system?.temperature ||
      "°C";
    temperatureText = `${tempNum.toFixed(1)} ${unit}`;
  } else {
    const tempSensor = states.find(
      (st) =>
        st.entity_id.startsWith("sensor.") &&
        (st.attributes?.device_class === "temperature" ||
          (st.attributes?.unit_of_measurement &&
            /°[CF]/i.test(st.attributes.unit_of_measurement))) &&
        !BLOCKED_TEMPERATURE_REGEX.test(st.entity_id) &&
        !Number.isNaN(Number.parseFloat(String(st.state ?? ""))),
    );
    if (tempSensor) {
      const tempNum = Number.parseFloat(String(tempSensor.state));
      const unit =
        tempSensor.attributes?.unit_of_measurement ||
        hass.config?.unit_system?.temperature ||
        "°C";
      temperatureText = `${tempNum.toFixed(1)} ${unit}`;
    }
  }

  const humSensor = states.find(
    (st) =>
      st.entity_id.startsWith("sensor.") &&
      st.attributes?.device_class === "humidity" &&
      !Number.isNaN(Number.parseFloat(String(st.state ?? ""))),
  );
  if (humSensor) {
    humidityText = formatEntityState(humSensor, hass);
  }

  for (const st of states) {
    if (st.entity_id.startsWith("light.") && st.state === "on") {
      lightsOn++;
    }
    const devClass = st.attributes?.device_class || "";
    if (
      st.entity_id.startsWith("binary_sensor.") &&
      st.state === "on" &&
      ["smoke", "moisture", "gas"].includes(devClass)
    ) {
      hasCritical = true;
    }
    if (
      (st.entity_id.startsWith("binary_sensor.") &&
        st.state === "on" &&
        devClass === "garage_door") ||
      (st.entity_id.startsWith("cover.") &&
        ["open", "opening"].includes(st.state) &&
        devClass === "garage")
    ) {
      hasWarning = true;
    }
  }

  const active =
    lightsOn > 0 ||
    states.some(
      (st) =>
        (st.entity_id.startsWith("climate.") &&
          ["heating", "cooling", "drying", "fan"].includes(
            st.attributes?.hvac_action || "",
          )) ||
        (st.entity_id.startsWith("media_player.") && st.state === "playing"),
    );

  const parts: string[] = [];
  if (hasCritical) parts.push("Attention required");
  else if (hasWarning) parts.push("Garage open");
  if (temperatureText) parts.push(temperatureText);
  if (humidityText && !temperatureText) parts.push(humidityText);
  if (lightsOn > 0)
    parts.push(`${lightsOn} light${lightsOn === 1 ? "" : "s"} on`);

  return {
    summary: parts.slice(0, 3).join(" · "),
    severity: hasCritical
      ? "critical"
      : hasWarning
        ? "warning"
        : active
          ? "active"
          : "",
    lightsOn,
    temperatureText,
    humidityText,
    hasCritical,
    hasWarning,
  };
}
