/**
 * Minimal Home Assistant state representation required by this card.
 */
export interface HassEntity {
  state: string;
  attributes: Record<string, unknown>;
}

/**
 * Minimal Home Assistant object required by this card.
 */
export interface HomeAssistant {
  states: Record<string, HassEntity>;
  language?: string;
}