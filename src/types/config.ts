/**
 * Lovelace configuration for the Battery Flow Card.
 */
export interface BatteryFlowCardConfig {
  type: string;

  name?: string;

  /**
   * Enables automatic entity discovery for Battery Simulator devices.
   */
  use_battery_sim_device?: boolean;

  /**
   * Selected Home Assistant device ID of the Battery Simulator battery.
   */
  battery_sim_device?: string;

  soc_entity: string;

  use_split_power_entities?: boolean;

  power_entity?: string;
  charging_power_entity?: string;
  discharging_power_entity?: string;

  capacity_kwh: number;
  current_capacity_entity?: string;

  use_soc_limit_entities?: boolean;

  min_soc?: number;
  max_soc?: number;

  min_soc_entity?: string;
  max_soc_entity?: string;

  use_power_limit_entities?: boolean;

  max_charge_power?: number;
  max_discharge_power?: number;

  max_charge_power_entity?: string;
  max_discharge_power_entity?: string;
}