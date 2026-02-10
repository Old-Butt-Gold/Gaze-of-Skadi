import React, { useState, useMemo } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';
import { usePlayerHistograms } from '../../../hooks/queries/usePlayerHistograms';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { PlayerField, type PlayerEndpointParameters } from '../../../types/player';

interface Props {
    accountId: number;
    filters: PlayerEndpointParameters;
}

const FIELD_LABELS: Record<PlayerField, string> = {
    [PlayerField.Kills]: 'Kills',
    [PlayerField.Deaths]: 'Deaths',
    [PlayerField.Assists]: 'Assists',
    [PlayerField.Kda]: 'KDA',
    [PlayerField.GoldPerMin]: 'GPM',
    [PlayerField.XpPerMin]: 'XPM',
    [PlayerField.LastHits]: 'Last Hits',
    [PlayerField.Denies]: 'Denies',
    [PlayerField.LaneEfficiencyPct]: 'Lane Efficiency %',
    [PlayerField.Duration]: 'Duration (min)',
    [PlayerField.Level]: 'Level',
    [PlayerField.HeroDamage]: 'Hero Damage',
    [PlayerField.TowerDamage]: 'Tower Damage',
    [PlayerField.HeroHealing]: 'Hero Healing',
    [PlayerField.Stuns]: 'Stuns Duration',
    [PlayerField.TowerKills]: 'Tower Kills',
    [PlayerField.NeutralKills]: 'Neutral Kills',
    [PlayerField.CourierKills]: 'Courier Kills',
    [PlayerField.PurchaseTpScroll]: 'TP Scrolls',
    [PlayerField.PurchaseWardObserver]: 'Observer Wards',
    [PlayerField.PurchaseWardSentry]: 'Sentry Wards',
    [PlayerField.PurchaseGem]: 'Gem Purchases',
    [PlayerField.PurchaseRapier]: 'Rapier Purchases',
    [PlayerField.Pings]: 'Map Pings',
    [PlayerField.Throw]: 'Throw (Gold Swing)',
    [PlayerField.Comeback]: 'Comeback (Gold Swing)',
    [PlayerField.Stomp]: 'Stomp (Gold Lead)',
    [PlayerField.Loss]: 'Loss (Gold Deficit)',
    [PlayerField.ActionsPerMin]: 'Actions Per Min (APM)',
};

const OPTIONS = Object.entries(FIELD_LABELS).map(([value, label]) => ({
    value: Number(value) as PlayerField,
    label
})).sort((a, b) => a.value - b.value);

