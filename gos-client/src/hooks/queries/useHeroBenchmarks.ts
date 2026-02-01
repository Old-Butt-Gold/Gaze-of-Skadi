import { useQuery } from '@tanstack/react-query';
import type {HeroBenchmarkDto} from "../../types/heroBenchmarks.ts";
import {heroService} from "../../services/heroService.ts";

export const useHeroBenchmarks = (heroId: number) => {
  return useQuery<HeroBenchmarkDto, Error>({
    queryKey: ['hero', heroId, 'benchmarks'],
    queryFn: () => heroService.getHeroBenchmarks(heroId),
    enabled: !!heroId,
    staleTime: 1000 * 60 * 30, // 30 mins
  });
};
