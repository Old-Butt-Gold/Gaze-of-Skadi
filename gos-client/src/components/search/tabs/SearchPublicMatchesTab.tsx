import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { usePublicMatches } from '../../../hooks/queries/usePublicMatches';
import { useHeroes } from '../../../hooks/queries/useHeroes';
import { LoadingSpinner } from '../../ui/LoadingSpinner.tsx';
import { ErrorDisplay } from '../../ui/ErrorDisplay.tsx';
import { formatDuration, formatRelativeTime } from '../../../utils/formatUtils';
import { getGameModeName, getLobbyTypeName } from '../../../utils/enumUtils';
import { APP_ROUTES } from '../../../config/navigation';
import { Rank } from '../../../types/common';
import { RankIcon } from '../../distributions/RankIcon';
import { Icon } from '../../Icon';
import { getRankNameFull } from '../../../utils/rankUtils';

const RankFilter = (
    {label, onChange}: {
        label: string;
        onChange: (val: number | null) => void;
    }) => {
    const allRankValues = Object.values(Rank);

    const rankOptions = allRankValues.map(tier => ({
        name: getRankNameFull(tier as Rank),
        value: tier,
    }));

    return (
        <div className="flex flex-col gap-1.5 min-w-50">
            <label className="text-[10px] uppercase text-center font-bold text-[#58606e] tracking-wider">
                {label}
            </label>
            <select
                className="select w-full max-w-xs bg-[#1a1d24] text-center border border-[#2e353b] text-white focus:border-[#4a5568] focus:outline-none"
                onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
                defaultValue=""
            >
                <option value="">Any Rank</option>
                {rankOptions.map((r) => (
                    <option key={r.value} value={r.value}>
                        {r.name}<RankIcon rank={r.value} size={8}/>
                    </option>
                ))}
            </select>
        </div>
    );
};

