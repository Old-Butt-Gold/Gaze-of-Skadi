import { useQuery } from '@tanstack/react-query';
import type { PublicMatchesParams } from '../../types/publicMatches';
import {searchService} from "../../services/searchService.ts";

export const usePublicMatches = (params: PublicMatchesParams, isValid ?: boolean) => {
  return useQuery({
    queryKey: ['publicMatches', params],
    queryFn: () => searchService.getPublicMatches(params),
    staleTime: 1000 * 60, // 1 минута
    enabled: isValid ?? true,
    refetchOnWindowFocus: false,
  });
};
