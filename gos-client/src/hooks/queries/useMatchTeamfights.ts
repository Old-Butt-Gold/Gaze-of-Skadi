import { useQuery } from '@tanstack/react-query';
import { matchService } from '../../services/matchService';

export const useMatchTeamfights = (matchId: number, isParsed: boolean) => {
  return useQuery({
    queryKey: ['matchTeamfights', matchId],
    queryFn: () => matchService.getMatchTeamfights(matchId),
    enabled: !!matchId && isParsed,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
