# Battery Flow Card v0.2.0

## What's new

### Entity details and device navigation (PR #3)
- Tap the **state of charge (SOC)**, **stored energy**, or **current battery power** to open the corresponding native Home Assistant entity dialog.
- Tap the **card title** to open the Battery Simulator device page when a Battery Simulator device is configured.
- Enable or disable entity and device links directly in the visual card editor (enabled by default).

### Smoother flow animation (PR #3)
- Added **animation-speed hysteresis** to avoid frequent speed changes when battery power fluctuates around flow-speed thresholds.

### Animated preview in the Home Assistant card picker
- An animated sample battery is now shown in Home Assistant's **Add Card** selection screen before the card has been configured.
- The preview illustrates charging at **1.80 kW** and **65% state of charge**, making the card easier to identify.
- The preview is limited to the card picker; dashboards and the card editor continue to use actual configured entities or setup guidance.

### Animated README examples
- Three examples show **charging (3.00 kW)**, **idle (0 W)**, and **discharging (230 W)**.
- Separate English and German animations, stacked vertically for mobile-friendly viewing.
- The previous static screenshot has been replaced.

## Installation
Install or update **Battery Flow Card** through HACS, or download `battery-flow-card.js` from the assets below for manual installation.

**Note:** The card picker preview uses demonstration values only. It does not change the actual battery measurements.
