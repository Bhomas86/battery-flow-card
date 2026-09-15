import { html, svg, TemplateResult } from "lit";
import {
  BatteryState,
  getBatteryState,
  getFlowDuration
} from "../helpers/battery-state";
import { BatteryDisplayData } from "../types/battery";

/**
 * Creates an SVG path for the battery fill area.
 *
 * The shape uses rounded top corners and a flat bottom edge.
 * This creates a cleaner liquid-like appearance than a simple rectangle.
 */
function createBatteryFillPath(
  x: number,
  y: number,
  width: number,
  height: number,
  topRadius: number
): string {
  const radius = Math.min(topRadius, width / 2, height);

  if (height <= 0) {
    return "";
  }

  if (height <= radius) {
    return `
      M ${x} ${y + height}
      L ${x} ${y + radius}
      Q ${x} ${y} ${x + radius} ${y}
      L ${x + width - radius} ${y}
      Q ${x + width} ${y} ${x + width} ${y + radius}
      L ${x + width} ${y + height}
      Z
    `;
  }

  return `
    M ${x} ${y + height}
    L ${x} ${y + radius}
    Q ${x} ${y} ${x + radius} ${y}
    L ${x + width - radius} ${y}
    Q ${x + width} ${y} ${x + width} ${y + radius}
    L ${x + width} ${y + height}
    Z
  `;
}

/**
 * Renders the visual battery representation using the supplied battery data.
 */

export function renderBatteryDisplay(
  data: BatteryDisplayData
): TemplateResult {
  const soc = Math.min(Math.max(data.soc, 0), 100);
  const power = data.power;
  const maxChargePower = data.maxChargePower;
  const maxDischargePower = data.maxDischargePower;

  const state = getBatteryState(power);

  const outerX = 25;
  const outerY = 58;
  const outerWidth = 130;
  const outerHeight = 235;
  const outerRadius = 18;

  const innerPadding = 7;
  const innerX = outerX + innerPadding;
  const innerY = outerY + innerPadding;
  const innerWidth = outerWidth - innerPadding * 2;
  const innerHeight = outerHeight - innerPadding * 2;
  const innerRadius = 10;

  const fillHeight = (innerHeight * soc) / 100;
  const fillY = innerY + innerHeight - fillHeight;

  const terminalWidth = 44;
  const terminalHeight = 18;
  const terminalX = outerX + (outerWidth - terminalWidth) / 2;
  const terminalY = 42;

  const fillPath = createBatteryFillPath(
    innerX,
    fillY,
    innerWidth,
    fillHeight,
    10
  );

  return html`
    <div class="battery-wrapper">
      ${svg`
        <svg
          class="battery battery--${state}"
          viewBox="0 0 180 320"
          role="img"
          aria-label="Battery state of charge ${soc}%"
        >
          <defs>
            <clipPath id="battery-inner-clip">
              <rect
                x="${innerX}"
                y="${innerY}"
                width="${innerWidth}"
                height="${innerHeight}"
                rx="${innerRadius}"
              />
            </clipPath>
            <linearGradient
              id="battery-flow-gradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0" />
              <stop offset="35%" stop-color="#ffffff" stop-opacity="0.12" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.28" />
              <stop offset="65%" stop-color="#ffffff" stop-opacity="0.12" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
            </linearGradient>
          </defs>

          <text
            class="battery-soc-value"
            x="90"
            y="24"
            text-anchor="middle"
            dominant-baseline="middle"
          >
            ${soc}%
          </text>

          <path
            class="battery-terminal"
            d="
              M ${terminalX} ${terminalY + terminalHeight}
              L ${terminalX} ${terminalY + 6}
              Q ${terminalX} ${terminalY}
                ${terminalX + 6} ${terminalY}
              L ${terminalX + terminalWidth - 6} ${terminalY}
              Q ${terminalX + terminalWidth} ${terminalY}
                ${terminalX + terminalWidth} ${terminalY + 6}
              L ${terminalX + terminalWidth} ${terminalY + terminalHeight}
              Z
            "
          />

          <rect
            class="battery-outline"
            x="${outerX}"
            y="${outerY}"
            width="${outerWidth}"
            height="${outerHeight}"
            rx="${outerRadius}"
          />

          <rect
            class="battery-background"
            x="${innerX}"
            y="${innerY}"
            width="${innerWidth}"
            height="${innerHeight}"
            rx="${innerRadius}"
          />

          <g clip-path="url(#battery-inner-clip)">
            ${
              fillHeight > 0
                ? svg`
                    <path
                      class="battery-fill"
                      d="${fillPath}"
                    />
                  `
                : null
            }

            ${
              state !== "idle"
                ? renderFlowAnimation(
                    state,
                    power,
                    maxChargePower,
                    maxDischargePower,
                    innerX,
                    fillY,
                    innerWidth,
                    fillHeight
                  )
                : null
            }
          </g>

          <text
            class="battery-state-label"
            x="90"
            y="312"
            text-anchor="middle"
          >
            ${getStateLabel(state, power)}
          </text>
        </svg>
      `}
    </div>
  `;
}

/**
 * Returns a readable label for the current battery state.
 */
function getStateLabel(
  state: BatteryState,
  power: number
): string {
  const formattedPower =
    Math.abs(power) >= 1000
      ? `${(Math.abs(power) / 1000).toFixed(2)} kW`
      : `${Math.abs(power).toFixed(0)} W`;

  switch (state) {
    case "charging":
      return `Charging · ${formattedPower}`;

    case "discharging":
      return `Discharging · ${formattedPower}`;

    default:
      return "Idle";
  }
}

/**
 * Renders two staggered horizontal flow indicators inside the battery fill.
 *
 * The second indicator runs half an animation cycle behind the first one,
 * creating a continuous energy flow effect.
 */
function renderFlowAnimation(
  state: BatteryState,
  power: number,
  maxChargePower: number,
  maxDischargePower: number,
  x: number,
  y: number,
  width: number,
  height: number
): TemplateResult {
  if (height <= 0 || state === "idle") {
    return html``;
  }

  const barHeight = 18;
  const duration = getFlowDuration(
    power,
    state,
    maxChargePower,
    maxDischargePower
  );
  const delay = -(duration / 2);

  const startY =
    state === "charging"
      ? y + height - barHeight / 2
      : y - barHeight / 2;

  return svg`
    <g
      class="battery-flow battery-flow--${state}"
      style="
        --flow-distance: ${height}px;
        --flow-duration: ${duration}s;
        --flow-delay: ${delay}s;
      "
    >
      <rect
        class="battery-flow-bar"
        x="${x}"
        y="${startY}"
        width="${width}"
        height="${barHeight}"
        rx="${barHeight / 2}"
      />

      <rect
        class="battery-flow-bar battery-flow-bar--delayed"
        x="${x}"
        y="${startY}"
        width="${width}"
        height="${barHeight}"
        rx="${barHeight / 2}"
      />
    </g>
  `;
}