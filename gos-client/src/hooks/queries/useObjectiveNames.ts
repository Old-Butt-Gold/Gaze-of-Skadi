import { useQuery } from '@tanstack/react-query';
import { resourceService } from '../../services/resourceService';

export const useObjectiveNames = () => {
  return useQuery({
    queryKey: ['objectiveNames'],
    queryFn: () => resourceService.getObjectiveNames(),
    staleTime: 1000 * 60 * 60 * 24,
  });
};
