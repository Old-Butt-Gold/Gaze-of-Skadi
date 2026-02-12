import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useHeroes } from '../../hooks/queries/useHeroes';
import { useHeroAbilities } from '../../hooks/queries/useHeroAbilities';
import { HeroTooltip } from './HeroTooltip';
import { FacetTooltip } from './FacetTooltip';
import { APP_ROUTES } from '../../config/navigation';
import { Icon } from '../Icon';
import {BooleanState, LeaverStatus} from '../../types/common';
import {getLeaverStatusName, IsPlayerLeft} from "../../utils/enumUtils.ts";

interface Props {
    matchId: number;
    heroId: number;
    heroVariant?: number | null;
    leaverStatus?: LeaverStatus | null;
    isParsed?: BooleanState | null | undefined;
    showName?: boolean;
}

export const HeroImage: React.FC<Props> = ({
                                               matchId, heroId, heroVariant, leaverStatus, isParsed, showName = true
                                           }) => {
    const { getHero, isLoading } = useHeroes();
    const hero = getHero(heroId);

    heroVariant = 1;

    const { data: abilityData } = useHeroAbilities(heroVariant ? (hero?.name ?? '') : '');

    const facet = useMemo(() => {
        if (!abilityData?.facets || !heroVariant) return null;
        return abilityData.facets.find(f => f.id === heroVariant);
    }, [abilityData, heroVariant]);

    if (isLoading) {
        return <div className="w-22 h-12 bg-[#2e353b] rounded animate-pulse" />;
    }

    if (!hero) {
        return <span className="text-[#808fa6] text-xs">Unknown</span>;
    }

    const isLeaver = IsPlayerLeft(leaverStatus);

    const isParsedMatch = isParsed === BooleanState.True;

    return (
        <Link to={`${APP_ROUTES.MATCHES}/${matchId}`} className="block relative">
            <div className="flex items-center gap-3">
                <div className="relative group/hero">
                    {isParsedMatch && (
                        <div className="absolute -left-1 top-1/2 -translate-y-1/2 cursor-help -translate-x-full z-10" title="Parsed Match">
                            <Icon src="/assets/images/parsed_match.svg"/>
                        </div>
                    )}

                        <HeroTooltip heroId={heroId}>
                            <div className="w-22 h-12 overflow-hidden rounded-sm relative transition-colors">
                                <Icon src={hero.img} alt={hero.localized_name} />

                                {isLeaver && (
                                    <div className="absolute inset-0 flex items-center justify-center z-10" title={getLeaverStatusName(leaverStatus)}>
                                        <Icon src="/assets/images/disconnect_icon.png" />
                                    </div>
                                )}
                            </div>
                        </HeroTooltip>

                    {facet && (
                        <div className="absolute -bottom-1 -right-1 z-20">
                            <FacetTooltip heroId={heroId} variantId={heroVariant!} />
                        </div>
                    )}
                </div>

                {showName && (
                    <span className="font-bold text-sm text-[#e3e3e3] hover:border-[#e7d291] transition-colors">
                        {hero.localized_name}
                    </span>
                )}
            </div>
        </Link>
    );
};
