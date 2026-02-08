import React, { useState, useMemo } from 'react';
import clsx from 'clsx';
import { useAbilities } from '../../hooks/queries/useAbilities';
import { Icon } from '../Icon';
import { Behavior, BooleanState } from '../../types/common';
import type { HeroAbility, Shard, AghanimScepter } from '../../types/heroAbility';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import {
    getBehaviorName,
    getDamageTypeColor,
    getDamageTypeName,
    getDispellableName,
    getTargetTeamName,
    getTargetTypeName
} from "../../utils/itemUtils";
import { getAbilityIconUrl } from "../../utils/abilityUtils";

interface Props {
    heroAbilities: HeroAbility;
}

type AbilityType = 'regular' | 'shard' | 'scepter';

interface SelectedAbilityInfo {
    key: string;
    type: AbilityType;
    specialData?: Shard | AghanimScepter;
}

const formatValue = (val: string | string[] | null) => {
    if (!val) return null;
    return Array.isArray(val) ? val.join('/') : val;
};

export const AbilitiesSection: React.FC<Props> = ({ heroAbilities }) => {
    const { getAbility, isLoading } = useAbilities();

    const abilityList = useMemo(() => {
        const list: SelectedAbilityInfo[] = [];

        const base = heroAbilities.abilities || [];
        const facetAbilities = heroAbilities.facets?.flatMap(f => f.abilities || []) || [];
        const uniqueNames = Array.from(new Set([...base, ...facetAbilities]));

        uniqueNames.forEach(name => {
            list.push({ key: name, type: 'regular' });
        });

        if (heroAbilities.shard) {
            list.push({
                key: heroAbilities.shard.shard_skill_name,
                type: 'shard',
                specialData: heroAbilities.shard
            });
        }

        if (heroAbilities.aghanim_scepter) {
            list.push({
                key: heroAbilities.aghanim_scepter.scepter_skill_name,
                type: 'scepter',
                specialData: heroAbilities.aghanim_scepter
            });
        }

        return list;
    }, [heroAbilities]);

    const [selectedAbilityInfo, setSelectedAbilityInfo] = useState<SelectedAbilityInfo | null>(() =>
        abilityList.length > 0 ? abilityList[0] : null
    );

    if (isLoading) return <LoadingSpinner />;

    const getDisplayData = () => {
        if (!selectedAbilityInfo) return null;

        const abilityData = getAbility(selectedAbilityInfo.key);
        if (!abilityData) return null;

        if (selectedAbilityInfo.type === 'shard') {
            const shardData = selectedAbilityInfo.specialData as Shard;
            return {
                ...abilityData,
                desc: shardData.shard_desc,
                video: shardData.video,
                headerTitle: "Upgrade from Aghanim's Shard",
                headerIcon: '/assets/images/shard_active.png'
            };
        }

        if (selectedAbilityInfo.type === 'scepter') {
            const scepterData = selectedAbilityInfo.specialData as AghanimScepter;
            return {
                ...abilityData,
                desc: scepterData.scepter_desc,
                video: scepterData.video,
                headerTitle: "Upgrade from Aghanim's Scepter",
                headerIcon: '/assets/images/scepter_active.png'
            };
        }

        return {
            ...abilityData,
            headerTitle: abilityData.is_innate === BooleanState.True ? 'Innate Ability' : undefined,
            headerIcon: undefined
        };
    };

    const selectedAbility = getDisplayData();

    return (
        <div className="space-y-8 animate-in fade-in duration-700">

            {/* --- 1. ABILITY ICONS ROW --- */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {abilityList.map((item) => {
                    const ability = getAbility(item.key);
                    if (!ability) return null;

                    const isSelected = selectedAbilityInfo?.key === item.key && selectedAbilityInfo?.type === item.type;
                    const iconSrc = getAbilityIconUrl(item.key, ability.is_innate, ability.img);

                    let borderClass = "border-[#2e353b]";
                    let activeBorderClass = "border-[#e7d291]";
                    let overlayIcon = null;

                    if (item.type === 'shard' || item.type === 'scepter') {
                        borderClass = "border-blue-500/50";
                        activeBorderClass = "border-blue-400";
                        overlayIcon = item.type === 'shard' ? '/assets/images/shard_active.png' : '/assets/images/scepter_active.png';
                    }

                    return (
                        <button
                            key={`${item.key}-${item.type}`}
                            onClick={() => setSelectedAbilityInfo(item)}
                            className={clsx(
                                "relative w-16 h-16 md:w-20 md:h-20 rounded-xl shadow-lg transition-all duration-300 group overflow-hidden",
                                isSelected
                                    ? `${activeBorderClass} shadow-[0_0_20px_rgba(231,210,145,0.4)] z-10 scale-110`
                                    : `${borderClass} opacity-60 hover:opacity-100 hover:scale-105 hover:border-[#58606e] grayscale hover:grayscale-0`
                            )}
                            title={ability.dname ?? "unknown"}
                        >
                            <Icon src={iconSrc ?? "unknown"} alt={item.key} fallbackSrc={"/assets/images/ability_unknown.png"}/>

                            {overlayIcon && (
                                <div className="absolute bottom-0 right-0 p-1">
                                    <img src={overlayIcon} className="w-6 h-6 object-contain" alt="Upgrade" />
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* --- 2. SELECTED ABILITY DETAILS --- */}
            {selectedAbility && (
                <div className="bg-[#15171c] border border-[#2e353b] rounded-xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">

                    {/* VIDEO HEADER (If available) */}
                    {selectedAbility.video && (
                        <div className="relative w-full bg-black border-b border-[#2e353b] aspect-video max-h-[50vh]">
                            <video
                                src={selectedAbility.video}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <div className="p-4 md:p-6 relative">
                        {/* Header Info */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-[#2e353b] pb-4">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded shadow-lg overflow-hidden shrink-0">
                                    <Icon src={getAbilityIconUrl(selectedAbilityInfo?.key ?? null, selectedAbility.is_innate, selectedAbility.img) ?? "unknown"} fallbackSrc={"/assets/images/ability_unknown.png"} />
                                </div>
                                <div>
                                    {selectedAbility.headerTitle && (
                                        <div className="flex items-center gap-2 mb-1 animate-pulse">
                                            {selectedAbility.headerIcon && (<Icon src={selectedAbility.headerIcon} size={4} />)}
                                            <span className={clsx(
                                                "text-[10px] font-bold uppercase tracking-[0.2em]",
                                                selectedAbilityInfo?.type === 'shard' || selectedAbilityInfo?.type === 'scepter'
                                                    ? "text-blue-400"
                                                    : "text-[#e7d291]"
                                            )}>
                                                {selectedAbility.headerTitle}
                                            </span>
                                        </div>
                                    )}
                                    <h3 className="text-3xl md:text-4xl font-serif font-black text-white uppercase tracking-wider drop-shadow-lg leading-none">
                                        {selectedAbility.dname}
                                    </h3>
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
                                    <div className="flex items-center gap-1.5 text-white font-bold font-mono text-sm px-2 py-1 rounded">
                                        <Icon src="/assets/images/ability_cooldown.png" size={4} />
                                        <span>{formatValue(selectedAbility.cd)}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        {selectedAbility.desc !== null && selectedAbility.desc !== "" && (<p className="text-[#e3e3e3] text-sm md:text-base leading-relaxed bg-[#0f1114]/50 p-4 rounded border border-[#2e353b] mb-6">
                            {selectedAbility.desc}
                        </p>)}

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
                            <div className="text-[#596b85] text-lg italic border-t border-[#2e353b] pt-4 mt-2 leading-relaxed text-center font-serif">
                                "{selectedAbility.lore}"
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
