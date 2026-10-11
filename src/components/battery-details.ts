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
  data: BatteryDisplayData,
  language?: string,
  onOpenEntity?: (entityId: string) => void
): TemplateResult {
  const state = getBatteryState(data.power);
  const timeEstimation = estimateTimeToSocLimit(
    state,
    data.soc,
    data.power,
    data.capacityKwh,
    data.currentCapacityKwh,
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
        ${renderEntityValue(formatPercent(data.soc), data.socEntityId, onOpenEntity)}
      </div>

      <div class="battery-details__row">
        <span class="battery-details__label">
          ${translate("current_capacity", language)}
        </span>

        <span class="battery-details__value">
          ${renderEntityValue(
            formatEnergy(data.currentCapacityKwh),
            data.currentCapacityEntityId,
            onOpenEntity
          )}
        </span>
      </div>

      <div class="battery-details__row">
        <span class="battery-details__label">
          ${translate(state, language)}
        </span>

        <span class="battery-details__value">
          ${renderEntityValue(
            formatPower(data.power),
            data.powerEntityId,
            onOpenEntity
          )}
        </span>
      </div>

      <div class="battery-details__row">
        <span class="battery-details__label">
          ${
            targetSoc !== null
              ? `${translate("estimated_time_to", language)} ${targetSoc}%`
              : translate("estimated_time", language)
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
 * Native button on values backed by a real entity; computed values stay text.
 */
function renderEntityValue(
  value: string,
  entityId?: string,
  onOpenEntity?: (entityId: string) => void
): TemplateResult {
  if (!entityId || !onOpenEntity) {
    return html`${value}`;
  }

  return html`
    <button
      type="button"
      class="battery-details__entity-button"
      title="${entityId}"
      aria-label="${value} — ${entityId}"
      @click=${() => onOpenEntity(entityId)}
    >
      ${value}
    </button>
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
  result: TimeEstimationResult,
  language?: string
): string {
  if (result.status === "target_reached") {
    return translate("target_reached", language);
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