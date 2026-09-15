/**
 * Available translation keys used by the card.
 */
export type TranslationKey =
  | "charging"
  | "discharging"
  | "idle"
  | "max_charge"
  | "max_discharge";

/**
 * Defines the available card translations.
 */
const translations = {
  en: {
    charging: "Charging",
    discharging: "Discharging",
    idle: "Idle",
    max_charge: "Max. charge",
    max_discharge: "Max. discharge"
  },

  de: {
    charging: "Laden",
    discharging: "Entladen",
    idle: "Leerlauf",
    max_charge: "Max. Laden",
    max_discharge: "Max. Entladen"
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