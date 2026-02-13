import React, { useMemo } from 'react';
import {
    BarChart,
    Bar,
    Tooltip,
    ResponsiveContainer,
    Cell,
    CartesianGrid,
    type TooltipProps
} from 'recharts';
import type { WinLossStats } from '../../types/playerActivity';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

// 1. Precise Interface Definition
interface ChartDataPoint extends WinLossStats {
    key: number;
    label: string;
}

const CHART_CONFIG = {
    hour: { title: 'Hourly Activity', keys: Array.from({ length: 24 }, (_, i) => i) },
    day: { title: 'Daily Activity', keys: [1, 2, 3, 4, 5, 6, 0], labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
    month: { title: 'Monthly Activity', keys: Array.from({ length: 12 }, (_, i) => i + 1) },
    year: { title: 'Yearly Activity', keys: [] as number[] }
};

// 2. Typed Custom Tooltip
const CustomTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
    if (!active || !payload || !payload.length) return null;

    // Safe casting to our specific data type
    const data = payload[0].payload as ChartDataPoint;
    const isPositive = data.winRate >= 50;
    const totalGames = data.wins + data.losses;

    return (
        <div className="bg-[#15171c] border border-[#2e353b] p-3 rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.5)] text-xs z-50 min-w-[140px]">
            <div className="font-serif font-bold text-white mb-2 uppercase tracking-wider border-b border-[#2e353b] pb-1">
                {data.label}
            </div>

            <div className="space-y-1.5">
                <div className="flex justify-between gap-4">
                    <span className="text-[#808fa6]">Matches</span>
                    <span className="font-mono text-white font-bold">{totalGames}</span>
                </div>

                <div className="flex justify-between gap-4">
                    <span className="text-emerald-400">Wins</span>
                    <span className="font-mono text-white">{data.wins}</span>
                </div>

                <div className="flex justify-between gap-4">
                    <span className="text-red-400">Losses</span>
                    <span className="font-mono text-white">{data.losses}</span>
                </div>

                <div className="border-t border-[#2e353b] mt-1 pt-1 flex justify-between gap-4">
                    <span className="text-[#808fa6]">Win Rate</span>
                    <span className={`font-mono font-bold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                        {data.winRate.toFixed(1)}%
                    </span>
                </div>
            </div>
        </div>
    );
};

const SingleChart = ({ title, data }: { title: string, data: ChartDataPoint[] }) => {
    const startLabel = data.length > 0 ? data[0].label : '';
    const endLabel = data.length > 0 ? data[data.length - 1].label : '';

    return (
        <div className="bg-[#15171c] border border-[#2e353b] rounded-xl p-5 shadow-lg flex flex-col h-[40vh] group hover:border-[#3e454d] transition-colors">
            <h4 className="text-xs font-bold text-[#e3e3e3] uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-[#e7d291] rounded-sm"></span>
                {title}
            </h4>

            <div className="flex-grow relative">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barCategoryGap="20%">
                        <defs>
                            <linearGradient id="gradientWin" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.9}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0.4}/>
                            </linearGradient>

                            <linearGradient id="gradientLoss" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.9}/>
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.4}/>
                            </linearGradient>

                            <linearGradient id="gradientTop" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#3f444e" stopOpacity={1}/>
                                <stop offset="100%" stopColor="#2e353b" stopOpacity={1}/>
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2e353b" opacity={0.3} />

                        <Tooltip
                            cursor={{ fill: '#ffffff', opacity: 0.05 }}
                            content={<CustomTooltip />}
                            isAnimationActive={false}
                        />

                        <Bar dataKey="wins" stackId="a" animationDuration={500} radius={[0, 0, 2, 2]}>
                            {data.map((entry, index) => {
                                const isHighWr = entry.winRate >= 50;
                                return (
                                    <Cell
                                        key={`cell-win-${index}`}
                                        fill={isHighWr ? "url(#gradientWin)" : "url(#gradientLoss)"}
                                        stroke={isHighWr ? "#10b981" : "#ef4444"}
                                        strokeWidth={1}
                                        strokeOpacity={0.5}
                                    />
                                );
                            })}
                        </Bar>

                        <Bar
                            dataKey="losses"
                            stackId="a"
                            fill="url(#gradientTop)"
                            radius={[4, 4, 0, 0]}
                            animationDuration={500}
                        />

                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* X Axis Labels */}
            <div className="flex justify-between text-[10px] text-[#58606e] font-mono mt-2 uppercase tracking-wider px-1 font-bold">
                <span>{startLabel}</span>
                <span>{endLabel}</span>
            </div>
        </div>
    );
};

interface Props {
    stats: {
        byHour: Record<number, WinLossStats>;
        byDayOfWeek: Record<number, WinLossStats>;
        byMonth: Record<number, WinLossStats>;
        byYear: Record<number, WinLossStats>;
    }
}

export const ActivityCharts: React.FC<Props> = ({ stats }) => {

    const mapData = (source: Record<number, WinLossStats>, keys: number[], labelMap?: string[]): ChartDataPoint[] => {
        return keys.map((key, idx) => {
            const stat = source[key] || { wins: 0, losses: 0, winRate: 0 };
            return {
                key,
                label: labelMap ? labelMap[idx] : key.toString(),
                ...stat
            };
        });
    };

    const chartData = useMemo(() => {
        const years = Object.keys(stats.byYear).map(Number).sort((a, b) => a - b);

        return {
            hour: mapData(stats.byHour, CHART_CONFIG.hour.keys),
            day: mapData(stats.byDayOfWeek, CHART_CONFIG.day.keys, CHART_CONFIG.day.labels),
            month: mapData(stats.byMonth, CHART_CONFIG.month.keys),
            year: mapData(stats.byYear, years)
        };
    }, [stats]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <SingleChart title={CHART_CONFIG.hour.title} data={chartData.hour} />
            <SingleChart title={CHART_CONFIG.day.title} data={chartData.day} />
            <SingleChart title={CHART_CONFIG.month.title} data={chartData.month} />
            <SingleChart title={CHART_CONFIG.year.title} data={chartData.year} />
        </div>
    );
};
