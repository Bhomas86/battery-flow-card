import { LitElement, html } from "lit";
import {
  customElement,
  state
} from "lit/decorators.js";

import { renderBatteryDisplay } from "./components/battery-display";
import { cardStyles } from "./styles/card-styles";
import { renderPowerBar } from "./components/power-bar";

/**
 * Main custom element for the Battery Flow Card.
 *
 * The current controls are used for local development and allow the
 * battery visualization to be tested without Home Assistant entities.
 */
@customElement("battery-flow-card")
export class BatteryFlowCard extends LitElement {
  static styles = cardStyles;

  @state()
  private soc = 65;

  @state()
  private power = 1250;

  @state()
  private maxChargePower = 3000;

  @state()
  private maxDischargePower = 3000;

  /**
   * Updates the SOC test value.
   */
  private handleSocChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.soc = Number(input.value);
  }

  /**
   * Updates the current battery power test value.
   */
  private handlePowerChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.power = Number(input.value);
  }

  /**
   * Updates the maximum charging power used for speed calculation.
   */
  private handleMaxChargePowerChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.maxChargePower = Math.max(Number(input.value), 1);
  }

  /**
   * Updates the maximum discharging power used for speed calculation.
   */
  private handleMaxDischargePowerChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.maxDischargePower = Math.max(Number(input.value), 1);
  }

  /**
   * Renders the complete development preview.
   */
  protected render() {
    const minimumPower = -this.maxDischargePower;
    const maximumPower = this.maxChargePower;

    return html`
      <div class="card">
        ${renderBatteryDisplay({
          soc: this.soc,
          power: this.power,
          maxChargePower: this.maxChargePower,
          maxDischargePower: this.maxDischargePower
        })}

        ${renderPowerBar({
          soc: this.soc,
          power: this.power,
          maxChargePower: this.maxChargePower,
          maxDischargePower: this.maxDischargePower
        })}
        <div class="development-controls">
          <label>
            <span>SOC</span>

            <input
              type="range"
              min="0"
              max="100"
              step="1"
              .value="${String(this.soc)}"
              @input="${this.handleSocChange}"
            />

            <strong>${this.soc}%</strong>
          </label>

          <label>
            <span>Power</span>

            <input
              type="range"
              min="${minimumPower}"
              max="${maximumPower}"
              step="50"
              .value="${String(this.power)}"
              @input="${this.handlePowerChange}"
            />

            <strong>${this.power} W</strong>
          </label>

          <label>
            <span>Max charge</span>

            <input
              type="number"
              min="1"
              step="100"
              .value="${String(this.maxChargePower)}"
              @change="${this.handleMaxChargePowerChange}"
            />

            <span>W</span>
          </label>

          <label>
            <span>Max discharge</span>

            <input
              type="number"
              min="1"
              step="100"
              .value="${String(this.maxDischargePower)}"
              @change="${this.handleMaxDischargePowerChange}"
            />

            <span>W</span>
          </label>
        </div>
      </div>
    `;
  }
}