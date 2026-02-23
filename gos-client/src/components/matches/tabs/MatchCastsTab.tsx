import React, { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import clsx from 'clsx';
import { useMatchCasts } from '../../../hooks/queries/useMatchCasts';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { ErrorDisplay } from '../../ui/ErrorDisplay';
import { UnparsedMatchWarning } from '../UnparsedMatchWarning';
import { MatchPlayerCell } from '../MatchPlayerCell';
import { Icon } from '../../Icon';
import { HeroCell } from '../../heroes/HeroCell';
import { isRadiantTeam } from '../../../utils/matchUtils';
import type { MatchOutletContext } from '../../../pages/MatchDetailsPage';
import type { PlayerCastsDto, AbilityCastDto } from '../../../types/matchCasts';
import type { PlayerInfoDto } from '../../../types/matchPlayers';
import { SourceIcon } from "../SourceIcon.tsx";

const CastBadge: React.FC<{ children: React.ReactNode; count: number }> = ({ children, count }) => (
    <div className="relative flex shrink-0">
        {children}
        <div className="absolute -bottom-1.5 -right-1.5 border border-[#2e353b] text-[#e7d291] text-xs font-mono font-black px-1.5 py-0.5 rounded-md z-10 leading-none shadow-sm flex items-center justify-center bg-[#0b0e13]">
            {count.toLocaleString()}
        </div>
    </div>
);

const AbilityCastItem: React.FC<{ ability: AbilityCastDto }> = ({ ability }) => {
    const hasTargets = ability.targets && Object.keys(ability.targets).length > 0;

    return (
        <div className="flex items-center gap-3 p-1">
            <CastBadge count={ability.timesUsed}>
                <SourceIcon sourceName={ability.abilityKey} />
            </CastBadge>

            {hasTargets && (
                <>
                    <span className="text-[#58606e] text-xs px-1 flex items-center justify-center">➔</span>
                    <div className="flex flex-wrap items-center gap-2">
                        {Object.entries(ability.targets!)
                            .sort(([, countA], [, countB]) => countB - countA)
                            .map(([heroIdStr, count]) => (
                                <div key={heroIdStr} className="relative group/target flex items-center gap-2 shrink-0">
                                    <HeroCell heroId={parseInt(heroIdStr, 10)} showName={false} />
                                    <div className="absolute -top-1.5 -right-1.5 bg-red-500/20 border border-red-500/50 text-red-400 text-xs font-mono font-black px-1 rounded shadow-sm z-10 pointer-events-none flex items-center justify-center">
                                        {count}
                                    </div>
                                </div>
                            ))}
                    </div>
                </>
            )}
        </div>
    );
};

const PlayerCastsCard: React.FC<{ player: PlayerInfoDto, castsData: PlayerCastsDto | undefined, isRadiant: boolean }> = ({ player, castsData, isRadiant }) => {

    const sortedAbilities = useMemo(() => [...(castsData?.abilities || [])].sort((a, b) => b.timesUsed - a.timesUsed), [castsData]);
    const sortedItems = useMemo(() => [...(castsData?.items || [])].sort((a, b) => b.timesUsed - a.timesUsed), [castsData]);
    const sortedHits = useMemo(() => [...(castsData?.hits || [])].sort((a, b) => b.hitCount - a.hitCount), [castsData]);

    return (
        <div className={clsx(
            "flex flex-col xl:flex-row gap-5 lg:gap-6 p-4 lg:p-5 border border-[#2e353b] bg-[#15171c] hover:bg-[#1a1d24] transition-colors shadow-sm rounded-xl",
            isRadiant ? "border-l-4 border-l-emerald-500/50" : "border-l-4 border-l-red-500/50"
        )}>
            <div className="flex items-center justify-center xl:w-56 shrink-0 xl:border-r border-[#2e353b]/50 xl:pr-4">
                <MatchPlayerCell player={player} useIcon={false} />
            </div>

            <div className="flex-1 flex flex-col gap-6">

                <div className="flex flex-col gap-2.5">
                    <span className="text-xs text-[#808fa6] font-bold uppercase tracking-widest border-b border-[#2e353b]/50 pb-1 flex items-center gap-1.5">
                        Abilities Casts
                    </span>
                    <div className="flex flex-wrap gap-3">
                        {sortedAbilities.length > 0 ? (
                            sortedAbilities.map(ability => (
                                <AbilityCastItem key={ability.abilityKey} ability={ability} />
                            ))
                        ) : (
                            <span className="text-xs text-[#58606e] italic flex items-center h-full">No abilities casted.</span>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-2.5">
                    <span className="text-xs text-[#808fa6] font-bold uppercase tracking-widest border-b border-[#2e353b]/50 pb-1 flex items-center gap-1.5">
                        Items Casts
                    </span>
                    <div className="flex flex-wrap gap-4">
                        {sortedItems.length > 0 ? (
                            sortedItems.map(item => (
                                <div key={item.itemKey} className="p-1 cursor-help flex items-center justify-center">
                                    <CastBadge count={item.timesUsed}>
                                        <SourceIcon sourceName={item.itemKey} />
                                    </CastBadge>
                                </div>
                            ))
                        ) : (
                            <span className="text-xs text-[#58606e] italic flex items-center h-full">No items casted.</span>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-2.5">
                    <span className="text-xs text-[#808fa6] font-bold uppercase tracking-widest border-b border-[#2e353b]/50 pb-1 flex items-center gap-1.5">
                        Targets Hit
                    </span>
                    <div className="flex flex-wrap gap-4">
                        {sortedHits.length > 0 ? (
                            sortedHits.map(hit => {
                                return (
                                    <div key={hit.targetHeroKey} className="flex items-center gap-3 p-1">
                                        <div className="flex items-center justify-center">
                                            <SourceIcon sourceName={hit.targetHeroKey} />
                                        </div>
                                        <span className="text-[#58606e] text-xs flex items-center justify-center">➔</span>
                                        <span className="font-mono text-sm font-black text-red-400 drop-shadow-sm flex items-center justify-center">
                                            {hit.hitCount.toLocaleString()}
                                        </span>
                                    </div>
                                );
                            })
                        ) : (
                            <span className="text-xs text-[#58606e] italic flex items-center h-full">No targets hit.</span>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export const MatchCastsTab: React.FC = () => {
    const { matchId, players, isParsed } = useOutletContext<MatchOutletContext>();
    const { data: castsData, isLoading, isError } = useMatchCasts(matchId, isParsed);

    const { radiantPlayers, direPlayers, castsMap } = useMemo(() => {
        const radiant: number[] = [];
        const dire: number[] = [];
        const cMap = new Map<number, PlayerCastsDto>();

        if (castsData && Array.isArray(castsData)) {
            castsData.forEach(cd => cMap.set(cd.playerIndex, cd));
        }

        if (players && Array.isArray(players)) {
            players.forEach((p, idx) => {
                if (isRadiantTeam(p.isRadiant)) radiant.push(idx);
                else dire.push(idx);
            });
        }

        return { radiantPlayers: radiant, direPlayers: dire, castsMap: cMap };
    }, [players, castsData]);

    if (!isParsed) return <UnparsedMatchWarning />;
    if (isLoading) return <LoadingSpinner text="Analyzing Casts..." />;
    if (isError) return <ErrorDisplay message="Failed to load casts data." />;
    if (!castsData || castsData.length === 0) {
        return <div className="text-center text-[#808fa6] py-10 bg-[#15171c] rounded-xl border border-[#2e353b] mt-6 w-full lg:w-[90%] mx-auto">No casts data found.</div>;
    }

    return (
        <div className="w-full lg:w-[90%] mx-auto mt-6 animate-in fade-in duration-500 space-y-4 pb-10">

            <div className="space-y-3">
                <h3 className="flex items-center gap-3 text-lg font-serif font-bold text-emerald-400 uppercase tracking-widest px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-transparent border-l-4 border-emerald-500 rounded-r-lg w-full md:w-auto">
                    <Icon src="/assets/images/radiant.png" size={6} />
                    Radiant Casts
                </h3>
                <div className="flex flex-col gap-3">
                    {radiantPlayers.map(idx => (
                        <PlayerCastsCard
                            key={`rad-${idx}`}
                            player={players[idx]}
                            castsData={castsMap.get(idx)}
                            isRadiant={true}
                        />
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                <h3 className="flex items-center gap-3 text-lg font-serif font-bold text-red-400 uppercase tracking-widest px-4 py-2 bg-gradient-to-r from-red-500/10 to-transparent border-l-4 border-red-500 rounded-r-lg w-full md:w-auto">
                    <Icon src="/assets/images/dire.png" size={6} />
                    Dire Casts
                </h3>
                <div className="flex flex-col gap-3">
                    {direPlayers.map(idx => (
                        <PlayerCastsCard
                            key={`dir-${idx}`}
                            player={players[idx]}
                            castsData={castsMap.get(idx)}
                            isRadiant={false}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
};
