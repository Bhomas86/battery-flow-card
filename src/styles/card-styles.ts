import { css } from "lit";

/**
 * Contains the shared styles for the Battery Flow Card.
 */
export const cardStyles = css`
  :host {
    display: block;
  }

  .battery-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px;
  }

  .battery {
    width: 180px;
    height: 320px;
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

  .battery-soc-value {
    fill: var(--primary-text-color, #424242);
    font-size: 28px;
    font-weight: 700;
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

  .battery-state-label {
    fill: var(--secondary-text-color, #666666);
    font-size: 14px;
    font-weight: 500;
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
      opacity: 0;
    }

    15% {
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
  
  .power-bar-wrapper {
    width: min(360px, calc(100% - 48px));
    margin: -8px auto 24px;
  }

  .power-bar-labels {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
    font-size: 12px;
    color: var(--secondary-text-color, #666666);
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

  .development-controls {
    width: min(420px, calc(100% - 32px));
    margin: 0 auto 24px;
    padding: 16px;
    border: 1px solid rgba(127, 127, 127, 0.25);
    border-radius: 12px;
  }

  .development-controls label {
    display: grid;
    grid-template-columns: 100px 1fr 80px;
    gap: 12px;
    align-items: center;
    min-height: 42px;
  }

  .development-controls input[type="range"] {
    width: 100%;
  }

  .development-controls input[type="number"] {
    width: 100%;
    box-sizing: border-box;
  }

  .development-controls strong {
    text-align: right;
  }
`;