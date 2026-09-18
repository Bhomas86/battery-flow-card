/**
 * Defines the values required to render the battery card.
 */
export interface BatteryDisplayData {
  name: string;
  soc: number;
  power: number;
  maxChargePower: number;
  maxDischargePower: number;
  capacityKwh: number;
  minSoc: number;
  maxSoc: number;
}