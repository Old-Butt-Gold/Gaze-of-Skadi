import React, { useState } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine
} from 'recharts';
import type { BenchmarkValueDto } from "../../../types/heroBenchmarks.ts";

interface Props {
    title: string;
    data: BenchmarkValueDto[];
    color: string;
    icon?: React.ReactNode;
    formatter?: (val: number) => string;
}

interface CustomTooltipPayload {
    dataKey?: string | number;
    payload: BenchmarkValueDto; // Ваш тип данных
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: CustomTooltipPayload[]; // Массив элементов payload
}

export const BenchmarkChart: React.FC<Props> = ({
                                                    title,
                                                    data,
                                                    color,
                                                    icon,
                                                    formatter = (v) => v.toFixed(0)
                                                }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Prepare data for Recharts
    const chartData = data.map((item, index) => ({
        percentile: `${(item.percentile * 100).toFixed(0)}%`,
        value: item.value,
        rawValue: item.value,
        index
    }));

    const currentData = hoveredIndex !== null ? chartData[hoveredIndex] : null;
    const maxValue = chartData[chartData.length - 1];

    // Custom Tooltip
    const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-[#1a1d24] border border-[#2e353b] rounded-lg p-3 shadow-xl">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                        <span className="text-xs font-bold text-[#e3e3e3]">{title}</span>
                    </div>
                    <div className="text-lg font-mono font-bold text-white" style={{ color }}>
                        {formatter(data.value)}
                    </div>
                    <div className="text-[10px] text-[#58606e] uppercase tracking-wider font-bold mt-1">
                        Top {data.percentile} Players
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-[#15171c] border border-[#2e353b] rounded-xl p-5 shadow-lg relative group overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="flex items-center gap-2">
                    {icon && <div className="text-[#808fa6]">{icon}</div>}
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#808fa6] group-hover:text-white transition-colors">
                        {title}
                    </h3>
                </div>

                {/* Active Value Display */}
                <div className="text-right h-8">
                    {currentData ? (
                        <div className="animate-in fade-in slide-in-from-bottom-1 duration-200">
                            <span className="block text-lg font-mono font-bold text-white leading-none" style={{ color }}>
                                {formatter(currentData.rawValue)}
                            </span>
                            <span className="text-[10px] text-[#58606e] uppercase tracking-wider font-bold">
                                Top {currentData.percentile} Players
                            </span>
                        </div>
                    ) : (
                        <div className="opacity-50">
                            <span className="block text-lg font-mono font-bold text-[#e3e3e3] leading-none">
                                {formatter(maxValue.rawValue)}
                            </span>
                            <span className="text-[10px] text-[#58606e] uppercase tracking-wider font-bold">
                                Max Potential
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Chart - Recharts */}
            <div className="relative w-full h-48" onMouseLeave={() => setHoveredIndex(null)}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={chartData}
                        margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                        onMouseMove={(state) => {
                            if (state && state.activeTooltipIndex !== undefined) {
                                setHoveredIndex(Number(state.activeTooltipIndex));
                            }
                        }}
                    >
                        {/* Grid Lines */}
                        <CartesianGrid
                            stroke="#2e353b"
                            strokeDasharray="4 4"
                            opacity={0.3}
                            vertical={false}
                        />

                        {/* X Axis */}
                        <XAxis
                            dataKey="percentile"
                            stroke="#58606e"
                            fontSize={10}
                            tickLine={false}
                            axisLine={{ stroke: '#2e353b' }}
                            tick={{ fill: '#808fa6' }}
                        />

                        {/* Y Axis */}
                        <YAxis
                            stroke="#58606e"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: '#808fa6' }}
                            hide
                        />

                        {/* Area with gradient */}
                        <defs>
                            <linearGradient id={`color-${title.replace(/\s+/g, '-')}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={color}
                            strokeWidth={2}
                            fill={`url(#color-${title.replace(/\s+/g, '-')})`}
                            activeDot={{
                                r: 6,
                                stroke: color,
                                strokeWidth: 2,
                                fill: '#1a1d24'
                            }}
                            dot={false}
                        />

                        {/* Tooltip */}
                        <Tooltip
                            content={<CustomTooltip active={false} payload={[]} />}
                            cursor={{ stroke: color, strokeDasharray: '3 3', strokeWidth: 1 }}
                            wrapperStyle={{ outline: 'none' }}
                        />

                        {/* Reference lines for percentiles */}
                        {chartData.length > 1 && (
                            <>
                                <ReferenceLine
                                    x="50%"
                                    stroke="#58606e"
                                    strokeDasharray="3 3"
                                    opacity={0.3}
                                />
                                <ReferenceLine
                                    x="75%"
                                    stroke="#58606e"
                                    strokeDasharray="3 3"
                                    opacity={0.3}
                                />
                            </>
                        )}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
