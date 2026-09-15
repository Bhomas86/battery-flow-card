import { html, TemplateResult } from "lit";

import { BatteryDisplayData } from "../types/battery";
import { translate } from "../helpers/localize";

/**
 * Renders a bidirectional battery power bar.
 *
 * Discharging is displayed to the left of the center point.
 * Charging is displayed to the right of the center point.
 */
export function renderPowerBar(
  data: BatteryDisplayData
): TemplateResult {
  const power = data.power;

  const isCharging = power > 0;
  const isDischarging = power < 0;

  const maxPower = isCharging
    ? data.maxChargePower
    : data.maxDischargePower;

  const powerRatio =
    maxPower > 0
      ? Math.min(Math.abs(power) / maxPower, 1)
      : 0;

  const fillWidth = powerRatio * 50;

  return html`
    <div class="power-bar-wrapper">
      <div class="power-bar-labels">
        <span>
          ${translate("max_discharge")}:
          ${formatPower(data.maxDischargePower)}
        </span>

        <span>
          ${translate("max_charge")}:
          ${formatPower(data.maxChargePower)}
        </span>
      </div>

      <div class="power-bar">
        <div class="power-bar-center"></div>

        ${
          isDischarging
            ? html`
                <div
                  class="power-bar-fill power-bar-fill--discharging"
                  style="
                    right: 50%;
                    width: ${fillWidth}%;
                  "
                ></div>
              `
            : null
        }

        ${
          isCharging
            ? html`
                <div
                  class="power-bar-fill power-bar-fill--charging"
                  style="
                    left: 50%;
                    width: ${fillWidth}%;
                  "
                ></div>
              `
            : null
        }
      </div>
    </div>
  `;
}

/**
 * Formats a power value using watts or kilowatts.
 */
function formatPower(power: number): string {
  if (Math.abs(power) >= 1000) {
    return `${(power / 1000).toFixed(1)} kW`;
  }

  return `${power.toFixed(0)} W`;
}