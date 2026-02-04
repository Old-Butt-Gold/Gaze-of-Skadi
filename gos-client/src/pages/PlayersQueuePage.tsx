import React, { useState, useMemo } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    type TooltipProps
} from 'recharts';

import type { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import { usePlayersQueue } from '../hooks/queries/usePlayersQueue';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorDisplay } from '../components/ui/ErrorDisplay';
import clsx from 'clsx';
import {formatDateFull, formatDateShort} from "../utils/formatUtils";

const REGION_CONFIG: Record<string, { label: string; color: string }> = {
    europe: { label: 'Europe', color: '#66bb6a' },
    stockholm: { label: 'Stockholm', color: '#43a047' },
    austria: { label: 'Austria', color: '#2e7d32' },
    usEast: { label: 'US East', color: '#42a5f5' },
    usWest: { label: 'US West', color: '#1e88e5' },
    singapore: { label: 'Singapore', color: '#ffa726' },
    japan: { label: 'Japan', color: '#ff7043' },
    perfectWorldTelecom: { label: 'PW Telecom', color: '#ab47bc' },
    perfectWorldTelecomWuhan: { label: 'PW Telecom Wuhan', color: '#8e24aa' },
    perfectWorldTelecomZhejiang: { label: 'PW Telecom Zhejiang', color: '#7b1fa2' },
    perfectWorldTelecomGuangdong: { label: 'PW Telecom Guangdong', color: '#6a1b9a' },
    perfectWorldUnicom: { label: 'PW Unicom', color: '#ef5350' },
    perfectWorldUnicomTianjin: { label: 'PW Unicom Tianjin', color: '#c62828' },
    australia: { label: 'Australia', color: '#26c6da' },
    peru: { label: 'Peru', color: '#ffca28' },
    brazil: { label: 'Brazil', color: '#ffeb3b' },
    chile: { label: 'Chile', color: '#fbc02d' },
    dubai: { label: 'Dubai', color: '#8d6e63' },
    india: { label: 'India', color: '#795548' },
    southAfrica: { label: 'South Africa', color: '#5d4037' },
    taiwan: { label: 'Taiwan', color: '#78909c' },
};

