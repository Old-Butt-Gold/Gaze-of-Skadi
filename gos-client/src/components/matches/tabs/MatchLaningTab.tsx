import React, { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import clsx from 'clsx';
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    type TooltipProps,
    XAxis,
    YAxis
} from 'recharts';
import { useMatchLaning } from '../../../hooks/queries/useMatchLaning.ts';
import { LoadingSpinner } from '../../ui/LoadingSpinner.tsx';
import { ErrorDisplay } from '../../ui/ErrorDisplay.tsx';
import { Icon } from '../../Icon.tsx';
import { HeroCell } from '../../heroes/HeroCell.tsx';
import { getPlayerColor, isRadiantTeam } from '../../../utils/matchUtils.ts';
import { parsePositionsToHeatmap } from '../../../utils/heatmapUtils.ts';
import type { MatchOutletContext } from '../../../pages/MatchDetailsPage.tsx';
import type { PlayerInfoDto } from '../../../types/matchPlayers.ts';
import type { PlayerLaneDto } from '../../../types/matchLaning.ts';
import { MatchPlayerCell } from "../MatchPlayerCell.tsx";
import { HeatmapCanvas } from "../../players/HeatmapCanvas.tsx";
import { UnparsedMatchWarning } from "../UnparsedMatchWarning.tsx";

interface PlayerTooltipProps extends TooltipProps<number, string> {
    players: PlayerInfoDto[];
}

