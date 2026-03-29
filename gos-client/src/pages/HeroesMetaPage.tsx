import React, {useState, useMemo } from 'react';
import clsx from 'clsx';
import { useHeroesMeta } from '../hooks/queries/useHeroesMeta';
import { useHeroes } from '../hooks/queries/useHeroes';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorDisplay } from '../components/ui/ErrorDisplay';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../config/navigation';
import { Icon } from '../components/Icon';
import { getHeroGradientStyle } from '../utils/heroUtils';
import type { HeroStatsDto, HeroesMetaDto } from '../types/heroesMeta';

const POSITIONS: { key: keyof HeroesMetaDto; label: string; icon?: string; color: string }[] = [
    { key: 'heroesOverall', label: 'Overall', color: '#e3e3e3' }, // Без иконки
    { key: 'heroesPos1', label: 'Safe Lane', icon: '/assets/images/pos-1.svg', color: '#e7d291' },
    { key: 'heroesPos2', label: 'Mid Lane', icon: '/assets/images/pos-2.svg', color: '#60a5fa' },
    { key: 'heroesPos3', label: 'Off Lane', icon: '/assets/images/pos-3.svg', color: '#f87171' },
    { key: 'heroesPos4', label: 'Soft Support', icon: '/assets/images/pos-4.svg', color: '#c084fc' },
    { key: 'heroesPos5', label: 'Hard Support', icon: '/assets/images/pos-5.svg', color: '#fbbf24' },
];

const PERIOD_FILTERS = [
    { label: '1 Day', value: 1 },
    { label: '7 Days', value: 7 },
    { label: '14 Days', value: 14 },
    { label: '30 Days', value: 30 },
];

