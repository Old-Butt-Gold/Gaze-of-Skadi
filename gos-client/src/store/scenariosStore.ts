import { create } from 'zustand';

export type ScenarioTab = 'items' | 'lanes';

interface ScenariosState {
  selectedHeroId: number | null;
  activeTab: ScenarioTab;

  searchQuery: string;
  selectedTime: number | 'all';

  setSelectedHeroId: (id: number | null) => void;
  setActiveTab: (tab: ScenarioTab) => void;
  setSearchQuery: (query: string) => void;
  setSelectedTime: (time: number | 'all') => void;
  resetFilters: () => void;
}

export const useScenariosStore = create<ScenariosState>((set) => ({
  selectedHeroId: null,
  activeTab: 'items',
  searchQuery: '',
  selectedTime: 'all',

  setSelectedHeroId: (id) => set({ selectedHeroId: id, searchQuery: '', selectedTime: 'all' }), // Сброс фильтров при смене героя
  setActiveTab: (tab) => set({ activeTab: tab, searchQuery: '', selectedTime: 'all' }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedTime: (time) => set({ selectedTime: time }),

  resetFilters: () => set({ searchQuery: '', selectedTime: 'all' }),
}));
