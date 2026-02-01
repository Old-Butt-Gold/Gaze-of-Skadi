import React, { useMemo } from 'react';
import {
    ComposedChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts';
import { useHeroDurations } from '../../../hooks/queries/useHeroDurations';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { ErrorDisplay } from '../../ui/ErrorDisplay';
import { calculateWinRate, getWinRateColor } from '../../../utils/heroStatsUtils';
import type { HeroInfo } from '../../../types/heroes';
import type { HeroDurationDto } from '../../../types/heroDurations'; // Импортируйте ваш DTO
import clsx from 'clsx';
import { formatDuration } from '../../../utils/formatUtils';

interface Props {
    hero: HeroInfo;
}

// 1. Расширенный интерфейс данных для графика
interface ChartData extends HeroDurationDto {
    winRate: number;
    label: string;
}

// 2. Интерфейс payload тултипа
// Recharts payload для ComposedChart содержит массив, где каждый элемент имеет payload, который является объектом ChartData
interface CustomTooltipPayloadItem {
    payload: ChartData;
    dataKey: string;
    name: string;
    value: number;
    color: string;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: CustomTooltipPayloadItem[];
    label?: string;
}

// 3. Кастомный Тултип
const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        // Берем данные из первого элемента payload (так как они общие для одной точки X)
        const data = payload[0].payload;
        const wrColor = getWinRateColor(data.winRate);

        return (
            <div className="bg-[#1a1d24] border border-[#2e353b] rounded-lg p-3 shadow-xl backdrop-blur-sm bg-opacity-95 min-w-[150px]">
                <div className="text-xs font-bold text-[#808fa6] uppercase tracking-wider mb-2 border-b border-[#2e353b] pb-1">
                    Match Time: <span className="text-white">{data.label}</span>
                </div>

                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-[#e3e3e3]">Games:</span>
                    <span className="font-mono font-bold text-white">{data.gamesPlayed.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-[#e3e3e3]">Wins:</span>
                    <span className="font-mono font-bold text-green-400">{data.wins.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center mt-2 pt-2 border-t border-[#2e353b]/50">
                    <span className="text-sm text-[#e3e3e3]">Win Rate:</span>
                    <span className={clsx("font-mono font-bold", wrColor)}>{data.winRate.toFixed(1)}%</span>
                </div>
            </div>
        );
    }
    return null;
};

export const HeroDurationsTab: React.FC<Props> = ({ hero }) => {
    const { data: durations, isLoading, isError, refetch } = useHeroDurations(hero.id);

    // Подготовка данных для графика
    const chartData = useMemo(() => {
        if (!durations) return [];
        return durations
            .sort((a, b) => a.durationBin - b.durationBin)
            .map(d => ({
                ...d,
                winRate: calculateWinRate(d.wins, d.gamesPlayed),
                label: formatDuration(d.durationBin)
            }));
    }, [durations]);

    if (isLoading) return <LoadingSpinner text="Analyzing match timelines..." />;
    if (isError || !durations) return <ErrorDisplay message="Duration data unavailable" onRetry={refetch} />;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-6">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
                <div className="border-l-4 border-[#e7d291] pl-4 bg-gradient-to-r from-[#e7d291]/5 to-transparent py-3 w-full md:w-auto rounded-r-lg">
                    <h3 className="text-xl font-serif font-bold text-white uppercase tracking-widest">
                        Duration Performance
                    </h3>
                    <p className="text-[#808fa6] text-sm mt-1 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        Data collected from recent professional matches.
                    </p>
                </div>

                {/* Legend */}
                <div className="flex gap-6 text-xs font-bold uppercase tracking-wider text-[#58606e]">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#60a5fa] rounded-sm"></div>
                        <span>Games Played</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-0.5 bg-[#e7d291] border-t border-[#e7d291]"></div>
                        <div className="w-2 h-2 rounded-full bg-[#e7d291] -ml-3 border border-[#15171c]"></div>
                        <span>Win Rate %</span>
                    </div>
                </div>
            </div>

            {/* Chart Container */}
            <div className="bg-[#15171c] border border-[#2e353b] rounded-xl p-4 md:p-6 shadow-2xl h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                        <defs>
                            {/* Gradient for Bars */}
                            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.3}/>
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" stroke="#2e353b" opacity={0.4} vertical={false} />

                        {/* X Axis: Time */}
                        <XAxis
                            dataKey="label"
                            stroke="#58606e"
                            tick={{ fill: '#808fa6', fontSize: 12 }}
                            tickLine={false}
                            axisLine={{ stroke: '#2e353b' }}
                            dy={10}
                        />

                        {/* Y Axis Left: Games Played */}
                        <YAxis
                            yAxisId="left"
                            stroke="#58606e"
                            tick={{ fill: '#808fa6', fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                            label={{ value: 'Games', angle: -90, position: 'insideLeft', fill: '#58606e', fontSize: 10, dy: 30 }}
                        />

                        {/* Y Axis Right: Win Rate */}
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            stroke="#e7d291"
                            tick={{ fill: '#e7d291', fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                            domain={[0, 100]}
                            unit="%"
                        />

                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ fill: '#2e353b', opacity: 0.4 }}
                        />

                        {/* Bars for Games Played */}
                        <Bar
                            yAxisId="left"
                            dataKey="gamesPlayed"
                            fill="url(#barGradient)"
                            radius={[4, 4, 0, 0]}
                            barSize={40}
                            animationDuration={1500}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fillOpacity={entry.winRate >= 50 ? 1 : 0.7} />
                            ))}
                        </Bar>

                        {/* Line for Win Rate */}
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="winRate"
                            stroke="#e7d291"
                            strokeWidth={3}
                            dot={{ r: 4, fill: '#15171c', stroke: '#e7d291', strokeWidth: 2 }}
                            activeDot={{ r: 6, fill: '#e7d291' }}
                            animationDuration={2000}
                        />

                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
