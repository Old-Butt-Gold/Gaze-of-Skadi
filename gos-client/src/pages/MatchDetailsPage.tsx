import React, { useEffect } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { useMatchPlayers } from '../hooks/queries/useMatchPlayers';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorDisplay } from '../components/ui/ErrorDisplay';
import { NotFoundPage } from './NotFoundPage';
import { BooleanState } from '../types/common';
import type { PlayerInfoDto } from '../types/matchPlayers';

export type MatchTab = 'overview' | 'chat' | 'cosmetics' | 'actions' | 'items' | 'benchmarks' | 'graphics' | 'performance' | 'laning' | 'casts' | 'damage' | 'earnings' | 'objectives';

export interface MatchOutletContext {
    matchId: number;
    players: PlayerInfoDto[];
    isParsed: boolean;
}

export const MatchDetailsPage: React.FC = () => {
    const { matchId } = useParams<{ matchId: string }>();
    const parsedId = Number(matchId);
    const location = useLocation();

    const activeTab = location.pathname.split('/').pop() as MatchTab;

    const { data: matchData, isLoading, isError } = useMatchPlayers(parsedId);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [parsedId]);

    if (isNaN(parsedId)) return <NotFoundPage />;
    if (isLoading) return <LoadingSpinner text="Scanning Match Data..." />;
    if (isError || !matchData) return <ErrorDisplay message="Failed to load match details." />;

    const isParsed = matchData.isMatchParsed.value === BooleanState.True;

    const contextValue: MatchOutletContext = {
        matchId: parsedId,
        players: matchData.players,
        isParsed
    };

    const tabs: { id: MatchTab; label: string; requiresParse?: boolean }[] = [
        { id: 'benchmarks', label: 'Benchmarks', requiresParse: false },
        { id: 'performance', label: 'Performance', requiresParse: true },
        { id: 'laning', label: 'Laning', requiresParse: true },
        { id: 'damage', label: 'Damage', requiresParse: true },
        { id: 'earnings', label: 'Earnings', requiresParse: true },
        { id: 'graphics', label: 'Graphics', requiresParse: true },
        { id: 'items', label: 'Items', requiresParse: true },
        { id: 'casts', label: 'Casts', requiresParse: true },
        { id: 'objectives', label: 'Objectives', requiresParse: true },
        { id: 'actions', label: 'Actions', requiresParse: true },
        { id: 'chat', label: 'Chat Log', requiresParse: true },
        { id: 'cosmetics', label: 'Cosmetics', requiresParse: true },
    ];

    return (
        <div className="w-full min-h-screen pb-10 animate-fade-in bg-[#0b0e13]">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="border-b border-[#2e353b] mb-6 overflow-x-auto">
                    <nav className="flex space-x-8 min-w-max">
                        {tabs.map((tab) => (
                            <Link
                                key={tab.id}
                                to={tab.id}
                                className={clsx(
                                    "py-4 px-2 border-b-2 font-bold text-sm uppercase tracking-widest transition-colors flex items-center gap-2",
                                    activeTab === tab.id
                                        ? "border-[#e7d291] text-[#e7d291]"
                                        : "border-transparent text-[#808fa6] hover:text-white hover:border-[#58606e]"
                                )}
                            >
                                {tab.label}
                                {tab.requiresParse && !isParsed && <span className="text-[10px] opacity-50">🔒</span>}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="min-h-[50vh] animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <Outlet context={contextValue} />
                </div>
            </div>
        </div>
    );
};
