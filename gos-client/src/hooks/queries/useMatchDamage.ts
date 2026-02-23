import { useQuery } from '@tanstack/react-query';
import { matchService } from '../../services/matchService';

export const useMatchDamage = (matchId: number, isParsed: boolean) => {
  return useQuery({
    queryKey: ['matchDamage', matchId],
    queryFn: () => matchService.getMatchDamage(matchId),
    enabled: !!matchId && isParsed,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
