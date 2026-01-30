import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import type {TeamDto, TeamMatchDto} from '../../types/teams';
import { formatDuration, formatRelativeTime } from '../../utils/formatUtils';
import { Icon } from '../Icon';
import {isRadiantTeam, isTeamWon} from "../../utils/matchUtils.ts";

interface Props {
    matches: TeamMatchDto[];
    team: TeamDto;
}

const ITEMS_PER_PAGE = 20;

export const TeamMatchesTable: React.FC<Props> = ({ matches, team }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const { paginatedMatches, totalPages } = useMemo(() => {
        const sorted = [...matches].sort((a, b) => b.startTime - a.startTime);
        const total = Math.ceil(sorted.length / ITEMS_PER_PAGE);
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const sliced = sorted.slice(start, start + ITEMS_PER_PAGE);
        return { paginatedMatches: sliced, totalPages: total };
    }, [matches, currentPage]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return (
        <div id="matches-top" className="flex flex-col gap-3">
            {/* Header removed for cleaner card-list look, or keep simplified */}

            <div className="space-y-3">
                {paginatedMatches.map((match) => {
                    const isRadiant = isRadiantTeam(match.radiant);
                    const won = isTeamWon(match.radiant, match.radiantWin);

                    // Side Config
                    const sideColor = isRadiant ? "text-emerald-400" : "text-red-400";
                    const sideIcon = isRadiant ? "/assets/images/radiant.png" : "/assets/images/dire.png";
                    const sideName = isRadiant ? "Radiant" : "Dire";

                    return (
                        <div
                            key={match.matchId}
                            className="relative grid grid-cols-1 md:grid-cols-12 bg-[#15171c] hover:bg-[#1a1d24] border border-[#2e353b] hover:border-[#4a5568] rounded-xl overflow-hidden transition-all group shadow-sm hover:shadow-lg"
                        >
                            {/* Win/Loss Indicator (Left Border) */}
                            <div className={clsx(
                                "absolute left-0 top-0 bottom-0 w-1.5",
                                won
                                    ? "bg-gradient-to-b from-emerald-400 to-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                                    : "bg-gradient-to-b from-red-500 to-red-700 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                            )} />

                            {/* 1. League Banner Area (Left) */}
                            <div className="col-span-12 md:col-span-4 relative flex items-center p-4 overflow-hidden">
                                {/* Subtle League BG Image */}
                                <div className="absolute inset-0 opacity-10 pointer-events-none">
                                    <img src={match.leagueImageUrl} className="w-full h-full object-cover scale-110" alt="" />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#15171c]/90 to-transparent pointer-events-none"></div>

                                <div className="relative flex items-center gap-4 z-10 pl-2">
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-[#e7d291] font-serif font-bold text-sm leading-tight line-clamp-1" title={match.leagueName || ''}>
                                            {match.leagueName || 'Unknown League'}
                                        </span>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[#808fa6] text-xs font-mono">{formatRelativeTime(match.startTime)}</span>
                                            <Link
                                                to={`/matches/${match.matchId}`}
                                                className="text-[#58606e] text-[10px] hover:text-white transition-colors border border-[#2e353b] px-1.5 py-0.5 rounded bg-[#0f1114]"
                                            >
                                                ID: {match.matchId}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 2. Match Context (Center) */}
                            <div className="col-span-12 md:col-span-5 flex items-center justify-between md:justify-center p-4 border-t md:border-t-0 md:border-l border-[#2e353b] md:bg-transparent bg-[#121417]">
                                {/* Our Team (Context) */}
                                <div className="flex flex-col items-center w-1/3">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        {/* Faction Icon */}
                                        <Icon src={sideIcon} alt={sideName} size={5} />
                                        <span className={clsx("text-[12px] font-bold uppercase tracking-wider", sideColor)}>
                                            {sideName}
                                        </span>
                                    </div>
                                    <span className="text-[#e3e3e3] font-bold text-xs uppercase tracking-wide">
                                        {team.name}
                                    </span>
                                </div>

                                {/* Score */}
                                <div className="flex flex-col items-center w-1/3 px-4">
                                    <div className="font-mono font-black text-2xl tracking-widest text-[#e3e3e3] flex items-center gap-2">
                                        <span className={isRadiant ? "text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]" : "text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.5)]"}>
                                            {match.radiantScore}
                                        </span>
                                        <span className="text-[#58606e] text-lg">:</span>
                                        <span className={!isRadiant ? "text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]" : "text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.5)]"}>
                                            {match.direScore}
                                        </span>
                                    </div>
                                    <span className="text-[#58606e] text-[10px] font-bold uppercase mt-1">{formatDuration(match.duration)}</span>
                                </div>

                                {/* Opponent */}
                                <Link to={`/teams/${match.opposingTeamId}`} className="flex flex-col items-center w-1/3 group/opp">
                                    <div className="w-10 h-10 bg-[#0f1114] rounded-lg border border-[#2e353b] flex items-center justify-center shadow-sm group-hover/opp:border-[#e7d291]/50 transition-colors mb-1.5">
                                        <Icon src={match.opposingTeamLogo || "fallback"} size={8} fallbackSrc="/assets/images/icon_team_default.png" />
                                    </div>
                                    <span className="text-[#808fa6] font-bold text-xs text-center leading-tight group-hover/opp:text-white transition-colors line-clamp-1 max-w-full">
                                        {match.opposingTeamName || 'Unknown'}
                                    </span>
                                </Link>
                            </div>

                            {/* 3. Result (Right) */}
                            <div className="col-span-12 md:col-span-3 flex items-center justify-center md:justify-center p-4 md:pr-6 border-t md:border-t-0 md:border-l border-[#2e353b] bg-gradient-to-r from-transparent to-[#0f1114]/30">
                                <div className={clsx(
                                    "flex items-center gap-3 px-4 py-2 rounded-lg border backdrop-blur-sm",
                                    won
                                        ? "bg-emerald-500/5 border-emerald-500/20"
                                        : "bg-red-500/5 border-red-500/20"
                                )}>
                                    <div className="flex flex-col items-end">
                                        <span className={clsx(
                                            "font-serif font-black text-lg uppercase tracking-widest leading-none",
                                            won ? "text-emerald-400" : "text-red-400"
                                        )}>
                                            {won ? 'Victory' : 'Defeat'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center pt-8 pb-4">
                    <div className="join bg-[#15171c] border border-[#2e353b] rounded-lg p-1 shadow-lg">
                        <button
                            className="join-item btn btn-sm bg-transparent border-none text-[#808fa6] hover:text-white disabled:opacity-30 disabled:bg-transparent uppercase font-bold tracking-wider w-24 transition-colors"
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            Prev
                        </button>
                        <div className="join-item flex items-center px-6 text-xs font-mono text-[#e7d291] border-l border-r border-[#2e353b] min-w-[100px] justify-center bg-[#1a1d24]">
                            {currentPage} / {totalPages}
                        </div>
                        <button
                            className="join-item btn btn-sm bg-transparent border-none text-[#808fa6] hover:text-white disabled:opacity-30 disabled:bg-transparent uppercase font-bold tracking-wider w-24 transition-colors"
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
