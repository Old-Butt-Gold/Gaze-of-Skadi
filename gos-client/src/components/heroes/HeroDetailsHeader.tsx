import React from 'react';
import {
    calculateHealth, calculateHealthRegen, calculateMana, calculateManaRegen,
    getAttributeIconInfo,
    getHeroRoleName,
    isMelee
} from '../../utils/heroUtils';
import type { HeroInfo } from "../../types/heroes";
import { Icon } from "../Icon";

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
        <section className="relative w-full bg-[#0f1114] border-b border-[#2e353b] overflow-hidden">

            <div className="absolute inset-0 w-full h-full z-0">
                {/* Background Image with Custom Blur */}
                <img
                    src={hero.img}
                    alt={hero.localized_name}
                    className="absolute inset-0 bg-no-repeat blur-[50px] h-[125%] w-[125%] object-cover opacity-50"
                />

                <div className="absolute inset-0 w-full left-[10vh] h-full z-0">
                {/* Video Overlay */}
                    <video
                        autoPlay muted loop playsInline
                        className="w-full h-full object-contain transition-opacity duration-700 opacity-70"
                        src={hero.video}
                    />
                </div>
            </div>

            {/* === 2. CONTENT CONTAINER (Left Aligned) === */}
            <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:h-[50vh] flex flex-col justify-center py-12 lg:py-0">

                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16">

                        {/* --- A. HERO CARD (Portrait & Stats) --- */}
                        <div className="shrink-0 relative group/card animate-in fade-in slide-in-from-left-8 duration-700">
                            {/* Glow Effect */}
                            <div className="absolute -inset-2 bg-gradient-to-br from-[#e7d291]/10 to-blue-500/10 rounded-2xl blur-lg opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

                            <div className="w-40 md:w-56 rounded-xl overflow-hidden border border-[#2e353b] bg-[#1a1d24] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] relative z-10 transform transition-transform duration-500 hover:scale-[1.02]">
                                {/* Portrait */}
                                <div className="w-full relative overflow-hidden">
                                    <img
                                        src={hero.img}
                                        alt={hero.localized_name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                                    />
                                    {/* Primary Attribute Badge */}
                                    <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md p-1.5 rounded-lg border border-white/10 shadow-lg">
                                        <Icon src={primaryAttrIcon.src} alt={"Attr"} size={6} />
                                    </div>
                                </div>

                                {/* HP/MP Bars */}
                                <div className="flex flex-col border-t border-black">
                                    {/* HP */}
                                    <div className="h-8 bg-[#121417] border-b border-black/40 flex items-center justify-between px-3 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-green-700 opacity-90 w-[100%]" />
                                        <span className="relative z-10 font-mono font-bold text-sm text-white drop-shadow-md">+ {hpRegen}</span>
                                        <span className="relative z-10 font-mono text-sm font-bold text-green-200">{hp}</span>
                                    </div>
                                    {/* MP */}
                                    <div className="h-8 bg-[#121417] flex items-center justify-between px-3 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700 opacity-90 w-[100%]" />
                                        <span className="relative z-10 font-mono font-bold text-sm text-white drop-shadow-md">+ {mpRegen}</span>
                                        <span className="relative z-10 font-mono text-sm font-bold text-blue-200">{mp}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- B. HERO INFO (Text) --- */}
                        <div className="flex flex-col space-y-4 max-w-2xl">

                            {/* 1. Roles & Type */}
                            <div className="flex flex-wrap items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                {/* Attack Type */}
                                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded border border-white/10 backdrop-blur-sm">
                                    <Icon size={4} src={isMelee(hero.attack_type) ? '/assets/images/melee.svg' : '/assets/images/ranged.svg'} />
                                    <span className="text-[#e7d291] text-xs font-bold uppercase tracking-widest">
                                        {isMelee(hero.attack_type) ? 'Melee' : 'Ranged'}
                                    </span>
                                </div>
                                <div className="w-px h-6 bg-[#2e353b] hidden sm:block" />
                                {/* Roles */}
                                <div className="flex flex-wrap gap-2">
                                    {hero.roles.map((role) => (
                                        <span key={role} className="text-[#808fa6] text-[10px] font-bold uppercase tracking-wider px-2 py-1.5 bg-black/40 rounded border border-[#2e353b]">
                                            {getHeroRoleName(role)}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* 2. Hero Name */}
                            <div className="relative">
                                <h1 className="text-5xl md:text-7xl lg:text-7xl font-serif font-black text-white uppercase tracking-tighter leading-none drop-shadow-[0_4px_10px_rgba(0,0,0,1)] animate-in fade-in zoom-in-95 duration-500 delay-100">
                                    {hero.localized_name}
                                </h1>
                            </div>

                            {/* 3. Short Lore */}
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                                <p className="text-[#a3aab8] text-lg font-serif italic leading-relaxed border-l-4 border-[#e7d291] pl-6 py-2 bg-gradient-to-r from-[#e7d291]/5 to-transparent rounded-r-lg max-w-lg">
                                    "{hero.lore.split(' ').slice(0, 15).join(' ') + (hero.lore.split(' ').length > 15 ? '...' : '')}"
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
