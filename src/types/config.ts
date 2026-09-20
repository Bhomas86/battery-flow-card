/**
 * Lovelace configuration for the Battery Flow Card.
 */
export interface BatteryFlowCardConfig {
  type: string;

  name?: string;
  soc_entity: string;

  /**
   * Selects between one bidirectional power entity
   * and separate charging/discharging entities.
   */
  use_split_power_entities?: boolean;

  power_entity?: string;
  charging_power_entity?: string;
  discharging_power_entity?: string;

  capacity_kwh: number;
  current_capacity_entity?: string;

  /**
   * Selects between static SOC limits and SOC limit entities.
   */
  use_soc_limit_entities?: boolean;

  min_soc?: number;
  max_soc?: number;

  min_soc_entity?: string;
  max_soc_entity?: string;

  /**
   * Selects between static power limits and power limit entities.
   */
  use_power_limit_entities?: boolean;

  max_charge_power?: number;
  max_discharge_power?: number;

  max_charge_power_entity?: string;
  max_discharge_power_entity?: string;
}