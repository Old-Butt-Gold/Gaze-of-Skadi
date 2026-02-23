import React from 'react';
import clsx from 'clsx';
import { useAbilities } from '../../hooks/queries/useAbilities';
import { AbilityTooltip } from './AbilityTooltip';
import { Icon } from '../Icon';
import { getAbilityIconUrl } from '../../utils/abilityUtils';

interface AbilityCellProps {
    abilityName: string | null | undefined;
    size?: number;
    className?: string;
    showTooltip?: boolean;
}

export const AbilityCell: React.FC<AbilityCellProps> = (
    {abilityName, size = 10, className, showTooltip = true}) => {
    const { getAbility, isLoading } = useAbilities();

    if (isLoading) {
        return (
            <div
                className={clsx(
                    "bg-[#1a1d24] animate-pulse border border-[#2e353b]",
                    className
                )}
                style={{ width: `${size * 0.25}rem`, height: `${size * 0.25}rem` }}
            />
        );
    }

    if (!abilityName) {
        return (
            <div
                className={clsx(
                    "bg-[#15171c] border border-[#2e353b] flex items-center justify-center opacity-30",
                    className
                )}
                style={{ width: `${size * 0.25}rem`, height: `${size * 0.25}rem` }}
            />
        );
    }

    const ability = getAbility(abilityName);

    if (!ability) {
        return (
            <div
                className={clsx(
                    "bg-[#15171c] border border-[#2e353b] flex items-center justify-center",
                    className
                )}
                style={{ width: `${size * 0.25}rem`, height: `${size * 0.25}rem` }}
                title={abilityName}
            >
                <Icon src="/assets/images/ability_unknown.png" size={size} />
            </div>
        );
    }

    const iconSrc = getAbilityIconUrl(abilityName, ability.is_innate, ability.img);

    const content = (
        <div
            className={clsx(
                "relative group overflow-hidden shadow-sm hover:border-[#808fa6] transition-colors cursor-help",
                className
            )}
        >
            <Icon
                src={iconSrc ?? "unknown"}
                alt={ability.dname ?? abilityName}
                size={size}
                fallbackSrc="/assets/images/ability_unknown.png"
            />
        </div>
    );

    if (!showTooltip) return content;

    return (
        <AbilityTooltip abilityName={abilityName}>
            {content}
        </AbilityTooltip>
    );
};
