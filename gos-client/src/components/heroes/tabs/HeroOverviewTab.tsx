import React from 'react';
import {
    calculateArmor, calculateDamage, calculateMagicResistance, getStatsIcon
} from "../../../utils/heroUtils.ts";
import { type HeroInfo, HeroPrimaryAttribute } from "../../../types/heroes.ts";
import { ExpandableBio } from "../ExpandableBio.tsx";
import { AttributeBox } from "../AttributeBox.tsx";
import { StatRow } from "../StatRow.tsx";
import { useHeroAbilities } from "../../../hooks/queries/useHeroAbilities.ts";
import { FacetsSection } from "../FacetsSection.tsx";
import {TalentTree} from "../TalentTree.tsx";
import {AbilitiesSection} from "../AbilitiesSection.tsx";

export interface HeroOverviewTabProps {
    hero: HeroInfo;
}

export const HeroOverviewTab: React.FC<HeroOverviewTabProps> = ({ hero }) => {
    const damage = calculateDamage(hero);
    const armor = calculateArmor(hero);
    const magicResist = calculateMagicResistance(hero);

    const { data: abilitiesData } = useHeroAbilities(hero.name);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
            {/* 3.1 BIOGRAPHY (Top Section) */}
            <div className="mb-6">
                <ExpandableBio lore={hero.lore} />
            </div>

            {/* 3.2 MAIN GRID (Stats & Abilities) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* LEFT: Stats */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Attributes */}
                    <div className="grid grid-cols-3 gap-2">
                        <AttributeBox hero={hero} type={HeroPrimaryAttribute.Strength} />
                        <AttributeBox hero={hero} type={HeroPrimaryAttribute.Agility} />
                        <AttributeBox hero={hero} type={HeroPrimaryAttribute.Intelligence} />
                    </div>

                    {/* Combat Stats */}
                    <div className="bg-[#15171c] border border-[#2e353b] rounded-xl overflow-hidden shadow-lg">
                        <div className="bg-[#1a1d24] px-4 py-3 border-b border-[#2e353b] flex items-center justify-between">
                            <h3 className="text-xs font-bold text-[#e3e3e3] uppercase tracking-wider">Combat Stats</h3>
                            <span className="text-[10px] text-[#58606e] font-mono bg-[#0f1114] px-1.5 py-0.5 rounded">Lvl 1</span>
                        </div>
                        <div className="p-4 space-y-6">
                            <div className="space-y-1">
                                <h4 className="text-[10px] text-[#58606e] uppercase font-bold tracking-widest mb-2 pl-1">Attack</h4>
                                <StatRow icon={getStatsIcon('attack')} label="Damage" value={`${damage.min}-${damage.max}`} />
                                <StatRow icon={getStatsIcon('attack_rate')} label="Attack Time" value={`${hero.attack_rate.toFixed(1)}s`} />
                                <StatRow icon={getStatsIcon('attack_range')} label="Range" value={hero.attack_range} />
                                <StatRow icon={getStatsIcon('projectile_speed')} label="Projectile" value={hero.projectile_speed || 'Instant'} />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-[10px] text-[#58606e] uppercase font-bold tracking-widest mb-2 pl-1">Defense</h4>
                                <StatRow icon={getStatsIcon('armor')} label="Armor" value={armor} />
                                <StatRow icon={getStatsIcon('base_magic_resistance')} label="Magic Resistance" value={`${magicResist}%`} />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-[10px] text-[#58606e] uppercase font-bold tracking-widest mb-2 pl-1">Mobility</h4>
                                <StatRow icon={getStatsIcon('move_speed')} label="Movement" value={hero.move_speed} />
                                <StatRow icon={getStatsIcon('turn_rate')} label="Turn Rate" value={hero.turn_rate?.toFixed(1) || '0.5'} />
                                <StatRow icon={getStatsIcon('vision')} label="Vision" value={`${hero.day_vision}/${hero.night_vision}`} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: Abilities & Future Content */}
                <div className="lg:col-span-9 space-y-8">

                    {/* --- 1. FACETS (NEW - TOP PRIORITY) --- */}
                    {abilitiesData && abilitiesData.facets && abilitiesData.facets.length > 0 && (
                        <FacetsSection facets={abilitiesData.facets} />
                    )}

                    {abilitiesData && abilitiesData.talents && abilitiesData.talents.length > 0 && (
                        <TalentTree talents={abilitiesData.talents} />
                    )}

                    {abilitiesData && (
                        <AbilitiesSection heroAbilities={abilitiesData} />
                    )}
                </div>
            </div>
        </div>
    );
};