import { useQuery } from '@tanstack/react-query';
import { matchService } from '../../services/matchService';

export const useMatchItems = (matchId: number, isParsed: boolean) => {
  return useQuery({
    queryKey: ['matchItems', matchId],
    queryFn: () => matchService.getMatchItems(matchId),
    enabled: !!matchId && isParsed,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
