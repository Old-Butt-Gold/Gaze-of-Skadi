import React, {useMemo, useState} from 'react';
import {useOutletContext} from 'react-router-dom';
import clsx from 'clsx';
import {
    CartesianGrid,
    ComposedChart,
    Line,
    LineChart, ReferenceArea,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    type TooltipProps,
    XAxis,
    YAxis
} from 'recharts';
import {useMatchGraphics} from '../../../hooks/queries/useMatchGraphics';
import {LoadingSpinner} from '../../ui/LoadingSpinner';
import {ErrorDisplay} from '../../ui/ErrorDisplay';
import {UnparsedMatchWarning} from '../UnparsedMatchWarning';
import {HeroCell} from '../../heroes/HeroCell';
import {getPlayerColor} from '../../../utils/matchUtils';
import type {MatchOutletContext} from '../../../pages/MatchDetailsPage';
import type {PlayerInfoDto} from '../../../types/matchPlayers';
import {Icon} from "../../Icon.tsx";

type GraphType = 'goldPerMinute' | 'xpPerMinute' | 'lastHitsPerMinute';

interface GraphOption {
    id: GraphType;
    label: string;
}

const GRAPH_OPTIONS: GraphOption[] = [
    { id: 'goldPerMinute', label: 'Gold / Min' },
    { id: 'xpPerMinute', label: 'XP / Min' },
    { id: 'lastHitsPerMinute', label: 'Last Hits / Min' }
];

interface MetricWidgetProps {
    label: string;
    value: number | null | undefined;
    colorClass: string;
    description: string;
}

interface PlayerTooltipProps extends TooltipProps<number, string> {
    players: PlayerInfoDto[];
}

