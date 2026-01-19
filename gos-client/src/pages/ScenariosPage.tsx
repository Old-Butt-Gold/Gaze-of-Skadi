import React, { useMemo } from 'react';
import clsx from 'clsx';
import { useHeroes } from '../hooks/queries/useHeroes';
import { useScenarioLogic } from '../hooks/useScenarioLogic'; // Наш новый хук
import { HeroCell } from '../components/heroes/HeroCell';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ScenarioTable } from '../components/scenarios/ScenarioTable';
import { LANE_OPTIONS } from '../utils/scenariosUtils';
import {Icon} from "../components/Icon.tsx";

export const ScenariosPage: React.FC = () => {
    // --- Custom Logic Hook ---
    const {
        isLoading, paginatedData, timeOptions, hasData,
        currentPage, totalPages,
        actions, filters
    } = useScenarioLogic();

    // --- Heroes Data for Select ---
    const { data: heroesDict, isLoading: isHeroesLoading } = useHeroes();

    const heroesList = useMemo(() => {
        if (!heroesDict) return [];
        return Object.values(heroesDict).sort((a, b) => a.localized_name.localeCompare(b.localized_name));
    }, [heroesDict]);
    const handleTabChange = (tab: 'items' | 'lanes') => actions.setTab(tab);
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => actions.setSearch(e.target.value);
    const handleLaneChange = (e: React.ChangeEvent<HTMLSelectElement>) => actions.setSearch(e.target.value);

    const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        actions.setTime(val === 'all' ? 'all' : Number(val));
    };

    // === RENDER: EMPTY STATE ===
    if (!filters.selectedHeroId) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in text-center space-y-8 bg-[#0f1114]">
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
                    <div className="relative w-24 h-24 bg-[#1a1d24] rounded-full flex items-center justify-center border border-[#2e353b] shadow-2xl">
                        <img src="/assets/images/medal_0.png" alt="" className="w-12 h-12 opacity-50 grayscale" />
                    </div>
                </div>

                <div className="space-y-3">
                    <h2 className="text-3xl font-serif font-black text-[#e7d291] tracking-wide uppercase">Select a Hero</h2>
                    <p className="text-[#808fa6] text-sm max-w-md mx-auto leading-relaxed">
                        Analyze detailed item timings and lane performance scenarios directly from ranked match data.
                    </p>
                </div>

                {isHeroesLoading ? (
                    <LoadingSpinner text="Summoning heroes..." />
                ) : (
                    <select
                        className="select w-full max-w-xs bg-[#1a1d24] border border-[#2e353b] text-white focus:border-[#4a5568] focus:outline-none"
                        onChange={(e) => actions.setHero(Number(e.target.value))}
                        defaultValue=""
                    >
                        <option value="" disabled>Choose Hero...</option>
                        {heroesList.map(h => (
                            <option key={h.id} value={h.id}><Icon src={h.icon} size={5}/>{h.localized_name}</option>
                        ))}
                    </select>
                )}
            </div>
        );
    }

    // === RENDER: MAIN CONTENT ===
    return (
        <div className="w-full space-y-6 animate-fade-in pb-20">

            {/* Control Panel */}
            <div className="bg-[#1a1d24] rounded-lg border border-[#2e353b] p-5 sticky top-20 z-30 shadow-xl">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">

                    {/* Hero Info */}
                    <div className="flex items-center gap-4">
                        <HeroCell heroId={filters.selectedHeroId} />
                        <div>
                            <h2 className="text-lg font-serif font-bold text-[#f0f0f0] tracking-wide leading-tight uppercase">
                                Scenario Analysis
                            </h2>
                            <button
                                onClick={() => actions.setHero(null)}
                                className="text-xs text-[#596b85] hover:text-[#e7d291] transition-colors font-medium flex items-center gap-1"
                            >
                                ← Change Hero
                            </button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-3 flex-grow xl:justify-end">

                        {/* Tab Switcher */}
                        <div className="join border border-[#2e353b] bg-[#121417]">
                            <button
                                className={clsx("join-item btn btn-sm border-none font-bold text-xs uppercase tracking-wider", filters.activeTab === 'items' ? "bg-[#2e353b] text-white" : "bg-transparent text-[#58606e] hover:bg-[#1a1d24]")}
                                onClick={() => handleTabChange('items')}
                            >
                                Items
                            </button>
                            <button
                                className={clsx("join-item btn btn-sm border-none font-bold text-xs uppercase tracking-wider", filters.activeTab === 'lanes' ? "bg-[#2e353b] text-white" : "bg-transparent text-[#58606e] hover:bg-[#1a1d24]")}
                                onClick={() => handleTabChange('lanes')}
                            >
                                Lanes
                            </button>
                        </div>

                        {/* Search / Lane Select */}
                        {filters.activeTab === 'items' ? (
                            <input
                                type="text"
                                placeholder="SEARCH ITEM..."
                                className="input input-sm input-bordered w-full sm:w-56 bg-[#121417] border-[#2e353b] text-white placeholder-[#454c59] focus:border-[#4a5568] focus:outline-none uppercase text-xs tracking-wider font-bold"
                                value={filters.searchQuery}
                                onChange={handleSearchChange}
                            />
                        ) : (
                            <select
                                className="select select-sm select-bordered w-full sm:w-56 bg-[#121417] border-[#2e353b] text-white focus:border-[#4a5568] focus:outline-none text-xs tracking-wider font-bold"
                                onChange={handleLaneChange}
                                value={filters.searchQuery} // Используем searchQuery для хранения выбранного lane name
                            >
                                <option value="">All lanes</option>
                                {LANE_OPTIONS.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        )}

                        {/* Time Select */}
                        <select
                            className="select select-sm select-bordered w-full sm:w-48 bg-[#121417] border-[#2e353b] text-white focus:border-[#4a5568] focus:outline-none text-xs tracking-wider font-bold font-mono"
                            value={filters.selectedTime}
                            onChange={handleTimeChange}
                        >
                            <option value="all">Any time</option>
                            {timeOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-[#1a1d24] rounded-lg border border-[#2e353b] overflow-hidden flex flex-col shadow-lg min-h-[500px]">
                {isLoading ? (
                    <div className="flex-grow flex items-center justify-center">
                        <LoadingSpinner text="ANALYZING BATTLE DATA..." />
                    </div>
                ) : !hasData ? (
                    <div className="flex-grow flex flex-col items-center justify-center text-[#454c59] py-20">
                        <p className="font-serif text-xl tracking-wider mb-2">NO SCENARIOS FOUND</p>
                        <p className="text-xs uppercase tracking-widest opacity-60">Adjust filters to see results</p>
                    </div>
                ) : (
                    <>
                        <ScenarioTable data={paginatedData} />

                        {/* Footer Pagination */}
                        <div className="mt-auto border-t border-[#2e353b] p-3 bg-[#15171c] flex items-center justify-between sticky bottom-0">
                            <span className="text-[10px] font-bold text-[#58606e] uppercase tracking-wider pl-2">
                                PAGE <span className="text-white">{currentPage}</span> OF {totalPages}
                            </span>
                            <div className="join">
                                <button
                                    onClick={() => actions.setPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="join-item btn btn-xs h-8 bg-[#1a1d24] border-[#2e353b] text-[#808fa6] hover:bg-[#232730] hover:text-white disabled:opacity-30 disabled:bg-transparent"
                                >
                                    PREV
                                </button>
                                <button
                                    onClick={() => actions.setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="join-item btn btn-xs h-8 bg-[#1a1d24] border-[#2e353b] text-[#808fa6] hover:bg-[#232730] hover:text-white disabled:opacity-30 disabled:bg-transparent"
                                >
                                    NEXT
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
