import { useQuery } from '@tanstack/react-query';
import { searchService } from '../../services/searchService';
import type {FindMatchesParams, MatchFindDto} from '../../types/search';

export const useFindMatches = (params: FindMatchesParams) => {
    return useQuery<MatchFindDto[], Error>({
        queryKey: ['findMatches', params.teamA, params.teamB],
        queryFn: () => searchService.findMatches(params),
        enabled: params.teamB.length > 0 || params.teamA.length > 0,
        staleTime: 1000 * 60 * 5,
        retry: false
    });
};