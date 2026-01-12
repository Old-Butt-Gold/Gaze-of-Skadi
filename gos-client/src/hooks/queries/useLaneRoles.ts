import { useQuery } from '@tanstack/react-query';
import { commonService } from '../../services/commonService';
import type { LaneRolesDto } from '../../types/scenarios';

export const useLaneRoles = (heroId: number | null) => {
  return useQuery<LaneRolesDto[], Error>({
    queryKey: ['scenarios', 'lanes', heroId],
    queryFn: () => commonService.getLaneRoles(heroId!),
    enabled: !!heroId,
    staleTime: 1000 * 60 * 60,
  });
};
