import React, { useState } from 'react';
import clsx from 'clsx';
import { Icon } from '../Icon';
import type {Facet} from "../../types/heroAbility.ts";

const FACET_COLORS: Record<string, { bg: string, border: string, glow: string, text: string, indicator: string }> = {
    Red: {
        bg: 'from-red-900/60 via-red-950/40 to-[#0f1114]',
        border: 'border-red-500/50',
        glow: 'shadow-[0_0_20px_rgba(239,68,68,0.2)]',
        text: 'text-red-400',
        indicator: 'bg-red-500'
    },
    Blue: {
        bg: 'from-blue-900/60 via-blue-950/40 to-[#0f1114]',
        border: 'border-blue-500/50',
        glow: 'shadow-[0_0_20px_rgba(59,130,246,0.2)]',
        text: 'text-blue-400',
        indicator: 'bg-blue-500'
    },
    Green: {
        bg: 'from-emerald-900/60 via-emerald-950/40 to-[#0f1114]',
        border: 'border-emerald-500/50',
        glow: 'shadow-[0_0_20px_rgba(16,185,129,0.2)]',
        text: 'text-emerald-400',
        indicator: 'bg-emerald-500'
    },
    Purple: {
        bg: 'from-purple-900/60 via-fuchsia-950/40 to-[#0f1114]',
        border: 'border-purple-500/50',
        glow: 'shadow-[0_0_20px_rgba(168,85,247,0.2)]',
        text: 'text-purple-400',
        indicator: 'bg-purple-500'
    },
    Yellow: {
        bg: 'from-amber-700/50 via-yellow-900/30 to-[#0f1114]',
        border: 'border-amber-500/50',
        glow: 'shadow-[0_0_20px_rgba(245,158,11,0.2)]',
        text: 'text-amber-400',
        indicator: 'bg-amber-500'
    },
    Gray: {
        bg: 'from-slate-700/50 via-slate-800/30 to-[#0f1114]',
        border: 'border-slate-500/50',
        glow: 'shadow-[0_0_20px_rgba(100,116,139,0.2)]',
        text: 'text-slate-400',
        indicator: 'bg-slate-500'
    },
    Default: {
        bg: 'from-[#1a1d24] to-[#0f1114]',
        border: 'border-[#2e353b]',
        glow: 'shadow-none',
        text: 'text-[#808fa6]',
        indicator: 'bg-[#58606e]'
    }
};

