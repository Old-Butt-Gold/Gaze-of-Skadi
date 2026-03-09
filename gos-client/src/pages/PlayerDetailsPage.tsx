import React, { useState, useEffect } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { usePlayer } from '../hooks/queries/usePlayer';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { NotFoundPage } from './NotFoundPage';
import { PlayerHeader } from '../components/players/PlayerHeader';
import { PlayerFiltersPanel } from '../components/players/PlayerFiltersPanel';
import type { PlayerEndpointParameters } from '../types/player';
import { BooleanState } from '../types/common';
import { usePlayerWinLoss } from "../hooks/queries/usePlayerWinLoss";

export type PlayerTabType = 'statistics' | 'wordcloud' | 'histogram' | 'heroes' | 'wardmap' | 'peer' | 'pro' | 'counts' | 'records' | 'activity' | 'matches';

export interface PlayerTab {
    id: PlayerTabType;
    label: string;
    disabled?: boolean;
}

export interface PlayerOutletContext {
    accountId: number;
    filters: PlayerEndpointParameters;
}

export const PlayerDetailsPage: React.FC = () => {
    const { playerId } = useParams<{ playerId: string }>();
    const parsedId = Number(playerId);
    const location = useLocation();

    const activeTab = location.pathname.split('/').pop() as PlayerTabType;

    const [filters, setFilters] = useState<PlayerEndpointParameters>({});

    const { data: player, isLoading, isError } = usePlayer(parsedId);
    const { data: wl } = usePlayerWinLoss(parsedId, filters, !!player);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [parsedId]);

    if (isNaN(parsedId)) return <NotFoundPage />;
    if (isLoading) return <LoadingSpinner text="Summoning Player Profile..." />;
    if (isError || !player) return <NotFoundPage />;

    const isPrivateProfile = player.profile.fhUnavailable?.value === BooleanState.True;

    const noData = wl && wl.wins === 0 && wl.losses === 0;

    const tabsDisabled = isPrivateProfile;

    const tabs: PlayerTab[] = [
        { id: 'statistics', label: 'Stats', disabled: tabsDisabled },
        { id: 'wordcloud', label: 'Word Cloud', disabled: tabsDisabled },
        { id: 'histogram', label: 'Histograms', disabled: tabsDisabled },
        { id: 'heroes', label: 'Heroes', disabled: tabsDisabled },
        { id: 'wardmap', label: 'Ward Map', disabled: tabsDisabled },
        { id: 'peer', label: 'Peers', disabled: tabsDisabled },
        { id: 'pro', label: 'Pros', disabled: tabsDisabled },
        { id: 'counts', label: 'Counts', disabled: tabsDisabled },
        { id: 'records', label: 'Records', disabled: tabsDisabled },
        { id: 'activity', label: 'Activity', disabled: tabsDisabled },
        { id: 'matches', label: 'Matches', disabled: tabsDisabled },
    ];

    const contextValue: PlayerOutletContext = {
        accountId: parsedId,
        filters
    };

    const activeFilterCount = Object.keys(filters).length;

    return (
        <div className="min-h-screen bg-[#0f1114] text-white pb-10">

            <PlayerHeader player={player} />

            <div className="mx-auto px-4 sm:px-6 lg:px-8 mt-4">

                {!isPrivateProfile && (
                    <div className="mb-4 relative z-40">
                        <PlayerFiltersPanel
                            currentFilters={filters}
                            onApply={setFilters}
                        />
                    </div>
                )}

                <div className="flex border-b border-[#2e353b] mb-4 overflow-x-auto no-scrollbar scroll-smooth items-center justify-start">
                    <div className="flex gap-1 min-w-max w-fit mx-auto px-4">
                        {tabs.map((tab) => (
                            <TabButton
                                key={tab.id}
                                label={tab.label}
                                to={tab.id}
                                isActive={activeTab === tab.id}
                                disabled={tab.disabled}
                            />
                        ))}
                    </div>
                </div>

                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
                    {isPrivateProfile ? (
                        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-[#2e353b] rounded-3xl bg-[#15171c]/50">
                            <span className="text-6xl mb-4 opacity-50 grayscale">🔒</span>
                            <h2 className="text-2xl font-bold text-white mb-2">Private Profile</h2>
                            <p className="text-[#808fa6] max-w-md text-center leading-relaxed px-4">
                                This player has not exposed their match data to public API.
                                <br/>We cannot retrieve match history or statistics.
                            </p>
                        </div>
                    ) : noData ? (
                        <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-[#2e353b] rounded-3xl bg-[#15171c]/50">
                            <h2 className="text-2xl font-bold text-white mb-2">No Matches Found</h2>
                            <p className="text-[#808fa6] max-w-md text-center leading-relaxed px-4">
                                {activeFilterCount > 0
                                    ? "No matches match the currently applied filters. Try changing or resetting them."
                                    : "This player doesn't have any recorded matches yet."}
                            </p>
                            {activeFilterCount > 0 && (
                                <button
                                    onClick={() => setFilters({})}
                                    className="mt-6 px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest text-[#0b0e13] bg-[#e7d291] hover:brightness-110 shadow-lg transition-all transform hover:-translate-y-px"
                                >
                                    Reset Filters
                                </button>
                            )}
                        </div>
                    ) : (
                        <Outlet context={contextValue} />
                    )}
                </div>
            </div>
        </div>
    );
};

const TabButton = ({ label, to, isActive, disabled }: { label: string, to: string, isActive: boolean, disabled?: boolean }) => (
    <Link
        to={disabled ? '#' : to}
        onClick={(e) => disabled && e.preventDefault()}
        className={clsx(
            "px-6 py-4 text-sm font-bold uppercase tracking-widest border-b-2 transition-all duration-300 whitespace-nowrap",
            isActive
                ? "border-[#e7d291] text-[#e7d291] bg-linear-to-t from-[#e7d291]/10 to-transparent"
                : "border-transparent text-[#808fa6] hover:text-white hover:bg-[#1a1d24]",
            disabled && "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-[#808fa6]"
        )}
    >
        {label}
        {disabled && <span className="ml-2 text-xs opacity-50">🔒</span>}
    </Link>
);
