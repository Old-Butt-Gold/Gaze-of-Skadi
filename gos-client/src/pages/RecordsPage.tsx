import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecords } from '../hooks/queries/useRecords';
import { RECORD_CATEGORIES, RecordField } from '../types/records';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorDisplay } from '../components/ui/ErrorDisplay';
import { formatRelativeTime, formatDuration } from '../utils/formatUtils';
import clsx from 'clsx';
import { HeroCell } from "../components/heroes/HeroCell";
import { useRecordsStore } from '../store/recordsStore';
import { APP_ROUTES } from "../config/navigation";
import { Pagination } from '../components/ui/Pagination'; // Импорт пагинации

const PAGE_SIZE = 20;

const getRankStyle = (rank: number) => {
    switch (rank) {
        case 1: return {
            badge: "bg-[#e7d291] text-[#1a1d24] ring-4 ring-[#e7d291]/20 shadow-[0_0_15px_rgba(231,210,145,0.3)]",
            row: "bg-gradient-to-r from-[#e7d291]/10 to-transparent border-l-4 border-l-[#e7d291]"
        };
        case 2: return {
            badge: "bg-[#a3aab8] text-[#1a1d24] ring-4 ring-[#a3aab8]/20",
            row: "bg-gradient-to-r from-[#a3aab8]/10 to-transparent border-l-4 border-l-[#a3aab8]"
        };
        case 3: return {
            badge: "bg-[#cd7f32] text-[#1a1d24] ring-4 ring-[#cd7f32]/20 shadow-[0_0_10px_rgba(205,127,50,0.2)]",
            row: "bg-gradient-to-r from-[#cd7f32]/10 to-transparent border-l-4 border-l-[#cd7f32]"
        };
        default: return {
            badge: "bg-[#2e353b] text-[#808fa6] font-mono text-sm border border-[#58606e]/30",
            row: "hover:bg-[#1e222b] border-l-4 border-l-transparent transition-colors"
        };
    }
};

export const RecordsPage: React.FC = () => {
    const activeField = useRecordsStore((state) => state.activeCategory);
    const setActiveField = useRecordsStore((state) => state.setActiveCategory);

    const [page, setPage] = useState(1);

    const { data, isLoading, isError, error, refetch } = useRecords(activeField);

    const activeCategory = RECORD_CATEGORIES[activeField];

    const hasHeroData = useMemo(() => {
        return data?.some(r => r.heroId) ?? false;
    }, [data]);

    const handleCategoryChange = (field: RecordField) => {
        setActiveField(field);
        setPage(1);
    };

    const paginatedData = useMemo(() => {
        if (!data) return [];
        const start = (page - 1) * PAGE_SIZE;
        return data.slice(start, start + PAGE_SIZE);
    }, [data, page]);

    const totalPages = data ? Math.ceil(data.length / PAGE_SIZE) : 0;

    const formatScore = (val: number) => {
        return activeCategory.format === 'duration'
            ? formatDuration(val)
            : val.toLocaleString();
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col md:flex-row gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-6 pt-2 pl-1">

            {/* --- Sidebar Navigation --- */}
            <aside className="w-full md:w-64 flex-shrink-0">
                <div className="bg-[#15171c] rounded-xl shadow-2xl border border-[#2e353b] overflow-hidden sticky top-4">
                    <div className="p-4 bg-[#1a1d24] border-b border-[#2e353b]">
                        <h3 className="font-bold text-[#e3e3e3] uppercase tracking-widest text-xs font-serif">Categories</h3>
                    </div>
                    <nav className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible p-2 gap-1 custom-scrollbar">
                        {(Object.values(RecordField)).map((field) => (
                            <button
                                key={field}
                                onClick={() => handleCategoryChange(field)}
                                className={clsx(
                                    "flex items-center px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 whitespace-nowrap text-left",
                                    activeField === field
                                        ? "bg-[#2e353b] text-[#e7d291] shadow-md border border-[#e7d291]/20"
                                        : "text-[#808fa6] hover:bg-white/5 hover:text-white"
                                )}
                            >
                                {RECORD_CATEGORIES[field].label}
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* --- Main Content --- */}
            <main className="flex-grow min-w-0">

                {/* Header Card */}
                <div className="relative bg-[#15171c] rounded-xl p-8 mb-6 shadow-2xl overflow-hidden border border-[#2e353b]">
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#e7d291]/5 to-transparent pointer-events-none" />

                    <div className="relative z-10">
                        <h1 className="text-3xl font-serif font-bold tracking-widest uppercase text-white mb-2 drop-shadow-md">
                            {activeCategory.label}
                        </h1>
                        <div className="flex items-center gap-2 text-[#808fa6] text-sm font-medium">
                            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"></span>
                            Global ranked match records. Resets weekly.
                        </div>
                    </div>
                </div>

                {/* --- Content Table --- */}
                <div className="bg-[#15171c] rounded-xl shadow-2xl border border-[#2e353b] min-h-[500px] overflow-hidden flex flex-col">
                    {isLoading ? (
                        <div className="h-96 flex items-center justify-center">
                            <LoadingSpinner text={`Scanning matches for ${activeCategory.label}...`} />
                        </div>
                    ) : isError ? (
                        <ErrorDisplay message={(error as Error).message} onRetry={refetch} />
                    ) : !data || data.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-80 text-[#58606e]">
                            <span className="text-6xl mb-4 opacity-20">📜</span>
                            <p className="font-bold uppercase tracking-widest text-xs">No records found for this category</p>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                    <tr className="bg-[#1a1d24] border-b border-[#2e353b] text-[10px] uppercase text-[#808fa6] font-bold tracking-widest">
                                        <th className="px-6 py-4 w-20 text-center">Rank</th>

                                        {hasHeroData && (
                                            <th className="px-6 py-4">Hero</th>
                                        )}

                                        <th className="px-6 py-4 text-right text-white">
                                            {activeCategory.label}
                                        </th>
                                        <th className="px-6 py-4 text-right">Played</th>
                                        <th className="px-6 py-4 text-right">Match ID</th>
                                    </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-[#2e353b]/50">
                                    {paginatedData.map((record, index) => {
                                        // Вычисляем абсолютный ранг (учитывая страницу)
                                        const rank = (page - 1) * PAGE_SIZE + index + 1;
                                        const style = getRankStyle(rank);

                                        return (
                                            <tr key={`${record.matchId}_${rank}`} className={clsx("border-b border-[#2e353b]/30 last:border-0", style.row)}>
                                                <td className="px-6 py-4">
                                                    <div className={clsx("mx-auto w-8 h-8 flex items-center justify-center rounded-full font-bold shadow-md transition-transform hover:scale-110", style.badge)}>
                                                        {rank}
                                                    </div>
                                                </td>

                                                {hasHeroData && (
                                                    <td className="px-6 py-4">
                                                        <HeroCell heroId={record.heroId} showName={true} />
                                                    </td>
                                                )}

                                                <td className="px-6 py-4 text-right align-middle font-mono border-[#2e353b]/50">
                                                    <span className={clsx(
                                                        "font-bold text-lg tracking-tight transition-colors",
                                                        rank === 1 ? "text-[#e7d291] drop-shadow-[0_0_10px_rgba(231,210,145,0.3)]" : "text-white group-hover:text-[#e7d291]",
                                                    )}>
                                                        {formatScore(record.score)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right text-[#808fa6] whitespace-nowrap align-middle text-xs uppercase tracking-wide font-medium">
                                                    {formatRelativeTime(record.startTime)}
                                                </td>
                                                <td className="px-6 py-4 text-right align-middle">
                                                    <Link
                                                        to={`${APP_ROUTES.MATCHES}/${record.matchId}`}
                                                        className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-[#60a5fa] bg-[#60a5fa]/10 hover:bg-[#60a5fa]/20 px-2.5 py-1 rounded border border-[#60a5fa]/30 transition-colors"
                                                    >
                                                        {record.matchId}
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

                            {/* Pagination Footer */}
                            {totalPages > 1 && (
                                <div className="border-t border-[#2e353b] bg-[#1a1d24]/50 mt-auto">
                                    <Pagination
                                        currentPage={page}
                                        totalPages={totalPages}
                                        onPageChange={setPage}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};
