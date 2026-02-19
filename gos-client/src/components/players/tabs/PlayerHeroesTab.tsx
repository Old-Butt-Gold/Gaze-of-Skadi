import React, { useState, useMemo } from 'react';
import clsx from 'clsx';
import { usePlayerHeroes } from '../../../hooks/queries/usePlayerHeroes';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { formatRelativeTime } from '../../../utils/formatUtils';
import type { SortDirection } from '../../../store/teamStore';
import {SortIndicator} from "../../heroes/SortIndicator.tsx";
import {HeroCell} from "../../heroes/HeroCell.tsx";
import {useHeroes} from "../../../hooks/queries/useHeroes.ts";
import { Pagination } from '../../ui/Pagination';
import {useOutletContext} from "react-router-dom";
import type {PlayerOutletContext} from "../../../pages/PlayerDetailsPage.tsx";

type SortKey = 'hero' | 'matches' | 'winPercent' | 'withMatches' | 'withWinPercent' | 'againstMatches' | 'againstWinPercent' | 'lastPlayed';

export const PlayerHeroesTab: React.FC = () => {
    const { accountId, filters } = useOutletContext<PlayerOutletContext>();
    const { data: heroesData, isLoading: isHeroesLoading } = usePlayerHeroes(accountId, filters);
    const { getHero } = useHeroes();

    const [sortKey, setSortKey] = useState<SortKey>('matches');
    const [sortDir, setSortDir] = useState<SortDirection>('desc');

    const [page, setPage] = useState(1);
    const PAGE_SIZE = 20;

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortDir(sortDir === 'desc' ? 'asc' : 'desc');
        } else {
            setSortKey(key);
            setSortDir('desc');
        }
        setPage(1);
    };

    const processedData = useMemo(() => {
        if (!heroesData) return [];

        const dataWithStats = heroesData.map(hero => {
            const heroInfo = getHero(hero.heroId);

            // Calculate rates
            const winPercent = hero.games > 0 ? (hero.win / hero.games) * 100 : 0;
            const withWinPercent = hero.withGames > 0 ? (hero.withWin / hero.withGames) * 100 : 0;
            const againstWinPercent = hero.againstGames > 0 ? (hero.againstWin / hero.againstGames) * 100 : 0;

            return {
                ...hero,
                heroName: heroInfo?.localized_name ?? 'Unknown', // Fallback for sorting
                winPercent,
                withWinPercent,
                againstWinPercent
            };
        });

        return dataWithStats.sort((a, b) => {
            const modifier = sortDir === 'asc' ? 1 : -1;

            switch (sortKey) {
                case 'hero':
                    return a.heroName.localeCompare(b.heroName) * modifier;

                case 'matches':
                    return (a.games - b.games) * modifier;

                case 'winPercent':
                    return (a.winPercent - b.winPercent) * modifier;

                case 'withMatches':
                    return (a.withGames - b.withGames) * modifier;

                case 'withWinPercent':
                    return (a.withWinPercent - b.withWinPercent) * modifier;

                case 'againstMatches':
                    return (a.againstGames - b.againstGames) * modifier;

                case 'againstWinPercent':
                    return (a.againstWinPercent - b.againstWinPercent) * modifier;

                case 'lastPlayed':
                    return (a.lastPlayed - b.lastPlayed) * modifier;

                default:
                    return 0;
            }
        });

    }, [heroesData, getHero, sortKey, sortDir]);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        return processedData.slice(start, start + PAGE_SIZE);
    }, [processedData, page]);

    const totalPages = Math.ceil(processedData.length / PAGE_SIZE);

    if (isHeroesLoading) return <LoadingSpinner text="Loading Heroes..." />;
    if (!heroesData || heroesData.length === 0) return <div className="text-center text-[#808fa6] py-10">No heroes played found.</div>;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Header / Legend (Optional) */}
            <div className="flex justify-between items-end mb-4 px-2">
                <h3 className="text-lg font-serif font-bold text-white uppercase tracking-widest">Played Heroes</h3>
            </div>

            <div className="bg-[#15171c] border border-[#2e353b] rounded-xl overflow-hidden shadow-2xl">

                {/* --- TABLE HEADER --- */}
                <div className="grid grid-cols-12 gap-2 px-4 py-4 bg-[#0f1114] border-b border-[#2e353b] text-[10px] uppercase font-bold text-[#58606e] tracking-widest sticky top-0 z-10">

                    {/* Hero */}
                    <div className="col-span-2 flex items-center cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('hero')}>
                        Hero <SortIndicator active={sortKey === 'hero'} dir={sortDir} />
                    </div>

                    {/* Matches */}
                    <div className="col-span-2 text-center flex justify-center items-center cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('matches')}>
                        Games <SortIndicator active={sortKey === 'matches'} dir={sortDir} />
                    </div>

                    {/* Win Rate */}
                    <div className="col-span-2 text-center flex justify-center items-center cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('winPercent')}>
                        Win % <SortIndicator active={sortKey === 'winPercent'} dir={sortDir} />
                    </div>

                    {/* With (Stats) */}
                    <div className="col-span-2 text-center flex flex-col justify-center items-center cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('withMatches')}>
                        <span>With</span>
                        <span className="text-[8px] opacity-60">Games / WR</span>
                        <SortIndicator active={sortKey === 'withMatches'} dir={sortDir} />
                    </div>

                    {/* Against (Stats) */}
                    <div className="col-span-2 text-center flex flex-col justify-center items-center cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('againstMatches')}>
                        <span>Against</span>
                        <span className="text-[8px] opacity-60">Games / WR</span>
                        <SortIndicator active={sortKey === 'againstMatches'} dir={sortDir} />
                    </div>

                    {/* Last Played */}
                    <div className="col-span-2 text-right flex justify-end items-center cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('lastPlayed')}>
                        Last Played <SortIndicator active={sortKey === 'lastPlayed'} dir={sortDir} />
                    </div>
                </div>

                {/* --- ROWS --- */}
                <div className="divide-y divide-[#2e353b]/30 overflow-y-auto scrollbar-thin scrollbar-thumb-[#2e353b] scrollbar-track-[#15171c]">
                    {paginatedData.map((row) => (
                        <div key={row.heroId} className="grid grid-cols-12 gap-2 px-4 py-2 items-center hover:bg-[#1e222b] transition-colors group">

                            {/* 1. Hero */}
                            <div className="col-span-2">
                                <HeroCell heroId={row.heroId} showName={true} />
                            </div>

                            {/* 2. Matches */}
                            <div className="col-span-2 text-center font-mono text-white font-bold">
                                {row.games}
                            </div>

                            {/* 3. Win Rate */}
                            <div className="col-span-2 flex justify-center">
                                <WinRateBar percent={row.winPercent} />
                            </div>

                            {/* 4. With Stats (Combined) */}
                            <div className="col-span-2 text-center">
                                {row.withGames > 0 ? (
                                    <div className="flex flex-col items-center">
                                        <span className="text-xs font-mono text-[#808fa6]">{row.withGames}</span>
                                        <span className={clsx("text-xs font-bold", row.withWinPercent >= 50 ? "text-emerald-400" : "text-red-400")}>
                                            {row.withWinPercent.toFixed(0)}%
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-[#2e353b] text-xs">-</span>
                                )}
                            </div>

                            {/* 5. Against Stats (Combined) */}
                            <div className="col-span-2 text-center">
                                {row.againstGames > 0 ? (
                                    <div className="flex flex-col items-center">
                                        <span className="text-xs font-mono text-[#808fa6]">{row.againstGames}</span>
                                        <span className={clsx("text-xs font-bold", row.againstWinPercent >= 50 ? "text-emerald-400" : "text-red-400")}>
                                            {row.againstWinPercent.toFixed(0)}%
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-[#2e353b] text-xs">-</span>
                                )}
                            </div>

                            {/* 6. Last Played */}
                            <div className="col-span-2 text-right text-xs text-[#808fa6] font-medium">
                                {row.lastPlayed === 0 ? (
                                    <span className="opacity-40 italic">Never played</span>
                                ) : (
                                    formatRelativeTime(row.lastPlayed)
                                )}
                            </div>

                        </div>
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className="border-t border-[#2e353b] bg-[#0f1114]/50">
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={setPage}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

const WinRateBar = ({ percent }: { percent: number }) => {
    const isHigh = percent >= 50;
    const barColor = isHigh ? "bg-emerald-500" : "bg-red-500";
    const textColor = isHigh ? "text-emerald-400" : "text-red-400";

    return (
        <div className="w-full flex flex-col items-center">
            <span className={clsx("text-xs font-bold mb-1 font-mono", textColor)}>
                {percent.toFixed(1)}%
            </span>
            <div className="w-full h-1.5 bg-[#0f1114] rounded-full overflow-hidden border border-[#2e353b]/50">
                <div
                    className={clsx("h-full transition-all duration-500", barColor)}
                    style={{ width: `${percent}%` }}
                />
            </div>
        </div>
    );
};
