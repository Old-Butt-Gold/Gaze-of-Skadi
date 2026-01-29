import React from 'react';
import { TeamCard } from '../components/teams/TeamCard';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorDisplay } from '../components/ui/ErrorDisplay';
import {useTeamsLogic} from "../hooks/useTeamLogic.ts";
import type {TeamSortOption} from "../store/teamStore.ts";

export const TeamsPage: React.FC = () => {
    const {
        teams, totalCount, isLoading, isError, refetch,
        totalPages, currentPage, searchQuery, sortBy, actions
    } = useTeamsLogic();

    if (isLoading) return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner text="Scouting Teams..." /></div>;
    if (isError) return <div className="min-h-screen flex items-center justify-center"><ErrorDisplay message="Failed to load teams data" onRetry={refetch} /></div>;

    return (
        <div className="w-full space-y-8 animate-fade-in pb-20">

            {/* Header & Controls */}
            <div className="bg-[#1a1d24] border-b border-[#2e353b] sticky top-16 z-20 shadow-xl backdrop-blur-md bg-opacity-95">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
                            <div className="relative group">
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

                            {/* Sort */}
                            <select
                                className="select w-full sm:w-48 bg-[#121417] border border-[#2e353b] text-white focus:border-[#4a5568] focus:outline-none uppercase text-xs tracking-wider font-bold h-10 px-4 cursor-pointer hover:bg-[#15171c] transition-colors"
                                value={sortBy}
                                onChange={(e) => actions.setSortBy(e.target.value as TeamSortOption)}
                            >
                                <option value="rating">Sort by Rating</option>
                                <option value="winrate">Sort by Winrate</option>
                                <option value="activity">Sort by Activity</option>
                                <option value="name">Sort by Name</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-4 text-[#58606e] text-xs font-bold uppercase tracking-widest flex justify-between items-center">
                    <span className="text-[#e7d291]">
                        {totalCount} Found <span className="text-[#58606e] ml-1">(Page {currentPage}/{totalPages || 1})</span>
                    </span>
                </div>

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
                            <div className="mt-10 flex justify-center pb-10">
                                <div className="join bg-[#1a1d24] border border-[#2e353b] rounded-lg p-1 shadow-lg">
                                    <button
                                        className="join-item btn btn-sm bg-transparent border-none text-[#808fa6] hover:text-white disabled:opacity-30 disabled:bg-transparent uppercase font-bold tracking-wider"
                                        disabled={currentPage === 1}
                                        onClick={() => actions.setCurrentPage(Math.max(1, currentPage - 1))}
                                    >
                                        Prev
                                    </button>
                                    <div className="join-item flex items-center px-4 text-xs font-mono text-[#e7d291] border-l border-r border-[#2e353b]">
                                        {currentPage} / {totalPages}
                                    </div>
                                    <button
                                        className="join-item btn btn-sm bg-transparent border-none text-[#808fa6] hover:text-white disabled:opacity-30 disabled:bg-transparent uppercase font-bold tracking-wider"
                                        disabled={currentPage === totalPages}
                                        onClick={() => actions.setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
