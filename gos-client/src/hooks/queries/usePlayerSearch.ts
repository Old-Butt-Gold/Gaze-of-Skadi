import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {searchService} from "../../services/searchService.ts";

export const usePlayerSearch = (initialQuery: string) => {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1000);
    return () => clearTimeout(timer);
  }, [query]);

  const isEnabled = debouncedQuery.length >= 3;

  // Запрос 1: Про игроки
  const proQuery = useQuery({
    queryKey: ['search', 'pro', debouncedQuery],
    queryFn: () => searchService.searchProPlayers(debouncedQuery),
    enabled: isEnabled,
    staleTime: 1000 * 60 * 5,
  });

  // Запрос 2: Обычные игроки
  const publicQuery = useQuery({
    queryKey: ['search', 'public', debouncedQuery],
    queryFn: () => searchService.searchPlayers(debouncedQuery),
    enabled: isEnabled,
    staleTime: 1000 * 60 * 5,
  });

  return {
    query,
    setQuery,
    debouncedQuery,
    isSearching: isEnabled && (proQuery.isLoading || publicQuery.isLoading),
    proPlayers: proQuery.data || [],
    publicPlayers: publicQuery.data || [],
    error: proQuery.error || publicQuery.error
  };
};
