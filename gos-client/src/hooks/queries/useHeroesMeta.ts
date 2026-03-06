import { useQuery } from '@tanstack/react-query';
import { stratzService } from '../../services/stratzService';
import type {HeroesMetaDto} from "../../types/heroesMeta.ts";

export const useHeroesMeta = (days: number) => {
  return useQuery<HeroesMetaDto, Error>({
    queryKey: ['heroesMeta', days],
    queryFn: () => stratzService.getHeroesMeta(days),
    staleTime: 1000 * 60 * 30,
  });
};
