import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useAbilities } from '../../hooks/queries/useAbilities';
import { Icon } from '../Icon';
import {Behavior, BooleanState} from '../../types/common';
import type { HeroAbility } from '../../types/heroAbility';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import {
    getBehaviorName,
    getDamageTypeColor,
    getDamageTypeName,
    getDispellableName,
    getTargetTeamName, getTargetTypeName
} from "../../utils/itemUtils.ts";

interface Props {
    heroAbilities: HeroAbility;
}

const formatValue = (val: string | string[] | null) => {
    if (!val) return null;
    return Array.isArray(val) ? val.join('/') : val;
};

export const AbilitiesSection: React.FC<Props> = ({ heroAbilities }) => {
    const { getAbility, isLoading } = useAbilities();

    const allAbilityNames = React.useMemo(() => {
        const base = heroAbilities.abilities || [];
        const facetAbilities = heroAbilities.facets?.flatMap(f => f.abilities || []) || [];
        return Array.from(new Set([...base, ...facetAbilities]));
    }, [heroAbilities]);

    const [selectedAbilityName, setSelectedAbilityName] = useState<string | null>(null);

    // Устанавливаем первую способность активной по умолчанию
    useEffect(() => {
        if (allAbilityNames.length > 0 && !selectedAbilityName) {
            setSelectedAbilityName(allAbilityNames[0]);
        }
    }, [allAbilityNames, selectedAbilityName]);

    if (isLoading) return <LoadingSpinner />;

    const selectedAbility = getAbility(selectedAbilityName);

    return (
        <div className="space-y-6">

            {/* --- 1. ABILITY ICONS ROW --- */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {allAbilityNames.map((name) => {
                    const ability = getAbility(name);
                    if (!ability) return null;

                    const isSelected = name === selectedAbilityName;
                    const isInnate = ability.is_innate === BooleanState.True;

                    // Fallback icons
                    const iconSrc = isInnate
                        ? '/assets/images/innate_icon.png'
                        : ability.img;

                    return (
                        <button
                            key={name}
                            onClick={() => setSelectedAbilityName(name)}
                            className={clsx(
                                "relative w-16 h-16 md:w-20 md:h-20 rounded shadow-lg transition-all duration-300 group overflow-hidden",
                                isSelected
                                    ? "scale-110 z-10 shadow-[0_0_15px_rgba(231,210,145,0.4)]"
                                    : "opacity-60 hover:opacity-100 hover:scale-105 hover:border-[#58606e] grayscale hover:grayscale-0"
                            )}
                            title={ability.dname ?? "unknown"}
                        >
                            <Icon src={iconSrc ?? "unknown"} />
                        </button>
                    );
                })}
            </div>

            {/* --- 2. SELECTED ABILITY DETAILS --- */}
            {selectedAbility && (
                <div className="bg-[#15171c] border border-[#2e353b] rounded-xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">

                    {/* VIDEO HEADER (If available) */}
                    {selectedAbility.video && (
                        <div className="relative w-full bg-black border-b border-[#2e353b]">
                            <video
                                src={selectedAbility.video}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover opacity-80"
                            />
                        </div>
                    )}

                    <div className="p-6 md:p-8 relative">
                        {/* Header Info */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-[#2e353b] pb-4">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded border border-[#2e353b] shadow-lg overflow-hidden shrink-0">
                                    <img
                                        src={selectedAbility.img ?? (selectedAbility.is_innate === BooleanState.True ? '/assets/images/innate_icon.png' : '/assets/images/spell_placeholder.png')}
                                        alt={selectedAbility.dname ?? "Ability"}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-serif font-bold text-white uppercase tracking-widest drop-shadow-md">
                                        {selectedAbility.dname}
                                    </h3>
                                    {selectedAbility.is_innate === BooleanState.True && (
                                        <span className="text-[#e7d291] text-xs font-bold uppercase tracking-widest">Innate Ability</span>
                                    )}
                                </div>
                            </div>

                            {/* Costs & CD */}
                            <div className="flex items-center gap-4">
                                {selectedAbility.mc && (
                                    <div className="flex items-center gap-1.5 font-bold font-mono text-sm px-2 py-1 rounded">
                                        <Icon src="/assets/images/ability_manacost.png" size={4} />
                                        <span>{formatValue(selectedAbility.mc)}</span>
                                    </div>
                                )}
                                {selectedAbility.cd && (
                                    <div className="flex items-center gap-1.5 text-white font-bold font-mono text-sm bg-white/10 px-2 py-1 rounded">
                                        <Icon src="/assets/images/ability_cooldown.png" size={4} />
                                        <span>{formatValue(selectedAbility.cd)}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-[#e3e3e3] text-sm md:text-base leading-relaxed bg-[#0f1114]/50 p-4 rounded border border-[#2e353b] mb-6">
                            {selectedAbility.desc}
                        </p>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-xs md:text-sm font-bold text-[#808fa6] mb-6">
                            {/* Behavior */}
                            {selectedAbility.behavior !== null && (
                                <div className="flex justify-between border-b border-[#2e353b]/50 py-1">
                                    <span className="text-[#58606e] uppercase">Ability:</span>
                                    <span className="text-white text-right">
                                        {Array.isArray(selectedAbility.behavior)
                                            ? selectedAbility.behavior.filter(x => x !== Behavior.Hidden)
                                                .map(b => getBehaviorName(b)).join(' / ')
                                            : getBehaviorName(selectedAbility.behavior)}
                                    </span>
                                </div>
                            )}

                            {/* Target Team/Type */}
                            {selectedAbility.target_team != null && (
                                <div className="flex justify-between border-b border-[#2e353b]/50 py-1">
                                    <span className="text-[#58606e] uppercase">Affects:</span>
                                    <span className="text-white text-right">
                                        {Array.isArray(selectedAbility.target_team)
                                            ? selectedAbility.target_team.map(t => getTargetTeamName(t)).join(' / ')
                                            : getTargetTeamName(selectedAbility.target_team)}
                                    </span>
                                </div>
                            )}

                            {/* Damage Type */}
                            {selectedAbility.dmg_type != null && (
                                <div className="flex justify-between border-b border-[#2e353b]/50 py-1">
                                    <span className="text-[#58606e] uppercase">Damage Type:</span>
                                    <span className={clsx("text-right", getDamageTypeColor(selectedAbility.dmg_type))}>
                                        {getDamageTypeName(selectedAbility.dmg_type)}
                                    </span>
                                </div>
                            )}

                            {selectedAbility.target_type && selectedAbility.target_type.length > 0 && (
                                <div className="flex justify-between border-b border-[#2e353b]/50 py-1">
                                    <span className="text-[#58606e]">Units:</span>
                                    <span className="text-white">
                                        {selectedAbility.target_type.map(t => getTargetTypeName(t)).join(' / ')}
                                    </span>
                                </div>
                            )}

                            {/* BKB & Dispellable */}
                            {selectedAbility.bkbpierce != null && (
                                <div className="flex justify-between border-b border-[#2e353b]/50 py-1">
                                    <span className="text-[#58606e] uppercase">Pierces Spell Immunity:</span>
                                    <span className={selectedAbility.bkbpierce === BooleanState.True ? "text-white" : "text-[#808fa6]"}>
                                        {selectedAbility.bkbpierce === BooleanState.True ? 'Yes' : 'No'}
                                    </span>
                                </div>
                            )}

                            {selectedAbility.dispellable !== null && (
                                <div className="flex justify-between border-b border-[#2e353b]/50 py-1">
                                    <span className="text-[#58606e] uppercase">Dispellable:</span>
                                    <span className="text-white text-right">
                                        {getDispellableName(selectedAbility.dispellable)}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Dynamic Attributes */}
                        {selectedAbility.attrib && selectedAbility.attrib.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                                {selectedAbility.attrib.filter(x => !(x.value.length == 1 && x.value[0] === "0")).map((attr, idx) => (
                                    <div key={idx} className="bg-[#0f1114] border border-[#2e353b] p-2 rounded flex flex-col items-center text-center justify-center">
                                        <span className="text-[10px] text-[#58606e] font-bold uppercase tracking-wider mb-1">
                                            {attr.header.replace(':', '')}
                                        </span>
                                        <span className="text-white font-mono font-bold text-xs">
                                            {Array.isArray(attr.value) ? attr.value.join(' / ') : attr.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Lore */}
                        {selectedAbility.lore && (
                            <div className="text-[#596b85] text-sm italic border-t border-[#2e353b] pt-4 mt-2 leading-relaxed text-center font-serif">
                                "{selectedAbility.lore}"
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};