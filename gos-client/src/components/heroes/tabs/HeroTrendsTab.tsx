import React, { useMemo, useState } from 'react';
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
import clsx from 'clsx';
import { useHeroMetaTimeline } from '../../../hooks/queries/useHeroMetaTimeline';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { ErrorDisplay } from '../../ui/ErrorDisplay';
import {formatDateFull, formatDateShort} from '../../../utils/formatUtils';
import { Icon } from '../../Icon';
import type {HeroMetaTimelineDto} from "../../../types/heroMetaTimeline.ts";
import {useOutletContext} from "react-router-dom";
import type {HeroOutletContext} from "../../../pages/HeroDetailsPage.tsx";

type PositionKey = keyof HeroMetaTimelineDto;

interface ChartDataPoint {
    timestamp: number;
    [key: string]: number;
}

// Конфигурация
const POS_CONFIG: Record<PositionKey, { label: string, color: string, icon: string }> = {
    pos1: { label: 'Safe Lane', color: '#e7d291', icon: '/assets/images/pos-1.svg' },
    pos2: { label: 'Mid Lane', color: '#60a5fa', icon: '/assets/images/pos-2.svg' },
    pos3: { label: 'Off Lane', color: '#f87171', icon: '/assets/images/pos-3.svg' },
    pos4: { label: 'Soft Support', color: '#c084fc', icon: '/assets/images/pos-4.svg' },
    pos5: { label: 'Hard Support', color: '#fbbf24', icon: '/assets/images/pos-5.svg' },
};

