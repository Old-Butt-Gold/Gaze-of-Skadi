import React, { useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import clsx from 'clsx';
import { useMatchJournal } from '../../../hooks/queries/useMatchJournal';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { ErrorDisplay } from '../../ui/ErrorDisplay';
import { UnparsedMatchWarning } from '../UnparsedMatchWarning';
import { MatchPlayerCell } from '../MatchPlayerCell';
import { Icon } from '../../Icon';
import { HeroCell } from '../../heroes/HeroCell';
import { RUNE_NAMES, isRadiantTeam } from '../../../utils/matchUtils';
import { formatDuration } from '../../../utils/formatUtils';
import type { MatchOutletContext } from '../../../pages/MatchDetailsPage';
import type { PlayerInfoDto } from '../../../types/matchPlayers';
import {
    ConnectionEventType,
    type BuybackEventDto,
    type ConnectionEventDto,
    type KillEventDto,
    type RuneEventDto,
    type UnifiedJournalEvent,
    type JournalEventType
} from '../../../types/matchJournal';

const KillEventRow: React.FC<{ event: KillEventDto; allPlayers: PlayerInfoDto[] }> = ({ event, allPlayers }) => {
    const killer = allPlayers[event.killerIndex];
    const victim = allPlayers.find(p => p.heroId === event.victimHeroId);
    const isRadiant = killer ? isRadiantTeam(killer.isRadiant) : (victim ? !isRadiantTeam(victim.isRadiant) : true);

    return (
        <div className={clsx("flex items-center gap-3 w-full", !isRadiant && "flex-row-reverse")}>
            {killer ? (
                <MatchPlayerCell player={killer} useIcon={false} hideName={true} />
            ) : (
                <span className="text-xs font-bold text-red-400">NPC / Tower</span>
            )}
            <div className={clsx("flex items-center gap-1.5 px-2 py-0.5 rounded", !isRadiant && "flex-row-reverse")}>
                <span className="text-sm text-red-400 uppercase font-bold tracking-widest">Killed</span>
                <Icon src="/assets/images/death_icon.webp" size={6} alt="Death" />
            </div>
            <HeroCell heroId={event.victimHeroId} showName={false} />
        </div>
    );
};

const BuybackEventRow: React.FC<{ event: BuybackEventDto; allPlayers: PlayerInfoDto[] }> = ({ event, allPlayers }) => {
    const player = allPlayers[event.playerIndex];
    const isRadiant = isRadiantTeam(player.isRadiant);

    return (
        <div className={clsx("flex items-center gap-3 w-full", !isRadiant && "flex-row-reverse")}>
            <MatchPlayerCell player={player} useIcon={false} hideName={true} />
            <div className={clsx("flex items-center gap-1.5 px-2 py-0.5 rounded", !isRadiant && "flex-row-reverse")}>
                <span className="text-sm text-[#facc15] uppercase font-bold tracking-widest">Bought Back</span>
                <Icon src="/assets/images/gold.png" size={6} />
            </div>
        </div>
    );
};

const RuneEventRow: React.FC<{ event: RuneEventDto; allPlayers: PlayerInfoDto[] }> = ({ event, allPlayers }) => {
    const player = allPlayers[event.playerIndex];
    const runeId = event.rune.value;
    const runeName = RUNE_NAMES[runeId] || "Unknown";
    const isRadiant = isRadiantTeam(player.isRadiant);

    return (
        <div className={clsx("flex items-center gap-3 w-full", !isRadiant && "flex-row-reverse")}>
            <MatchPlayerCell player={player} useIcon={false} hideName={true} />
            <span className="text-xs text-[#808fa6] uppercase font-bold tracking-widest">Picked up</span>
            <div className={clsx("flex items-center gap-1.5 py-0.5 rounded", !isRadiant && "flex-row-reverse")}>
                <Icon src={`/assets/images/rune_${runeId}.png`} size={6} alt={runeName} />
                <span className="text-sm font-bold text-[#e7d291]">{runeName} Rune</span>
            </div>
        </div>
    );
};

const ConnectionEventRow: React.FC<{ event: ConnectionEventDto; allPlayers: PlayerInfoDto[] }> = ({ event, allPlayers }) => {
    const player = allPlayers[event.playerIndex];
    const type = event.event.value;
    const isRadiant = isRadiantTeam(player.isRadiant);

    const isDisconnect = type === ConnectionEventType.Disconnected || type === ConnectionEventType.Abandoned;
    const text = type === ConnectionEventType.Connected ? "Connected" : type === ConnectionEventType.Abandoned ? "Abandoned" : "Disconnected";

    return (
        <div className={clsx("flex items-center gap-3 w-full", !isRadiant && "flex-row-reverse")}>
            <MatchPlayerCell player={player} useIcon={false} hideName={true} />
            <div className={clsx(
                "flex items-center gap-1.5 px-2 py-0.5 rounded",
                isDisconnect ? "text-red-400" : "text-emerald-400",
                !isRadiant && "flex-row-reverse"
            )}>
                <span className="text-sm uppercase font-bold tracking-widest">{text}</span>
                {isDisconnect && <Icon src="/assets/images/disconnect_icon.png" />}
            </div>
        </div>
    );
};

export const MatchJournalTab: React.FC = () => {
    const { matchId, players, isParsed } = useOutletContext<MatchOutletContext>();
    const { data: journalData, isLoading, isError } = useMatchJournal(matchId, isParsed);

    const [filters, setFilters] = useState<Record<JournalEventType, boolean>>({
        kill: true,
        buyback: true,
        rune: true,
        connection: true
    });

    const toggleFilter = (type: JournalEventType) => {
        setFilters(prev => ({ ...prev, [type]: !prev[type] }));
    };

    const unifiedEvents = useMemo(() => {
        if (!journalData) return [];

        const events: UnifiedJournalEvent[] = [];

        journalData.kills?.forEach((k, i) => events.push({ id: `kill-${i}`, type: 'kill', time: k.time, data: k }));
        journalData.buybacks?.forEach((b, i) => events.push({ id: `bb-${i}`, type: 'buyback', time: b.time, data: b }));
        journalData.runes?.forEach((r, i) => events.push({ id: `rune-${i}`, type: 'rune', time: r.time, data: r }));
        journalData.connections?.forEach((c, i) => events.push({ id: `conn-${i}`, type: 'connection', time: c.time, data: c }));

        return events.sort((a, b) => a.time - b.time);
    }, [journalData]);

    const filteredEvents = useMemo(() => {
        return unifiedEvents.filter(ev => filters[ev.type]);
    }, [unifiedEvents, filters]);

    if (!isParsed) return <UnparsedMatchWarning />;
    if (isLoading) return <LoadingSpinner text="Reading Match Journal..." />;
    if (isError) return <ErrorDisplay message="Failed to load journal data." />;
    if (!journalData) return null;

    return (
        <div className="w-full lg:w-[90%] mx-auto mt-6 animate-in fade-in duration-500 pb-10">

            <div className="bg-[#15171c] border border-[#2e353b] rounded-xl shadow-xl overflow-hidden mb-6">
                <div className="p-4 lg:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h2 className="text-xl font-serif font-bold text-[#e3e3e3] uppercase tracking-widest flex items-center gap-3">
                        Match Log
                    </h2>

                    <div className="flex flex-wrap bg-[#0b0e13] border border-[#2e353b] rounded-lg p-1 overflow-x-auto gap-1">
                        {[
                            { key: 'kill' as const, label: 'Kills', color: 'text-red-400' },
                            { key: 'buyback' as const, label: 'Buybacks', color: 'text-[#facc15]' },
                            { key: 'rune' as const, label: 'Runes', color: 'text-blue-400' },
                            { key: 'connection' as const, label: 'Connections', color: 'text-[#808fa6]' }
                        ].map(f => (
                            <button
                                key={f.key}
                                onClick={() => toggleFilter(f.key)}
                                className={clsx(
                                    "px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all whitespace-nowrap",
                                    filters[f.key]
                                        ? `bg-[#2e353b] ${f.color} shadow-inner`
                                        : "text-[#58606e] hover:text-[#808fa6] hover:bg-[#1a1d24]"
                                )}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-[#15171c] border border-[#2e353b] rounded-xl shadow-xl overflow-hidden">
                {filteredEvents.length === 0 ? (
                    <div className="text-center text-[#58606e] py-10 italic">No events match the selected filters.</div>
                ) : (
                    <div className="flex flex-col">
                        {filteredEvents.map((ev, index) => (
                            <div
                                key={ev.id}
                                className={clsx(
                                    "flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-3 px-4 lg:px-6 hover:bg-[#1a1d24] transition-colors border-b border-[#2e353b]/30",
                                    index % 2 === 0 ? "bg-transparent" : "bg-[#0b0e13]/20"
                                )}
                            >
                                <div className="font-mono font-bold text-sm text-[#808fa6] shrink-0 pt-1 sm:pt-0">
                                    {formatDuration(ev.time)}
                                </div>

                                <div className="flex-1 min-w-0">
                                    {ev.type === 'kill' && <KillEventRow event={ev.data as KillEventDto} allPlayers={players} />}
                                    {ev.type === 'buyback' && <BuybackEventRow event={ev.data as BuybackEventDto} allPlayers={players} />}
                                    {ev.type === 'rune' && <RuneEventRow event={ev.data as RuneEventDto} allPlayers={players} />}
                                    {ev.type === 'connection' && <ConnectionEventRow event={ev.data as ConnectionEventDto} allPlayers={players} />}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};
