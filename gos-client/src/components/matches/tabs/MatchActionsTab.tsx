import React, { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useMatchActions } from '../../../hooks/queries/useMatchActions';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { ErrorDisplay } from '../../ui/ErrorDisplay';
import { UnparsedMatchWarning } from '../UnparsedMatchWarning';
import { MatchPlayerCell } from '../MatchPlayerCell';
import type { MatchOutletContext } from '../../../pages/MatchDetailsPage';
import { isRadiantTeam, UNIT_ORDER_CONFIG } from '../../../utils/matchUtils';
import { Icon } from "../../Icon.tsx";
import type { PlayerActionsDto } from '../../../types/matchActions';

export const MatchActionsTab: React.FC = () => {
    const { matchId, players, isParsed } = useOutletContext<MatchOutletContext>();
    const { data: actionsData, isLoading, isError } = useMatchActions(matchId, isParsed);

    const { radiantPlayers, direPlayers, actionsMap } = useMemo(() => {
        const radiant: number[] = [];
        const dire: number[] = [];
        const aMap = new Map<number, PlayerActionsDto>();

        if (actionsData && Array.isArray(actionsData)) {
            actionsData.forEach(ad => {
                aMap.set(ad.playerIndex, ad);
            });
        }

        if (players && Array.isArray(players)) {
            players.forEach((p, idx) => {
                if (isRadiantTeam(p.isRadiant)) {
                    radiant.push(idx);
                } else {
                    dire.push(idx);
                }
            });
        }

        return { radiantPlayers: radiant, direPlayers: dire, actionsMap: aMap };
    }, [players, actionsData]);

    if (!isParsed) return <UnparsedMatchWarning />;
    if (isLoading) return <LoadingSpinner text="Analyzing Actions..." />;
    if (isError) return <ErrorDisplay message="Failed to load player actions." />;
    if (!actionsData || actionsData.length === 0) {
        return <div className="text-center text-[#808fa6] py-10 bg-[#15171c] rounded-xl border border-[#2e353b] mt-6 w-full lg:w-[90%] mx-auto">No actions data found.</div>;
    }

    const PlayerActionCard = ({ playerIdx }: { playerIdx: number }) => {
        const player = players[playerIdx];
        const data = actionsMap.get(playerIdx);

        if (!player || !data || !data.actions) return null;

        const groupedActions: Record<string, { short: string, full: string, val: number }[]> = {};

        data.actions.forEach(a => {
            if (!a || !a.key || a.value <= 0) return;

            const config = UNIT_ORDER_CONFIG[a.key.value] || { short: `Unknown(${a.key.value})`, full: `Unknown Order ${a.key.value}`, group: "Misc" };

            if (!groupedActions[config.group]) groupedActions[config.group] = [];
            groupedActions[config.group].push({ short: config.short, full: config.full, val: a.value });
        });

        const groupOrder = ['Movement', 'Combat', 'Abilities', 'Items', 'Misc'];

        return (
            <div className="bg-[#15171c] border border-[#2e353b] rounded-xl p-4 flex flex-col xl:flex-row gap-4 lg:gap-6 shadow-md hover:border-[#4a5568] transition-colors relative">
                <div className="flex flex-col md:flex-row xl:flex-col items-center justify-center gap-4 xl:w-56 shrink-0 xl:border-r border-[#2e353b] xl:pr-4">
                    <div className="flex items-center justify-center w-full">
                        <MatchPlayerCell player={player} useIcon={false} />
                    </div>
                    <div className="flex flex-col bg-[#0b0e13] border border-[#2e353b] rounded-lg px-4 py-2 text-center w-full md:w-auto xl:w-full">
                        <span className="text-[10px] text-[#58606e] font-bold uppercase tracking-widest">Actions / Min</span>
                        <span className="text-2xl font-mono font-black text-[#e7d291] leading-none drop-shadow-sm">{data.actionsPerMin || 0}</span>
                    </div>
                </div>

                <div className="flex-1 flex flex-col gap-4">
                    {groupOrder.map(groupName => {
                        const items = groupedActions[groupName];
                        if (!items || items.length === 0) return null;

                        items.sort((a, b) => b.val - a.val);

                        return (
                            <div key={groupName} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 border-b border-[#2e353b]/30 pb-3 last:border-b-0 last:pb-0">
                                <span className="text-xs font-bold text-[#808fa6] uppercase tracking-widest sm:w-24 shrink-0 sm:text-right pt-1">
                                    {groupName}
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    {items.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="relative group/badge flex items-center border border-[#2e353b] rounded shadow-sm cursor-help bg-[#0b0e13]"
                                        >
                                            <span className="px-2 py-1 text-xs font-bold text-[#e3e3e3] bg-[#1a1d24] rounded-l">
                                                {item.short}
                                            </span>
                                            <span className="px-2 py-1 text-xs font-mono text-[#e7d291] rounded-r">
                                                {item.val.toLocaleString()}
                                            </span>
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 bg-[#e3e3e3] text-[#0b0e13] text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded shadow-lg opacity-0 invisible group-hover/badge:opacity-100 group-hover/badge:visible transition-all whitespace-nowrap z-50 pointer-events-none">
                                                {item.full}
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#e3e3e3]" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="w-full lg:w-[90%] mx-auto mt-6 animate-in fade-in duration-500 space-y-4">

            <div className="space-y-4">
                <h3 className="flex items-center gap-3 text-lg font-serif font-bold text-emerald-400 uppercase tracking-widest px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-transparent border-l-4 border-emerald-500 rounded-r-lg">
                    <Icon src="/assets/images/radiant.png" size={6} /> Radiant Actions
                </h3>
                <div className="flex flex-col gap-3">
                    {radiantPlayers.map(idx => <PlayerActionCard key={`rad-${idx}`} playerIdx={idx} />)}
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="flex items-center gap-3 text-lg font-serif font-bold text-red-400 uppercase tracking-widest px-4 py-2 bg-gradient-to-r from-red-500/10 to-transparent border-l-4 border-red-500 rounded-r-lg">
                    <Icon src="/assets/images/dire.png" size={6} /> Dire Actions
                </h3>
                <div className="flex flex-col gap-3">
                    {direPlayers.map(idx => <PlayerActionCard key={`dir-${idx}`} playerIdx={idx} />)}
                </div>
            </div>

        </div>
    );
};
