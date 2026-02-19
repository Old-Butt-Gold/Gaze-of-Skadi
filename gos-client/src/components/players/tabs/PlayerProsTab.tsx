import React, { useState, useMemo } from 'react';
import {Link, useOutletContext} from 'react-router-dom';
import clsx from 'clsx';
import { usePlayerPros } from '../../../hooks/queries/usePlayerPros';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { BooleanState } from '../../../types/common';
import { formatRelativeTime } from '../../../utils/formatUtils';
import type { SortDirection } from '../../../store/teamStore';
import { SortIndicator } from '../../heroes/SortIndicator';
import { APP_ROUTES } from '../../../config/navigation';
import { Icon } from '../../Icon';
import { Pagination } from '../../ui/Pagination';
import type {PlayerOutletContext} from "../../../pages/PlayerDetailsPage.tsx";

type SortKey = 'pro' | 'team' | 'matches' | 'withMatches' | 'withWinPercent' | 'againstMatches' | 'againstWinPercent' | 'lastPlayed';

export const PlayerProsTab: React.FC = () => {
    const { accountId, filters } = useOutletContext<PlayerOutletContext>();
    const { data: prosData, isLoading } = usePlayerPros(accountId, filters);

    const [page, setPage] = useState(1);
    const PAGE_SIZE = 20;

    const [sortKey, setSortKey] = useState<SortKey>('matches');
    const [sortDir, setSortDir] = useState<SortDirection>('desc');

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortDir(sortDir === 'desc' ? 'asc' : 'desc');
        } else {
            setSortKey(key);
            setSortDir('desc');
        }
        setPage(1);
    };

    const processedData = useMemo(() => {
        if (!prosData) return [];

        const dataWithStats = prosData.map(pro => {
            const withWinPercent = pro.withGames > 0 ? (pro.withWin / pro.withGames) * 100 : 0;
            const againstWinPercent = pro.againstGames > 0 ? (pro.againstWin / pro.againstGames) * 100 : 0;

            return {
                ...pro,
                withWinPercent,
                againstWinPercent,
                displayName: pro.personaName || pro.name || 'Unknown'
            };
        });

        return dataWithStats.sort((a, b) => {
            let valA: number | string = 0;
            let valB: number | string = 0;

            switch (sortKey) {
                case 'pro':
                    valA = a.displayName;
                    valB = b.displayName;
                    break;
                case 'team':
                    valA = a.teamName || '';
                    valB = b.teamName || '';
                    break;
                case 'matches': valA = a.games; valB = b.games; break;
                case 'withMatches': valA = a.withGames; valB = b.withGames; break;
                case 'withWinPercent': valA = a.withWinPercent; valB = b.withWinPercent; break;
                case 'againstMatches': valA = a.againstGames; valB = b.againstGames; break;
                case 'againstWinPercent': valA = a.againstWinPercent; valB = b.againstWinPercent; break;
                case 'lastPlayed': valA = a.lastPlayed; valB = b.lastPlayed; break;
            }

            if (typeof valA === 'string' && typeof valB === 'string') {
                return valA.localeCompare(valB) * (sortDir === 'asc' ? 1 : -1);
            }
            return sortDir === 'asc' ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
        });

    }, [prosData, sortKey, sortDir]);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        return processedData.slice(start, start + PAGE_SIZE);
    }, [processedData, page]);

    const totalPages = Math.ceil(processedData.length / PAGE_SIZE);

    if (isLoading) return <LoadingSpinner text="Scouting Pros..." />;
    if (!prosData || prosData.length === 0) return <div className="text-center text-[#808fa6] py-10">No matches with pros found.</div>;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="flex justify-between items-end mb-4 px-2">
                <h3 className="text-lg font-serif font-bold text-white uppercase tracking-widest">Pros Played With</h3>
            </div>

            <div className="bg-[#15171c] border border-[#2e353b] rounded-xl overflow-hidden shadow-2xl">
                <div className="grid grid-cols-14 gap-2 px-4 py-4 bg-[#0f1114] border-b border-[#2e353b] text-[10px] uppercase font-bold text-[#58606e] tracking-widest sticky top-0 z-10">

                    <div className="col-span-3 flex items-center cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('pro')}>
                        Player <SortIndicator active={sortKey === 'pro'} dir={sortDir} />
                    </div>

                    <div className="col-span-2 flex justify-center items-center cursor-pointer hover:text-white transition-colors text-center" onClick={() => handleSort('team')}>
                        Team <SortIndicator active={sortKey === 'team'} dir={sortDir} />
                    </div>

                    <div className="col-span-1 flex justify-center items-center cursor-pointer hover:text-white transition-colors text-center" onClick={() => handleSort('matches')}>
                        Games <SortIndicator active={sortKey === 'matches'} dir={sortDir} />
                    </div>

                    <div className="col-span-1" />

                    <div className="col-span-2 flex flex-col justify-center items-center cursor-pointer hover:text-white transition-colors text-center" onClick={() => handleSort('withMatches')}>
                        <span>With</span>
                        <span className="text-[8px] opacity-60">Games / WR</span>
                        <SortIndicator active={sortKey === 'withMatches'} dir={sortDir} />
                    </div>

                    <div className="col-span-1" />

                    <div className="col-span-2 flex flex-col justify-center items-center cursor-pointer hover:text-white transition-colors text-center" onClick={() => handleSort('againstMatches')}>
                        <span>Against</span>
                        <span className="text-[8px] opacity-60">Games / WR</span>
                        <SortIndicator active={sortKey === 'againstMatches'} dir={sortDir} />
                    </div>

                    <div className="col-span-2 flex justify-end items-center cursor-pointer hover:text-white transition-colors text-right" onClick={() => handleSort('lastPlayed')}>
                        Last <SortIndicator active={sortKey === 'lastPlayed'} dir={sortDir} />
                    </div>
                </div>

                <div className="divide-y divide-[#2e353b]/30 overflow-y-auto scrollbar-thin scrollbar-thumb-[#2e353b] scrollbar-track-[#15171c]">
                    {paginatedData.map((row) => (
                        <div key={row.accountId} className="grid grid-cols-14 gap-2 px-4 py-2.5 items-center hover:bg-[#1e222b] transition-colors group">
                            <div className="col-span-3 overflow-hidden">
                                <Link to={`${APP_ROUTES.PLAYERS}/${row.accountId}`} className="flex items-center gap-3 group/link">
                                    <div className="w-10 h-10 shrink-0 rounded bg-[#0f1114] border border-[#2e353b] overflow-hidden relative">
                                        <Icon src={row.avatarFull?.toString() || '/assets/images/unknown_player.png'} />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-sm font-bold text-white group-hover/link:text-[#e7d291] transition-colors">
                                                {row.personaName || row.personaName}
                                            </span>
                                            {row.plus?.value === BooleanState.True && (
                                                <Icon src={"/assets/images/dota_plus_icon.png"} size={4}/>
                                            )}
                                        </div>
                                        <span className="text-xs text-[#58606e] font-mono">
                                            {row.name}
                                        </span>
                                    </div>
                                </Link>
                            </div>

                            <div className="col-span-2 text-center">
                                {row.teamName ? (
                                    <span className="text-xs text-[#a3aab8] font-medium">{row.teamName}</span>
                                ) : (
                                    <span className="text-xs text-[#2e353b]">-</span>
                                )}
                            </div>

                            <div className="col-span-1 text-center font-mono text-white font-bold">
                                {row.games}
                            </div>

                            <div className="col-span-1" />

                            {/* 4. With Stats (2 cols) */}
                            <div className="col-span-2 text-center">
                                {row.withGames > 0 ? (
                                    <div className="flex flex-col items-center">
                                        <span className="text-xs font-mono text-[#808fa6]">{row.withGames}</span>
                                        <div className="w-full flex flex-col items-center mt-0.5">
                                            <span className={clsx("text-[10px] font-bold", row.withWinPercent >= 50 ? "text-emerald-400" : "text-red-400")}>
                                                {row.withWinPercent.toFixed(0)}%
                                            </span>
                                            <div className="w-full h-1 bg-[#0f1114] rounded-full overflow-hidden border border-[#2e353b]/50">
                                                <div
                                                    className={clsx("h-full", row.withWinPercent >= 50 ? "bg-emerald-500" : "bg-red-500")}
                                                    style={{ width: `${row.withWinPercent}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <span className="text-[#2e353b] text-xs">-</span>
                                )}
                            </div>

                            <div className="col-span-1" />

                            <div className="col-span-2 text-center">
                                {row.againstGames > 0 ? (
                                    <div className="flex flex-col items-center">
                                        <span className="text-xs font-mono text-[#808fa6]">{row.againstGames}</span>
                                        <div className="w-full flex flex-col items-center mt-0.5">
                                            <span className={clsx("text-[10px] font-bold", row.againstWinPercent >= 50 ? "text-emerald-400" : "text-red-400")}>
                                                {row.againstWinPercent.toFixed(0)}%
                                            </span>
                                            <div className="w-full h-1 bg-[#0f1114] rounded-full overflow-hidden border border-[#2e353b]/50">
                                                <div
                                                    className={clsx("h-full", row.againstWinPercent >= 50 ? "bg-emerald-500" : "bg-red-500")}
                                                    style={{ width: `${row.againstWinPercent}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <span className="text-[#2e353b] text-xs">-</span>
                                )}
                            </div>

                            <div className="col-span-2 text-right text-xs text-[#808fa6] font-medium whitespace-nowrap">
                                {row.lastPlayed === 0 ? (
                                    <span className="opacity-40 italic">Never</span>
                                ) : (
                                    formatRelativeTime(row.lastPlayed)
                                )}
                            </div>

                        </div>
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className="border-t border-[#2e353b] bg-[#0f1114]/50">
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={setPage}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
