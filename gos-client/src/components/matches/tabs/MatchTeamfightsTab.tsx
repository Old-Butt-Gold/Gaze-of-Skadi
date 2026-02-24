import React, { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import clsx from 'clsx';
import { useMatchTeamfights } from '../../../hooks/queries/useMatchTeamfights';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { ErrorDisplay } from '../../ui/ErrorDisplay';
import { UnparsedMatchWarning } from '../UnparsedMatchWarning';
import { MatchPlayerCell } from '../MatchPlayerCell';
import { Icon } from '../../Icon';
import { HeroCell } from '../../heroes/HeroCell';
import { SourceIcon } from '../SourceIcon';
import { isRadiantTeam, normalizeMapCoordinate } from '../../../utils/matchUtils';
import { formatDuration } from '../../../utils/formatUtils';
import type { MatchOutletContext } from '../../../pages/MatchDetailsPage';
import type { PlayerInfoDto } from '../../../types/matchPlayers';
import { type TeamfightDetailedDto, type TeamfightPlayerDto } from '../../../types/matchTeamfights';
import { TeamEnum } from "../../../types/common.ts";
import { useHeroes } from "../../../hooks/queries/useHeroes.ts";

const SimpleHeroIcon: React.FC<{ heroId: number | null; sizeClass?: string; }> = ({ heroId, sizeClass = "w-10 h-10" }) => {
    const { getHero, isLoading } = useHeroes();

    if (!heroId) return null;
    const hero = getHero(heroId);

    if (isLoading || !hero) {
        return <div className={clsx("rounded-md animate-pulse bg-slate-800", sizeClass)}></div>;
    }

    return (
        <div className={clsx("relative block shrink-0 overflow-hidden rounded", sizeClass)}>
            <img
                src={hero.icon}
                alt={hero.localized_name}
                className={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "}
            />
        </div>
    );
};

const ActionBadge: React.FC<{ iconKey: string; count: number }> = ({ iconKey, count }) => (
    <div className="relative flex shrink-0 group/action cursor-help p-0.5">
        <SourceIcon sourceName={iconKey} />
        {count > 1 && (
            <div className="absolute -bottom-1 -right-1 bg-[#1a1d24] border border-[#2e353b] text-[#e7d291] text-xs font-mono font-black min-w-4.5 px-1 py-0.5 rounded-md z-10 shadow-sm flex items-center justify-center leading-none">
                {count}
            </div>
        )}
    </div>
);

const TeamfightMap: React.FC<{ tf: TeamfightDetailedDto; allPlayers: PlayerInfoDto[]; sizeClasses: string; interactive?: boolean; iconSizeClass?: string }> = ({ tf, allPlayers, sizeClasses, interactive = false, iconSizeClass = "w-4 h-4" }) => {
    const deaths = useMemo(() => {
        return tf.players.flatMap(p => {
            const deadPlayerInfo = allPlayers[p.playerIndex];

            return p.deathPositions.map((pos, idx) => {
                const killersInfo = tf.players
                    .filter(enemy => enemy.killedHeroes.some(kh => kh.heroId === deadPlayerInfo.heroId))
                    .map(enemy => allPlayers[enemy.playerIndex]);

                return { id: `${p.playerIndex}-${idx}`, x: pos.x, y: pos.y, deadPlayer: deadPlayerInfo, killers: killersInfo };
            });
        });
    }, [tf, allPlayers]);

    return (
        <div className={clsx("relative rounded-md border border-[#2e353b] bg-[#0f1114] shadow-inner shrink-0", sizeClasses, !interactive && "overflow-hidden pointer-events-none")}>
            <img src="/assets/images/detailed_740.webp" alt="Minimap" className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none rounded-md" />

            {deaths.map((death) => {
                const x = normalizeMapCoordinate(death.x, false);
                const y = normalizeMapCoordinate(death.y, true);

                return (
                    <div key={death.id} className="absolute -translate-x-1/2 -translate-y-1/2 group/death hover:z-60" style={{ left: `${x}%`, top: `${y}%` }}>

                        <div className="relative z-10 cursor-help pointer-events-auto rounded p-0.5 hover:scale-110 transition-transform duration-200">
                            <SimpleHeroIcon heroId={death.deadPlayer.heroId} sizeClass={iconSizeClass}/>
                        </div>

                        {interactive && (
                            <div className="absolute bottom-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 mb-2 bg-[#1a1d24]/95 backdrop-blur-md border border-[#2e353b] p-3 rounded-lg shadow-2xl opacity-0 invisible group-hover/death:opacity-100 group-hover/death:visible transition-all z-50 pointer-events-none w-max max-w-62.5 flex flex-col gap-2">
                                <span className="text-xs font-bold text-red-400 uppercase tracking-widest border-b border-[#2e353b]/50 pb-1 text-center">
                                    Death Location
                                </span>
                                <div className="flex flex-col gap-1 items-center justify-center">
                                    <span className="text-xs text-[#808fa6] uppercase font-bold">Died:</span>
                                    <MatchPlayerCell player={death.deadPlayer} useIcon={false} />
                                </div>

                                {death.killers.length > 0 && (
                                    <div className="flex flex-col gap-1 items-center justify-center p-2 rounded mt-1">
                                        <span className="text-xs text-[#808fa6] uppercase font-bold">Killed By:</span>
                                        <div className="flex flex-wrap items-center justify-center gap-2">
                                            {death.killers.map((k, i) => (
                                                <MatchPlayerCell key={i} player={k} useIcon={false} />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

const PlayerFightRow: React.FC<{ playerInfo: PlayerInfoDto; stats: TeamfightPlayerDto }> = ({ playerInfo, stats }) => {
    return (
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 p-3 border-b border-[#2e353b]/50 hover:bg-[#1a1d24] transition-colors items-center text-sm">

            <div className="lg:col-span-3 flex flex-col justify-center gap-1.5 w-full h-full lg:border-r border-[#2e353b]/50 lg:pr-4 min-w-0">
                <div className="w-full min-w-0 flex items-center justify-center lg:justify-start overflow-hidden whitespace-normal [&>div]:max-w-full">
                    <MatchPlayerCell player={playerInfo} useIcon={false} />
                </div>

                <div className="flex items-center gap-2 w-full cursor-help">
                    {stats.wasDead && (
                        <div title="Died in fight" className="shrink-0 flex items-center justify-center">
                            <Icon src="/assets/images/death_icon.webp" alt="Dead" size={8} />
                        </div>
                    )}
                    {stats.usedBuyback && (
                        <span className="text-sm leading-none font-bold text-[#facc15] uppercase tracking-widest border border-[#facc15]/30 bg-[#facc15]/10 px-1.5 py-0.5 rounded shrink-0 flex items-center justify-center" title="Used Buyback">
                            BB
                        </span>
                    )}
                </div>
            </div>

            <div className="lg:col-span-2 flex justify-around w-full lg:justify-center gap-4 lg:border-r border-[#2e353b]/50 lg:px-4 font-mono font-bold h-full">
                <div className={clsx("flex items-center justify-center gap-1.5 w-full pr-2", stats.goldDelta >= 0 ? "text-[#e7d291]" : "text-red-400")} title="Gold Delta">
                    <Icon src="/assets/images/gold.png" size={4} />
                    <span>{stats.goldDelta > 0 ? '+' : ''}{stats.goldDelta.toLocaleString()}</span>
                </div>
                <div className={clsx("flex items-center justify-center gap-1.5 w-full", stats.xpDelta >= 0 ? "text-[#38bdf8]" : "text-red-400")} title="XP Delta">
                    <Icon src="/assets/images/experience.png" size={4} />
                    <span>{stats.xpDelta > 0 ? '+' : ''}{stats.xpDelta.toLocaleString()}</span>
                </div>
            </div>

            <div className="lg:col-span-2 flex justify-around w-full lg:justify-center gap-4 lg:border-r border-[#2e353b]/50 lg:px-4 font-mono font-bold h-full">
                <div className="flex flex-col items-center justify-center gap-0.5 w-full text-red-400" title="Damage Dealt">
                    <span className="text-xs text-[#808fa6] uppercase tracking-widest leading-none">Dmg</span>
                    <span>{stats.damage.toLocaleString()}</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-0.5 w-full text-emerald-400" title="Healing Done">
                    <span className="text-xs text-[#808fa6] uppercase tracking-widest leading-none">Heal</span>
                    <span>{stats.healing.toLocaleString()}</span>
                </div>
            </div>

            <div className="lg:col-span-3 flex flex-col justify-center gap-1.5 lg:border-r border-[#2e353b]/50 lg:px-4 w-full h-full">
                <div className="flex flex-wrap justify-center items-center gap-1.5">
                    {stats.abilityUses.length > 0 ? stats.abilityUses.map(ab => <ActionBadge key={ab.abilityKey} iconKey={ab.abilityKey} count={ab.uses} />) : <span className="text-xs text-[#58606e] italic">No spells</span>}
                </div>
                <div className="flex flex-wrap justify-center items-center gap-1.5 pt-1 border-t border-[#2e353b]/30 w-full">
                    {stats.itemUses.length > 0 ? stats.itemUses.map(it => <ActionBadge key={it.itemKey} iconKey={it.itemKey} count={it.uses} />) : <span className="text-xs text-[#58606e] italic">No items</span>}
                </div>
            </div>

            <div className="lg:col-span-2 flex flex-wrap items-center justify-center gap-1 lg:pl-4 w-full h-full">
                {stats.killedHeroes.length > 0 ? stats.killedHeroes.map((kh, i) => (
                    <div key={i} className="relative group/kill">
                        <HeroCell heroId={kh.heroId} showName={false} />
                        {kh.times > 1 && (
                            <div className="absolute -top-1.5 -right-1.5 bg-red-500/20 border border-red-500/50 text-red-400 text-xs font-mono font-black px-1 rounded z-10 pointer-events-none">
                                x{kh.times}
                            </div>
                        )}
                    </div>
                )) : (
                    <span className="text-xs text-[#58606e] italic">No kills</span>
                )}
            </div>
        </div>
    );
};

const TeamfightCard: React.FC<{ tf: TeamfightDetailedDto; allPlayers: PlayerInfoDto[]; index: number }> = ({ tf, allPlayers, index }) => {
    const isRadiantWin = tf.winner.value === TeamEnum.Radiant;
    const isDireWin = tf.winner.value === TeamEnum.Dire;

    const radiantStats = tf.players.filter(p => isRadiantTeam(allPlayers[p.playerIndex].isRadiant));
    const direStats = tf.players.filter(p => !isRadiantTeam(allPlayers[p.playerIndex].isRadiant));

    return (
        <div className="bg-[#15171c] border border-[#2e353b] rounded-xl shadow-xl overflow-hidden flex flex-col mb-8">

            <div className={clsx(
                "flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border-b border-[#2e353b]",
                isRadiantWin ? "bg-linear-to-r from-emerald-500/10 to-[#1a1d24] border-l-4 border-l-emerald-500" :
                    isDireWin ? "bg-linear-to-r from-red-500/10 to-[#1a1d24] border-l-4 border-l-red-500" : "bg-[#1a1d24]"
            )}>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-[#e3e3e3] uppercase tracking-widest bg-[#0b0e13] px-2 py-1 rounded border border-[#2e353b]">Fight #{index + 1}</span>
                        <span className="text-sm font-mono text-[#808fa6]">{formatDuration(tf.startTime)} - {formatDuration(tf.endTime)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={clsx(
                            "text-lg font-serif font-black uppercase tracking-widest drop-shadow-sm",
                            isRadiantWin ? "text-emerald-400" : isDireWin ? "text-red-400" : "text-[#808fa6]"
                        )}>
                            {isRadiantWin ? "Radiant Won" : isDireWin ? "Dire Won" : "Draw"}
                        </span>
                        {isRadiantWin && <Icon src="/assets/images/radiant.png" size={6} />}
                        {isDireWin && <Icon src="/assets/images/dire.png" size={6} />}
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex flex-col items-center bg-[#0b0e13]/50 p-2 rounded-lg border border-[#2e353b]/50">
                        <span className="text-xs text-[#808fa6] uppercase tracking-widest mb-1">Advantage Swing</span>
                        <div className="flex gap-4 font-mono font-black text-sm">
                            <div className={clsx("flex items-center gap-1.5", tf.goldAdvantage >= 0 ? "text-[#e7d291]" : "text-red-400")} title="Gold Advantage">
                                <Icon src="/assets/images/gold.png" size={4} /> {tf.goldAdvantage > 0 ? '+' : ''}{tf.goldAdvantage.toLocaleString()}
                            </div>
                            <div className={clsx("flex items-center gap-1.5", tf.xpAdvantage >= 0 ? "text-[#38bdf8]" : "text-red-400")} title="XP Advantage">
                                <Icon src="/assets/images/experience.png" size={4} /> {tf.xpAdvantage > 0 ? '+' : ''}{tf.xpAdvantage.toLocaleString()}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center bg-[#0b0e13]/50 p-2 rounded-lg border border-[#2e353b]/50">
                        <span className="text-xs text-[#808fa6] uppercase tracking-widest mb-1">Total Deaths</span>
                        <span className="font-mono font-black text-red-400 text-sm">{tf.totalDeaths}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col xl:flex-row w-full">

                <div className="flex-1 flex flex-col xl:border-r border-[#2e353b]">

                    <div className="hidden lg:grid grid-cols-12 gap-4 px-3 py-2 bg-[#1a1d24] border-b border-[#2e353b] text-xs font-bold text-[#808fa6] uppercase tracking-widest items-center">
                        <div className="col-span-3 border-r border-[#2e353b]/50 pr-4 text-center">Player</div>
                        <div className="col-span-2 border-r border-[#2e353b]/50 px-4 text-center">Delta</div>
                        <div className="col-span-2 border-r border-[#2e353b]/50 px-4 text-center">Stats</div>
                        <div className="col-span-3 border-r border-[#2e353b]/50 px-4 text-center">Spells & Items</div>
                        <div className="col-span-2 pl-4 text-center">Kills</div>
                    </div>

                    <div className="bg-[#1a1d24]/50 text-xs font-bold text-[#808fa6] uppercase tracking-widest px-3 py-1 flex items-center gap-2 border-b border-[#2e353b]/50">
                        <Icon src="/assets/images/radiant.png" size={4} /> Radiant
                    </div>
                    <div className="flex flex-col">
                        {radiantStats.map(s => <PlayerFightRow key={s.playerIndex} playerInfo={allPlayers[s.playerIndex]} stats={s} />)}
                    </div>

                    <div className="bg-[#1a1d24]/50 text-xs font-bold text-[#808fa6] uppercase tracking-widest px-3 py-1 flex items-center gap-2 border-y border-[#2e353b]/50">
                        <Icon src="/assets/images/dire.png" size={4} /> Dire
                    </div>
                    <div className="flex flex-col">
                        {direStats.map(s => <PlayerFightRow key={s.playerIndex} playerInfo={allPlayers[s.playerIndex]} stats={s} />)}
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center p-6 bg-[#0b0e13]/30 shrink-0 relative group/map">
                    <span className="text-xs font-bold text-[#808fa6] uppercase tracking-widest mb-3">Death Map</span>

                    <div className="cursor-zoom-in flex items-center justify-center">
                        <TeamfightMap tf={tf} allPlayers={allPlayers} sizeClasses="w-48 h-48 lg:w-56 lg:h-56" iconSizeClass="w-5 h-5" />
                    </div>

                    <div className="fixed inset-0 z-9999 opacity-0 invisible group-hover/map:opacity-100 group-hover/map:visible transition-all duration-300 pointer-events-none flex items-center justify-center bg-[#0b0e13]/80 backdrop-blur-sm">
                        <div className="rounded-xl pointer-events-auto border-2 border-[#4a5568] shadow-[0_0_60px_rgba(0,0,0,0.8)] relative">
                            <TeamfightMap tf={tf} allPlayers={allPlayers} sizeClasses="w-[90vw] max-w-[500px] aspect-square xl:w-[600px]" interactive={true} iconSizeClass="w-10 h-10" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export const MatchTeamfightsTab: React.FC = () => {
    const { matchId, players, isParsed } = useOutletContext<MatchOutletContext>();
    const { data: teamfights, isLoading, isError } = useMatchTeamfights(matchId, isParsed);

    if (!isParsed) return <UnparsedMatchWarning />;
    if (isLoading) return <LoadingSpinner text="Analyzing Teamfights..." />;
    if (isError) return <ErrorDisplay message="Failed to load teamfights data." />;
    if (!teamfights || teamfights.length === 0) {
        return <div className="text-center text-[#808fa6] py-10 bg-[#15171c] rounded-xl border border-[#2e353b] mt-6 w-full lg:w-[90%] mx-auto">No teamfights recorded for this match.</div>;
    }

    return (
        <div className="w-full lg:w-[90%] mx-auto mt-6 animate-in fade-in duration-500 pb-10">
            <div className="flex flex-col">
                {teamfights.map((tf, index) => (
                    <TeamfightCard key={index} index={index} tf={tf} allPlayers={players} />
                ))}
            </div>
        </div>
    );
};
