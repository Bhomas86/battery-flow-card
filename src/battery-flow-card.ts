import { LitElement, html } from "lit";
import {
  customElement,
  property,
  state
} from "lit/decorators.js";

import { renderBatteryDisplay } from "./components/battery-display";
import { renderBatteryDetails } from "./components/battery-details";
import { renderPowerBar } from "./components/power-bar";

import { getBatteryFlowCardConfigForm } from "./config/config-form";

import { cardStyles } from "./styles/card-styles";

import { BatteryDisplayData } from "./types/battery";
import { BatteryFlowCardConfig } from "./types/config";
import { HomeAssistant } from "./types/home-assistant";

import { getBatteryPower } from "./helpers/power-source";
import { getBatterySimData } from "./helpers/battery-sim-device";
import {
  getEnergyEntityStateKwh,
  getNumericEntityState,
  getPowerEntityStateWatts
} from "./helpers/entity-value";


/**
 * Main custom element for the Battery Flow Card.
 */
@customElement("battery-flow-card")
export class BatteryFlowCard extends LitElement {
  static styles = cardStyles;
  

  /**
   * Home Assistant runtime object containing entity states.
   */
  @property({ attribute: false })
  public hass?: HomeAssistant;

  /**
   * Lovelace configuration supplied by Home Assistant.
   */
  @state()
  private config?: BatteryFlowCardConfig;

  /**
   * Applies the Lovelace card configuration.
   *
   * Incomplete configurations are allowed because the Home Assistant
   * visual editor builds the configuration step by step.
   */
  public setConfig(config: BatteryFlowCardConfig): void {
    if (!config) {
      throw new Error("Invalid configuration");
    }

    this.config = {
      ...config,
      capacity_kwh: config.capacity_kwh ?? 7,
      min_soc: config.min_soc ?? 0,
      max_soc: config.max_soc ?? 100
    };
  }

  /**
   * Returns the graphical Home Assistant configuration form.
   */
  public static getConfigForm() {
    return getBatteryFlowCardConfigForm();
  }

  /**
   * Returns a default card configuration for the Lovelace UI.
   */
  public static getStubConfig(): Record<string, unknown> {
    return {
      name: "Battery",
      use_battery_sim_device: false,
      battery_sim_device: "",

      soc_entity: "",

      use_split_power_entities: false,
      power_entity: "",

      capacity_kwh: 7,

      use_soc_limit_entities: false,
      min_soc: 0,
      max_soc: 100,

      use_power_limit_entities: false,
      max_charge_power: 3000,
      max_discharge_power: 3000
    };
  }



  /**
   * Renders the complete Home Assistant card.
   */
  protected render() {
    if (!this.config) {
      return html``;
    }

    const usesBatterySimDevice =
      Boolean(
        this.config.use_battery_sim_device &&
        this.config.battery_sim_device
      );

    const hasSocEntity =
      Boolean(this.config.soc_entity);

    const hasPowerEntity =
      Boolean(
        this.config.power_entity ||
        this.config.charging_power_entity ||
        this.config.discharging_power_entity
      );

    /**
     * Universal mode requires manually configured SOC and power entities.
     * Battery Simulator mode resolves these values automatically from
     * the selected Home Assistant device.
     */
    if (
      !usesBatterySimDevice &&
      (!hasSocEntity || !hasPowerEntity)
    ) {
      return html`
        <div class="card card--setup">
          <div class="battery-card-header">
            ${this.config.name ?? "Battery"}
          </div>

          <div class="card-setup-message">
            Configure the battery entities to display the preview.
          </div>
        </div>
      `;
    }

    if (!this.hass) {
      return html`
        <div class="card-error">
          Home Assistant data unavailable
        </div>
      `;
    }

    const batteryData = this.getBatteryData();

    if (!batteryData) {
      return html`
        <div class="card-error">
          Battery data unavailable
        </div>
      `;
    }

    return html`
      <div class="card">
        <div class="battery-card-header">
          ${batteryData.name}
        </div>

        <div class="battery-summary">
          <div class="battery-summary__visual">
            ${renderBatteryDisplay(batteryData)}
          </div>

          <div class="battery-summary__details">
            ${renderBatteryDetails(batteryData, this.hass.language)}
          </div>
        </div>

        ${renderPowerBar(batteryData, this.hass.language)}
      </div>
    `;
  }

