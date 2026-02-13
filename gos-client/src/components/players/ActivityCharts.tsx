import React, { useMemo } from 'react';
import {BarChart, Bar, Tooltip, ResponsiveContainer, Cell, CartesianGrid,} from 'recharts';
import type { WinLossStats } from '../../types/playerActivity';

interface ChartDataPoint extends WinLossStats {
    key: number;
    label: string;
}

const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAYS = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

interface CustomTooltipPayload {
    payload: ChartDataPoint;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: CustomTooltipPayload[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (!active || !payload || !payload.length) return null;

    const data = payload[0].payload as ChartDataPoint;
    const isPositive = data.winRate >= 50;
    const total = data.wins + data.losses;

    return (
        <div className="bg-[#15171c] border border-[#2e353b] p-3 rounded-lg shadow-xl text-xs z-50 min-w-[150px]">
            <div className="font-bold text-[#e7d291] mb-2 uppercase tracking-wider text-center border-b border-[#2e353b] pb-2">
                {data.label}
            </div>

            <div className="space-y-1.5 font-medium">
                <div className="flex justify-between">
                    <span className="text-[#808fa6]">Matches</span>
                    <span className="text-white font-mono font-bold">{total}</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                    <span>Wins</span>
                    <span className="font-mono">{data.wins}</span>
                </div>
                <div className="flex justify-between text-red-400">
                    <span>Losses</span>
                    <span className="font-mono">{data.losses}</span>
                </div>
                <div className="pt-2 mt-1 border-t border-[#2e353b] flex justify-between">
                    <span className="text-[#808fa6]">Win Rate</span>
                    <span className={`font-mono font-bold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                        {data.winRate.toFixed(1)}%
                    </span>
                </div>
            </div>
        </div>
    );
};

const ChartCard = ({ title, data }: { title: string, data: ChartDataPoint[] }) => {
    if (!data.length) return null;

    const getShortLabel = (label: string) => {
        if (label.includes(':')) return label.split(' - ')[0];
        if (label.length > 4 && isNaN(Number(label))) return label.substring(0, 3);
        return label;
    };

    const startLabel = getShortLabel(data[0].label);
    const endLabel = getShortLabel(data[data.length - 1].label);

    return (
        <div className="bg-[#15171c] border border-[#2e353b] rounded-xl p-5 shadow-lg flex flex-col h-[40vh]">
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-xs font-bold text-[#e3e3e3] uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1 h-3 bg-[#e7d291] rounded-sm" />
                    {title}
                </h4>
            </div>

            <div className="flex-grow w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barCategoryGap="15%" margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="gradWin" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.9}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0.5}/>
                            </linearGradient>
                            <linearGradient id="gradLoss" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.9}/>
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.5}/>
                            </linearGradient>
                            <linearGradient id="gradTop" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#3f444e" stopOpacity={1}/>
                                <stop offset="100%" stopColor="#2e353b" stopOpacity={1}/>
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2e353b" opacity={0.3} />
                        <Tooltip cursor={{ fill: '#ffffff', opacity: 0.05 }} content={<CustomTooltip />} isAnimationActive={false} />

                        <Bar dataKey="wins" stackId="a" animationDuration={500} radius={[0, 0, 4, 4]}>
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.winRate >= 50 ? "url(#gradWin)" : "url(#gradLoss)"}
                                    stroke={entry.winRate >= 50 ? "#10b981" : "#ef4444"}
                                    strokeWidth={1}
                                    strokeOpacity={0.6}
                                />
                            ))}
                        </Bar>

                        <Bar dataKey="losses" stackId="a" fill="url(#gradTop)" radius={[4, 4, 0, 0]} animationDuration={500} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="flex justify-between text-sm text-[#58606e] font-mono font-bold mt-2 uppercase tracking-wider px-1">
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

    const processData = useMemo(() => {
        const build = (keys: number[], labelFn: (k: number) => string, source: Record<number, WinLossStats>) => {
            return keys.map(key => {
                const stat = source[key] || { wins: 0, losses: 0, winRate: 0 };
                return { key, label: labelFn(key), ...stat };
            });
        };

        const hours = Array.from({ length: 24 }, (_, i) => i);
        const hourData = build(hours, (h) => `${h.toString().padStart(2, '0')}:00 - ${(h + 1).toString().padStart(2, '0')}:00`, stats.byHour);

        const dayKeys = [1, 2, 3, 4, 5, 6, 0];
        const dayData = build(dayKeys, (d) => {
            const index = d === 0 ? 6 : d - 1;
            return WEEKDAYS[index];
        }, stats.byDayOfWeek);

        const months = Array.from({ length: 12 }, (_, i) => i + 1);
        const monthData = build(months, (m) => MONTHS[m - 1], stats.byMonth);

        const years = Object.keys(stats.byYear).map(Number).sort((a, b) => a - b);
        const yearData = build(years, (y) => y.toString(), stats.byYear);

        return { hourData, dayData, monthData, yearData };
    }, [stats]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <ChartCard title="Hourly Activity" data={processData.hourData} />
            <ChartCard title="Daily Activity" data={processData.dayData} />
            <ChartCard title="Monthly Activity" data={processData.monthData} />
            <ChartCard title="Yearly Activity" data={processData.yearData} />
        </div>
    );
};
