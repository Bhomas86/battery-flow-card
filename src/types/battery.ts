/**
 * Defines the values required to render the battery card.
 */
export interface BatteryDisplayData {
  name: string;
  soc: number;
  power: number;

  capacityKwh: number;
  currentCapacityKwh: number;

  minSoc: number;
  maxSoc: number;

  maxChargePower: number;
  maxDischargePower: number;
}