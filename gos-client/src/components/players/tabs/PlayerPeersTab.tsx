import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { usePlayerPeers } from '../../../hooks/queries/usePlayerPeers';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import type { PlayerEndpointParameters } from '../../../types/player';
import { formatRelativeTime } from '../../../utils/formatUtils';
import type { SortDirection } from '../../../store/teamStore';
import { SortIndicator } from '../../heroes/SortIndicator';
import { APP_ROUTES } from '../../../config/navigation';
import {Icon} from "../../Icon.tsx";
import { Pagination } from '../../ui/Pagination';

interface Props {
    accountId: number;
    filters: PlayerEndpointParameters;
}

type SortKey = 'peer' | 'matches' | 'winPercent' | 'withMatches' | 'withWinPercent' | 'againstMatches' | 'againstWinPercent' | 'gpm' | 'xpm' | 'lastPlayed';

export const PlayerPeersTab: React.FC<Props> = ({ accountId, filters }) => {
    const { data: peersData, isLoading } = usePlayerPeers(accountId, filters);

    const [sortKey, setSortKey] = useState<SortKey>('matches');
    const [sortDir, setSortDir] = useState<SortDirection>('desc');

    const [page, setPage] = useState(1);
    const PAGE_SIZE = 20;

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
        if (!peersData) return [];

        const dataWithStats = peersData.map(peer => {
            const winPercent = peer.games > 0 ? (peer.win / peer.games) * 100 : 0;
            const withWinPercent = peer.withGames > 0 ? (peer.withWin / peer.withGames) * 100 : 0;
            const againstWinPercent = peer.againstGames > 0 ? (peer.againstWin / peer.againstGames) * 100 : 0;

            const avgGpm = peer.withGames > 0 ? peer.withGpmSum / peer.withGames : 0;
            const avgXpm = peer.withGames > 0 ? peer.withXpmSum / peer.withGames : 0;

            return {
                ...peer,
                winPercent,
                withWinPercent,
                againstWinPercent,
                avgGpm,
                avgXpm
            };
        });

        return dataWithStats.sort((a, b) => {
            let valA: number | string = 0;
            let valB: number | string = 0;

            switch (sortKey) {
                case 'peer':
                    return (a.personaname || '').localeCompare(b.personaname || '') * (sortDir === 'asc' ? 1 : -1);

                case 'matches': valA = a.games; valB = b.games; break;
                case 'winPercent': valA = a.winPercent; valB = b.winPercent; break;
                case 'withMatches': valA = a.withGames; valB = b.withGames; break;
                case 'withWinPercent': valA = a.withWinPercent; valB = b.withWinPercent; break;
                case 'againstMatches': valA = a.againstGames; valB = b.againstGames; break;
                case 'againstWinPercent': valA = a.againstWinPercent; valB = b.againstWinPercent; break;
                case 'gpm': valA = a.avgGpm; valB = b.avgGpm; break;
                case 'xpm': valA = a.avgXpm; valB = b.avgXpm; break;
                case 'lastPlayed': valA = a.lastPlayed; valB = b.lastPlayed; break;
            }

            // Numeric comparison
            return sortDir === 'asc' ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
        });

    }, [peersData, sortKey, sortDir]);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        return processedData.slice(start, start + PAGE_SIZE);
    }, [processedData, page]);

    const totalPages = Math.ceil(processedData.length / PAGE_SIZE);

    if (isLoading) return <LoadingSpinner text="Loading Peers..." />;
    if (!peersData || peersData.length === 0) return <div className="text-center text-[#808fa6] py-10">No peers found.</div>;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="flex justify-between items-end mb-4 px-2">
                <h3 className="text-lg font-serif font-bold text-white uppercase tracking-widest">Peers</h3>
            </div>

            <div className="bg-[#15171c] border border-[#2e353b] rounded-xl overflow-hidden shadow-2xl">

                <div className="grid grid-cols-12 gap-2 px-4 py-4 bg-[#0f1114] border-b border-[#2e353b] text-[10px] uppercase font-bold text-[#58606e] tracking-widest sticky top-0 z-10">

                    <div className="col-span-2 flex items-center cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('peer')}>
                        Player <SortIndicator active={sortKey === 'peer'} dir={sortDir} />
                    </div>

                    <div className="col-span-2 text-center flex justify-center items-center cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('matches')}>
                        Games <SortIndicator active={sortKey === 'matches'} dir={sortDir} />
                    </div>

                    <div className="col-span-2 text-center flex justify-center items-center cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('winPercent')}>
                        Win % <SortIndicator active={sortKey === 'winPercent'} dir={sortDir} />
                    </div>

                    <div className="col-span-2 text-center flex flex-col justify-center items-center cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('withMatches')}>
                        <span>With</span>
                        <span className="text-[8px] opacity-60">Games / WR</span>
                        <SortIndicator active={sortKey === 'withMatches'} dir={sortDir} />
                    </div>

                    <div className="col-span-2 text-center flex flex-col justify-center items-center cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('againstMatches')}>
                        <span>Against</span>
                        <span className="text-[8px] opacity-60">Games / WR</span>
                        <SortIndicator active={sortKey === 'againstMatches'} dir={sortDir} />
                    </div>

                    <div className="col-span-1 text-center flex flex-col justify-center items-center cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('gpm')}>
                        <span>Farm</span>
                        <span className="text-[8px] opacity-60">GPM / XPM</span>
                        <SortIndicator active={sortKey === 'gpm'} dir={sortDir} />
                    </div>

                    <div className="col-span-1 text-right flex justify-end items-center cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('lastPlayed')}>
                        Last <SortIndicator active={sortKey === 'lastPlayed'} dir={sortDir} />
                    </div>
                </div>

                <div className="divide-y divide-[#2e353b]/30 overflow-y-auto scrollbar-thin scrollbar-thumb-[#2e353b] scrollbar-track-[#15171c]">
                    {paginatedData.map((row) => (
                        <div key={row.accountId} className="grid grid-cols-12 gap-2 px-4 py-2.5 items-center hover:bg-[#1e222b] transition-colors group">

                            <div className="col-span-2 overflow-hidden">
                                <Link to={`${APP_ROUTES.PLAYERS}/${row.accountId}`} className="flex items-center gap-3 group/link">
                                    <div className="w-10 h-10 shrink-0 rounded bg-[#0f1114] border border-[#2e353b] overflow-hidden">
                                        <Icon src={row.avatarFull ?? "/assets/images/unknown_player.png"} fallbackSrc={"/assets/images/unknown_player.png"} />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-sm font-bold text-[#e3e3e3] group-hover/link:text-[#e7d291] transition-colors">
                                            {row.personaname || 'Unknown'}
                                        </span>
                                    </div>
                                </Link>
                            </div>

                            <div className="col-span-2 text-center font-mono text-white font-bold">
                                {row.games}
                            </div>

                            <div className="col-span-2 flex justify-center">
                                <WinRateBar percent={row.winPercent} />
                            </div>

                            <div className="col-span-2 text-center">
                                {row.withGames > 0 ? (
                                    <div className="flex flex-col items-center">
                                        <span className="text-xs font-mono text-[#808fa6]">{row.withGames}</span>
                                        <span className={clsx("text-xs font-bold", row.withWinPercent >= 50 ? "text-emerald-400" : "text-red-400")}>
                                            {row.withWinPercent.toFixed(0)}%
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-[#2e353b] text-xs">-</span>
                                )}
                            </div>

                            <div className="col-span-2 text-center">
                                {row.againstGames > 0 ? (
                                    <div className="flex flex-col items-center">
                                        <span className="text-xs font-mono text-[#808fa6]">{row.againstGames}</span>
                                        <span className={clsx("text-xs font-bold", row.againstWinPercent >= 50 ? "text-emerald-400" : "text-red-400")}>
                                            {row.againstWinPercent.toFixed(0)}%
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-[#2e353b] text-xs">-</span>
                                )}
                            </div>

                            <div className="col-span-1 text-center flex flex-col justify-center">
                                {row.withGames > 0 ? (
                                    <>
                                        <span className="text-xs text-[#e7d291] font-mono">{Math.round(row.avgGpm)}</span>
                                        <span className="text-xs text-[#808fa6] font-mono">{Math.round(row.avgXpm)}</span>
                                    </>
                                ) : (
                                    <span className="text-[#2e353b] text-xs">-</span>
                                )}
                            </div>

                            <div className="col-span-1 text-right text-xs text-[#808fa6] font-medium whitespace-nowrap">
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

const WinRateBar = ({ percent }: { percent: number }) => {
    const isHigh = percent >= 50;
    const barColor = isHigh ? "bg-emerald-500" : "bg-red-500";
    const textColor = isHigh ? "text-emerald-400" : "text-red-400";

    return (
        <div className="w-full flex flex-col items-center">
            <span className={clsx("text-xs font-bold mb-1 font-mono", textColor)}>
                {percent.toFixed(1)}%
            </span>
            <div className="w-full h-1.5 bg-[#0f1114] rounded-full overflow-hidden border border-[#2e353b]/50">
                <div
                    className={clsx("h-full transition-all duration-500", barColor)}
                    style={{ width: `${percent}%` }}
                />
            </div>
        </div>
    );
};
