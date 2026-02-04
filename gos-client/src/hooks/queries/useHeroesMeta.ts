import { useQuery } from '@tanstack/react-query';
import { stratzService } from '../../services/stratzService';
import type {HeroesMetaDto} from "../../types/heroesMeta.ts";

export const useHeroesMeta = () => {
  return useQuery<HeroesMetaDto, Error>({
    queryKey: ['heroesMeta'],
    queryFn: stratzService.getHeroesMeta,
    staleTime: 1000 * 60 * 30,
  });
};
