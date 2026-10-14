/**
 * Defines the values required to render the battery card.
 */
export interface BatteryDisplayData {
  name: string;
  soc: number;
  power: number;

  capacityKwh: number;
  currentCapacityKwh: number;

  /** Entity IDs for opening Home Assistant more-info dialogs. */
  socEntityId?: string;
  currentCapacityEntityId?: string;
  powerEntityId?: string;

  minSoc: number;
  maxSoc: number;

  maxChargePower: number;
  maxDischargePower: number;
}