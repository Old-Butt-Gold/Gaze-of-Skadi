import { useMemo } from 'react';
import { useTeams } from './queries/useTeams';
import {useTeamsStore} from "../store/teamStore.ts";

const ITEMS_PER_PAGE = 20;

export const useTeamsLogic = () => {
  const { data: teams, isLoading, isError, refetch } = useTeams();

  const {
    searchQuery, sortBy, sortDirection, currentPage,
    setSearchQuery, setSortBy, toggleSortDirection, setCurrentPage
  } = useTeamsStore();

  const processedData = useMemo(() => {
    if (!teams) return { data: [], totalCount: 0 };

    // 1. Filter
    const result = teams.filter(t =>
      (t.name ? t.name.toLowerCase().includes(searchQuery.toLowerCase()) : false) ||
      (t.tag ? t.tag.toLowerCase().includes(searchQuery.toLowerCase()) : false)
    );

    // 2. Sort
    result.sort((a, b) => {
      // Множитель: 1 для ASC, -1 для DESC
      const modifier = sortDirection === 'asc' ? 1 : -1;

      switch (sortBy) {
        case 'rating':
          return (a.rating - b.rating) * modifier;

        case 'winrate': {
          const wrA = (a.wins + a.losses) > 0 ? a.wins / (a.wins + a.losses) : 0;
          const wrB = (b.wins + b.losses) > 0 ? b.wins / (b.wins + b.losses) : 0;
          return (wrA - wrB) * modifier;
        }

        case 'activity':
          return (a.lastMatchTime - b.lastMatchTime) * modifier;

        default:
          return 0;
      }
    });

    // 3. Assign Ranks
    // Важно: ранк всегда должен быть 1..N относительно текущего отображения
    const rankedResult = result.map((team, index) => ({
      ...team,
      rank: index + 1
    }));

    return { data: rankedResult, totalCount: result.length };
  }, [teams, searchQuery, sortBy, sortDirection]);

  // 4. Paginate
  const paginatedTeams = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return processedData.data.slice(start, start + ITEMS_PER_PAGE);
  }, [processedData.data, currentPage]);

  const totalPages = Math.ceil(processedData.totalCount / ITEMS_PER_PAGE);

  return {
    teams: paginatedTeams,
    totalCount: processedData.totalCount,
    isLoading,
    isError,
    refetch,
    totalPages,
    currentPage,
    searchQuery,
    sortBy,
    sortDirection, // Возвращаем для UI
    actions: {
      setSearchQuery,
      setSortBy,
      toggleSortDirection, // Возвращаем для UI
      setCurrentPage
    }
  };
};
