import React, { useMemo } from 'react';
import clsx from 'clsx';
import { useHeroes } from '../../hooks/queries/useHeroes';
import { useHeroAbilities } from '../../hooks/queries/useHeroAbilities';
import {Icon} from "../Icon.tsx";

const FACET_COLORS: Record<string, { bg: string, border: string, glow: string, text: string }> = {
    Red: {
        bg: 'from-red-900/90 to-[#0f1114]',
        border: 'border-red-500/50',
        glow: 'shadow-[0_0_15px_rgba(239,68,68,0.3)]',
        text: 'text-red-400'
    },
    Blue: {
        bg: 'from-blue-900/90 to-[#0f1114]',
        border: 'border-blue-500/50',
        glow: 'shadow-[0_0_15px_rgba(59,130,246,0.3)]',
        text: 'text-blue-400'
    },
    Green: {
        bg: 'from-emerald-900/90 to-[#0f1114]',
        border: 'border-emerald-500/50',
        glow: 'shadow-[0_0_15px_rgba(16,185,129,0.3)]',
        text: 'text-emerald-400'
    },
    Purple: {
        bg: 'from-purple-900/90 to-[#0f1114]',
        border: 'border-purple-500/50',
        glow: 'shadow-[0_0_15px_rgba(168,85,247,0.3)]',
        text: 'text-purple-400'
    },
    Yellow: {
        bg: 'from-amber-700/90 to-[#0f1114]',
        border: 'border-amber-500/50',
        glow: 'shadow-[0_0_15px_rgba(245,158,11,0.3)]',
        text: 'text-amber-400'
    },
    Gray: {
        bg: 'from-slate-700/90 to-[#0f1114]',
        border: 'border-slate-500/50',
        glow: 'shadow-[0_0_15px_rgba(100,116,139,0.3)]',
        text: 'text-slate-400'
    },
    Default: {
        bg: 'from-[#1a1d24] to-[#0f1114]',
        border: 'border-[#2e353b]',
        glow: 'shadow-none',
        text: 'text-[#808fa6]'
    }
};

interface Props {
    heroId: number;
    variantId: number;
}

export const FacetTooltip: React.FC<Props> = ({ heroId, variantId }) => {
    const { getHero } = useHeroes();
    const hero = getHero(heroId);

    const { data: abilityData } = useHeroAbilities(hero?.name ?? '');

    const facet = useMemo(() => {
        if (!abilityData?.facets) return null;
        return abilityData.facets.find(f => f.id === variantId);
    }, [abilityData, variantId]);

    if (!facet) return null;

    const theme = FACET_COLORS[facet.color] || FACET_COLORS.Default;

    return (
        <div className="relative group/facet inline-flex z-20" title={"Facet"}>
            <div className="w-6 h-6 bg-[#0f1114] shadow-md flex items-center justify-center cursor-help hover:border-white transition-colors overflow-hidden">
                <img src={facet.icon} alt="facet" className="w-full h-full object-cover" />
            </div>

            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 opacity-0 group-hover/facet:opacity-100 transition-opacity duration-200 pointer-events-none z-[100]">
                <div className={clsx(
                    "rounded-lg border p-2 flex flex-col gap-3 relative overflow-hidden bg-linear-to-b shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-md",
                    theme.bg, theme.border, theme.glow
                )}>
                    <div className="flex items-center gap-3 z-10">
                        <div className={clsx("w-10 h-10 rounded border bg-black/50 p-1 flex items-center justify-center shrink-0", theme.border)}>
                            <Icon src={facet.icon}/>
                        </div>
                        <div>
                            <div className={clsx("text-sm font-bold uppercase tracking-widest leading-none", theme.text)}>
                                {facet.title}
                            </div>
                        </div>
                    </div>

                    <div className="h-px w-full bg-white/10 z-10" />

                    <div className="text-sm text-gray-200 leading-relaxed z-10"
                         dangerouslySetInnerHTML={{ __html: facet.description.replace(/\n/g, '<br/>') }}
                    />
                </div>
            </div>
        </div>
    );
};
