import { BatteryDisplayData } from "../types/battery";
import {
  HassEntityRegistryEntry,
  HomeAssistant
} from "../types/home-assistant";

import {
  getEnergyEntityStateKwh,
  getNumericEntityState,
  getPowerEntityStateWatts
} from "./entity-value";

/**
 * Resolves all required Battery Flow Card values from a selected
 * Battery Simulator device.
 *
 * Entities are identified by their Battery Simulator registry names
 * instead of generated entity IDs so renamed devices remain supported.
 */
export function getBatterySimData(
  hass: HomeAssistant,
  deviceId: string
): BatteryDisplayData | null {
  const entities = Object.values(hass.entities).filter(
    (entity) =>
      entity.device_id === deviceId &&
      entity.platform === "battery_sim"
  );

  if (entities.length === 0) {
    console.error(
      `[Battery Flow Card] No Battery Simulator entities found for device ${deviceId}.`
    );

    return null;
  }

  const device = hass.devices[deviceId];

  const mainBatteryEntity = findMainBatteryEntity(
    hass,
    entities
  );

  const socEntity = findEntityByRegistryName(
    entities,
    "State of charge"
  );

  const chargingPowerEntity = findEntityByRegistryName(
    entities,
    "Current charging rate"
  );

  const dischargingPowerEntity = findEntityByRegistryName(
    entities,
    "Current discharging rate"
  );

  const minSocEntity = findEntityByRegistryName(
    entities,
    "Minimum soc"
  );

  const maxSocEntity = findEntityByRegistryName(
    entities,
    "Maximum soc"
  );

  const maxChargePowerEntity = findEntityByRegistryName(
    entities,
    "Charge limit"
  );

  const maxDischargePowerEntity = findEntityByRegistryName(
    entities,
    "Discharge limit"
  );

  if (!mainBatteryEntity) {
    console.error(
      "[Battery Flow Card] Main Battery Simulator sensor not found."
    );

    return null;
  }

  if (!socEntity) {
    console.error(
      "[Battery Flow Card] Battery Simulator SOC entity not found."
    );

    return null;
  }

  if (!chargingPowerEntity || !dischargingPowerEntity) {
    console.error(
      "[Battery Flow Card] Battery Simulator power entities not found."
    );

    return null;
  }

  const mainState =
    hass.states[mainBatteryEntity.entity_id];

  if (!mainState) {
    return null;
  }

  const currentCapacityKwh =
    getEnergyEntityStateKwh(
      hass,
      mainBatteryEntity.entity_id
    );

  const soc =
    getNumericEntityState(
      hass,
      socEntity.entity_id
    );

  const chargingPower =
    getPowerEntityStateWatts(
      hass,
      chargingPowerEntity.entity_id
    );

  const dischargingPower =
    getPowerEntityStateWatts(
      hass,
      dischargingPowerEntity.entity_id
    );

  if (
    currentCapacityKwh === null ||
    soc === null ||
    chargingPower === null ||
    dischargingPower === null
  ) {
    console.error(
      "[Battery Flow Card] Invalid Battery Simulator state values."
    );

    return null;
  }

  /*
   * Battery Simulator normally provides the configured battery size
   * as the size_kwh attribute of the main battery sensor.
   *
   * If the attribute is unavailable, the total capacity is estimated
   * from the current energy and SOC as a fallback.
   */
  const configuredCapacityKwh =
    getNumericAttribute(
      mainState.attributes,
      "size_kwh"
    );

  const calculatedCapacityKwh =
    soc > 0
      ? currentCapacityKwh / (soc / 100)
      : null;

  const capacityKwh =
    configuredCapacityKwh ??
    calculatedCapacityKwh;

  if (
    capacityKwh === null ||
    !Number.isFinite(capacityKwh) ||
    capacityKwh <= 0
  ) {
    console.error(
      "[Battery Flow Card] Battery Simulator capacity could not be determined."
    );

    return null;
  }

  const minSoc =
    minSocEntity
      ? getNumericEntityState(
          hass,
          minSocEntity.entity_id
        ) ?? 0
      : 0;

  const maxSoc =
    maxSocEntity
      ? getNumericEntityState(
          hass,
          maxSocEntity.entity_id
        ) ?? 100
      : 100;

  const maxChargePower =
    maxChargePowerEntity
      ? getPowerEntityStateWatts(
          hass,
          maxChargePowerEntity.entity_id
        ) ?? 0
      : 0;

  const maxDischargePower =
    maxDischargePowerEntity
      ? getPowerEntityStateWatts(
          hass,
          maxDischargePowerEntity.entity_id
        ) ?? 0
      : 0;

  /*
   * Internally the card uses one signed power value:
   * positive = charging
   * negative = discharging
   */
  const power =
    chargingPower > 0
      ? chargingPower
      : dischargingPower > 0
        ? -dischargingPower
        : 0;

  return {
    name:
      device?.name_by_user ??
      device?.name ??
      "Battery Simulator",

    soc,
    power,

    capacityKwh,
    currentCapacityKwh,

    minSoc,
    maxSoc,

    maxChargePower,
    maxDischargePower
  };
}

/**
 * Finds the main Battery Simulator sensor containing the current
 * amount of energy stored in the battery.
 *
 * The main sensor normally has no registry name, unlike the
 * additional diagnostic and control entities.
 */
function findMainBatteryEntity(
  hass: HomeAssistant,
  entities: HassEntityRegistryEntry[]
): HassEntityRegistryEntry | undefined {
  /*
   * Preferred method:
   * Battery Simulator exposes size_kwh on the main sensor.
   */
  const entityWithCapacityAttribute = entities.find(
    (entity) => {
      if (!entity.entity_id.startsWith("sensor.")) {
        return false;
      }

      const state = hass.states[entity.entity_id];

      return (
        state?.attributes.size_kwh !== undefined
      );
    }
  );

  if (entityWithCapacityAttribute) {
    return entityWithCapacityAttribute;
  }

  /*
   * Fallback:
   * The main Battery Simulator sensor has no registry name and
   * contains energy in kWh.
   */
  return entities.find((entity) => {
    if (
      !entity.entity_id.startsWith("sensor.") ||
      entity.name
    ) {
      return false;
    }

    const state = hass.states[entity.entity_id];

    return (
      state?.attributes.unit_of_measurement === "kWh"
    );
  });
}

/**
 * Finds a Battery Simulator entity by its registry name.
 *
 * Registry names remain stable even when Home Assistant generates
 * different entity IDs from different battery device names.
 */
function findEntityByRegistryName(
  entities: HassEntityRegistryEntry[],
  name: string
): HassEntityRegistryEntry | undefined {
  const normalizedName = name
    .trim()
    .toLowerCase();

  return entities.find(
    (entity) =>
      entity.name
        ?.trim()
        .toLowerCase() === normalizedName
  );
}

/**
 * Reads a numeric Home Assistant state attribute.
 */
function getNumericAttribute(
  attributes: Record<string, unknown>,
  attribute: string
): number | null {
  const value = Number(
    attributes[attribute]
  );

  return Number.isFinite(value)
    ? value
    : null;
}