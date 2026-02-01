import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useHeroes } from '../hooks/queries/useHeroes';
import { useFindMatches } from '../hooks/queries/useFindMatches';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorDisplay } from '../components/ui/ErrorDisplay';
import { formatRelativeTime } from '../utils/formatUtils';
import { APP_ROUTES } from '../config/navigation';
import type { FindMatchesParams } from '../types/search';
import {Icon} from "../components/Icon.tsx";

const HeroSlot =
    ({ heroId, onRemove, isRadiant, isActiveSide, onClick }: {
    heroId?: number,
    onRemove: (id: number) => void,
    isRadiant: boolean,
    isActiveSide: boolean,
    onClick: () => void
}) => {
    const { getHero } = useHeroes();
    const hero = heroId ? getHero(heroId) : null;

    return (
        <div onClick={onClick}
            className={clsx(
                "relative w-20 h-12 rounded border transition-all duration-200 group cursor-pointer shadow-lg overflow-hidden shrink-0",
                hero
                    ? (isRadiant ? "border-emerald-500 shadow-emerald-500/20" : "border-red-500 shadow-red-500/20")
                    : (isActiveSide
                        ? (isRadiant ? "border-emerald-500/50 bg-emerald-500/5" : "border-red-500/50 bg-red-500/5")
                        : "border-[#2e353b] bg-[#15171c] hover:border-[#58606e]")
            )}>
            {hero ? (
                <>
                    <Icon src={hero.img} alt={hero.localized_name}/>

                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                        <button
                            onClick={(e) => { e.stopPropagation(); onRemove(hero.id); }}
                            className="text-white bg-red-500/80 hover:bg-red-500 p-1 rounded shadow-lg transform active:scale-95 transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </>
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center opacity-30 group-hover:opacity-60 transition-opacity">
                    <span className="text-2xl font-light text-[#e3e3e3]">+</span>
                </div>
            )}
        </div>
    );
};

