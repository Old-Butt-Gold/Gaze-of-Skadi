import { useQuery } from '@tanstack/react-query';
import { teamService } from '../../services/teamService';
import type {TeamDto} from '../../types/teams';

export const useTeams = () => {
  return useQuery<TeamDto[], Error>({
    queryKey: ['teams'],
    queryFn: teamService.getAllTeams,
    staleTime: 1000 * 60 * 5, // 5 минут кэша
  });
};