const LaningGraphTooltip: React.FC<PlayerTooltipProps> = ({ active, payload, label, players }) => {
    if (active && payload && payload.length) {
        const sorted = [...payload].sort((a, b) => (b.value || 0) - (a.value || 0));

        return (
            <div className="bg-[#1a1d24]/95 backdrop-blur-md border border-[#2e353b] p-3 rounded-xl shadow-2xl min-w-[240px] z-50">
                <p className="text-[#808fa6] font-mono font-bold text-xs mb-3 border-b border-[#2e353b]/50 pb-2 text-center">
                    {label}:00
                </p>
                <div className="flex flex-col gap-1.5">
                    {sorted.map((entry) => {
                        if (!entry.dataKey) return null;
                        const pIndex = parseInt(entry.dataKey.toString().replace('player', ''));
                        const player = players[pIndex];
                        if (!player) return null;

                        return (
                            <div key={entry.dataKey} className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-2 min-w-0">
                                    <HeroCell heroId={player.heroId} showName={false} />
                                    <span
                                        className="text-xs font-bold truncate max-w-[110px]"
                                        style={{ color: entry.color }}
                                    >
                                        {player.personaName || 'Unknown'}
                                    </span>
                                </div>
                                <span className="text-xs font-mono font-black text-[#e3e3e3] shrink-0">
                                    {entry.value?.toLocaleString()}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
    return null;
};

const PlayerLaningCard: React.FC<{ player: PlayerInfoDto, laningData: PlayerLaneDto | undefined, isRadiant: boolean }> = ({ player, laningData, isRadiant }) => {
    const heatmapData = useMemo(() => {
        if (!laningData?.lanePositions) return {};
        return parsePositionsToHeatmap(laningData.lanePositions);
    }, [laningData]);

    const efficiency = laningData?.laneEfficiency ?? 0.0;

    return (
        <div className={"flex flex-col xl:flex-row gap-6 p-4 lg:p-5 border border-[#2e353b] bg-[#15171c] hover:bg-[#1a1d24] transition-colors shadow-sm rounded-xl"}>
            <div className="flex items-center xl:w-56 shrink-0 xl:border-r border-[#2e353b]/50 xl:pr-4">
                <MatchPlayerCell player={player} useIcon={false} />
            </div>

            <div className="flex-1 grid grid-cols-3 gap-3 items-center">
                <div
                    className="flex flex-col items-center justify-center h-16 w-full p-2 rounded bg-[#0b0e13] border border-[#2e353b]/50 cursor-help"
                    title="Lane Efficiency: How well the player farmed compared to perfect creep score."
                >
                    <span className="text-[10px] text-[#808fa6] font-bold uppercase tracking-wider mb-1">Efficiency</span>
                    <span className={clsx("font-mono font-bold text-sm", efficiency >= 70 ? "text-emerald-400" : efficiency >= 50 ? "text-yellow-400" : "text-[#e3e3e3]")}>
                        {efficiency}%
                    </span>
                </div>
                <div
                    className="flex flex-col items-center justify-center h-16 w-full p-2 rounded bg-[#0b0e13] border border-[#2e353b]/50 cursor-help"
                    title="Last Hits at 10 minutes"
                >
                    <span className="text-[10px] text-[#808fa6] font-bold uppercase tracking-wider mb-1">LH @ 10</span>
                    <span className="font-mono text-[#e7d291] font-bold text-sm">
                        {laningData?.lastHitsAt10Minutes ?? 0}
                    </span>
                </div>
                <div
                    className="flex flex-col items-center justify-center h-16 w-full p-2 rounded bg-[#0b0e13] border border-[#2e353b]/50 cursor-help"
                    title="Denies at 10 minutes"
                >
                    <span className="text-[10px] text-[#808fa6] font-bold uppercase tracking-wider mb-1">DN @ 10</span>
                    <span className="font-mono text-red-400 font-bold text-sm">
                        {laningData?.deniesAt10Minutes ?? 0}
                    </span>
                </div>
            </div>

            <div className="flex items-center justify-center xl:border-l border-[#2e353b]/50 xl:pl-6 shrink-0 pt-2 xl:pt-0 relative group/heatmap">
                <div className="border border-[#2e353b] rounded bg-[#0b0e13] p-1 shadow-inner cursor-zoom-in">
                    <HeatmapCanvas data={heatmapData} width={120} />
                </div>

                <div className="absolute z-50 opacity-0 invisible group-hover/heatmap:opacity-100 group-hover/heatmap:visible transition-all duration-300 xl:right-[110%] xl:top-1/2 xl:-translate-y-1/2 bottom-full mb-4 left-1/2 -translate-x-1/2 xl:left-auto xl:translate-x-0 pointer-events-none">
                    <div className="border-2 border-[#4a5568] rounded-lg bg-[#0f1114] p-2 shadow-2xl">
                        <HeatmapCanvas data={heatmapData} width={400} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export const MatchLaningTab: React.FC = () => {
    const { matchId, players, isParsed } = useOutletContext<MatchOutletContext>();
    const { data: laningData, isLoading, isError } = useMatchLaning(matchId, isParsed);

    const { radiantPlayers, direPlayers, laningMap, chartData } = useMemo(() => {
        const radiant: number[] = [];
        const dire: number[] = [];
        const lMap = new Map<number, PlayerLaneDto>();

        if (laningData && Array.isArray(laningData)) {
            laningData.forEach(ld => lMap.set(ld.playerIndex, ld));
        }

        if (players && Array.isArray(players)) {
            players.forEach((p, idx) => {
                if (isRadiantTeam(p.isRadiant)) radiant.push(idx);
                else dire.push(idx);
            });
        }

        let formattedChartData: Record<string, number>[] = [];
        if (laningData && laningData.length > 0) {
            const minutesSet = new Set<number>();
            laningData.forEach(p => p.lastHitsAndDeniesPerMinute.forEach(m => minutesSet.add(m.minute)));
            const minutes = Array.from(minutesSet).sort((a, b) => a - b);

            formattedChartData = minutes.map(min => {
                const point: Record<string, number> = { minute: min };
                laningData.forEach(p => {
                    point[`player${p.playerIndex}`] = p.lastHitsAndDeniesPerMinute.find(m => m.minute === min)?.totalCreeps || 0;
                });
                return point;
            });
        }

        return { radiantPlayers: radiant, direPlayers: dire, laningMap: lMap, chartData: formattedChartData };
    }, [players, laningData]);

    if (!isParsed) return <UnparsedMatchWarning />;
    if (isLoading) return <LoadingSpinner text="Analyzing Laning Phase..." />;
    if (isError) return <ErrorDisplay message="Failed to load laning data." />;
    if (!laningData || laningData.length === 0) {
        return <div className="text-center text-[#808fa6] py-10 bg-[#15171c] rounded-xl border border-[#2e353b] mt-6 w-full lg:w-[90%] mx-auto">No laning data found.</div>;
    }

    return (
        <div className="w-full lg:w-[90%] mx-auto mt-6 animate-in fade-in duration-500 space-y-4 pb-10">

            <div className="bg-[#15171c] border border-[#2e353b] rounded-xl overflow-hidden shadow-xl p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <h3 className="text-lg font-serif font-bold text-[#e3e3e3] uppercase tracking-widest flex items-center gap-2">
                        Last Hits + Denies
                    </h3>
                </div>

                <div className="w-full h-[70vh]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#2e353b" vertical={false} />
                            <XAxis dataKey="minute" stroke="#58606e" tickFormatter={(val) => `${val}:00`} tick={{ fontSize: 12, fill: '#808fa6' }} />
                            <YAxis stroke="#58606e" tick={{ fontSize: 12, fill: '#808fa6' }} />

                            <Tooltip
                                content={<LaningGraphTooltip players={players} />}
                                isAnimationActive={false}
                                cursor={{ stroke: '#808fa6', strokeWidth: 1, strokeDasharray: '4 4' }}
                            />

                            {players.map((player, idx) => (
                                <Line
                                    key={`player-${idx}`}
                                    type="monotone"
                                    dataKey={`player${idx}`}
                                    stroke={getPlayerColor(player.playerSlot.value)}
                                    strokeWidth={2}
                                    dot={false}
                                    activeDot={{ r: 5, strokeWidth: 0 }}
                                />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="space-y-3">
                <h3 className="flex items-center gap-3 text-lg font-serif font-bold text-emerald-400 uppercase tracking-widest px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-transparent border-l-4 border-emerald-500 rounded-r-lg w-full md:w-auto">
                    <Icon src="/assets/images/radiant.png" size={6} />
                    Radiant Laning
                </h3>
                <div className="flex flex-col gap-3">
                    {radiantPlayers.map(idx => (
                        <PlayerLaningCard
                            key={idx}
                            player={players[idx]}
                            laningData={laningMap.get(idx)}
                            isRadiant={true}
                        />
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                <h3 className="flex items-center gap-3 text-lg font-serif font-bold text-red-400 uppercase tracking-widest px-4 py-2 bg-gradient-to-r from-red-500/10 to-transparent border-l-4 border-red-500 rounded-r-lg w-full md:w-auto">
                    <Icon src="/assets/images/dire.png" size={6} />
                    Dire Laning
                </h3>
                <div className="flex flex-col gap-3">
                    {direPlayers.map(idx => (
                        <PlayerLaningCard
                            key={idx}
                            player={players[idx]}
                            laningData={laningMap.get(idx)}
                            isRadiant={false}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
};