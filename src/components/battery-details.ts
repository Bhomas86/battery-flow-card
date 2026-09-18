import { html, TemplateResult } from "lit";

import { BatteryDisplayData } from "../types/battery";
import { getBatteryState } from "../helpers/battery-state";
import { translate } from "../helpers/localize";
import {
  estimateTimeToSocLimit,
  TimeEstimationResult
} from "../helpers/time-estimation";

/**
 * Renders the textual battery details shown next to the battery.
 */
export function renderBatteryDetails(
  data: BatteryDisplayData
): TemplateResult {
  const currentCapacityKwh = (data.capacityKwh * data.soc) / 100;
  const state = getBatteryState(data.power);
  const timeEstimation = estimateTimeToSocLimit(
    state,
    data.soc,
    data.power,
    data.capacityKwh,
    data.minSoc,
    data.maxSoc
  );
  const targetSoc = getTargetSoc(
    state,
    data.minSoc,
    data.maxSoc
  );

  return html`
    <div class="battery-details">
      <div class="battery-details__soc">
        ${formatPercent(data.soc)}
      </div>

      <div class="battery-details__row">
        <span class="battery-details__label">
          ${translate("current_capacity")}
        </span>

        <span class="battery-details__value">
          ${formatEnergy(currentCapacityKwh)}
        </span>
      </div>

      <div class="battery-details__row">
        <span class="battery-details__label">
          ${translate(state)}
        </span>

        <span class="battery-details__value">
          ${formatPower(data.power)}
        </span>
      </div>

      <div class="battery-details__row">
        <span class="battery-details__label">
          ${
            targetSoc !== null
              ? `${translate("estimated_time_to")} ${targetSoc}%`
              : translate("estimated_time")
          }
        </span>

        <span class="battery-details__value">
          ${formatTimeEstimation(timeEstimation)}
        </span>
      </div>
    </div>
  `;
}

/**
 * Formats a percentage value.
 */
function formatPercent(value: number): string {
  return `${value.toFixed(0)}%`;
}

/**
 * Formats an energy value in kWh.
 */
function formatEnergy(value: number): string {
  return `${value.toFixed(2)} kWh`;
}

/**
 * Formats a power value as an absolute value in W or kW.
 *
 * The power sign is only used internally to determine whether
 * the battery is charging or discharging.
 */
function formatPower(power: number): string {
  const absolutePower = Math.abs(power);

  if (absolutePower >= 1000) {
    return `${(absolutePower / 1000).toFixed(2)} kW`;
  }

  return `${absolutePower.toFixed(0)} W`;
}

/**
 * Formats the SOC time estimation for display.
 */
function formatTimeEstimation(
  result: TimeEstimationResult
): string {
  if (result.status === "target_reached") {
    return translate("target_reached");
  }

  if (result.status === "unavailable") {
    return "—";
  }

  const minutes = result.minutes;

  if (minutes <= 0) {
    return "0 min";
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes} min`;
  }

  if (remainingMinutes === 0) {
    return `${hours} h`;
  }

  return `${hours} h ${remainingMinutes} min`;
}

/**
 * Returns the configured SOC target based on the current battery state.
 */
function getTargetSoc(
  state: string,
  minSoc: number,
  maxSoc: number
): number | null {
  if (state === "charging") {
    return maxSoc;
  }

  if (state === "discharging") {
    return minSoc;
  }

  return null;
}