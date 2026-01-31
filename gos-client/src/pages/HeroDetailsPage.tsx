import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import { useHeroes } from '../hooks/queries/useHeroes';
import { NotFoundPage } from './NotFoundPage';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import {
    calculateHealth,
    calculateHealthRegen,
    calculateMana,
    calculateManaRegen,
    getAttributeIconInfo,
    getHeroRoleName,
    isMelee,
} from '../utils/heroUtils';
import {HeroOverviewTab} from "../components/heroes/tabs/HeroOverviewTab.tsx";

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

    // Calculations
    const hp = calculateHealth(hero);
    const mp = calculateMana(hero);
    const hpRegen = calculateHealthRegen(hero);
    const mpRegen = calculateManaRegen(hero);
    const primaryAttrIcon = getAttributeIconInfo(hero.primary_attr);

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
            <section className="relative w-full h-[55vh] min-h-[500px] max-h-[700px] overflow-hidden group border-b border-[#2e353b]">
                {/* Video Background */}
                <div className="absolute inset-0 z-0 select-none pointer-events-none">
                    <video
                        autoPlay muted loop playsInline
                        poster={hero.img}
                        className="w-full h-full object-cover object-top scale-105 filter brightness-[0.5] group-hover:brightness-[0.6] transition-all duration-1000"
                        src={hero.video}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1114] via-[#0f1114]/40 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0f1114]/90 via-[#0f1114]/30 to-transparent"></div>
                    <div className="absolute inset-0 bg-[url('/assets/images/dots.png')] opacity-20 mix-blend-overlay"></div>
                </div>

                {/* Content Container */}
                <div className="relative z-10 h-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-end pb-8 gap-8">

                    {/* Left: Hero Identity & Portrait */}
                    <div className="flex flex-col md:flex-row items-end gap-6 w-full">

                        {/* Hero Portrait Card (Image + HP/MP) */}
                        <div className="relative shrink-0 w-32 md:w-48 lg:w-56 rounded-lg shadow-2xl overflow-hidden border border-[#2e353b] bg-[#15171c] group/card transform transition-transform hover:scale-105 duration-300">
                            <div className="aspect-[16/9] w-full relative">
                                <img src={hero.img} alt={hero.localized_name} className="w-full h-full object-cover" />
                                {/* Attribute Badge on Portrait */}
                                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm p-1.5 rounded border border-white/10 shadow-lg">
                                    <img src={primaryAttrIcon.src} alt="Attr" className="w-5 h-5 drop-shadow" />
                                </div>
                            </div>

                            {/* HP/MP Bars in Portrait */}
                            <div className="flex flex-col">
                                <div className="relative h-6 bg-[#0f1114] border-t border-green-900 flex items-center justify-center overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-green-600 opacity-90" />
                                    <span className="relative z-10 font-mono font-bold text-xs text-white shadow-black drop-shadow-md flex gap-1">
                                        {hp} <span className="text-green-200 text-[10px] opacity-80">+{hpRegen}</span>
                                    </span>
                                </div>
                                <div className="relative h-6 bg-[#0f1114] border-t border-blue-900 flex items-center justify-center overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-600 opacity-90" />
                                    <span className="relative z-10 font-mono font-bold text-xs text-white shadow-black drop-shadow-md flex gap-1">
                                        {mp} <span className="text-blue-200 text-[10px] opacity-80">+{mpRegen}</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Text Info */}
                        <div className="flex flex-col mb-1 w-full">
                            {/* Attack Type & Roles */}
                            <div className="flex flex-wrap items-center gap-3 mb-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <span className="text-[#808fa6] text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-[#e7d291] rounded-full"></span>
                                    {isMelee(hero.attack_type) ? 'Melee' : 'Ranged'}
                                </span>
                                <div className="h-4 w-px bg-[#2e353b]"></div>
                                <div className="flex gap-2">
                                    {hero.roles.slice(0, 3).map(role => (
                                        <span key={role} className="text-[#e7d291] text-xs uppercase tracking-wide font-semibold opacity-80">
                                            {getHeroRoleName(role)}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-serif font-black text-white uppercase tracking-tight leading-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-95 duration-500 delay-100">
                                {hero.localized_name}
                            </h1>

                            <p className="text-[#808fa6] text-sm md:text-base font-serif italic mt-2 max-w-2xl line-clamp-2 md:line-clamp-1 opacity-80">
                                {hero.lore.split('.')[0]}...
                            </p>
                        </div>
                    </div>
                </div>
            </section>

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

                {/* Other Tabs Placeholder */}
                {activeTab !== 'overview' && (
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
