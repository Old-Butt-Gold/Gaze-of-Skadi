import React from 'react';
import clsx from 'clsx';
import { Icon } from '../Icon';
import {
    getGameModeName,
    getLobbyTypeName,
    getRegionName,
    getPatchName,
    getTierName
} from '../../utils/enumUtils';
import {
    formatDuration,
    formatRelativeTime,
    formatDateFull
} from '../../utils/formatUtils';
import { TeamEnum } from '../../types/common';
import type { MatchGeneralInformationDto } from '../../types/matchGeneralInformation';

interface MatchHeaderProps {
    matchData: MatchGeneralInformationDto;
}

export const MatchHeader: React.FC<MatchHeaderProps> = ({ matchData }) => {
    const { matchGeneral } = matchData;
    const isRadiantWin = matchGeneral.winner.value === TeamEnum.Radiant;
    const isDireWin = matchGeneral.winner.value === TeamEnum.Dire;

    const endTimeSeconds = matchGeneral.startTime + matchGeneral.duration;

    return (
        <div className="w-full bg-[#15171c] border-b border-[#2e353b] relative overflow-hidden">

            <div className={clsx(
                "absolute inset-0 opacity-[0.3] pointer-events-none transition-all duration-1000",
                isRadiantWin ? "bg-linear-to-r from-emerald-500 via-transparent to-transparent" :
                    isDireWin ? "bg-linear-to-l from-red-500 via-transparent to-transparent" : ""
            )} />

            <div className="w-full bg-[#0b0e13] border-b border-[#2e353b] relative z-20">
                <div className="mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-xs font-bold text-[#58606e] uppercase tracking-widest">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                        <span className="text-[#808fa6]">ID: <span className="text-white">{matchGeneral.matchId}</span></span>
                        <span className="hidden sm:inline opacity-50">•</span>
                        <span>Patch <span className="text-[#808fa6]">{getPatchName(matchGeneral.patch.value)}</span></span>
                        <span className="hidden sm:inline opacity-50">•</span>
                        <span className="text-[#808fa6]">Region – {getRegionName(matchGeneral.region.value)}</span>
                        <span className="hidden sm:inline opacity-50">•</span>
                        <span className="text-[#808fa6]">Lobby – {getLobbyTypeName(matchGeneral.lobbyType.value)}</span>
                    </div>

                    {matchGeneral.replayUrl && (
                        <a
                            href={matchGeneral.replayUrl.toString()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/30 shadow-sm"
                        >
                            <Icon src="/assets/images/download_icon.svg" size={4} /> Replay
                        </a>
                    )}
                </div>
            </div>

            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">

                <div className="flex flex-col items-center md:items-start flex-1 w-full min-w-0">
                    <div className="flex items-center justify-center md:justify-start gap-3 w-full min-w-0">
                        <Icon src="/assets/images/radiant.png" size={8} />
                        {matchGeneral.radiantTeam?.logoUrl && (
                            <Icon src={matchGeneral.radiantTeam.logoUrl.toString()} size={12}/>
                        )}
                        <span className="text-2xl sm:text-3xl font-serif font-black text-emerald-400 tracking-widest uppercase truncate drop-shadow-md" title={matchGeneral.radiantTeam?.name}>
                            {matchGeneral.radiantTeam?.name || "Radiant"}
                        </span>
                    </div>
                    {isRadiantWin ? (
                        <span className="mt-2 text-xs sm:text-xs font-bold text-[#e7d291] uppercase tracking-widest px-2.5 py-0.5 bg-[#e7d291]/10 rounded border border-[#e7d291]/30 drop-shadow-sm">
                            Winner
                        </span>
                    ) : (
                        <div className="h-6 mt-2" />
                    )}
                </div>

                <div className="flex flex-col items-center justify-center shrink-0 w-full md:w-auto">
                    <div className="text-xs sm:text-xs font-bold text-[#808fa6] uppercase tracking-widest mb-3 text-center">
                        {getGameModeName(matchGeneral.gameMode.value)}
                    </div>

                    <div className="flex items-center justify-center gap-6 sm:gap-10 bg-[#0b0e13]/60 px-8 sm:px-12 py-3 rounded-2xl border border-[#2e353b] shadow-inner backdrop-blur-sm">
                        <span className={clsx(
                            "text-4xl sm:text-5xl font-mono font-black drop-shadow-lg",
                            isRadiantWin ? "text-emerald-400" : "text-[#e3e3e3]"
                        )}>
                            {matchGeneral.radiantScore}
                        </span>
                        <span className="text-xl font-bold text-[#58606e] tracking-widest opacity-50">
                            VS
                        </span>
                        <span className={clsx(
                            "text-4xl sm:text-5xl font-mono font-black drop-shadow-lg",
                            isDireWin ? "text-red-400" : "text-[#e3e3e3]"
                        )}>
                            {matchGeneral.direScore}
                        </span>
                    </div>

                    <div className="flex flex-col items-center gap-1 mt-4">
                        <span className="text-xl sm:text-2xl font-mono font-black text-[#e3e3e3] tracking-wider drop-shadow-sm">
                            {formatDuration(matchGeneral.duration)}
                        </span>
                        <span
                            className="text-xs sm:text-xs font-bold text-[#58606e] uppercase tracking-wider cursor-help border-b border-dashed border-[#58606e]/50 hover:text-[#808fa6] transition-colors"
                            title={formatDateFull(endTimeSeconds)}
                        >
                            {formatRelativeTime(endTimeSeconds)}
                        </span>
                    </div>

                    {matchGeneral.league && (
                        <div className="mt-5 flex items-center justify-center gap-2 px-3 py-1.5 bg-[#1a1d24]/80 rounded-lg border border-[#e7d291]/20 backdrop-blur-sm shadow-md">
                            <span className="text-xs sm:text-xs text-[#e7d291] font-bold uppercase tracking-wider truncate max-w-37.5 sm:max-w-62.5" title={matchGeneral.league.name}>
                                {matchGeneral.league.name}
                            </span>
                            {matchGeneral.league.tier && (
                                <>
                                    <span className="w-px h-3 bg-[#e7d291]/30" />
                                    <span className="text-xs sm:text-xs text-[#e7d291] font-bold uppercase tracking-widest">
                                        {getTierName(matchGeneral.league.tier.value)}
                                    </span>
                                </>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex flex-col items-center md:items-end flex-1 w-full min-w-0">
                    <div className="flex items-center justify-center md:justify-end gap-3 w-full min-w-0">
                        <span className="text-2xl sm:text-3xl font-serif font-black text-red-400 tracking-widest uppercase truncate drop-shadow-md text-center md:text-right" title={matchGeneral.direTeam?.name}>
                            {matchGeneral.direTeam?.name || "Dire"}
                        </span>
                        {matchGeneral.direTeam?.logoUrl && (
                            <Icon src={matchGeneral.direTeam.logoUrl.toString()} size={12}/>
                        )}
                        <Icon src="/assets/images/dire.png" size={8} />
                    </div>
                    {isDireWin ? (
                        <span className="mt-2 text-xs sm:text-xs font-bold text-[#e7d291] uppercase tracking-widest px-2.5 py-0.5 bg-[#e7d291]/10 rounded border border-[#e7d291]/30 drop-shadow-sm">
                            Winner
                        </span>
                    ) : (
                        <div className="h-6 mt-2" />
                    )}
                </div>

            </div>
        </div>
    );
};
