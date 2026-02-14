import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { usePlayerMatches } from '../../../hooks/queries/usePlayerMatches';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { ErrorDisplay } from '../../ui/ErrorDisplay';
import { Pagination } from '../../ui/Pagination';
import { HeroImage } from '../../heroes/HeroImage';
import { HeroCell } from '../../heroes/HeroCell';
import { ItemByIdCell } from '../../items/ItemByIdCell';
import { RankIcon } from '../../distributions/RankIcon';
import { APP_ROUTES } from '../../../config/navigation';
import {
    formatDuration,
    formatRelativeTime
} from '../../../utils/formatUtils';
import {
    getGameModeName,
    getLobbyTypeName,
} from '../../../utils/enumUtils';
import { isTeamWon } from '../../../utils/matchUtils';
import type { PlayerEndpointParameters } from '../../../types/player';
import type { PlayerMatchDto } from '../../../types/playerMatches';
import { getLaneConfig } from "../../../utils/scenariosUtils";
import PartySizeIcon from "../PartySizeIcon";
import { PlayerSlot } from "../../../types/common";
import {Icon} from "../../Icon.tsx";

interface Props {
    accountId: number;
    filters: PlayerEndpointParameters;
}

const ITEMS_PER_PAGE = 20;

export const PlayerMatchesTab: React.FC<Props> = ({ accountId, filters }) => {
    const { data: matches, isLoading, isError, refetch } = usePlayerMatches(accountId, filters);
    const [currentPage, setCurrentPage] = useState(1);

    const { paginatedMatches, totalPages } = useMemo(() => {
        if (!matches) return { paginatedMatches: [], totalPages: 0 };

        const sorted = [...matches].sort((a, b) => b.startTime - a.startTime);
        const total = Math.ceil(sorted.length / ITEMS_PER_PAGE);
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const sliced = sorted.slice(start, start + ITEMS_PER_PAGE);

        return { paginatedMatches: sliced, totalPages: total };
    }, [matches, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        document.getElementById('matches-list-top')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    if (isLoading) return <LoadingSpinner text="Loading match history..." />;
    if (isError) return <ErrorDisplay message="Failed to load matches." onRetry={refetch} />;
    if (!matches || matches.length === 0) return <div className="text-center text-[#808fa6] py-10">No matches found.</div>;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500" id="matches-list-top">
            <div className="flex justify-between items-end mb-6 px-2">
                <h3 className="text-xl font-serif font-bold text-white uppercase tracking-widest">
                    Match History
                </h3>
                <span className="text-xs text-[#58606e] font-bold uppercase tracking-wider">
                    {matches.length} Records
                </span>
            </div>

            <div className="flex flex-col gap-4">
                {paginatedMatches.map((match) => (
                    <MatchCard key={match.matchId} match={match} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="mt-8 border-t border-[#2e353b] pt-4">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    );
};

const MatchCard: React.FC<{ match: PlayerMatchDto }> = ({ match }) => {
    const isWin = isTeamWon(match.isRadiant, match.radiantWin);

    const borderColor = isWin === true ? "border-emerald-500/30" : isWin === false ? "border-red-500/30" : "border-[#2e353b]";
    const shadowColor = isWin === true ? "hover:shadow-emerald-900/20" : isWin === false ? "hover:shadow-red-900/20" : "";
    const resultText = isWin === true ? "Victory" : isWin === false ? "Defeat" : "Draw";
    const resultTextColor = isWin === true ? "text-emerald-400" : isWin === false ? "text-red-400" : "text-[#808fa6]";

    const items = [match.item0, match.item1, match.item2, match.item3, match.item4, match.item5];
    const laneConfig = getLaneConfig(match.lane?.value ?? 0);

    const { allies, enemies } = useMemo(() => {
        const _allies: number[] = [];
        const _enemies: number[] = [];
        const isPlayerRadiant = match.isRadiant.value === 1;

        if (match.heroes) {
            Object.entries(match.heroes).forEach(([slotStr, heroDto]) => {
                const slot = Number(slotStr);
                const isSlotRadiant = slot < PlayerSlot.PlayerDire1;
                const heroId = Number(heroDto.heroId);

                if (heroId === match.heroId) return;

                if (isSlotRadiant === isPlayerRadiant) {
                    _allies.push(heroId);
                } else {
                    _enemies.push(heroId);
                }
            });
        }
        return { allies: _allies, enemies: _enemies };
    }, [match.heroes, match.isRadiant, match.heroId]);

    return (
        <div className={clsx(
            "relative bg-[#15171c] border rounded-xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-lg group",
            borderColor,
            shadowColor
        )}>
            <Link
                to={`${APP_ROUTES.MATCHES}/${match.matchId}`}
                className="absolute inset-0 z-0"
            >
                <span className="sr-only">View Match</span>
            </Link>

            <div className="relative z-10 p-3 md:p-4 flex flex-col gap-4 pointer-events-none">

                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between pointer-events-auto w-full">

                    <div className="flex items-center gap-4 min-w-[240px]">
                        <div className="scale-100 origin-left shrink-0 relative z-20">
                            <HeroImage
                                matchId={match.matchId}
                                heroId={match.heroId}
                                heroVariant={match.heroVariant}
                                leaverStatus={match.leaverStatus.value}
                                isParsed={match.isMatchParsed.value}
                                showName={false}
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className={clsx("font-serif font-black text-xl uppercase tracking-wider leading-none", resultTextColor)}>
                                {resultText}
                            </span>
                            <div className="flex items-center gap-2 mt-1 text-xs text-[#808fa6]">
                                <span className="font-bold text-[#e3e3e3]">{getGameModeName(match.gameMode.value)}</span>
                                <span className="text-[#58606e]">•</span>
                                <span>{getLobbyTypeName(match.lobbyType.value)}</span>
                            </div>
                            <span className="text-xs text-[#58606e] font-mono mt-0.5">
                                {formatRelativeTime(match.startTime)}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-row md:flex-col items-center md:items-end gap-6 md:gap-1 w-full md:w-auto justify-between md:justify-center border-t md:border-t-0 border-[#2e353b]/30 pt-3 md:pt-0">

                        <div className="flex items-center gap-4">
                            <div className="flex flex-col items-center">
                                <div className="flex items-center gap-1 font-mono text-lg leading-none">
                                    <span className="text-white font-bold">{match.kills}</span>
                                    <span className="text-[#58606e] text-xs">/</span>
                                    <span className="text-red-400 font-bold">{match.deaths}</span>
                                    <span className="text-[#58606e] text-xs">/</span>
                                    <span className="text-white font-bold">{match.assists}</span>
                                </div>
                                <span className="text-[9px] uppercase font-bold text-[#58606e] tracking-widest mt-0.5">KDA</span>
                            </div>

                            <div className="h-8 w-px bg-[#2e353b] hidden md:block" />

                            <div className="flex flex-col gap-1 items-start md:items-end">
                                <div className="flex items-center gap-2">
                                    {match.lane && match.lane.value !== 0 && (
                                        <div className="flex items-center gap-1" title={laneConfig.label}>
                                            <Icon src={laneConfig.iconSrc} />
                                        </div>
                                    )}
                                    <div className="text-xs text-[#e3e3e3] bg-[#0f1114] px-1.5 py-0.5 rounded border border-[#2e353b]">
                                        Lvl <span className="font-bold">{match.level || '-'}</span>
                                    </div>
                                </div>
                                <span className="text-xs font-mono text-[#808fa6]">{formatDuration(match.duration)}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 md:hidden">
                            {match.averageRank && <RankIcon rank={match.averageRank.value} size={8} />}
                            {match.partySize && match.partySize > 1 && <PartySizeIcon partySize={match.partySize} />}
                        </div>
                    </div>

                    <div className="hidden md:flex flex-col items-end gap-2 min-w-[100px]">
                        <div className="flex items-center gap-2">
                            {match.averageRank && (
                                <div title="Average Rank">
                                    <RankIcon rank={match.averageRank.value} />
                                </div>
                            )}
                            {match.partySize && match.partySize > 1 && (
                                <PartySizeIcon partySize={match.partySize} />
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center pointer-events-auto">

                    <div className="flex gap-1 overflow-x-auto pb-1 lg:pb-0 scrollbar-none w-full lg:w-auto">
                        {items.map((itemId, idx) => (
                            <div key={idx} className="shrink-0 rounded-sm overflow-hidden relative group/item">
                                {itemId ? (
                                    <ItemByIdCell itemId={String(itemId)} />
                                ) : null}
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs w-full lg:w-auto">
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <span className="text-[#58606e] font-bold uppercase tracking-wider text-xs w-12 sm:w-auto">Allies</span>
                            <div className="flex gap-1">
                                {allies.map(heroId => (
                                    <div key={heroId} className="rounded border border-[#2e353b] overflow-hidden hover:scale-110 transition-transform relative z-10 bg-[#0f1114]">
                                        <HeroCell heroId={heroId} showName={false} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <span className="hidden sm:block text-[#2e353b] font-mono">/</span>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <span className="text-[#58606e] font-bold uppercase tracking-wider text-xs w-12 sm:w-auto">Enemy</span>
                            <div className="flex gap-1">
                                {enemies.map(heroId => (
                                    <div key={heroId} className="rounded border border-[#2e353b] overflow-hidden hover:scale-110 transition-transform relative z-10 bg-[#0f1114]">
                                        <HeroCell heroId={heroId} showName={false} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
