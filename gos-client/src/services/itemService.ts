import {apiClient} from "../api/apiClient.ts";
import type {ItemDictionary} from "../types/items.ts";

export const itemService = {
  getItemsByName: async (): Promise<ItemDictionary> => {
    return apiClient.get('resource/items');
  },
};
