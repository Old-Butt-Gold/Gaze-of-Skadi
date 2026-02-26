import React, { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import clsx from 'clsx';
import { useMatchEarnings } from '../../../hooks/queries/useMatchEarnings';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { ErrorDisplay } from '../../ui/ErrorDisplay';
import { UnparsedMatchWarning } from '../UnparsedMatchWarning';
import { MatchPlayerCell } from '../MatchPlayerCell';
import { Icon } from '../../Icon';
import { isRadiantTeam, GOLD_REASONS, XP_REASONS } from '../../../utils/matchUtils';
import type { MatchOutletContext } from '../../../pages/MatchDetailsPage';
import type { PlayerEarningsDto, IncomeReasonDto } from '../../../types/matchEarnings';
import type { PlayerInfoDto } from '../../../types/matchGeneralInformation.ts';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, type TooltipProps } from 'recharts';

interface IndexedPlayer {
    info: PlayerInfoDto;
    index: number;
}

const StatBox: React.FC<{ label: string; value: number; tooltip?: string }> = ({ label, value, tooltip }) => (
    <div className="flex flex-col items-center justify-center p-2 rounded bg-[#0b0e13]/50 border border-[#2e353b]/50 h-14 relative group/stat cursor-help">
        <span className="text-xs text-[#808fa6] font-bold uppercase tracking-wider mb-1 text-center leading-none">{label}</span>
        <span className={clsx("font-mono font-bold text-sm", value > 0 ? "text-[#e3e3e3]" : "text-[#58606e]")}>
            {value > 0 ? value.toLocaleString() : '-'}
        </span>
        {tooltip && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-[#1a1d24] border border-[#2e353b] p-2 rounded shadow-xl opacity-0 invisible group-hover/stat:opacity-100 group-hover/stat:visible transition-all z-50 pointer-events-none">
                <span className="text-xs font-bold text-white drop-shadow-md leading-tight">
                    {tooltip}
                </span>
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#2e353b]" />
            </div>
        )}
    </div>
);

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const sortedPayload = [...payload].sort((a, b) => (Number(b.value) || 0) - (Number(a.value) || 0));

        return (
            <div className="absolute -translate-y-full mb-2 bg-[#1a1d24]/95 backdrop-blur-md border border-[#2e353b] p-3 rounded-lg shadow-2xl flex flex-col gap-2 z-50 pointer-events-none whitespace-nowrap">
                {sortedPayload.map((entry) => (
                    <div key={entry.dataKey} className="flex items-center justify-between gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: entry.color }} />
                            <span className="text-xs font-bold text-[#808fa6] uppercase tracking-widest">{entry.name}</span>
                        </div>
                        <span className="font-mono font-black text-[#e3e3e3] text-xs">
                            {Number(entry.value).toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const StackedBarRecharts: React.FC<{
    title: string;
    reasons: IncomeReasonDto<number>[];
    dictionary: Record<number, { label: string; color: string }>;
    isGold: boolean;
    maxDomain: number;
}> = ({ title, reasons, dictionary, isGold, maxDomain }) => {
    const data = useMemo(() => {
        const positive = reasons.map(r => ({ ...r, amount: Math.abs(r.amount) })).filter(r => r.amount > 0).sort((a, b) => b.amount - a.amount);
        const total = positive.reduce((sum, r) => sum + r.amount, 0);

        const chartData = positive.map(r => {
            const config = dictionary[r.reason.value] || { label: `Reason ${r.reason.value}`, color: '#58606e' };
            return {
                key: config.label,
                color: config.color,
            };
        });

        const singleRowData: Record<string, string | number> = { name: 'Total' };
        positive.forEach(r => {
            const config = dictionary[r.reason.value] || { label: `Reason ${r.reason.value}`, color: '#58606e' };
            singleRowData[config.label] = r.amount;
        });

        return { chartData, singleRowData: [singleRowData], total };
    }, [reasons, dictionary]);

    if (data.total === 0) return null;

    return (
        <div className="flex flex-col gap-1 w-full">
            <div className="flex justify-between items-end mb-1">
                <span className="text-xs font-bold text-[#808fa6] uppercase tracking-widest">
                    {title}
                </span>
                <span className={clsx("font-mono font-black text-xs", isGold ? "text-[#e7d291]" : "text-[#38bdf8]")}>
                    {data.total.toLocaleString()}
                </span>
            </div>

            <div className="w-full h-6 relative flex items-center">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={data.singleRowData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                        <XAxis type="number" hide domain={[0, maxDomain]} />
                        <YAxis type="category" dataKey="name" hide />
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                            allowEscapeViewBox={{ x: true, y: true }}
                            wrapperStyle={{
                                zIndex: 1000,
                                overflow: 'visible',
                                pointerEvents: 'none'
                            }}
                            isAnimationActive={false}
                        />
                        {data.chartData.map((d, ) => (
                            <Bar
                                key={d.key}
                                dataKey={d.key}
                                stackId="a"
                                fill={d.color}
                                barSize={16}
                                isAnimationActive={false}
                            />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const PlayerEarningsCard: React.FC<{
    player: PlayerInfoDto;
    earnings: PlayerEarningsDto | undefined;
    maxGold: number;
    maxXp: number;
}> = ({ player, earnings, maxGold, maxXp }) => {
    return (
        <div className={"flex flex-col xl:flex-row gap-5 p-4 border-b border-[#2e353b]/50 hover:bg-[#1a1d24] transition-colors relative z-0 hover:z-10"}>
            <div className="flex items-center justify-center xl:justify-start xl:w-56 shrink-0 xl:border-r border-[#2e353b]/50 xl:pr-4">
                <MatchPlayerCell player={player} useIcon={false} />
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6 items-center">
                <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-4 gap-2">
                    <StatBox label="Lane" value={earnings?.laneCreepsKilled ?? 0} tooltip="Lane Creeps Killed" />
                    <StatBox label="Neutrals" value={earnings?.neutralCreepsKilled ?? 0} tooltip="Neutral Creeps Killed" />
                    <StatBox label="Ancients" value={earnings?.ancientCreepsKilled ?? 0} tooltip="Ancient Creeps Killed" />
                    <StatBox label="Towers" value={earnings?.towersKilled ?? 0} tooltip="Towers Destroyed" />
                    <StatBox label="Obs" value={earnings?.observerKills ?? 0} tooltip="Observer Wards Destroyed" />
                    <StatBox label="Sen" value={earnings?.sentryKills ?? 0} tooltip="Sentry Wards Destroyed" />
                    <StatBox label="Rosh" value={earnings?.roshanKills ?? 0} tooltip="Roshan Kills" />
                    <StatBox label="Cour" value={earnings?.couriersKilled ?? 0} tooltip="Couriers Killed" />
                </div>

                <div className="flex flex-col justify-center gap-5 bg-[#0b0e13]/30 p-4 rounded-lg border border-[#2e353b]/30">
                    <StackedBarRecharts
                        title="Gold Reasons"
                        reasons={earnings?.goldReasons as unknown as IncomeReasonDto<number>[] || []}
                        dictionary={GOLD_REASONS}
                        isGold={true}
                        maxDomain={maxGold}
                    />
                    <StackedBarRecharts
                        title="Experience Reasons"
                        reasons={earnings?.xpReasons as unknown as IncomeReasonDto<number>[] || []}
                        dictionary={XP_REASONS}
                        isGold={false}
                        maxDomain={maxXp}
                    />
                </div>
            </div>
        </div>
    );
};

export const MatchEarningsTab: React.FC = () => {
    const { matchId, players, isParsed } = useOutletContext<MatchOutletContext>();
    const { data: earningsData, isLoading, isError } = useMatchEarnings(matchId, isParsed);

    const { radiantPlayers, direPlayers, earningsMap, matchMaxGold, matchMaxXp } = useMemo(() => {
        const radiant: IndexedPlayer[] = [];
        const dire: IndexedPlayer[] = [];
        const map = new Map<number, PlayerEarningsDto>();
        let maxG = 0;
        let maxX = 0;

        if (players && Array.isArray(players)) {
            players.forEach((p, idx) => {
                if (isRadiantTeam(p.isRadiant)) radiant.push({ info: p, index: idx });
                else dire.push({ info: p, index: idx });
            });
        }

        if (earningsData && Array.isArray(earningsData)) {
            earningsData.forEach(d => {
                map.set(d.playerIndex, d);

                const playerGold = d.goldReasons.reduce((acc, r) => acc + Math.abs(r.amount), 0);
                const playerXp = d.xpReasons.reduce((acc, r) => acc + Math.abs(r.amount), 0);

                if (playerGold > maxG) maxG = playerGold;
                if (playerXp > maxX) maxX = playerXp;
            });
        }

        return {
            radiantPlayers: radiant,
            direPlayers: dire,
            earningsMap: map,
            matchMaxGold: maxG,
            matchMaxXp: maxX
        };
    }, [players, earningsData]);

    if (!isParsed) return <UnparsedMatchWarning />;
    if (isLoading) return <LoadingSpinner text="Processing Economics..." />;
    if (isError) return <ErrorDisplay message="Failed to load earnings data." />;
    if (!earningsData || earningsData.length === 0) {
        return <div className="text-center text-[#808fa6] py-10 bg-[#15171c] rounded-xl border border-[#2e353b] mt-6 w-full lg:w-[90%] mx-auto">No earnings data found.</div>;
    }

    return (
        <div className="w-full lg:w-[90%] mx-auto mt-6 animate-in fade-in duration-500 pb-10">
            <div className="bg-[#15171c] border border-[#2e353b] shadow-xl">

                <div className="hidden xl:grid grid-cols-[224px_1fr_1.5fr] bg-[#1a1d24] border-b border-[#2e353b] gap-6">
                    <div className="p-4 border-r border-[#2e353b]/50 text-xs font-bold text-[#808fa6] uppercase tracking-widest text-center">Player</div>
                    <div className="p-4 text-xs font-bold text-[#808fa6] uppercase tracking-widest text-center">Farming Stats</div>
                    <div className="p-4 text-xs font-bold text-[#808fa6] uppercase tracking-widest text-center">Income Reasons</div>
                </div>

                <div className="flex flex-col">
                    <div className="bg-linear-to-r from-emerald-500/10 to-[#1a1d24] border-y border-[#2e353b] px-4 py-2 flex items-center gap-2">
                        <Icon src="/assets/images/radiant.png" size={5} />
                        <span className="text-emerald-400 font-serif font-bold uppercase tracking-widest text-sm">Radiant Economics</span>
                    </div>

                    {radiantPlayers.map((p) => (
                        <PlayerEarningsCard
                            key={p.index}
                            player={p.info}
                            earnings={earningsMap.get(p.index)}
                            maxGold={matchMaxGold}
                            maxXp={matchMaxXp}
                        />
                    ))}

                    <div className="bg-linear-to-r from-red-500/10 to-[#1a1d24] border-y border-[#2e353b] px-4 py-2 flex items-center gap-2">
                        <Icon src="/assets/images/dire.png" size={5} />
                        <span className="text-red-400 font-serif font-bold uppercase tracking-widest text-sm">Dire Economics</span>
                    </div>

                    {direPlayers.map((p, ) => (
                        <div key={p.index}>
                            <PlayerEarningsCard
                                player={p.info}
                                earnings={earningsMap.get(p.index)}
                                maxGold={matchMaxGold}
                                maxXp={matchMaxXp}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
