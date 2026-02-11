import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useRecords } from '../hooks/queries/useRecords';
import { RECORD_CATEGORIES, RecordField } from '../types/records';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorDisplay } from '../components/ui/ErrorDisplay';
import { formatRelativeTime, formatDuration } from '../utils/formatUtils';
import clsx from 'clsx';
import { HeroCell } from "../components/heroes/HeroCell";
import { useRecordsStore } from '../store/recordsStore';
import {APP_ROUTES} from "../config/navigation.ts";

const getRankStyle = (rank: number) => {
    switch (rank) {
        case 1: return {
            badge: "bg-yellow-400 text-yellow-900 ring-4 ring-yellow-400/20 shadow-lg shadow-yellow-400/20",
            row: "bg-gradient-to-r from-yellow-50/80 to-white hover:to-yellow-50/50 border-l-4 border-l-yellow-400"
        };
        case 2: return {
            badge: "bg-slate-200 text-slate-700 ring-4 ring-slate-200/50",
            row: "bg-gradient-to-r from-slate-50/80 to-white hover:to-slate-50/50 border-l-4 border-l-slate-300"
        };
        case 3: return {
            badge: "bg-orange-300 text-orange-900 ring-4 ring-orange-300/20",
            row: "bg-gradient-to-r from-orange-50/80 to-white hover:to-orange-50/50 border-l-4 border-l-orange-300"
        };
        default: return {
            badge: "bg-transparent text-slate-400 font-mono text-sm",
            row: "hover:bg-slate-50 border-l-4 border-l-transparent transition-colors"
        };
    }
};

export const RecordsPage: React.FC = () => {
    const activeField = useRecordsStore((state) => state.activeCategory);
    const setActiveField = useRecordsStore((state) => state.setActiveCategory);

    const { data, isLoading, isError, error, refetch } = useRecords(activeField);

    const activeCategory = RECORD_CATEGORIES[activeField];

    const hasHeroData = useMemo(() => {
        return data?.some(r => r.heroId) ?? false;
    }, [data]);

    const formatScore = (val: number) => {
        return activeCategory.format === 'duration'
            ? formatDuration(val)
            : val.toLocaleString();
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col md:flex-row gap-6 animate-fade-in pb-6 pt-2 pl-1">

            {/* --- Sidebar Navigation --- */}
            <aside className="w-full md:w-64 flex-shrink-0">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden sticky">
                    <div className="p-4 bg-slate-50 border-b border-slate-200">
                        <h3 className="font-bold text-slate-700 uppercase tracking-wider text-xs">Categories</h3>
                    </div>
                    <nav className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible p-2 gap-1 custom-scrollbar">
                        {(Object.values(RecordField)).map((field) => (
                            <button
                                key={field}
                                onClick={() => setActiveField(field)}
                                className={clsx(
                                    "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap",
                                    activeField === field
                                        ? "bg-slate-900 text-white shadow-md"
                                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                )}
                            >
                                {RECORD_CATEGORIES[field].label}
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* --- Main Content --- */}
            <main className="flex-grow min-w-0"> {/* min-w-0 prevents flex overflow issues */}

                {/* Header Card */}
                <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 mb-6 text-white shadow-xl overflow-hidden border border-slate-700">

                    {/* Background Texture/Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 mix-blend-overlay"></div>

                    {/* Decorative Trophy Icon */}

                    <div className="relative z-10">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2 drop-shadow-md">
                            {activeCategory.label}
                        </h1>
                        <div className="flex items-center gap-2 text-slate-300 text-sm font-medium">
                            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            Global ranked match records. Resets weekly.
                        </div>
                    </div>
                </div>

                {/* --- Content Table --- */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 min-h-[500px] overflow-hidden">
                    {isLoading ? (
                        <LoadingSpinner text={`Scanning matches for ${activeCategory.label}...`} />
                    ) : isError ? (
                        <ErrorDisplay message={(error as Error).message} onRetry={refetch} />
                    ) : !data || data.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-80 text-slate-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            <p className="font-medium">No records found for this category</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                <tr className="bg-slate-50/80 border-b border-slate-200 text-xs uppercase text-slate-500 font-bold tracking-wider">
                                    <th className="px-6 py-4 w-20 text-center">Rank</th>

                                    {/* CONDITIONAL HEADER: Render only if heroes exist */}
                                    {hasHeroData && (
                                        <th className="px-6 py-4">Hero</th>
                                    )}

                                    <th className="px-6 py-4 text-right">
                                        {activeCategory.label}
                                    </th>
                                    <th className="px-6 py-4 text-right">Played</th>
                                    <th className="px-6 py-4 text-right">Match ID</th>
                                </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-slate-100">
                                {data.map((record, index) => {
                                    const rank = index + 1;
                                    const style = getRankStyle(rank);

                                    return (
                                        <tr key={`${record.matchId}_${index}`} className={clsx("border-b border-slate-100 last:border-0", style.row)}>
                                            <td className="px-6 py-4">
                                                <div className={clsx("mx-auto w-8 h-8 flex items-center justify-center rounded-full font-bold", style.badge)}>
                                                    {rank}
                                                </div>
                                            </td>

                                            {/* Hero (Conditional) */}
                                            {hasHeroData && (
                                                <td className="px-6 py-4">
                                                    <HeroCell heroId={record.heroId} showName={true} />
                                                </td>
                                            )}

                                            <td className="px-6 py-4 text-right align-middle">
                                                <span className={clsx(
                                                    "font-mono font-bold text-lg tracking-tight",
                                                    rank === 1 ? "text-yellow-600 drop-shadow-sm" : "text-slate-900",
                                                )}>
                                                    {formatScore(record.score)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right text-slate-500 whitespace-nowrap align-middle text-xs uppercase tracking-wide font-medium">
                                                {formatRelativeTime(record.startTime)}
                                            </td>
                                            <td className="px-6 py-4 text-right align-middle">
                                                <Link
                                                    to={`${APP_ROUTES.MATCHES}/${record.matchId}`}
                                                    className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-md transition-colors border border-blue-100"
                                                >
                                                    {record.matchId}
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};
