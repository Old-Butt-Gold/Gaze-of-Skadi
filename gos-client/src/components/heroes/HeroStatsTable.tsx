import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import { useHeroes } from '../../hooks/queries/useHeroes';
import { HeroCell } from './HeroCell';
import { Icon } from '../Icon';
import { getRankIconUrl } from '../../utils/rankUtils';
import { calculateWinRate, getWinRateColor, RANK_ICON_IDS, RANK_KEYS } from '../../utils/heroStatsUtils';
import type {HeroStatsGroupedDto, RankedStatsDto} from "../../types/heroStats.ts";

interface Props {
    stats: HeroStatsGroupedDto[];
    activeTab: 'turbo' | 'pro' | 'ranked';
    searchQuery: string;
}

type SortDirection = 'asc' | 'desc';

interface SortConfig {
    key: string;
    direction: SortDirection;
}

// --- Sub-Components (Clean & Simple) ---

const StatCell = React.memo(({ pick, win, isCompact = false }: { pick: number, win: number, isCompact?: boolean }) => {
    const wr = calculateWinRate(win, pick);
    if (pick === 0) return <span className="text-[#2e353b] text-center block">-</span>;

    return (
        <div className="flex flex-col items-center justify-center leading-tight">
            <span className={clsx("font-bold font-mono", getWinRateColor(wr), isCompact ? "text-xs" : "text-sm")}>
                {wr.toFixed(1)}%
            </span>
            <span className={clsx("text-[#58606e] font-medium opacity-80", isCompact ? "text-[9px]" : "text-[10px]")}>
                {pick.toLocaleString()}
            </span>
        </div>
    );
});

const SortIndicator = ({ active, dir }: { active: boolean, dir: SortDirection }) => {
    if (!active) return <span className="w-3 block" />;
    return <span className="text-[#e7d291] ml-1 text-[10px] w-3 block transition-transform">{dir === 'asc' ? '▲' : '▼'}</span>;
};

// --- Main Component ---

