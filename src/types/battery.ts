/**
 * Defines the values required to render the battery.
 */
export interface BatteryDisplayData {
  soc: number;
  power: number;
  maxChargePower: number;
  maxDischargePower: number;
}