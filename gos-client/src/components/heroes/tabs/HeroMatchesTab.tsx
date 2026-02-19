import React, {useMemo, useState} from 'react';
import {Link, useOutletContext} from 'react-router-dom';
import clsx from 'clsx';
import {useHeroMatches} from '../../../hooks/queries/useHeroMatches';
import {useSteamPlayers} from '../../../hooks/queries/useSteamPlayers';
import {LoadingSpinner} from '../../ui/LoadingSpinner';
import {ErrorDisplay} from '../../ui/ErrorDisplay';
import {formatDuration, formatRelativeTime} from '../../../utils/formatUtils';
import {isRadiantTeam, isTeamWon} from '../../../utils/matchUtils';
import {APP_ROUTES} from '../../../config/navigation';
import type {SortDirection} from '../../../store/teamStore';
import {SortIndicator} from "../SortIndicator";
import {Icon} from "../../Icon";
import type {SteamPlayerDto} from "../../../types/steam";
import {PlayerCellShort} from "../../players/PlayerCellShort.tsx";
import { Pagination } from '../../ui/Pagination';
import type {HeroOutletContext} from "../../../pages/HeroDetailsPage.tsx";

type SortKey = 'id' | 'league' | 'duration' | 'result' | 'kda' | 'time' | 'player';
const PAGE_SIZE = 20;