// --- TOOLTIP ---
const CustomTooltip = React.memo(({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
        const dateStr = formatDateFull(Number(label));
        // Сортируем от большего винрейта к меньшему
        const sortedPayload = [...payload].sort((a, b) => (Number(b.value) || 0) - (Number(a.value) || 0));

        return (
            <div className="bg-[#15171c]/95 border border-[#2e353b] p-3 rounded shadow-xl backdrop-blur-md z-50 min-w-[250px]">
                <p className="text-[#e7d291] font-bold text-xs mb-2 border-b border-[#2e353b] pb-1 uppercase tracking-wider">
                    {dateStr}
                </p>
                <div className="flex flex-col gap-2">
                    {sortedPayload.map((entry) => {
                        const posKey = entry.name as PositionKey;
                        const config = POS_CONFIG[posKey];
                        const winRate = Number(entry.value);
                        const matchCount = entry.payload[`${posKey}_matches`] as number;

                        return (
                            <div key={entry.name} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2 text-[#a3aab8]">
                                    <Icon src={config?.icon} size={4} />
                                    <span>{config?.label}</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    {/* Match Count (Grey) */}
                                    <span className="text-[12px] text-[#58606e] font-mono">
                                        {matchCount?.toLocaleString()}m
                                    </span>
                                    {/* Winrate (Colored) */}
                                    <span className={clsx(
                                        "font-mono font-bold w-12 text-right",
                                        winRate >= 50 ? "text-emerald-400" : "text-red-400"
                                    )}>
                                        {winRate.toFixed(1)}%
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
    return null;
});

export const HeroTrendsTab: React.FC = () => {
    const { hero } = useOutletContext<HeroOutletContext>();
    const { data: timeline, isLoading, isError, refetch } = useHeroMetaTimeline(hero.id);

    const [activePositions, setActivePositions] = useState<PositionKey[]>(Object.keys(POS_CONFIG) as PositionKey[]);

    // Трансформация данных
    const chartData = useMemo(() => {
        if (!timeline) return [];

        const dataMap = new Map<number, ChartDataPoint>();

        // Безопасный перебор ключей (pos1..pos5)
        (Object.keys(timeline) as PositionKey[]).forEach((posKey) => {
            const points = timeline[posKey];
            if (!points) return;

            points.forEach(p => {
                if (!dataMap.has(p.timeStamp)) {
                    dataMap.set(p.timeStamp, { timestamp: p.timeStamp });
                }
                const entry = dataMap.get(p.timeStamp)!;

                // Сохраняем WinRate (для графика)
                entry[posKey] = p.winRate;
                // Сохраняем MatchCount (для тултипа), используя суффикс
                entry[`${posKey}_matches`] = p.matchCount;
            });
        });

        return Array.from(dataMap.values()).sort((a, b) => a.timestamp - b.timestamp);
    }, [timeline]);

    const togglePos = (key: PositionKey) => {
        setActivePositions(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
    };

    if (isLoading) return <LoadingSpinner text="Analyzing historical data..." />;
    if (isError) return <ErrorDisplay message="Failed to load trends" onRetry={refetch} />;

    const hasData = chartData.length > 0;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-6">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
                <div className="border-l-4 border-[#e7d291] pl-4 py-2">
                    <h3 className="text-xl font-serif font-bold text-white uppercase tracking-widest">
                        Win Rate Trends
                    </h3>
                    <p className="text-[#808fa6] text-sm mt-1">
                        Daily performance statistics for <span className="text-[#e7d291]">{hero.localized_name}</span> over the last 30 days.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-[#15171c] border border-[#2e353b] rounded-xl p-4 shadow-lg">

                {/* Legend / Filter Toggles */}
                <div className="flex flex-wrap gap-3 mb-6 justify-center md:justify-end">
                    {(Object.keys(POS_CONFIG) as PositionKey[]).map((key) => {
                        const config = POS_CONFIG[key];
                        // Проверяем наличие данных
                        const hasDataForPos = timeline && timeline[key] && timeline[key].length > 0;

                        if (!hasDataForPos) return null;

                        const isActive = activePositions.includes(key);
                        return (
                            <button
                                key={key}
                                onClick={() => togglePos(key)}
                                className={clsx(
                                    "flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-bold uppercase tracking-wider transition-all",
                                    isActive
                                        ? "bg-[#0f1114] border-[#58606e] text-[#e3e3e3]"
                                        : "bg-transparent border-transparent text-[#58606e] opacity-50 grayscale"
                                )}
                            >
                                <Icon src={config.icon} size={4} />
                                {config.label}
                                {/* Цветная точка статуса */}
                                <span
                                    className="w-1.5 h-1.5 rounded-full ml-1 transition-all"
                                    style={{
                                        backgroundColor: config.color,
                                        opacity: isActive ? 1 : 0.3,
                                        boxShadow: isActive ? `0 0 6px ${config.color}` : 'none'
                                    }}
                                />
                            </button>
                        );
                    })}
                </div>

                {/* Chart */}
                {hasData ? (
                    <div className="h-[50vh] w-full select-none">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    {(Object.keys(POS_CONFIG) as PositionKey[]).map((key) => (
                                        <linearGradient key={key} id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={POS_CONFIG[key].color} stopOpacity={0.3} />
                                            <stop offset="95%" stopColor={POS_CONFIG[key].color} stopOpacity={0} />
                                        </linearGradient>
                                    ))}
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2e353b" vertical={false} />
                                <XAxis
                                    dataKey="timestamp"
                                    tickFormatter={(unix) => formatDateShort(unix)}
                                    stroke="#58606e"
                                    tick={{ fontSize: 10, fill: '#58606e' }}
                                    minTickGap={30}
                                    axisLine={false}
                                    tickLine={false}
                                    dy={10}
                                />
                                <YAxis
                                    stroke="#58606e"
                                    tick={{ fontSize: 10, fill: '#58606e' }}
                                    domain={['auto', 'auto']}
                                    tickFormatter={(val) => `${val.toFixed(0)}%`}
                                    axisLine={false}
                                    tickLine={false}
                                    dx={-10}
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#e7d291', strokeWidth: 1, strokeDasharray: '4 4' }} />

                                {(Object.keys(POS_CONFIG) as PositionKey[]).map(key => {
                                    if (!activePositions.includes(key)) return null;
                                    const hasDataForPos = timeline && timeline[key] && timeline[key].length > 0;
                                    if (!hasDataForPos) return null;

                                    const conf = POS_CONFIG[key];
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
                                            animationDuration={800}
                                            activeDot={{ r: 4, strokeWidth: 0, fill: '#fff' }}
                                        />
                                    );
                                })}
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-[#58606e] opacity-50 py-20">
                        <span className="text-4xl mb-2">📉</span>
                        <span className="uppercase tracking-widest text-xs">Insufficient data for analysis</span>
                    </div>
                )}
            </div>
        </div>
    );
};
