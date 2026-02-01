import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useHeroMatches } from '../../../hooks/queries/useHeroMatches';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { ErrorDisplay } from '../../ui/ErrorDisplay';
import { formatDuration, formatRelativeTime } from '../../../utils/formatUtils';
import { isTeamWon, isRadiantTeam } from '../../../utils/matchUtils';
import { APP_ROUTES } from '../../../config/navigation';
import type { HeroInfo } from '../../../types/heroes';
import type { SortDirection } from '../../../store/teamStore';
import { SortIndicator } from "../SortIndicator";
import { Icon } from "../../Icon"; // Используем твой компонент иконки

interface Props {
    hero: HeroInfo;
}

type SortKey = 'id' | 'league' | 'duration' | 'result' | 'kda' | 'time';
const PAGE_SIZE = 20;

export const HeroMatchesTab: React.FC<Props> = ({ hero }) => {
    const { data: matches, isLoading, isError, refetch } = useHeroMatches(hero.id);

    const [sortKey, setSortKey] = useState<SortKey>('time');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
    const [currentPage, setCurrentPage] = useState(1);

    // 1. Process & Sort
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

    // 2. Paginate
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * PAGE_SIZE;
        return sortedData.slice(startIndex, startIndex + PAGE_SIZE);
    }, [sortedData, currentPage]);

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

    if (isLoading) return <LoadingSpinner text="Loading match history..." />;
    if (isError) return <ErrorDisplay message="Match history unavailable" onRetry={refetch} />;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-6">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
                <div className="border-l-4 border-[#e7d291] pl-4 py-2">
                    <h3 className="text-xl font-serif font-bold text-white uppercase tracking-widest">
                        Recent Matches
                    </h3>
                    <p className="text-[#808fa6] text-sm mt-1 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        Professional matches involving<span className="text-[#e7d291]">{hero.localized_name}</span>
                    </p>
                </div>
                <div className="text-xs text-[#58606e] uppercase font-bold tracking-wider">
                    {matches?.length || 0} Matches Found
                </div>
            </div>

            {/* Table */}
            <div className="bg-[#15171c] border border-[#2e353b] rounded-xl overflow-hidden shadow-lg">

                {/* Table Head */}
                <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[#0f1114] border-b border-[#2e353b] text-[10px] uppercase font-bold text-[#58606e] tracking-widest sticky top-0 z-10">
                    <div
                        className="col-span-4 md:col-span-2 flex items-center cursor-pointer hover:text-white transition-colors"
                        onClick={() => handleSort('id')}
                    >
                        Match ID <SortIndicator active={sortKey === 'id'} dir={sortDirection} />
                    </div>

                    <div
                        className="col-span-2 md:col-span-1 flex items-center cursor-pointer hover:text-white transition-colors"
                        onClick={() => handleSort('result')}
                    >
                        Result <SortIndicator active={sortKey === 'result'} dir={sortDirection} />
                    </div>

                    <div
                        className="hidden md:flex md:col-span-3 items-center cursor-pointer hover:text-white transition-colors"
                        onClick={() => handleSort('league')}
                    >
                        League <SortIndicator active={sortKey === 'league'} dir={sortDirection} />
                    </div>

                    <div
                        className="col-span-3 md:col-span-2 text-center flex justify-center items-center cursor-pointer hover:text-white transition-colors"
                        onClick={() => handleSort('kda')}
                    >
                        K / D / A <SortIndicator active={sortKey === 'kda'} dir={sortDirection} />
                    </div>

                    <div
                        className="col-span-3 md:col-span-2 text-center flex justify-center items-center cursor-pointer hover:text-white transition-colors"
                        onClick={() => handleSort('duration')}
                    >
                        Duration <SortIndicator active={sortKey === 'duration'} dir={sortDirection} />
                    </div>

                    <div
                        className="hidden md:flex md:col-span-2 justify-end items-center cursor-pointer hover:text-white transition-colors"
                        onClick={() => handleSort('time')}
                    >
                        Played <SortIndicator active={sortKey === 'time'} dir={sortDirection} />
                    </div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-[#2e353b]/50">
                    {paginatedData.length > 0 ? paginatedData.map((match) => {
                        const won = isTeamWon(match.isRadiant, match.radiantWin);
                        const isRadiant = isRadiantTeam(match.isRadiant);
                        const sideIcon = isRadiant ? '/assets/images/radiant.png' : '/assets/images/dire.png';

                        return (
                            <div key={match.matchId} className="grid grid-cols-12 gap-4 px-6 py-4 items-center group hover:bg-[#1e222b] transition-colors relative min-h-[64px]">
                                {/* Left Border Indicator */}
                                <div className={clsx(
                                    "absolute left-0 top-0 bottom-0 w-1 transition-all duration-300",
                                    won ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" : "bg-red-500/50"
                                )} />

                                {/* 1. Match ID & Side (With Icon) */}
                                <div className="col-span-4 md:col-span-2 flex flex-col justify-center">
                                    <Link to={`${APP_ROUTES.MATCHES}/${match.matchId}`} className="font-mono font-bold text-sm text-[#e3e3e3] group-hover:text-[#e7d291] group-hover:underline decoration-[#58606e] underline-offset-4 transition-colors">
                                        {match.matchId}
                                    </Link>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <Icon src={sideIcon} size={4} />
                                        <span className={clsx(
                                            "text-[10px] uppercase font-bold tracking-wider",
                                            isRadiant ? "text-green-400" : "text-red-400"
                                        )}>
                                            {isRadiant ? 'Radiant' : 'Dire'}
                                        </span>
                                    </div>
                                </div>

                                {/* 2. Result */}
                                <div className="col-span-2 md:col-span-1 flex items-center">
                                    <span className={clsx(
                                        "text-[10px] font-bold uppercase px-2 py-1 rounded border tracking-widest",
                                        won
                                            ? "text-emerald-400 bg-emerald-500/5 border-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.1)]"
                                            : "text-red-400 bg-red-500/5 border-red-500/20"
                                    )}>
                                        {won ? 'Won' : 'Lost'}
                                    </span>
                                </div>

                                {/* 3. League (Desktop) - Fixed text wrapping */}
                                <div className="hidden md:flex md:col-span-3 flex-col justify-center">
                                    <div className="text-sm text-[#a3aab8] leading-tight line-clamp-2 pr-2" title={match.leagueName}>
                                        {match.leagueName || "Professional Match"}
                                    </div>
                                </div>

                                {/* 4. KDA */}
                                <div className="col-span-3 md:col-span-2 text-center flex justify-center items-center">
                                    <div className="font-mono text-sm bg-[#0f1114]/50 px-3 py-1 rounded border border-[#2e353b]/50">
                                        <span className="text-white font-bold">{match.kills}</span>
                                        <span className="text-[#58606e] mx-1.5">/</span>
                                        <span className="text-red-400 font-bold">{match.deaths}</span>
                                        <span className="text-[#58606e] mx-1.5">/</span>
                                        <span className="text-white">{match.assists}</span>
                                    </div>
                                </div>

                                {/* 5. Duration */}
                                <div className="col-span-3 md:col-span-2 text-center flex justify-center items-center">
                                    <span className="text-sm text-[#e3e3e3] font-mono">
                                        {formatDuration(match.duration)}
                                    </span>
                                </div>

                                {/* 6. Relative Time (Desktop) */}
                                <div className="hidden md:flex md:col-span-2 justify-end text-right items-center">
                                    <span className="text-xs text-[#808fa6]">
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
