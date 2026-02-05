import React, { useMemo, useState } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, type TooltipProps
} from 'recharts';
import type { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import clsx from 'clsx';
import { Icon } from '../Icon';
import type { TimeSeriesStat } from '../../types/matchesTimeline';
import { formatDateLong } from '../../utils/formatUtils';

export interface SeriesConfig {
    label: string;
    color: string;
    icon?: string;
}

interface Props {
    title: string;
    description?: string;
    data: Record<string, TimeSeriesStat[]> | undefined;
    config: Record<string, SeriesConfig>;
    isLoading: boolean;
    isError: boolean;
}

interface ChartDataPoint {
    timestamp: number;
    [key: string]: number;
}

const CustomTooltip = React.memo(({ active, payload, label, config }: TooltipProps<ValueType, NameType> & { config: Record<string, SeriesConfig> }) => {
    if (active && payload && payload.length) {
        const dateStr = formatDateLong(Number(label));

        const sortedPayload = [...payload].sort((a, b) => (Number(b.value) || 0) - (Number(a.value) || 0));

        return (
            <div className="bg-[#15171c]/95 border border-[#2e353b] p-3 rounded shadow-xl backdrop-blur-md z-50 min-w-[200px]">
                <p className="text-[#e7d291] font-bold text-xs mb-2 border-b border-[#2e353b] pb-1 uppercase tracking-wider">
                    {dateStr}
                </p>
                <div className="flex flex-col gap-1.5">
                    {sortedPayload.map((entry) => {
                        const key = entry.name as string;
                        const conf = config[key];

                        if (!conf) return null;

                        return (
                            <div key={key} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2 text-[#a3aab8]">
                                    <span
                                        className="w-2 h-2 rounded-full shrink-0 shadow-[0_0_4px]"
                                        style={{
                                            backgroundColor: conf.color,
                                            boxShadow: `0 0 4px ${conf.color}`
                                        }}
                                    />
                                    {conf.icon && (<Icon src={conf.icon} size={6} />)}
                                    <span>{conf.label}</span>
                                </div>
                                <span className="font-mono font-bold text-white ml-4">
                                    {Number(entry.value).toLocaleString()}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
    return null;
});

export const TimelineAreaChart: React.FC<Props> = ({ title, description, data, config, isLoading, isError }) => {
    const [activeKeys, setActiveKeys] = useState<string[]>(Object.keys(config));

    const chartData = useMemo(() => {
        if (!data) return [];
        const dataMap = new Map<number, ChartDataPoint>();

        Object.keys(data).forEach(key => {
            const series = data[key];
            if (!series) return;

            series.forEach(stat => {
                if (!dataMap.has(stat.monthUnix)) {
                    dataMap.set(stat.monthUnix, { timestamp: stat.monthUnix });
                }
                const entry = dataMap.get(stat.monthUnix)!;
                entry[key] = stat.matchCount;
            });
        });

        return Array.from(dataMap.values()).sort((a, b) => a.timestamp - b.timestamp);
    }, [data]);

    const toggleKey = (key: string) => {
        setActiveKeys(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
    };

    const toggleAll = () => {
        setActiveKeys(prev => prev.length === Object.keys(config).length ? [] : Object.keys(config));
    };

    if (isLoading) return <div className="h-[75vh] w-full bg-[#15171c] rounded-xl animate-pulse border border-[#2e353b]" />;
    if (isError) return null;

    return (
        <div className="bg-[#15171c] border border-[#2e353b] rounded-xl p-4 shadow-lg flex flex-col h-full">
            {/* Header */}
            <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                    <h3 className="text-lg font-serif font-bold text-white uppercase tracking-widest">{title}</h3>
                    {description && <p className="text-[#808fa6] text-xs">{description}</p>}
                </div>
                <button
                    onClick={toggleAll}
                    className="text-[10px] uppercase font-bold text-[#58606e] hover:text-[#e7d291] border border-[#2e353b] px-2 py-1 rounded bg-[#0f1114] transition-colors"
                >
                    {activeKeys.length === Object.keys(config).length ? 'Hide All' : 'Show All'}
                </button>
            </div>

            {/* Chart */}
            <div className="h-[50vh] w-full select-none mb-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            {Object.keys(config).map(key => (
                                <linearGradient key={key} id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={config[key].color} stopOpacity={0.3} />
                                    <stop offset="95%" stopColor={config[key].color} stopOpacity={0} />
                                </linearGradient>
                            ))}
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2e353b" vertical={false} />
                        <XAxis
                            dataKey="timestamp"
                            tickFormatter={(unix) => formatDateLong(unix)}
                            stroke="#58606e"
                            tick={{ fontSize: 10, fill: '#58606e' }}
                            minTickGap={40}
                            axisLine={false}
                            tickLine={false}
                            dy={10}
                        />
                        <YAxis
                            stroke="#58606e"
                            tick={{ fontSize: 10, fill: '#58606e' }}
                            tickFormatter={(val) => val >= 1000000 ? `${(val / 1000000).toFixed(1)}M` : val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}
                            axisLine={false}
                            tickLine={false}
                            dx={-10}
                        />
                        <Tooltip
                            content={(props) => <CustomTooltip {...props} config={config} />}
                            cursor={{ stroke: '#e7d291', strokeWidth: 1, strokeDasharray: '4 4' }}
                        />

                        {Object.keys(config).map(key => {
                            if (!activeKeys.includes(key)) return null;
                            const conf = config[key];
                            return (
                                <Area
                                    key={key}
                                    type="monotone"
                                    dataKey={key}
                                    name={key}
                                    stroke={conf.color}
                                    fill={`url(#grad-${key})`}
                                    fillOpacity={1}
                                    strokeWidth={2}
                                    animationDuration={500}
                                    activeDot={{ r: 4, strokeWidth: 0, fill: '#fff' }}
                                />
                            );
                        })}
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Legend / Toggles */}
            <div className="flex flex-wrap gap-2 justify-center mt-auto">
                {Object.keys(config).map(key => {
                    const conf = config[key];
                    const isActive = activeKeys.includes(key);
                    return (
                        <button
                            key={key}
                            onClick={() => toggleKey(key)}
                            className={clsx(
                                "flex items-center gap-2 px-2 py-1 rounded border text-[10px] font-bold uppercase tracking-wider transition-all",
                                isActive
                                    ? "bg-[#0f1114] border-[#58606e] text-[#e3e3e3]"
                                    : "bg-transparent border-transparent text-[#58606e] opacity-50 grayscale"
                            )}
                        >
                            {conf.icon ? (
                                <Icon src={conf.icon} size={6} />
                            ) : (
                                <span
                                    className="w-2 h-2 rounded-full shadow-[0_0_5px]"
                                    style={{
                                        backgroundColor: conf.color,
                                        boxShadow: isActive ? `0 0 5px ${conf.color}` : 'none'
                                    }}
                                />
                            )}
                            {conf.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
