import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTeamDetails } from '../hooks/queries/useTeamDetails';
import { TeamHeader } from '../components/teams/TeamHeader';
import { TeamMatchesTable } from '../components/teams/TeamMatchesTable';
import { TeamRoster } from '../components/teams/TeamRoster';
import { TeamHeroesGrid } from '../components/teams/TeamHeroesGrid';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorDisplay } from '../components/ui/ErrorDisplay';
import { NotFoundPage } from './NotFoundPage'; // Импорт NotFound
import clsx from 'clsx';

export type Tab = 'matches' | 'roster' | 'heroes';

export const TeamDetailsPage: React.FC = () => {
    const { teamId } = useParams<{ teamId: string }>();
    const parsedId = Number(teamId);
    const isValidId = !isNaN(parsedId) && parsedId > 0;

    const { team, matches, players, heroes, isLoading, isError } = useTeamDetails(isValidId ? parsedId : 0);
    const [activeTab, setActiveTab] = useState<Tab>('matches');

    if (!isValidId) {
        return <NotFoundPage />;
    }

    if (isLoading) return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner text="Loading Team Data..." /></div>;
    if (isError || !team) return <ErrorDisplay message="Failed to load team details." />;

    return (
        <div className="w-full min-h-screen pb-20 animate-fade-in">
            <TeamHeader team={team} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                {/* Tabs Navigation */}
                <div className="border-b border-[#2e353b] mb-8 overflow-x-auto">
                    <nav className="flex space-x-8 min-w-max" aria-label="Tabs">
                        {(['matches', 'roster', 'heroes'] as Tab[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={clsx(
                                    "py-4 px-2 border-b-2 font-bold text-sm uppercase tracking-widest transition-colors",
                                    activeTab === tab
                                        ? "border-[#e7d291] text-[#e7d291]"
                                        : "border-transparent text-[#808fa6] hover:text-white hover:border-[#58606e]"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Tab Content */}
                <div className="min-h-[400px]">
                    {activeTab === 'matches' && matches && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            {/* Убрали заголовок "Recent Matches", так как вкладка уже говорит об этом, чище UI */}
                            {matches.length === 0 ? (
                                <div className="text-[#58606e] text-center py-10 border border-[#2e353b] rounded-xl bg-[#1a1d24]">
                                    No recent matches found.
                                </div>
                            ) : (
                                <TeamMatchesTable matches={matches} team={team} />
                            )}
                        </div>
                    )}

                    {activeTab === 'roster' && players && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            {players.length === 0 ? (
                                <div className="text-[#58606e] text-center py-10 border border-[#2e353b] rounded-xl bg-[#1a1d24]">
                                    No player data available.
                                </div>
                            ) : (
                                <TeamRoster players={players} />
                            )}
                        </div>
                    )}

                    {activeTab === 'heroes' && heroes && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            {heroes.length === 0 ? (
                                <div className="text-[#58606e] text-center py-10 border border-[#2e353b] rounded-xl bg-[#1a1d24]">
                                    No hero data available.
                                </div>
                            ) : (
                                <TeamHeroesGrid heroes={heroes} />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
