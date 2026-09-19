/**
 * Lovelace configuration for the Battery Flow Card.
 */
export interface BatteryFlowCardConfig {
  type: string;

  name?: string;

  soc_entity: string;

  /**
   * Optional bidirectional power entity.
   *
   * Positive values mean charging.
   * Negative values mean discharging.
   */
  power_entity?: string;

  /**
   * Optional separate charging and discharging power entities.
   *
   * These values are expected to be positive.
   */
  charging_power_entity?: string;
  discharging_power_entity?: string;

  capacity_kwh: number;

  min_soc?: number;
  max_soc?: number;

  min_soc_entity?: string;
  max_soc_entity?: string;

  max_charge_power?: number;
  max_discharge_power?: number;

  max_charge_power_entity?: string;
  max_discharge_power_entity?: string;
}