const MetricWidget: React.FC<MetricWidgetProps> = ({ label, value, colorClass, description }) => {
    if (value == null) return null;
    if (value === 0) return null;
    return (
        <div className="relative group/metric bg-[#15171c] border border-[#2e353b] rounded-xl p-4 flex flex-col items-center justify-center shadow-md flex-1 min-w-37.5 transition-all hover:bg-[#1a1d24] cursor-help">
            <span className="text-xs text-[#808fa6] font-bold uppercase tracking-widest mb-1">{label}</span>
            <span className={clsx("text-2xl font-black font-mono drop-shadow-md", colorClass)}>
                {value.toLocaleString()}
            </span>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-[#e3e3e3] text-[#0b0e13] text-xs font-bold uppercase tracking-wider px-3 py-2 rounded shadow-xl opacity-0 invisible group-hover/metric:opacity-100 group-hover/metric:visible transition-all whitespace-nowrap z-50 pointer-events-none text-center">
                {description}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#e3e3e3]" />
            </div>
        </div>
    );
};

const AdvantageTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            // Добавлен text-center для основного контейнера
            <div className="bg-[#1a1d24]/95 backdrop-blur-md border border-[#2e353b] p-3 rounded-xl shadow-2xl min-w-50 z-50 text-center">
                <p className="text-[#808fa6] font-mono font-bold text-xs mb-3 border-b border-[#2e353b]/50 pb-2 text-center">
                    {label}:00
                </p>
                <div className="flex flex-col gap-2.5 items-center">
                    {payload.map((entry) => {
                        const val = entry.value || 0;
                        const isRadiant = val >= 0;
                        const teamName = isRadiant ? "Radiant" : "Dire";
                        const teamColor = isRadiant ? "text-emerald-400" : "text-red-400";
                        const bgGlow = isRadiant ? "bg-emerald-500/10 border-emerald-500/30" : "bg-red-500/10 border-red-500/30";

                        return (
                            <div key={entry.dataKey} className={clsx("w-full flex flex-col gap-1 p-2 rounded border items-center", bgGlow)}>
                                <span className="text-xs font-bold uppercase tracking-wider text-center" style={{ color: entry.color }}>
                                    {entry.name} Advantage
                                </span>
                                <span className={clsx("text-sm font-mono font-black text-center", teamColor)}>
                                    {teamName} +{Math.abs(val).toLocaleString()}
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

const PlayerGraphTooltip: React.FC<PlayerTooltipProps> = ({ active, payload, label, players }) => {
    if (active && payload && payload.length) {
        const sorted = [...payload].sort((a, b) => (b.value || 0) - (a.value || 0));

        return (
            <div className="bg-[#1a1d24]/95 backdrop-blur-md border border-[#2e353b] p-3 rounded-xl shadow-2xl min-w-60 z-50">
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
                                        className="text-xs font-bold truncate max-w-27.5"
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

export const MatchGraphicsTab: React.FC = () => {
    const { matchId, players, isParsed } = useOutletContext<MatchOutletContext>();
    const { data: graphicsData, isLoading, isError } = useMatchGraphics(matchId, isParsed);

    const [playerGraphType, setPlayerGraphType] = useState<GraphType>('goldPerMinute');

    const { playerChartData } = useMemo(() => {
        if (!graphicsData?.playerGraphs) return { playerChartData: [] };

        const minutesSet = new Set<number>();
        graphicsData.playerGraphs.forEach(p => p[playerGraphType].forEach(m => minutesSet.add(m.minute)));
        const minutes = Array.from(minutesSet).sort((a, b) => a - b);

        const chartData = minutes.map(min => {
            const point: Record<string, number> = { minute: min };
            graphicsData.playerGraphs.forEach(p => {
                point[`player${p.playerIndex}`] = p[playerGraphType].find(m => m.minute === min)?.value || 0;
            });
            return point;
        });

        return { playerChartData: chartData };
    }, [graphicsData, playerGraphType]);

    const maxAdvantage = useMemo(() => {
        if (!graphicsData?.teamAdvantages) return 0;
        let max = 0;
        graphicsData.teamAdvantages.forEach(d => {
            max = Math.max(max, Math.abs(d.radiantGoldAdvantage), Math.abs(d.radiantXpAdvantage));
        });
        return Math.ceil(max / 1000) * 1000;
    }, [graphicsData]);

    if (!isParsed) return <UnparsedMatchWarning />;
    if (isLoading) return <LoadingSpinner text="Generating Graphics..." />;
    if (isError || !graphicsData) return <ErrorDisplay message="Failed to load graphics." />;

    return (
        <div className="w-full lg:w-[90%] mx-auto mt-6 animate-in fade-in duration-500 space-y-8">

            {(graphicsData.throw != null || graphicsData.comeback != null || graphicsData.loss != null || graphicsData.stomp != null) && (
                <div className="flex flex-wrap gap-4 w-full">
                    <MetricWidget
                        label="Throw"
                        value={graphicsData.throw}
                        colorClass="text-yellow-400"
                        description="Maximum gold advantage lost by the losing team."
                    />
                    <MetricWidget
                        label="Comeback"
                        value={graphicsData.comeback}
                        colorClass="text-emerald-400"
                        description="Maximum gold deficit overcome by the winning team."
                    />
                    <MetricWidget
                        label="Loss Depth"
                        value={graphicsData.loss}
                        colorClass="text-red-400"
                        description="Maximum gold deficit recorded by the losing team."
                    />
                    <MetricWidget
                        label="Stomp"
                        value={graphicsData.stomp}
                        colorClass="text-cyan-400"
                        description="Maximum gold advantage reached by the winning team."
                    />
                </div>
            )}

            <div className="bg-[#15171c] border border-[#2e353b] rounded-xl overflow-hidden shadow-xl p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <h3 className="text-lg font-serif font-bold text-[#e3e3e3] uppercase tracking-widest flex items-center gap-2">
                        Team Advantage
                    </h3>
                    <div className="flex gap-4 text-xs font-bold uppercase tracking-widest">
                        <span className="flex items-center gap-1.5 text-[#e7d291]"><Icon src={"/assets/images/gold.png"} size={6} /> Gold</span>
                        <span className="flex items-center gap-1.5 text-[#38bdf8]"><Icon src={"/assets/images/experience.png"} size={6} /> XP</span>
                    </div>
                </div>

                <div className="w-full h-[70vh]">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={graphicsData.teamAdvantages} margin={{ top: 5, right: 5, left: 5, bottom: 0 }}>

                            <ReferenceArea y1={0} y2={maxAdvantage} fill="#10b981" fillOpacity={0.1} />

                            <ReferenceArea y1={-maxAdvantage} y2={0} fill="#ef4444" fillOpacity={0.1} />

                            <CartesianGrid strokeDasharray="3 3" stroke="#2e353b" vertical={false} />
                            <XAxis dataKey="minute" stroke="#58606e" tickFormatter={(val) => `${val}:00`} tick={{ fontSize: 12, fill: '#808fa6' }} />

                            <YAxis
                                domain={[-maxAdvantage, maxAdvantage]}
                                tickCount={7}
                                allowDataOverflow={true}
                                stroke="#58606e"
                                tickFormatter={(val) => `+${val}`}
                                tick={{ fontSize: 12, fill: '#808fa6' }}
                            />

                            <Tooltip content={<AdvantageTooltip />} isAnimationActive={false} cursor={{ stroke: '#808fa6', strokeWidth: 1, strokeDasharray: '4 4' }} />

                            <ReferenceLine y={0} stroke="#e3e3e3" strokeWidth={1} strokeOpacity={0.5} />

                            <Line type="monotone" dataKey="radiantGoldAdvantage" name="Gold" stroke="#e7d291" strokeWidth={2.5} dot={false} activeDot={{ r: 6, strokeWidth: 0, fill: '#e7d291' }} />
                            <Line type="monotone" dataKey="radiantXpAdvantage" name="XP" stroke="#38bdf8" strokeWidth={2.5} dot={false} activeDot={{ r: 6, strokeWidth: 0, fill: '#38bdf8' }} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-[#15171c] border border-[#2e353b] rounded-xl overflow-hidden shadow-xl p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <h3 className="text-lg font-serif font-bold text-[#e3e3e3] uppercase tracking-widest flex items-center gap-2">
                        Player Metrics
                    </h3>

                    <div className="flex bg-[#0b0e13] border border-[#2e353b] rounded-lg p-1 overflow-x-auto">
                        {GRAPH_OPTIONS.map(type => (
                            <button
                                key={type.id}
                                onClick={() => setPlayerGraphType(type.id)}
                                className={clsx(
                                    "px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all whitespace-nowrap",
                                    playerGraphType === type.id
                                        ? "bg-[#2e353b] text-[#e7d291] shadow-inner"
                                        : "text-[#58606e] hover:text-[#808fa6] hover:bg-[#1a1d24]"
                                )}
                            >
                                {type.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="w-full h-[70vh]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={playerChartData} margin={{ top: 5, right: 5, left: 5, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#2e353b" vertical={false} />
                            <XAxis dataKey="minute" stroke="#58606e" tickFormatter={(val) => `${val}:00`} tick={{ fontSize: 12, fill: '#808fa6' }} />
                            <YAxis stroke="#58606e" tick={{ fontSize: 12, fill: '#808fa6' }} />

                            <Tooltip
                                content={<PlayerGraphTooltip players={players} />}
                                isAnimationActive={false}
                                cursor={{ stroke: '#808fa6', strokeWidth: 1, strokeDasharray: '4 4' }}
                            />

                            {players.map((player, idx) => (
                                <Line
                                    key={`player-${idx}`}
                                    type="natural"
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

        </div>
    );
};
