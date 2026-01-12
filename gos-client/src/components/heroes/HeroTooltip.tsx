import React from 'react';
import { useHeroes } from '../../hooks/queries/useHeroes';
import {
    getAttributeColor,
    getAttributeName,
    getHeroRoleName,
    getStatsIcon,
    getThemeColor,
    isMelee
} from '../../utils/heroUtils';
import clsx from 'clsx';
import {AttributeIcon} from "./AttributeIcon.tsx";
import {HeroPrimaryAttribute} from "../../types/heroes.ts";

interface Props {
    heroId: number;
    children: React.ReactNode;
}

export const HeroTooltip: React.FC<Props> = ({ heroId, children }) => {
    const { getHero, isLoading } = useHeroes();
    const hero = getHero(heroId);

    // Fallback, если данные еще грузятся или героя нет
    if (isLoading || !hero) {
        return <div className="relative group">{children}</div>;
    }

    const attrColor = getAttributeColor(hero.primary_attr);
    const themeClasses = getThemeColor(hero.primary_attr);

    return (
        <div className="relative group/tooltip">
            {children}

            {/* Tooltip Container - Absolute positioning relative to the trigger */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-[280px] opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 z-50 pointer-events-none transform translate-y-2 group-hover/tooltip:translate-y-0">

                {/* Card Body */}
                <div className={clsx(
                    "bg-slate-900/95 backdrop-blur-md rounded-xl overflow-hidden border ring-1 ring-black/80",
                    themeClasses // Цветная подсветка границ
                )}>

                    {/* 1. Hero Image Header */}
                    <div className="relative h-40 w-full">
                        <img
                            src={hero.img}
                            alt={hero.localized_name}
                            className="w-full h-full object-cover"
                        />
                        {/* Gradient Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

                        {/* Hero Name & Attribute */}
                        <div className="absolute bottom-3 left-4 right-4">
                            <h4 className="text-white font-bold text-lg leading-none drop-shadow-md tracking-wide">
                                {hero.localized_name}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={clsx("text-xs font-bold uppercase tracking-wider flex items-center gap-1", attrColor)}>
                                   {/* Attribute Icon (Generic Circle for now) */}
                                    {<AttributeIcon attr={hero.primary_attr}/>}
                                    {getAttributeName(hero.primary_attr)}
                                </span>
                                <span className="text-slate-400 text-[10px] uppercase tracking-wider border-l border-slate-600 pl-2">
                                  {isMelee(hero.attack_type) ? 'Melee' : 'Ranged'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 2. Stats Grid */}
                    <div className="p-4 space-y-4">

                        {/* Health & Mana Bars */}
                        <div className="space-y-1.5 font-mono text-[10px] font-bold">
                            {/* HP */}
                            <div className="relative h-6 bg-slate-950 rounded border border-green-900/50 overflow-hidden flex items-center justify-between px-2 shadow-inner">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-green-600 to-green-900 w-full opacity-80"></div>
                                <span className="relative z-10 text-white drop-shadow-md">HP</span>
                                <span className="relative z-10 text-white drop-shadow-md">
                                    {hero.base_health} <span className="text-green-200 opacity-80">+{hero.base_health_regen.toFixed(1)}</span>
                                </span>
                            </div>
                            {/* MP */}
                            <div className="relative h-6 bg-slate-950 rounded border border-blue-900/50 overflow-hidden flex items-center justify-between px-2 shadow-inner">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-900 w-full opacity-80"></div>
                                <span className="relative z-10 text-white drop-shadow-md">MP</span>
                                <span className="relative z-10 text-white drop-shadow-md">
                                    {hero.base_mana} <span className="text-blue-200 opacity-80">+{hero.base_mana_regen.toFixed(1)}</span>
                                </span>
                            </div>
                        </div>

                        {/* Attributes Growth */}
                        <div className="grid grid-cols-3 divide-x divide-slate-700/50 bg-white/5 rounded-lg border border-white/5 p-2">
                            {/* STR */}
                            <div className="flex flex-col items-center justify-center gap-0.5">
                                <div className="flex items-center gap-1.5">
                                    <AttributeIcon attr={HeroPrimaryAttribute.Strength} />
                                    <span className="text-slate-200 font-bold text-sm">{hero.base_str}</span>
                                </div>
                                <span className="text-[10px] text-slate-500 font-mono">+{hero.str_gain.toFixed(1)}</span>
                            </div>
                            {/* AGI */}
                            <div className="flex flex-col items-center justify-center gap-0.5">
                                <div className="flex items-center gap-1.5">
                                    <AttributeIcon attr={HeroPrimaryAttribute.Agility} />
                                    <span className="text-slate-200 font-bold text-sm">{hero.base_agi}</span>
                                </div>
                                <span className="text-[10px] text-slate-500 font-mono">+{hero.agi_gain.toFixed(1)}</span>
                            </div>
                            {/* INT */}
                            <div className="flex flex-col items-center justify-center gap-0.5">
                                <div className="flex items-center gap-1.5">
                                    <AttributeIcon attr={HeroPrimaryAttribute.Intelligence} />
                                    <span className="text-slate-200 font-bold text-sm">{hero.base_int}</span>
                                </div>
                                <span className="text-[10px] text-slate-500 font-mono">+{hero.int_gain.toFixed(1)}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center px-2 pt-1">
                            <div className="text-center group">
                                <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">Attack</div>
                                <div className="text-slate-200 font-semibold text-sm flex items-center justify-center gap-1">
                                    <img
                                        src={getStatsIcon('attack')}
                                        alt={"attack"}
                                        className="w-4 h-4 object-contain inline-block"
                                    />
                                    <span>{hero.base_attack_min}-{hero.base_attack_max}</span>
                                </div>
                            </div>
                            <div className="text-center group">
                                <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">Armor</div>
                                <div className="text-slate-200 font-semibold text-sm flex items-center justify-center gap-1">
                                    <img
                                        src={getStatsIcon('armor')}
                                        alt={"armor"}
                                        className="w-4 h-4 object-contain inline-block"
                                    />
                                    <span>{hero.base_armor.toFixed(1)}</span>
                                </div>
                            </div>
                            <div className="text-center group">
                                <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">Speed</div>
                                <div className="text-slate-200 font-semibold text-sm flex items-center justify-center gap-1">
                                    <img
                                        src={getStatsIcon('move_speed')}
                                        alt={"move_speed"}
                                        className="w-4 h-4 object-contain inline-block"
                                    />
                                    <span>{hero.move_speed}</span>
                                </div>
                            </div>
                        </div>

                        {/* Roles */}
                        <div className="border-t border-slate-700/50 pt-3 flex flex-wrap gap-1.5 justify-center">
                            {hero.roles.map(role => (
                                <span key={role} className="px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider bg-slate-800 text-slate-400 border border-slate-700">
                                    {getHeroRoleName(role)}
                                </span>
                            ))}
                        </div>

                    </div>
                </div>

                {/* Little Arrow pointing down */}
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-slate-700 mt-[-1px]"></div>
            </div>
        </div>
    );
};
