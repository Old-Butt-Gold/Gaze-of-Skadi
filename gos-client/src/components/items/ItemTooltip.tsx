import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useItems } from '../../hooks/queries/useItems';
import clsx from 'clsx';
import { Icon } from '../Icon';
import { ItemComponent } from './ItemComponent';
import {
    getDamageTypeName,
    getDamageTypeColor,
    getDispellableName,
    getAbilityTypeName,
    getBehaviorName,
    getTargetTeamName,
    getTargetTypeName
} from '../../utils/itemUtils';
import {Behavior, BooleanState} from '../../types/common';
import { AbilityType } from "../../types/items";

interface Props {
    itemName: string;
    children: React.ReactNode;
}

const TOOLTIP_WIDTH = 320;
const SCREEN_PADDING = 10;

export const ItemTooltip: React.FC<Props> = ({ itemName, children }) => {
    const { getItem, isLoading } = useItems();
    const item = getItem(itemName);

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

    if (isLoading || !item) {
        return <div className="inline-block relative cursor-help">{children}</div>;
    }

    const handleMouseEnter = () => {
        if (!triggerRef.current) return;
        const rect = triggerRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;

        // 1. Vertical Positioning
        // Max estimate for Item tooltip
        const spaceAbove = rect.top;
        const isBelow = spaceAbove < 500;
        setShowBelow(isBelow);

        const top = isBelow ? rect.bottom + 8 : rect.top - 8;

        // 2. Horizontal Positioning
        const triggerCenter = rect.left + (rect.width / 2);
        let left = triggerCenter - (TOOLTIP_WIDTH / 2);

        // Clamp Left
        if (left < SCREEN_PADDING) {
            left = SCREEN_PADDING;
        }
        // Clamp Right
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
                // Using transform for vertical flip only
                transform: showBelow ? 'translateY(0)' : 'translateY(-100%)',
                opacity: isVisible ? 1 : 0
            }}
        >
            <div className="bg-[#101216] border border-[#2e353b] shadow-[0_10px_40px_rgba(0,0,0,0.9)] rounded-sm overflow-hidden text-sm text-[#808fa6] relative">

                {/* Header */}
                <div className="bg-[#1a1d24] p-3 flex gap-3 border-b border-[#2e353b]">
                    <div className="w-16 h-12 bg-[#0f1114] border border-[#2e353b] flex items-center justify-center overflow-hidden rounded-sm shrink-0">
                        <img
                            src={`${item.img}`}
                            alt={item.dname ?? "unknown"}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h4 className="text-[#e7d291] font-bold text-lg leading-tight font-serif uppercase tracking-wide">
                            {item.dname}
                        </h4>
                        {item.cost !== null && item.cost > 0 && (
                            <div className="flex items-center gap-1 text-[#e7d291] text-xs font-bold mt-1">
                                <Icon src="/assets/images/gold.png" size={3} />
                                <span>{item.cost}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content Body */}
                <div className="p-3 space-y-3">

                    {((item.behavior && item.behavior.length > 0)
                        || (item.target_team && item.target_team.length > 0)
                        || (item.target_type && item.target_type.length > 0)
                        || (item.dmg_type !== null)
                        || (item.bkbpierce !== null)
                        || (item.dispellable !== null))
                        && (<div className="text-[11px] font-bold">
                        {/* 1. Behavior */}
                        {item.behavior && item.behavior.length > 0 && (
                            <div className="flex gap-1 text-[#808fa6]">
                                <span className="text-[#58606e]">Target:</span>
                                <span className="text-white">
                                    {item.behavior
                                        .filter(b => b !== Behavior.Hidden)
                                        .map(b => getBehaviorName(b))
                                        .join(' / ') || 'None'}
                                </span>
                            </div>
                        )}

                        {/* 2. Target Team */}
                        {item.target_team && item.target_team.length > 0 && (
                            <div className="flex gap-1 text-[#808fa6]">
                                <span className="text-[#58606e]">Affects:</span>
                                <span className="text-white">
                                    {item.target_team.map(t => getTargetTeamName(t)).join(' / ')}
                                </span>
                            </div>
                        )}

                        {/* 3. Unit Type */}
                        {item.target_type && item.target_type.length > 0 && (
                            <div className="flex gap-1 text-[#808fa6]">
                                <span className="text-[#58606e]">Units:</span>
                                <span className="text-white">
                                    {item.target_type.map(t => getTargetTypeName(t)).join(' / ')}
                                </span>
                            </div>
                        )}

                        {/* Damage Type */}
                        {item.dmg_type !== null && (
                            <div className="flex gap-1 text-[#808fa6]">
                                <span className="text-[#58606e]">Damage Type:</span>
                                <span className={clsx(getDamageTypeColor(item.dmg_type))}>
                                    {getDamageTypeName(item.dmg_type)}
                                </span>
                            </div>
                        )}

                        {/* Pierces BKB */}
                        {item.bkbpierce !== null && (
                            <div className="flex gap-1 text-[#808fa6]">
                                <span className="text-[#58606e]">Pierces Spell Immunity:</span>
                                <span className={item.bkbpierce === BooleanState.True ? "text-white" : "text-[#808fa6]"}>
                                    {item.bkbpierce === BooleanState.True ? 'Yes' : 'No'}
                                </span>
                            </div>
                        )}

                        {/* Dispellable */}
                        {item.dispellable !== null && (
                            <div className="flex gap-1 text-[#808fa6]">
                                <span className="text-[#58606e]">Dispellable:</span>
                                <span className="text-white">
                                    {getDispellableName(item.dispellable)}
                                </span>
                            </div>
                        )}
                    </div>)}

                    {/* Separator */}
                    {(item.target_team || item.target_type || item.behavior || item.dmg_type !== null || item.dispellable !== null) && (
                        <div className="border-b border-[#2e353b]"></div>
                    )}

                    {/* Attributes */}
                    {item.attrib && item.attrib.length > 0 && (
                        <div className="space-y-0.5">
                            {item.attrib
                                .filter(attr => attr.value !== "0" && attr.display?.includes("{value}"))
                                .map((attr, idx) => (
                                    <div key={idx} className="text-[#808fa6]">
                                        {attr.display ? (
                                            <span dangerouslySetInnerHTML={{
                                                __html: attr.display.replace('{value}', `<span class="text-white font-bold">${attr.value}</span>`)
                                            }} />
                                        ) : (
                                            <span>
                                                +<span className="text-white font-bold"> {attr.value}</span> {attr.key.replace(/_/g, ' ')}
                                            </span>
                                        )}
                                    </div>
                                ))}
                        </div>
                    )}

                    {/* Charges */}
                    {item.charges && (
                        <span className="block bg-[#1a242e] text-[#4070a0] px-1.5 py-0.5 rounded border border-[#4070a0]/30 w-fit text-[10px] font-bold">
                            Charges: {item.charges}
                        </span>
                    )}

                    {/* Abilities */}
                    {item.abilities && item.abilities.map((ability, idx) => {
                        const isActiveLike =
                            ability.type === AbilityType.Active
                            || ability.type === AbilityType.Toggle
                            || ability.type === AbilityType.Use;

                        return (
                            <div key={idx} className="bg-[#15171c] p-2 rounded border border-[#2e353b] space-y-1">
                                <div className="flex justify-between items-center">
                                    <span className={clsx(
                                        "font-bold text-xs tracking-wider",
                                        isActiveLike ? "text-white" : "text-[#808fa6]"
                                    )}>
                                        {getAbilityTypeName(ability.type)}: {ability.title}
                                    </span>

                                    {/* Cost Icons */}
                                    {isActiveLike && (
                                        <div className="flex gap-2">
                                            {item.mc && (
                                                <div className="flex items-center gap-0.5 text-[#0099ff] font-bold text-xs">
                                                    <Icon src="/assets/images/ability_manacost.png" size={4} />
                                                    {item.mc}
                                                </div>
                                            )}
                                            {item.hc && (
                                                <div className="flex items-center gap-0.5 text-[#e03e2e] font-bold text-xs">
                                                    <Icon src="/assets/images/ability_healthcost.png" size={4} />
                                                    {item.hc}
                                                </div>
                                            )}
                                            {item.cd && (
                                                <div className="flex items-center gap-0.5 text-[#fff] font-bold text-xs opacity-70">
                                                    <Icon src="/assets/images/ability_cooldown.png" size={4} />
                                                    {item.cd}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <p className="text-[#808fa6] text-xs leading-relaxed whitespace-pre-line">
                                    {ability.description.replace(/<[^>]*>?/gm, '')}
                                </p>
                            </div>
                        );
                    })}

                    {/* Notes */}
                    {item.notes && (
                        <div className="text-[#556b2f] text-xs italic bg-[#1a2e1a]/20 p-2 rounded border border-[#556b2f]/30">
                            {item.notes}
                        </div>
                    )}

                    {/* Lore */}
                    {item.lore && (
                        <div className="text-[#596b85] text-xs italic border-t border-[#2e353b] pt-2 mt-2">
                            {item.lore}
                        </div>
                    )}

                    {/* Components */}
                    {item.components && item.components.length > 0 && (
                        <div className="border-t border-[#2e353b] pt-2">
                            <div className="text-[10px] text-[#58606e] mb-1 tracking-wider font-bold">Components</div>
                            <div className="flex flex-wrap gap-2">
                                {item.components.map((compName) => (
                                    <ItemComponent key={compName} itemName={compName} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Arrow */}
            <div
                className={clsx(
                    "absolute w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent",
                    showBelow
                        ? "top-[-6px] border-b-[6px] border-b-[#101216]"
                        : "bottom-[-6px] border-t-[6px] border-t-[#1a1d24]"
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
