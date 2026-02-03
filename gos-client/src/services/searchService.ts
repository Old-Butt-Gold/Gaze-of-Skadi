import { apiClient } from '../api/apiClient';
import type { MatchFindDto, FindMatchesParams } from '../types/search';
import type {PlayerResponseDto, ProPlayerDto} from "../types/playerSearch.ts";

export const searchService = {
    findMatches: async (params: FindMatchesParams): Promise<MatchFindDto[]> => {

        const queryParams = new URLSearchParams();
        params.teamA.forEach(id => queryParams.append('teamA', id.toString()));
        params.teamB.forEach(id => queryParams.append('teamB', id.toString()));

        return apiClient.get(`/search/findMatches?${queryParams.toString()}`);
    },

    searchPlayers: async (q: string): Promise<PlayerResponseDto[]> => {
      return apiClient.get(`/players?q=${q}`);
    },

    searchProPlayers: async (q: string): Promise<ProPlayerDto[]> => {
      return apiClient.get(`/proplayers?q=${q}`);
    }
};
