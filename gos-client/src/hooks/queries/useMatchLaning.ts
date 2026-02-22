import { useQuery } from '@tanstack/react-query';
import { matchService } from '../../services/matchService';

export const useMatchLaning = (matchId: number, isParsed: boolean) => {
    return useQuery({
        queryKey: ['matchLaning', matchId],
        queryFn: () => matchService.getMatchLaning(matchId),
        enabled: !!matchId && isParsed,
        staleTime: 1000 * 60 * 60 * 24,
    });
};