const HeroPicker =
({ onSelect, selectedIds, activeTeam } : {
    onSelect: (id: number) => void,
    selectedIds: number[],
    activeTeam: 'A' | 'B'
}) => {
    const { data: heroesDictionary, isLoading } = useHeroes();
    const [search, setSearch] = useState('');

    const filteredHeroes = useMemo(() => {
        if (!heroesDictionary) return [];
        return Object.values(heroesDictionary)
            .filter(h => h.localized_name.toLowerCase().includes(search.toLowerCase()))
            .sort((a, b) => a.localized_name.localeCompare(b.localized_name));
    }, [heroesDictionary, search]);

    if (isLoading) return <LoadingSpinner text="Loading heroes..." />;

    return (
        <div className="bg-[#15171c] border border-[#2e353b] rounded-xl p-3 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4 relative z-10">
                <div className="text-[#808fa6] text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <span>Available Heroes</span>
                    <span className="bg-[#2e353b] text-white px-2 py-0.5 rounded-full text-[10px]">{filteredHeroes.length}</span>
                </div>

                <div className="relative w-full sm:w-64">
                    <input
                        type="text"
                        placeholder="Search hero..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-[#0f1114] border border-[#2e353b] text-[#e3e3e3] pl-9 pr-4 py-2 rounded-lg focus:outline-none focus:border-[#e7d291] transition-all placeholder-[#58606e] text-sm"
                    />
                    <div className="absolute left-3 top-2.5 text-[#58606e]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb-[#2e353b] scrollbar-track-[#0f1114] pr-2 pb-2">
                {filteredHeroes.map(hero => {
                    const isSelected = selectedIds.includes(hero.id);
                    return (
                        <div
                            key={hero.id}
                            onClick={() => !isSelected && onSelect(hero.id)}
                            className={clsx(
                                "aspect-[16/9] rounded border transition-all duration-100 relative group overflow-hidden",
                                isSelected
                                    ? "opacity-30 grayscale border-transparent cursor-default"
                                    : clsx(
                                        "cursor-pointer shadow-md hover:z-10 hover:shadow-lg",
                                        activeTeam === 'A' ? "border-[#2e353b] hover:border-emerald-500" : "border-[#2e353b] hover:border-red-500"
                                    )
                            )}
                            title={hero.localized_name}
                        >
                            <Icon src={hero.img} alt={hero.localized_name} />

                            {/* Name Overlay */}
                            {!isSelected && (
                                <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-[10px] text-white font-bold pb-1 text-center leading-tight px-1 truncate w-full">
                                        {hero.localized_name}
                                    </span>
                                </div>
                            )}

                            {isSelected && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export const FindMatchesPage: React.FC = () => {
    const { getHero } = useHeroes();

    const [teamA, setTeamA] = useState<number[]>([]);
    const [teamB, setTeamB] = useState<number[]>([]);
    const [activeSide, setActiveSide] = useState<'A' | 'B'>('A');
    const [searchParams, setSearchParams] = useState<FindMatchesParams>({ teamA: [], teamB: [] });

    const { data: results, isLoading, isError, refetch } = useFindMatches(searchParams);

    const handleSelectHero = (id: number) => {
        if (activeSide === 'A') {
            if (teamA.length < 5 && !teamA.includes(id) && !teamB.includes(id)) {
                setTeamA(prev => [...prev, id]);
            }
        } else {
            if (teamB.length < 5 && !teamB.includes(id) && !teamA.includes(id)) {
                setTeamB(prev => [...prev, id]);
            }
        }
    };

    const handleRemoveHero = (id: number, side: 'A' | 'B') => {
        if (side === 'A') setTeamA(prev => prev.filter(x => x !== id));
        else setTeamB(prev => prev.filter(x => x !== id));
    };

    const handleSearch = () => {
        setSearchParams({ teamA, teamB });
        setTimeout(() => refetch(), 0);
    };

    const handleClear = () => {
        setTeamA([]);
        setTeamB([]);
        setSearchParams({ teamA: [], teamB: [] });
    };

    const allSelected = [...teamA, ...teamB];

    return (
        <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500 max-w-7xl">

            {/* HEADER */}
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-white uppercase tracking-widest drop-shadow-[0_0_15px_rgba(231,210,145,0.15)]">
                    Battle <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e7d291] to-[#b38b38]">Simulator</span>
                </h1>
                <p className="text-[#808fa6] mt-3 text-sm md:text-base max-w-2xl mx-auto">
                    Select heroes for Radiant and Dire to find professional matches.
                </p>
            </div>

            {/* DRAFTING BOARD */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 items-start">

                {/* RADIANT */}
                <div
                    className={clsx(
                        "lg:col-span-5 bg-[#15171c] border rounded-xl p-5 transition-all duration-200 cursor-pointer",
                        activeSide === 'A'
                            ? "border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                            : "border-[#2e353b] opacity-80 hover:opacity-100 hover:border-emerald-500/30"
                    )}
                    onClick={() => setActiveSide('A')}
                >
                    <div className="flex justify-between items-center mb-4 border-b border-[#2e353b] pb-2">
                        <h3 className={clsx("font-bold uppercase tracking-widest flex items-center gap-2 text-sm", activeSide === 'A' ? "text-emerald-400" : "text-[#58606e]")}>
                            <span className={clsx("w-2 h-2 rounded-full", activeSide === 'A' ? "bg-emerald-500 shadow-[0_0_5px_currentColor]" : "bg-[#2e353b]")}></span>
                            Radiant
                        </h3>
                        <span className="text-[#808fa6] text-xs font-mono">{teamA.length} / 5</span>
                    </div>
                    <div className="flex flex-wrap justify-around gap-2">
                        {[...Array(5)].map((_, i) => (
                            <HeroSlot
                                key={`radiant-${i}`}
                                heroId={teamA[i]}
                                onRemove={(id) => handleRemoveHero(id, 'A')}
                                isRadiant={true}
                                isActiveSide={activeSide === 'A'}
                                onClick={() => setActiveSide('A')}
                            />
                        ))}
                    </div>
                </div>

                {/* CONTROLS */}
                <div className="lg:col-span-2 flex flex-col items-center justify-center gap-4 py-2">
                    <div className="text-3xl font-serif font-black italic text-[#2e353b] select-none">VS</div>
                    <button
                        onClick={handleSearch}
                        disabled={isLoading || (teamA.length === 0 && teamB.length === 0)}
                        className="w-full py-3 bg-gradient-to-r from-[#e7d291] to-[#c2a455] text-[#0f1114] font-bold uppercase tracking-wider rounded shadow-lg hover:shadow-[0_0_15px_rgba(231,210,145,0.4)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none transition-all text-sm"
                    >
                        {isLoading ? 'Searching...' : 'Find Matches'}
                    </button>
                    <button onClick={handleClear} className="text-xs text-[#58606e] hover:text-white uppercase tracking-wider font-bold transition-colors">
                        Clear Draft
                    </button>
                </div>

                {/* DIRE */}
                <div
                    className={clsx(
                        "lg:col-span-5 bg-[#15171c] border rounded-xl p-5 transition-all duration-200 cursor-pointer",
                        activeSide === 'B'
                            ? "border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.1)]"
                            : "border-[#2e353b] opacity-80 hover:opacity-100 hover:border-red-500/30"
                    )}
                    onClick={() => setActiveSide('B')}
                >
                    <div className="flex justify-between items-center mb-4 border-b border-[#2e353b] pb-2">
                        <h3 className={clsx("font-bold uppercase tracking-widest flex items-center gap-2 text-sm", activeSide === 'B' ? "text-red-400" : "text-[#58606e]")}>
                            <span className={clsx("w-2 h-2 rounded-full", activeSide === 'B' ? "bg-red-500 shadow-[0_0_5px_currentColor]" : "bg-[#2e353b]")}></span>
                            Dire
                        </h3>
                        <span className="text-[#808fa6] text-xs font-mono">{teamB.length} / 5</span>
                    </div>
                    <div className="flex flex-wrap justify-around gap-2">
                        {[...Array(5)].map((_, i) => (
                            <HeroSlot
                                key={`dire-${i}`}
                                heroId={teamB[i]}
                                onRemove={(id) => handleRemoveHero(id, 'B')}
                                isRadiant={false}
                                isActiveSide={activeSide === 'B'}
                                onClick={() => setActiveSide('B')}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <HeroPicker
                    onSelect={handleSelectHero}
                    selectedIds={allSelected}
                    activeTeam={activeSide}
                />
            </div>

            {isError && (
                <div className="mb-8">
                    <ErrorDisplay message="Failed to find matches." />
                </div>
            )}

            {results && (
                <div className="animate-in slide-in-from-bottom-8 duration-700">
                    <div className="mb-4 border-l-4 border-[#e7d291] pl-4 py-2">
                        <h3 className="text-xl font-serif font-bold text-white uppercase tracking-widest">Results</h3>
                        <p className="text-[#808fa6] text-sm">Found <span className="text-white font-bold">{results.length}</span> matches.</p>
                    </div>

                    <div className="bg-[#15171c] border border-[#2e353b] rounded-xl overflow-hidden shadow-2xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                <tr className="bg-[#0f1114] text-[10px] text-center uppercase text-[#58606e] font-bold tracking-wider border-b border-[#2e353b]">
                                    <th className="px-6 py-4">Match ID</th>
                                    <th className="px-6 py-4">Radiant</th>
                                    <th className="px-6 py-4">Dire</th>
                                    <th className="px-6 py-4">Winner</th>
                                    <th className="px-6 py-4">Date</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-[#2e353b]/50">
                                {results.length > 0 ? results.map((match) => {
                                    const radiantWon = match.radiantWin.value === 1;

                                    return (
                                        <tr key={match.matchId} className="group hover:bg-[#1e222b] transition-colors relative">
                                            {/* Match ID */}
                                            <td className="px-6 py-4 relative">
                                                <Link to={`${APP_ROUTES.MATCHES}/${match.matchId}`} className="font-mono font-bold text-[#e3e3e3] hover:text-[#e7d291] hover:underline decoration-dashed underline-offset-4 block">
                                                    {match.matchId}
                                                </Link>
                                            </td>

                                            {/* Radiant Heroes */}
                                            <td className="px-6 py-4 align-middle">
                                                <div className="flex flex-wrap justify-center gap-1">
                                                    {match.teamA.map(heroId => {
                                                        const h = getHero(heroId);
                                                        return h ? (
                                                            <Link to={`${APP_ROUTES.HEROES}/${h.id}`} key={h.id} className="relative z-0 hover:z-20 transition-transform hover:scale-110 group/tooltip" title={h.localized_name} >
                                                                <div className="w-10 h-6 md:w-12 md:h-7 rounded border border-emerald-900/50 overflow-hidden bg-[#0f1114] shadow-sm relative z-10">
                                                                    <Icon src={h.img} alt={h.localized_name}/>
                                                                </div>

                                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#0f1114] border border-[#e7d291]/30 text-white text-[10px] font-bold uppercase tracking-wider whitespace-nowrap rounded shadow-[0_0_10px_rgba(0,0,0,0.8)] opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-30 hidden md:block backdrop-blur-sm">
                                                                    {h.localized_name}
                                                                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#0f1114]"></div>
                                                                </div>
                                                            </Link>
                                                        ) : <div key={heroId} className="w-10 h-6 rounded bg-gray-800 border border-[#15171c]"></div>;
                                                    })}
                                                </div>
                                            </td>

                                            {/* Dire Heroes */}
                                            <td className="px-6 py-4 align-middle">
                                                <div className="flex flex-wrap gap-1">
                                                    {match.teamB.map(heroId => {
                                                        const h = getHero(heroId);
                                                        return h ? (
                                                            <Link to={`${APP_ROUTES.HEROES}/${h.id}`} key={h.id} className="relative z-0 hover:z-20 transition-transform hover:scale-110 group/tooltip" title={h.localized_name} >
                                                            <div className="w-10 h-6 md:w-12 md:h-7 rounded border border-red-900/50 overflow-hidden bg-[#0f1114] shadow-sm relative z-10">
                                                                    <Icon src={h.img} alt={h.localized_name}/>
                                                                </div>

                                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#0f1114] border border-[#e7d291]/30 text-white text-[10px] font-bold uppercase tracking-wider whitespace-nowrap rounded shadow-[0_0_10px_rgba(0,0,0,0.8)] opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-30 hidden md:block backdrop-blur-sm">
                                                                    {h.localized_name}
                                                                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#0f1114]"></div>
                                                                </div>
                                                            </Link>
                                                        ) : <div key={heroId} className="w-10 h-6 rounded bg-gray-800 border border-[#15171c]"></div>;
                                                    })}
                                                </div>
                                            </td>

                                            {/* Winner */}
                                            <td className="px-6 py-4 text-center align-middle">
                                                    <span className={clsx(
                                                        "text-[10px] font-bold uppercase px-2 py-1 rounded border inline-block min-w-[60px]",
                                                        radiantWon
                                                            ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                                                            : "text-red-400 bg-red-500/10 border-red-500/20"
                                                    )}>
                                                        {radiantWon ? 'Radiant' : 'Dire'}
                                                    </span>
                                            </td>

                                            {/* Date */}
                                            <td className="px-6 py-4 text-right align-middle">
                                                    <span className="text-xs text-[#808fa6] font-mono whitespace-nowrap">
                                                        {formatRelativeTime(match.startTime)}
                                                    </span>
                                            </td>
                                        </tr>
                                    );
                                }) : (
                                    <tr>
                                        <td colSpan={5} className="py-16 text-center text-[#58606e] uppercase text-xs tracking-widest">
                                            No matches found
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};