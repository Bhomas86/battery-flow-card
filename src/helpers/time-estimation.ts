import { BatteryState } from "./battery-state";

/**
 * Result of the SOC time estimation.
 */
export type TimeEstimationResult =
  | {
      status: "estimate";
      minutes: number;
    }
  | {
      status: "target_reached";
    }
  | {
      status: "unavailable";
    };

/**
 * Calculates the estimated time until the configured SOC limit is reached.
 *
 * Charging uses maxSoc as the target.
 * Discharging uses minSoc as the target.
 */
export function estimateTimeToSocLimit(
  state: BatteryState,
  soc: number,
  power: number,
  capacityKwh: number,
  currentCapacityKwh: number,
  minSoc: number,
  maxSoc: number
): TimeEstimationResult {
  if (state === "idle" || power === 0 || capacityKwh <= 0) {
    return {
      status: "unavailable"
    };
  }

  const absolutePowerKw = Math.abs(power) / 1000;

  if (absolutePowerKw <= 0) {
    return {
      status: "unavailable"
    };
  }

  const targetSoc =
    state === "charging"
      ? maxSoc
      : minSoc;

  const targetEnergyKwh =
    capacityKwh * (targetSoc / 100);

  let requiredEnergyKwh: number;

  if (state === "charging") {
    requiredEnergyKwh =
      targetEnergyKwh - currentCapacityKwh;
  } else {
    requiredEnergyKwh =
      currentCapacityKwh - targetEnergyKwh;
  }

  if (requiredEnergyKwh <= 0) {
    return {
      status: "target_reached"
    };
  }

  const hours =
    requiredEnergyKwh / absolutePowerKw;

  return {
    status: "estimate",
    minutes: Math.round(hours * 60)
  };
}