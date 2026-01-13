import React, { useState, useRef, useEffect } from 'react';
import { useHeroes } from '../../hooks/queries/useHeroes';
import {
    getAttributeColor,
    getAttributeIconInfo,
    getAttributeName,
    getThemeColor,
    isMelee,
    calculateHealth,
    calculateHealthRegen,
    calculateMana,
    calculateManaRegen,
    calculateArmor,
    calculateDamage,
    getHeroRoleName
} from '../../utils/heroUtils';
import clsx from 'clsx';
import { HeroPrimaryAttribute } from "../../types/heroes.ts";
import { Icon } from "../Icon.tsx";

interface Props {
    heroId: number;
    children: React.ReactNode;
}

export const HeroTooltip: React.FC<Props> = ({ heroId, children }) => {
    const { getHero, isLoading } = useHeroes();
    const hero = getHero(heroId);

    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [showBelow, setShowBelow] = useState(false);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isVisible) {
            const onScroll = () => setIsVisible(false);
            window.addEventListener('scroll', onScroll, true);
            return () => window.removeEventListener('scroll', onScroll, true);
        }
    }, [isVisible]);

    if (isLoading || !hero) {
        return <div className="inline-block relative">{children}</div>;
    }

    const attrColor = getAttributeColor(hero.primary_attr);
    const themeClasses = getThemeColor(hero.primary_attr);
    const attributeIcon = getAttributeIconInfo(hero.primary_attr);

    const hp = calculateHealth(hero);
    const hpRegen = calculateHealthRegen(hero);
    const mp = calculateMana(hero);
    const mpRegen = calculateManaRegen(hero);
    const armor = calculateArmor(hero);
    const damage = calculateDamage(hero);

    const handleMouseEnter = () => {
        if (!triggerRef.current) return;

        const rect = triggerRef.current.getBoundingClientRect();
        const tooltipHeight = 350; // Estimated height of the tooltip card
        const spaceAbove = rect.top;

        // Check if there is enough space above
        const isBelow = spaceAbove < tooltipHeight;
        setShowBelow(isBelow);

        setPosition({
            // If showing below, position top at bottom of element + margin
            // If showing above, position top at top of element - margin
            top: isBelow ? rect.bottom + 10 : rect.top - 10,
            left: rect.left + (rect.width / 2)
        });
        setIsVisible(true);
    };

    const handleMouseLeave = () => {
        setIsVisible(false);
    };

    return (
        <div className="inline-block" ref={triggerRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {children}

            {isVisible && (
                <div
                    className="fixed z-[9999] pointer-events-none transition-opacity duration-200 ease-in-out"
                    style={{
                        top: position.top,
                        left: position.left,
                        // If showing below, translate down from the top position (0%)
                        // If showing above, translate up from the top position (-100%)
                        transform: `translate(-50%, ${showBelow ? '0%' : '-100%'})`,
                        opacity: isVisible ? 1 : 0
                    }}
                >
                    <div className={clsx(
                        "w-[300px] bg-slate-900 rounded-xl overflow-hidden border ring-1 ring-black/80 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]",
                        themeClasses
                    )}>
                        {/* ... (Rest of your tooltip content remains the same) ... */}
                        {/* 1. Hero Image Header */}
                        <div className="relative h-36 w-full bg-black">
                            <img
                                src={hero.img}
                                alt={hero.localized_name}
                                className="w-full h-full object-cover opacity-90"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>

                            {/* Hero Name & Attribute */}
                            <div className="absolute bottom-2 left-4 right-4">
                                <h4 className="text-white font-bold text-lg leading-none drop-shadow-md tracking-wide">
                                    {hero.localized_name}
                                </h4>
                                <div className="flex items-center gap-2 mt-1">
                                <span className={clsx("text-xs font-bold uppercase tracking-wider flex items-center gap-1", attrColor)}>
                                   {/* Attribute Icon (Generic Circle for now) */}
                                    {<Icon src={attributeIcon.src} alt={attributeIcon.alt} size={4}/>}
                                    {getAttributeName(hero.primary_attr)}
                                </span>
                                    <span className="text-slate-400 text-[12px] uppercase tracking-wider border-l border-slate-600 pl-2">
                                  {isMelee(hero.attack_type) ? 'Melee' : 'Ranged'}
                                </span>
                                </div>
                            </div>
                        </div>

                        {/* 2. Stats Grid */}
                        <div className="p-2 bg-slate-900 space-y-3">
                            {/* Health & Mana Bars */}
                            <div className="space-y-1 font-mono text-[10px] font-bold">
                                {/* HP */}
                                <div className="relative h-6 bg-slate-950 rounded border border-green-900/50 overflow-hidden flex items-center justify-between px-2 shadow-inner">
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-green-600 to-green-900 w-full opacity-80"></div>
                                    <span className="relative z-10 text-white drop-shadow-md">HP</span>
                                    <span className="relative z-10 text-white drop-shadow-md">
                                    {hp} <span className="text-green-200 opacity-80">+{hpRegen}</span>
                                </span>
                                </div>
                                {/* MP */}
                                <div className="relative h-6 bg-slate-950 rounded border border-blue-900/50 overflow-hidden flex items-center justify-between px-2 shadow-inner">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-900 w-full opacity-80"></div>
                                    <span className="relative z-10 text-white drop-shadow-md">MP</span>
                                    <span className="relative z-10 text-white drop-shadow-md">
                                        {mp} <span className="text-blue-200 opacity-80">+{mpRegen}</span>
                                    </span>
                                </div>
                            </div>

                            {/* Attributes Growth */}
                            <div className="grid grid-cols-3 divide-x divide-slate-700/50">
                                {/* STR */}
                                <div className="flex flex-col items-center justify-center gap-0.5">
                                    <div className="flex items-center gap-1.5 opacity-90">
                                        <Icon src={getAttributeIconInfo(HeroPrimaryAttribute.Strength).src} alt="STR" size={4} />
                                        <span className="text-slate-200 font-bold text-sm">{hero.base_str}</span>
                                    </div>
                                    <span className="text-[12px] text-slate-500 font-mono">+{hero.str_gain.toFixed(1)}</span>
                                </div>
                                {/* AGI */}
                                <div className="flex flex-col items-center justify-center gap-0.5">
                                    <div className="flex items-center gap-1.5 opacity-90">
                                        <Icon src={getAttributeIconInfo(HeroPrimaryAttribute.Agility).src} alt="AGI" size={4} />
                                        <span className="text-slate-200 font-bold text-sm">{hero.base_agi}</span>
                                    </div>
                                    <span className="text-[12px] text-slate-500 font-mono">+{hero.agi_gain.toFixed(1)}</span>
                                </div>
                                {/* INT */}
                                <div className="flex flex-col items-center justify-center gap-0.5">
                                    <div className="flex items-center gap-1.5 opacity-90">
                                        <Icon src={getAttributeIconInfo(HeroPrimaryAttribute.Intelligence).src} alt="INT" size={4} />
                                        <span className="text-slate-200 font-bold text-sm">{hero.base_int}</span>
                                    </div>
                                    <span className="text-[12px] text-slate-500 font-mono">+{hero.int_gain.toFixed(1)}</span>
                                </div>
                            </div>

                            {/* Combat Stats (Calculated) */}
                            <div className="flex justify-around items-center px-1">
                                <div className="text-center">
                                    <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">Attack</div>
                                    <div className="flex items-center justify-center gap-1.5 text-slate-200 font-semibold text-sm bg-white/5 rounded py-0.5 border border-white/5">
                                        {/* <Icon src={getStatsIcon('attack')} alt={'attack'} size={4}/> */}
                                        {/* Assuming getStatsIcon is imported or available */}
                                        <span>{damage.min}-{damage.max}</span>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">Armor</div>
                                    <div className="flex items-center justify-center gap-1.5 text-slate-200 font-semibold text-sm bg-white/5 rounded py-0.5 border border-white/5">
                                        {/* <Icon src={getStatsIcon('armor')} alt={'armor'} size={4}/> */}
                                        <span>{armor}</span>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">Speed</div>
                                    <div className="flex items-center justify-center gap-1.5 text-slate-200 font-semibold text-sm bg-white/5 rounded py-0.5 border border-white/5">
                                        {/* <Icon src={getStatsIcon("move_speed")} alt={'speed'} size={4}/> */}
                                        <span>{hero.move_speed}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Roles */}
                            <div className="border-t border-slate-700/50 pt-2 flex flex-wrap gap-1 justify-center">
                                {hero.roles.slice(0, 5).map(role => (
                                    <span key={role} className="px-1.5 py-0.5 rounded-[2px] text-[9px] uppercase font-bold tracking-wider bg-[#232730] text-[#808fa6] border border-white/5">
                                        {getHeroRoleName(role)}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Arrow */}
                    <div
                        className={clsx(
                            "absolute left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent drop-shadow-md",
                            showBelow
                                ? "top-[-6px] border-b-[6px] border-b-slate-900" // Arrow points up if showing below
                                : "bottom-[-6px] border-t-[6px] border-t-slate-900" // Arrow points down if showing above
                        )}
                    ></div>
                </div>
            )}
        </div>
    );
};
