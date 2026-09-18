/**
 * Available translation keys used by the card.
 */
export type TranslationKey =
  | "charging"
  | "discharging"
  | "idle"
  | "max_charge"
  | "max_discharge"
  | "current_capacity"
  | "current_power"
  | "estimated_time"
  | "estimated_time_to"
  | "target_reached";

/**
 * Defines the available card translations.
 */
const translations = {
  en: {
    charging: "Charging",
    discharging: "Discharging",
    idle: "Idle",
    max_charge: "Max. charge",
    max_discharge: "Max. discharge",
    current_capacity: "Current capacity",
    current_power: "Current power",
    estimated_time: "Estimated time",
    estimated_time_to: "Estimated time to",
    target_reached: "Target reached"
  },

  de: {
    charging: "Laden",
    discharging: "Entladen",
    idle: "Leerlauf",
    max_charge: "Max. Laden",
    max_discharge: "Max. Entladen",
    current_capacity: "Aktuelle Kapazität",
    current_power: "Aktuelle Leistung",
    estimated_time: "Geschätzte Zeit",
    estimated_time_to: "Geschätzte Zeit bis",
    target_reached: "Ziel erreicht"
  }
} as const;

/**
 * Default language used during local development.
 *
 * Home Assistant's active language will be used later.
 */
const currentLanguage: keyof typeof translations = "de";

/**
 * Returns the translated text for the requested key.
 */
export function translate(
  key: TranslationKey
): string {
  return translations[currentLanguage][key];
}