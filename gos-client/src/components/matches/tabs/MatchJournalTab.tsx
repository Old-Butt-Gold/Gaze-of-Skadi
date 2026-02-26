import React, { useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import clsx from 'clsx';
import { useMatchJournal } from '../../../hooks/queries/useMatchJournal';
import { useObjectiveNames } from '../../../hooks/queries/useObjectiveNames';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { ErrorDisplay } from '../../ui/ErrorDisplay';
import { UnparsedMatchWarning } from '../UnparsedMatchWarning';
import { MatchPlayerCell } from '../MatchPlayerCell';
import { Icon } from '../../Icon';
import { HeroCell } from '../../heroes/HeroCell';
import { RUNE_NAMES, isRadiantTeam, parseObjectiveName } from '../../../utils/matchUtils';
import { formatDuration } from '../../../utils/formatUtils';
import { TeamEnum } from "../../../types/common";
import type { MatchOutletContext } from '../../../pages/MatchDetailsPage';
import type { PlayerInfoDto } from '../../../types/matchGeneralInformation.ts';
import {
    ConnectionEventType,
    ObjectiveType,
    type BuybackEventDto,
    type ConnectionEventDto,
    type KillEventDto,
    type RuneEventDto,
    type ObjectiveEventDto,
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

    const isDisconnect = type === ConnectionEventType.Disconnected;
    const text = type === ConnectionEventType.Connected ? "Connected" : type === ConnectionEventType.Reconnected ? "Reconnected" : "Disconnected";

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

const ObjectiveEventRow: React.FC<{ event: ObjectiveEventDto; allPlayers: PlayerInfoDto[]; objectiveNames: string[] }> = ({ event, allPlayers, objectiveNames }) => {
    const type = event.type.value;
    const player = event.playerIndex != null ? allPlayers[event.playerIndex] : null;

    let isRadiantEvent = true;
    if (player) {
        isRadiantEvent = isRadiantTeam(player.isRadiant);
    } else if (event.targetTeam) {
        isRadiantEvent = event.targetTeam.value === TeamEnum.Dire;
    }

    const rowClass = clsx("flex items-center gap-3 w-full", !isRadiantEvent && "flex-row-reverse");
    const innerRowClass = clsx("flex items-center gap-1.5 py-0.5 rounded", !isRadiantEvent && "flex-row-reverse");

    switch (type) {
        case ObjectiveType.ChatMessageFirstBlood:
            return (
                <div className={rowClass}>
                    {player && <MatchPlayerCell player={player} useIcon={false} hideName={true} />}
                    <div className={innerRowClass}>
                        <span className="text-sm text-red-400 font-bold uppercase tracking-widest">Drew First Blood</span>
                        <Icon src="/assets/images/firstblood_icon.svg" size={6} alt="Drew First Blood" />
                    </div>
                </div>
            );
        case ObjectiveType.ChatMessageRoshanKill:
            return (
                <div className="flex items-center justify-center gap-3 w-full text-[#e7d291]">
                    <Icon src="/assets/images/roshan_icon.png" size={8} alt="Roshan" />
                    <span className="text-sm font-bold uppercase tracking-widest">Roshan was slained</span>
                </div>
            );
        case ObjectiveType.ChatMessageAegis:
        case ObjectiveType.ChatMessageAegisStolen:
            return (
                <div className={rowClass}>
                    {player && <MatchPlayerCell player={player} useIcon={false} hideName={true} />}
                    <div className={innerRowClass}>
                        <span className="text-sm text-[#e7d291] font-bold uppercase tracking-widest">
                            {type === ObjectiveType.ChatMessageAegisStolen ? "Stole Aegis" : "Picked up Aegis"}
                        </span>
                        <Icon src="/assets/images/aegis_icon.png" size={8} alt="Aegis" />
                    </div>
                </div>
            );
        case ObjectiveType.ChatMessageTormentorKill:
            return (
                <div className={rowClass}>
                    {player && <MatchPlayerCell player={player} useIcon={false} hideName={true} />}
                    <div className={innerRowClass}>
                        <span className="text-sm text-[#38bdf8] font-bold uppercase tracking-widest">Have destroyed the Tormentor</span>
                        <Icon src="/assets/images/shard_active.png" size={8} alt="Tormentor" />
                    </div>
                </div>
            );
        case ObjectiveType.BuildingKill:
            {
                const parsedTarget = event.target ? parseObjectiveName(event.target).name : "Building";

                if (player) {
                    return (
                        <div className={rowClass}>
                            <MatchPlayerCell player={player} useIcon={false} hideName={true} />
                            <div className={innerRowClass}>
                                <span className="text-sm text-[#f59e0b] font-bold uppercase tracking-widest">Destroyed {parsedTarget}</span>
                            </div>
                        </div>
                    );
                } else if (event.target && objectiveNames.includes(event.target)) {
                    const isDireCreeps = event.targetTeam?.value === TeamEnum.Radiant;
                    const creepIcon = isDireCreeps ? "/assets/images/dire_creep.png" : "/assets/images/radiant_creep.png";
                    const creepName = isDireCreeps ? "Dire Creeps" : "Radiant Creeps";

                    return (
                        <div className={rowClass}>
                            <div className={clsx("flex items-center gap-2", !isRadiantEvent && "flex-row-reverse")}>
                                <Icon src={creepIcon} size={10} alt={creepName} />
                            </div>
                            <div className={innerRowClass}>
                                <span className="text-sm text-[#f59e0b] font-bold uppercase tracking-widest">Destroyed {parsedTarget}</span>
                            </div>
                        </div>
                    );
                }
                return null;
            }
        default:
            return null;
    }
};

export const MatchJournalTab: React.FC = () => {
    const { matchId, players, isParsed } = useOutletContext<MatchOutletContext>();
    const { data: journalData, isLoading, isError } = useMatchJournal(matchId, isParsed);
    const { data: objectiveNames = [] } = useObjectiveNames();

    const [filters, setFilters] = useState<Record<JournalEventType, boolean>>({
        kill: true,
        buyback: true,
        rune: true,
        connection: true,
        objective: true
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
        journalData.objectives?.forEach((o, i) => events.push({ id: `obj-${i}`, type: 'objective', time: o.time, data: o }));

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
                            { key: 'objective' as const, label: 'Objectives', color: 'text-[#f59e0b]' },
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
                                    {ev.type === 'objective' && <ObjectiveEventRow event={ev.data as ObjectiveEventDto} allPlayers={players} objectiveNames={objectiveNames} />}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};
