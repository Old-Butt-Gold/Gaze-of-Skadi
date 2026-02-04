import React, { useState } from 'react';
import clsx from 'clsx';
import { useHeroesMeta } from '../hooks/queries/useHeroesMeta';
import { useHeroes } from '../hooks/queries/useHeroes';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorDisplay } from '../components/ui/ErrorDisplay';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../config/navigation';
import { Icon } from '../components/Icon';
import type {HeroStatsDto} from "../types/heroesMeta.ts";
import {getHeroGradient} from "../utils/heroUtils.ts";

const POSITIONS = [
    { key: 'heroesPos1', label: 'Safe Lane', icon: '/assets/images/pos-1.svg', color: '#e7d291' },
    { key: 'heroesPos2', label: 'Mid Lane', icon: '/assets/images/pos-2.svg', color: '#60a5fa' },
    { key: 'heroesPos3', label: 'Off Lane', icon: '/assets/images/pos-3.svg', color: '#f87171' },
    { key: 'heroesPos4', label: 'Soft Support', icon: '/assets/images/pos-4.svg', color: '#c084fc' },
    { key: 'heroesPos5', label: 'Hard Support', icon: '/assets/images/pos-5.svg', color: '#fbbf24' },
] as const;

const HeroMetaCard = ({ stat, rank }: { stat: HeroStatsDto, rank: number }) => {
    const { getHero } = useHeroes();
    const hero = getHero(stat.heroId);

    if (!hero) return null;

    return (
        <Link
            to={`${APP_ROUTES.HEROES}/${hero.id}`}
            className="group relative flex items-center p-3 rounded-lg border border-[#2e353b] hover:border-[#e7d291]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden bg-[#15171c]"
            style={{ backgroundImage: getHeroGradient(hero.id) }}
        >
            {/* Rank Number */}
            <span className={clsx(
                "absolute -left-1 -top-1 text-[40px] font-black leading-none opacity-10 select-none group-hover:opacity-20 transition-opacity",
                rank <= 3 ? "text-[#e7d291]" : "text-white"
            )}>
                {rank}
            </span>

            {/* Hero Image */}
            <div className="relative w-16 h-9 shrink-0 mr-3 shadow-md rounded overflow-hidden border border-[#2e353b] group-hover:border-[#e7d291]">
                <img src={hero.img} alt={hero.localized_name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
            </div>

            {/* Info */}
            <div className="flex-grow min-w-0 flex flex-col justify-center">
                <span className="font-bold text-sm text-white truncate group-hover:text-[#e7d291] transition-colors leading-tight">
                    {hero.localized_name}
                </span>
                <span className="text-[10px] text-[#808fa6]">
                    {stat.matchCount.toLocaleString()} matches
                </span>
            </div>

            {/* Winrate */}
            <div className="flex flex-col items-end pl-2">
                <span className={clsx(
                    "font-mono font-bold text-sm",
                    stat.winRate >= 55 ? "text-emerald-400" :
                        stat.winRate >= 50 ? "text-[#e3e3e3]" : "text-red-400"
                )}>
                    {stat.winRate.toFixed(1)}%
                </span>
                <span className="text-[9px] text-[#58606e] uppercase tracking-wider">Winrate</span>
            </div>
        </Link>
    );
};

// --- SUB-COMPONENT: POSITION COLUMN ---
const PositionColumn = ({title, icon, data, accentColor}: {
    title: string,
    icon: string,
    data: HeroStatsDto[],
    accentColor: string
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const topHeroes = data.slice(0, 3);
    // Остальные скрыты по умолчанию
    const remainingHeroes = data.slice(3);

    return (
        <div className="flex flex-col bg-[#0f1114]/50 rounded-xl border border-[#2e353b] overflow-hidden h-full">
            {/* Header */}
            <div className="p-4 border-b border-[#2e353b] bg-[#15171c] flex items-center justify-center gap-3 relative overflow-hidden">
                <div
                    className="absolute inset-x-0 bottom-0 h-0.5 opacity-50"
                    style={{ backgroundColor: accentColor, boxShadow: `0 0 10px ${accentColor}` }}
                />
                <Icon src={icon} size={6} />
                <h3 className="font-serif font-bold text-white uppercase tracking-widest text-sm text-center">
                    {title}
                </h3>
            </div>

            {/* List */}
            <div className="p-3 space-y-2 flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-[#2e353b]">
                {/* Top 3 (Always Visible) */}
                {topHeroes.map((stat, idx) => (
                    <HeroMetaCard key={stat.heroId} stat={stat} rank={idx + 1} />
                ))}

                {/* Collapsible Section */}
                <div className={clsx(
                    "space-y-2 overflow-hidden transition-all duration-500 ease-in-out",
                    isExpanded ? "opacity-100" : "max-h-0 opacity-0"
                )}>
                    {remainingHeroes.map((stat, idx) => (
                        <HeroMetaCard key={stat.heroId} stat={stat} rank={idx + 4} />
                    ))}
                </div>
            </div>

            {/* Footer / Toggle Button */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full py-3 bg-[#15171c] hover:bg-[#1e222b] border-t border-[#2e353b] text-xs font-bold text-[#808fa6] hover:text-white uppercase tracking-widest transition-colors flex items-center justify-center gap-2 group"
            >
                {isExpanded ? 'Show Less' : `Show All ${data.length} Heroes`}
                <svg
                    className={clsx("w-3 h-3 transition-transform duration-300", isExpanded ? "rotate-180" : "group-hover:translate-y-0.5")}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
        </div>
    );
};

export const HeroesMetaPage: React.FC = () => {
    const { data: meta, isLoading, isError, refetch } = useHeroesMeta();

    if (isLoading) return <LoadingSpinner text="Analyzing the Meta..." />;
    if (isError || !meta) return <ErrorDisplay message="Failed to load meta data" onRetry={refetch} />;

    return (
        <div className="min-h-screen bg-[#0b0e13] text-[#e3e3e3] pb-12">

            {/* Header */}
            <div className="relative h-48 w-full bg-gradient-to-b from-[#1a1d24] to-[#0b0e13] border-b border-[#2e353b] mb-8">
                <div className="absolute inset-0 bg-[url('https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/blog/730_bg.jpg')] bg-cover bg-top opacity-10 mix-blend-overlay" />
                <div className="mx-auto px-4 h-full flex flex-col justify-center items-center text-center relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="h-px w-10 bg-[#e7d291]" />
                        <span className="text-[#e7d291] font-bold uppercase tracking-[0.2em] text-xs">Analytics</span>
                        <span className="h-px w-10 bg-[#e7d291]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white uppercase tracking-wider drop-shadow-lg">
                        Current <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e7d291] to-[#b88a44]">Meta</span>
                    </h1>
                    <p className="text-[#808fa6] text-sm mt-3">
                        Top performing heroes by position in matches daily.
                    </p>
                </div>
            </div>

            {/* Meta Grid */}
            <div className="mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-start">
                    {POSITIONS.map((pos) => (
                        <PositionColumn
                            key={pos.key}
                            title={pos.label}
                            icon={pos.icon}
                            accentColor={pos.color}
                            data={meta[pos.key] || []}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
