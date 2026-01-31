import React, { useState } from 'react';
import clsx from 'clsx';
import { useHeroStats } from '../hooks/queries/useHeroStats';
import { HeroStatsTable } from '../components/heroes/HeroStatsTable';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorDisplay } from '../components/ui/ErrorDisplay';

type Tab = 'turbo' | 'pro' | 'ranked';

export const HeroStatsPage: React.FC = () => {
    const { data: stats, isLoading, isError, refetch } = useHeroStats();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<Tab>('pro');

    if (isLoading) return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner text="Reading Meta..." /></div>;
    if (isError) return <div className="min-h-screen flex items-center justify-center"><ErrorDisplay message="Failed to load stats" onRetry={refetch} /></div>;

    const tabs: { id: Tab; label: string }[] = [
        { id: 'pro', label: 'Pro Scene' },
        { id: 'ranked', label: 'Ranked Meta' },
        { id: 'turbo', label: 'Turbo Mode' },
    ];

    return (
        <div className="w-full space-y-6 animate-fade-in pb-20 overflow-hidden">

            {/* Header */}
            <div className="bg-[#1a1d24] border-b border-[#2e353b] top-16 z-30 shadow-xl backdrop-blur-md bg-opacity-95">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-serif font-black text-[#f0f0f0] tracking-wide uppercase drop-shadow-md">
                                Hero Statistics
                            </h1>
                            <p className="text-[#808fa6] text-xs md:text-sm font-medium mt-1 flex items-center gap-2">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"/>
                                Analysis based on matches from the last 7 days
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                            {/* Tabs */}
                            <div className="flex p-1 bg-[#121417] border border-[#2e353b] rounded-lg">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={clsx(
                                            "px-4 py-2 text-xs font-bold uppercase tracking-wider rounded transition-all duration-200 flex-1 sm:flex-none",
                                            activeTab === tab.id
                                                ? "bg-[#2e353b] text-white shadow-md"
                                                : "text-[#808fa6] hover:text-[#e3e3e3] hover:bg-[#1a1d24]"
                                        )}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Search */}
                            <div className="relative group w-full sm:w-64">
                                <input
                                    type="text"
                                    placeholder="SEARCH HERO..."
                                    className="input w-full bg-[#121417] border border-[#2e353b] text-white placeholder-[#454c59] focus:border-[#4a5568] focus:outline-none uppercase text-xs tracking-wider font-bold h-10 pl-4 pr-10 transition-colors shadow-inner rounded-lg"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#454c59] pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Container */}
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
                {stats && stats.length > 0 ? (
                    <>
                        <HeroStatsTable stats={stats} activeTab={activeTab} searchQuery={searchQuery} />

                        <div className="mt-4 text-center">
                            <p className="text-[#58606e] text-[10px] uppercase tracking-widest">
                                * Winrates are calculated as <span className="font-mono text-[#808fa6]">(Wins / Picks) * 100</span>.
                                {activeTab === 'ranked' && ' "Pub" includes all public matchmaking games.'}
                            </p>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 text-[#454c59]">
                        <span className="text-4xl opacity-50 mb-4">?</span>
                        <p className="font-serif text-lg tracking-wider">NO STATS FOUND</p>
                    </div>
                )}
            </div>
        </div>
    );
};
