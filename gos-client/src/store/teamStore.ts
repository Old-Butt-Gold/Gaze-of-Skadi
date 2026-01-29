import { create } from 'zustand';

export type TeamSortOption = 'rating' | 'winrate' | 'activity'
export type SortDirection = 'asc' | 'desc';

interface TeamsState {
  searchQuery: string;
  sortBy: TeamSortOption;
  sortDirection: SortDirection; // Новое поле
  currentPage: number;

  setSearchQuery: (query: string) => void;
  setSortBy: (sort: TeamSortOption) => void;
  setSortDirection: (dir: SortDirection) => void; // Новый экшен
  toggleSortDirection: () => void; // Удобный переключатель
  setCurrentPage: (page: number) => void;
  resetFilters: () => void;
}

export const useTeamsStore = create<TeamsState>((set) => ({
  searchQuery: '',
  sortBy: 'rating',
  sortDirection: 'desc', // По умолчанию от большего к меньшему
  currentPage: 1,

  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
  setSortBy: (sort) => set({ sortBy: sort, currentPage: 1 }),

  setSortDirection: (dir) => set({ sortDirection: dir, currentPage: 1 }),

  toggleSortDirection: () => set((state) => ({
    sortDirection: state.sortDirection === 'asc' ? 'desc' : 'asc',
    currentPage: 1
  })),

  setCurrentPage: (page) => set({ currentPage: page }),

  resetFilters: () => set({ searchQuery: '', sortBy: 'rating', sortDirection: 'desc', currentPage: 1 }),
}));
