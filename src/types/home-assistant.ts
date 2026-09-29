/**
 * Minimal Home Assistant state representation required by this card.
 */
export interface HassEntity {
  state: string;
  attributes: Record<string, unknown>;
}

/**
 * Minimal entity registry entry required by this card.
 */
export interface HassEntityRegistryEntry {
  entity_id: string;
  device_id?: string | null;
  platform?: string;
  name?: string | null;
  translation_key?: string | null;
}

/**
 * Minimal device registry entry required by this card.
 */
export interface HassDeviceRegistryEntry {
  id: string;
  name?: string | null;
  name_by_user?: string | null;
}

/**
 * Minimal Home Assistant object required by this card.
 */
export interface HomeAssistant {
  states: Record<string, HassEntity>;

  entities: Record<string, HassEntityRegistryEntry>;
  devices: Record<string, HassDeviceRegistryEntry>;

  language?: string;
}