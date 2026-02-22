import { useQuery } from '@tanstack/react-query';
import { matchService } from '../../services/matchService';

export const useMatchPerformances = (matchId: number, isParsed: boolean) => {
    return useQuery({
        queryKey: ['matchPerformances', matchId],
        queryFn: () => matchService.getMatchPerformances(matchId),
        enabled: !!matchId && isParsed,
        staleTime: 1000 * 60 * 60 * 24,
    });
};