const CustomHistogramTooltip = ({ active, payload, label, selectedFieldLabel }: any) => {
    if (active && payload && payload.length) {
        const dataPoint = payload[0].payload;
        return (
            <div className="bg-[#1a1d24] border border-[#2e353b] p-4 rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.8)] min-w-[200px] animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: dataPoint.color }} />
                    <span className="text-[#e7d291] font-bold uppercase text-xs tracking-wider">
                        {selectedFieldLabel}: <span className="text-white text-sm">{label}</span>
                    </span>
                </div>

                <div className="space-y-1.5 text-xs font-medium">
                    <div className="flex justify-between items-center text-white">
                        <span className="text-[#808fa6]">Total Games</span>
                        <span className="font-mono font-bold text-sm">{dataPoint.games}</span>
                    </div>

                    <div className="h-px bg-[#2e353b]/50 my-1" />

                    <div className="flex justify-between items-center text-emerald-400">
                        <span>Wins</span>
                        <span className="font-mono font-bold">{dataPoint.win}</span>
                    </div>
                    <div className="flex justify-between items-center text-red-400">
                        <span>Losses</span>
                        <span className="font-mono font-bold">{dataPoint.loss}</span>
                    </div>

                    <div className="h-px bg-[#2e353b]/50 my-1" />

                    <div className="flex justify-between items-center">
                        <span className="text-[#808fa6]">Win Rate</span>
                        <span
                            className="font-mono font-bold"
                            style={{ color: Number(dataPoint.winRate) >= 50 ? '#34d399' : '#f87171' }}
                        >
                            {dataPoint.winRate}%
                        </span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

export const PlayerHistogramsTab: React.FC<Props> = ({ accountId, filters }) => {
    const [selectedField, setSelectedField] = useState<PlayerField>(PlayerField.Kills);
    const { data, isLoading, isError } = usePlayerHistograms(accountId, selectedField, filters);

    const chartData = useMemo(() => {
        if (!data) return [];

        const isDuration = selectedField === PlayerField.Duration;

        return data.map(item => {
            const winRate = item.games > 0 ? ((item.win / item.games) * 100) : 0;
            // Color Logic: High winrate = Green, Low = Red/Purple
            const color = winRate >= 50 ? '#10b981' : '#ef4444'; // Emerald vs Blue

            return {
                ...item,
                xDisplay: isDuration ? Math.round(item.x / 60) : item.x,
                loss: item.games - item.win,
                winRate: winRate.toFixed(1),
                color
            };
        });
    }, [data, selectedField]);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">

            {/* --- Controls Header --- */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#15171c] border border-[#2e353b] p-4 rounded-xl shadow-lg relative z-20">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#2e353b]/50 rounded-lg flex items-center justify-center border border-[#2e353b]">
                        <span className="text-xl">📊</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-serif font-bold text-white uppercase tracking-widest leading-none">
                            Histograms
                        </h3>
                        <p className="text-xs text-[#808fa6] mt-1">
                            Distribution of performance across matches
                        </p>
                    </div>
                </div>

                <div className="relative group w-full sm:w-64">
                    <select
                        value={selectedField}
                        onChange={(e) => setSelectedField(Number(e.target.value) as PlayerField)}
                        className="w-full appearance-none bg-[#0f1114] border border-[#2e353b] text-white text-sm rounded-lg px-4 py-2.5 pr-8 focus:outline-none focus:border-[#e7d291] focus:ring-1 focus:ring-[#e7d291] transition-all cursor-pointer font-bold uppercase tracking-wide shadow-inner"
                    >
                        {OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-[#808fa6]">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* --- Chart Area --- */}
            <div className="bg-[#15171c] border border-[#2e353b] rounded-xl shadow-2xl p-4 md:p-6 relative overflow-hidden group">

                {/* Background Decor */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#15171c] to-[#0f1114] -z-10" />
                <div className="absolute inset-0 bg-[url('/assets/images/graph_texture.png')] opacity-5 mix-blend-overlay pointer-events-none -z-10" />

                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#15171c]/80 z-10 backdrop-blur-sm">
                        <LoadingSpinner text="Analyzing Data..." />
                    </div>
                ) : isError || chartData.length === 0 ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-[#58606e]">
                        <span className="text-6xl mb-4 opacity-10 grayscale">📉</span>
                        <p className="uppercase tracking-widest text-sm font-bold opacity-50">No Data Available</p>
                        <p className="text-xs mt-2 opacity-40">Try selecting a different metric.</p>
                    </div>
                ) : (
                    <div className="w-full h-[60vh]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={chartData}
                                margin={{ top: 20, right: 10, left: -20, bottom: 20 }}
                                barCategoryGap="10%" // Space between bars
                            >
                                <defs>
                                    {/* Green Gradient for Wins (High Winrate) */}
                                    <linearGradient id="colorWin" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#34d399" stopOpacity={0.8}/> {/* Emerald-400 */}
                                        <stop offset="95%" stopColor="#34d399" stopOpacity={0.3}/>
                                    </linearGradient>

                                    {/* Red Gradient for Losses (Low Winrate) */}
                                    <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f87171" stopOpacity={0.8}/> {/* Red-400 */}
                                        <stop offset="95%" stopColor="#f87171" stopOpacity={0.3}/>
                                    </linearGradient>
                                </defs>

                                <CartesianGrid
                                    strokeDasharray="4 4"
                                    vertical={false}
                                    stroke="#2e353b"
                                    opacity={0.4}
                                />

                                <XAxis
                                    dataKey="xDisplay"
                                    tick={{ fill: '#58606e', fontSize: 11, fontWeight: 'bold' }}
                                    axisLine={{ stroke: '#2e353b' }}
                                    tickLine={false}
                                    dy={10}
                                    label={{
                                        value: FIELD_LABELS[selectedField],
                                        position: 'insideBottom',
                                        offset: -15,
                                        fill: '#58606e',
                                        fontSize: 10,
                                        fontWeight: 'bold',
                                    }}
                                />

                                <YAxis
                                    tick={{ fill: '#58606e', fontSize: 11, fontWeight: 'bold' }}
                                    axisLine={false}
                                    tickLine={false}
                                />

                                <Tooltip
                                    content={
                                        <CustomHistogramTooltip
                                            selectedFieldLabel={FIELD_LABELS[selectedField]}
                                        />
                                    }
                                    cursor={{ fill: '#ffffff', opacity: 0.03 }}
                                />

                                <Bar
                                    dataKey="games"
                                    name="Matches"
                                    radius={[4, 4, 0, 0]}
                                    animationDuration={1000}
                                >
                                    {chartData.map((entry, index) => {
                                        const isHighWinRate = Number(entry.winRate) >= 50;
                                        return (
                                            <Cell
                                                key={`cell-${index}`}
                                                // Выбираем URL градиента: Зеленый или Красный
                                                fill={isHighWinRate ? "url(#colorWin)" : "url(#colorLoss)"}
                                                // Обводка: Emerald-500 (#10b981) или Red-500 (#ef4444)
                                                stroke={isHighWinRate ? "#10b981" : "#ef4444"}
                                                strokeWidth={1}
                                                strokeOpacity={0.8}
                                            />
                                        );
                                    })}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </div>
    );
};
