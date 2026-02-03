import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { usePlayerSearch } from '../../../hooks/queries/usePlayerSearch';
import { formatRelativeTime } from '../../../utils/formatUtils';
import { APP_ROUTES } from '../../../config/navigation';
import { Icon } from '../../Icon.tsx';
import type { ProPlayerDto, PlayerResponseDto } from '../../../types/playerSearch';

// --- Компонент карточки Про Игрока ---
const ProPlayerCard = ({ player }: { player: ProPlayerDto }) => {
    const hasDotaPlus = player.haveDotaPlus?.value === 1;

    return (
        <Link
            to={`${APP_ROUTES.PLAYERS}/${player.accountId}`}
            className="group relative bg-[#15171c] border border-[#2e353b] hover:border-[#e7d291] rounded-xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.4)] overflow-hidden"
        >
            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#b88a44] to-[#e7d291]" />

            <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="relative shrink-0">
                    <div className="w-14 h-14 rounded border border-[#e7d291]/50 group-hover:border-[#e7d291] overflow-hidden transition-colors shadow-lg">
                        <Icon
                            src={player.avatar ? String(player.avatar) : ''}
                            alt={player.name}
                            fallbackSrc="/assets/images/unknown_player.png"
                            size={14}
                        />
                    </div>
                    {/* Dota Plus Icon */}
                    {hasDotaPlus && (
                        <div className="absolute -bottom-2 -right-2 bg-[#15171c] rounded-full p-0.5 border border-[#2e353b]">
                            <img
                                src="/assets/images/dota_plus_icon.png"
                                alt="Dota Plus"
                                className="w-6 h-6 drop-shadow-md animate-pulse-slow"
                                title="Dota Plus Subscriber"
                            />
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-lg text-white group-hover:text-[#e7d291] transition-colors truncate">
                            {player.name}
                        </span>
                        {player.teamName && (
                            <span className="text-[10px] uppercase font-bold text-[#e7d291] bg-[#e7d291]/10 px-1.5 py-0.5 rounded border border-[#e7d291]/20 truncate max-w-[100px]">
                                {player.teamName}
                            </span>
                        )}
                    </div>

                    <span className="text-sm text-[#808fa6] truncate">
                        {player.personaName || `ID: ${player.accountId}`}
                    </span>

                    <div className="mt-1 flex items-center text-[10px] text-[#58606e]">
                        <span className="w-2 h-2 rounded-full bg-green-500/50 mr-2 inline-block"></span>
                        Last match: {player.lastMatchTime ? formatRelativeTime(player.lastMatchTime) : 'Unknown'}
                    </div>
                </div>
            </div>
        </Link>
    );
};

// --- Компонент карточки Обычного Игрока ---
const PublicPlayerCard = ({ player }: { player: PlayerResponseDto }) => {
    return (
        <Link
            to={`${APP_ROUTES.PLAYERS}/${player.accountId}`}
            className="flex items-center gap-3 p-3 rounded-lg bg-[#0f1114] border border-[#2e353b] hover:bg-[#1e222b] hover:border-[#58606e] transition-all group"
        >
            <div className="w-10 h-10 rounded bg-[#262b36] overflow-hidden shrink-0 border border-[#3a414e] group-hover:border-white/50">
                <Icon
                    src={player.avatarFull ? String(player.avatarFull) : ''}
                    alt={player.personaName}
                    fallbackSrc="/assets/images/unknown_player.png"
                    size={10}
                />
            </div>

            <div className="flex flex-col min-w-0">
                <span className="font-bold text-sm text-[#e3e3e3] group-hover:text-white truncate">
                    {player.personaName}
                </span>
                <span className="text-[10px] text-[#58606e] font-mono group-hover:text-[#808fa6]">
                    ID: {player.accountId}
                </span>
            </div>

            <div className="ml-auto text-right shrink-0">
                <span className="text-[10px] text-[#58606e] block">Last Played</span>
                <span className="text-[10px] text-[#808fa6] font-medium">
                    {player.lastMatchTime ? formatRelativeTime(player.lastMatchTime) : '-'}
                </span>
            </div>
        </Link>
    );
};

// --- Основной Компонент Вкладки ---
export const SearchPlayersTab: React.FC = () => {
    const { query, setQuery, debouncedQuery, isSearching,  proPlayers, publicPlayers } = usePlayerSearch('');

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto">

            {/* Search Input Section */}
            <div className="mb-10 flex flex-col items-center">
                <div className="relative w-full max-w-2xl">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className={clsx("h-5 w-5 transition-colors", isSearching ? "text-[#e7d291] animate-spin" : "text-[#58606e]")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isSearching
                                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            }
                        </svg>
                    </div>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by name, ID or persona..."
                        className="block w-full pl-12 pr-4 py-4 bg-[#15171c] border border-[#2e353b] rounded-xl text-lg text-white placeholder-[#58606e] focus:outline-none focus:ring-1 focus:ring-[#e7d291] focus:border-[#e7d291] transition-all shadow-lg"
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        {query.length > 0 && query.length < 3 && (
                            <span className="text-xs text-red-400 font-bold uppercase tracking-wider animate-pulse">
                                Enter 3+ chars
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="space-y-12">

                {/* 1. Pro Players Section */}
                {proPlayers.length > 0 && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <div className="flex items-center gap-4 mb-4 border-b border-[#2e353b] pb-2">
                            <h3 className="text-xl font-serif font-bold text-white uppercase tracking-widest">
                                Professional Division
                            </h3>
                            <span className="bg-[#e7d291] text-black text-xs font-bold px-2 py-0.5 rounded-full">
                                {proPlayers.length}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {proPlayers.map(player => (
                                <ProPlayerCard key={player.accountId} player={player} />
                            ))}
                        </div>
                    </div>
                )}

                {/* 2. Public Players Section */}
                {publicPlayers.length > 0 && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100">
                        <div className="flex items-center gap-4 mb-4 border-b border-[#2e353b] pb-2">
                            <h3 className="text-lg font-serif font-bold text-[#a3aab8] uppercase tracking-widest">
                                Public Directory
                            </h3>
                            <span className="bg-[#2e353b] text-[#808fa6] text-xs font-bold px-2 py-0.5 rounded-full">
                                {publicPlayers.length}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                            {publicPlayers.map(player => (
                                <PublicPlayerCard key={player.accountId} player={player} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!isSearching && debouncedQuery.length >= 3 && proPlayers.length === 0 && publicPlayers.length === 0 && (
                    <div className="text-center py-20 opacity-50">
                        <span className="text-6xl mb-4 block">🕵️‍♂️</span>
                        <h3 className="text-xl font-bold text-white uppercase tracking-widest">No Players Found</h3>
                        <p className="text-[#808fa6]">Try searching for a different name or ID.</p>
                    </div>
                )}

                {/* Initial State */}
                {debouncedQuery.length < 3 && (
                    <div className="text-center py-20 opacity-30">
                        <span className="text-6xl mb-4 block text-[#2e353b]">⌨️</span>
                        <p className="text-[#808fa6] uppercase tracking-widest font-bold">
                            Type at least 3 characters to search
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
