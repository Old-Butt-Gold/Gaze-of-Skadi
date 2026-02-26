import React, { useEffect } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { useMatchPlayers } from '../hooks/queries/useMatchPlayers';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorDisplay } from '../components/ui/ErrorDisplay';
import { NotFoundPage } from './NotFoundPage';
import { BooleanState } from '../types/common';
import type { PlayerInfoDto } from '../types/matchGeneralInformation.ts';

export type MatchTab = 'overview' | 'chat' | 'cosmetics' | 'actions' | 'items'
    | 'benchmarks' | 'graphics' | 'performance' | 'laning'
    | 'casts' | 'damage' | 'earnings' | 'objectives'
    | 'vision' | 'teamfights' | 'journal';

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
        { id: 'vision', label: 'Vision', requiresParse: true },
        { id: 'teamfights', label: 'Teamfights', requiresParse: true },
        { id: 'journal', label: 'Journal', requiresParse: true },
        { id: 'chat', label: 'Chat Log', requiresParse: true },
        { id: 'cosmetics', label: 'Cosmetics', requiresParse: true },
    ];

    return (
        <div className="w-full min-h-screen pb-10 animate-fade-in bg-[#0b0e13]">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex border-b border-[#2e353b] mb-8 overflow-x-auto no-scrollbar scroll-smooth items-center justify-start">
                    <div className="flex gap-1 min-w-max w-fit mx-auto px-4">
                        {tabs.map((tab) => {
                            const isDisabled = tab.requiresParse && !isParsed;
                            return (
                                <TabButton
                                    key={tab.id}
                                    label={tab.label}
                                    to={tab.id}
                                    isActive={activeTab === tab.id}
                                    disabled={isDisabled}
                                />
                            );
                        })}
                    </div>
                </div>

                <div className="min-h-[50vh] animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <Outlet context={contextValue} />
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
            "px-6 py-4 text-sm font-bold uppercase tracking-widest border-b-2 transition-all duration-300 whitespace-nowrap flex items-center",
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
