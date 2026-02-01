import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import { useHeroes } from '../hooks/queries/useHeroes';
import { NotFoundPage } from './NotFoundPage';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import {HeroOverviewTab} from "../components/heroes/tabs/HeroOverviewTab.tsx";
import {HeroDetailsHeader} from "../components/heroes/HeroDetailsHeader.tsx";
import {HeroBenchmarksTab} from "../components/heroes/tabs/HeroBenchmarksTab.tsx";
import {HeroRankingsTab} from "../components/heroes/tabs/HeroRankingsTab.tsx";
import {HeroMatchupsTab} from "../components/heroes/tabs/HeroMatchupsTab.tsx";
import {HeroItemsTab} from "../components/heroes/tabs/HeroItemsTab.tsx";
import {HeroDurationsTab} from "../components/heroes/tabs/HeroDurationsTab.tsx";
import {HeroPlayersTab} from "../components/heroes/tabs/HeroPlayersTab.tsx";
import {HeroMatchesTab} from "../components/heroes/tabs/HeroMatchesTab.tsx";

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
        { id: 'players', label: 'Players' },
        { id: 'durations', label: 'Durations' },
    ];

    return (
        <div className="min-h-screen bg-[#0f1114] text-white pb-10 animate-fade-in relative">

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

                {activeTab === 'rankings' && (
                    <HeroRankingsTab hero={hero} />
                )}

                {activeTab === 'matchups' && (
                    <HeroMatchupsTab hero={hero} />
                )}

                {activeTab === 'items' && (
                    <HeroItemsTab hero={hero} />
                )}

                {activeTab === 'durations' && (
                    <HeroDurationsTab hero={hero} />
                )}

                {activeTab === 'players' && (
                    <HeroPlayersTab hero={hero} />
                )}

                {activeTab === 'matches' && (
                    <HeroMatchesTab hero={hero} />
                )}
            </div>
        </div>
    );
};
