import { css } from "lit";

/**
 * Contains the shared styles for the Battery Flow Card.
 */
export const cardStyles = css`
  :host {
    display: block;
  }

  .card {
    container-type: inline-size;
    container-name: battery-card;

    --battery-width: clamp(105px, 34cqw, 180px);
    --summary-gap: clamp(4px, 2cqw, 8px);
  }

  @container battery-card (max-width: 520px) {
    .card {
      --battery-width: clamp(95px, 28cqw, 145px);
      --summary-gap: 6px;
    }

    .battery-details__soc {
      font-size: clamp(36px, 9cqw, 52px);
    }
  }

  .battery-card-header {
    width: min(520px, calc(100% - 32px));
    margin: 16px auto 0px;
    color: var(--primary-text-color, #424242);
    font-size: 30px;
    font-weight: 700;
    line-height: 1.2;
    text-align: center;
  }

  .battery-summary {
    display: grid;
    grid-template-columns: var(--battery-width) minmax(0, 1fr);
    gap: var(--summary-gap);
    align-items: center;
    width: min(520px, calc(100% - 20px));
    margin: 0 auto;
  }
  .battery-summary__visual {
    display: flex;
    justify-content: center;
  }

  .battery-summary__details {
    display: flex;
    align-items: center;
    min-width: 0;
  }

  .battery-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px 0;
  }

  .battery {
    display: block;
    width: 100%;
    height: auto;
  }

  .battery-outline {
    fill: transparent;
    stroke: var(--primary-text-color, #424242);
    stroke-width: 6;
  }

  .battery-terminal {
    fill: var(--primary-text-color, #424242);
  }

  .battery-background {
    fill: rgba(0, 0, 0, 0.08);
  }

  .battery-fill {
    fill: #4caf50;
  }

  .battery--charging .battery-fill {
    fill: #4caf50;
  }

  .battery--discharging .battery-fill {
    fill: #ff9800;
  }

  .battery--idle .battery-fill {
    fill: #78909c;
  }

  .battery-limit-line {
    stroke-width: 2;
    stroke-dasharray: 6 4;
    opacity: 0.65;
  }

  .battery-limit--min .battery-limit-line {
    stroke: #c20707;
  }

  .battery-limit--max .battery-limit-line {
    stroke: #0f325e;
  }

  .battery-limit-label {
    font-size: 10px;
    font-weight: 600;
    opacity: 0.7;
  }

  .battery-limit--min .battery-limit-label {
    fill: #c20707;
  }

  .battery-limit--max .battery-limit-label {
    fill: #0f325e;
  }

  .battery-flow-bar {
    fill: url(#battery-flow-gradient);
  }

  .battery-flow--charging .battery-flow-bar {
    animation:
      battery-flow-up
      var(--flow-duration)
      linear
      infinite;
  }

  .battery-flow--discharging .battery-flow-bar {
    animation:
      battery-flow-down
      var(--flow-duration)
      linear
      infinite;
  }

  .battery-flow-bar--delayed {
    animation-delay: var(--flow-delay) !important;
  }

  @keyframes battery-flow-up {
    from {
      transform: translateY(0);
      opacity: 1;
    }

    85% {
      opacity: 1;
    }

    to {
      transform: translateY(calc(-1 * var(--flow-distance)));
      opacity: 0;
    }
  }

  @keyframes battery-flow-down {
    from {
      transform: translateY(0);
      opacity: 1;
    }

    85% {
      opacity: 1;
    }

    to {
      transform: translateY(var(--flow-distance));
      opacity: 0;
    }
  }

  .battery-details {
    width: 100%;
    min-width: 0;
  }

  .battery-details__soc {
    margin-bottom: 20px;
    color: var(--primary-text-color, #424242);
    font-size: clamp(38px, 10cqw, 60px);
    font-weight: 700;
    line-height: 1;
  }

  .battery-details__row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 12px;
    align-items: baseline;
    margin-bottom: 8px;
  }

  .battery-details__label {
    color: var(--secondary-text-color, #666666);
    font-size: clamp(12px, 3.2cqw, 14px);
    white-space: normal;
    overflow-wrap: anywhere;
  }

  .battery-details__value {
    color: var(--primary-text-color, #424242);
    font-size: clamp(12px, 3.2cqw, 14px);
    font-weight: 600;
    text-align: right;
    white-space: nowrap;
  }

  .power-bar-wrapper {
    width: min(520px, calc(100% - 32px));
    margin: -30px auto 24px;
    padding-left: 20px;
    padding-right: 2px;
    box-sizing: border-box;
  }

  .power-bar-labels {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
    color: var(--secondary-text-color, #666666);
    font-size: 13px;
  }

  .power-bar {
    position: relative;
    width: 100%;
    height: 18px;
    overflow: hidden;
    background: rgba(127, 127, 127, 0.16);
    border-radius: 9px;
  }

  .power-bar-center {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    transform: translateX(-1px);
    background: var(--primary-text-color, #424242);
    opacity: 0.55;
    z-index: 2;
  }

  .power-bar-fill {
    position: absolute;
    top: 0;
    bottom: 0;
    transition: width 0.25s ease;
  }

  .power-bar-fill--charging {
    background: #4caf50;
  }

  .power-bar-fill--discharging {
    background: #ff9800;
  }

  .card-error {
    padding: 16px;
    color: var(--error-color, #db4437);
    font-weight: 600;
  }



  @container battery-card (max-width: 370px) {
    .card {
      --battery-width: clamp(85px, 26cqw, 120px);
      --summary-gap: 4px;
    }

    .battery-details__row {
      gap: 6px;
      margin-bottom: 6px;
    }

    .battery-details__soc {
      margin-bottom: 12px;
      font-size: 34px;
    }

    .battery-card-header {
      font-size: 24px;
    }

    .power-bar-labels {
      font-size: 10px;
    }
  }
`;