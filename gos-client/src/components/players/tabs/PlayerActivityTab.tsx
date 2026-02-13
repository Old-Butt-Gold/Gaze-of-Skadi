import React from 'react';
import { usePlayerActivity } from '../../../hooks/queries/usePlayerActivity';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import type { PlayerEndpointParameters } from '../../../types/player';
import {ActivityCharts} from "../ActivityCharts.tsx";
import {ErrorDisplay} from "../../ui/ErrorDisplay.tsx";
import {formatDateLong} from "../../../utils/formatUtils.ts";
import {ActivityCalendarSection} from "../ActivityCalendarSection.tsx";

interface Props {
    accountId: number;
    filters: PlayerEndpointParameters;
}

export const PlayerActivityTab: React.FC<Props> = ({ accountId, filters }) => {
    const { data, isLoading, isError } = usePlayerActivity(accountId, filters);

    if (isLoading) return <LoadingSpinner text="Analyzing battle logs..." />;
    if (isError || !data) return <ErrorDisplay message={"Activity data unavailable."}/>;

    const { stats, firstMatchStartTime, matchesByDay } = data;
    const totalMatches = stats.overall.wins + stats.overall.losses;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* --- Global Header Stats --- */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
                {/* Main Stats Card */}
                <div className="flex-grow bg-[#15171c] border border-[#2e353b] rounded-xl p-6 shadow-2xl relative overflow-hidden flex items-center justify-between">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#e7d291]/5 to-transparent pointer-events-none" />

                    <div>
                        <h2 className="text-3xl font-serif font-bold text-white uppercase tracking-widest drop-shadow-md">
                            {totalMatches.toLocaleString()} <span className="text-lg text-[#808fa6]">Matches</span>
                        </h2>
                        <div className="mt-1 text-xs text-[#808fa6] font-mono">
                            First Match: <span className="text-[#e3e3e3]">{formatDateLong(firstMatchStartTime)}</span>
                        </div>
                    </div>

                    <div className="text-right">
                        <div className="text-4xl font-bold font-mono text-[#10b981] drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                            {stats.overall.winRate}%
                        </div>
                        <div className="text-xs uppercase font-bold tracking-widest text-[#58606e] mt-1">
                            Win Rate
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/3 bg-[#15171c] border border-[#2e353b] rounded-xl p-6 flex flex-col justify-center shadow-lg">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                        <span className="text-[#10b981]">{stats.overall.wins} Wins</span>
                        <span className="text-[#ef4444]">{stats.overall.losses} Losses</span>
                    </div>
                    <div className="w-full h-3 bg-[#1a1d24] rounded-full overflow-hidden flex">
                        <div
                            className="h-full bg-[#10b981] shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                            style={{ width: `${stats.overall.winRate}%` }}
                        />
                        <div className="h-full bg-[#ef4444] flex-grow opacity-80" />
                    </div>
                </div>
            </div>

            <ActivityCharts stats={stats} />

            <ActivityCalendarSection matchesByDay={matchesByDay} />

        </div>
    );
};
