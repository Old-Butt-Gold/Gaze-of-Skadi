import React, { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { ErrorDisplay } from '../../ui/ErrorDisplay';
import { UnparsedMatchWarning } from '../UnparsedMatchWarning';
import { MatchPlayerCell } from '../MatchPlayerCell';
import { Icon } from '../../Icon';
import { HeroCell } from '../../heroes/HeroCell';
import { isRadiantTeam } from '../../../utils/matchUtils';
import { formatDuration } from '../../../utils/formatUtils';
import type { MatchOutletContext } from '../../../pages/MatchDetailsPage';
import type { PlayerPerformanceDto, MaxHeroHitDto } from '../../../types/matchPerformances';
import type { PlayerInfoDto } from '../../../types/matchGeneralInformation.ts';
import { useMatchPerformances } from "../../../hooks/queries/useMatchPerfomances.ts";
import {SourceIcon} from "../SourceIcon.tsx";

const MaxHitDisplay: React.FC<{ maxHit: MaxHeroHitDto | null | undefined }> = ({ maxHit }) => {
    if (!maxHit || !maxHit.maxHeroHitValue) return <span className="text-[#58606e] font-mono text-sm">-</span>;

    return (
        <div className="flex items-center gap-3 bg-[#0b0e13]/50 border border-[#2e353b]/50 px-3 py-1.5 rounded-lg shadow-inner">
            <div className="flex flex-col text-right">
                <span className="text-xs text-[#808fa6] uppercase tracking-widest font-bold leading-none mb-0.5">Max Hit</span>
                <span className="font-mono font-black text-red-400 drop-shadow-sm leading-none text-sm">
                    {maxHit.maxHeroHitValue.toLocaleString()}
                </span>
            </div>

            <div className="w-px h-6 bg-[#2e353b] mx-1" />

            <div className="flex items-center gap-2">
                <SourceIcon sourceName={maxHit.maxHeroHitAbilityOrItemName} />
                <span className="text-[#58606e] text-xs">➔</span>
                <HeroCell heroId={maxHit.maxHeroHitHeroId} showName={false} />
            </div>
        </div>
    );
};

const PlayerPerformanceCard: React.FC<{ player: PlayerInfoDto, performance: PlayerPerformanceDto | undefined }> = ({ player, performance }) => {
    const data = performance?.performance;

    // Прямое обращение к полям без использования `any`
    const metrics = [
        { key: 'mk', label: 'Max Multi-Kill', short: 'MK', rawValue: data?.multiKills },
        { key: 'ks', label: 'Max Kill Streak', short: 'KS', rawValue: data?.killStreaks },
        { key: 'stuns', label: 'Stun Duration (sec)', short: 'Stun', rawValue: data?.stunsDuration, isFloat: true },
        { key: 'stacks', label: 'Camp Stacks', short: 'Stack', rawValue: data?.stacks },
        { key: 'dead', label: 'Dead Time', short: 'Dead', rawValue: data?.deadTime, isTime: true },
        { key: 'tps', label: 'TP Scrolls Purchased', short: 'TPs', rawValue: data?.purchasedTpscroll },
        { key: 'bb', label: 'Buybacks Used', short: 'BB', rawValue: data?.buybacks },
        { key: 'pings', label: 'Map Pings', short: 'Ping', rawValue: data?.pings },
    ];

    return (
        <div className={"flex flex-col xl:flex-row gap-4 p-4 border border-[#2e353b] bg-[#15171c] hover:bg-[#1a1d24] transition-colors shadow-sm rounded-xl"}>
            <div className="flex items-center xl:w-56 shrink-0 xl:border-r border-[#2e353b]/50 xl:pr-4">
                <MatchPlayerCell player={player} useIcon={false} />
            </div>

            <div className="flex-1 grid grid-cols-4 sm:grid-cols-8 gap-2 items-center">
                {metrics.map(metric => {
                    let displayValue: React.ReactNode = <span className="text-[#58606e] font-mono text-xs">-</span>;

                    if (metric.rawValue != null && metric.rawValue > 0) {
                        if (metric.isFloat) {
                            displayValue = <span className="font-mono text-[#e3e3e3] font-bold">{Number(metric.rawValue).toFixed(1)}</span>;
                        } else if (metric.isTime) {
                            displayValue = <span className="font-mono text-red-300 font-bold">{formatDuration(Number(metric.rawValue))}</span>;
                        } else {
                            displayValue = <span className="font-mono text-[#e3e3e3] font-bold">{metric.rawValue}</span>;
                        }
                    }

                    return (
                        <div key={metric.key} className="flex flex-col items-center justify-center h-16 w-full p-2 rounded bg-[#0b0e13] border border-[#2e353b]/50 relative group/stat cursor-help">
                            <span className="text-xs text-[#808fa6] font-bold uppercase tracking-wider mb-1">{metric.short}</span>
                            {displayValue}

                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#e3e3e3] text-[#0b0e13] text-xs font-bold px-3 py-1.5 rounded shadow-xl opacity-0 invisible group-hover/stat:opacity-100 group-hover/stat:visible transition-all whitespace-nowrap z-50 pointer-events-none">
                                {metric.label}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#e3e3e3]" />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex items-center justify-start xl:justify-end xl:border-l border-[#2e353b]/50 xl:pl-4 shrink-0">
                <MaxHitDisplay maxHit={data?.maxHeroHit} />
            </div>
        </div>
    );
};

export const MatchPerformancesTab: React.FC = () => {
    const { matchId, players, isParsed } = useOutletContext<MatchOutletContext>();
    const { data: performancesData, isLoading, isError } = useMatchPerformances(matchId, isParsed);

    const { radiantPlayers, direPlayers, performancesMap } = useMemo(() => {
        const radiant: number[] = [];
        const dire: number[] = [];
        const pMap = new Map<number, PlayerPerformanceDto>();

        if (performancesData && Array.isArray(performancesData)) {
            performancesData.forEach(pd => pMap.set(pd.playerIndex, pd));
        }

        if (players && Array.isArray(players)) {
            players.forEach((p, idx) => {
                if (isRadiantTeam(p.isRadiant)) radiant.push(idx);
                else dire.push(idx);
            });
        }

        return { radiantPlayers: radiant, direPlayers: dire, performancesMap: pMap };
    }, [players, performancesData]);

    if (!isParsed) return <UnparsedMatchWarning />;
    if (isLoading) return <LoadingSpinner text="Analyzing Performances..." />;
    if (isError) return <ErrorDisplay message="Failed to load match performances." />;
    if (!performancesData || performancesData.length === 0) {
        return <div className="text-center text-[#808fa6] py-10 bg-[#15171c] rounded-xl border border-[#2e353b] mt-6 w-full lg:w-[90%] mx-auto">No performance data found.</div>;
    }

    return (
        <div className="w-full lg:w-[90%] mx-auto mt-6 animate-in fade-in duration-500 space-y-4 pb-10">

            <div className="space-y-3">
                <h3 className="flex items-center gap-3 text-lg font-serif font-bold text-emerald-400 uppercase tracking-widest px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-transparent border-l-4 border-emerald-500 rounded-r-lg w-full md:w-auto">
                    <Icon src="/assets/images/radiant.png" size={6} />
                    Radiant Performances
                </h3>
                <div className="flex flex-col gap-3">
                    {radiantPlayers.map(idx => (
                        <PlayerPerformanceCard
                            key={idx}
                            player={players[idx]}
                            performance={performancesMap.get(idx)}
                        />
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                <h3 className="flex items-center gap-3 text-lg font-serif font-bold text-red-400 uppercase tracking-widest px-4 py-2 bg-gradient-to-r from-red-500/10 to-transparent border-l-4 border-red-500 rounded-r-lg w-full md:w-auto">
                    <Icon src="/assets/images/dire.png" size={6} />
                    Dire Performances
                </h3>
                <div className="flex flex-col gap-3">
                    {direPlayers.map(idx => (
                        <PlayerPerformanceCard
                            key={idx}
                            player={players[idx]}
                            performance={performancesMap.get(idx)}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
};
