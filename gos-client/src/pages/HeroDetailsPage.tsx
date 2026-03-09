import React, { useEffect, useMemo } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { useHeroes } from '../hooks/queries/useHeroes';
import { NotFoundPage } from './NotFoundPage';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { HeroDetailsHeader } from "../components/heroes/HeroDetailsHeader.tsx";
import type { HeroInfo } from '../types/heroes';
import { APP_ROUTES } from "../config/navigation.ts";

type HeroTab = 'overview' | 'rankings' | 'matches' | 'matchups' | 'items' | 'players' | 'benchmarks' | 'durations' | 'trends';

export interface HeroOutletContext {
    hero: HeroInfo;
}

interface HeroSwitcherProps {
    prevHero: HeroInfo | null;
    nextHero: HeroInfo | null;
    tabSuffix: string;
}

const HeroSwitcher: React.FC<HeroSwitcherProps> = ({ prevHero, nextHero, tabSuffix }) => {
    if (!prevHero || !nextHero) return null;

    return (
        <div className="w-full bg-[#0b0e13] border-b border-[#2e353b] py-1 z-40 relative">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

                <Link
                    to={`${APP_ROUTES.HEROES}/${prevHero.id}${tabSuffix}`}
                    className="group flex items-center gap-3 text-[#808fa6] hover:text-[#e7d291] transition-colors w-1/3"
                >
                    <svg className="w-5 h-5 shrink-0 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <img src={prevHero.icon} alt={prevHero.localized_name} className="w-8 h-8 rounded border border-[#2e353b] transition-colors object-cover shrink-0" />
                    <div className="hidden sm:flex flex-col min-w-0">
                        <span className="text-xs uppercase tracking-widest opacity-70">Previous</span>
                        <span className="font-serif font-bold uppercase tracking-wider text-xs truncate">{prevHero.localized_name}</span>
                    </div>
                </Link>

                <Link
                    to={`${APP_ROUTES.HEROES}/${nextHero.id}${tabSuffix}`}
                    className="group flex items-center justify-end gap-3 text-[#808fa6] hover:text-[#e7d291] transition-colors w-1/3 text-right"
                >
                    <div className="hidden sm:flex flex-col min-w-0">
                        <span className="text-xs uppercase tracking-widest opacity-70">Next</span>
                        <span className="font-serif font-bold uppercase tracking-wider text-xs truncate">{nextHero.localized_name}</span>
                    </div>
                    <img src={nextHero.icon} alt={nextHero.localized_name} className="w-8 h-8 rounded border border-[#2e353b] transition-colors object-cover shrink-0" />
                    <svg className="w-5 h-5 shrink-0 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export const HeroDetailsPage: React.FC = () => {
    const { heroId } = useParams<{ heroId: string }>();
    const { getHero, isLoading, data: heroesData } = useHeroes();
    const location = useLocation();

    const currentSegment = location.pathname.split('/').pop();
    const parsedId = Number(heroId);

    const tabSuffix = currentSegment && isNaN(Number(currentSegment)) ? `/${currentSegment}` : '';
    const activeTab = (currentSegment && isNaN(Number(currentSegment)) ? currentSegment : 'overview') as HeroTab;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [parsedId]);

    const { prevHero, nextHero } = useMemo(() => {
        if (!heroesData) return { prevHero: null, nextHero: null };

        const heroesArray = Object.values(heroesData).sort((a, b) =>
            a.localized_name.localeCompare(b.localized_name)
        );

        const currentIndex = heroesArray.findIndex(h => h.id === parsedId);

        if (currentIndex === -1) return { prevHero: null, nextHero: null };

        const prevIndex = (currentIndex - 1 + heroesArray.length) % heroesArray.length;
        const nextIndex = (currentIndex + 1) % heroesArray.length;

        return {
            prevHero: heroesArray[prevIndex],
            nextHero: heroesArray[nextIndex]
        };
    }, [heroesData, parsedId]);

    if (isLoading) return <LoadingSpinner text="Summoning..." />;

    const hero = getHero(parsedId);

    if (!hero || isNaN(parsedId)) {
        return <NotFoundPage />;
    }

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
        <div className="min-h-screen bg-[#0f1114] text-white pb-10 animate-fade-in relative" key={hero.id}>

            <HeroSwitcher prevHero={prevHero} nextHero={nextHero} tabSuffix={tabSuffix} />

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
                                            ? "border-[#e7d291] text-[#e7d291] bg-linear-to-t from-[#e7d291]/10 to-transparent"
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
