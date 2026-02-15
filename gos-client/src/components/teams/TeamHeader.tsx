import React from 'react';
import { Icon } from '../Icon';
import clsx from 'clsx';
import type { TeamDto } from "../../types/teams.ts";
import { formatRelativeTime } from "../../utils/formatUtils.ts";

interface Props {
    team: TeamDto;
}

export const TeamHeader: React.FC<Props> = ({ team }) => {
    const totalGames = team.wins + team.losses;
    const winRate = totalGames > 0 ? (team.wins / totalGames) * 100 : 0;

    return (
        <div className="relative bg-[#1a1d24] border-b border-[#2e353b] overflow-hidden">
            {/* Background Texture/Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f1114] via-[#1a1d24] to-[#0f1114] z-0"></div>
            <div className="absolute inset-0 bg-[url('/assets/images/texture_pattern.png')] opacity-5 z-0 mix-blend-overlay"></div>

            <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col items-center gap-6 md:gap-8">

                    {/* Logo Container */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-br from-[#e7d291]/20 to-transparent rounded-2xl blur opacity-50 group-hover:opacity-100 transition-opacity"></div>
                            <Icon
                                src={team.logoUrl || "fallback"}
                                size={64}
                                fallbackSrc="/assets/images/icon_team_default.png"
                                alt={team.tag}
                            />
                    </div>

                    <div className="flex-1 text-center">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-serif font-black text-white tracking-wide uppercase drop-shadow-md">
                                {team.name}
                            </h1>
                            {/* Centered tags */}
                            <div className="flex items-center justify-center gap-3 mt-2">
                                <span className="px-3 py-1 bg-[#2e353b] text-[#e7d291] text-xs font-bold uppercase tracking-widest rounded border border-[#4a5568]">
                                    {team.tag || 'NO TAG'}
                                </span>
                                {team.lastMatchTime > 0 && (
                                    <span className="text-[#808fa6] text-xs font-mono">
                                        Last Active: {formatRelativeTime(team.lastMatchTime)}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Stats Row - Centered */}
                        <div className="flex flex-wrap justify-center gap-8 md:gap-16 pt-4">
                            <div className="text-center">
                                <div className="text-[#58606e] text-[10px] uppercase font-bold tracking-widest mb-1">Rating</div>
                                <div className="text-3xl font-mono font-bold text-[#e7d291] leading-none">
                                    {team.rating.toFixed(0)}
                                </div>
                            </div>

                            <div className="text-center">
                                <div className="text-[#58606e] text-[10px] uppercase font-bold tracking-widest mb-1">Win Rate</div>
                                <div className={clsx("text-3xl font-mono font-bold leading-none", winRate >= 50 ? "text-emerald-400" : "text-[#808fa6]")}>
                                    {winRate.toFixed(1)}%
                                </div>
                            </div>

                            <div className="text-center">
                                <div className="text-[#58606e] text-[10px] uppercase font-bold tracking-widest mb-1">Record</div>
                                <div className="text-3xl font-mono font-bold text-white leading-none">
                                    {team.wins}<span className="text-[#58606e] text-xl mx-1">W</span>
                                    <span className="text-[#2e353b] mx-1">/</span>
                                    {team.losses}<span className="text-[#58606e] text-xl mx-1">L</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