export const HeroStatsTable: React.FC<Props> = ({ stats, activeTab, searchQuery }) => {
    const { getHero } = useHeroes();

    // Default Sort: Name Ascending
    const [sortConfig, setSortConfig] = useState<SortConfig>({
        key: 'name',
        direction: 'asc'
    });

    const handleSort = (key: string) => {
        setSortConfig(current => ({
            key,
            direction: current.key === key && current.direction === 'desc' ? 'asc' : 'desc'
        }));
    };

    const processedData = useMemo(() => {
        let data = [...stats];

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            data = data.filter(item => {
                const hero = getHero(item.id);
                return hero?.localized_name.toLowerCase().includes(q);
            });
        }

        const getSortValue = (item: HeroStatsGroupedDto, key: string): number | string => {
            if (key === 'name') return getHero(item.id)?.localized_name || '';

            if (activeTab === 'turbo') {
                if (key === 'picks') return item.turbo.pick;
                if (key === 'winrate') return calculateWinRate(item.turbo.win, item.turbo.pick);
            }

            if (activeTab === 'pro') {
                if (key === 'picks') return item.pro.pick;
                if (key === 'bans') return item.pro.ban;
                if (key === 'winrate') return calculateWinRate(item.pro.win, item.pro.pick);
            }

            if (activeTab === 'ranked') {
                if (key === 'pub.picks') return item.ranked.pub.pick;
                if (key === 'pub.winrate') return calculateWinRate(item.ranked.pub.win, item.ranked.pub.pick);
                if (RANK_KEYS.includes(key as keyof RankedStatsDto)) {
                    const rankData = item.ranked[key as keyof RankedStatsDto];
                    return calculateWinRate(rankData.win, rankData.pick);
                }
            }
            return 0;
        };

        data.sort((a, b) => {
            const valA = getSortValue(a, sortConfig.key);
            const valB = getSortValue(b, sortConfig.key);
            const mod = sortConfig.direction === 'asc' ? 1 : -1;

            if (typeof valA === 'string' && typeof valB === 'string') return valA.localeCompare(valB) * mod;
            return ((valA as number) - (valB as number)) * mod;
        });

        return data;
    }, [stats, activeTab, searchQuery, sortConfig, getHero]);

    // Helper for Header Cells
    const HeaderCell = ({ label, sortKey, className }: { label: React.ReactNode, sortKey: string, className?: string }) => (
        <th
            className={clsx("px-4 py-3 cursor-pointer hover:bg-[#1e222b] hover:text-white transition-colors relative group/th select-none", className)}
            onClick={() => handleSort(sortKey)}
        >
            <div className="flex items-center justify-center gap-1 h-full">
                {label} <SortIndicator active={sortConfig.key === sortKey} dir={sortConfig.direction} />
            </div>
            {sortConfig.key === sortKey && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#e7d291] opacity-60" />}
        </th>
    );

    return (
        // ВАЖНО: relative z-0 создает новый stacking context для таблицы, но не обрезает fixed элементы (тултип)
        <div className="w-full bg-[#15171c] border border-[#2e353b] rounded-xl shadow-2xl relative z-0 flex flex-col">

            <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-[#2e353b] scrollbar-track-[#15171c] rounded-xl pb-1">
                <table className="w-full text-left border-collapse min-w-max">
                    <thead>
                    <tr className="bg-[#0f1114] text-[10px] uppercase text-[#58606e] font-bold tracking-wider border-b border-[#2e353b]">

                        {/* Sticky Hero Column */}
                        <th
                            className="px-4 py-3 sticky left-0 z-20 bg-[#0f1114] border-r border-[#2e353b] cursor-pointer hover:text-white transition-colors min-w-[200px] shadow-[4px_0_10px_-2px_rgba(0,0,0,0.5)] select-none"
                            onClick={() => handleSort('name')}
                        >
                            <div className="flex items-center gap-2">
                                Hero <SortIndicator active={sortConfig.key === 'name'} dir={sortConfig.direction} />
                            </div>
                        </th>

                        {activeTab === 'turbo' && (
                            <>
                                <HeaderCell label="Matches" sortKey="picks" className="border-r border-[#2e353b]/30" />
                                <HeaderCell label="Win Rate" sortKey="winrate" />
                            </>
                        )}

                        {activeTab === 'pro' && (
                            <>
                                <HeaderCell label="Picks" sortKey="picks" className="border-r border-[#2e353b]/30" />
                                <HeaderCell label="Bans" sortKey="bans" className="border-r border-[#2e353b]/30" />
                                <HeaderCell label="Win Rate" sortKey="winrate" />
                            </>
                        )}

                        {activeTab === 'ranked' && (
                            <>
                                {RANK_KEYS.map((key) => (
                                    <th key={key} className="px-2 py-3 text-center border-r border-[#2e353b]/30 min-w-[90px] cursor-pointer hover:bg-[#1e222b] relative group/th select-none" onClick={() => handleSort(key)}>
                                        <div className="flex flex-col items-center gap-1">
                                            <Icon src={getRankIconUrl(RANK_ICON_IDS[key as keyof Omit<RankedStatsDto, 'pub'>])} size={6} />
                                            <div className="flex items-center">
                                                <span className="text-[9px] opacity-70 group-hover/th:text-white transition-colors">Win%</span>
                                                <SortIndicator active={sortConfig.key === key} dir={sortConfig.direction} />
                                            </div>
                                        </div>
                                        {sortConfig.key === key && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#e7d291] opacity-60" />}
                                    </th>
                                ))}
                                <HeaderCell
                                    label={<div className="flex flex-col items-center"><span className="text-[11px] mb-0.5">All Pubs</span><span className="text-[9px] opacity-70">Win%</span></div>}
                                    sortKey="pub.winrate"
                                />
                            </>
                        )}
                    </tr>
                    </thead>

                    <tbody className="text-sm divide-y divide-[#1e222b]">
                    {processedData.map((row, idx) => (
                        <tr key={row.id} className={clsx(
                            "transition-colors group hover:bg-[#1e222b]",
                            idx % 2 === 0 ? "bg-[#15171c]" : "bg-[#181a20]" // Zebra Striping
                        )}>
                            {/* Sticky Hero Cell */}
                            <td className={clsx(
                                "px-4 py-2 sticky left-0 z-10 border-r border-[#2e353b] transition-colors shadow-[4px_0_10px_-2px_rgba(0,0,0,0.5)]",
                                idx % 2 === 0 ? "bg-[#15171c] group-hover:bg-[#1e222b]" : "bg-[#181a20] group-hover:bg-[#1e222b]"
                            )}>
                                <HeroCell heroId={row.id} showName={true} />
                            </td>

                            {activeTab === 'turbo' && (
                                <>
                                    <td className="px-4 py-2 text-center font-mono text-[#e3e3e3] border-r border-[#2e353b]/30">
                                        {row.turbo.pick.toLocaleString()}
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        <StatCell pick={row.turbo.pick} win={row.turbo.win} />
                                    </td>
                                </>
                            )}

                            {activeTab === 'pro' && (
                                <>
                                    <td className="px-4 py-2 text-center font-mono text-[#e3e3e3] border-r border-[#2e353b]/30">
                                        {row.pro.pick.toLocaleString()}
                                    </td>
                                    <td className="px-4 py-2 text-center font-mono text-[#808fa6] border-r border-[#2e353b]/30">
                                        {row.pro.ban.toLocaleString()}
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        <StatCell pick={row.pro.pick} win={row.pro.win} />
                                    </td>
                                </>
                            )}

                            {activeTab === 'ranked' && (
                                <>
                                    {RANK_KEYS.map(key => (
                                        <td key={key} className="px-2 py-2 text-center border-r border-[#2e353b]/30">
                                            <StatCell pick={row.ranked[key].pick} win={row.ranked[key].win} isCompact />
                                        </td>
                                    ))}
                                    <td className="px-2 py-2 text-center">
                                        <StatCell pick={row.ranked.pub.pick} win={row.ranked.pub.win} />
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
