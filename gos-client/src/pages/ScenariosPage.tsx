import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import { useHeroes } from '../hooks/queries/useHeroes';
import { useScenariosStore } from '../store/scenariosStore';
import { HeroCell } from '../components/heroes/HeroCell';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorDisplay } from '../components/ui/ErrorDisplay';
import {formatTimeRange} from '../utils/formatUtils';
import { isItemTiming } from '../utils/typeGuards';
import { ScenarioTable } from '../components/scenarios/ScenarioTable';
import { LANE_OPTIONS } from '../utils/scenariosUtils';
import {useLaneRoles} from "../hooks/queries/useLaneRoles.ts";
import {useItemTimings} from "../hooks/queries/useItemTimings.ts";
import type {ItemTimingDto, LaneRolesDto} from "../types/scenarios.ts";
import {Icon} from "../components/Icon.tsx";

const ITEMS_PER_PAGE = 20;

export const ScenariosPage: React.FC = () => {
    const {
        selectedHeroId, activeTab, searchQuery, selectedTime,
        setSelectedHeroId, setActiveTab, setSearchQuery, setSelectedTime
    } = useScenariosStore();

    // === LOCAL STATE ===
    const [currentPage, setCurrentPage] = useState(1);

    // Local State specific for Lane Filter (since SearchQuery is string, but Lane Enum is number)
    const [selectedLaneFilter, setSelectedLaneFilter] = useState<number | 'all'>('all');

    // === QUERIES ===
    const { data: heroesDict, isLoading: isHeroesLoading } = useHeroes();

    const {
        data: itemsData,
        isLoading: isItemsLoading,
        isError: isItemsError
    } = useItemTimings(selectedHeroId);

    const {
        data: lanesData,
        isLoading: isLanesLoading,
        isError: isLanesError
    } = useLaneRoles(selectedHeroId);

    // === HANDLERS (Reset Pagination here to fix ESLint) ===
    const handleTabChange = (tab: 'items' | 'lanes') => {
        setActiveTab(tab);
        setCurrentPage(1); // Reset page
        setSearchQuery(''); // Reset search
        setSelectedTime('all'); // Reset time
    };

    const handleHeroChange = (id: number) => {
        setSelectedHeroId(id);
        setCurrentPage(1);
    };

    const handleSearchChange = (val: string) => {
        setSearchQuery(val);
        setCurrentPage(1);
    };

    const handleLaneFilterChange = (val: string) => {
        setSelectedLaneFilter(val === 'all' ? 'all' : Number(val));
        setCurrentPage(1);
    };

    const handleTimeChange = (val: string) => {
        setSelectedTime(val === 'all' ? 'all' : Number(val));
        setCurrentPage(1);
    };

    // === COMPUTED DATA ===

    const heroesList = useMemo(() => {
        if (!heroesDict) return [];
        return Object.values(heroesDict).sort((a, b) => a.localized_name.localeCompare(b.localized_name));
    }, [heroesDict]);

    const currentRawData = activeTab === 'items' ? itemsData : lanesData;
    const isLoading = activeTab === 'items' ? isItemsLoading : isLanesLoading;
    const isError = activeTab === 'items' ? isItemsError : isLanesError;

    // 1. Time Ranges Logic
    const timeOptions = useMemo(() => {
        if (!currentRawData) return [];

        // Получаем уникальные отсортированные времена
        const times = Array.from(new Set(currentRawData.map(d => d.time))).sort((a, b) => a - b);

        // Формируем красивые лейблы диапазонов
        return times.map((time, index) => {
            const prevTime = index > 0 ? times[index - 1] : 0;
            // Лейбл: "0:00 - 7:30" (если это первый элемент, то от 0)
            const label = formatTimeRange(prevTime, time);
            return { value: time, label: label };
        });
    }, [currentRawData]);

    // 2. Filtering & Sorting
    const filteredData = useMemo(() => {
        if (!currentRawData) return [];
        let data = [...currentRawData];

        // Filter: Time
        if (selectedTime !== 'all') {
            data = data.filter(d => d.time === selectedTime);
        }

        if (activeTab === 'items') {
            // Filter: Search Text (Items)
            if (searchQuery) {
                const q = searchQuery.toLowerCase();
                data = data.filter(d => isItemTiming(d) && d.item.toLowerCase().includes(q));
            }
        } else {
            // Filter: Lane Select (Lanes)
            if (selectedLaneFilter !== 'all') {
                data = data.filter(d => !isItemTiming(d) && d.laneRole.value === selectedLaneFilter);
            }
        }

        // Sorting: Frequency DESC -> WinRate DESC -> Time ASC
        return data.sort((a, b) => {
            if (b.games !== a.games) return b.games - a.games;
            const wrA = a.wins / a.games;
            const wrB = b.wins / b.games;
            return wrB - wrA || a.time - b.time;
        });
    }, [currentRawData, selectedTime, searchQuery, selectedLaneFilter, activeTab]);

    // 3. Pagination
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredData.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredData, currentPage]);

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);


    // === RENDER ===

    if (!selectedHeroId) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in text-center space-y-6">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4 shadow-inner ring-8 ring-slate-50">
                    <img src="/assets/images/medal_0.png" alt="Select" className="w-12 h-12 opacity-40 grayscale" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Hero Scenarios</h2>
                    <p className="text-slate-500 max-w-md mx-auto">Select a hero to unlock item timings and lane performance data.</p>
                </div>
                {isHeroesLoading ? <LoadingSpinner text="Loading heroes..." /> : (
                    <select
                        className="select select-bordered w-full max-w-xs bg-white shadow-lg text-slate-700 font-bold"
                        onChange={(e) => handleHeroChange(Number(e.target.value))}
                        defaultValue=""
                    >
                        <option value="" disabled>Choose Hero...</option>
                        {heroesList.map(h =>
                            <option key={h.id} value={h.id}><Icon src={h.icon} size={5}/>{h.localized_name}</option>)}
                    </select>
                )}
            </div>
        );
    }

    return (
        <div className="w-full space-y-6 animate-fade-in pb-20">

            {/* Control Panel */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sticky top-20 z-30 backdrop-blur-md bg-white/90">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">

                    {/* Left: Hero Info */}
                    <div className="flex items-center gap-4 group">
                        <HeroCell heroId={selectedHeroId} />
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 leading-tight">Scenario Analysis</h2>
                            <button onClick={() => setSelectedHeroId(null)} className="text-xs text-blue-600 hover:underline font-medium">Change Hero</button>
                        </div>
                    </div>

                    {/* Right: Filters */}
                    <div className="flex flex-col sm:flex-row gap-3 flex-grow xl:justify-end">

                        {/* 1. Tab Switcher */}
                        <div className="join shadow-sm border border-slate-200 h-10">
                            <button
                                className={clsx("join-item btn btn-sm h-full px-5 border-none", activeTab === 'items' ? "bg-slate-800 text-white hover:bg-slate-700" : "bg-white hover:bg-slate-50 text-slate-500")}
                                onClick={() => handleTabChange('items')}
                            >
                                Items
                            </button>
                            <button
                                className={clsx("join-item btn btn-sm h-full px-5 border-none", activeTab === 'lanes' ? "bg-slate-800 text-white hover:bg-slate-700" : "bg-white hover:bg-slate-50 text-slate-500")}
                                onClick={() => handleTabChange('lanes')}
                            >
                                Lanes
                            </button>
                        </div>

                        {/* 2. Context Filter (Search or Select) */}
                        {activeTab === 'items' ? (
                            <input
                                type="text"
                                placeholder="Search Item..."
                                className="input input-sm h-10 input-bordered w-full sm:w-56 bg-slate-50 focus:bg-white transition-colors"
                                value={searchQuery}
                                onChange={(e) => handleSearchChange(e.target.value)}
                            />
                        ) : (
                            <select
                                className="select select-sm h-10 select-bordered w-full sm:w-56 bg-slate-50 focus:bg-white"
                                onChange={(e) => handleLaneFilterChange(e.target.value)}
                                value={selectedLaneFilter}
                            >
                                <option value="all">All Lanes</option>
                                {LANE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                            </select>
                        )}

                        {/* 3. Time Filter (Ranges) */}
                        <select
                            className="select select-sm h-10 select-bordered w-full sm:w-48 bg-slate-50 focus:bg-white font-mono text-xs"
                            value={selectedTime}
                            onChange={(e) => handleTimeChange(e.target.value)}
                        >
                            <option value="all">Any Time</option>
                            {timeOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Table Area */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden min-h-[400px] flex flex-col">
                {isLoading ? (
                    <div className="flex-grow flex items-center justify-center"><LoadingSpinner text="Analyzing..." /></div>
                ) : isError ? (
                    <div className="flex-grow flex items-center justify-center"><ErrorDisplay message="Data load failed." /></div>
                ) : filteredData.length === 0 ? (
                    <div className="flex-grow flex flex-col items-center justify-center text-slate-400 py-20">
                        <p className="font-medium text-lg">No scenarios found</p>
                        <p className="text-sm opacity-70">Adjust filters to see results</p>
                    </div>
                ) : (
                    <ScenarioTable data={paginatedData as (ItemTimingDto | LaneRolesDto)[]} />
                )}

                {/* Footer Pagination */}
                {filteredData.length > 0 && (
                    <div className="border-t border-slate-100 p-3 bg-slate-50/50 flex items-center justify-between sticky bottom-0 backdrop-blur-sm">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-2">
                            Page {currentPage} of {totalPages}
                        </span>
                        <div className="join shadow-sm">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="join-item btn btn-xs h-8 bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            >
                                Prev
                            </button>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="join-item btn btn-xs h-8 bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
