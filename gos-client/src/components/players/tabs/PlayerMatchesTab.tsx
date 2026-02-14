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

    // Theme Colors based on Result
    const themeColor = isWin === true ? "emerald" : isWin === false ? "red" : "slate";
    const borderColor = isWin === true ? "border-emerald-500/30" : isWin === false ? "border-red-500/30" : "border-[#2e353b]";
    const shadowColor = isWin === true ? "hover:shadow-emerald-900/20" : isWin === false ? "hover:shadow-red-900/20" : "";

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

                // Skip the player themselves in the lists (optional, keeping for context)
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
            {/* Clickable Overlay Link (Z-0) */}
            <Link
                to={`${APP_ROUTES.MATCHES}/${match.matchId}`}
                className="absolute inset-0 z-0"
            >
                <span className="sr-only">View Match</span>
            </Link>

            {/* Main Content (Z-10 relative) - Interactive Elements inside here will work */}
            <div className="relative z-10 p-4 flex flex-col gap-4 pointer-events-none">

                {/* --- TOP ROW: Hero, Result, KDA, Info --- */}
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between pointer-events-auto">

                    {/* Left: Hero & Result */}
                    <div className="flex items-center gap-4 min-w-[200px]">
                        <div className="scale-110 origin-left">
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
                            <span className={clsx("font-serif font-black text-xl uppercase tracking-wider leading-none",
                                isWin === true ? "text-emerald-400" : isWin === false ? "text-red-400" : "text-[#808fa6]"
                            )}>
                                {isWin === true ? 'Victory' : isWin === false ? 'Defeat' : 'Draw'}
                            </span>
                            <span className="text-xs text-[#808fa6] font-mono mt-1">
                                {formatRelativeTime(match.startTime)}
                            </span>
                        </div>
                    </div>

                    {/* Center: KDA & Stats */}
                    <div className="flex items-center gap-6 md:gap-8">
                        <div className="flex flex-col items-center">
                            <div className="flex items-center gap-1 font-mono text-lg">
                                <span className="text-white font-bold">{match.kills}</span>
                                <span className="text-[#58606e] text-sm">/</span>
                                <span className="text-red-400 font-bold">{match.deaths}</span>
                                <span className="text-[#58606e] text-sm">/</span>
                                <span className="text-white font-bold">{match.assists}</span>
                            </div>
                            <span className="text-xs uppercase font-bold text-[#58606e] tracking-wider">KDA</span>
                        </div>

                        {/* Level & Duration */}
                        <div className="flex flex-col items-end gap-1">
                            <div className="text-xs text-[#e3e3e3] bg-[#0f1114]/80 px-2 py-0.5 rounded border border-[#2e353b]">
                                Lvl <span className="font-bold text-white">{match.level || '-'}</span>
                            </div>
                            <span className="text-xs font-mono text-[#808fa6]">{formatDuration(match.duration)}</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-1 text-right min-w-[150px]">
                        <div className="text-sm font-bold text-[#e3e3e3]">
                            {getLobbyTypeName(match.lobbyType.value)}
                        </div>
                        <div className="text-xs text-[#808fa6]">
                            {getGameModeName(match.gameMode.value)}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            {match.averageRank && <RankIcon rank={match.averageRank.value} />}
                            {match.partySize && match.partySize > 1 && <PartySizeIcon partySize={match.partySize} />}
                        </div>
                    </div>
                </div>

                {/* Separator */}
                <div className="h-px w-full bg-[#2e353b]/50" />

                {/* --- BOTTOM ROW: Items & Teams --- */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center pointer-events-auto">

                    {/* Items Grid */}
                    <div className="flex gap-1">
                        {items.map((itemId, idx) => (
                            <div key={idx} className="rounded-sm overflow-hidden shadow-inner relative group/item">
                                {itemId ? (
                                    <ItemByIdCell itemId={String(itemId)} />
                                ) : null}
                            </div>
                        ))}
                    </div>

                    {/* Teams Display */}
                    <div className="flex items-center gap-4 text-sm font-bold text-[#58606e]">
                        {/* Allies */}
                        <div className="flex items-center gap-1 bg-[#0f1114]/30 p-1 rounded-lg border border-[#2e353b]/30">
                            <span className="text-xs uppercase tracking-wider mr-1 text-emerald-500/70">Allies</span>
                            {allies.map(heroId => (
                                <div key={heroId} className="rounded border border-[#2e353b] overflow-hidden hover:scale-110 transition-transform hover:border-emerald-500/50 hover:z-20 relative">
                                    <HeroCell heroId={heroId} showName={false} />
                                </div>
                            ))}
                        </div>

                        <span className="text-[#2e353b] font-mono text-xs">VS</span>

                        {/* Enemies */}
                        <div className="flex items-center gap-1 bg-[#0f1114]/30 p-1 rounded-lg border border-[#2e353b]/30">
                            {enemies.map(heroId => (
                                <div key={heroId} className="rounded border border-[#2e353b] overflow-hidden hover:scale-110 transition-transform hover:border-red-500/50 hover:z-20 relative">
                                    <HeroCell heroId={heroId} showName={false} />
                                </div>
                            ))}
                            <span className="text-xs uppercase tracking-wider ml-1 text-red-500/70">Enemy</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
