import { useHeroes } from "../../hooks/queries/useHeroes.ts";
import React from "react";
import { HeroTooltip } from "./HeroTooltip.tsx";
import { Link } from "react-router-dom";

export const HeroCell: React.FC<{
    heroId: number | null;
    showName?: boolean;
}> = ({ heroId, showName = false }) => {
    const { getHero, isLoading } = useHeroes();

    if (!heroId) {
        return showName ? (
            <span className="text-slate-300 text-xs italic pl-2 opacity-50">Unknown</span>
        ) : null;
    }

    const hero = getHero(heroId);

    if (isLoading) {
        return (
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-800 rounded-md animate-pulse"></div>
                {showName && <div className="h-4 w-20 bg-slate-200 rounded animate-pulse"></div>}
            </div>
        );
    }

    if (!hero) {
        return showName ? (
            <span className="text-slate-500 text-sm">Hero {heroId}</span>
        ) : null;
    }

    return (
        <HeroTooltip heroId={heroId}>
            <div className="flex items-center gap-3 group/hero cursor-help">
                <Link
                    to={`/heroes/${heroId}`}
                    className="relative block shrink-0 overflow-hidden rounded-lg shadow-sm border border-slate-200 group-hover/hero:border-blue-400 transition-colors"
                >
                    <div className="w-10 h-10 bg-slate-800">
                        <img
                            src={hero.icon}
                            alt={hero.localized_name}
                            className="w-full h-full object-cover transform group-hover/hero:scale-110 transition-transform duration-300"
                        />
                    </div>
                </Link>
                {showName && (
                    <Link
                        to={`/heroes/${heroId}`}
                        className="font-semibold text-slate-700 group-hover/hero:text-blue-600 transition-colors text-sm"
                    >
                        {hero.localized_name}
                    </Link>
                )}
            </div>
        </HeroTooltip>
    );
};
