import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import { useHeroMatchups } from '../../../hooks/queries/useHeroMatchups';
import { useHeroes } from '../../../hooks/queries/useHeroes';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { ErrorDisplay } from '../../ui/ErrorDisplay';
import { calculateWinRate, getWinRateColor } from '../../../utils/heroStatsUtils';
import type { SortDirection } from "../../../store/teamStore";
import type { HeroInfo } from "../../../types/heroes.ts";
import { SortIndicator } from "../SortIndicator.tsx";
import { HeroCell } from "../HeroCell.tsx";
import { Pagination } from '../../ui/Pagination'; // Импорт

interface Props {
    hero: HeroInfo;
}

type SortKey = 'games' | 'winrate' | 'hero';
const PAGE_SIZE = 20;

export const HeroMatchupsTab: React.FC<Props> = ({ hero }) => {
    const { data: matchups, isLoading, isError, refetch } = useHeroMatchups(hero.id);
    const { getHero } = useHeroes();

    const [sortKey, setSortKey] = useState<SortKey>('games');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
    const [currentPage, setCurrentPage] = useState(1); // 1. State

    const processedData = useMemo(() => {
        if (!matchups) return [];

        return matchups
            .map(m => {
                const opponent = getHero(m.heroId);
                const wr = calculateWinRate(m.wins, m.gamesPlayed);
                return {
                    ...m,
                    opponent,
                    winRate: wr
                };
            })
            .filter(item => item.opponent !== null)
            .sort((a, b) => {
                let valA: number | string = 0;
                let valB: number | string = 0;

                switch (sortKey) {
                    case 'games':
                        valA = a.gamesPlayed;
                        valB = b.gamesPlayed;
                        break;
                    case 'winrate':
                        valA = a.winRate;
                        valB = b.winRate;
                        break;
                    case 'hero':
                        valA = a.opponent!.localized_name;
                        valB = b.opponent!.localized_name;
                        break;
                }

                const modifier = sortDirection === 'asc' ? 1 : -1;

                if (typeof valA === 'string' && typeof valB === 'string') {
                    return valA.localeCompare(valB) * modifier;
                }
                return ((valA as number) - (valB as number)) * modifier;
            });
    }, [matchups, getHero, sortKey, sortDirection]);

    // 2. Pagination Logic
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE;
        return processedData.slice(start, start + PAGE_SIZE);
    }, [processedData, currentPage]);

    const totalPages = Math.ceil(processedData.length / PAGE_SIZE);

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc');
        } else {
            setSortKey(key);
            setSortDirection('desc');
        }
        setCurrentPage(1); // 3. Reset page on sort
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        // Optional: Scroll to top
        document.getElementById('matchups-table-top')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    if (isLoading) return <LoadingSpinner text="Analyzing battle records..." />;
    if (isError) return <ErrorDisplay message="Matchup data unavailable" onRetry={refetch} />;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500" id="matchups-table-top">

            {/* Header / Disclaimer */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
                <div className="border-l-4 border-[#e7d291] pl-4 bg-gradient-to-r from-[#e7d291]/5 to-transparent py-3 w-full md:w-auto rounded-r-lg">
                    <h3 className="text-xl font-serif font-bold text-white uppercase tracking-widest">
                        Matchups vs Heroes
                    </h3>
                    <p className="text-[#808fa6] text-sm mt-1 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        Data collected from recent professional matches.
                    </p>
                </div>

                {/* Legend */}
                <div className="flex gap-4 text-xs font-bold uppercase tracking-wider text-[#58606e]">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-emerald-500/20 border border-emerald-500 rounded"></div>
                        <span>Advantage ({'>'}50%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500/20 border border-red-500 rounded"></div>
                        <span>Disadvantage ({'<'}50%)</span>
                    </div>
                </div>
            </div>

            {/* Grid Container */}
            <div className="bg-[#15171c] border border-[#2e353b] rounded-xl overflow-hidden shadow-2xl">

                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-4 py-4 bg-[#0f1114] border-b border-[#2e353b] text-[10px] uppercase font-bold text-[#58606e] tracking-widest sticky top-0 z-10">
                    <div
                        className="col-span-5 md:col-span-4 flex items-center cursor-pointer group hover:text-white transition-colors select-none"
                        onClick={() => handleSort('hero')}
                    >
                        Opponent <SortIndicator active={sortKey === 'hero'} dir={sortDirection} />
                    </div>

                    <div
                        className="col-span-3 md:col-span-2 text-center flex justify-center items-center cursor-pointer group hover:text-white transition-colors select-none"
                        onClick={() => handleSort('games')}
                    >
                        Matches <SortIndicator active={sortKey === 'games'} dir={sortDirection} />
                    </div>

                    <div
                        className="col-span-4 md:col-span-6 flex items-center cursor-pointer group hover:text-white transition-colors select-none"
                        onClick={() => handleSort('winrate')}
                    >
                        Win Rate <SortIndicator active={sortKey === 'winrate'} dir={sortDirection} />
                    </div>
                </div>

                {/* Rows */}
                <div className="divide-y divide-[#2e353b]/50 overflow-y-auto scrollbar-thin scrollbar-thumb-[#2e353b] scrollbar-track-[#15171c]">
                    {paginatedData.length > 0 ? paginatedData.map((item) => {
                        const isAdvantage = item.winRate >= 50;
                        const barColor = isAdvantage ? 'bg-emerald-500' : 'bg-red-500';
                        const barGlow = isAdvantage ? 'shadow-[0_0_10px_rgba(16,185,129,0.4)]' : 'shadow-[0_0_10px_rgba(239,68,68,0.4)]';
                        const textColor = getWinRateColor(item.winRate);

                        return (
                            <div key={item.heroId} className="grid grid-cols-12 gap-4 px-4 py-3 items-center group hover:bg-[#1e222b] transition-colors">

                                <div className="col-span-5 md:col-span-4">
                                    <HeroCell heroId={item.heroId} showName={true}/>
                                </div>

                                {/* 2. Matches Played */}
                                <div className="col-span-3 md:col-span-2 text-center">
                                    <span className="font-mono text-[#808fa6] text-sm group-hover:text-white transition-colors">
                                        {item.gamesPlayed.toLocaleString()}
                                    </span>
                                </div>

                                {/* 3. Win Rate Bar */}
                                <div className="col-span-4 md:col-span-6">
                                    <div className="flex items-center gap-4">
                                        {/* WR Percentage */}
                                        <div className={clsx("w-12 text-right font-mono font-bold text-sm", textColor)}>
                                            {item.winRate.toFixed(1)}%
                                        </div>

                                        {/* Progress Bar Container */}
                                        <div className="flex-1 h-2 bg-[#0f1114] rounded-full overflow-hidden relative border border-[#2e353b]/50 hidden sm:block">
                                            <div
                                                className={clsx("h-full rounded-full transition-all duration-500 relative", barColor, barGlow)}
                                                style={{ width: `${item.winRate}%` }}
                                            />
                                        </div>

                                        {/* Mobile simple bar (background) */}
                                        <div className="sm:hidden flex-1 h-1.5 bg-[#0f1114] rounded-full overflow-hidden">
                                            <div
                                                className={clsx("h-full", barColor)}
                                                style={{ width: `${item.winRate}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Wins subtext for mobile */}
                                    <div className="text-[9px] text-[#58606e] text-right mt-0.5 sm:hidden">
                                        {item.wins} Wins
                                    </div>
                                </div>

                            </div>
                        );
                    }) : (
                        <div className="py-12 text-center text-[#58606e] uppercase tracking-widest text-xs">
                            No matchup records found
                        </div>
                    )}
                </div>

                {/* 4. Pagination Footer */}
                {totalPages > 1 && (
                    <div className="border-t border-[#2e353b] bg-[#0f1114]/30">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