const CustomTooltip = React.memo(({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
        const dateStr = formatDateFull(Number(label));

        const sortedPayload = [...payload].sort((a, b) => (Number(b.value) || 0) - (Number(a.value) || 0));

        return (
            <div className="bg-[#15171c]/95 border border-[#2e353b] p-3 rounded shadow-xl backdrop-blur-md z-50">
                <p className="text-[#e7d291] font-bold text-xs mb-2 border-b border-[#2e353b] pb-1 uppercase tracking-wider">
                    {dateStr}
                </p>
                <div className="flex flex-col gap-1">
                    {sortedPayload.map((entry) => (
                        <div key={entry.name} className="flex items-center justify-between text-xs">
                            <span className="flex items-center gap-2 text-[#a3aab8]">
                                <span
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: entry.color }}
                                />
                                {REGION_CONFIG[entry.name as string]?.label || entry.name}
                            </span>
                            <span className="font-mono text-white font-bold ml-4">
                                {Number(entry.value)?.toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
});

export const PlayersQueuePage: React.FC = () => {
    const { data: rawData, isLoading, isError, refetch } = usePlayersQueue();
    const [activeRegions, setActiveRegions] = useState<string[]>(Object.keys(REGION_CONFIG));

    const toggleRegion = (key: string) => {
        setActiveRegions(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
    };

    const toggleAll = () => {
        setActiveRegions(prev => prev.length === Object.keys(REGION_CONFIG).length ? [] : Object.keys(REGION_CONFIG));
    };

    const { gradients, areas } = useMemo(() => {
        const grads = Object.keys(REGION_CONFIG).map(key => (
            <linearGradient key={key} id={`color-${key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={REGION_CONFIG[key].color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={REGION_CONFIG[key].color} stopOpacity={0} />
            </linearGradient>
        ));

        const ars = Object.keys(REGION_CONFIG).map(key => {
            if (!activeRegions.includes(key)) return null;
            const conf = REGION_CONFIG[key];
            return (
                <Area
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={conf.color}
                    fillOpacity={1}
                    fill={`url(#color-${key})`}
                    strokeWidth={2}
                    animationDuration={500}
                    activeDot={true}
                />
            );
        });

        return { gradients: grads, areas: ars };
    }, [activeRegions]);

    if (isLoading) return <LoadingSpinner text="Analyzing matchmaking queues..." />;
    if (isError) return <ErrorDisplay message="Failed to load queue data" onRetry={refetch} />;

    if (!rawData || rawData.length === 0) {
        return <div className="p-10 text-center text-[#58606e]">No data available for the last week.</div>;
    }

    return (
        <div className="min-h-screen bg-[#0b0e13] text-[#e3e3e3] pb-6">

            {/* Hero Header (Centered) */}
            <div className="relative h-48 w-full bg-gradient-to-b from-[#1a1d24] to-[#0b0e13] border-b border-[#2e353b] mb-6">
                <div className="absolute inset-0 bg-[url('/assets/images/dashboard_bg.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay" />
                <div className="mx-auto px-4 h-full flex flex-col justify-center items-center text-center relative z-10">
                    <div className="flex items-center gap-3 mb-1">
                        <span className="h-px w-8 bg-[#e7d291]" />
                        <span className="text-[#e7d291] font-bold uppercase tracking-[0.2em] text-xs">Matchmaking Stats</span>
                        <span className="h-px w-8 bg-[#e7d291]" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-white uppercase tracking-widest drop-shadow-lg">
                        Players In <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e7d291] to-[#b88a44]">Queue</span>
                    </h1>
                    <p className="text-[#808fa6] text-sm mt-2 max-w-2xl">
                        Amount of players searching for a game in each region for the last week.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto px-4">

                {/* Chart Container */}
                <div className="bg-[#15171c] border border-[#2e353b] rounded-xl p-4 shadow-2xl relative">

                    {/* Toolbar */}
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={toggleAll}
                            className="text-[10px] uppercase font-bold text-[#58606e] hover:text-[#e7d291] transition-colors border border-[#2e353b] px-2 py-1 rounded bg-[#0f1114]"
                        >
                            {activeRegions.length === Object.keys(REGION_CONFIG).length ? 'Hide All' : 'Show All'}
                        </button>
                    </div>

                    <div className="h-[40vh] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={rawData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>{gradients}</defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2e353b" vertical={false} />
                                <XAxis
                                    dataKey="timestamp"
                                    tickFormatter={(unix) => formatDateShort(unix)}
                                    stroke="#58606e"
                                    tick={{ fontSize: 10, fill: '#58606e' }}
                                    minTickGap={50}
                                />
                                <YAxis
                                    stroke="#58606e"
                                    tick={{ fontSize: 10, fill: '#58606e' }}
                                    tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val}
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#e7d291', strokeWidth: 1, strokeDasharray: '4 4' }} />
                                {areas}
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Legend */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {Object.entries(REGION_CONFIG).map(([key, config]) => {
                        const isActive = activeRegions.includes(key);
                        return (
                            <button
                                key={key}
                                onClick={() => toggleRegion(key)}
                                className={clsx(
                                    "flex items-center gap-3 p-2 rounded border transition-all duration-200 group text-left",
                                    isActive
                                        ? "bg-[#15171c] border-[#2e353b] hover:border-[#58606e]"
                                        : "bg-[#0f1114] border-transparent opacity-50 hover:opacity-80 grayscale"
                                )}
                            >
                                <span
                                    className={clsx(
                                        "w-3 h-3 rounded-full shadow-[0_0_8px] shrink-0 transition-transform group-hover:scale-110",
                                        isActive ? "opacity-100" : "opacity-0"
                                    )}
                                    style={{ backgroundColor: config.color, boxShadow: `0 0 8px ${config.color}` }}
                                />
                                <span className={clsx(
                                    "text-xs font-bold uppercase tracking-wide",
                                    isActive ? "text-[#e3e3e3]" : "text-[#58606e]"
                                )}>
                                    {config.label}
                                </span>
                            </button>
                        );
                    })}
                </div>

            </div>
        </div>
    );
};
