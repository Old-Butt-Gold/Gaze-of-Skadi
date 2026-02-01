import { apiClient } from '../api/apiClient';
import type { MatchFindDto, FindMatchesParams } from '../types/search';

export const searchService = {
    findMatches: async (params: FindMatchesParams): Promise<MatchFindDto[]> => {

        const queryParams = new URLSearchParams();
        params.teamA.forEach(id => queryParams.append('teamA', id.toString()));
        params.teamB.forEach(id => queryParams.append('teamB', id.toString()));

        return apiClient.get(`/search/findMatches?${queryParams.toString()}`);
    }
};