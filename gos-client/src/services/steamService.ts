import { apiClient } from '../api/apiClient';
import type {SteamPlayerDto} from "../types/steam.ts";

export const steamService = {
  getSteamPlayers: async (ids: string[]): Promise<SteamPlayerDto[]> => {
    if (!ids || ids.length === 0) return [];
    const queryString = ids.map(id => `ids=${id}`).join('&');
    return apiClient.get(`/steam/steamplayers?${queryString}`);
  }
};
