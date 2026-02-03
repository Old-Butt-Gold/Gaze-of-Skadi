import { useQuery } from '@tanstack/react-query';
import {searchService} from "../../services/searchService.ts";

export const useProMatches = (lessThanMatchId?: number | null) => {
  return useQuery({
    queryKey: ['proMatches', lessThanMatchId],
    queryFn: () => searchService.getProMatches(lessThanMatchId),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
