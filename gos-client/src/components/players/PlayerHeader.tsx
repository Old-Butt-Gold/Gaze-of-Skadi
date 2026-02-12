import React, { useState } from 'react';
import clsx from 'clsx';
import type { PlayerDto, PlayerEndpointParameters } from '../../types/player';
import { Icon } from '../Icon';
import { BooleanState } from '../../types/common';
import { usePlayerWinLoss } from "../../hooks/queries/usePlayerWinLoss";
import { RankIcon } from "../distributions/RankIcon";

interface Props {
    player: PlayerDto;
    filters: PlayerEndpointParameters;
}

const AliasesDropdown: React.FC<{ aliases: PlayerDto['aliases'] }> = ({ aliases }) => {
    const [isOpen, setIsOpen] = useState(false);

    if (!aliases || aliases.length === 0) return null;

    return (
        <div className="relative inline-block ml-3">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-6 h-6 flex items-center justify-center rounded bg-[#2e353b]/50 border border-[#2e353b] hover:text-[#e7d291] text-[#808fa6] transition-all"
                title="Show previous names"
            >
                <svg className={clsx("w-3 h-3 transition-transform duration-200", isOpen && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu - Fixed z-index and positioning context */}
            {isOpen && (
                <>
                    <div className="fixed inset-0" onClick={() => setIsOpen(false)} />
                    <div className="absolute left-0 top-full mt-2 w-72 bg-[#15171c] border border-[#2e353b] shadow-2xl rounded-lg z-[100] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="bg-[#1a1d24] px-3 py-2 text-[10px] font-bold text-[#58606e] uppercase tracking-wider border-b border-[#2e353b]">
                            Known Aliases
                        </div>
                        <div className="max-h-60 overflow-y-auto p-1 custom-scrollbar">
                            {aliases.map((alias, idx) => (
                                <div key={idx} className="flex justify-between items-center text-xs text-gray-300 hover:bg-[#2e353b] px-3 py-2 rounded transition-colors cursor-default group">
                                    <span className="truncate font-medium text-white group-hover:text-[#e7d291]">{alias.personaName}</span>
                                    <span className="text-[#58606e] text-[10px] whitespace-nowrap ml-4 tabular-nums">
                                        {new Date(alias.nameSince * 1000).toLocaleDateString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export const PlayerHeader: React.FC<Props> = ({ player, filters }) => {
    const { profile } = player;

    const { data: wl, isLoading: isWlLoading } = usePlayerWinLoss(profile.accountId, filters);

    const isStatsEmpty = wl && wl.wins === 0 && wl.losses === 0;
    const isHistoryAvailable = profile.fhUnavailable?.value !== BooleanState.True && !isStatsEmpty;

    const totalMatches = (wl?.wins || 0) + (wl?.losses || 0);
    const winRate = totalMatches > 0 ? ((wl?.wins || 0) / totalMatches * 100).toFixed(2) : '0.0';
    const winRateColor = Number(winRate) >= 50 ? 'text-emerald-400' : 'text-red-400';

    return (
        <div className="relative w-full bg-[#15171c] border-b border-[#2e353b] overflow-visible z-20"> {/* overflow-visible is key for dropdowns */}

            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f1114] via-[#15171c] to-transparent pointer-events-none z-0" />
            <div className="absolute top-0 right-0 w-full md:w-2/3 h-full bg-[url('/assets/images/dashboard_bg_2.jpg')] bg-cover bg-center opacity-10 mask-image-linear-gradient-to-l" />

            <div className="relative z-10 mx-auto px-4 py-8 md:py-10 max-w-7xl">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">

                    <div className="shrink-0 relative group">
                        <div className="w-40 h-40 rounded-xl border-2 border-[#2e353b] shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden bg-black relative z-10 transition-transform duration-300 group-hover:scale-[1.02]">
                            <img src={profile.avatarFull?.toString()} alt={profile.personaName} className="w-full h-full object-cover" />
                        </div>
                    </div>

                    <div className="flex-grow flex flex-col items-center md:items-start text-center md:text-left gap-3 w-full">

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 relative z-20"> {/* z-20 for aliases dropdown context */}
                            <h1 className="text-3xl md:text-4xl font-serif font-black text-white tracking-wide drop-shadow-md break-all">
                                {profile.personaName}
                            </h1>
                            <AliasesDropdown aliases={player.aliases} />
                        </div>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs md:text-sm font-medium text-[#808fa6]">
                            <a
                                href={profile.profileUrl?.toString()}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1.5 hover:text-white transition-colors bg-[#2e353b]/30 px-3 py-1.5 rounded-full border border-[#2e353b] hover:border-[#58606e]"
                            >
                                <Icon src="/assets/images/steam_icon.png" fallbackSrc="https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg" size={4} />
                                Steam
                            </a>
                            <div className="flex items-center gap-1.5 hover:text-white transition-colors bg-[#2e353b]/30 px-3 py-1.5 rounded-full border border-[#2e353b] hover:border-[#58606e]">
                                Name: {profile.name ?? "Unknown"}
                            </div>
                        </div>

                        <div className="mt-2 w-full md:w-auto">
                            {isHistoryAvailable ? (
                                <div className="inline-flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 sm:gap-8 bg-[#0f1114]/60 border border-[#2e353b] rounded-xl px-6 py-3 backdrop-blur-sm shadow-lg min-w-[280px]">
                                    {isWlLoading ? (
                                        <div className="h-10 w-full bg-[#2e353b] animate-pulse rounded" />
                                    ) : (
                                        <>
                                            <div className="text-center md:text-left">
                                                <div className="text-[10px] text-[#58606e] font-bold uppercase tracking-widest mb-0.5">Record</div>
                                                <div className="font-bold text-lg font-mono tracking-tight">
                                                    <span className="text-emerald-400">{wl?.wins}</span>
                                                    <span className="text-[#58606e] mx-1.5">-</span>
                                                    <span className="text-red-400">{wl?.losses}</span>
                                                </div>
                                            </div>
                                            <div className="w-full h-px sm:w-px sm:h-8 bg-[#2e353b]" />
                                            <div className="text-center md:text-left">
                                                <div className="text-[10px] text-[#58606e] font-bold uppercase tracking-widest mb-0.5">Win Rate</div>
                                                <div className={clsx("font-bold text-lg font-mono tracking-tight", winRateColor)}>
                                                    {winRate}%
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className="inline-flex items-center gap-3 bg-red-950/20 border border-red-900/40 text-red-200 px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]" />
                                    Match History Private
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-row md:flex-col items-center md:items-end gap-4 shrink-0 mt-4 md:mt-0 w-full md:w-auto justify-center md:justify-end">
                        <div className="relative group cursor-help transition-transform hover:scale-105">
                            <RankIcon rank={player.rankTier?.value} leaderboardRank={player.leaderboardRank} size={36} />
                        </div>

                        {profile.plus?.value === BooleanState.True && (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1d24]/80 border border-[#b78946]/30 rounded-lg shadow-lg backdrop-blur-sm group hover:border-[#b78946]/60 transition-colors" title="Dota Plus Member">
                                <img src="/assets/images/dota_plus_icon.png" alt="Plus" className="w-8 h-8 object-contain drop-shadow-md group-hover:scale-110 transition-transform" />
                                <span className="text-[#b78946] text-sm font-bold uppercase tracking-widest">Subscriber</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
