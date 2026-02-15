import React from 'react';
import { TeamCard } from '../components/teams/TeamCard';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorDisplay } from '../components/ui/ErrorDisplay';
import clsx from 'clsx';
import { useTeamsLogic } from "../hooks/useTeamLogic.ts";
import type { TeamSortOption } from "../store/teamStore.ts";
import { Pagination } from '../components/ui/Pagination';

export const TeamsPage: React.FC = () => {
    const {
        teams, isLoading, isError, refetch,
        totalPages, currentPage, searchQuery, sortBy, sortDirection, actions
    } = useTeamsLogic();

    const handlePageChange = (page: number) => {
        actions.setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isLoading) return <LoadingSpinner text="Scouting Teams..." />;
    if (isError) return <ErrorDisplay message="Failed to load teams data" onRetry={refetch} />;

    return (
        <div className="w-full space-y-8 animate-fade-in pb-6">

            {/* Header & Controls */}
            <div className="bg-[#1a1d24] border-b border-[#2e353b] sticky top-4 z-20 shadow-xl backdrop-blur-md bg-opacity-95">
                <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">

                        {/* Title */}
                        <div>
                            <h1 className="text-3xl font-serif font-black text-[#f0f0f0] tracking-wide uppercase drop-shadow-md">
                                Pro Teams
                            </h1>
                            <p className="text-[#808fa6] text-sm mt-1 max-w-lg">
                                Track performance, ratings, and rosters of professional Dota 2 organizations.
                            </p>
                        </div>

                        {/* Controls */}
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            {/* Search */}
                            <div className="relative group w-full sm:w-auto">
                                <input
                                    type="text"
                                    placeholder="SEARCH TEAM..."
                                    className="input w-full sm:w-64 bg-[#121417] border border-[#2e353b] text-white placeholder-[#454c59] focus:border-[#4a5568] focus:outline-none uppercase text-xs tracking-wider font-bold h-10 pl-4 transition-colors"
                                    value={searchQuery}
                                    onChange={(e) => actions.setSearchQuery(e.target.value)}
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#454c59] pointer-events-none group-focus-within:text-[#e7d291] transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Sort Group (Select + Direction Button) */}
                            <div className="flex gap-1 w-full sm:w-auto">
                                <select
                                    className="select flex-grow sm:w-40 bg-[#121417] border border-[#2e353b] text-white focus:border-[#4a5568] focus:outline-none uppercase text-xs tracking-wider font-bold h-10 px-4 cursor-pointer hover:bg-[#15171c] transition-colors appearance-none"
                                    value={sortBy}
                                    onChange={(e) => actions.setSortBy(e.target.value as TeamSortOption)}
                                >
                                    <option value="rating">Rating</option>
                                    <option value="winrate">Winrate</option>
                                    <option value="activity">Activity</option>
                                </select>

                                {/* Direction Toggle Button */}
                                <button
                                    onClick={actions.toggleSortDirection}
                                    className="btn btn-square h-10 w-10 bg-[#121417] border border-[#2e353b] hover:bg-[#15171c] hover:border-[#4a5568] group tooltip tooltip-bottom"
                                    data-tip={sortDirection === 'asc' ? "Ascending" : "Descending"}
                                >
                                    <div className={clsx(
                                        "transition-transform duration-300 text-[#e7d291]",
                                        sortDirection === 'asc' ? "rotate-180" : "rotate-0"
                                    )}>
                                        {/* Sort Icon (Bars) */}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                                        </svg>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                {teams.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-[#454c59]">
                        <div className="w-20 h-20 border-2 border-[#2e353b] rounded-full flex items-center justify-center mb-6">
                            <span className="text-4xl opacity-50">?</span>
                        </div>
                        <p className="font-serif text-xl tracking-wider mb-2">NO TEAMS FOUND</p>
                        <p className="text-xs uppercase tracking-widest opacity-60">Try adjusting your search criteria</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {teams.map((team) => (
                                <TeamCard key={team.teamId} team={team} />
                            ))}
                        </div>

                        {/* Pagination Footer */}
                        {totalPages > 1 && (
                            <div className="mt-8 flex flex-col items-center gap-3">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
