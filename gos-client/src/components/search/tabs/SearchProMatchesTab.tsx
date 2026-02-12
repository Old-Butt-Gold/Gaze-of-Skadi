import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useProMatches } from '../../../hooks/queries/useProMatches';
import { LoadingSpinner } from '../../ui/LoadingSpinner.tsx';
import { ErrorDisplay } from '../../ui/ErrorDisplay.tsx';
import {formatDuration, formatRelativeTime} from '../../../utils/formatUtils';
import { APP_ROUTES } from '../../../config/navigation';
import { Icon } from '../../Icon.tsx';
import type { ProMatchDto } from '../../../types/proMatches';

const ProMatchCard = ({ match }: { match: ProMatchDto }) => {
    const radiantWon = match.radiantWin.value === 1;

    const matchDate = formatRelativeTime(match.startTime);

    return (
        <div className="group relative bg-[#15171c] border border-[#2e353b] hover:border-[#e7d291]/50 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] w-full">
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500 bg-cover bg-center bg-no-repeat md:hidden"
                    style={{backgroundImage: `url(${match.leagueImageUrl || '/assets/images/unknown-league.png'})`}}
                />

                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500 bg-contain bg-left bg-no-repeat hidden md:block"
                    style={{backgroundImage: `url(${match.leagueImageUrl || '/assets/images/unknown-league.png'})`}}
                />
            </div>

            <div className="relative z-10 p-4 md:p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">

                <div className="md:col-span-3 flex flex-row md:flex-col items-center md:items-start gap-3 md:gap-1 border-b md:border-b-0 border-[#2e353b]/50 pb-3 md:pb-0">
                    <div className="flex flex-col min-w-0">
                        <h4 className="text-[#e3e3e3] font-bold text-sm leading-tight w-full group-hover:text-[#e7d291] transition-colors text-wrap" title={match.leagueName}>
                            {match.leagueName || 'Unknown League'}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] text-[#808fa6] font-mono uppercase tracking-wider">
                                {matchDate}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-7 flex items-center justify-between gap-2 md:gap-6">

                    <div className="flex-1 flex flex-col items-start md:items-end text-left md:text-right min-w-0">
                        <div className="flex items-center gap-2 md:gap-3 mb-1">
                            <div className="w-8 h-8 rounded-full border-2 border-[#2e353b] overflow-hidden shrink-0">
                                <Icon
                                    src={match.radiantImage}
                                    fallbackSrc="/assets/images/icon_team_default.png"
                                    alt={match.radiantName}
                                />
                            </div>
                            <div className={clsx(
                                "font-serif font-bold text-sm md:text-lg w-full transition-colors relative pb-1",
                                radiantWon ? "text-white text-shadow-glow-green" : "text-[#808fa6]"
                            )}>
                                {match.radiantName || 'Radiant'}
                                {radiantWon && (
                                    <span className="absolute bottom-0 left-0 md:left-auto md:right-0 h-1 w-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-70" />
                                )}
                            </div>
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-500/70 hidden md:block">Radiant</span>
                    </div>

                    {/* Scoreboard */}
                    <div className="flex flex-col items-center shrink-0 mx-2">
                        <div className="flex items-center gap-3 bg-[#000]/40 border border-[#2e353b] px-3 py-1.5 rounded backdrop-blur-sm shadow-inner">
                            <span className={clsx("font-mono font-bold text-lg md:text-xl leading-none", radiantWon ? "text-emerald-400" : "text-[#58606e]")}>
                                {match.radiantScore}
                            </span>
                            <span className="text-[#2e353b] text-xs font-bold">:</span>
                            <span className={clsx("font-mono font-bold text-lg md:text-xl leading-none", !radiantWon ? "text-red-400" : "text-[#58606e]")}>
                                {match.direScore}
                            </span>
                        </div>
                        <span className="text-[10px] text-[#58606e] font-mono mt-1">
                            {formatDuration(match.duration)}
                        </span>
                    </div>

                    {/* Dire Team */}
                    <div className="flex-1 flex flex-col items-end md:items-start text-right md:text-left min-w-0">
                        <div className="flex items-center gap-2 md:gap-3 mb-1">
                            <div className="w-8 h-8 rounded-full border-2 border-[#2e353b] overflow-hidden shrink-0">
                                <Icon
                                    src={match.direImage}
                                    fallbackSrc="/assets/images/icon_team_default.png"
                                    alt={match.direName}
                                />
                            </div>
                            <div className={clsx(
                                "font-serif font-bold text-sm md:text-lg w-full transition-colors relative pb-1",
                                !radiantWon ? "text-white text-shadow-glow-red" : "text-[#808fa6]"
                            )}>
                                {match.direName || 'Dire'}
                                {/* Winner Underline */}
                                {!radiantWon && (
                                    <span className="absolute bottom-0 right-0 md:right-auto md:left-0 h-1 w-full bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-70" />
                                )}
                            </div>
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-red-500/70 hidden md:block">Dire</span>
                    </div>
                </div>

                <div className="md:col-span-2 flex justify-between md:justify-end items-center border-t border-[#2e353b]/50 pt-3 md:border-0 md:pt-0">
                    <span className="md:hidden text-[10px] text-[#58606e] uppercase tracking-widest">Match ID</span>
                    <Link
                        to={`${APP_ROUTES.MATCHES}/${match.matchId}`}
                        className="group/btn flex items-center gap-2 px-3 py-1.5 rounded bg-[#2e353b]/30 border border-[#2e353b] hover:bg-[#e7d291] hover:border-[#e7d291] hover:text-black transition-all"
                    >
                        <span className="text-xs font-mono font-bold text-[#808fa6] group-hover/btn:text-black">
                            {match.matchId}
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#58606e] group-hover/btn:text-black -rotate-45 group-hover/btn:rotate-0 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export const SearchProMatchesTab: React.FC = () => {
    const [lessThanMatchId, setLessThanMatchId] = useState<number | null>(null);

    const { data: matches, isLoading, isError, refetch, isFetching } = useProMatches(lessThanMatchId);

    const handleNextPage = () => {
        if (matches && matches.length > 0) {
            const lastMatch = matches[matches.length - 1];
            setLessThanMatchId(lastMatch.matchId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleReset = () => {
        setLessThanMatchId(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-6">

            <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col">
                    <h2 className="text-2xl font-serif font-bold text-white uppercase tracking-widest flex items-center gap-3">
                        <span className="w-8 h-8 rounded flex items-center justify-center text-black text-md">🏆</span>
                        Professional Circuit
                    </h2>
                    <p className="text-[#808fa6] text-sm mt-1">
                        Live results from official DPC leagues and tournaments.
                    </p>
                </div>
            </div>

            {/* Content State */}
            {isLoading && !matches ? (
                <div className="py-32 flex flex-col items-center justify-center gap-4">
                    <LoadingSpinner text="Connecting to Tournament Servers..." />
                </div>
            ) : isError ? (
                <div className="py-32 flex items-center justify-center">
                    <ErrorDisplay message="Failed to load pro matches" onRetry={refetch} />
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="space-y-4">
                        {matches?.map((match) => (
                            <ProMatchCard key={match.matchId} match={match} />
                        ))}
                    </div>

                    {matches?.length === 0 && (
                        <div className="py-24 text-center opacity-50 flex flex-col items-center gap-2">
                            <span className="text-4xl grayscale">🏟️</span>
                            <span className="uppercase font-bold tracking-widest text-sm text-[#58606e]">No tournaments found</span>
                        </div>
                    )}

                    {/* Pagination */}
                    <div className="flex justify-between items-center pt-6 border-t border-[#2e353b]">
                        <button onClick={handleReset} disabled={!lessThanMatchId} className="flex items-center gap-2 text-xs font-bold text-[#58606e] hover:text-[#e7d291] uppercase tracking-widest disabled:opacity-0 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Back to Recent
                        </button>

                        <button onClick={handleNextPage} disabled={!matches || matches.length === 0 || isFetching} className="px-8 py-3 bg-[#e7d291] hover:bg-[#c2a455] text-[#0f1114] font-bold uppercase tracking-widest rounded shadow-lg hover:shadow-[0_0_20px_rgba(231,210,145,0.3)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center gap-2">
                            {isFetching ? 'Loading...' : 'Load More Matches'}
                            {!isFetching && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
