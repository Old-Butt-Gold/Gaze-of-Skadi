import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { Icon } from '../Icon';
import { useHeroes } from '../../hooks/queries/useHeroes';
import {
    BooleanState,
    GameMode,
    LobbyType,
    Patch,
    Region,
    LaneRole,
} from '../../types/common';
import type { PlayerEndpointParameters } from '../../types/player';
import {
    getGameModeName,
    getLobbyTypeName,
    getRegionName,
    getPatchName,
    getLaneRoleName
} from '../../utils/enumUtils';
import { getLaneInfo } from '../../utils/matchUtils';

interface Props {
    currentFilters: PlayerEndpointParameters;
    onApply: (filters: PlayerEndpointParameters) => void;
}

const allGameModes = Object.values(GameMode).filter(v => v !== 0) as GameMode[];
const allLobbyTypes = Object.values(LobbyType) as LobbyType[];
const allRegions = Object.values(Region).filter(v => v !== 0) as Region[];
const allPatches = Object.values(Patch).reverse() as Patch[];
const allLanes = Object.values(LaneRole).filter(v => v !== 0) as LaneRole[];

export const PlayerFiltersPanel: React.FC<Props> = ({ currentFilters, onApply }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [localFilters, setLocalFilters] = useState<PlayerEndpointParameters>(currentFilters);
    const [accIdInput, setAccIdInput] = useState('');

    const [laneDropdownOpen, setLaneDropdownOpen] = useState(false);
    const [heroDropdownOpen, setHeroDropdownOpen] = useState(false);

    const laneRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    const { data: heroesData } = useHeroes();
    const heroes = Object.values(heroesData || {}).sort((a, b) => a.localized_name.localeCompare(b.localized_name));

    useEffect(() => {
        setLocalFilters(currentFilters);
    }, [currentFilters]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (laneRef.current && !laneRef.current.contains(event.target as Node)) {
                setLaneDropdownOpen(false);
            }
            if (heroRef.current && !heroRef.current.contains(event.target as Node)) {
                setHeroDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleApply = () => {
        onApply(localFilters);
        setIsExpanded(false);
    };

    const handleReset = () => {
        const resetFilters: PlayerEndpointParameters = {};
        setLocalFilters(resetFilters);
        setAccIdInput('');
        onApply(resetFilters);
        setIsExpanded(false);
    };

    const updateFilter = <K extends keyof PlayerEndpointParameters>(key: K, value: PlayerEndpointParameters[K]) => {
        setLocalFilters(prev => {
            const next = { ...prev, [key]: value };
            if (value === undefined || value === null) {
                delete next[key];
            }
            return next;
        });
    };

    const addArrayItem = (key: 'withHeroIds' | 'againstHeroIds' | 'includedPlayersIds', val: number, max: number) => {
        setLocalFilters(prev => {
            const current = prev[key] || [];
            if (current.includes(val) || current.length >= max) return prev;
            return { ...prev, [key]: [...current, val] };
        });
    };

    const removeArrayItem = (key: 'withHeroIds' | 'againstHeroIds' | 'includedPlayersIds', val: number) => {
        setLocalFilters(prev => {
            const current = prev[key] || [];
            const next = current.filter(id => id !== val);
            const nextFilters = { ...prev, [key]: next };
            if (next.length === 0) delete nextFilters[key];
            return nextFilters;
        });
    };

    const handleAddAccountId = () => {
        const id = parseInt(accIdInput.trim());
        if (!isNaN(id) && id > 0) {
            addArrayItem('includedPlayersIds', id, 10);
            setAccIdInput('');
        }
    };

    const activeFilterCount = Object.keys(localFilters).length;
    const selectedHero = localFilters.heroId ? heroes.find(h => h.id === localFilters.heroId) : null;
    const selectedLaneInfo = localFilters.laneRole != null ? getLaneInfo(localFilters.laneRole) : null;

    return (
        <div className="bg-[#15171c] border border-[#2e353b] rounded-xl shadow-xl overflow-hidden mb-6 transition-all duration-300">
            <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#1a1d24] transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-3">
                    <h3 className="font-serif font-bold text-[#e3e3e3] uppercase tracking-widest text-sm">
                        🔍 Search Filters
                    </h3>
                    {activeFilterCount > 0 && (
                        <span className="bg-[#e7d291]/10 border border-[#e7d291]/30 text-[#e7d291] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                            {activeFilterCount} Active
                        </span>
                    )}
                </div>
                <div className={clsx("transition-transform duration-300", isExpanded && "rotate-180")}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#808fa6]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>

            <div className={clsx("overflow-hidden transition-all duration-500 ease-in-out", isExpanded ? "opacity-100" : "max-h-0 opacity-0")}>
                <div className="p-4 pt-0 border-t border-[#2e353b]/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold text-[#58606e] uppercase tracking-widest">Result</label>
                            <div className="flex bg-[#0b0e13] rounded-lg p-1 border border-[#2e353b]">
                                <FilterButton isActive={localFilters.win === undefined} onClick={() => updateFilter('win', undefined)} label="Any" />
                                <FilterButton isActive={localFilters.win === BooleanState.True} onClick={() => updateFilter('win', BooleanState.True)} label="Won" colorClass="text-emerald-400" />
                                <FilterButton isActive={localFilters.win === BooleanState.False} onClick={() => updateFilter('win', BooleanState.False)} label="Lost" colorClass="text-red-400" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold text-[#58606e] uppercase tracking-widest">Side</label>
                            <div className="flex bg-[#0b0e13] rounded-lg p-1 border border-[#2e353b]">
                                <FilterButton isActive={localFilters.isRadiant === undefined} onClick={() => updateFilter('isRadiant', undefined)} label="Any" />
                                <FilterButton isActive={localFilters.isRadiant === BooleanState.True} onClick={() => updateFilter('isRadiant', BooleanState.True)} label="Radiant" icon="/assets/images/radiant.png" colorClass="text-emerald-400" />
                                <FilterButton isActive={localFilters.isRadiant === BooleanState.False} onClick={() => updateFilter('isRadiant', BooleanState.False)} label="Dire" icon="/assets/images/dire.png" colorClass="text-red-400" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold text-[#58606e] uppercase tracking-widest">Party Size</label>
                            <div className="flex bg-[#0b0e13] rounded-lg p-1 border border-[#2e353b]">
                                {[undefined, 1, 2, 3, 4, 5].map((size) => (
                                    <FilterButton
                                        key={size || 'any'}
                                        isActive={localFilters.partySize === size}
                                        onClick={() => updateFilter('partySize', size)}
                                        label={size === undefined ? 'Any' : size === 1 ? 'Solo' : String(size)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold text-[#58606e] uppercase tracking-widest">Time Period</label>
                            <select
                                value={localFilters.date ?? ''}
                                onChange={(e) => updateFilter('date', e.target.value ? Number(e.target.value) : undefined)}
                                className="w-full bg-[#0b0e13] text-[#e3e3e3] border border-[#2e353b] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#e7d291] appearance-none"
                            >
                                <option value="">All Time</option>
                                <option value="7">Last Week</option>
                                <option value="30">Last Month</option>
                                <option value="90">Last 3 Months</option>
                                <option value="180">Last 6 Months</option>
                                <option value="365">Last Year</option>
                                <option value="1095">Last 3 Years</option>
                            </select>
                        </div>

                        {/* Custom Lane Dropdown */}
                        <div className="flex flex-col gap-2" ref={laneRef}>
                            <label className="text-[10px] font-bold text-[#58606e] uppercase tracking-widest">Lane</label>
                            <div className="relative">
                                <div
                                    className={clsx(
                                        "w-full bg-[#0b0e13] text-[#e3e3e3] border border-[#2e353b] rounded-lg py-2 px-3 text-sm cursor-pointer flex items-center justify-between transition-colors",
                                        laneDropdownOpen && "border-[#e7d291]"
                                    )}
                                    onClick={() => setLaneDropdownOpen(!laneDropdownOpen)}
                                >
                                    <div className="flex items-center gap-2">
                                        {selectedLaneInfo && <Icon src={selectedLaneInfo.iconSrc} size={5} />}
                                        <span>{localFilters.laneRole != null ? getLaneRoleName(localFilters.laneRole) : "Any Lane"}</span>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#808fa6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>

                                {laneDropdownOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-[#1a1d24] border border-[#2e353b] rounded-lg shadow-2xl z-50 overflow-hidden">
                                        <div
                                            className="px-3 py-2 hover:bg-[#2e353b] cursor-pointer text-sm text-[#e3e3e3] flex items-center gap-2"
                                            onClick={() => { updateFilter('laneRole', undefined); setLaneDropdownOpen(false); }}
                                        >
                                            Any Lane
                                        </div>
                                        {allLanes.map(role => {
                                            const info = getLaneInfo(role);
                                            return (
                                                <div
                                                    key={role}
                                                    className="px-3 py-2 hover:bg-[#2e353b] cursor-pointer text-sm text-[#e3e3e3] flex items-center gap-2"
                                                    onClick={() => { updateFilter('laneRole', role); setLaneDropdownOpen(false); }}
                                                >
                                                    {info && <Icon src={info.iconSrc} size={5} />}
                                                    {getLaneRoleName(role)}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Custom Hero Dropdown */}
                        <div className="flex flex-col gap-2" ref={heroRef}>
                            <label className="text-[10px] font-bold text-[#58606e] uppercase tracking-widest">Played Hero</label>
                            <div className="relative">
                                <div
                                    className={clsx(
                                        "w-full bg-[#0b0e13] text-[#e3e3e3] border border-[#2e353b] rounded-lg py-2 px-3 text-sm cursor-pointer flex items-center justify-between transition-colors",
                                        heroDropdownOpen && "border-[#e7d291]"
                                    )}
                                    onClick={() => setHeroDropdownOpen(!heroDropdownOpen)}
                                >
                                    <div className="flex items-center gap-2">
                                        {selectedHero && <img src={selectedHero.icon} alt="hero" className="w-6 h-6 rounded object-cover shadow-sm" />}
                                        <span>{selectedHero ? selectedHero.localized_name : "Any Hero"}</span>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#808fa6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>

                                {heroDropdownOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-[#1a1d24] border border-[#2e353b] rounded-lg shadow-2xl z-50 max-h-60 overflow-y-auto no-scrollbar">
                                        <div
                                            className="px-3 py-2 hover:bg-[#2e353b] cursor-pointer text-sm text-[#e3e3e3] flex items-center gap-2"
                                            onClick={() => { updateFilter('heroId', undefined); setHeroDropdownOpen(false); }}
                                        >
                                            Any Hero
                                        </div>
                                        {heroes.map(h => (
                                            <div
                                                key={h.id}
                                                className="px-3 py-1.5 hover:bg-[#2e353b] cursor-pointer text-sm text-[#e3e3e3] flex items-center gap-2"
                                                onClick={() => { updateFilter('heroId', h.id); setHeroDropdownOpen(false); }}
                                            >
                                                <img src={h.icon} alt={h.localized_name} className="w-6 h-6 rounded object-cover shadow-sm" />
                                                {h.localized_name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold text-[#58606e] uppercase tracking-widest">Game Mode</label>
                            <select
                                value={localFilters.gameMode ?? ''}
                                onChange={(e) => updateFilter('gameMode', e.target.value ? Number(e.target.value) as GameMode : undefined)}
                                className="w-full bg-[#0b0e13] text-[#e3e3e3] border border-[#2e353b] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#e7d291] appearance-none"
                            >
                                <option value="">Any Mode</option>
                                {allGameModes.map(mode => (
                                    <option key={mode} value={mode}>{getGameModeName(mode)}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold text-[#58606e] uppercase tracking-widest">Lobby Type</label>
                            <select
                                value={localFilters.lobbyType ?? ''}
                                onChange={(e) => updateFilter('lobbyType', e.target.value ? Number(e.target.value) as LobbyType : undefined)}
                                className="w-full bg-[#0b0e13] text-[#e3e3e3] border border-[#2e353b] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#e7d291] appearance-none"
                            >
                                <option value="">Any Lobby</option>
                                {allLobbyTypes.map(type => (
                                    <option key={type} value={type}>{getLobbyTypeName(type)}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold text-[#58606e] uppercase tracking-widest">Region</label>
                            <select
                                value={localFilters.region ?? ''}
                                onChange={(e) => updateFilter('region', e.target.value ? Number(e.target.value) as Region : undefined)}
                                className="w-full bg-[#0b0e13] text-[#e3e3e3] border border-[#2e353b] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#e7d291] appearance-none"
                            >
                                <option value="">Any Region</option>
                                {allRegions.map(reg => (
                                    <option key={reg} value={reg}>{getRegionName(reg)}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold text-[#58606e] uppercase tracking-widest">Patch</label>
                            <select
                                value={localFilters.patch ?? ''}
                                onChange={(e) => updateFilter('patch', e.target.value ? Number(e.target.value) as Patch : undefined)}
                                className="w-full bg-[#0b0e13] text-[#e3e3e3] border border-[#2e353b] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#e7d291] appearance-none"
                            >
                                <option value="">Any Patch</option>
                                {allPatches.map((patch) => (
                                    <option key={patch} value={patch}>{getPatchName(patch)}</option>
                                ))}
                            </select>
                        </div>

                    </div>

                    <div className="w-full h-px bg-[#2e353b]/50 my-6" />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center justify-between">
                                <span>Allied Heroes</span>
                                <span className="text-[#58606e]">{(localFilters.withHeroIds?.length || 0)}/5</span>
                            </label>
                            <select
                                value=""
                                onChange={(e) => {
                                    if (e.target.value) addArrayItem('withHeroIds', Number(e.target.value), 5);
                                }}
                                disabled={(localFilters.withHeroIds?.length || 0) >= 5}
                                className="w-full bg-[#0b0e13] text-[#e3e3e3] border border-[#2e353b] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#e7d291] appearance-none disabled:opacity-50"
                            >
                                <option value="" disabled>Add Allied Hero...</option>
                                {heroes.map(h => (
                                    <option key={h.id} value={h.id} disabled={localFilters.withHeroIds?.includes(h.id)}>{h.localized_name}</option>
                                ))}
                            </select>
                            {localFilters.withHeroIds && localFilters.withHeroIds.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {localFilters.withHeroIds.map(id => {
                                        const h = heroes.find(hero => hero.id === id);
                                        if (!h) return null;
                                        return (
                                            <div key={id} className="flex items-center gap-1.5 bg-[#1a1d24] border border-[#2e353b] rounded p-1 pr-2 shadow-sm">
                                                <img src={h.icon} alt={h.localized_name} className="w-5 h-5 rounded-sm object-cover" />
                                                <span className="text-xs text-[#e3e3e3]">{h.localized_name}</span>
                                                <button onClick={() => removeArrayItem('withHeroIds', id)} className="text-[#808fa6] hover:text-red-400 ml-1 transition-colors">✕</button>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold text-red-400 uppercase tracking-widest flex items-center justify-between">
                                <span>Opposing Heroes</span>
                                <span className="text-[#58606e]">{(localFilters.againstHeroIds?.length || 0)}/5</span>
                            </label>
                            <select
                                value=""
                                onChange={(e) => {
                                    if (e.target.value) addArrayItem('againstHeroIds', Number(e.target.value), 5);
                                }}
                                disabled={(localFilters.againstHeroIds?.length || 0) >= 5}
                                className="w-full bg-[#0b0e13] text-[#e3e3e3] border border-[#2e353b] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#e7d291] appearance-none disabled:opacity-50"
                            >
                                <option value="" disabled>Add Opposing Hero...</option>
                                {heroes.map(h => (
                                    <option key={h.id} value={h.id} disabled={localFilters.againstHeroIds?.includes(h.id)}>{h.localized_name}</option>
                                ))}
                            </select>
                            {localFilters.againstHeroIds && localFilters.againstHeroIds.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {localFilters.againstHeroIds.map(id => {
                                        const h = heroes.find(hero => hero.id === id);
                                        if (!h) return null;
                                        return (
                                            <div key={id} className="flex items-center gap-1.5 bg-[#1a1d24] border border-[#2e353b] rounded p-1 pr-2 shadow-sm">
                                                <img src={h.icon} alt={h.localized_name} className="w-5 h-5 rounded-sm object-cover" />
                                                <span className="text-xs text-[#e3e3e3]">{h.localized_name}</span>
                                                <button onClick={() => removeArrayItem('againstHeroIds', id)} className="text-[#808fa6] hover:text-red-400 ml-1 transition-colors">✕</button>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold text-[#e7d291] uppercase tracking-widest flex items-center justify-between">
                                <span>Included Account IDs</span>
                            </label>
                            <div className="flex bg-[#0b0e13] rounded-lg border border-[#2e353b] focus-within:border-[#e7d291] transition-colors">
                                <input
                                    type="number"
                                    min="1"
                                    placeholder="Account ID..."
                                    value={accIdInput}
                                    onChange={(e) => setAccIdInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddAccountId()}
                                    className="w-full bg-transparent text-[#e3e3e3] px-3 py-2 text-sm focus:outline-none placeholder-[#58606e]"
                                />
                                <button
                                    onClick={handleAddAccountId}
                                    disabled={!accIdInput}
                                    className="px-4 text-xs font-bold uppercase tracking-widest text-[#e7d291] hover:bg-[#1a1d24] rounded-r-lg border-l border-[#2e353b] disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                                >
                                    Add
                                </button>
                            </div>
                            {localFilters.includedPlayersIds && localFilters.includedPlayersIds.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {localFilters.includedPlayersIds.map(id => (
                                        <div key={id} className="flex items-center gap-1.5 bg-[#e7d291]/10 border border-[#e7d291]/30 text-[#e7d291] font-mono rounded px-2 py-1 shadow-sm">
                                            <span className="text-xs">{id}</span>
                                            <button onClick={() => removeArrayItem('includedPlayersIds', id)} className="text-[#e7d291]/70 hover:text-red-400 ml-1 transition-colors">✕</button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>

                    <div className="flex items-center justify-end gap-3 mt-8 pt-4 border-t border-[#2e353b]/50">
                        <button
                            onClick={handleReset}
                            className="px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-widest text-[#808fa6] hover:text-white hover:bg-[#2e353b] transition-colors"
                        >
                            Reset
                        </button>
                        <button
                            onClick={handleApply}
                            className="px-8 py-2 rounded-lg text-sm font-bold uppercase tracking-widest bg-linear-to-r from-[#b88a44] to-[#e7d291] text-[#0b0e13] hover:brightness-110 transition-all transform hover:-translate-y-px"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FilterButton: React.FC<{ isActive: boolean, onClick: () => void, label: string, icon?: string, colorClass?: string }> = ({ isActive, onClick, label, icon, colorClass }) => (
    <button
        onClick={onClick}
        className={clsx(
            "flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all",
            isActive
                ? clsx("bg-[#2e353b] shadow-inner", colorClass || "text-[#e3e3e3]")
                : "text-[#58606e] hover:bg-[#1a1d24] hover:text-[#808fa6]"
        )}
    >
        {icon && <Icon src={icon} size={3.5} />}
        {label}
    </button>
);
