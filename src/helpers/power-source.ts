import { BatteryFlowCardConfig } from "../types/config";
import { HomeAssistant } from "../types/home-assistant";
import { getPowerEntityStateWatts } from "./entity-value";

/**
 * Reads the current battery power from Home Assistant.
 *
 * A single bidirectional power entity is used when configured.
 * Otherwise separate charging and discharging entities are combined
 * into one signed internal power value.
 *
 * All power values are normalized to watts.
 */
export function getBatteryPower(
  hass: HomeAssistant,
  config: BatteryFlowCardConfig
): number | null {
  if (config.power_entity) {
    return getPowerEntityStateWatts(
      hass,
      config.power_entity
    );
  }

  const chargingPower = config.charging_power_entity
    ? getPowerEntityStateWatts(
        hass,
        config.charging_power_entity
      )
    : 0;

  const dischargingPower = config.discharging_power_entity
    ? getPowerEntityStateWatts(
        hass,
        config.discharging_power_entity
      )
    : 0;

  if (
    chargingPower === null ||
    dischargingPower === null
  ) {
    return null;
  }

  if (chargingPower > 0) {
    return chargingPower;
  }

  if (dischargingPower > 0) {
    return -dischargingPower;
  }

  return 0;
}