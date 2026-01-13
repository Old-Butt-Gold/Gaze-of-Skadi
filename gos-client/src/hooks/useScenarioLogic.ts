import { useMemo, useState } from 'react';
import {type ScenarioTab, useScenariosStore} from '../store/scenariosStore';
import { isItemTiming } from '../utils/typeGuards';
import { formatTimeRange } from '../utils/formatUtils';
import {useItemTimings} from "./queries/useItemTimings.ts";
import {useLaneRoles} from "./queries/useLaneRoles.ts";
import {useItems} from "./queries/useItems.ts";

const ITEMS_PER_PAGE = 20;

export const useScenarioLogic = () => {
  // 1. Store State
  const {
    selectedHeroId, activeTab, searchQuery, selectedTime,
    setSelectedHeroId, setActiveTab, setSearchQuery, setSelectedTime
  } = useScenariosStore();

  const { getItem } = useItems();

  // 2. Local State
  const [currentPage, setCurrentPage] = useState(1);

  // 3. Data Fetching
  // Загружаем только если выбран герой
  const { data: itemsData, isLoading: isItemsLoading } = useItemTimings(selectedHeroId);
  const { data: lanesData, isLoading: isLanesLoading } = useLaneRoles(selectedHeroId);

  const currentRawData = activeTab === 'items' ? itemsData : lanesData;
  const isLoading = activeTab === 'items' ? isItemsLoading : isLanesLoading;

  const handleTabChange = (tab: ScenarioTab) => {
    setActiveTab(tab);
    setCurrentPage(1); // Сброс
  };

  const handleHeroChange = (id: number | null) => {
    setSelectedHeroId(id);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleTimeChange = (val: number | 'all') => {
    setSelectedTime(val);
    setCurrentPage(1);
  };

  // === COMPUTED DATA ===

  // 4. Time Options (Distinct & Sorted)
  const timeOptions = useMemo(() => {
    if (!currentRawData) return [];
    // Set убирает дубликаты, затем сортируем числа
    const times = Array.from(new Set(currentRawData.map(d => d.time))).sort((a, b) => a - b);

    return times.map((time, index) => {
      const prevTime = index > 0 ? times[index - 1] : 0;
      return {
        value: time,
        label: formatTimeRange(prevTime, time)
      };
    });
  }, [currentRawData]);

  // 5. Filter & Sort (Heavy Logic)
  const filteredData = useMemo(() => {
    if (!currentRawData) return [];

    // Оптимизация: цепочка фильтров
    return currentRawData
      .filter(item => {
        // Filter by Time
        if (selectedTime !== 'all' && item.time !== selectedTime) return false;

        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          if (isItemTiming(item)) {
            const itemDictionary = getItem(item.item);
            if (itemDictionary !== null) {
              return itemDictionary.dname?.toLowerCase().includes(q);
            } else {
              return item.item.toLowerCase().includes(q);
            }
          } else {
            return item.laneRole.value.toString().includes(q);
          }
        }
        return true;
      })
      .sort((a, b) => {
        // 1. Популярность (Games)
        if (b.games !== a.games) return b.games - a.games;
        // 2. Винрейт (Winrate)
        const wrA = a.wins / a.games;
        const wrB = b.wins / b.games;
        if (wrB !== wrA) return wrB - wrA;
        // 3. Время (раньше - выше)
        return a.time - b.time;
      });
  }, [currentRawData, selectedTime, searchQuery, getItem]);

  // 6. Pagination
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  return {
    // Data
    isLoading,
    paginatedData,
    timeOptions,
    hasData: filteredData.length > 0,

    // Pagination info
    currentPage,
    totalPages,

    // Actions (Используй их в UI вместо прямых вызовов стора)
    actions: {
      setPage: setCurrentPage,
      setTab: handleTabChange,
      setHero: handleHeroChange,
      setSearch: handleSearchChange,
      setTime: handleTimeChange
    },

    // Current Filter State (для UI контролов)
    filters: {
      selectedHeroId,
      activeTab,
      searchQuery,
      selectedTime
    }
  };
};
