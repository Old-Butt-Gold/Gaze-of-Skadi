import React from 'react';
import clsx from 'clsx';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export const Pagination: React.FC<PaginationProps> = (
{currentPage, totalPages, onPageChange, className}) => {
    if (totalPages <= 1) return null;

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5; // Сколько страниц показывать вокруг текущей

        let startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // Always show first page
        if (startPage > 1) {
            pages.push(
                <PageButton key={1} page={1} isActive={currentPage === 1} onClick={() => onPageChange(1)} />
            );
            if (startPage > 2) {
                pages.push(<span key="ellipsis-start" className="px-2 text-[#58606e]">...</span>);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <PageButton
                    key={i}
                    page={i}
                    isActive={currentPage === i}
                    onClick={() => onPageChange(i)}
                />
            );
        }

        // Always show last page
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(<span key="ellipsis-end" className="px-2 text-[#58606e]">...</span>);
            }
            pages.push(
                <PageButton
                    key={totalPages}
                    page={totalPages}
                    isActive={currentPage === totalPages}
                    onClick={() => onPageChange(totalPages)}
                />
            );
        }

        return pages;
    };

    return (
        <div className={clsx("flex items-center justify-center gap-2 py-4 select-none", className)}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded border border-[#2e353b] bg-[#15171c] text-[#808fa6] hover:bg-[#2e353b] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
                &lt;
            </button>

            <div className="flex items-center gap-1">
                {renderPageNumbers()}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded border border-[#2e353b] bg-[#15171c] text-[#808fa6] hover:bg-[#2e353b] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
                &gt;
            </button>
        </div>
    );
};

const PageButton = ({ page, isActive, onClick }: { page: number, isActive: boolean, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={clsx(
            "w-8 h-8 flex items-center justify-center rounded text-sm font-bold font-mono transition-all",
            isActive
                ? "bg-[#e7d291] text-[#0f1114] border border-[#e7d291] shadow-[0_0_10px_rgba(231,210,145,0.2)]"
                : "bg-[#15171c] text-[#808fa6] border border-[#2e353b] hover:border-[#808fa6] hover:text-white"
        )}
    >
        {page}
    </button>
);
