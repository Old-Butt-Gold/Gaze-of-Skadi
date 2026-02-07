import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { useAbilities } from '../../hooks/queries/useAbilities';
import { Icon } from '../Icon';
import {
    getBehaviorName,
    getDamageTypeColor,
    getDamageTypeName,
    getDispellableName,
    getTargetTeamName,
    getTargetTypeName
} from '../../utils/itemUtils';
import { BooleanState, Behavior } from '../../types/common';
import { getAbilityIconUrl } from '../../utils/abilityUtils';

interface Props {
    abilityName: string;
    children: React.ReactNode;
}

const TOOLTIP_WIDTH = 320;
const SCREEN_PADDING = 10;

const formatValue = (val: string | string[] | null) => {
    if (!val) return null;
    return Array.isArray(val) ? val.join( '/') : val;
};

export const AbilityTooltip: React.FC<Props> = ({ abilityName, children }) => {
    const { getAbility, isLoading } = useAbilities();
    const ability = getAbility(abilityName);

    const [isVisible, setIsVisible] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const [arrowLeft, setArrowLeft] = useState(TOOLTIP_WIDTH / 2);
    const [showBelow, setShowBelow] = useState(false);

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

    if (isLoading || !ability) {
        return <div className="inline-block relative cursor-help">{children}</div>;
    }

    const isInnate = ability.is_innate === BooleanState.True;
    const iconSrc = getAbilityIconUrl(abilityName, ability.is_innate, ability.img);

    const handleMouseEnter = () => {
        if (!triggerRef.current) return;

        const rect = triggerRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;

        // 1. Vertical Positioning
        const spaceAbove = rect.top;
        const isBelow = spaceAbove < 500; // Estimated height
        setShowBelow(isBelow);

        const top = isBelow ? rect.bottom + 8 : rect.top - 8;

        // 2. Horizontal Positioning
        const triggerCenter = rect.left + (rect.width / 2);
        let left = triggerCenter - (TOOLTIP_WIDTH / 2);

        // Clamp
        if (left < SCREEN_PADDING) left = SCREEN_PADDING;
        if (left + TOOLTIP_WIDTH > viewportWidth - SCREEN_PADDING) {
            left = viewportWidth - SCREEN_PADDING - TOOLTIP_WIDTH;
        }

        // 3. Arrow Positioning
        const arrowOffset = triggerCenter - left;

        setCoords({ top, left });
        setArrowLeft(arrowOffset);
        setIsVisible(true);
    };

    const tooltipContent = (
        <div
            className="fixed z-[9999] pointer-events-none transition-all duration-200 ease-out"
            style={{
                top: coords.top,
                left: coords.left,
                width: TOOLTIP_WIDTH,
                transform: showBelow ? 'translateY(0)' : 'translateY(-100%)',
                opacity: isVisible ? 1 : 0
            }}
        >
            <div className="bg-[#101216] border border-[#2e353b] shadow-[0_10px_40px_rgba(0,0,0,0.9)] rounded-sm overflow-hidden text-sm text-[#808fa6] relative">

                {/* --- Header --- */}
                <div className="bg-[#1a1d24] p-3 flex gap-3 border-b border-[#2e353b] relative overflow-hidden">
                    {/* Innate Glow */}
                    {isInnate && (
                        <div className="absolute inset-0 bg-gradient-to-r from-[#e7d291]/10 to-transparent pointer-events-none" />
                    )}

                    <div className="w-16 h-16 bg-[#0f1114] border border-[#2e353b] flex items-center justify-center overflow-hidden rounded-sm shrink-0 relative z-10">
                        <Icon src={iconSrc ?? "unknown"} fallbackSrc="/assets/images/ability_unknown.png" />
                    </div>

                    <div className="flex flex-col justify-center relative z-10 w-full min-w-0">
                        <h4 className="text-white font-bold text-lg leading-tight font-serif uppercase tracking-wide truncate">
                            {ability.dname}
                        </h4>

                        {isInnate && (
                            <div className="text-[#e7d291] text-[10px] font-bold uppercase tracking-widest mt-1">
                                Innate Ability
                            </div>
                        )}

                        {/* Resources Row */}
                        <div className="flex items-center gap-3 mt-2">
                            {ability.mc && (
                                <div className="flex items-center gap-1 text-[#0099ff] font-bold text-xs">
                                    <Icon src="/assets/images/ability_manacost.png" size={4} />
                                    <span>{formatValue(ability.mc)}</span>
                                </div>
                            )}
                            {ability.cd && (
                                <div className="flex items-center gap-1 text-white font-bold text-xs opacity-90">
                                    <Icon src="/assets/images/ability_cooldown.png" size={4} />
                                    <span>{formatValue(ability.cd)}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- Body --- */}
                <div className="p-3 space-y-3 bg-[#101216]">

                    {/* Meta Info Grid */}
                    <div className="space-y-1 text-[11px] font-bold">
                        {ability.behavior !== null && (
                            <div className="flex gap-1">
                                <span className="text-[#58606e] uppercase">Ability:</span>
                                <span className="text-white">
                                    {Array.isArray(ability.behavior)
                                        ? ability.behavior.filter(x => x !== Behavior.Hidden).map(b => getBehaviorName(b)).join(' / ')
                                        : getBehaviorName(ability.behavior)}
                                </span>
                            </div>
                        )}

                        {ability.target_team !== null && (
                            <div className="flex gap-1">
                                <span className="text-[#58606e] uppercase">Affects:</span>
                                <span className="text-white">
                                    {Array.isArray(ability.target_team)
                                        ? ability.target_team.map(t => getTargetTeamName(t)).join(' / ')
                                        : getTargetTeamName(ability.target_team)}
                                </span>
                            </div>
                        )}

                        {ability.target_type !== null && (
                            <div className="flex gap-1">
                                <span className="text-[#58606e] uppercase">Units:</span>
                                <span className="text-white">
                                    {Array.isArray(ability.target_type)
                                        ? ability.target_type.map(t => getTargetTypeName(t)).join(' / ')
                                        : getTargetTypeName(ability.target_type)}
                                </span>
                            </div>
                        )}

                        {ability.dmg_type !== null && (
                            <div className="flex gap-1">
                                <span className="text-[#58606e] uppercase">Damage:</span>
                                <span className={clsx(getDamageTypeColor(ability.dmg_type))}>
                                    {getDamageTypeName(ability.dmg_type)}
                                </span>
                            </div>
                        )}

                        {ability.bkbpierce !== null && (
                            <div className="flex gap-1">
                                <span className="text-[#58606e] uppercase">Pierces BKB:</span>
                                <span className={ability.bkbpierce === BooleanState.True ? "text-white" : "text-[#808fa6]"}>
                                    {ability.bkbpierce === BooleanState.True ? 'Yes' : 'No'}
                                </span>
                            </div>
                        )}

                        {ability.dispellable !== null && (
                            <div className="flex gap-1">
                                <span className="text-[#58606e] uppercase">Dispellable:</span>
                                <span className="text-white">
                                    {getDispellableName(ability.dispellable)}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    {ability.desc && (
                        <div className="border-t border-[#2e353b] pt-2">
                            <p className="text-[#a3aab8] text-xs leading-relaxed whitespace-pre-line">
                                {ability.desc}
                            </p>
                        </div>
                    )}

                    {/* Dynamic Attributes */}
                    {ability.attrib && ability.attrib.length > 0 && (
                        <div className="bg-[#15171c] p-2 rounded border border-[#2e353b] space-y-0.5">
                            {ability.attrib
                                .filter(x => !(x.value.length === 1 && x.value[0] === "0"))
                                .map((attr, idx) => (
                                    <div key={idx} className="flex justify-between items-baseline gap-2 text-xs">
                                    <span className="text-[#58606e] uppercase font-bold text-[10px] tracking-wide">
                                        {attr.header.replace(':', '')}
                                    </span>
                                        <span className="text-white font-mono font-bold text-right">
                                        {Array.isArray(attr.value) ? attr.value.join(' / ') : attr.value}
                                    </span>
                                    </div>
                                ))}
                        </div>
                    )}

                    {/* Lore */}
                    {ability.lore && (
                        <div className="text-[#596b85] text-xs italic border-t border-[#2e353b] pt-2 mt-2 leading-relaxed font-serif">
                            {ability.lore}
                        </div>
                    )}
                </div>
            </div>

            {/* Dynamic Arrow */}
            <div
                className={clsx(
                    "absolute w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent",
                    showBelow
                        ? "top-[-6px] border-b-[6px] border-b-[#1a1d24]"
                        : "bottom-[-6px] border-t-[6px] border-t-[#101216]"
                )}
                style={{
                    left: arrowLeft,
                    transform: 'translateX(-50%)'
                }}
            ></div>
        </div>
    );

    return (
        <>
            <div
                className="inline-block cursor-help"
                ref={triggerRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => setIsVisible(false)}
            >
                {children}
            </div>
            {isVisible && createPortal(tooltipContent, document.body)}
        </>
    );
};
