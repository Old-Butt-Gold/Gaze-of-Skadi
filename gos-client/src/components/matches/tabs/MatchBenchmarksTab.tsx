import React, { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import clsx from 'clsx';
import { useMatchBenchmarks } from '../../../hooks/queries/useMatchBenchmarks';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { ErrorDisplay } from '../../ui/ErrorDisplay';
import { MatchPlayerCell } from '../MatchPlayerCell';
import { Icon } from '../../Icon';
import { isRadiantTeam } from '../../../utils/matchUtils';
import type { MatchOutletContext } from '../../../pages/MatchDetailsPage';
import type { PlayerBenchmarkDto } from '../../../types/matchBenchmarks';
import type { PlayerInfoDto } from '../../../types/matchPlayers';

const BENCHMARK_COLUMNS = [
    { key: 'GoldPerMin', label: 'GPM', full: 'Gold Per Minute' },
    { key: 'XpPerMin', label: 'XPM', full: 'Experience Per Minute' },
    { key: 'KillsPerMin', label: 'KPM', full: 'Kills Per Minute' },
    { key: 'LastHitsPerMin', label: 'LHM', full: 'Last Hits Per Minute' },
    { key: 'HeroDamagePerMin', label: 'HDM', full: 'Hero Damage Per Minute' },
    { key: 'HeroHealingPerMin', label: 'HHM', full: 'Hero Healing Per Minute' },
    { key: 'TowerDamage', label: 'TD', full: 'Tower Damage' },
];

const getPercentageColor = (pct: number) => {
    if (pct >= 0.8) return 'text-emerald-400';
    if (pct >= 0.6) return 'text-cyan-400';
    if (pct >= 0.4) return 'text-yellow-400';
    if (pct >= 0.2) return 'text-orange-400';
    return 'text-red-400';
};

interface TeamBenchmarkTableProps {
    teamPlayers: number[];
    players: PlayerInfoDto[];
    benchmarksMap: Map<number, PlayerBenchmarkDto>;
}

const TeamBenchmarkTable: React.FC<TeamBenchmarkTableProps> = ({ teamPlayers, players, benchmarksMap }) => {
    return (
        <div className="overflow-x-auto">
            <div className="min-w-[1000px] flex flex-col">
                <div className="grid grid-cols-[minmax(220px,2fr)_repeat(7,minmax(110px,1fr))] gap-2 p-4 bg-[#1a1d24] border-y border-[#2e353b] text-xs font-black text-[#808fa6] uppercase tracking-widest">
                    <div className="flex items-center justify-center">Player</div>
                    {BENCHMARK_COLUMNS.map(col => (
                        <div key={col.key} className="flex items-center justify-center relative group/tooltip cursor-help" title={col.full}>
                            {col.label}
                        </div>
                    ))}
                </div>

                <div className="flex flex-col">
                    {teamPlayers.map(playerIdx => {
                        const player = players[playerIdx];
                        const playerBenchmarks = benchmarksMap.get(playerIdx);

                        if (!player) return null;

                        return (
                            <div
                                key={playerIdx}
                                className="grid grid-cols-[minmax(220px,2fr)_repeat(7,minmax(110px,1fr))] gap-2 p-3 lg:p-4 border-b border-[#2e353b]/40 last:border-b-0 hover:bg-[#1a1d24] transition-colors"
                            >
                                <div className="flex items-center justify-center shrink-0 border-r border-[#2e353b]/50 pr-2">
                                    <MatchPlayerCell player={player} useIcon={false} />
                                </div>

                                {BENCHMARK_COLUMNS.map(col => {
                                    const stat = playerBenchmarks?.benchmarks?.find(b => b.name === col.key);

                                    const raw = stat?.raw ?? 0;
                                    const pct = stat?.percentage ?? 0;

                                    const displayPct = (pct * 100).toFixed(2);
                                    const displayRaw = Number.isInteger(raw) ? raw : raw.toFixed(2);

                                    return (
                                        <div key={col.key} className="flex flex-col items-center justify-center gap-1 whitespace-nowrap">
                                            <span className={clsx("font-black text-sm drop-shadow-sm", getPercentageColor(pct))}>
                                                {displayPct}%
                                            </span>
                                            <span className="text-xs font-mono text-[#58606e] bg-[#0b0e13] px-2 py-0.5 rounded border border-[#2e353b]/50">
                                                {displayRaw}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export const MatchBenchmarksTab: React.FC = () => {
    const { matchId, players } = useOutletContext<MatchOutletContext>();
    const { data: benchmarksData, isLoading, isError } = useMatchBenchmarks(matchId);

    const { radiantPlayers, direPlayers, benchmarksMap } = useMemo(() => {
        const radiant: number[] = [];
        const dire: number[] = [];
        const bMap = new Map<number, PlayerBenchmarkDto>();

        if (benchmarksData && Array.isArray(benchmarksData)) {
            benchmarksData.forEach(bd => bMap.set(bd.playerIndex, bd));
        }

        if (players && Array.isArray(players)) {
            players.forEach((p, idx) => {
                if (isRadiantTeam(p.isRadiant)) radiant.push(idx);
                else dire.push(idx);
            });
        }

        return { radiantPlayers: radiant, direPlayers: dire, benchmarksMap: bMap };
    }, [players, benchmarksData]);

    if (isLoading) return <LoadingSpinner text="Analyzing Benchmarks..." />;
    if (isError) return <ErrorDisplay message="Failed to load match benchmarks." />;
    if (!benchmarksData || benchmarksData.length === 0) {
        return <div className="text-center text-[#808fa6] py-10 bg-[#15171c] rounded-xl border border-[#2e353b] mt-6 w-full lg:w-[90%] mx-auto">No benchmarks data found.</div>;
    }

    return (
        <div className="w-full lg:w-[95%] mx-auto animate-in fade-in duration-500 space-y-4">
            <div className="bg-[#15171c] border border-[#2e353b] rounded-xl overflow-hidden shadow-xl">
                <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-emerald-500/10 to-[#1a1d24] border-b border-[#2e353b]">
                    <Icon src="/assets/images/radiant.png" size={6} />
                    <h3 className="text-lg font-serif font-bold text-emerald-400 uppercase tracking-widest drop-shadow-sm">
                        Radiant - Benchmarks
                    </h3>
                </div>
                <TeamBenchmarkTable
                    teamPlayers={radiantPlayers}
                    players={players}
                    benchmarksMap={benchmarksMap}
                />
            </div>

            <div className="bg-[#15171c] border border-[#2e353b] rounded-xl overflow-hidden shadow-xl">
                <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-red-500/10 to-[#1a1d24] border-b border-[#2e353b]">
                    <Icon src="/assets/images/dire.png" size={6} />
                    <h3 className="text-lg font-serif font-bold text-red-400 uppercase tracking-widest drop-shadow-sm">
                        Dire - Benchmarks
                    </h3>
                </div>
                <TeamBenchmarkTable
                    teamPlayers={direPlayers}
                    players={players}
                    benchmarksMap={benchmarksMap}
                />
            </div>
        </div>
    );
};
