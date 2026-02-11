import React, { useMemo } from 'react';
import clsx from 'clsx';
import { usePlayerCounts } from '../../../hooks/queries/usePlayerCounts';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import type { PlayerEndpointParameters } from '../../../types/player';
import type { PlayerCountStats } from '../../../types/playerCount';
import {
    getGameModeName,
    getLobbyTypeName,
    getRegionName,
    getLeaverStatusName,
    getLaneRoleName,
    getTeamName,
    getPatchName
} from '../../../utils/enumUtils';
import type {GameMode, LaneRole, LeaverStatus, LobbyType, Patch, Region, TeamEnum} from "../../../types/common.ts";

interface Props {
    accountId: number;
    filters: PlayerEndpointParameters;
}

const StatRow = ({ label, stats, maxGames }: { label: string, stats: PlayerCountStats, maxGames: number }) => {
    const winRate = stats.games > 0 ? (stats.win / stats.games) * 100 : 0;
    const playRate = maxGames > 0 ? (stats.games / maxGames) * 100 : 0;

    return (
        <div className="flex items-center gap-3 py-1.5 text-xs group hover:bg-[#1f2229] px-2 rounded transition-colors select-none">
            <div className="w-36 shrink-0 font-medium text-[#a3aab8] truncate group-hover:text-white transition-colors" title={label}>
                {label}
            </div>

            <div className="flex-grow flex flex-col gap-1">
                <div className="w-full h-1.5 bg-[#2e353b]/50 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#60a5fa] group-hover:bg-[#93c5fd] transition-all duration-500"
                        style={{ width: `${playRate}%` }}
                    />
                </div>
                <div className="w-full h-1 bg-[#2e353b]/50 rounded-full overflow-hidden opacity-70">
                    <div
                        className={clsx("h-full transition-all duration-500", winRate >= 50 ? "bg-emerald-500" : "bg-red-500")}
                        style={{ width: `${winRate}%` }}
                    />
                </div>
            </div>

            <div className="w-20 shrink-0 text-right">
                <div className="font-mono font-bold text-white leading-none">{stats.games}</div>
                <div className={clsx("font-mono text-[10px] font-bold mt-0.5", winRate >= 50 ? "text-emerald-400" : "text-red-400")}>
                    {winRate.toFixed(1)}%
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, data, nameMap }: { title: string, data: Record<string, PlayerCountStats>, nameMap: (key: number) => string }) => {
    const sortedItems = useMemo(() => {
        return Object.entries(data)
            .map(([key, stats]) => ({
                key,
                label: nameMap(Number(key)),
                stats
            }))
            .sort((a, b) => b.stats.games - a.stats.games);
    }, [data, nameMap]);

    if (sortedItems.length === 0) return null;

    const maxGames = sortedItems[0]?.stats.games || 1;

    return (
        <div className="break-inside-avoid mb-6 bg-[#15171c] border border-[#2e353b] rounded-xl overflow-hidden shadow-lg flex flex-col hover:border-[#3e454d] transition-colors">
            <div className="bg-[#1a1d24] px-4 py-3 border-b border-[#2e353b] flex justify-between items-center">
                <h4 className="text-sm font-bold text-[#e7d291] uppercase tracking-widest">{title}</h4>
                <span className="text-sm text-[#58606e] font-mono bg-[#0f1114] px-2 py-0.5 rounded border border-[#2e353b]">
                    {sortedItems.length}
                </span>
            </div>

            <div className="flex justify-between px-4 pt-3 pb-1 text-[9px] uppercase font-bold text-[#58606e] tracking-widest">
                <span>Category</span>
                <div className="flex gap-8 pr-2">
                    <span>Freq / Win%</span>
                    <span>Matches</span>
                </div>
            </div>

            <div className="p-2 custom-scrollbar overflow-y-auto">
                {sortedItems.map((item) => (
                    <StatRow key={item.key} label={item.label} stats={item.stats} maxGames={maxGames} />
                ))}
            </div>
        </div>
    );
};

export const PlayerCountsTab: React.FC<Props> = ({ accountId, filters }) => {
    const { data, isLoading } = usePlayerCounts(accountId, filters);

    if (isLoading) return <LoadingSpinner text="Crunching numbers..." />;
    if (!data) return <div className="text-center text-[#808fa6] py-10">No match counts available.</div>;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Header */}
            <div className="flex justify-between items-end mb-6 px-2">
                <div>
                    <h3 className="text-lg font-serif font-bold text-white uppercase tracking-widest">Match Analysis</h3>
                    <p className="text-xs text-[#808fa6]">Statistical breakdown by game factors</p>
                </div>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                <StatCard title="Side" data={data.isRadiant} nameMap={(key: number) => getTeamName(key as TeamEnum)}/>
                <StatCard title="Lane Role" data={data.laneRole} nameMap={(key: number) => getLaneRoleName(key as LaneRole)}/>
                <StatCard title="Game Mode" data={data.gameMode} nameMap={(key: number) => getGameModeName(key as GameMode)}/>
                <StatCard title="Lobby Type" data={data.lobbyType} nameMap={(key: number) => getLobbyTypeName(key as LobbyType)}/>
                <StatCard title="Match Status" data={data.leaverStatus} nameMap={(key: number) => getLeaverStatusName(key as LeaverStatus)}/>
                <StatCard title="Region" data={data.region} nameMap={(key: number) => getRegionName(key as Region)}/>
                <StatCard title="Game Version" data={data.patch} nameMap={(key: number) => getPatchName(key as Patch)}/>
            </div>
        </div>
    );
};
