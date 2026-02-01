import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import { useHeroPlayers } from '../../../hooks/queries/useHeroPlayers';
import { useSteamPlayers } from '../../../hooks/queries/useSteamPlayers';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { ErrorDisplay } from '../../ui/ErrorDisplay';
import { calculateWinRate, getWinRateColor } from '../../../utils/heroStatsUtils';
import type { HeroInfo } from '../../../types/heroes';
import type { SortDirection } from "../../../store/teamStore";
import { SortIndicator } from "../SortIndicator";
import type { SteamPlayerDto } from "../../../types/steam";
import {PlayerCellShort} from "../../players/PlayerCellShort.tsx";

interface Props {
    hero: HeroInfo;
}

type SortKey = 'games' | 'winrate' | 'player';
const PAGE_SIZE = 20;

export const HeroPlayersTab: React.FC<Props> = ({ hero }) => {
    const { data: players, isLoading, isError, refetch } = useHeroPlayers(hero.id);

    const [sortKey, setSortKey] = useState<SortKey>('games');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
    const [currentPage, setCurrentPage] = useState(1);

    // 1. Сортировка
    const sortedData = useMemo(() => {
        if (!players) return [];

        return players
            .map(p => ({
                ...p,
                winRate: calculateWinRate(p.wins, p.gamesPlayed)
            }))
            .sort((a, b) => {
                let valA: number | string = 0;
                let valB: number | string = 0;

                switch (sortKey) {
                    case 'games': valA = a.gamesPlayed; valB = b.gamesPlayed; break;
                    case 'winrate': valA = a.winRate; valB = b.winRate; break;
                    case 'player': valA = a.accountId; valB = b.accountId; break;
                }

                return sortDirection === 'asc'
                    ? (valA > valB ? 1 : -1)
                    : (valA < valB ? 1 : -1);
            });
    }, [players, sortKey, sortDirection]);

    // 2. Пагинация
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * PAGE_SIZE;
        return sortedData.slice(startIndex, startIndex + PAGE_SIZE);
    }, [sortedData, currentPage]);

    // 3. Steam API Integration
    const playerIds = useMemo(() => {
        return paginatedData.map(p => p.accountId);
    }, [paginatedData]);

    const { data: steamPlayers, isLoading: isPlayersLoading, isFetching: isPlayersFetching } = useSteamPlayers(playerIds);

    const isPlayersBusy = isPlayersLoading || isPlayersFetching;

    const playersMap = useMemo(() => {
        const map = new Map<string, SteamPlayerDto>();
        if (steamPlayers) {
            steamPlayers.forEach(p => map.set(p.steamId32, p));
        }
        return map;
    }, [steamPlayers]);

    const totalPages = Math.ceil(sortedData.length / PAGE_SIZE);

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc');
        } else {
            setSortKey(key);
            setSortDirection('desc');
        }
        setCurrentPage(1);
    };

    if (isLoading) return <LoadingSpinner text="Scouting professional players..." />;
    if (isError) return <ErrorDisplay message="Player data unavailable" onRetry={refetch} />;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-6">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
                <div className="border-l-4 border-[#e7d291] pl-4 py-2">
                    <h3 className="text-xl font-serif font-bold text-white uppercase tracking-widest">
                        Players
                    </h3>
                    <p className="text-[#808fa6] text-sm mt-1">
                        Top professionals playing <span className="text-[#e7d291]">{hero.localized_name}</span> in official matches.
                    </p>
                </div>
                <div className="text-xs text-[#58606e] uppercase font-bold tracking-wider">
                    {sortedData.length} Players Found
                </div>
            </div>

            {/* Table */}
            <div className="bg-[#15171c] border border-[#2e353b] rounded-xl overflow-hidden shadow-lg">

                {/* Table Head */}
                <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[#0f1114] border-b border-[#2e353b] text-[10px] uppercase font-bold text-[#58606e] tracking-widest sticky top-0 z-10">
                    <div
                        className="col-span-6 md:col-span-5 flex items-center cursor-pointer hover:text-white transition-colors"
                        onClick={() => handleSort('player')}
                    >
                        Player Account <SortIndicator active={sortKey === 'player'} dir={sortDirection} />
                    </div>
                    <div
                        className="col-span-3 md:col-span-3 text-center flex justify-center items-center cursor-pointer hover:text-white transition-colors"
                        onClick={() => handleSort('games')}
                    >
                        Matches <SortIndicator active={sortKey === 'games'} dir={sortDirection} />
                    </div>
                    <div
                        className="col-span-3 md:col-span-4 flex justify-end items-center cursor-pointer hover:text-white transition-colors"
                        onClick={() => handleSort('winrate')}
                    >
                        Win Rate <SortIndicator active={sortKey === 'winrate'} dir={sortDirection} />
                    </div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-[#2e353b]/50">
                    {paginatedData.length > 0 ? paginatedData.map((player) => {
                        const steamData = playersMap.get(String(player.accountId));

                        return (
                            <div key={player.accountId} className="grid grid-cols-12 gap-4 px-6 py-3 items-center group hover:bg-[#1e222b] transition-colors">

                                {/* Player Info */}
                                <div className="col-span-6 md:col-span-5 overflow-hidden">
                                    <PlayerCellShort accountId={player.accountId} playerData={steamData} isLoading={isPlayersBusy} />
                                </div>

                            {/* Matches */}
                            <div className="col-span-3 md:col-span-3 text-center">
                                <span className="font-mono text-white font-bold text-sm">
                                    {player.gamesPlayed.toLocaleString()}
                                </span>
                                <div className="w-full h-1 bg-[#2e353b] rounded-full mt-1 mx-auto overflow-hidden">
                                    <div
                                        className="h-full bg-[#60a5fa]"
                                        style={{ width: `${Math.min((player.gamesPlayed / 50) * 100, 100)}%` }}
                                    />
                                </div>
                            </div>

                            {/* Win Rate */}
                            <div className="col-span-3 md:col-span-4 text-right">
                                <span className={clsx("font-mono font-bold text-sm block", getWinRateColor(player.winRate))}>
                                    {player.winRate.toFixed(1)}%
                                </span>
                                <span className="text-[10px] text-[#58606e]">
                                    {player.wins} Wins
                                </span>
                            </div>

                            </div>
                        );
                    }) : (
                        <div className="py-12 text-center text-[#58606e] uppercase tracking-widest text-xs">
                            No pro players found
                        </div>
                    )}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-between items-center px-6 py-4 bg-[#0f1114] border-t border-[#2e353b]">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            className="text-xs font-bold uppercase tracking-wider text-[#808fa6] hover:text-white disabled:opacity-30 disabled:hover:text-[#808fa6] transition-colors"
                        >
                            ← Previous
                        </button>
                        <span className="text-xs font-mono text-[#58606e]">
                            Page <span className="text-[#e3e3e3]">{currentPage}</span> of {totalPages}
                        </span>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            className="text-xs font-bold uppercase tracking-wider text-[#808fa6] hover:text-white disabled:opacity-30 disabled:hover:text-[#808fa6] transition-colors"
                        >
                            Next →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
