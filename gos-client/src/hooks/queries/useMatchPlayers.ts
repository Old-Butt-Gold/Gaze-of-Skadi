import { useQuery } from '@tanstack/react-query';
import { matchService } from '../../services/matchService';

export const useMatchPlayers = (matchId: number) => {
  return useQuery({
    queryKey: ['matchPlayers', matchId],
    queryFn: () => matchService.getMatchPlayers(matchId),
    enabled: !!matchId && matchId > 0,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
