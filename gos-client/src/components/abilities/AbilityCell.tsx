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

    // 1. Loading State
    if (isLoading) {
        return (
            <div
                className={clsx(
                    "bg-[#1a1d24] animate-pulse border border-[#2e353b] rounded",
                    className
                )}
                style={{ width: `${size * 0.25}rem`, height: `${size * 0.25}rem` }}
            />
        );
    }

    // 2. No Data / Null Name State
    if (!abilityName) {
        return (
            <div
                className={clsx(
                    "bg-[#15171c] border border-[#2e353b] flex items-center justify-center opacity-30 rounded",
                    className
                )}
                style={{ width: `${size * 0.25}rem`, height: `${size * 0.25}rem` }}
            />
        );
    }

    const ability = getAbility(abilityName);

    // 3. Ability Not Found in Dictionary
    if (!ability) {
        return (
            <div
                className={clsx(
                    "bg-[#15171c] border border-[#2e353b] flex items-center justify-center rounded",
                    className
                )}
                style={{ width: `${size * 0.25}rem`, height: `${size * 0.25}rem` }}
                title={abilityName}
            >
                <Icon src="/assets/images/ability_unknown.png" size={size} />
            </div>
        );
    }

    // 4. Success State
    const iconSrc = getAbilityIconUrl(abilityName, ability.is_innate, ability.img);

    const content = (
        <div
            className={clsx(
                "relative group overflow-hidden border border-[#2e353b] bg-[#0f1114] shadow-sm hover:border-[#808fa6] transition-colors cursor-help rounded",
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
