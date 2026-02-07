import {apiClient} from "../api/apiClient.ts";
import type {ItemDictionary, ItemIdDictionary} from "../types/items.ts";
import type {HeroAbility} from "../types/heroAbility.ts";
import type {AbilityDictionary} from "../types/ability.ts";

export const resourceService = {
  getItemsByName: async (): Promise<ItemDictionary> => {
    return apiClient.get('resource/items');
  },

  getItemIds: async (): Promise<ItemIdDictionary> => {
    return apiClient.get('/resource/item-ids');
  },

  getHeroAbilities: async (): Promise<Record<string, HeroAbility>> => {
      return apiClient.get('/resource/hero-abilities');
  },

  getAbilities: async (): Promise<AbilityDictionary> => {
      return apiClient.get('/resource/abilities');
  }
};
