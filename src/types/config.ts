/**
 * Lovelace configuration for the Battery Flow Card.
 */
export interface BatteryFlowCardConfig {
  type: string;

  name?: string;

  soc_entity: string;

  power_entity?: string;
  charging_power_entity?: string;
  discharging_power_entity?: string;

  capacity_kwh: number;

  /**
   * Optional entity containing the currently stored battery energy.
   *
   * Supported units should be normalized later to kWh.
   */
  current_capacity_entity?: string;

  min_soc?: number;
  max_soc?: number;

  min_soc_entity?: string;
  max_soc_entity?: string;

  max_charge_power?: number;
  max_discharge_power?: number;

  max_charge_power_entity?: string;
  max_discharge_power_entity?: string;
}