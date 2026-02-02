import { apiClient } from '../api/apiClient';
import type {SteamNewsDto, SteamPlayerDto} from "../types/steam.ts";

export const steamService = {
  getSteamPlayers: async (ids: string[]): Promise<SteamPlayerDto[]> => {
    if (!ids || ids.length === 0) return [];
    const queryString = ids.map(id => `ids=${id}`).join('&');
    return apiClient.get(`/steam/players-info?${queryString}`);
  },

  getSteamNews: async (count: number = 100): Promise<SteamNewsDto[]> => {
    return apiClient.get(`/steam/news?count=${count}`);
  }
};
