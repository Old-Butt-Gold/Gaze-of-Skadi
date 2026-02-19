import React, { useEffect } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { useHeroes } from '../hooks/queries/useHeroes';
import { NotFoundPage } from './NotFoundPage';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { HeroDetailsHeader } from "../components/heroes/HeroDetailsHeader.tsx";
import type { HeroInfo } from '../types/heroes';

type HeroTab = 'overview' | 'rankings' | 'matches' | 'matchups' | 'items' | 'players' | 'benchmarks' | 'durations' | 'trends';

export interface HeroOutletContext {
    hero: HeroInfo;
}

export const HeroDetailsPage: React.FC = () => {
    const { heroId } = useParams<{ heroId: string }>();
    const { getHero, isLoading } = useHeroes();
    const location = useLocation();

    const activeTab = location.pathname.split('/').pop() as HeroTab;

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
        { id: 'trends', label: 'Meta' },
    ];

    const contextValue: HeroOutletContext = { hero };

    return (
        <div className="min-h-screen bg-[#0f1114] text-white pb-10 animate-fade-in relative">

            <HeroDetailsHeader hero={hero}/>

            <div className="sticky top-16 z-30 bg-[#0f1114]/95 backdrop-blur-md border-b border-[#2e353b] shadow-2xl">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex overflow-x-auto no-scrollbar scroll-smooth items-center">
                        <div className="flex gap-1 md:gap-2 min-w-max w-fit mx-auto px-4 py-2">
                            {tabs.map(tab => (
                                <Link
                                    key={tab.id}
                                    to={tab.id}
                                    className={clsx(
                                        "py-4 px-4 md:px-6 text-xs md:text-sm font-bold uppercase tracking-widest border-b-2 transition-all duration-300 whitespace-nowrap block",
                                        activeTab === tab.id
                                            ? "border-[#e7d291] text-[#e7d291] bg-gradient-to-t from-[#e7d291]/10 to-transparent"
                                            : "border-transparent text-[#808fa6] hover:text-white hover:bg-[#1a1d24]"
                                    )}
                                >
                                    {tab.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <Outlet context={contextValue} />
            </div>
        </div>
    );
};
