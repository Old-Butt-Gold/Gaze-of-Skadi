import React, { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import clsx from 'clsx';
import { useMatchDamage } from '../../../hooks/queries/useMatchDamage';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { ErrorDisplay } from '../../ui/ErrorDisplay';
import { UnparsedMatchWarning } from '../UnparsedMatchWarning';
import { MatchPlayerCell } from '../MatchPlayerCell';
import { Icon } from '../../Icon';
import { HeroCell } from '../../heroes/HeroCell';
import { SourceIcon } from '../SourceIcon';
import { isRadiantTeam } from '../../../utils/matchUtils';
import type { MatchOutletContext } from '../../../pages/MatchDetailsPage';
import type { PlayerDamageDto } from '../../../types/matchDamage';
import type { PlayerInfoDto } from '../../../types/matchGeneralInformation.ts';

interface IndexedPlayer {
    info: PlayerInfoDto;
    index: number;
}

const formatNumber = (num: number | undefined | null) => {
    if (!num || num === 0) return '-';
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    return num.toString();
};

const MatrixGrid: React.FC<{
    title: string;
    sourcePlayers: IndexedPlayer[];
    targetPlayers: IndexedPlayer[];
    damageMap: Map<number, PlayerDamageDto>;
    type: 'kills' | 'damage';
    isSourceRadiant: boolean;
}> = ({ title, sourcePlayers, targetPlayers, damageMap, type, isSourceRadiant }) => {
    return (
        <div className="flex flex-col bg-[#15171c] border border-[#2e353b] rounded-xl overflow-hidden shadow-sm flex-1 min-w-[300px]">
            <div className="bg-[#1a1d24] border-b border-[#2e353b] p-3 flex justify-center items-center">
                <span className="text-xs font-bold text-[#808fa6] uppercase tracking-widest">{title}</span>
            </div>
            <div className="overflow-x-auto">
                <div className="min-w-max grid grid-cols-[auto_repeat(5,minmax(50px,1fr))_minmax(60px,1fr)]">
                    <div className="p-2 border-b border-r border-[#2e353b]/50 bg-[#0b0e13]/30" />
                    {targetPlayers.map((tp) => (
                        <div key={tp.index} className="p-2 border-b border-[#2e353b]/50 bg-[#0b0e13]/30 flex items-center justify-center">
                            <HeroCell heroId={tp.info.heroId} />
                        </div>
                    ))}
                    <div className="p-2 border-b border-l border-[#2e353b]/50 bg-[#0b0e13]/50 flex items-center justify-center">
                        <Icon size={8} src={isSourceRadiant ? "/assets/images/radiant.png" : "/assets/images/dire.png"}/>
                    </div>

                    {sourcePlayers.map((sp) => {
                        const stats = damageMap.get(sp.index);
                        let rowTotal = 0;

                        return (
                            <React.Fragment key={sp.index}>
                                <div className="p-2 border-r border-b border-[#2e353b]/50 bg-[#0b0e13]/30 flex items-center justify-center">
                                    <HeroCell heroId={sp.info.heroId} />
                                </div>
                                {targetPlayers.map((tp) => {
                                    let val = 0;
                                    if (type === 'kills') {
                                        val = stats?.killedHeroes.find(k => k.heroId === tp.info.heroId)?.times || 0;
                                    } else {
                                        val = stats?.damageDealtToHeroes.find(d => d.heroId === tp.info.heroId)?.damage || 0;
                                    }
                                    rowTotal += val;

                                    return (
                                        <div key={tp.index} className="p-2 border-b border-[#2e353b]/50 flex items-center justify-center transition-colors">
                                            <span className={clsx("font-mono text-xs font-bold", val > 0 ? (type === 'kills' ? "text-[#e3e3e3]" : "text-red-400") : "text-[#58606e]")}>
                                                {type === 'damage' ? formatNumber(val) : (val === 0 ? '-' : val)}
                                            </span>
                                        </div>
                                    );
                                })}
                                <div className="p-2 border-l border-b border-[#2e353b]/50 bg-[#0b0e13]/50 flex items-center justify-center">
                                    <span className={clsx("font-mono text-xs font-black", rowTotal > 0 ? "text-[#e7d291]" : "text-[#58606e]")}>
                                        {type === 'damage' ? formatNumber(rowTotal) : (rowTotal === 0 ? '-' : rowTotal)}
                                    </span>
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const PlayerDamageBreakdownRow: React.FC<{ player: PlayerInfoDto; data: PlayerDamageDto | undefined; }> = ({ player, data }) => {
    const dealt = useMemo(() => [...(data?.damageDealtByInflictor || [])].sort((a, b) => b.totalDamage - a.totalDamage), [data]);
    const received = useMemo(() => [...(data?.damageTakenByInflictor || [])].sort((a, b) => b.totalDamage - a.totalDamage), [data]);

    return (
        <div className={"flex flex-col xl:flex-row border-b border-[#2e353b]/50 transition-colors"}>
            <div className="flex items-center justify-center xl:justify-start xl:w-56 shrink-0 xl:border-r border-[#2e353b]/50 p-4">
                <MatchPlayerCell player={player} useIcon={false} />
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
                <div className="flex flex-col gap-1.5">
                    {dealt.length > 0 ? dealt.map(inflictor => (
                        <div key={inflictor.inflictorKey} className="flex items-center gap-3 p-0.5 rounded-lg transition-colors">
                            <div className="flex flex-col items-center justify-center gap-1 shrink-0 w-12">
                                <SourceIcon sourceName={inflictor.inflictorKey} />
                                <span className="font-mono text-xs font-bold text-[#e7d291] leading-none">{formatNumber(inflictor.totalDamage)}</span>
                            </div>
                            <span className="text-[#58606e] text-xs flex items-center justify-center shrink-0">➔</span>
                            <div className="flex flex-wrap items-center gap-2.5">
                                {[...inflictor.breakdown].sort((a, b) => b.damage - a.damage).map(target => (
                                    <div key={target.targetHeroId} className="flex flex-col items-center justify-center gap-1">
                                        <HeroCell heroId={target.targetHeroId} />
                                        <span className="font-mono text-xs font-bold text-red-400 leading-none">{formatNumber(target.damage)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )) : <span className="text-xs text-[#58606e] italic flex items-center h-full px-2">No damage dealt.</span>}
                </div>

                <div className="flex flex-wrap gap-3 items-center content-center h-full">
                    {received.length > 0 ? received.map(inflictor => (
                        <div key={inflictor.inflictorKey} className="flex flex-col items-center justify-center gap-1 rounded-lg transition-colors w-12">
                            <SourceIcon sourceName={inflictor.inflictorKey} />
                            <span className="font-mono text-xs font-bold text-red-300 leading-none">{formatNumber(inflictor.totalDamage)}</span>
                        </div>
                    )) : <span className="text-xs text-[#58606e] italic flex items-center h-full px-2">No damage received.</span>}
                </div>
            </div>
        </div>
    );
};

export const MatchDamageTab: React.FC = () => {
    const { matchId, players, isParsed } = useOutletContext<MatchOutletContext>();
    const { data: damageData, isLoading, isError } = useMatchDamage(matchId, isParsed);

    const { radiantPlayers, direPlayers, damageMap } = useMemo(() => {
        const radiant: IndexedPlayer[] = [];
        const dire: IndexedPlayer[] = [];
        const map = new Map<number, PlayerDamageDto>();

        if (players && Array.isArray(players)) {
            players.forEach((p, idx) => {
                if (isRadiantTeam(p.isRadiant)) radiant.push({ info: p, index: idx });
                else dire.push({ info: p, index: idx });
            });
        }

        if (damageData && Array.isArray(damageData)) {
            damageData.forEach(d => map.set(d.playerIndex, d));
        }

        return { radiantPlayers: radiant, direPlayers: dire, damageMap: map };
    }, [players, damageData]);

    if (!isParsed) return <UnparsedMatchWarning />;
    if (isLoading) return <LoadingSpinner text="Calculating Damage Outputs..." />;
    if (isError) return <ErrorDisplay message="Failed to load damage data." />;
    if (!damageData || damageData.length === 0) {
        return <div className="text-center text-[#808fa6] py-10 bg-[#15171c] rounded-xl border border-[#2e353b] mt-6 w-full lg:w-[90%] mx-auto">No damage data found.</div>;
    }

    return (
        <div className="w-full lg:w-[90%] mx-auto mt-6 animate-in fade-in duration-500 space-y-4 pb-10">

            <div className="space-y-4">
                <div className="flex items-center gap-3 px-4 py-2 bg-linear-to-r from-emerald-500/10 to-transparent border-l-4 border-emerald-500 rounded-r-lg w-full md:w-auto self-start">
                    <Icon src="/assets/images/radiant.png" size={6} />
                    <h3 className="text-lg font-serif font-bold text-emerald-400 uppercase tracking-widest drop-shadow-sm">Radiant vs Dire</h3>
                </div>
                <div className="flex flex-col xl:flex-row gap-4">
                    <MatrixGrid title="Kills" sourcePlayers={radiantPlayers} targetPlayers={direPlayers} damageMap={damageMap} type="kills" isSourceRadiant={true} />
                    <MatrixGrid title="Damage" sourcePlayers={radiantPlayers} targetPlayers={direPlayers} damageMap={damageMap} type="damage" isSourceRadiant={true} />
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-3 px-4 py-2 bg-linear-to-r from-red-500/10 to-transparent border-l-4 border-red-500 rounded-r-lg w-full md:w-auto self-start">
                    <Icon src="/assets/images/dire.png" size={6} />
                    <h3 className="text-lg font-serif font-bold text-red-400 uppercase tracking-widest drop-shadow-sm">Dire vs Radiant</h3>
                </div>
                <div className="flex flex-col xl:flex-row gap-4">
                    <MatrixGrid title="Kills" sourcePlayers={direPlayers} targetPlayers={radiantPlayers} damageMap={damageMap} type="kills" isSourceRadiant={false} />
                    <MatrixGrid title="Damage" sourcePlayers={direPlayers} targetPlayers={radiantPlayers} damageMap={damageMap} type="damage" isSourceRadiant={false} />
                </div>
            </div>

            <div className="bg-[#15171c] border border-[#2e353b] rounded-xl overflow-hidden shadow-xl">

                <div className="hidden xl:grid grid-cols-[224px_1fr_1fr] bg-[#1a1d24] border-b border-[#2e353b]">
                    <div className="p-4 border-r border-[#2e353b]/50 text-xs font-bold text-[#808fa6] uppercase tracking-widest text-center">Player</div>
                    <div className="p-4 text-xs font-bold text-[#38bdf8] uppercase tracking-widest text-center">Dealt</div>
                    <div className="p-4 text-xs font-bold text-[#e7d291] uppercase tracking-widest text-center">Received</div>
                </div>

                <div className="flex flex-col">
                    <div className="bg-linear-to-r from-emerald-500/10 to-[#1a1d24] border-y border-[#2e353b] px-4 py-2 flex items-center gap-2">
                        <Icon src="/assets/images/radiant.png" size={5} />
                        <span className="text-emerald-400 font-serif font-bold uppercase tracking-widest text-sm">Radiant - Damage Breakdown</span>
                    </div>

                    {radiantPlayers.map((p) => (
                        <PlayerDamageBreakdownRow key={p.index} player={p.info} data={damageMap.get(p.index)} />
                    ))}

                    <div className="bg-linear-to-r from-red-500/10 to-[#1a1d24] border-y border-[#2e353b] px-4 py-2 flex items-center gap-2 mt-4 xl:mt-0">
                        <Icon src="/assets/images/dire.png" size={5} />
                        <span className="text-red-400 font-serif font-bold uppercase tracking-widest text-sm">Dire - Damage Breakdown</span>
                    </div>

                    {direPlayers.map((p) => (
                        <PlayerDamageBreakdownRow key={p.index} player={p.info} data={damageMap.get(p.index)} />
                    ))}
                </div>
            </div>

        </div>
    );
};
