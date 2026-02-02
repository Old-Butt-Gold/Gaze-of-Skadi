import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import type { TeamDto, TeamMatchDto } from '../../types/teams';
import { formatDuration, formatRelativeTime } from '../../utils/formatUtils';
import { Icon } from '../Icon';
import { isRadiantTeam, isTeamWon } from "../../utils/matchUtils.ts";
import {APP_ROUTES} from "../../config/navigation.ts";

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
            <div className="space-y-3">
                {paginatedMatches.map((match) => {
                    const weAreRadiant = isRadiantTeam(match.radiant);
                    const weWon = isTeamWon(match.radiant, match.radiantWin);

                    const radiantName = weAreRadiant ? team.name : match.opposingTeamName || 'Unknown Team';
                    const radiantLogo = weAreRadiant ? team.logoUrl : match.opposingTeamLogo;
                    const radiantId = weAreRadiant ? team.teamId : match.opposingTeamId;
                    const radiantScore = match.radiantScore;

                    const direName = !weAreRadiant ? team.name : match.opposingTeamName || 'Unknown Team';
                    const direLogo = !weAreRadiant ? team.logoUrl : match.opposingTeamLogo;
                    const direId = !weAreRadiant ? team.teamId : match.opposingTeamId;
                    const direScore = match.direScore;

                    return (
                        <div
                            key={match.matchId}
                            className="relative grid grid-cols-1 md:grid-cols-12 bg-[#15171c] hover:bg-[#1a1d24] border border-[#2e353b] hover:border-[#4a5568] rounded-xl overflow-hidden transition-all group shadow-sm hover:shadow-lg"
                        >
                            <div className={clsx(
                                "absolute left-0 top-0 bottom-0 w-1.5",
                                weWon
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
                                                to={`${APP_ROUTES.MATCHES}/${match.matchId}`}
                                                className="text-[#58606e] text-[10px] hover:text-white transition-colors border border-[#2e353b] px-1.5 py-0.5 rounded bg-[#0f1114]"
                                            >
                                                ID: {match.matchId}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 2. Match Context: Radiant vs Dire (Center Column) */}
                            <div className="col-span-12 md:col-span-6 flex items-center justify-between p-2 md:border-l border-[#2e353b] bg-[#121417] md:bg-transparent relative">

                                {/* === RADIANT SIDE (Left) === */}
                                <div className="flex flex-col items-center w-[40%] group/radiant">
                                    {/* Faction Header */}


                                    {/* Team Logo & Name */}
                                    <Link to={`/${APP_ROUTES.TEAMS}/${radiantId}`} className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity">
                                        <div className={clsx(
                                            "w-12 h-12 bg-[#0f1114] rounded-lg border flex items-center justify-center shadow-lg transition-all",
                                            "border-emerald-500/30 shadow-emerald-500/10"
                                        )}>
                                            <Icon src={radiantLogo || "fallback"} size={10} fallbackSrc="/assets/images/icon_team_default.png" />
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Icon src="/assets/images/radiant.png" alt="Radiant" size={4} />
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Radiant</span>
                                        </div>
                                        <span className={clsx(
                                            "text-xs font-bold text-center leading-tight line-clamp-1 max-w-[120px] transition-colors",
                                            weAreRadiant ? "text-white" : "text-[#808fa6] group-hover/radiant:text-white"
                                        )}>
                                            {radiantName}
                                        </span>
                                    </Link>
                                </div>

                                {/* === SCORE (Center) === */}
                                <div className="flex flex-col items-center w-[20%] z-10">
                                    <div className="font-mono font-black text-2xl tracking-widest text-[#e3e3e3] flex items-center justify-center gap-2 bg-[#0f1114]/50 px-3 py-1 rounded border border-[#2e353b]/50">
                                        {/* Radiant Score */}
                                        <span className={"text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]"}>
                                            {radiantScore}
                                        </span>
                                        <span className="text-[#58606e] text-sm">:</span>
                                        {/* Dire Score */}
                                        <span className={"text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.6)]"}>
                                            {direScore}
                                        </span>
                                    </div>
                                    <span className="text-[#58606e] text-[12px] font-bold uppercase mt-1 tracking-wider">{formatDuration(match.duration)}</span>
                                </div>

                                {/* === DIRE SIDE (Right) === */}
                                <div className="flex flex-col items-center w-[40%] group/dire">
                                    {/* Team Logo & Name */}
                                    <Link to={`${APP_ROUTES.TEAMS}/${direId}`} className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity">
                                        <div className={clsx(
                                            "w-12 h-12 bg-[#0f1114] rounded-lg border flex items-center justify-center shadow-lg transition-all",
                                            "border-red-500/30 shadow-red-500/10"
                                        )}>
                                            <Icon src={direLogo || "fallback"} size={10} fallbackSrc="/assets/images/icon_team_default.png" />
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">Dire</span>
                                            <Icon src="/assets/images/dire.png" alt="Dire" size={4} />
                                        </div>
                                        <span className={clsx(
                                            "text-xs font-bold text-center leading-tight line-clamp-1 max-w-[120px] transition-colors",
                                            !weAreRadiant ? "text-white" : "text-[#808fa6] group-hover/dire:text-white"
                                        )}>
                                            {direName}
                                        </span>
                                    </Link>
                                </div>
                            </div>

                            {/* 3. Result Badge (Right Column) */}
                            <div className="col-span-12 md:col-span-2 flex items-center justify-center md:justify-end p-4 md:pr-6 border-t md:border-t-0 md:border-l border-[#2e353b] bg-gradient-to-r from-transparent to-[#0f1114]/30">
                                <div className={clsx(
                                    "px-4 py-2 rounded-lg border backdrop-blur-sm flex flex-col items-center min-w-[80px]",
                                    weWon
                                        ? "bg-emerald-500/5 border-emerald-500/20"
                                        : "bg-red-500/5 border-red-500/20"
                                )}>
                                    <span className={clsx(
                                        "font-serif font-black text-sm uppercase tracking-widest leading-none",
                                        weWon ? "text-emerald-400" : "text-red-400"
                                    )}>
                                        {weWon ? 'Victory' : 'Defeat'}
                                    </span>
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