export const FacetsSection: React.FC<{ facets: Facet[] }> = ({ facets }) => {
    const [selectedFacetId, setSelectedFacetId] = useState<number>(() => {
        if (!facets || facets.length === 0) return 0;
        const firstActive = facets.find(f => !f.deprecated);
        return firstActive ? firstActive.id : facets[0].id;
    });

    const selectedFacet = facets.find(f => f.id === selectedFacetId) || facets[0];

    if (!selectedFacet) return null;

    const theme = FACET_COLORS[selectedFacet.color] || FACET_COLORS.Default;

    return (
        <div className="bg-[#15171c] border border-[#2e353b] rounded-xl overflow-hidden shadow-2xl mb-8 relative">

            <div className="bg-[#1a1d24] px-4 py-3 border-b border-[#2e353b] flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[#0f1114] border border-[#2e353b] flex items-center justify-center shadow-inner">
                        <span className="text-[#e7d291] text-lg leading-none">❖</span>
                    </div>
                    <h3 className="text-sm font-bold text-[#e3e3e3] uppercase tracking-widest font-serif">
                        Hero Facets
                    </h3>
                </div>
                <div className="text-[10px] text-[#58606e] uppercase font-bold tracking-wider">
                    Select a facet to view details
                </div>
            </div>

            <div className="p-4 md:p-6 bg-[#0b0e13]">
                <div className="flex flex-col md:flex-row gap-6">

                    <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hide md:w-1/3 shrink-0">
                        {facets.map((facet) => {
                            const isSelected = facet.id === selectedFacetId;
                            const isDeprecated = facet.deprecated === 1;
                            const fTheme = FACET_COLORS[facet.color] || FACET_COLORS.Default;

                            return (
                                <button
                                    key={facet.id}
                                    onClick={() => setSelectedFacetId(facet.id)}
                                    className={clsx(
                                        "relative group flex items-center gap-4 p-3 rounded-lg border transition-all duration-300 min-w-[240px] md:min-w-0 text-left overflow-hidden",
                                        isSelected
                                            ? `bg-gradient-to-r ${fTheme.bg} ${fTheme.border} ${fTheme.glow}`
                                            : "bg-[#15171c] border-[#2e353b] hover:border-[#58606e] hover:bg-[#1e222b]",
                                        isDeprecated && !isSelected && "opacity-60 grayscale hover:grayscale-0 hover:opacity-100"
                                    )}
                                >
                                    <div className={clsx(
                                        "w-12 h-12 rounded border flex items-center justify-center p-1 shrink-0 transition-all shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]",
                                        isSelected
                                            ? `bg-black/30 border-white/10`
                                            : "bg-[#0f1114] border-[#2e353b]"
                                    )}>
                                        <img
                                            src={facet.icon}
                                            alt={facet.title}
                                            className={clsx(
                                                "w-full h-full object-contain drop-shadow-md transition-all duration-300",
                                                !isSelected && "opacity-70 group-hover:opacity-100"
                                            )}
                                        />
                                    </div>

                                    <div className="flex flex-col flex-grow min-w-0 relative z-10">
                                        <div className="flex items-center gap-2">
                                            <span className={clsx(
                                                "font-serif font-bold text-sm uppercase tracking-wide truncate transition-colors",
                                                isSelected ? "text-white text-shadow-sm" : "text-[#a3aab8] group-hover:text-white"
                                            )}>
                                                {facet.title}
                                            </span>
                                            {isDeprecated && (
                                                <span className="text-[8px] bg-red-900/50 border border-red-500/30 text-red-200 px-1 rounded uppercase tracking-wider font-bold">
                                                    Legacy
                                                </span>
                                            )}
                                        </div>
                                        <span className={clsx(
                                            "text-[10px] font-mono mt-0.5 truncate",
                                            isSelected ? fTheme.text : "text-[#58606e]"
                                        )}>
                                            {isDeprecated ? 'Deprecated Facet' : `Facet ${facet.id + 1}`}
                                        </span>
                                    </div>

                                    {isSelected && (
                                        <div className={clsx("absolute left-0 top-0 bottom-0 w-1 rounded-l-lg shadow-[0_0_10px_currentColor]", fTheme.indicator)} />
                                    )}

                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shine pointer-events-none" />
                                </button>
                            );
                        })}
                    </div>

                    <div className={clsx(
                        "flex-grow rounded-xl border relative overflow-hidden transition-all duration-500 flex flex-col",
                        theme.border,
                        "bg-[#15171c]"
                    )}>
                        <div className={clsx(
                            "absolute inset-0 bg-gradient-to-br opacity-100 transition-colors duration-500",
                            theme.bg
                        )} />

                        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none" />

                        <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className={clsx("p-2 rounded-lg bg-black/40 border backdrop-blur-sm shadow-xl", theme.border)}>
                                        <Icon src={selectedFacet.icon} size={10} />
                                    </div>
                                    <div>
                                        <h2 className={clsx("text-2xl md:text-3xl font-serif font-bold uppercase tracking-widest drop-shadow-md leading-none mb-1", theme.text)}>
                                            {selectedFacet.title}
                                        </h2>
                                        {selectedFacet.deprecated === 1 && (
                                            <div className="inline-flex items-center gap-1 text-red-400 text-xs font-bold uppercase tracking-widest bg-red-950/50 px-2 py-0.5 rounded border border-red-500/20">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                Deprecated Facet
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#58606e]/50 to-transparent my-6" />

                            <div className="flex-grow">
                                <p className="text-[#c2c2c2] text-sm md:text-base leading-loose font-medium tracking-wide drop-shadow-sm"
                                   dangerouslySetInnerHTML={{
                                       __html: selectedFacet.description
                                           .replace(/\n/g, '<br/>')
                                   }}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};