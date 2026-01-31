import {
    calculateArmor, calculateDamage, calculateMagicResistance, getStatsIcon
} from "../../../utils/heroUtils.ts";
import {type HeroInfo, HeroPrimaryAttribute} from "../../../types/heroes.ts";
import {ExpandableBio} from "../ExpandableBio.tsx";
import {AttributeBox} from "../AttributeBox.tsx";
import {StatRow} from "../StatRow.tsx";

export interface HeroOverviewTabProps {
    hero: HeroInfo;
}

export const HeroOverviewTab: React.FC<HeroOverviewTabProps> = ({ hero }) => {
    // Calculations
    const damage = calculateDamage(hero);
    const armor = calculateArmor(hero);
    const magicResist = calculateMagicResistance(hero);

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
                    {/* Abilities (Placeholder with Style) */}
                    <div className="bg-[#15171c] border border-[#2e353b] rounded-xl p-8 relative overflow-hidden min-h-[300px] flex flex-col justify-center items-center text-center shadow-lg group">
                        <div className="absolute inset-0 bg-[url('/assets/images/ability_bg_texture.png')] opacity-5 mix-blend-overlay pointer-events-none group-hover:opacity-10 transition-opacity" />
                        <div className="w-20 h-20 rounded-full bg-[#2e353b]/30 flex items-center justify-center mb-4 border border-[#2e353b] shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                            <span className="text-4xl opacity-40 grayscale group-hover:grayscale-0 transition-all duration-500">⚡</span>
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-[#e7d291] uppercase tracking-widest mb-2">Abilities</h3>
                        <p className="text-[#808fa6] max-w-md text-sm">Detailed ability breakdown, mana costs, and cooldowns are currently being parsed from the Ancient.</p>
                        <span className="mt-6 px-4 py-1.5 bg-[#2e353b] text-[#58606e] text-[10px] uppercase font-bold tracking-widest rounded border border-white/5">Work in Progress</span>
                    </div>

                    {/* Talent Tree / Facets Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-[#15171c]/50 border border-[#2e353b] border-dashed rounded-xl p-6 flex flex-col items-center justify-center h-48 group hover:bg-[#15171c] hover:border-[#e7d291]/30 transition-all cursor-default">
                            <span className="text-4xl text-[#58606e] mb-3 group-hover:text-[#e7d291] group-hover:scale-110 transition-all duration-300">❖</span>
                            <h4 className="text-[#e3e3e3] font-bold uppercase tracking-wider text-sm">Facets</h4>
                            <p className="text-[#58606e] text-xs mt-1">Gameplay Aspects</p>
                        </div>
                        <div className="bg-[#15171c]/50 border border-[#2e353b] border-dashed rounded-xl p-6 flex flex-col items-center justify-center h-48 group hover:bg-[#15171c] hover:border-[#e7d291]/30 transition-all cursor-default">
                            <span className="text-4xl text-[#58606e] mb-3 group-hover:text-[#e7d291] group-hover:scale-110 transition-all duration-300">🌳</span>
                            <h4 className="text-[#e3e3e3] font-bold uppercase tracking-wider text-sm">Talent Tree</h4>
                            <p className="text-[#58606e] text-xs mt-1">Level Progression</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
