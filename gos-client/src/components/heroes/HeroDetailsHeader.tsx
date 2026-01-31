import React from 'react';
import {
    calculateHealth, calculateHealthRegen, calculateMana, calculateManaRegen,
    getAttributeIconInfo,
    getHeroRoleName,
    isMelee
} from '../../utils/heroUtils';
import type {HeroInfo} from "../../types/heroes.ts";
import {Icon} from "../Icon.tsx";

interface HeroHeaderProps {
    hero: HeroInfo;
}

export const HeroDetailsHeader: React.FC<HeroHeaderProps> = ({ hero }) => {
    const primaryAttrIcon = getAttributeIconInfo(hero.primary_attr);
    const hp = calculateHealth(hero);
    const mp = calculateMana(hero);
    const hpRegen = calculateHealthRegen(hero);
    const mpRegen = calculateManaRegen(hero);

    return (
        <section className="relative w-full h-[55vh] min-h-[500px] max-h-[700px] overflow-hidden group border-b border-[#2e353b]">
            {/* Video Background */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <video
                    autoPlay muted loop playsInline
                    poster={hero.img}
                    className="w-full h-full object-cover object-top scale-105 filter brightness-[0.5] group-hover:brightness-[0.6] transition-all duration-1000"
                    src={hero.video}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1114] via-[#0f1114]/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f1114]/90 via-[#0f1114]/30 to-transparent"></div>
                <div className="absolute inset-0 bg-[url('/assets/images/dots.png')] opacity-20 mix-blend-overlay"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 h-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-end pb-8 gap-8">

                {/* Left: Hero Identity & Portrait */}
                <div className="flex flex-col md:flex-row items-end gap-6 w-full">

                    {/* Hero Portrait Card (Image + HP/MP) */}
                    {/* Hero Portrait Card (Image + HP/MP) */}
                    <div className="relative shrink-0 w-32 md:w-48 lg:w-56 rounded-lg shadow-2xl overflow-hidden border border-[#2e353b] bg-[#15171c] group/card transform transition-transform hover:scale-105 duration-300">
                        <div className="aspect-[16/9] w-full relative">
                            <img src={hero.img} alt={hero.localized_name} className="w-full h-full object-cover" />
                            {/* Attribute Badge on Portrait */}
                            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm p-1.5 rounded border border-white/10 shadow-lg">
                                <img src={primaryAttrIcon.src} alt="Attr" className="w-5 h-5 drop-shadow" />
                            </div>
                        </div>

                        {/* HP/MP Bars in Portrait - Centered main value, regen on right */}
                        <div className="flex flex-col">
                            {/* HP Bar */}
                            <div className="relative h-8 bg-[#0f1114] border-t border-green-900 flex items-center justify-between overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-green-600 opacity-90" />
                                <span className="absolute left-1/2 transform -translate-x-1/2 z-10 font-mono font-bold text-sm text-white shadow-black drop-shadow-md">
                                    {hp}
                                </span>
                                <span className="relative z-10 font-mono font-bold text-xs text-green-200 px-3">
                                    +{hpRegen}
                                </span>
                            </div>

                            {/* MP Bar */}
                            <div className="relative h-8 bg-[#0f1114] border-t border-blue-900 flex items-center justify-between overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-600 opacity-90" />
                                <span className="absolute left-1/2 transform -translate-x-1/2 z-10 font-mono font-bold text-sm text-white shadow-black drop-shadow-md">
                                    {mp}
                                </span>
                                <span className="relative z-10 font-mono font-bold text-xs text-blue-200 px-3">
                                    +{mpRegen}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Text Info */}
                    <div className="flex flex-col mb-1 w-full">
                        {/* Attack Type & Roles */}
                        <div className="flex flex-wrap items-center gap-3 mb-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <span className="text-[#808fa6] text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                    <Icon size={4} src={isMelee(hero.attack_type) ? '/assets/images/melee.svg' : '/assets/images/ranged.svg'}/>
                                    {isMelee(hero.attack_type) ? 'Melee' : 'Ranged'}
                                </span>
                            <div className="h-4 w-px bg-[#2e353b]"></div>
                            <div className="flex gap-2">
                                {hero.roles.map(role => (
                                    <span key={role} className="text-[#e7d291] text-xs uppercase tracking-wide font-semibold opacity-80">
                                            {getHeroRoleName(role)}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-serif font-black text-white uppercase tracking-tight leading-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-95 duration-500 delay-100">
                            {hero.localized_name}
                        </h1>

                        <p className="text-[#808fa6] text-sm md:text-base font-serif italic mt-2 max-w-2xl line-clamp-2 md:line-clamp-1 opacity-80">
                            {hero.lore.split('.')[0]}...
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
