import { create } from 'zustand';

export type TeamSortOption = 'rating' | 'winrate' | 'name' | 'activity';

interface TeamsState {
  searchQuery: string;
  sortBy: TeamSortOption;
  currentPage: number;

  setSearchQuery: (query: string) => void;
  setSortBy: (sort: TeamSortOption) => void;
  setCurrentPage: (page: number) => void;
  resetFilters: () => void;
}

export const useTeamsStore = create<TeamsState>((set) => ({
  searchQuery: '',
  sortBy: 'rating',
  currentPage: 1,

  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }), // Reset page on search
  setSortBy: (sort) => set({ sortBy: sort, currentPage: 1 }), // Reset page on sort change
  setCurrentPage: (page) => set({ currentPage: page }),

  resetFilters: () => set({ searchQuery: '', sortBy: 'rating', currentPage: 1 }),
}));
