import React, { useState, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { useHeroes } from '../../hooks/queries/useHeroes';
import { useHeroAbilities } from '../../hooks/queries/useHeroAbilities';
import { Icon } from '../Icon';

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

const TOOLTIP_WIDTH = 280;
const SCREEN_PADDING = 10;

export const FacetTooltip: React.FC<Props> = ({ heroId, variantId }) => {
    const { getHero } = useHeroes();
    const hero = getHero(heroId);

    const { data: abilityData } = useHeroAbilities(hero?.name ?? '');

    const facet = useMemo(() => {
        if (!abilityData?.facets) return null;
        return abilityData.facets.find(f => f.id === variantId);
    }, [abilityData, variantId]);

    const [isVisible, setIsVisible] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const [showBelow, setShowBelow] = useState(false);
    const [arrowLeft, setArrowLeft] = useState(TOOLTIP_WIDTH / 2);

    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isVisible) {
            const handleScroll = () => setIsVisible(false);
            const handleResize = () => setIsVisible(false);

            window.addEventListener('scroll', handleScroll, true);
            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('scroll', handleScroll, true);
                window.removeEventListener('resize', handleResize);
            };
        }
    }, [isVisible]);

    if (!facet) return null;

    const theme = FACET_COLORS[facet.color] || FACET_COLORS.Default;

    const handleMouseEnter = () => {
        if (!triggerRef.current) return;

        const rect = triggerRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const spaceAbove = rect.top;
        const isBelow = spaceAbove < 250;
        setShowBelow(isBelow);

        const top = isBelow ? rect.bottom + 10 : rect.top - 10;

        const triggerCenter = rect.left + (rect.width / 2);
        let left = triggerCenter - (TOOLTIP_WIDTH / 2);

        if (left < SCREEN_PADDING) {
            left = SCREEN_PADDING;
        }
        if (left + TOOLTIP_WIDTH > viewportWidth - SCREEN_PADDING) {
            left = viewportWidth - SCREEN_PADDING - TOOLTIP_WIDTH;
        }

        const arrowOffset = triggerCenter - left;

        setCoords({ top, left });
        setArrowLeft(arrowOffset);
        setIsVisible(true);
    };

    const tooltipContent = (
        <div
            className="fixed z-[9999] pointer-events-none transition-opacity duration-200 ease-in-out"
            style={{
                top: coords.top,
                left: coords.left,
                width: TOOLTIP_WIDTH,
                transform: showBelow ? 'translateY(0)' : 'translateY(-100%)',
                opacity: isVisible ? 1 : 0
            }}
        >
            <div className={clsx(
                "rounded-lg border p-2 flex flex-col gap-3 relative overflow-hidden bg-linear-to-b shadow-[0_10px_40px_rgba(0,0,0,0.9)] backdrop-blur-xl",
                theme.bg, theme.border, theme.glow
            )}>
                {/* Header */}
                <div className="flex items-center gap-3 z-10">
                    <div className={clsx("w-10 h-10 rounded border bg-black/50 p-1 flex items-center justify-center shrink-0 shadow-inner", theme.border)}>
                        <Icon src={facet.icon} />
                    </div>
                    <div>
                        <div className={clsx("text-sm font-bold uppercase tracking-widest leading-none drop-shadow-md", theme.text)}>
                            {facet.title}
                        </div>
                    </div>
                </div>

                <div className="h-px w-full bg-white/10 z-10" />

                <div className="text-xs text-gray-200 leading-relaxed z-10 font-medium tracking-wide drop-shadow-sm"
                     dangerouslySetInnerHTML={{ __html: facet.description.replace(/\n/g, '<br/>') }}
                />
            </div>

            {/* Dynamic Arrow */}
            <div
                className={clsx(
                    "absolute w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent drop-shadow-md",
                    showBelow
                        ? "-top-1.5 border-b-[6px]"
                        : "-bottom-1.5 border-t-[6px]",
                    showBelow ? "border-b-[#0f1114]" : "border-t-[#0f1114]"
                )}
                style={{
                    left: arrowLeft,
                    transform: 'translateX(-50%)'
                }}
            />
        </div>
    );

    return (
        <>
            <div
                ref={triggerRef}
                className="relative group/facet inline-flex z-20"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => setIsVisible(false)}
            >
                <div className="w-6 h-6 bg-[#0f1114] border border-[#58606e] shadow-md flex items-center justify-center cursor-help hover:border-white transition-colors overflow-hidden">
                    <Icon src={facet.icon} />
                </div>
            </div>

            {isVisible && createPortal(tooltipContent, document.body)}
        </>
    );
};
