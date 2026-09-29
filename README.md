# Battery Flow Card

![Home Assistant](https://img.shields.io/badge/Home%20Assistant-Custom%20Card-41BDF5?logo=home-assistant)
![GitHub License](https://img.shields.io/github/license/Bhomas86/battery-flow-card)
![GitHub Release](https://img.shields.io/github/v/release/Bhomas86/battery-flow-card)
![GitHub Stars](https://img.shields.io/github/stars/Bhomas86/battery-flow-card)
![GitHub Issues](https://img.shields.io/github/issues/Bhomas86/battery-flow-card)

Eine Custom Lovelace Card für Home Assistant zur übersichtlichen Darstellung
von Batteriespeichern, Lade- und Entladeleistung sowie SOC-Grenzen.

## Vorschau

![Battery Flow Card Beispiel](/images/Battery-Flow-Card.jpg)

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
- Mehrsprachige Oberfläche

## Konfigurationsmöglichkeiten

Die Karte kann vollständig über den grafischen Home-Assistant-Karteneditor eingerichtet werden.

### Power

Für die aktuelle Batterie-Leistung stehen zwei Varianten zur Verfügung:

- **Bidirectional power entity**  
  Eine einzelne Entity liefert Laden und Entladen über das Vorzeichen des Leistungswerts.

- **Separate charging/discharging entities**  
  Je eine eigene Entity für Lade- und Entladeleistung.

Im Editor kann über **Use split power entities** zwischen beiden Varianten umgeschaltet werden. Nicht benötigte Felder werden automatisch ausgeblendet.

### SOC limits

Auch die minimalen und maximalen SOC-Grenzen können auf zwei Arten konfiguriert werden:

- **Feste Werte**  
  Minimum und Maximum werden direkt in Prozent eingetragen.

- **SOC limit entities**  
  Minimum und Maximum werden aus Home-Assistant-Entities gelesen.

Über **Use SOC limit entities** wird zwischen beiden Varianten umgeschaltet.

### Power limits

Für die maximale Lade- und Entladeleistung stehen ebenfalls zwei Varianten zur Verfügung:

- **Feste Werte**  
  Maximale Lade- und Entladeleistung werden direkt eingetragen.

- **Power limit entities**  
  Die Werte werden aus Home-Assistant-Entities gelesen.

Über **Use power limit entities** wird zwischen beiden Varianten umgeschaltet.

## Sprachen

Aktuell stehen folgende Übersetzungen zur Verfügung:

- Deutsch
- Englisch

Weitere Sprachen können später ergänzt werden.

## Battery Simulator

Die Karte unterstützt Geräte der Integration:

[hif2k1/battery_sim](https://github.com/hif2k1/battery_sim)

Im grafischen Editor kann ein Battery-Simulator-Gerät direkt ausgewählt werden.
Die benötigten Entities und Werte werden anschließend automatisch erkannt.

Dadurch ist für Battery-Simulator-Geräte keine manuelle Zuordnung der einzelnen Batterie-Entities notwendig.

## Manuelle Konfiguration

Alternativ kann die Karte universell mit beliebigen Home-Assistant-Entities
konfiguriert werden.

Beispiel mit getrennten Lade- und Entlade-Entities sowie Entity-basierten Grenzwerten:

```yaml
type: custom:battery-flow-card
name: Batteriespeicher

soc_entity: sensor.battery_soc

use_split_power_entities: true
charging_power_entity: sensor.battery_charging_power
discharging_power_entity: sensor.battery_discharging_power

capacity_kwh: 7

use_soc_limit_entities: true
min_soc_entity: number.battery_min_soc
max_soc_entity: number.battery_max_soc

use_power_limit_entities: true
max_charge_power_entity: number.battery_max_charge_power
max_discharge_power_entity: number.battery_max_discharge_power
```

Beispiel für ein Battery-Simulator-Gerät:

```yaml
type: custom:battery-flow-card
use_battery_sim_device: true
battery_sim_device: YOUR_DEVICE_ID
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

```text
dist/battery-flow-card.js
```

## Lizenz

Dieses Projekt steht unter der MIT-Lizenz.

## Unterstützung

Wenn dir das Projekt gefällt und du die weitere Entwicklung unterstützen möchtest, kannst du das Projekt über GitHub unterstützen.
