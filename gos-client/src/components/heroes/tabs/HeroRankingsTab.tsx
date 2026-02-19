import React, { useState, useMemo } from 'react';
import clsx from 'clsx';
import {Link, useOutletContext} from 'react-router-dom';
import { useHeroRankings } from '../../../hooks/queries/useHeroRankings';
import { ErrorDisplay } from '../../ui/ErrorDisplay';
import { RankIcon } from "../../distributions/RankIcon";
import { LoadingSpinner } from "../../ui/LoadingSpinner";
import { Icon } from "../../Icon";
import { APP_ROUTES } from "../../../config/navigation";
import { Pagination } from '../../ui/Pagination';
import type {HeroOutletContext} from "../../../pages/HeroDetailsPage.tsx";

const PAGE_SIZE = 20;

const RankBadge = ({ rank }: { rank: number }) => {
    if (rank === 1) return <span className="text-2xl drop-shadow-md">🥇</span>;
    if (rank === 2) return <span className="text-2xl drop-shadow-md">🥈</span>;
    if (rank === 3) return <span className="text-2xl drop-shadow-md">🥉</span>;

    return <span className="text-[#808fa6] font-mono font-bold text-lg">#{rank}</span>;
};

export const HeroRankingsTab: React.FC = () => {
    const { hero } = useOutletContext<HeroOutletContext>();
    const { data, isLoading, isError, refetch } = useHeroRankings(hero.id);
    const [page, setPage] = useState(1);

    // Calculate paginated data
    const { paginatedRankings, totalPages } = useMemo(() => {
        if (!data || !data.rankings) return { paginatedRankings: [], totalPages: 0 };

        const total = Math.ceil(data.rankings.length / PAGE_SIZE);
        const start = (page - 1) * PAGE_SIZE;
        const sliced = data.rankings.slice(start, start + PAGE_SIZE);

        return { paginatedRankings: sliced, totalPages: total };
    }, [data, page]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        // Optional: Scroll to top of table on page change
        document.getElementById('rankings-table-top')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    if (isLoading) return <LoadingSpinner text="Loading Leaderboard..." />;

    // Check for empty array specifically
    if (isError || !data || !data.rankings || data.rankings.length === 0) {
        return (
            <div className="py-12">
                <ErrorDisplay
                    message={isError ? "Failed to load rankings" : "No ranking data available for this hero."}
                    onRetry={isError ? refetch : undefined}
                />
            </div>
        );
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500" id="rankings-table-top">

            {/* Header */}
            <div className="mb-8 border-l-4 border-[#e7d291] pl-4 bg-gradient-to-r from-[#e7d291]/5 to-transparent py-3 rounded-r-lg">
                <h3 className="text-xl font-serif font-bold text-white uppercase tracking-widest">
                    Hero Mastery Leaderboard
                </h3>
                <p className="text-[#808fa6] text-sm mt-1">
                    Top players ranked by their performance score with <span className="text-[#e7d291] font-bold">{hero.localized_name}</span>.
                </p>
            </div>

            {/* Table Container */}
            <div className="w-full overflow-hidden rounded-xl border border-[#2e353b] bg-[#15171c] shadow-2xl">
                <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-[#2e353b] scrollbar-track-[#15171c]">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                        <tr className="bg-[#0f1114] text-[10px] uppercase text-[#58606e] font-bold tracking-wider border-b border-[#2e353b]">
                            <th className="px-6 py-4 text-center w-20">Rank</th>
                            <th className="px-6 py-4">Player</th>
                            <th className="px-6 py-4 text-center">Rank Tier</th>
                            <th className="px-6 py-4 text-right">Hero Score</th>
                        </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-[#2e353b]/50">
                        {paginatedRankings.map((player, index) => {
                            // Calculate global rank based on page
                            const rank = (page - 1) * PAGE_SIZE + index + 1;
                            const isTop3 = rank <= 3;

                            return (
                                <tr
                                    key={player.accountId}
                                    className={clsx(
                                        "group transition-colors hover:bg-[#1e222b]",
                                        isTop3 ? "bg-gradient-to-r from-[#e7d291]/5 to-transparent" : "bg-transparent"
                                    )}
                                >
                                    {/* Rank Column */}
                                    <td className="px-6 py-3 text-center align-middle">
                                        <RankBadge rank={rank} />
                                    </td>

                                    {/* Player Column (With Link) */}
                                    <td className="px-6 py-3 align-middle">
                                        <Link
                                            to={`${APP_ROUTES.PLAYERS}/${player.accountId}`}
                                            className="flex items-center gap-4 group/link"
                                        >
                                            {/* Avatar */}
                                            <div className={clsx(
                                                "w-10 h-10 rounded shadow-lg overflow-hidden border transition-all duration-300 relative shrink-0 group-hover/link:scale-105 group-hover/link:shadow-xl",
                                                rank === 1 ? "border-[#e7d291] shadow-[#e7d291]/20" :
                                                    rank === 2 ? "border-slate-300 shadow-slate-300/20" :
                                                        rank === 3 ? "border-orange-700 shadow-orange-700/20" :
                                                            "border-[#2e353b] group-hover/link:border-[#58606e]"
                                            )}>
                                                <Icon src={player.avatar ?? '/assets/images/unknown_player.png'} size={10}/>
                                                {rank === 1 && <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover/link:opacity-100 transition-opacity" />}
                                            </div>

                                            {/* Name */}
                                            <div className="flex flex-col">
                                                    <span className={clsx(
                                                        "font-bold text-base tracking-wide transition-colors group-hover/link:underline decoration-[#58606e] underline-offset-4",
                                                        rank === 1 ? "text-[#e7d291]" : "text-white group-hover/link:text-[#e7d291]"
                                                    )}>
                                                        {player.personaName || "Unknown Player"}
                                                    </span>
                                                <span className="text-[10px] text-[#58606e] font-mono group-hover/link:text-[#808fa6] transition-colors">
                                                        ID: {player.accountId}
                                                    </span>
                                            </div>
                                        </Link>
                                    </td>

                                    {/* Rank Tier Column */}
                                    <td className="px-6 py-3 text-center align-middle">
                                        <div className="flex justify-center scale-110">
                                            <RankIcon
                                                rank={player.rankTier}
                                                size={10}
                                            />
                                        </div>
                                    </td>

                                    {/* Score Column */}
                                    <td className="px-6 py-3 text-right align-middle">
                                        <div className="flex flex-col items-end">
                                                <span className={clsx(
                                                    "font-mono font-bold text-lg",
                                                    isTop3 ? "text-white drop-shadow-sm" : "text-[#e3e3e3]"
                                                )}>
                                                    {player.score.toFixed(0)}
                                                </span>
                                            <span className="text-[10px] text-[#58606e] uppercase font-bold tracking-wider">
                                                    Score
                                                </span>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                {totalPages > 1 && (
                    <div className="border-t border-[#2e353b] bg-[#0f1114]/30">
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
