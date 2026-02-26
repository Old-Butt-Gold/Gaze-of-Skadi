import React, { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import clsx from 'clsx';
import { useMatchObjectives } from '../../../hooks/queries/useMatchObjectives';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { ErrorDisplay } from '../../ui/ErrorDisplay';
import { UnparsedMatchWarning } from '../UnparsedMatchWarning';
import { MatchPlayerCell } from '../MatchPlayerCell';
import { Icon } from '../../Icon';
import { isRadiantTeam, RUNE_NAMES, parseObjectiveName } from '../../../utils/matchUtils';
import type { MatchOutletContext } from '../../../pages/MatchDetailsPage';
import type { PlayerInfoDto } from '../../../types/matchGeneralInformation.ts';
import type {DamageDataDto, PlayerObjectivesDto, RunesDataDto} from "../../../types/matchObjectvies.ts";

interface IndexedPlayer {
    info: PlayerInfoDto;
    index: number;
}

const RuneBadge: React.FC<{ rune: RunesDataDto }> = ({ rune }) => {
    const runeId = rune.key.value;
    const runeName = RUNE_NAMES[runeId] || `Rune ${runeId}`;

    return (
        <div className="relative flex shrink-0 group/rune cursor-help p-1" title={`${rune.value}x ${runeName}`}>
            <Icon src={`/assets/images/rune_${runeId}.png`} alt={runeName} size={10} />
            <div className="absolute -bottom-1 -right-1 bg-[#1a1d24] border border-[#2e353b] text-[#e7d291] text-xs font-mono font-black min-w-[20px] px-1 py-0.5 rounded-full z-10 shadow-sm flex items-center justify-center leading-none">
                {rune.value}
            </div>
        </div>
    );
};

const ObjectiveDamageBox: React.FC<{ damage: DamageDataDto }> = ({ damage }) => {
    const parsed = parseObjectiveName(damage.key);

    return (
        <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#0b0e13]/50 border border-[#2e353b]/50 hover:bg-[#0b0e13] hover:border-[#58606e]/50 transition-colors shadow-inner min-w-[110px] flex-1 sm:flex-none">
            <span className={clsx(
                "text-xs font-bold uppercase tracking-widest mb-1 text-center leading-none",
                parsed.team === 'radiant' ? 'text-emerald-400' : parsed.team === 'dire' ? 'text-red-400' : 'text-[#facc15]'
            )}>
                {parsed.name}
            </span>
            <span className="font-mono font-black text-sm text-[#e3e3e3]">
                {damage.value.toLocaleString()}
            </span>
        </div>
    );
};

const PlayerObjectivesCard: React.FC<{ player: PlayerInfoDto; data: PlayerObjectivesDto | undefined; }> = ({ player, data }) => {
    const runes = useMemo(() => [...(data?.objectives?.runes || [])].sort((a, b) => b.value - a.value), [data]);
    const damages = useMemo(() => [...(data?.objectives?.damage || [])].sort((a, b) => b.value - a.value), [data]);

    return (
        <div className="flex flex-col xl:grid xl:grid-cols-12 gap-5 xl:gap-0 p-4 border-b border-[#2e353b]/50 hover:bg-[#1a1d24] transition-colors">

            <div className="xl:col-span-2 flex items-center justify-center xl:justify-start shrink-0 xl:border-r border-[#2e353b]/50 xl:pr-6">
                <MatchPlayerCell player={player} useIcon={false} />
            </div>

            <div className="xl:col-span-2 flex flex-col gap-2.5 shrink-0 xl:border-r border-[#2e353b]/50 xl:px-6">
                <span className="text-xs text-[#808fa6] font-bold uppercase tracking-widest border-b border-[#2e353b]/50 pb-1 flex items-center justify-center gap-1.5 w-full">
                    Runes Picked Up
                </span>
                <div className="flex flex-wrap gap-2 pt-1 justify-center xl:justify-start">
                    {runes.length > 0 ? (
                        runes.map(r => <RuneBadge key={r.key.value} rune={r} />)
                    ) : (
                        <span className="text-sm text-[#58606e] italic flex items-center justify-center w-full h-full">No runes picked up.</span>
                    )}
                </div>
            </div>

            <div className="xl:col-span-8 flex flex-col gap-2.5 flex-1 w-full xl:pl-6">
                <span className="text-xs text-[#808fa6] font-bold uppercase tracking-widest border-b border-[#2e353b]/50 pb-1 flex items-center justify-center gap-1.5 w-full">
                    Objective Damage
                </span>
                <div className="flex flex-wrap gap-3 pt-1 justify-center xl:justify-start">
                    {damages.length > 0 ? (
                        damages.map(d => <ObjectiveDamageBox key={d.key} damage={d} />)
                    ) : (
                        <span className="text-sm text-[#58606e] italic flex items-center justify-center w-full h-full">No objective damage.</span>
                    )}
                </div>
            </div>

        </div>
    );
};

export const MatchObjectivesTab: React.FC = () => {
    const { matchId, players, isParsed } = useOutletContext<MatchOutletContext>();
    const { data: objectivesData, isLoading, isError } = useMatchObjectives(matchId, isParsed);

    const { radiantPlayers, direPlayers, objectivesMap } = useMemo(() => {
        const radiant: IndexedPlayer[] = [];
        const dire: IndexedPlayer[] = [];
        const map = new Map<number, PlayerObjectivesDto>();

        if (players && Array.isArray(players)) {
            players.forEach((p, idx) => {
                if (isRadiantTeam(p.isRadiant)) radiant.push({ info: p, index: idx });
                else dire.push({ info: p, index: idx });
            });
        }

        if (objectivesData && Array.isArray(objectivesData)) {
            objectivesData.forEach(d => map.set(d.playerIndex, d));
        }

        return { radiantPlayers: radiant, direPlayers: dire, objectivesMap: map };
    }, [players, objectivesData]);

    if (!isParsed) return <UnparsedMatchWarning />;
    if (isLoading) return <LoadingSpinner text="Analyzing Objectives..." />;
    if (isError) return <ErrorDisplay message="Failed to load objectives data." />;
    if (!objectivesData || objectivesData.length === 0) {
        return <div className="text-center text-[#808fa6] py-10 bg-[#15171c] rounded-xl border border-[#2e353b] mt-6 w-full lg:w-[90%] mx-auto">No objectives data found.</div>;
    }

    return (
        <div className="w-full lg:w-[90%] mx-auto mt-6 animate-in fade-in duration-500 pb-10">
            <div className="bg-[#15171c] border border-[#2e353b] rounded-xl shadow-xl">

                <div className="hidden xl:grid grid-cols-12 bg-[#1a1d24] border-b border-[#2e353b] rounded-t-xl px-4 py-4">
                    <div className="col-span-2 text-xs font-bold text-[#808fa6] uppercase tracking-widest text-center border-r border-[#2e353b]/50 pr-6">Player</div>
                    <div className="col-span-2 text-xs font-bold text-[#808fa6] uppercase tracking-widest text-center border-r border-[#2e353b]/50 px-6">Runes</div>
                    <div className="col-span-8 text-xs font-bold text-[#808fa6] uppercase tracking-widest text-center pl-6">Building & Roshan Damage</div>
                </div>

                <div className="flex flex-col">
                    <div className="bg-linear-to-r from-emerald-500/10 to-[#1a1d24] border-y border-[#2e353b] px-4 py-2 flex items-center gap-2">
                        <Icon src="/assets/images/radiant.png" size={5} />
                        <span className="text-emerald-400 font-serif font-bold uppercase tracking-widest text-sm">Radiant Objectives</span>
                    </div>

                    {radiantPlayers.map((p) => (
                        <PlayerObjectivesCard
                            key={p.index}
                            player={p.info}
                            data={objectivesMap.get(p.index)}
                        />
                    ))}

                    <div className="bg-linear-to-r from-red-500/10 to-[#1a1d24] border-y border-[#2e353b] px-4 py-2 flex items-center gap-2">
                        <Icon src="/assets/images/dire.png" size={5} />
                        <span className="text-red-400 font-serif font-bold uppercase tracking-widest text-sm">Dire Objectives</span>
                    </div>

                    {direPlayers.map((p, index) => (
                        <div key={p.index} className={clsx(index === direPlayers.length - 1 && "rounded-b-xl overflow-hidden")}>
                            <PlayerObjectivesCard
                                player={p.info}
                                data={objectivesMap.get(p.index)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
