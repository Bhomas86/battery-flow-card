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

  const socDifference =
    state === "charging"
      ? targetSoc - soc
      : soc - targetSoc;

  if (socDifference <= 0) {
    return {
      status: "target_reached"
    };
  }

  const requiredEnergyKwh =
    capacityKwh * (socDifference / 100);

  const hours =
    requiredEnergyKwh / absolutePowerKw;

  return {
    status: "estimate",
    minutes: Math.round(hours * 60)
  };
}