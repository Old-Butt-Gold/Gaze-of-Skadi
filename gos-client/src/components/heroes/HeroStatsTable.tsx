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

// --- Sub-Components (Defined outside to prevent re-render bugs) ---

const StatCell = ({ pick, win, isCompact = false }: { pick: number, win: number, isCompact?: boolean }) => {
    const wr = calculateWinRate(win, pick);
    if (pick === 0) return <span className="text-[#2e353b] text-center block">-</span>;

    return (
        <div className="flex flex-col items-center justify-center leading-tight">
            <span className={clsx("font-bold font-mono", getWinRateColor(wr), isCompact ? "text-xs" : "text-sm")}>
                {wr.toFixed(1)}%
            </span>
            <span className={clsx("text-[#58606e] font-medium", isCompact ? "text-[9px]" : "text-[10px]")}>
                {pick.toLocaleString()}
            </span>
        </div>
    );
};

const SortIndicator = ({ active, dir }: { active: boolean, dir: SortDirection }) => {
    if (!active) return <span className="w-3" />;
    return <span className="text-[#e7d291] ml-1 text-[10px] w-3">{dir === 'asc' ? '▲' : '▼'}</span>;
};

// --- Main Component ---

export const HeroStatsTable: React.FC<Props> = ({ stats, activeTab, searchQuery }) => {
    const { getHero } = useHeroes();

    const [sortConfig, setSortConfig] = useState<SortConfig>({
        key: 'picks', // Default key depending on tab logic
        direction: 'desc'
    });

    const handleSort = (key: string) => {
        setSortConfig(current => ({
            key,
            direction: current.key === key && current.direction === 'desc' ? 'asc' : 'desc'
        }));
    };

    // --- Data Processing ---
    const processedData = useMemo(() => {
        let data = [...stats];

        // Filter
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            data = data.filter(item => {
                const hero = getHero(item.id);
                return hero?.localized_name.toLowerCase().includes(q);
            });
        }

        // Sort Helper
        const getSortValue = (item: HeroStatsGroupedDto, key: string): number | string => {
            if (key === 'name') return getHero(item.id)?.localized_name || '';

            // Tab: Turbo
            if (activeTab === 'turbo') {
                if (key === 'picks') return item.turbo.pick;
                if (key === 'winrate') return calculateWinRate(item.turbo.win, item.turbo.pick);
            }

            // Tab: Pro
            if (activeTab === 'pro') {
                if (key === 'picks') return item.pro.pick;
                if (key === 'bans') return item.pro.ban;
                if (key === 'winrate') return calculateWinRate(item.pro.win, item.pro.pick);
            }

            // Tab: Ranked (Dynamic Keys like 'ranked.herald.win')
            if (activeTab === 'ranked') {
                // Special case for 'pub' (All Matches)
                if (key === 'pub.picks') return item.ranked.pub.pick;
                if (key === 'pub.winrate') return calculateWinRate(item.ranked.pub.win, item.ranked.pub.pick);

                // Ranks (e.g. key="herald") -> Sort by WR or Picks? Usually WR is primary for grid
                // Let's assume sorting by WR for ranks
                if (RANK_KEYS.includes(key as keyof RankedStatsDto)) {
                    const rankData = item.ranked[key as keyof RankedStatsDto];
                    return calculateWinRate(rankData.win, rankData.pick);
                }
            }
            return 0;
        };

        // Sort Execution
        data.sort((a, b) => {
            const valA = getSortValue(a, sortConfig.key);
            const valB = getSortValue(b, sortConfig.key);
            const mod = sortConfig.direction === 'asc' ? 1 : -1;

            if (typeof valA === 'string' && typeof valB === 'string') {
                return valA.localeCompare(valB) * mod;
            }
            return ((valA as number) - (valB as number)) * mod;
        });

        return data;
    }, [stats, activeTab, searchQuery, sortConfig, getHero]);

    // --- Render Tables based on Tab ---

    const renderHeaderCell = (label: React.ReactNode, sortKey: string, widthClass = "") => (
        <th
            className={`px-4 py-3 cursor-pointer hover:bg-[#1e222b] hover:text-white transition-colors border-r border-[#2e353b] last:border-r-0 ${widthClass}`}
            onClick={() => handleSort(sortKey)}
        >
            <div className="flex items-center justify-center">
                {label} <SortIndicator active={sortConfig.key === sortKey} dir={sortConfig.direction} />
            </div>
        </th>
    );

    return (
        <div className="w-full overflow-hidden rounded-xl border border-[#2e353b] bg-[#1a1d24] shadow-2xl relative z-0">
            <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-[#2e353b] scrollbar-track-[#15171c]">
                <table className="w-full text-left border-collapse min-w-max">
                    <thead>
                    <tr className="bg-[#0f1114] text-[10px] uppercase text-[#58606e] font-bold tracking-wider border-b border-[#2e353b]">
                        {/* Sticky Hero Column */}
                        <th
                            className="px-4 py-3 left-0 z-20 bg-[#0f1114] border-r border-[#2e353b] cursor-pointer hover:text-white transition-colors min-w-[200px] shadow-[4px_0_10px_-2px_rgba(0,0,0,0.5)]"
                            onClick={() => handleSort('name')}
                        >
                            <div className="flex items-center">
                                Hero <SortIndicator active={sortConfig.key === 'name'} dir={sortConfig.direction} />
                            </div>
                        </th>

                        {activeTab === 'turbo' && (
                            <>
                                {renderHeaderCell("Matches Played", "picks")}
                                {renderHeaderCell("Win Rate", "winrate")}
                            </>
                        )}

                        {activeTab === 'pro' && (
                            <>
                                {renderHeaderCell("Picks", "picks")}
                                {renderHeaderCell("Bans", "bans")}
                                {renderHeaderCell("Win Rate", "winrate")}
                            </>
                        )}

                        {activeTab === 'ranked' && (
                            <>
                                {/* Ranks Columns */}
                                {RANK_KEYS.map((key) => (
                                    <th key={key} className="px-2 py-3 text-center border-r border-[#2e353b] min-w-[90px] cursor-pointer hover:bg-[#1e222b]" onClick={() => handleSort(key)}>
                                        <div className="flex flex-col items-center gap-1">
                                            <Icon src={getRankIconUrl(RANK_ICON_IDS[key as keyof Omit<RankedStatsDto, 'pub'>])} size={6} />
                                            <div className="flex items-center mt-1">
                                                <span className="text-[9px] opacity-70">Win%</span>
                                                <SortIndicator active={sortConfig.key === key} dir={sortConfig.direction} />
                                            </div>
                                        </div>
                                    </th>
                                ))}
                                {/* Pub Column */}
                                <th className="px-4 py-3 text-center border-r border-[#2e353b] min-w-[100px] cursor-pointer hover:bg-[#1e222b]" onClick={() => handleSort('pub.winrate')}>
                                    <div className="flex flex-col items-center">
                                        <span className="text-[11px] text-[#e3e3e3] mb-1">All Pubs</span>
                                        <SortIndicator active={sortConfig.key === 'pub.winrate'} dir={sortConfig.direction} />
                                    </div>
                                </th>
                            </>
                        )}
                    </tr>
                    </thead>

                    <tbody className="text-sm divide-y divide-[#1e222b]">
                    {processedData.map((row) => (
                        <tr key={row.id} className="hover:bg-[#1e222b] transition-colors group">
                            {/* Sticky Hero Cell */}
                            <td className="px-4 py-2 left-0 z-10 sticky bg-[#1a1d24] group-hover:bg-[#1e222b] border-r border-[#2e353b] transition-colors shadow-[4px_0_10px_-2px_rgba(0,0,0,0.5)]">
                                <HeroCell heroId={row.id} showName={true} />
                            </td>

                            {activeTab === 'turbo' && (
                                <>
                                    <td className="px-4 py-2 text-center font-mono text-[#e3e3e3] border-r border-[#2e353b]">
                                        {row.turbo.pick.toLocaleString()}
                                    </td>
                                    <td className="px-4 py-2 text-center border-r border-[#2e353b]">
                                        <StatCell pick={row.turbo.pick} win={row.turbo.win} />
                                    </td>
                                </>
                            )}

                            {activeTab === 'pro' && (
                                <>
                                    <td className="px-4 py-2 text-center font-mono text-[#e3e3e3] border-r border-[#2e353b]">
                                        {row.pro.pick.toLocaleString()}
                                    </td>
                                    <td className="px-4 py-2 text-center font-mono text-[#808fa6] border-r border-[#2e353b]">
                                        {row.pro.ban.toLocaleString()}
                                    </td>
                                    <td className="px-4 py-2 text-center border-r border-[#2e353b]">
                                        <StatCell pick={row.pro.pick} win={row.pro.win} />
                                    </td>
                                </>
                            )}

                            {activeTab === 'ranked' && (
                                <>
                                    {RANK_KEYS.map(key => {
                                        const tierData = row.ranked[key];
                                        return (
                                            <td key={key} className="px-2 py-2 text-center border-r border-[#2e353b]">
                                                <StatCell pick={tierData.pick} win={tierData.win} isCompact />
                                            </td>
                                        );
                                    })}
                                    {/* Pub Column */}
                                    <td className="px-2 py-2 text-center border-r border-[#2e353b]">
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
