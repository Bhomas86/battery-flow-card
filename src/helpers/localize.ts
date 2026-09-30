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
  },

  nl: {
    charging: "Opladen",
    discharging: "Ontladen",
    idle: "Inactief",
    max_charge: "Max. laden",
    max_discharge: "Max. ontladen",
    current_capacity: "Huidige capaciteit",
    current_power: "Huidig vermogen",
    estimated_time: "Geschatte tijd",
    estimated_time_to: "Geschatte tijd tot",
    target_reached: "Doel bereikt"
  },

  fr: {
    charging: "Charge",
    discharging: "Décharge",
    idle: "Inactif",
    max_charge: "Charge max.",
    max_discharge: "Décharge max.",
    current_capacity: "Capacité actuelle",
    current_power: "Puissance actuelle",
    estimated_time: "Temps estimé",
    estimated_time_to: "Temps estimé jusqu'à",
    target_reached: "Objectif atteint"
  },

  pl: {
    charging: "Ładowanie",
    discharging: "Rozładowywanie",
    idle: "Bezczynny",
    max_charge: "Maks. ładowanie",
    max_discharge: "Maks. rozładowanie",
    current_capacity: "Aktualna pojemność",
    current_power: "Aktualna moc",
    estimated_time: "Szacowany czas",
    estimated_time_to: "Szacowany czas do",
    target_reached: "Cel osiągnięty"
  },

  es: {
    charging: "Cargando",
    discharging: "Descargando",
    idle: "Inactivo",
    max_charge: "Carga máx.",
    max_discharge: "Descarga máx.",
    current_capacity: "Capacidad actual",
    current_power: "Potencia actual",
    estimated_time: "Tiempo estimado",
    estimated_time_to: "Tiempo estimado hasta",
    target_reached: "Objetivo alcanzado"
  },

  it: {
    charging: "Carica",
    discharging: "Scarica",
    idle: "Inattivo",
    max_charge: "Carica max.",
    max_discharge: "Scarica max.",
    current_capacity: "Capacità attuale",
    current_power: "Potenza attuale",
    estimated_time: "Tempo stimato",
    estimated_time_to: "Tempo stimato fino a",
    target_reached: "Obiettivo raggiunto"
  },

  sv: {
    charging: "Laddar",
    discharging: "Urladdar",
    idle: "Inaktiv",
    max_charge: "Max. laddning",
    max_discharge: "Max. urladdning",
    current_capacity: "Aktuell kapacitet",
    current_power: "Aktuell effekt",
    estimated_time: "Beräknad tid",
    estimated_time_to: "Beräknad tid till",
    target_reached: "Mål uppnått"
  },

  pt: {
    charging: "A carregar",
    discharging: "A descarregar",
    idle: "Inativo",
    max_charge: "Carga máx.",
    max_discharge: "Descarga máx.",
    current_capacity: "Capacidade atual",
    current_power: "Potência atual",
    estimated_time: "Tempo estimado",
    estimated_time_to: "Tempo estimado até",
    target_reached: "Objetivo alcançado"
  },

  nb: {
    charging: "Lader",
    discharging: "Lader ut",
    idle: "Inaktiv",
    max_charge: "Maks. lading",
    max_discharge: "Maks. utlading",
    current_capacity: "Nåværende kapasitet",
    current_power: "Nåværende effekt",
    estimated_time: "Estimert tid",
    estimated_time_to: "Estimert tid til",
    target_reached: "Mål nådd"
  }
} as const;

type SupportedLanguage = keyof typeof translations;

const FALLBACK_LANGUAGE: SupportedLanguage = "en";

/**
 * Resolves the Home Assistant language to a supported card language.
 *
 * Regional language codes such as "de-DE" or "en-GB" are reduced
 * to their base language. Unsupported languages fall back to English.
 */
function resolveLanguage(
  language?: string
): SupportedLanguage {
  if (!language) {
    return FALLBACK_LANGUAGE;
  }

  const normalizedLanguage = language
    .trim()
    .toLowerCase()
    .replace("_", "-");

  const baseLanguage =
    normalizedLanguage.split("-")[0];

  if (baseLanguage in translations) {
    return baseLanguage as SupportedLanguage;
  }

  return FALLBACK_LANGUAGE;
}

/**
 * Returns the translated text for the requested key.
 *
 * English is used as fallback when the Home Assistant language
 * is not supported by the card.
 */
export function translate(
  key: TranslationKey,
  language?: string
): string {
  const resolvedLanguage =
    resolveLanguage(language);

  return translations[resolvedLanguage][key];
}