import { useQuery } from '@tanstack/react-query';
import { stratzService } from '../../services/stratzService';
import type {HeroMetaTimelineDto} from "../../types/heroMetaTimeline.ts";

export const useHeroMetaTimeline = (heroId: number) => {
  return useQuery<HeroMetaTimelineDto, Error>({
    queryKey: ['heroMetaTimeline', heroId],
    queryFn: () => stratzService.getHeroMetaTimeline(heroId),
    staleTime: 1000 * 60 * 60, // 1 час
    enabled: !!heroId
  });
};