export const SearchPublicMatchesTab: React.FC = () => {
    const { getHero } = useHeroes();
    const [minRank, setMinRank] = useState<number | null>(null);
    const [maxRank, setMaxRank] = useState<number | null>(null);
    const [lessThanMatchId, setLessThanMatchId] = useState<number | null>(null);

    const handleMinRankChange = (val: number | null) => { setMinRank(val); setLessThanMatchId(null); };
    const handleMaxRankChange = (val: number | null) => { setMaxRank(val); setLessThanMatchId(null); };
    const handleNextPage = () => { if (matches && matches.length > 0) { setLessThanMatchId(matches[matches.length - 1].matchId); window.scrollTo({ top: 0, behavior: 'smooth' }); } };
    const handleReset = () => { setLessThanMatchId(null); window.scrollTo({ top: 0, behavior: 'smooth' }); };

    const isValid = !minRank || !maxRank || minRank <= maxRank;
    const { data: matches, isLoading, isError, refetch, isFetching } = usePublicMatches(
        { minRank, maxRank, lessThanMatchId },
        isValid,
    );

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-6">

            <div className="bg-[#15171c] border border-[#2e353b] rounded-xl p-5 mb-6 shadow-lg">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">

                    <div className="flex flex-column items-center gap-3 flex-wrap">
                        <RankFilter label="Min Rank" onChange={handleMinRankChange} />
                        <div className="h-px w-4 bg-[#58606e] self-center mt-6 shrink-0"></div>
                        <RankFilter label="Max Rank" onChange={handleMaxRankChange} />
                    </div>
                    {!isValid && <div className="text-red-400 text-xs font-bold uppercase tracking-wide mt-2 sm:mt-6 animate-pulse">Min &gt; Max</div>}
                </div>
            </div>

            {isLoading && !matches ? (
                <div className="py-32 flex flex-col items-center justify-center">
                    <LoadingSpinner text="Scouring public matches..." />
                </div>
            ) : isError ? (
                <div className="py-32 flex items-center justify-center">
                    <ErrorDisplay message="Failed to load public matches" onRetry={refetch} />
                </div>
            ) : (
                <div className="space-y-4">

                    <div className="bg-[#15171c] border border-[#2e353b] rounded-xl overflow-hidden shadow-2xl">

                        {/* Desktop Header (Hidden on Mobile) */}
                        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-[#0f1114] border-b border-[#2e353b] text-[10px] uppercase text-[#58606e] font-bold tracking-wider">
                            <div className="col-span-2">Match ID</div>
                            <div className="col-span-2 text-center">Average Rank</div>
                            <div className="col-span-2 text-center">Game Mode</div>
                            <div className="col-span-2 text-center">Radiant</div>
                            <div className="col-span-2 text-center">Dire</div>
                            <div className="col-span-2 text-right">Duration</div>
                        </div>

                        {/* List Items */}
                        <div className="divide-y divide-[#2e353b]/50">
                            {matches?.map((match) => {
                                const radiantWon = match.radiantWin.value === 1;

                                return (
                                    <div key={match.matchId} className="group hover:bg-[#1e222b] transition-colors relative p-4 md:px-6 md:py-3 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">

                                        {/* Win Strip */}
                                        <div className={clsx("absolute left-0 top-0 bottom-0 w-1 transition-all", radiantWon ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]" : "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]")} />

                                        {/* Col 1: ID & Rank (Mobile: Top Row) */}
                                        <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-start md:flex-col md:items-start gap-2">
                                            <div className="flex flex-col">
                                                <Link to={`${APP_ROUTES.MATCHES}/${match.matchId}`} className="font-mono font-bold text-sm text-[#e3e3e3] hover:text-[#e7d291] hover:underline decoration-dashed underline-offset-4 transition-colors">
                                                    {match.matchId}
                                                </Link>
                                                <span className={clsx("text-[9px] uppercase font-bold tracking-widest", radiantWon ? "text-emerald-400" : "text-red-400")}>
                                                    {radiantWon ? 'Radiant Won' : 'Dire Won'}
                                                </span>
                                            </div>
                                            {/* Mobile Rank Show */}
                                            <div className="md:hidden flex items-center gap-2">
                                                <span className="text-[10px] text-[#58606e] font-bold">Tier {match.avgRankTier.value}</span>
                                                <RankIcon rank={match.avgRankTier.value} size={6} />
                                            </div>
                                        </div>

                                        {/* Col 2: Rank (Desktop only) */}
                                        <div className="hidden md:flex md:col-span-2 flex-col items-center justify-center gap-1">
                                            <div className="scale-110 drop-shadow-md"><RankIcon rank={match.avgRankTier.value} size={12} /></div>
                                        </div>

                                        {/* Col 3: Mode (Desktop) */}
                                        <div className="hidden md:flex md:col-span-2 flex-col items-center justify-center gap-1.5">
                                            <span className="inline-block px-2 py-0.5 rounded bg-[#2e353b]/50 border border-[#58606e]/30 text-[10px] font-bold text-[#a3aab8] uppercase tracking-wide whitespace-nowrap">
                                                {getGameModeName(match.gameMode.value)}
                                            </span>
                                            <span className="text-[10px] text-[#58606e] font-mono">{getLobbyTypeName(match.lobbyType.value)} Lobby</span>
                                        </div>

                                        <div className="col-span-1 md:col-span-4 grid grid-cols-2 gap-4 md:grid-cols-2 md:gap-0">
                                            <div className="flex flex-wrap justify-end md:justify-center gap-1 content-center">
                                                <div className="inline-flex p-1 gap-1 rounded bg-emerald-500/5 border border-emerald-500/10 flex-wrap justify-center">
                                                    {match.radiantTeam.map(heroId => {
                                                        const h = getHero(heroId);
                                                        return (
                                                            <div key={heroId} className="w-12 h-12 shrink-0" title={h?.localized_name}>
                                                                {h && <Icon src={h.img} alt={h.localized_name} />}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap justify-end md:justify-center gap-1 content-center">
                                                <div className="inline-flex p-1 gap-1 rounded bg-red-500/5 border border-red-500/10 flex-wrap justify-center">
                                                    {match.direTeam.map(heroId => {
                                                        const h = getHero(heroId);
                                                        return (
                                                            <div key={heroId} className="w-12 h-12 shrink-0" title={h?.localized_name}>
                                                                {h && <Icon src={h.img} alt={h.localized_name} />}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Col 4: Time (Mobile: Bottom Row) */}
                                        <div className="col-span-1 md:col-span-2 flex justify-between md:justify-end md:flex-col md:items-end items-center gap-0.5 border-t border-[#2e353b]/30 pt-2 md:border-0 md:pt-0">
                                            {/* Mobile Mode Show */}
                                            <div className="md:hidden flex items-center gap-2">
                                                <span className="text-[10px] text-[#a3aab8] font-bold">{getGameModeName(match.gameMode.value)}</span>
                                            </div>

                                            <div className="flex flex-col items-center">
                                                <span className="text-sm font-mono font-bold text-[#e3e3e3]">{formatDuration(match.duration)}</span>
                                                <span className="text-[10px] text-[#808fa6]">{formatRelativeTime(match.startTime)}</span>
                                            </div>
                                        </div>

                                    </div>
                                );
                            })}
                            {matches?.length === 0 && (
                                <div className="py-24 text-center opacity-50 flex flex-col items-center gap-2">
                                    <span className="text-4xl">🔭</span>
                                    <span className="uppercase font-bold tracking-widest text-sm text-[#58606e]">No matches found</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center px-2">
                        <button onClick={handleReset} disabled={!lessThanMatchId} className="flex items-center gap-2 text-xs font-bold text-[#58606e] hover:text-[#e7d291] uppercase tracking-widest disabled:opacity-0 transition-all">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg> Back to Start
                        </button>
                        <button onClick={handleNextPage} disabled={!matches || matches.length === 0 || isFetching} className="px-6 py-3 bg-[#e7d291] hover:bg-[#c2a455] text-[#0f1114] font-bold uppercase tracking-widest rounded shadow-[0_0_15px_rgba(231,210,145,0.2)] hover:shadow-[0_0_20px_rgba(231,210,145,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 active:scale-95">
                            {isFetching ? 'Loading...' : 'Load More Matches'} {!isFetching && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
