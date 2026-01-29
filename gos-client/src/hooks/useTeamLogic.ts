import { useMemo } from 'react';
import {useTeamsStore} from "../store/teamStore.ts";
import {useTeams} from "./queries/useTeams.ts";

const ITEMS_PER_PAGE = 20;

export const useTeamsLogic = () => {
  const { data: teams, isLoading, isError, refetch } = useTeams();

  const {
    searchQuery, sortBy, currentPage,
    setSearchQuery, setSortBy, setCurrentPage
  } = useTeamsStore();

  const processedData = useMemo(() => {
    if (!teams) return { data: [], totalCount: 0 };

    // 1. Filter
    const result = teams.filter(t =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tag.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 2. Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'rating': return b.rating - a.rating;
        case 'winrate': {
          const wrA = (a.wins + a.losses) > 0 ? a.wins / (a.wins + a.losses) : 0;
          const wrB = (b.wins + b.losses) > 0 ? b.wins / (b.wins + b.losses) : 0;
          return wrB - wrA;
        }
        case 'activity': return b.lastMatchTime - a.lastMatchTime;
        case 'name': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });

    // 3. Assign Ranks (1-based index based on current sort)
    const rankedResult = result.map((team, index) => ({
      ...team,
      rank: index + 1
    }));

    return { data: rankedResult, totalCount: result.length };
  }, [teams, searchQuery, sortBy]);

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
    actions: {
      setSearchQuery,
      setSortBy,
      setCurrentPage
    }
  };
};
