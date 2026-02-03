import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { usePlayerSearch } from '../../../hooks/queries/usePlayerSearch';
import { formatRelativeTime } from '../../../utils/formatUtils';
import { APP_ROUTES } from '../../../config/navigation';
import { Icon } from '../../Icon.tsx';
import type { ProPlayerDto, PlayerResponseDto } from '../../../types/playerSearch';

const ExternalLinkIcon = () => (
    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

const ProPlayerCard = ({ player }: { player: ProPlayerDto }) => {
    const hasDotaPlus = player.haveDotaPlus?.value === 1;

    return (
        <div className="group relative bg-[#15171c] border border-[#2e353b] hover:border-[#e7d291] rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(231,210,145,0.1)] flex flex-col h-full">
            <div className="h-1 w-full bg-gradient-to-r from-[#b88a44] via-[#e7d291] to-[#b88a44] opacity-70 group-hover:opacity-100 transition-opacity" />

            <div className="p-5 flex items-start gap-4 relative flex-1">
                <div className="absolute inset-0 opacity-20 bg-[url('https://shared.akamai.steamstatic.com//store_item_assets/steam/apps/570/ss_27b6345f22243bd6b885cc64c5cda74e4bd9c3e8.jpg')] bg-cover bg-no-repeat bg-position-[center_top_9%] pointer-events-none mix-blend-overlay" />

                <Link to={`${APP_ROUTES.PLAYERS}/${player.accountId}`} className="relative shrink-0 z-10 block">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg border-2 border-[#2e353b] group-hover:border-[#e7d291] overflow-hidden shadow-lg transition-colors bg-[#0f1114]">
                        <Icon src={player.avatar || ''} alt={player.name} fallbackSrc="/assets/images/unknown_player.png" />
                    </div>
                    {hasDotaPlus && (
                        <div className="absolute -bottom-2 -right-2 bg-[#0f1114] rounded-full p-1 border border-[#2e353b] shadow-md z-20" title="Dota Plus">
                            <img src="/assets/images/dota_plus_icon.png" alt="Dota Plus" className="w-5 h-5 animate-pulse-slow" />
                        </div>
                    )}
                </Link>

                <div className="flex-1 min-w-0 flex flex-col h-full justify-between relative z-10">
                    <div>
                        <div className="flex items-center justify-between">
                            <Link to={`${APP_ROUTES.PLAYERS}/${player.accountId}`} className="font-serif font-bold text-lg md:text-xl text-white group-hover:text-[#e7d291] transition-colors truncate hover:underline decoration-dashed underline-offset-4">
                                {player.name}
                            </Link>

                            {player.profileUrl && (
                                <a
                                    href={String(player.profileUrl)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#58606e] hover:text-white transition-colors p-1"
                                    title="View Steam Profile"
                                >
                                    <ExternalLinkIcon />
                                </a>
                            )}
                        </div>

                        {player.teamName ? (
                            <div className="inline-flex items-center gap-1.5 mt-1 px-2 py-0.5 bg-[#e7d291]/10 border border-[#e7d291]/20 rounded text-[#e7d291] text-[10px] font-bold uppercase tracking-wider mb-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#e7d291]" />
                                {player.teamName}
                            </div>
                        ) : (
                            <div className="text-[10px] text-[#58606e] uppercase font-bold tracking-wider mt-1 mb-2">Free Agent</div>
                        )}

                        <div className="text-sm text-[#808fa6] truncate font-mono">
                            {player.personaName || `ID: ${player.accountId}`}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-auto border-t border-[#2e353b] bg-[#0f1114]/80 px-5 py-3 flex justify-between items-center text-xs relative z-10">
                <div className="flex items-center gap-2 text-[#58606e]">
                    <span className={clsx("w-2 h-2 rounded-full", player.lastMatchTime ? "bg-emerald-500" : "bg-gray-600")} />
                    <span>{player.lastMatchTime ? `Last active: ${formatRelativeTime(player.lastMatchTime)}` : 'Inactive'}</span>
                </div>

                <Link
                    to={`${APP_ROUTES.PLAYERS}/${player.accountId}`}
                    className="text-[#e7d291] font-bold uppercase tracking-wider hover:underline underline-offset-4 decoration-[#e7d291]/50"
                >
                    View Profile →
                </Link>
            </div>
        </div>
    );
};

const PublicPlayerCard = ({ player }: { player: PlayerResponseDto }) => {
    return (
        <Link
            to={`${APP_ROUTES.PLAYERS}/${player.accountId}`}
            className="flex items-center gap-4 p-4 rounded-xl bg-[#15171c]/50 border border-[#2e353b]/50 hover:bg-[#1e222b] hover:border-[#58606e] transition-all group relative overflow-hidden"
        >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#58606e] group-hover:bg-white transition-colors" />

            <div className="w-12 h-12 rounded bg-[#262b36] overflow-hidden shrink-0 border border-[#3a414e] group-hover:border-white/50 shadow-sm ml-2">
                <Icon
                    src={player.avatarFull ? String(player.avatarFull) : ''}
                    alt={player.personaName}
                    fallbackSrc="/assets/images/unknown_player.png" />
            </div>

            <div className="flex flex-col min-w-0 flex-1">
                <span className="font-bold text-sm text-[#e3e3e3] group-hover:text-white truncate">
                    {player.personaName}
                </span>
                <span className="text-[10px] text-[#58606e] font-mono group-hover:text-[#808fa6]">
                    ID: {player.accountId}
                </span>
            </div>

            <div className="text-right shrink-0">
                <span className="text-[10px] text-[#58606e] block uppercase tracking-wide">Played</span>
                <span className="text-xs text-[#808fa6] font-medium group-hover:text-white transition-colors">
                    {player.lastMatchTime ? formatRelativeTime(player.lastMatchTime) : 'Unknown'}
                </span>
            </div>
        </Link>
    );
};

export const SearchPlayersTab: React.FC = () => {
    const { query, setQuery, debouncedQuery, isSearching,  proPlayers, publicPlayers } = usePlayerSearch('');

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mx-auto pb-12">

            <div className="flex flex-col items-center mb-12">
                <div className="relative w-full group">
                    <div className={clsx("absolute -inset-1 bg-gradient-to-r from-[#e7d291] to-[#b88a44] rounded-2xl blur opacity-20 group-focus-within:opacity-50 transition duration-1000 group-focus-within:duration-200", isSearching && "animate-pulse")} />

                    <div className="relative bg-[#0f1114] border border-[#2e353b] rounded-xl flex items-center p-2 shadow-2xl">
                        <div className="pl-4 pr-3 text-[#58606e]">
                            {isSearching ? (
                                <svg className="animate-spin h-6 w-6 text-[#e7d291]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            )}
                        </div>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Find a player by Name, Persona, or Account ID..."
                            className="w-full bg-transparent text-lg text-white placeholder-[#58606e] focus:outline-none py-3"
                            autoFocus
                        />
                    </div>
                </div>

                {query.length > 0 && query.length < 3 && (
                    <div className="mt-3 text-red-400 text-xs font-bold uppercase tracking-widest animate-pulse">
                        Please enter at least 3 characters
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

                <div className="space-y-6">
                    {proPlayers.length > 0 && (
                        <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                            <div className="flex items-center justify-between mb-4 border-l-4 border-[#e7d291] pl-4">
                                <div>
                                    <h2 className="text-xl font-serif font-bold text-white uppercase tracking-widest">
                                        Professional League
                                    </h2>
                                    <p className="text-xs text-[#808fa6]">Verified professional players</p>
                                </div>
                                <span className="bg-[#e7d291] text-[#0f1114] text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                    {proPlayers.length}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                                {proPlayers.map(player => (
                                    <ProPlayerCard key={player.accountId} player={player} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    {publicPlayers.length > 0 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500 delay-100">
                            <div className="flex items-center justify-between mb-4 border-l-4 border-[#58606e] pl-4">
                                <div>
                                    <h2 className="text-lg font-bold text-[#a3aab8] uppercase tracking-widest">
                                        Community
                                    </h2>
                                    <p className="text-xs text-[#58606e]">Public match history</p>
                                </div>
                                <span className="bg-[#2e353b] text-[#808fa6] text-xs font-bold px-3 py-1 rounded-full">
                                    {publicPlayers.length}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {publicPlayers.map(player => (
                                    <PublicPlayerCard key={player.accountId} player={player} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {!isSearching && debouncedQuery.length >= 3 && proPlayers.length === 0 && publicPlayers.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-[#58606e]">
                    <div className="w-20 h-20 bg-[#15171c] rounded-full flex items-center justify-center mb-6 shadow-inner">
                        <svg className="w-10 h-10 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[#e3e3e3] uppercase tracking-widest mb-2">No Results Found</h3>
                    <p className="text-sm">We couldn't find any players matching "<span className="text-[#e7d291]">{query}</span>".</p>
                </div>
            )}
        </div>
    );
};