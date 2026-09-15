/**
 * Supported operating states of the battery.
 */
export type BatteryState =
  | "charging"
  | "discharging"
  | "idle";

/**
 * Determines the current battery state based on the power value.
 *
 * Positive power means charging.
 * Negative power means discharging.
 * Values close to zero are treated as idle.
 */
export function getBatteryState(
  power: number,
  idleThreshold = 10
): BatteryState {
  if (power > idleThreshold) {
    return "charging";
  }

  if (power < -idleThreshold) {
    return "discharging";
  }

  return "idle";
}

/**
 * Number of animation speed levels used for charging and discharging.
 */
const FLOW_SPEED_LEVELS = 7;

/**
 * Animation durations for the seven power levels.
 *
 * Level 1 is the slowest animation.
 * Level 7 is the fastest animation.
 */
const FLOW_DURATIONS = [
  9.8,
  8.4,
  7.0,
  5.6,
  4.2,
  2.8,
  1.4
] as const;

/**
 * Calculates the animation speed level based on the current power
 * relative to the maximum charging or discharging power.
 *
 * The returned level is always between 1 and 7.
 */
export function getFlowSpeedLevel(
  power: number,
  state: BatteryState,
  maxChargePower: number,
  maxDischargePower: number
): number {
  if (state === "idle") {
    return 1;
  }

  const maxPower =
    state === "charging"
      ? maxChargePower
      : maxDischargePower;

  if (maxPower <= 0) {
    return 1;
  }

  const powerRatio = Math.min(
    Math.abs(power) / maxPower,
    1
  );

  const level = Math.ceil(
    powerRatio * FLOW_SPEED_LEVELS
  );

  return Math.max(1, level);
}

/**
 * Returns the animation duration for the current battery power.
 *
 * The current power is mapped to one of seven predefined speed levels.
 */
export function getFlowDuration(
  power: number,
  state: BatteryState,
  maxChargePower: number,
  maxDischargePower: number
): number {
  const level = getFlowSpeedLevel(
    power,
    state,
    maxChargePower,
    maxDischargePower
  );

  return FLOW_DURATIONS[level - 1];
}