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

    if (isLoading) return <LoadingSpinner text="Reading Meta..." />;
    if (isError) return <ErrorDisplay message="Failed to load stats" onRetry={refetch} />;

    const tabs: { id: Tab; label: string }[] = [
        { id: 'pro', label: 'Pro Scene' },
        { id: 'ranked', label: 'Ranked' },
        { id: 'turbo', label: 'Turbo' },
    ];

    return (
        // Убрал overflow-hidden здесь, чтобы sticky работал
        <div className="w-full min-h-screen animate-fade-in pb-6">

            {/* Sticky Header */}
            <div className="sticky top-2 z-30 bg-[#1a1d24]/95 backdrop-blur-md border-b border-[#2e353b] shadow-lg transition-all">
                <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                        {/* Title */}
                        <div className="flex items-center gap-4">
                            <div>
                                <h1 className="text-2xl font-serif font-black text-[#f0f0f0] tracking-wide uppercase drop-shadow-md leading-none">
                                    Hero Statistics
                                </h1>
                                <p className="text-[#808fa6] text-[10px] uppercase font-bold tracking-widest mt-1">
                                    Live Data • Last 7 Days
                                </p>
                            </div>
                            <div className="hidden sm:block w-px h-8 bg-[#2e353b] mx-2"></div>

                            {/* Tabs (Integrated in Header for space saving) */}
                            <div className="flex p-1 bg-[#121417] border border-[#2e353b] rounded-lg">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={clsx(
                                            "px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded transition-all duration-200",
                                            activeTab === tab.id
                                                ? "bg-[#2e353b] text-white shadow-sm"
                                                : "text-[#808fa6] hover:text-[#e3e3e3] hover:bg-[#1a1d24]"
                                        )}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Search Input */}
                        <div className="relative group w-full md:w-64">
                            <input
                                type="text"
                                placeholder="Find Hero..."
                                className="input w-full bg-[#121417] border border-[#2e353b] text-white text-xs font-bold placeholder-[#454c59] focus:border-[#4a5568] focus:outline-none h-9 pl-9 pr-4 transition-colors shadow-inner rounded-full"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#454c59] pointer-events-none group-focus-within:text-[#e7d291] transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Decorative bottom line */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#e7d291]/30 to-transparent"></div>
            </div>

            {/* Content Container */}
            {/* Добавил overflow-hidden только здесь для таблицы, если нужно */}
            <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full mt-6">
                {stats && stats.length > 0 ? (
                    <>
                        <HeroStatsTable stats={stats} activeTab={activeTab} searchQuery={searchQuery} />

                        <div className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-2 text-center">
                            <p className="text-[#58606e] text-[10px] uppercase tracking-widest">
                                Winrates calculated as <span className="font-mono text-[#808fa6]">(Wins / Picks) * 100</span>
                            </p>
                            {activeTab === 'ranked' && (
                                <>
                                    <span className="hidden sm:inline text-[#2e353b]">•</span>
                                    <p className="text-[#58606e] text-[10px] uppercase tracking-widest">
                                        "All Pubs" excludes Ranked Matches
                                    </p>
                                </>
                            )}
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
