import React from 'react';
import { useHeroBenchmarks } from '../../../hooks/queries/useHeroBenchmarks';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { ErrorDisplay } from '../../ui/ErrorDisplay';
import { BenchmarkChart } from '../charts/BenchmarkChart';
import type { HeroInfo } from '../../../types/heroes';

// Улучшенные иконки с лучшей визуализацией
const GoldIcon = () => (
    <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const XpIcon = () => (
    <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

const SwordIcon = () => (
    <svg className="w-5 h-5 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
    </svg>
);

const CreepIcon = () => (
    <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
);

const HealIcon = () => (
    <svg className="w-5 h-5 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);

const TowerIcon = () => (
    <svg className="w-5 h-5 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

const KillIcon = () => (
    <svg className="w-5 h-5 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
    </svg>
);

interface Props {
    hero: HeroInfo;
}

export const HeroBenchmarksTab: React.FC<Props> = ({ hero }) => {
    const { data, isLoading, isError, refetch } = useHeroBenchmarks(hero.id);

    if (isLoading) return <LoadingSpinner text="Analyzing performance curves..." />;
    if (isError || !data) return <ErrorDisplay message="Benchmarks unavailable" onRetry={refetch} />;

    const r = data.result;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Section */}
            <div className="mb-8 border-l-4 border-[#e7d291] pl-4 bg-gradient-to-r from-[#e7d291]/5 to-transparent py-3">
                <h3 className="text-xl font-serif font-bold text-white uppercase tracking-widest">
                    Performance Benchmarks
                </h3>
                <p className="text-[#808fa6] text-sm mt-1">
                    Compare performance across different skill percentiles. Higher percentiles represent better player performance.
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <BenchmarkChart
                    title="Gold / Min"
                    data={r.goldPerMinutes}
                    color="#fbbf24"
                    icon={<GoldIcon />}
                />

                <BenchmarkChart
                    title="XP / Min"
                    data={r.xpPerMinutes}
                    color="#60a5fa"
                    icon={<XpIcon />}
                />

                <BenchmarkChart
                    title="Last Hits / Min"
                    data={r.lastHitPerMinutes}
                    color="#34d399"
                    icon={<CreepIcon />}
                    formatter={(v) => v.toFixed(2)}
                />

                <BenchmarkChart
                    title="Hero Damage / Min"
                    data={r.heroDamagePerMinutes}
                    color="#f87171"
                    icon={<SwordIcon />}
                    formatter={(v) => v.toFixed(2)}
                />

                <BenchmarkChart
                    title="Tower Damage"
                    data={r.towerDamage}
                    color="#fb923c"
                    icon={<TowerIcon />}
                />

                <BenchmarkChart
                    title="Hero Healing / Min"
                    data={r.heroHealingPerMinutes}
                    color="#a3e635"
                    icon={<HealIcon />}
                    formatter={(v) => v.toFixed(2)}
                />

                <BenchmarkChart
                    title="Kills / Min"
                    data={r.killsPerMinutes}
                    color="#ef4444"
                    icon={<KillIcon />}
                    formatter={(v) => v.toFixed(2)}
                />
            </div>
        </div>
    );
};
