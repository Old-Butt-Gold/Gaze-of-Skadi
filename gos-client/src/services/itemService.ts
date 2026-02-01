import {apiClient} from "../api/apiClient.ts";
import type {ItemDictionary, ItemIdDictionary} from "../types/items.ts";

export const itemService = {
  getItemsByName: async (): Promise<ItemDictionary> => {
    return apiClient.get('resource/items');
  },

  getItemIds: async (): Promise<ItemIdDictionary> => {
    return apiClient.get('/resource/item-ids');
  },
};
