import { apiClient } from '../api/apiClient';
import type { MatchFindDto, FindMatchesParams } from '../types/combo.ts';
import type {PlayerResponseDto, ProPlayerDto} from "../types/playerSearch.ts";
import type {PublicMatchDto, PublicMatchesParams} from "../types/publicMatches.ts";
import type {ProMatchDto} from "../types/proMatches.ts";

export const searchService = {
    findMatches: async (params: FindMatchesParams): Promise<MatchFindDto[]> => {

        const queryParams = new URLSearchParams();
        params.teamA.forEach(id => queryParams.append('teamA', id.toString()));
        params.teamB.forEach(id => queryParams.append('teamB', id.toString()));

        return apiClient.get(`/search/findMatches?${queryParams.toString()}`);
    },

    searchPlayers: async (q: string): Promise<PlayerResponseDto[]> => {
      return apiClient.get(`/search/players?q=${q}`);
    },

    searchProPlayers: async (q: string): Promise<ProPlayerDto[]> => {
      return apiClient.get(`/search/proplayers?q=${q}`);
    },

   getPublicMatches: async (params: PublicMatchesParams): Promise<PublicMatchDto[]> => {
     const cleanParams = Object.fromEntries(
       Object.entries(params).filter(([, value]) => value != null && value !== '')
     );

     return apiClient.get('/search/public', { params: cleanParams });
   },

  getProMatches: async (lessThanMatchId?: number | null): Promise<ProMatchDto[]> => {
    const params = lessThanMatchId ? { lessThanMatchId } : {};
    return apiClient.get('/search/pro', { params });
  }
};