export const HeroMatchesTab: React.FC = () => {
    const { hero } = useOutletContext<HeroOutletContext>();
    const { data: matches, isLoading, isError, refetch } = useHeroMatches(hero.id);

    const [sortKey, setSortKey] = useState<SortKey>('time');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
    const [currentPage, setCurrentPage] = useState(1);

    const sortedData = useMemo(() => {
        if (!matches) return [];

        return [...matches].sort((a, b) => {
            let valA: number | string = 0;
            let valB: number | string = 0;

            switch (sortKey) {
                case 'id': valA = a.matchId; valB = b.matchId; break;
                case 'league': valA = a.leagueName || ''; valB = b.leagueName || ''; break;
                case 'duration': valA = a.duration; valB = b.duration; break;
                case 'time': valA = a.startTime; valB = b.startTime; break;
                case 'player': valA = a.accountId; valB = b.accountId; break;
                case 'kda':
                    valA = (a.kills + a.assists) / (a.deaths || 1);
                    valB = (b.kills + b.assists) / (b.deaths || 1);
                    break;
                case 'result':
                    valA = isTeamWon(a.isRadiant, a.radiantWin) ? 1 : 0;
                    valB = isTeamWon(b.isRadiant, b.radiantWin) ? 1 : 0;
                    break;
            }

            if (typeof valA === 'string' && typeof valB === 'string') {
                return sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
            }
            return sortDirection === 'asc' ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
        });
    }, [matches, sortKey, sortDirection]);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * PAGE_SIZE;
        return sortedData.slice(startIndex, startIndex + PAGE_SIZE);
    }, [sortedData, currentPage]);

    const playerIds = useMemo(() => {
        return paginatedData.map(m => m.accountId);
    }, [paginatedData]);

    const { data: steamPlayers, isLoading: isPlayersLoading, isFetching: isPlayersFetching } = useSteamPlayers(playerIds);

    const isPlayersBusy = isPlayersLoading || isPlayersFetching;

    const playersMap = useMemo(() => {
        const map = new Map<string, SteamPlayerDto>();
        if (steamPlayers) {
            steamPlayers.forEach(p => {
                map.set(p.steamId32, p);
            });
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

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        // Optional: Scroll to top of table
        document.getElementById('matches-table-top')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    if (isLoading) return <LoadingSpinner text="Loading match history..." />;
    if (isError) return <ErrorDisplay message="Match history unavailable" onRetry={refetch} />;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500" id="matches-table-top">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
                <div className="border-l-4 border-[#e7d291] pl-4 py-2">
                    <h3 className="text-xl font-serif font-bold text-white uppercase tracking-widest">
                        Recent Matches
                    </h3>
                    <p className="text-[#808fa6] text-sm mt-1 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        Professional matches involving <span className="text-[#e7d291]">{hero.localized_name}</span>.
                    </p>
                </div>
                <div className="text-xs text-[#58606e] uppercase font-bold tracking-wider">
                    {matches?.length || 0} Matches Found
                </div>
            </div>

            {/* Table */}
            <div className="bg-[#15171c] border border-[#2e353b] rounded-xl overflow-hidden shadow-lg">

                {/* Table Head */}
                <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[#0f1114] border-b border-[#2e353b] text-[10px] uppercase font-bold text-[#58606e] tracking-widest sticky top-0 z-10 items-center">
                    <div className="col-span-4 md:col-span-2 flex items-center cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('id')}>
                        Match ID <SortIndicator active={sortKey === 'id'} dir={sortDirection} />
                    </div>
                    <div className="col-span-2 md:col-span-1 flex items-center cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('result')}>
                        Result <SortIndicator active={sortKey === 'result'} dir={sortDirection} />
                    </div>
                    <div className="col-span-4 md:col-span-2 flex items-center cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('player')}>
                        Player <SortIndicator active={sortKey === 'player'} dir={sortDirection} />
                    </div>
                    <div className="hidden md:flex md:col-span-3 items-center cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('league')}>
                        League <SortIndicator active={sortKey === 'league'} dir={sortDirection} />
                    </div>
                    <div className="hidden md:flex md:col-span-2 text-center justify-center items-center cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('kda')}>
                        K / D / A <SortIndicator active={sortKey === 'kda'} dir={sortDirection} />
                    </div>
                    <div className="col-span-2 md:col-span-2 text-right md:text-center flex justify-end md:justify-center items-center cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('duration')}>
                        Duration <SortIndicator active={sortKey === 'duration'} dir={sortDirection} />
                    </div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-[#2e353b]/50">
                    {paginatedData.length > 0 ? paginatedData.map((match) => {
                        const won = isTeamWon(match.isRadiant, match.radiantWin);
                        const isRadiant = isRadiantTeam(match.isRadiant);
                        const sideIcon = isRadiant ? '/assets/images/radiant.png' : '/assets/images/dire.png';

                        const playerData = playersMap.get(String(match.accountId));

                        return (
                            <div key={match.matchId} className="grid grid-cols-12 gap-4 px-6 py-3 items-center group hover:bg-[#1e222b] transition-colors relative min-h-16">
                                {/* Left Border Indicator */}
                                <div className={clsx("absolute left-0 top-0 bottom-0 w-1 transition-all duration-300", won ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" : "bg-red-500/50")} />

                                {/* 1. Match ID & Side */}
                                <div className="col-span-4 md:col-span-2 flex flex-col justify-center">
                                    <Link to={`${APP_ROUTES.MATCHES}/${match.matchId}`} className="font-mono font-bold text-sm text-[#e3e3e3] group-hover:text-[#e7d291] group-hover:underline decoration-[#58606e] underline-offset-4 transition-colors">
                                        {match.matchId}
                                    </Link>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <Icon src={sideIcon} size={4} />
                                        <span className={clsx("text-[10px] uppercase font-bold tracking-wider", isRadiant ? "text-green-400" : "text-red-400")}>
                                            {isRadiant ? 'Radiant' : 'Dire'}
                                        </span>
                                    </div>
                                </div>

                                {/* 2. Result */}
                                <div className="col-span-2 md:col-span-1 flex items-center">
                                    <span className={clsx("text-[10px] font-bold uppercase px-2 py-1 rounded border tracking-widest", won ? "text-emerald-400 bg-emerald-500/5 border-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.1)]" : "text-red-400 bg-red-500/5 border-red-500/20")}>
                                        {won ? 'Won' : 'Lost'}
                                    </span>
                                </div>

                                <div className="col-span-4 md:col-span-2 flex items-center pr-4 overflow-hidden">
                                    <PlayerCellShort
                                        accountId={match.accountId}
                                        playerData={playerData}
                                        isLoading={isPlayersBusy}
                                    />
                                </div>

                                {/* 4. League */}
                                <div className="hidden md:flex md:col-span-3 flex-col justify-center">
                                    <div className="text-sm text-[#a3aab8] leading-tight line-clamp-2 pr-2" title={match.leagueName}>
                                        {match.leagueName || "Professional Match"}
                                    </div>
                                </div>

                                {/* 5. KDA */}
                                <div className="hidden md:flex md:col-span-2 justify-center items-center">
                                    <div className="font-mono text-sm bg-[#0f1114]/50 px-3 py-1 rounded border border-[#2e353b]/50">
                                        <span className="text-white font-bold">{match.kills}</span>
                                        <span className="text-[#58606e] mx-1.5">/</span>
                                        <span className="text-red-400 font-bold">{match.deaths}</span>
                                        <span className="text-[#58606e] mx-1.5">/</span>
                                        <span className="text-white">{match.assists}</span>
                                    </div>
                                </div>

                                {/* 6. Duration & Time */}
                                <div className="col-span-2 md:col-span-2 text-right md:text-center flex flex-col justify-center md:items-center">
                                    <span className="text-sm text-[#e3e3e3] font-mono">
                                        {formatDuration(match.duration)}
                                    </span>
                                    <span className="text-[10px] text-[#808fa6]">
                                        {formatRelativeTime(match.startTime)}
                                    </span>
                                </div>
                            </div>
                        );
                    }) : (
                        <div className="py-20 flex flex-col items-center justify-center text-[#58606e]">
                            <span className="text-4xl mb-2 opacity-30">📜</span>
                            <span className="uppercase tracking-widest text-xs">No match history found</span>
                        </div>
                    )}
                </div>

                {/* Pagination Footer */}
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
