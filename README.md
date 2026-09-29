# Battery Flow Card

![Home Assistant](https://img.shields.io/badge/Home%20Assistant-Custom%20Card-41BDF5?logo=home-assistant)
![GitHub License](https://img.shields.io/github/license/Bhomas86/battery-flow-card)
![GitHub Release](https://img.shields.io/github/v/release/Bhomas86/battery-flow-card)
![GitHub Stars](https://img.shields.io/github/stars/Bhomas86/battery-flow-card)
![GitHub Issues](https://img.shields.io/github/issues/Bhomas86/battery-flow-card)

Eine Custom Lovelace Card für Home Assistant zur übersichtlichen Darstellung
von Batteriespeichern, Lade- und Entladeleistung sowie SOC-Grenzen.

## Funktionen

- Anzeige des aktuellen SOC
- Animierte Lade- und Entladeanzeige
- Darstellung der aktuellen Batteriekapazität
- Anzeige der aktuellen Lade- bzw. Entladeleistung
- Min-/Max-SOC-Markierungen
- Geschätzte Zeit bis zum eingestellten SOC-Limit
- Leistungsanzeige relativ zur maximalen Lade-/Entladeleistung
- Responsive Darstellung für Desktop, Tablet und Smartphone
- Grafische Konfiguration direkt über den Home-Assistant-Karteneditor
- Unterstützung einer einzelnen bidirektionalen Power-Entity
- Unterstützung getrennter Lade- und Entlade-Entities
- Unterstützung fester oder Entity-basierter SOC- und Leistungsgrenzen
- Automatische Erkennung von Geräten der Battery-Simulator-Integration

## Battery Simulator

Die Karte unterstützt Geräte der Integration:

[hif2k1/battery_sim](https://github.com/hif2k1/battery_sim)

Im grafischen Editor kann ein Battery-Simulator-Gerät direkt ausgewählt werden.
Die benötigten Entities werden anschließend automatisch erkannt.

## Manuelle Konfiguration

Alternativ kann die Karte universell mit beliebigen Home-Assistant-Entities
konfiguriert werden.

Beispiel:

```yaml
type: custom:battery-flow-card
name: Batteriespeicher
soc_entity: sensor.battery_soc
charging_power_entity: sensor.battery_charging_power
discharging_power_entity: sensor.battery_discharging_power
capacity_kwh: 7
min_soc_entity: number.battery_min_soc
max_soc_entity: number.battery_max_soc
max_charge_power_entity: number.battery_max_charge_power
max_discharge_power_entity: number.battery_max_discharge_power
```

## Entwicklung

Das Projekt verwendet:
- TypeScript
- Lit
- SVG
- Vite

Build:
```bash
npm install
npm run check
npm run build
```

Die erzeugte Datei befindet sich anschließend unter:
```
dist/battery-flow-card.js
```

## Lizenz

Dieses Projekt steht unter der MIT-Lizenz.

## Unterstützung

Wenn dir das Projekt gefällt und du die weitere Entwicklung unterstützen möchtest:
