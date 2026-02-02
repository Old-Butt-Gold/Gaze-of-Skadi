import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import { useSteamNews } from '../hooks/queries/useSteamNews';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorDisplay } from '../components/ui/ErrorDisplay';
import { formatDateLong } from '../utils/formatUtils';
import { Icon } from '../components/Icon';

const PAGE_SIZE = 20;
const LENGTH = 5000;

export const NewsPage: React.FC = () => {
    const { data: news, isLoading, isError, refetch } = useSteamNews(LENGTH);
    const [currentPage, setCurrentPage] = useState(1);

    const paginatedData = useMemo(() => {
        if (!news) return [];
        const startIndex = (currentPage - 1) * PAGE_SIZE;
        return news.slice(startIndex, startIndex + PAGE_SIZE);
    }, [news, currentPage]);

    const totalPages = news ? Math.ceil(news.length / PAGE_SIZE) : 0;

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isLoading) return <LoadingSpinner text="Fetching updates from the Ancients..." />;
    if (isError || !news) return <ErrorDisplay message="Failed to load news feed" onRetry={refetch} />;

    return (
        <div className="min-h-screen bg-[#0b0e13] text-[#e3e3e3] pb-20">

            {/* Hero Header */}
            <div className="relative h-64 md:h-80 w-full bg-gradient-to-b from-[#1a1d24] to-[#0b0e13] overflow-hidden border-b border-[#2e353b]">
                {/* Background Pattern / Image (Abstract Dota Pattern) */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://shared.akamai.steamstatic.com//store_item_assets/steam/apps/570/ss_27b6345f22243bd6b885cc64c5cda74e4bd9c3e8.jpg')] bg-cover bg-no-repeat bg-position-[center_top_9%]" />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e13] via-transparent to-transparent" />

                <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
                    <div className="flex items-center gap-3 mb-2 animate-in fade-in slide-in-from-left-4 duration-700">
                        <span className="h-px w-12 bg-[#e7d291]" />
                        <span className="text-[#e7d291] font-bold uppercase tracking-[0.2em] text-sm">Official Feed</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white uppercase tracking-wider drop-shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                        Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e7d291] to-[#b88a44]">News</span>
                    </h1>
                    <p className="text-[#808fa6] mt-4 max-w-2xl text-sm md:text-base animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                        Stay updated with the latest patches, community events, and professional league announcements directly from Steam.
                    </p>
                </div>
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-4 -mt-10 relative z-20">

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedData.map((item, index) => (
                        <article key={`${item.date}-${index}`}
                            className="group bg-[#15171c] border border-[#2e353b] hover:border-[#e7d291]/50 rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col h-full animate-in fade-in zoom-in duration-500"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            {/* Decorative Top Bar */}
                            <div className="h-1 w-full bg-gradient-to-r from-[#2e353b] to-[#15171c] group-hover:from-[#e7d291] group-hover:to-[#b88a44] transition-all duration-500" />

                            <div className="p-6 flex flex-col h-full">
                                {/* Meta Info */}
                                <div className="flex justify-between items-center mb-4 text-xs font-bold uppercase tracking-wider">
                                    <span className="text-[#808fa6] group-hover:text-white transition-colors">
                                        {formatDateLong(item.date)}
                                    </span>
                                    {item.author && (
                                        <span className="bg-[#0f1114] text-[#58606e] px-2 py-1 rounded border border-[#2e353b]">
                                            {item.author}
                                        </span>
                                    )}
                                </div>

                                <h2 className="text-xl font-serif font-bold text-[#e3e3e3] mb-4 leading-tight group-hover:text-[#e7d291] transition-colors line-clamp-4">
                                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="outline-none">
                                        {item.title}
                                    </a>
                                </h2>

                                <div className="h-px w-full bg-[#2e353b]/50 mb-4 mt-auto" />

                                <div className="flex justify-between items-center mt-auto">
                                    <div className="flex items-center gap-2">
                                        <Icon src="https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg" size={6} />
                                        <span className="text-xs text-[#58606e] font-mono group-hover:text-[#808fa6] transition-colors">
                                            Steam Community
                                        </span>
                                    </div>

                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs font-bold uppercase tracking-widest text-[#e7d291] hover:text-white flex items-center gap-1 group/link"
                                    >
                                        Read More
                                        <span className="transform group-hover/link:translate-x-1 transition-transform">→</span>
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="mt-12 flex justify-center items-center gap-2">
                        {/* Prev */}
                        <button
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                            className="w-10 h-10 flex items-center justify-center rounded bg-[#15171c] border border-[#2e353b] text-[#808fa6] hover:text-white hover:border-[#58606e] disabled:opacity-30 disabled:hover:border-[#2e353b] transition-all"
                        >
                            ←
                        </button>

                        {/* Page Numbers (Simple Logic) */}
                        <div className="flex gap-2">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                // Logic to center current page if possible
                                let pageNum = i + 1;
                                if (totalPages > 5 && currentPage > 3) {
                                    pageNum = currentPage - 2 + i;
                                    if (pageNum > totalPages) pageNum -= (pageNum - totalPages);
                                }

                                // Adjust if logic pushed pageNum too low
                                if (pageNum < 1) pageNum = i + 1;

                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => handlePageChange(pageNum)}
                                        className={clsx(
                                            "w-10 h-10 flex items-center justify-center rounded font-mono font-bold text-sm border transition-all",
                                            currentPage === pageNum
                                                ? "bg-[#e7d291] text-black border-[#e7d291] shadow-[0_0_10px_rgba(231,210,145,0.4)]"
                                                : "bg-[#15171c] border-[#2e353b] text-[#808fa6] hover:text-white hover:border-[#58606e]"
                                        )}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Next */}
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                            className="w-10 h-10 flex items-center justify-center rounded bg-[#15171c] border border-[#2e353b] text-[#808fa6] hover:text-white hover:border-[#58606e] disabled:opacity-30 disabled:hover:border-[#2e353b] transition-all"
                        >
                            →
                        </button>
                    </div>
                )}

                <div className="text-center mt-4 text-[#58606e] text-xs uppercase tracking-widest">
                    Page {currentPage} of {totalPages}
                </div>
            </div>
        </div>
    );
};
