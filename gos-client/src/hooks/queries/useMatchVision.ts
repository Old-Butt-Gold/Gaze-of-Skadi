import { useQuery } from '@tanstack/react-query';
import { matchService } from '../../services/matchService';

export const useMatchVision = (matchId: number, isParsed: boolean) => {
  return useQuery({
    queryKey: ['matchVision', matchId],
    queryFn: () => matchService.getMatchVision(matchId),
    enabled: !!matchId && isParsed,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
