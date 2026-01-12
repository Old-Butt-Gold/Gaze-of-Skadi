import { useQuery } from '@tanstack/react-query';
import { commonService } from '../../services/commonService';
import type { LaneRolesDto } from '../../types/scenarios';

export const useLaneRoles = () => {
  return useQuery<LaneRolesDto[], Error>({
    queryKey: ['scenarios', 'lanes'],
    queryFn: commonService.getLaneRoles,
    staleTime: 1000 * 60 * 10,
  });
};
