import { HomeAssistant } from "../types/home-assistant";

/**
 * Reads a numeric Home Assistant entity state.
 */
export function getNumericEntityState(
  hass: HomeAssistant,
  entityId: string
): number | null {
  const entity = hass.states[entityId];

  if (!entity) {
    return null;
  }

  const value = Number(entity.state);

  return Number.isFinite(value)
    ? value
    : null;
}

/**
 * Reads a power entity and converts its value to watts.
 *
 * Supported units:
 * - W
 * - kW
 * - MW
 *
 * Values without a unit are interpreted as watts.
 */
export function getPowerEntityStateWatts(
  hass: HomeAssistant,
  entityId: string
): number | null {
  const entity = hass.states[entityId];

  if (!entity) {
    return null;
  }

  const value = Number(entity.state);

  if (!Number.isFinite(value)) {
    return null;
  }

  const unit = entity.attributes.unit_of_measurement;

  switch (unit) {
    case "kW":
      return value * 1000;

    case "MW":
      return value * 1_000_000;

    case "W":
    case undefined:
    case null:
      return value;

    default:
      console.warn(
        `[Battery Flow Card] Unsupported power unit "${String(unit)}" for ${entityId}. Value is interpreted as watts.`
      );

      return value;
  }
}

/**
 * Reads an energy entity and converts its value to kWh.
 *
 * Supported units:
 * - Wh
 * - kWh
 * - MWh
 */
export function getEnergyEntityStateKwh(
  hass: HomeAssistant,
  entityId: string
): number | null {
  const entity = hass.states[entityId];

  if (!entity) {
    return null;
  }

  const value = Number(entity.state);

  if (!Number.isFinite(value)) {
    return null;
  }

  const unit = entity.attributes.unit_of_measurement;

  switch (unit) {
    case "Wh":
      return value / 1000;

    case "kWh":
      return value;

    case "MWh":
      return value * 1000;

    case undefined:
    case null:
      return value;

    default:
      console.warn(
        `[Battery Flow Card] Unsupported energy unit "${String(unit)}" for ${entityId}. Value is interpreted as kWh.`
      );

      return value;
  }
}