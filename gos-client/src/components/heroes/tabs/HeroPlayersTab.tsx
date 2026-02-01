import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useHeroPlayers } from '../../../hooks/queries/useHeroPlayers';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { ErrorDisplay } from '../../ui/ErrorDisplay';
import { calculateWinRate, getWinRateColor } from '../../../utils/heroStatsUtils';
import type { HeroInfo } from '../../../types/heroes';
import { APP_ROUTES } from "../../../config/navigation";
import type { SortDirection } from "../../../store/teamStore";
import { Icon } from "../../Icon";
import {SortIndicator} from "../SortIndicator.tsx";

interface Props {
    hero: HeroInfo;
}

type SortKey = 'games' | 'winrate' | 'player';

export const HeroPlayersTab: React.FC<Props> = ({ hero }) => {
    const { data: players, isLoading, isError, refetch } = useHeroPlayers(hero.id);

    const [sortKey, setSortKey] = useState<SortKey>('games');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

    const processedData = useMemo(() => {
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
                    case 'games':
                        valA = a.gamesPlayed;
                        valB = b.gamesPlayed;
                        break;
                    case 'winrate':
                        valA = a.winRate;
                        valB = b.winRate;
                        break;
                    case 'player':
                        valA = a.accountId;
                        valB = b.accountId;
                        break;
                }

                const modifier = sortDirection === 'asc' ? 1 : -1;
                return ((valA as number) - (valB as number)) * modifier;
            });
    }, [players, sortKey, sortDirection]);

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc');
        } else {
            setSortKey(key);
            setSortDirection('desc');
        }
    };

    if (isLoading) return <LoadingSpinner text="Scouting professional players..." />;
    if (isError) return <ErrorDisplay message="Player data unavailable" onRetry={refetch} />;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-6">

            {/* Header / Disclaimer */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
                <div className="border-l-4 border-[#e7d291] pl-4 bg-gradient-to-r from-[#e7d291]/5 to-transparent py-3 w-full md:w-auto rounded-r-lg">
                    <h3 className="text-xl font-serif font-bold text-white uppercase tracking-widest">
                        Pro Level Masters
                    </h3>
                    <p className="text-[#808fa6] text-sm mt-1 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        <span className="text-[#e3e3e3] font-bold">Live Data:</span> Top professionals playing {hero.localized_name} in official matches.
                    </p>
                </div>

                {/* Legend */}
                <div className="flex gap-4 text-xs font-bold uppercase tracking-wider text-[#58606e]">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-emerald-500/20 border border-emerald-500 rounded"></div>
                        <span>High Winrate ({'>'}55%)</span>
                    </div>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-[#15171c] border border-[#2e353b] rounded-xl overflow-hidden shadow-2xl">

                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[#0f1114] border-b border-[#2e353b] text-[10px] uppercase font-bold text-[#58606e] tracking-widest sticky top-0 z-10">
                    <div
                        className="col-span-6 md:col-span-5 flex items-center cursor-pointer group hover:text-white transition-colors select-none"
                        onClick={() => handleSort('player')}
                    >
                        Player Account <SortIndicator active={sortKey === 'player'} dir={sortDirection} />
                    </div>

                    <div
                        className="col-span-3 md:col-span-3 text-center flex justify-center items-center cursor-pointer group hover:text-white transition-colors select-none"
                        onClick={() => handleSort('games')}
                    >
                        Matches <SortIndicator active={sortKey === 'games'} dir={sortDirection} />
                    </div>

                    <div
                        className="col-span-3 md:col-span-4 flex justify-end items-center cursor-pointer group hover:text-white transition-colors select-none"
                        onClick={() => handleSort('winrate')}
                    >
                        Win Rate <SortIndicator active={sortKey === 'winrate'} dir={sortDirection} />
                    </div>
                </div>

                {/* Rows */}
                <div className="divide-y divide-[#2e353b]/50 max-h-[800px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#2e353b] scrollbar-track-[#15171c]">
                    {processedData.length > 0 ? processedData.map((player) => {
                        const textColor = getWinRateColor(player.winRate);

                        return (
                            <div key={player.accountId} className="grid grid-cols-12 gap-4 px-6 py-3 items-center group hover:bg-[#1e222b] transition-colors">

                                {/* 1. Player Info (Link) */}
                                <div className="col-span-6 md:col-span-5">
                                    <Link to={`${APP_ROUTES.PLAYERS}/${player.accountId}`} className="flex items-center gap-4 group/link">
                                        {/* Avatar Placeholder */}
                                        <Icon src="/assets/images/unknown_player.png" size={8} />

                                        <div className="flex flex-col">
                                            <span className="font-bold text-sm text-[#e3e3e3] group-hover/link:text-[#e7d291] transition-colors font-mono">
                                                ID: {player.accountId}
                                            </span>
                                            <span className="text-[10px] text-[#58606e] uppercase tracking-wider group-hover/link:text-[#808fa6]">
                                                View Profile
                                            </span>
                                        </div>
                                    </Link>
                                </div>

                                {/* 2. Matches */}
                                <div className="col-span-3 md:col-span-3 text-center">
                                    <div className="flex flex-col items-center">
                                        <span className="font-mono text-white font-bold text-sm">
                                            {player.gamesPlayed.toLocaleString()}
                                        </span>
                                        <div className="w-full max-w-[60px] h-1 bg-[#2e353b] rounded-full mt-1 overflow-hidden">
                                            <div
                                                className="h-full bg-[#60a5fa]"
                                                style={{ width: `${Math.min((player.gamesPlayed / processedData[0].gamesPlayed) * 100, 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* 3. Win Rate */}
                                <div className="col-span-3 md:col-span-4 text-right">
                                    <div className="flex flex-col items-end gap-1">
                                        <span className={clsx("font-mono font-bold text-sm", textColor)}>
                                            {player.winRate.toFixed(1)}%
                                        </span>
                                        <span className="text-[10px] text-[#58606e]">
                                            {player.wins} Wins
                                        </span>
                                    </div>
                                </div>

                            </div>
                        );
                    }) : (
                        <div className="py-12 text-center text-[#58606e] uppercase tracking-widest text-xs">
                            No pro players found for this hero
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
