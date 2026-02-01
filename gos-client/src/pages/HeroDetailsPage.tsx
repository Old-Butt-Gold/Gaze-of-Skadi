import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import { useHeroes } from '../hooks/queries/useHeroes';
import { NotFoundPage } from './NotFoundPage';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import {HeroOverviewTab} from "../components/heroes/tabs/HeroOverviewTab.tsx";
import {HeroDetailsHeader} from "../components/heroes/HeroDetailsHeader.tsx";
import {HeroBenchmarksTab} from "../components/heroes/tabs/HeroBenchmarksTab.tsx";

type HeroTab = 'overview' | 'rankings' | 'matches' | 'matchups' | 'items' | 'players' | 'benchmarks' | 'durations';

// --- Main Page ---

export const HeroDetailsPage: React.FC = () => {
    const { heroId } = useParams<{ heroId: string }>();
    const { getHero, isLoading } = useHeroes();
    const [activeTab, setActiveTab] = useState<HeroTab>('overview');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [heroId]);

    if (isLoading) return <LoadingSpinner text="Summoning..." />;

    const parsedId = Number(heroId);
    const hero = getHero(parsedId);

    if (!hero || isNaN(parsedId)) {
        return <NotFoundPage />;
    }

    // Tabs Config
    const tabs: { id: HeroTab; label: string }[] = [
        { id: 'overview', label: 'Overview' },
        { id: 'benchmarks', label: 'Benchmarks' },
        { id: 'rankings', label: 'Rankings' },
        { id: 'matches', label: 'Matches' },
        { id: 'matchups', label: 'Matchups' },
        { id: 'items', label: 'Items' },
        { id: 'players', label: 'Pro Players' },
        { id: 'durations', label: 'Durations' },
    ];

    return (
        <div className="min-h-screen bg-[#0f1114] text-white pb-20 animate-fade-in relative">

            {/* === 1. COMPACT HERO HEADER (VIDEO BG) === */}
            <HeroDetailsHeader hero={hero}/>

            {/* === 2. STICKY TABS === */}
            <div className="sticky top-16 z-30 bg-[#0f1114]/95 backdrop-blur-md border-b border-[#2e353b] shadow-2xl">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex overflow-x-auto no-scrollbar gap-1 md:gap-2">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={clsx(
                                    "py-4 px-4 md:px-6 text-xs md:text-sm font-bold uppercase tracking-widest border-b-2 transition-all duration-300 whitespace-nowrap",
                                    activeTab === tab.id
                                        ? "border-[#e7d291] text-[#e7d291] bg-gradient-to-t from-[#e7d291]/10 to-transparent"
                                        : "border-transparent text-[#808fa6] hover:text-white hover:bg-[#1a1d24]"
                                )}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* === 3. CONTENT GRID === */}
            <div className="mx-auto px-4 sm:px-6 lg:px-8 mt-6">

                {activeTab === 'overview' && (
                    <HeroOverviewTab hero={hero} />
                )}

                {activeTab === 'benchmarks' && (
                    <HeroBenchmarksTab hero={hero} />
                )}

                {/* Other Tabs Placeholder */}
                {activeTab !== 'overview' && activeTab !== 'benchmarks' && (
                    <div className="flex flex-col items-center justify-center py-32 text-[#454c59] animate-in fade-in zoom-in-95 duration-300">
                        <span className="text-6xl opacity-20 mb-4">?</span>
                        <p className="font-serif text-lg tracking-wider text-[#808fa6] uppercase">Data Not Found</p>
                        <p className="text-xs text-[#58606e] mt-2">The observers have not yet reported back.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