// --- HERO CARD ---
const HeroMetaCard = ({ stat, rank }: { stat: HeroStatsDto, rank: number }) => {
    const { getHero } = useHeroes();
    const hero = getHero(stat.heroId);

    if (!hero) return null;

    return (
        <Link
            to={`${APP_ROUTES.HEROES}/${hero.id}`}
            className="group relative flex items-center p-2 rounded border border-[#2e353b] hover:border-[#e7d291] transition-all duration-200 hover:-translate-x-1 hover:shadow-lg overflow-hidden bg-[#15171c]"
            style={getHeroGradientStyle(hero.id)}
            title={hero.localized_name}
        >
            <div className={clsx(
                "absolute top-0 left-0 w-7 h-7 flex items-center justify-center text-xs font-bold z-20 shadow-md rounded-br-lg transition-colors",
                "bg-[#1f242b] text-[#808fa6] border-r border-b border-[#2e353b]"
            )}>
                {rank}
            </div>

            {/* Hero Image */}
            <div className="relative w-14 h-8 shrink-0 mr-3 shadow-md rounded-sm overflow-hidden border border-black/50 ml-6">
                <img
                    src={hero.img}
                    alt={hero.localized_name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
            </div>

            {/* Info */}
            <div className="flex-grow min-w-0 flex flex-col justify-center">
                <span className="font-bold text-xs md:text-sm text-[#e3e3e3] truncate group-hover:text-white transition-colors leading-tight">
                    {hero.localized_name}
                </span>
                <span className="text-xs text-[#58606e]">
                    {stat.matchCount.toLocaleString()} matches
                </span>
            </div>

            {/* Winrate */}
            <div className="flex flex-col items-end pl-2 shrink-0">
                <span className={clsx(
                    "font-mono font-bold text-xs md:text-sm",
                    stat.winRate >= 50 ? "text-emerald-400" : "text-red-400"
                )}>
                    {stat.winRate.toFixed(1)}%
                </span>
            </div>
        </Link>
    );
};

// --- TYPE DEFINITION FOR COLUMN LAYOUT ---
interface ColumnLayoutProps {
    title: string;
    icon?: string; // Теперь опционально
    accentColor: string;
    children: React.ReactNode;
}

const ColumnLayout = ({ title, icon, accentColor, children }: ColumnLayoutProps) => (
    <div className="flex flex-col rounded-xl overflow-hidden h-full shadow-lg border border-[#2e353b] bg-[#15171c]">
        <div className="p-3 border-b border-[#2e353b] bg-[#1a1d24] flex items-center justify-center gap-2 relative">
            <div
                className="absolute inset-x-0 bottom-0 h-[2px] opacity-70"
                style={{ backgroundColor: accentColor, boxShadow: `0 0 10px ${accentColor}` }}
            />
            {icon && <Icon src={icon} size={5} />}
            <h3 className="font-serif font-bold text-white uppercase tracking-widest text-xs text-center">
                {title}
            </h3>
        </div>
        <div className="space-y-1.5 flex-grow overflow-y-auto p-1.5 scrollbar-thin scrollbar-thumb-[#2e353b]">
            {children}
        </div>
    </div>
);

// --- COMPONENT: POSITION COLUMN ---
const PositionColumn = ({ title, icon, data, accentColor, isExpanded }: {
    title: string,
    icon?: string,
    data: HeroStatsDto[],
    accentColor: string,
    isExpanded: boolean
}) => {
    const visibleData = useMemo(() => {
        if (isExpanded) return data;

        const top = data.slice(0, 5);
        const bottom = data.length > 8 ? data.slice(-3) : [];

        return { top, bottom, hasHidden: data.length > 8 };
    }, [data, isExpanded]);

    if (Array.isArray(visibleData)) {
        return (
            <ColumnLayout title={title} icon={icon} accentColor={accentColor}>
                {visibleData.map((stat, idx) => (
                    <HeroMetaCard key={stat.heroId} stat={stat} rank={idx + 1} />
                ))}
            </ColumnLayout>
        );
    }

    return (
        <ColumnLayout title={title} icon={icon} accentColor={accentColor}>
            {visibleData.top.map((stat, idx) => (
                <HeroMetaCard key={stat.heroId} stat={stat} rank={idx + 1} />
            ))}

            {visibleData.hasHidden && (
                <div className="flex items-center justify-center py-2 opacity-30">
                    <div className="w-1 h-1 bg-[#58606e] rounded-full mx-0.5"></div>
                    <div className="w-1 h-1 bg-[#58606e] rounded-full mx-0.5"></div>
                    <div className="w-1 h-1 bg-[#58606e] rounded-full mx-0.5"></div>
                </div>
            )}

            {visibleData.bottom.map((stat, idx) => {
                const realRank = data.length - visibleData.bottom.length + idx + 1;
                return <HeroMetaCard key={stat.heroId} stat={stat} rank={realRank} />;
            })}
        </ColumnLayout>
    );
};

export const HeroesMetaPage: React.FC = () => {
    const [days, setDays] = useState<number>(1);
    const [isGlobalExpanded, setIsGlobalExpanded] = useState(false);

    const { data: meta, isLoading, isError, refetch } = useHeroesMeta(days);

    if (isError) return <ErrorDisplay message="Failed to load meta data" onRetry={refetch} />;

    const totalHeroesCount = meta?.heroesOverall?.length || 0;

    return (
        <div className="min-h-screen bg-[#0b0e13] text-[#e3e3e3] pb-10">

            {/* Header */}
            <div className="relative w-full bg-gradient-to-b from-[#1a1d24] to-[#0b0e13] border-b border-[#2e353b] mb-8">
                <div className="absolute inset-0 bg-[url('https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/blog/730_bg.jpg')] bg-cover bg-top opacity-10 mix-blend-overlay" />
                <div className="mx-auto px-4 py-10 flex flex-col justify-center items-center text-center relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="h-px w-10 bg-[#e7d291]" />
                        <span className="text-[#e7d291] font-bold uppercase tracking-[0.2em] text-xs">Analytics</span>
                        <span className="h-px w-10 bg-[#e7d291]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white uppercase tracking-wider drop-shadow-lg">
                        Current <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e7d291] to-[#b88a44]">Meta</span>
                    </h1>
                    <p className="text-[#808fa6] text-sm mt-3 mb-6">
                        Top performing heroes by position across different periods.
                    </p>

                    {/* Фильтр по времени */}
                    <div className="flex bg-[#0f1114] border border-[#2e353b] rounded-lg p-1">
                        {PERIOD_FILTERS.map(filter => (
                            <button
                                key={filter.value}
                                onClick={() => setDays(filter.value)}
                                className={clsx(
                                    "px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all",
                                    days === filter.value
                                        ? "bg-[#2e353b] text-[#e7d291] shadow-inner"
                                        : "text-[#58606e] hover:text-[#808fa6] hover:bg-[#1a1d24]"
                                )}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Meta Grid */}
            <div className="mx-auto px-4 lg:px-8">
                {isLoading ? (
                    <LoadingSpinner text="Analyzing the Meta..." />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 items-start">
                        {POSITIONS.map((pos) => (
                            <PositionColumn
                                key={pos.key}
                                title={pos.label}
                                icon={pos.icon}
                                accentColor={pos.color}
                                data={meta?.[pos.key] || []}
                                isExpanded={isGlobalExpanded}
                            />
                        ))}
                    </div>
                )}

                {!isLoading && meta && (
                    <div className={clsx(
                        "fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300",
                        "translate-y-0 opacity-100"
                    )}>
                        <button
                            onClick={() => {
                                setIsGlobalExpanded(!isGlobalExpanded);
                                if (isGlobalExpanded) {
                                }
                            }}
                            className="flex items-center gap-3 px-6 py-3 bg-[#15171c]/95 backdrop-blur border border-[#e7d291]/50 hover:border-[#e7d291] hover:bg-[#1e222b]/95 text-white rounded-full shadow-[0_0_20px_rgba(0,0,0,0.8)] transition-all transform hover:-translate-y-1 group"
                        >
                        <span className="text-xs font-bold uppercase tracking-widest text-[#e7d291] group-hover:text-white transition-colors">
                            {isGlobalExpanded ? 'Collapse List' : `Show All ${totalHeroesCount} Heroes`}
                        </span>
                            <div className={clsx(
                                "w-6 h-6 rounded-full bg-[#e7d291] flex items-center justify-center text-black transition-transform duration-500",
                                isGlobalExpanded ? "rotate-180" : ""
                            )}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