  /**
   * Reads the configured Home Assistant entities and converts their
   * states into the internal battery data model.
   */
  private getBatteryData(): BatteryDisplayData | null {
    if (!this.hass || !this.config) {
      return null;
    }


    if (
      this.config.use_battery_sim_device &&
      this.config.battery_sim_device
    ) {
      return getBatterySimData(
        this.hass,
        this.config.battery_sim_device
      );
    }

    // Existing universal configuration logic continues here.
    const socState =
      this.hass.states[this.config.soc_entity];


    if (!socState) {
      return null;
    }

    const power = getBatteryPower(
      this.hass,
      this.config
    );

    if (power === null) {
      return null;
    }


    const soc = Number(socState.state);

    const calculatedCurrentCapacityKwh =
      this.config.capacity_kwh * (soc / 100);

    const currentCapacityKwh =
      this.config.current_capacity_entity
        ? getEnergyEntityStateKwh(
            this.hass,
            this.config.current_capacity_entity
          ) ?? calculatedCurrentCapacityKwh
        : calculatedCurrentCapacityKwh;

    const minSoc = this.getConfiguredNumericValue(
      this.config.min_soc_entity,
      this.config.min_soc,
      0
    );

    const maxSoc = this.getConfiguredNumericValue(
      this.config.max_soc_entity,
      this.config.max_soc,
      100
    );

    const maxChargePower = this.getConfiguredPowerWatts(
      this.config.max_charge_power_entity,
      this.config.max_charge_power,
      0
    );

    const maxDischargePower = this.getConfiguredPowerWatts(
      this.config.max_discharge_power_entity,
      this.config.max_discharge_power,
      0
    );

    if (!Number.isFinite(soc) || !Number.isFinite(power)) {
      return null;
    }

    return {
      name: this.config.name ?? "Battery",
      soc,
      power,
      capacityKwh: this.config.capacity_kwh,
      currentCapacityKwh,
      minSoc,
      maxSoc,
      maxChargePower,
      maxDischargePower
    };
  }

  /**
   * Reads a numeric entity value or returns a configured fallback.
   */
  private getConfiguredNumericValue(
    entityId: string | undefined,
    fallbackValue: number | undefined,
    defaultValue: number
  ): number {
    if (this.hass && entityId) {
      const value = getNumericEntityState(
        this.hass,
        entityId
      );

      if (value !== null) {
        return value;
      }
    }

    if (
      fallbackValue !== undefined &&
      Number.isFinite(fallbackValue)
    ) {
      return fallbackValue;
    }

    return defaultValue;
  }

  /**
   * Reads a power entity and normalizes it to watts.
   *
   * Static configuration values are expected to be specified in watts.
   */
  private getConfiguredPowerWatts(
    entityId: string | undefined,
    fallbackValue: number | undefined,
    defaultValue: number
  ): number {
    if (this.hass && entityId) {
      const value = getPowerEntityStateWatts(
        this.hass,
        entityId
      );

      if (value !== null) {
        return value;
      }
    }

    if (
      fallbackValue !== undefined &&
      Number.isFinite(fallbackValue)
    ) {
      return fallbackValue;
    }

    return defaultValue;
  }

}

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description?: string;
      preview?: boolean;
      documentationURL?: string;
    }>;
  }
}

window.customCards = window.customCards || [];

window.customCards.push({
  type: "battery-flow-card",
  name: "Battery Flow Card",
  description: "Visualizes battery SOC, power flow and SOC limits.",
  preview: true,
  documentationURL: "https://github.com/Bhomas86/battery-flow-card"
});