# Battery Flow Card

![Home Assistant](https://img.shields.io/badge/Home%20Assistant-Custom%20Card-41BDF5?logo=home-assistant)
![HACS](https://img.shields.io/badge/HACS-Compatible-41BDF5)
![GitHub Downloads](https://img.shields.io/github/downloads/Bhomas86/battery-flow-card/total)
![GitHub License](https://img.shields.io/github/license/Bhomas86/battery-flow-card)
![GitHub Release](https://img.shields.io/github/v/release/Bhomas86/battery-flow-card)
![GitHub Stars](https://img.shields.io/github/stars/Bhomas86/battery-flow-card)
![GitHub Issues](https://img.shields.io/github/issues/Bhomas86/battery-flow-card)

A custom Lovelace card for Home Assistant that provides a clear overview of
battery storage systems, charging and discharging power, and SOC limits.

## Installation

### HACS (recommended)

[![Open your Home Assistant instance and open this repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=Bhomas86&repository=battery-flow-card)

The easiest way to install and update the **Battery Flow Card** is through [HACS](https://hacs.xyz/).

1. Open **HACS** in Home Assistant.
2. Search for **Battery Flow Card**.
3. Open the entry and select **Download**.
4. Reload Home Assistant or your browser after installation.

HACS normally adds the required Lovelace resource automatically. If this does not happen, it can be added manually under  
**Settings → Dashboards → ⋮ → Resources**:

```text
/hacsfiles/battery-flow-card/battery-flow-card.js
```

Resource type:

```text
JavaScript Module
```

### Manual installation

1. Download `battery-flow-card.js` from the latest [GitHub Release](https://github.com/Bhomas86/battery-flow-card/releases/latest).
2. Copy the file, for example, to:

   ```text
   /config/www/battery-flow-card/battery-flow-card.js
   ```

3. Open in Home Assistant:

   **Settings → Dashboards → ⋮ → Resources**

4. Add a new resource:

   ```text
   /local/battery-flow-card/battery-flow-card.js
   ```

5. Select the resource type:

   ```text
   JavaScript Module
   ```

6. Reload the browser completely afterwards, if necessary using `Ctrl + F5`.

The card can then be added through the visual card editor or configured using YAML:

```yaml
type: custom:battery-flow-card
```

## Preview

![Battery Flow Card Example](/images/Battery-Flow-Card.jpg)

## Features

- Displays the current SOC
- Animated charging and discharging indicator
- Displays the current battery capacity
- Displays the current charging or discharging power
- Min./max. SOC markers
- Estimated time until the configured SOC limit is reached
- Power indicator relative to the maximum charging/discharging power
- Responsive layout for desktop, tablet, and smartphone
- Graphical configuration directly through the Home Assistant card editor
- Supports a single bidirectional power entity
- Supports separate charging and discharging entities
- Supports fixed or entity-based SOC and power limits
- Automatic detection of devices from the Battery Simulator integration
- Multilingual interface

## Languages

The card language automatically follows the currently configured system language in Home Assistant.

If no translation is available for the selected language, English is used automatically as the card language.

The following translations are currently available:

- German
- English
- Dutch
- French
- Polish
- Spanish
- Italian
- Swedish
- Portuguese
- Norwegian

Additional languages are welcome.

Simply open a GitHub Issue and include the following information:

- Language code, e.g. `EN` for English or `DE` for German
- Translations for the following terms:
  - Charging
  - Discharging
  - Idle
  - Max. charge
  - Max. discharge
  - Current capacity
  - Current power
  - Estimated time
  - Estimated time to
  - Target reached

## Configuration options

The card can be configured entirely through the graphical Home Assistant card editor.

Two configuration options are available:

### Battery Simulator

The card supports devices from the following integration:

[hif2k1/battery_sim](https://github.com/hif2k1/battery_sim)

A Battery Simulator device can be selected directly in the graphical editor.

The required entities and available limits are then detected and applied automatically.

This means that devices from the Battery Simulator integration normally do not require manual assignment of individual battery entities.

### Other batteries

For other battery storage systems, the required entities and limits can be assigned manually through the graphical editor.

#### Power

Two options are available for the current battery power:

- **Bidirectional power entity**  
  A single entity contains both charging and discharging power.

  The following convention applies:

  - Positive value = charging
  - Negative value = discharging

- **Separate charging/discharging entities**  
  One entity is used for charging power and another for discharging power.

Use **Use split power entities** to switch between the two options. Fields that are not required are hidden automatically.

#### SOC limits

The minimum and maximum SOC limits can be configured in two ways:

- **Fixed values**  
  Minimum and maximum are entered directly as percentages.

- **SOC limit entities**  
  Minimum and maximum are read from Home Assistant entities.

Use **Use SOC limit entities** to switch between the two options.

#### Power limits

The maximum charging and discharging power can also be configured in two ways:

- **Fixed values**  
  Maximum charging and discharging power are entered directly.

- **Power limit entities**  
  The values are read from Home Assistant entities.

Important: The maximum charging and discharging power values must always be specified as positive values.

Use **Use power limit entities** to switch between the two options.

## Manual configuration

Alternatively, the card can be configured universally with any Home Assistant entities.

Example using separate charging and discharging entities together with entity-based limits:

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

Example for a Battery Simulator device:

```yaml
type: custom:battery-flow-card
use_battery_sim_device: true
battery_sim_device: YOUR_DEVICE_ID
```

## Development

The project uses:

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

The generated file is located at:

```text
dist/battery-flow-card.js
```

## License

This project is licensed under the MIT License.

## Support

If you like this project and would like to support further development, you can support the project through GitHub.

---

# Deutsche Version

# Battery Flow Card

![Home Assistant](https://img.shields.io/badge/Home%20Assistant-Custom%20Card-41BDF5?logo=home-assistant)
![HACS](https://img.shields.io/badge/HACS-Compatible-41BDF5)
![GitHub Downloads](https://img.shields.io/github/downloads/Bhomas86/battery-flow-card/total)
![GitHub License](https://img.shields.io/github/license/Bhomas86/battery-flow-card)
![GitHub Release](https://img.shields.io/github/v/release/Bhomas86/battery-flow-card)
![GitHub Stars](https://img.shields.io/github/stars/Bhomas86/battery-flow-card)
![GitHub Issues](https://img.shields.io/github/issues/Bhomas86/battery-flow-card)

Eine Custom Lovelace Card für Home Assistant zur übersichtlichen Darstellung
von Batteriespeichern, Lade- und Entladeleistung sowie SOC-Grenzen.

## Installation

### HACS (empfohlen)

[![Open your Home Assistant instance and open this repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=Bhomas86&repository=battery-flow-card)


Die einfachste Möglichkeit zur Installation und Aktualisierung der **Battery Flow Card** ist über [HACS](https://hacs.xyz/).

1. Öffne **HACS** in Home Assistant.
2. Suche nach **Battery Flow Card**.
3. Öffne den Eintrag und wähle **Download**.
4. Lade Home Assistant bzw. den Browser nach der Installation neu.

HACS legt die benötigte Lovelace-Ressource normalerweise automatisch an. Falls dies nicht geschieht, kann sie unter  
**Einstellungen → Dashboards → ⋮ → Ressourcen** manuell ergänzt werden:

```text
/hacsfiles/battery-flow-card/battery-flow-card.js
```

Ressourcentyp:

```text
JavaScript-Modul
```

### Manuelle Installation

1. Lade `battery-flow-card.js` aus dem neuesten [GitHub Release](https://github.com/Bhomas86/battery-flow-card/releases/latest) herunter.
2. Kopiere die Datei beispielsweise nach:

   ```text
   /config/www/battery-flow-card/battery-flow-card.js
   ```

3. Öffne in Home Assistant:

   **Einstellungen → Dashboards → ⋮ → Ressourcen**

4. Füge eine neue Ressource hinzu:

   ```text
   /local/battery-flow-card/battery-flow-card.js
   ```

5. Wähle als Typ:

   ```text
   JavaScript-Modul
   ```

6. Lade den Browser anschließend vollständig neu, gegebenenfalls mit `Strg + F5`.

Danach kann die Karte über den visuellen Karteneditor hinzugefügt oder per YAML verwendet werden:

```yaml
type: custom:battery-flow-card
```

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

## Sprachen

Die Sprache der Karte richtet sich automatisch nach der aktuell eingestellten Systemsprache von Home Assistant.

Ist für die verwendete Sprache noch keine Übersetzung vorhanden, wird automatisch Englisch als Kartensprache verwendet.

Aktuell stehen folgende Übersetzungen zur Verfügung:

- Deutsch
- Englisch
- Niederländisch
- Französisch
- Polnisch
- Spanisch
- Italienisch
- Schwedisch
- Portugiesisch
- Norwegisch

Weitere Sprachen können gerne ergänzt werden.

Hierzu einfach ein GitHub Issue eröffnen und folgende Angaben mitsenden:

- Sprachkürzel, z. B. `EN` für Englisch oder `DE` für Deutsch
- Übersetzungen für folgende Begriffe:
  - Charging
  - Discharging
  - Idle
  - Max. charge
  - Max. discharge
  - Current capacity
  - Current power
  - Estimated time
  - Estimated time to
  - Target reached

## Konfigurationsmöglichkeiten

Die Karte kann vollständig über den grafischen Home-Assistant-Karteneditor eingerichtet werden.

Dabei stehen zwei Möglichkeiten zur Verfügung:

### Battery Simulator

Die Karte unterstützt Geräte der Integration:

[hif2k1/battery_sim](https://github.com/hif2k1/battery_sim)

Im grafischen Editor kann ein Battery-Simulator-Gerät direkt ausgewählt werden.

Die benötigten Entities sowie die vorhandenen Grenzwerte werden anschließend automatisch erkannt und übernommen.

Dadurch ist für Geräte der Battery-Simulator-Integration normalerweise keine manuelle Zuordnung der einzelnen Batterie-Entities notwendig.

### Andere Batterien

Für andere Batteriespeicher können die benötigten Entities und Grenzwerte manuell über den grafischen Editor zugeordnet werden.

#### Power

Für die aktuelle Batterie-Leistung stehen zwei Varianten zur Verfügung:

- **Bidirectional power entity**  
  Eine einzelne Entity enthält sowohl die Lade- als auch die Entladeleistung.

  Dabei gilt:

  - Positiver Wert = Laden
  - Negativer Wert = Entladen

- **Separate charging/discharging entities**  
  Je eine eigene Entity für Lade- und Entladeleistung.

Über **Use split power entities** kann zwischen beiden Varianten umgeschaltet werden. Nicht benötigte Felder werden automatisch ausgeblendet.

#### SOC limits

Die minimalen und maximalen SOC-Grenzen können auf zwei Arten konfiguriert werden:

- **Feste Werte**  
  Minimum und Maximum werden direkt in Prozent eingetragen.

- **SOC limit entities**  
  Minimum und Maximum werden aus Home-Assistant-Entities gelesen.

Über **Use SOC limit entities** kann zwischen beiden Varianten umgeschaltet werden.

#### Power limits

Die maximale Lade- und Entladeleistung kann ebenfalls auf zwei Arten konfiguriert werden:

- **Feste Werte**  
  Maximale Lade- und Entladeleistung werden direkt eingetragen.

- **Power limit entities**  
  Die Werte werden aus Home-Assistant-Entities gelesen.

Wichtig: Die Werte für maximale Lade- und Entladeleistung müssen immer als positive Werte angegeben werden.

Über **Use power limit entities** kann zwischen beiden Varianten umgeschaltet werden.

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
