import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import { usePlayer } from '../hooks/queries/usePlayer';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { NotFoundPage } from './NotFoundPage';
import { PlayerHeader } from '../components/players/PlayerHeader';
import type { PlayerEndpointParameters } from '../types/player';
import { BooleanState } from '../types/common';
import { usePlayerWinLoss } from "../hooks/queries/usePlayerWinLoss";
import { PlayerStatsTab } from "../components/players/tabs/PlayerStatsTab.tsx";
import {PlayerWordCloudTab} from "../components/players/tabs/PlayerWordCloudTab.tsx";
import {PlayerHistogramsTab} from "../components/players/tabs/PlayerHistogramsTab.tsx";
import {PlayerHeroesTab} from "../components/players/tabs/PlayerHeroesTab.tsx";
import {PlayerWardMapTab} from "../components/players/tabs/PlayerWardMapTab.tsx";
import {PlayerPeersTab} from "../components/players/tabs/PlayerPeersTab.tsx";
import {PlayerProsTab} from "../components/players/tabs/PlayerProsTab.tsx";
import {PlayerCountsTab} from "../components/players/tabs/PlayerCountsTab.tsx";
import {PlayerRecordsTab} from "../components/players/tabs/PlayerRecordsTab.tsx";
import {PlayerActivityTab} from "../components/players/tabs/PlayerActivityTab.tsx";
import {PlayerMatchesTab} from "../components/players/tabs/PlayerMatchesTab.tsx";

export type PlayerTabType = 'statistics' | 'wordcloud' | 'histogram' | 'heroes' | 'wardmap' | 'peer' | 'pro' | 'counts' | 'records' | 'activity' | 'matches';

export interface PlayerTab {
    id: PlayerTabType;
    label: string;
    disabled?: boolean;
}

export const PlayerDetailsPage: React.FC = () => {
    const { playerId } = useParams<{ playerId: string }>();
    const parsedId = Number(playerId);

    const [filters, ] = useState<PlayerEndpointParameters>({});
    const [activeTab, setActiveTab] = useState<PlayerTabType>('statistics');

    const { data: player, isLoading, isError } = usePlayer(parsedId);

    // Pass '!!player' to ensure WL waits for player to exist (though logically parsedId is enough)
    const { data: wl } = usePlayerWinLoss(parsedId, filters, !!player);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [parsedId]);

    if (isNaN(parsedId)) return <NotFoundPage />;
    if (isLoading) return <LoadingSpinner text="Summoning Player Profile..." />;
    if (isError || !player) return <NotFoundPage />;

    const isStatsEmpty = wl && wl.wins === 0 && wl.losses === 0;
    // TODO maybe check only by isStatsEmpty?
    const isPrivate = player.profile.fhUnavailable?.value === BooleanState.True || isStatsEmpty;

    const tabs: PlayerTab[] = [
        { id: 'statistics', label: 'Stats', disabled: isPrivate },
        { id: 'wordcloud', label: 'Word Cloud', disabled: isPrivate },
        { id: 'histogram', label: 'Histograms', disabled: isPrivate },
        { id: 'heroes', label: 'Heroes', disabled: isPrivate },
        { id: 'wardmap', label: 'Ward Map', disabled: isPrivate },
        { id: 'peer', label: 'Peers', disabled: isPrivate },
        { id: 'pro', label: 'Pros', disabled: isPrivate },
        { id: 'counts', label: 'Counts', disabled: isPrivate },
        { id: 'records', label: 'Records', disabled: isPrivate },
        { id: 'activity', label: 'Activity', disabled: isPrivate },
        { id: 'matches', label: 'Matches', disabled: isPrivate },
    ];
    // TODO remove winrate from top, just save for calculating isStatsEmpty because of incostistent state with activity

    return (
        <div className="min-h-screen bg-[#0f1114] text-white pb-10">

            <PlayerHeader player={player} filters={filters} />

            <div className="mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                <div className="flex justify-center border-b border-[#2e353b] mb-8 overflow-x-auto no-scrollbar">
                    <div className="flex gap-1 min-w-max">
                        {tabs.map((tab) => (
                            <TabButton
                                key={tab.id}
                                label={tab.label}
                                isActive={activeTab === tab.id}
                                disabled={tab.disabled}
                                onClick={() => setActiveTab(tab.id)}
                            />
                        ))}
                    </div>
                </div>

                {/* --- CONTENT AREA --- */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">

                    {/* Private Profile Warning */}
                    {isPrivate ? (
                        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-[#2e353b] rounded-3xl bg-[#15171c]/50">
                            <span className="text-6xl mb-4 opacity-50 grayscale">🔒</span>
                            <h2 className="text-2xl font-bold text-white mb-2">Private Profile</h2>
                            <p className="text-[#808fa6] max-w-md text-center leading-relaxed px-4">
                                This player has not exposed their match data to public API.
                                <br/>We cannot retrieve match history or statistics.
                            </p>
                        </div>
                    ) : (
                        <>
                            {activeTab === 'statistics' && <PlayerStatsTab accountId={parsedId} filters={filters}/>}
                            {activeTab === 'wordcloud' && (<PlayerWordCloudTab accountId={parsedId} filters={filters} />)}
                            {activeTab === 'histogram' && (<PlayerHistogramsTab accountId={parsedId} filters={filters} />)}
                            {activeTab === 'heroes' && (<PlayerHeroesTab accountId={parsedId} filters={filters} />)}
                            {activeTab === 'wardmap' && (<PlayerWardMapTab accountId={parsedId} filters={filters} />)}
                            {activeTab === 'peer' && (<PlayerPeersTab accountId={parsedId} filters={filters} />)}
                            {activeTab === 'pro' && (<PlayerProsTab accountId={parsedId} filters={filters} />)}
                            {activeTab === 'counts' && (<PlayerCountsTab accountId={parsedId} filters={filters} />)}
                            {activeTab === 'records' && (<PlayerRecordsTab accountId={parsedId} filters={filters} />)}
                            {activeTab === 'activity' && (<PlayerActivityTab accountId={parsedId} filters={filters} />)}
                            {activeTab === 'matches' && (<PlayerMatchesTab accountId={parsedId} filters={filters} />)}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
const TabButton = ({ label, isActive, disabled, onClick }: { label: string, isActive: boolean, disabled?: boolean, onClick?: () => void }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={clsx(
            "px-6 py-4 text-sm font-bold uppercase tracking-widest border-b-2 transition-all duration-300 whitespace-nowrap",
            isActive
                ? "border-[#e7d291] text-[#e7d291] bg-gradient-to-t from-[#e7d291]/10 to-transparent"
                : "border-transparent text-[#808fa6] hover:text-white hover:bg-[#1a1d24]",
            disabled && "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-[#808fa6]"
        )}
    >
        {label}
        {disabled && <span className="ml-2 text-xs opacity-50">🔒</span>}
    </button>
);
