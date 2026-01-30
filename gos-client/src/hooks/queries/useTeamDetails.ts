import { useQuery } from '@tanstack/react-query';
import { teamService } from '../../services/teamService';

export const useTeamDetails = (teamId: number) => {
  // Common config
  const config = {
    enabled: !!teamId && !isNaN(teamId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  };

  const teamQuery = useQuery({
    queryKey: ['team', teamId],
    queryFn: () => teamService.getTeamById(teamId),
    ...config,
  });

  const matchesQuery = useQuery({
    queryKey: ['team', teamId, 'matches'],
    queryFn: () => teamService.getTeamMatches(teamId),
    ...config,
  });

  const playersQuery = useQuery({
    queryKey: ['team', teamId, 'players'],
    queryFn: () => teamService.getTeamPlayers(teamId),
    ...config,
  });

  const heroesQuery = useQuery({
    queryKey: ['team', teamId, 'heroes'],
    queryFn: () => teamService.getTeamHeroes(teamId),
    ...config,
  });

  return {
    team: teamQuery.data,
    matches: matchesQuery.data,
    players: playersQuery.data,
    heroes: heroesQuery.data,
    isLoading: teamQuery.isLoading || matchesQuery.isLoading || playersQuery.isLoading || heroesQuery.isLoading,
    isError: teamQuery.isError || matchesQuery.isError || playersQuery.isError || heroesQuery.isError,
  };
};
