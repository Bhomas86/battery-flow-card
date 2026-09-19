import { LitElement, html } from "lit";
import {
  customElement,
  property,
  state
} from "lit/decorators.js";

import { renderBatteryDisplay } from "./components/battery-display";
import { renderBatteryDetails } from "./components/battery-details";
import { renderPowerBar } from "./components/power-bar";
import { cardStyles } from "./styles/card-styles";

import { BatteryDisplayData } from "./types/battery";
import { BatteryFlowCardConfig } from "./types/config";
import { HomeAssistant } from "./types/home-assistant";

import { getBatteryPower } from "./helpers/power-source";
import {
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
   */
  public setConfig(config: BatteryFlowCardConfig): void {
    if (!config.soc_entity) {
      throw new Error("soc_entity is required");
    }

    const hasSinglePowerEntity = Boolean(
      config.power_entity
    );

    const hasSplitPowerEntities = Boolean(
      config.charging_power_entity ||
      config.discharging_power_entity
    );

    if (
      !hasSinglePowerEntity &&
      !hasSplitPowerEntities
    ) {
      throw new Error(
        "Configure either power_entity or charging/discharging power entities"
      );
    }

    if (!config.capacity_kwh) {
      throw new Error("capacity_kwh is required");
    }

    this.config = {
      ...config,
      min_soc: config.min_soc ?? 0,
      max_soc: config.max_soc ?? 100
    };
  }

  /**
   * Renders the complete Home Assistant card.
   */
  protected render() {
    if (!this.config) {
      return html``;
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
            ${renderBatteryDetails(batteryData)}
          </div>
        </div>

        ${renderPowerBar(batteryData)}
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
