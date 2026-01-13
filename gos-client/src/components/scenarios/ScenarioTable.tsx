import React from 'react';
import clsx from 'clsx';
import { isItemTiming } from '../../utils/typeGuards';
import { formatDuration } from '../../utils/formatUtils';
import { getLaneConfig } from '../../utils/scenariosUtils';
import type { ItemTimingDto, LaneRolesDto } from "../../types/scenarios";
import { Icon } from '../Icon';

type ScenarioData = ItemTimingDto | LaneRolesDto;

interface Props {
    data: ScenarioData[];
}

export const ScenarioTable: React.FC<Props> = ({ data }) => {
    return (
        <div className="w-full overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead>
                <tr className="bg-[#15171c] border-b border-[#2e353b] text-[10px] uppercase text-[#6d798a] font-bold tracking-wider">
                    <th className="px-4 md:px-6 py-4 w-1/3">Context</th>
                    <th className="px-4 md:px-6 py-4 text-right">Timing</th>
                    <th className="px-4 md:px-6 py-4 text-right hidden sm:table-cell">Matches</th>
                    <th className="px-4 md:px-6 py-4 w-40 text-right">Win Rate</th>
                </tr>
                </thead>
                <tbody className="text-sm divide-y divide-[#1e222b]">
                {data.map((row, idx) => {
                    const winRate = row.games > 0 ? (row.wins / row.games) * 100 : 0;

                    // Dota 2 Color Palette for Winrates
                    const barColor = winRate >= 55 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]'
                        : winRate >= 48 ? 'bg-[#3b82f6]'
                            : 'bg-[#ef4444]';

                    const textColor = winRate >= 50 ? "text-emerald-400" : "text-[#808fa6]";

                    return (
                        <tr key={idx} className="hover:bg-[#1e222b] transition-colors group">

                            {/* Context */}
                            <td className="px-4 md:px-6 py-3 font-medium align-middle">
                                {isItemTiming(row) ? (
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-6 bg-[#262b36] rounded border border-[#3a414e] flex items-center justify-center text-[10px] text-[#58606e]">
                                            ?
                                        </div>
                                        <span className="capitalize font-serif text-slate-200 text-[15px] tracking-wide group-hover:text-white transition-colors">
                                                {row.item.replace(/_/g, ' ')}
                                            </span>
                                    </div>
                                ) : (
                                    (() => {
                                        const config = getLaneConfig(row.laneRole.value);
                                        return (
                                            <span className={clsx(
                                                "inline-flex items-center gap-2 px-3 py-1 rounded border uppercase tracking-wider text-[10px] font-bold shadow-sm",
                                                config.style
                                            )}>
                                                    {config.iconSrc && <Icon src={config.iconSrc} size={3} alt={config.label} />}
                                                {config.label}
                                                </span>
                                        );
                                    })()
                                )}
                            </td>

                            {/* Timing */}
                            <td className="px-4 md:px-6 py-3 text-right font-mono text-xs text-[#808fa6] align-middle">
                                    <span className="bg-[#121417] px-2 py-1 rounded border border-[#2e353b]">
                                        {formatDuration(row.time)}
                                    </span>
                            </td>

                            {/* Matches */}
                            <td className="px-4 md:px-6 py-3 text-right text-xs font-mono text-[#58606e] align-middle hidden sm:table-cell">
                                {row.games.toLocaleString()}
                            </td>

                            {/* Win Rate */}
                            <td className="px-4 md:px-6 py-3 align-middle">
                                <div className="flex flex-col items-end gap-1.5 w-full">
                                        <span className={clsx("font-bold font-mono text-xs", textColor)}>
                                            {winRate.toFixed(1)}%
                                        </span>
                                    <div className="w-full h-1 bg-[#121417] rounded-full overflow-hidden border border-[#2e353b]">
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
