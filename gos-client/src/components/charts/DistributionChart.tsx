import React from 'react';
import {
    ComposedChart, // Важно: меняем BarChart на ComposedChart
    Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';
import {getRankColor, getRankIconUrl, getRankNameBase, getRankNameFull} from '../../utils/rankUtils';
import type {DistributionRowDto} from "../../types/distribution.ts";
import type {AxisDomain} from "recharts/types/util/types";
import {RankIcon} from "../distributions/RankIcon.tsx";

interface Props {
    data: DistributionRowDto[];
}

// Интерфейсы для кастомных тиков Recharts
interface CustomTickProps {
    x: number;
    y: number;
    payload: {
        value: string | number;
        index: number;
    };
    // Прокидываем наши данные
    data: DistributionRowDto[];
}

interface CustomTooltipPayload {
    dataKey?: string | number;
    payload: DistributionRowDto; // Ваш тип данных
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: CustomTooltipPayload[]; // Массив элементов payload
}

const RankGroupTick = ({ x, y, payload, data }: CustomTickProps) => {
    const row = data[payload.index];
    if (!row) return null;

    const rankValue = row.rank.value;
    const star = rankValue % 10;
    const isImmortal = rankValue >= 80;

    // Рисуем иконку только если это "начало" ранга (1 звезда) или это Иммортал
    const shouldRenderIcon = star === 1 || isImmortal;

    if (!shouldRenderIcon) return null;

    return (
        <g transform={`translate(${x},${y})`}>
            <image
                x={-24}
                y={5}
                width={48}
                height={48}
                href={getRankIconUrl(rankValue)}
                style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.2))' }}
            />
            <text x={0} y={65} textAnchor="middle" fill="#64748b" fontSize={12} fontWeight={600}>
                {getRankNameBase(row.rank.value)}
            </text>
        </g>
    );
};

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    // 1. Проверки на существование
    if (!active || !payload || !payload.length) return null;

    // 2. Получаем данные.
    // payload[0] - это первый элемент (столбец) под мышкой.
    // .payload - это исходный объект данных (DistributionRowDto), который мы передали в data={...}
    const data = payload[0].payload as DistributionRowDto;

    // На всякий случай проверяем, что data существует
    if (!data) return null;

    const color = getRankColor(data.rank.value);

    return (
        <div className="bg-slate-900/95 backdrop-blur text-white p-4 rounded-xl shadow-2xl border border-slate-700 ring-1 ring-white/10 z-50">
            <div className="flex items-center gap-4 mb-3 border-b border-slate-700/50 pb-3">
                <RankIcon rank={data.rank.value} size={12} />
                <div>
                    <p className="font-bold text-lg leading-none text-slate-100">{getRankNameFull(data.rank.value)}</p>
                </div>
            </div>

            <div className="space-y-2 text-sm">
                <div className="flex justify-between gap-8">
                    <span className="text-slate-400">Players:</span>
                    <span className="font-mono font-bold" style={{ color }}>
                        {data.count.toLocaleString()}
                    </span>
                </div>
                <div className="flex justify-between gap-8">
                    <span className="text-slate-400">Percentage:</span>
                    <span className="font-mono font-bold text-amber-400">
                        {data.percentage.toLocaleString()}%
                    </span>
                </div>
            </div>
        </div>
    );
};

export const DistributionChart: React.FC<Props> = ({ data }) => {
    // Вычисляем максимум для правой оси, чтобы линия не прилипала к потолку
    const maxCumulative = data.length > 0 ? data[data.length - 1].cumulativeSum : 0;
    // Добавляем 10% отступа сверху
    const domainRight: AxisDomain = [0, maxCumulative * 1.1];

    return (
        <div className="w-full h-full min-h-125 bg-white rounded-2xl p-4 md:p-8 shadow-sm border border-slate-200">
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart // Используем ComposedChart для комбинации графиков
                    data={data}
                    margin={{ top: 20, right: 20, left: 20, bottom: 40 }}
                >
                    <defs>
                        {/* Градиент для линии */}
                        <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.8}/>
                            <stop offset="100%" stopColor="#d97706" stopOpacity={1}/>
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />

                    <XAxis
                        dataKey="rank.name"
                        axisLine={false}
                        tickLine={false}
                        interval={0}
                        tick={(props) => <RankGroupTick {...props} data={data} />}
                        height={80}
                    />

                    {/* Левая ось Y (Количество игроков на ранге) */}
                    <YAxis
                        yAxisId="left"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#94a3b8', fontSize: 11 }}
                        tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}
                    />

                    {/* Правая ось Y (Кумулятивная сумма) */}
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        axisLine={false}
                        tickLine={false}
                        domain={domainRight}
                        tick={{ fill: '#d97706', fontSize: 11 }}
                        tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}
                    />

                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc', opacity: 0.8 }} />

                    {/* Гистограмма */}
                    <Bar
                        yAxisId="left"
                        dataKey="count"
                        radius={[4, 4, 0, 0]}
                        animationDuration={1000}
                        maxBarSize={50}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={getRankColor(entry.rank.value)} // Проверьте, что getRankColor принимает number (value)
                                className="hover:opacity-80 transition-opacity cursor-pointer"
                            />
                        ))}
                    </Bar>

                    {/* Кумулятивная Линия */}
                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="cumulativeSum"
                        stroke="url(#lineGradient)"
                        strokeWidth={3}
                        dot={false}
                        activeDot={{ r: 6, fill: '#fbbf24', stroke: '#fff', strokeWidth: 2 }}
                        animationDuration={1000}
                    />

                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};
