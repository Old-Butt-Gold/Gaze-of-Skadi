import React from 'react';
import clsx from 'clsx';
import { isItemTiming } from '../../utils/typeGuards';
import { formatDuration } from '../../utils/formatUtils';
import { getLaneConfig } from '../../utils/scenariosUtils';
import type { ItemTimingDto, LaneRolesDto } from "../../types/scenarios";
import { Icon } from '../Icon'; // Импорт вашего компонента Icon

// Объединенный тип для простоты использования в дженерике
type ScenarioData = ItemTimingDto | LaneRolesDto;

interface Props {
    data: ScenarioData[];
}

export const ScenarioTable: React.FC<Props> = ({ data }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[10px] uppercase text-slate-500 font-bold tracking-wider">
                    <th className="px-6 py-3 w-1/3">Context</th>
                    <th className="px-6 py-3 text-right">Timing</th>
                    <th className="px-6 py-3 text-right hidden sm:table-cell">Matches</th>
                    <th className="px-6 py-3 w-48 text-right">Win Rate</th>
                </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-50">
                {data.map((row, idx) => {
                    const winRate = row.games > 0 ? (row.wins / row.games) * 100 : 0;
                    const barColor = winRate >= 55 ? 'bg-emerald-500' : winRate >= 48 ? 'bg-yellow-500' : 'bg-red-400';
                    const textColor = winRate >= 50 ? "text-emerald-700" : "text-slate-600";

                    return (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors group">

                            {/* Context: Item or Lane */}
                            <td className="px-6 py-3 font-medium text-slate-700 align-middle">
                                {isItemTiming(row) ? (
                                    <div className="flex items-center gap-3">
                                        {/* Item Icon Placeholder */}
                                        <div className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center text-[10px] text-slate-400 shadow-sm border border-slate-300">
                                            ?
                                        </div>
                                        <span className="capitalize font-serif text-base tracking-wide">
                                                {row.item.replace(/_/g, ' ')}
                                            </span>
                                    </div>
                                ) : (
                                    (() => {
                                        // Lane Logic
                                        const config = getLaneConfig(row.laneRole.value);
                                        return (
                                            <span className={clsx(
                                                "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold border uppercase tracking-wider shadow-sm transition-all hover:scale-105",
                                                config.style
                                            )}>
                                                    {/* Иконка Линии */}
                                                {config.iconSrc && <Icon src={config.iconSrc} size={4} alt={""} />}
                                                {config.label}
                                            </span>
                                        );
                                    })()
                                )}
                            </td>

                            {/* Timing */}
                            <td className="px-6 py-3 text-right font-mono text-xs text-slate-500 align-middle">
                                    <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200 shadow-sm">
                                        {formatDuration(row.time)}
                                    </span>
                            </td>

                            {/* Matches (Hidden on mobile) */}
                            <td className="px-6 py-3 text-right text-xs font-mono text-slate-400 align-middle hidden sm:table-cell">
                                {row.games.toLocaleString()}
                            </td>

                            {/* Win Rate Bar */}
                            <td className="px-6 py-3 align-middle">
                                <div className="flex flex-col items-end gap-1 w-full">
                                        <span className={clsx("font-bold font-mono text-xs", textColor)}>
                                            {winRate.toFixed(1)}%
                                        </span>
                                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-100">
                                        <div
                                            className={clsx("h-full rounded-full transition-all duration-500", barColor)}
                                            style={{ width: `${winRate}%` }}
                                        />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};
