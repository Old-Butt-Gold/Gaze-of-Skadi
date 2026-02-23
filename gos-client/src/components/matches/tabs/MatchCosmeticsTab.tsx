import React, { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useMatchCosmetics } from '../../../hooks/queries/useMatchCosmetics';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { ErrorDisplay } from '../../ui/ErrorDisplay';
import type { MatchOutletContext } from '../../../pages/MatchDetailsPage';
import { getItemRarityColor, isRadiantTeam } from '../../../utils/matchUtils';
import { UnparsedMatchWarning } from "../UnparsedMatchWarning.tsx";
import { MatchPlayerCell } from "../MatchPlayerCell.tsx";
import { Icon } from "../../Icon.tsx";
import type { PlayerInfoDto } from '../../../types/matchPlayers';

interface IndexedPlayer {
    info: PlayerInfoDto;
    index: number;
}

const PlayerCosmeticsRow: React.FC<{ player: PlayerInfoDto; cosmetics: any[] | undefined }> = ({ player, cosmetics }) => {
    const playerCosmetics = cosmetics || [];

    return (
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#2e353b]/30 last:border-b-0 hover:bg-[#1a1d24] transition-colors relative group">
            <div className="col-span-12 md:col-span-4 lg:col-span-3 flex items-center shrink-0">
                <MatchPlayerCell player={player} useIcon={false} />
            </div>

            <div className="col-span-12 md:col-span-8 lg:col-span-9 flex flex-wrap items-center gap-3">
                {playerCosmetics.length === 0 ? (
                    <span className="text-[#58606e] text-xs italic">Default Items</span>
                ) : (
                    playerCosmetics.map((item, itemIdx) => {
                        const rarityColor = getItemRarityColor(item.itemRarity);

                        return (
                            <a
                                key={itemIdx}
                                href={item.marketUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative group/item block w-20 h-14 lg:w-28 lg:h-20 rounded transition-all hover:-translate-y-1 shadow-sm hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)] bg-[#0b0e13]"
                                style={{ borderBottom: `3px solid ${rarityColor}` }}
                            >
                                <div className="w-full h-full overflow-hidden rounded-t flex items-center justify-center">
                                    <Icon
                                        src={item.imageUrl}
                                        alt={item.name}
                                    />
                                </div>

                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-[#1a1d24] border border-[#2e353b] p-2 sm:p-3 rounded shadow-2xl opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all z-50 pointer-events-none flex flex-col items-center text-center">
                                    <span className="text-xs sm:text-sm font-bold text-white drop-shadow-md leading-tight">
                                        {item.name}
                                    </span>

                                    {item.itemRarity && (
                                        <span
                                            className="text-[10px] sm:text-xs uppercase tracking-widest font-black mt-1.5 drop-shadow-sm"
                                            style={{ color: rarityColor }}
                                        >
                                            {item.itemRarity}
                                        </span>
                                    )}
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#2e353b]" />
                                </div>
                            </a>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export const MatchCosmeticsTab: React.FC = () => {
    const { matchId, players, isParsed } = useOutletContext<MatchOutletContext>();
    const { data: cosmeticsData, isLoading, isError } = useMatchCosmetics(matchId, isParsed);

    const { radiantPlayers, direPlayers, cosmeticsMap } = useMemo(() => {
        const radiant: IndexedPlayer[] = [];
        const dire: IndexedPlayer[] = [];
        const cMap = new Map();

        if (cosmeticsData && Array.isArray(cosmeticsData)) {
            cosmeticsData.forEach(c => cMap.set(c.playerIndex, c.cosmetics));
        }

        if (players && Array.isArray(players)) {
            players.forEach((p, idx) => {
                if (isRadiantTeam(p.isRadiant)) radiant.push({ info: p, index: idx });
                else dire.push({ info: p, index: idx });
            });
        }

        return { radiantPlayers: radiant, direPlayers: dire, cosmeticsMap: cMap };
    }, [players, cosmeticsData]);

    if (!isParsed) return <UnparsedMatchWarning />;
    if (isLoading) return <LoadingSpinner text="Loading Cosmetics..." />;
    if (isError) return <ErrorDisplay message="Failed to load cosmetics." />;
    if (!cosmeticsData || cosmeticsData.length === 0) {
        return <div className="text-center text-[#808fa6] py-10 bg-[#15171c] rounded-xl border border-[#2e353b] mt-6 w-full lg:w-[90%] mx-auto">No cosmetics data found.</div>;
    }

    return (
        <div className="w-full lg:w-[90%] mx-auto mt-6 animate-in fade-in duration-500 space-y-4 pb-10">

            <div className="space-y-4">
                <div className="flex items-center gap-3 px-4 py-2 bg-linear-to-r from-emerald-500/10 to-transparent border-l-4 border-emerald-500 rounded-r-lg w-full md:w-auto self-start">
                    <Icon src="/assets/images/radiant.png" size={6} />
                    <h3 className="text-lg font-serif font-bold text-emerald-400 uppercase tracking-widest drop-shadow-sm">Radiant Cosmetics</h3>
                </div>

                <div className="bg-[#15171c] border border-[#2e353b] rounded-xl overflow-hidden shadow-xl">
                    <div className="grid grid-cols-12 gap-4 p-4 bg-[#1a1d24] border-b border-[#2e353b] text-xs font-bold text-[#808fa6] uppercase tracking-widest">
                        <div className="col-span-12 md:col-span-4 lg:col-span-3 flex items-center">Player</div>
                        <div className="col-span-12 md:col-span-8 lg:col-span-9 flex items-center">Cosmetics</div>
                    </div>
                    <div className="flex flex-col">
                        {radiantPlayers.map((p) => (
                            <PlayerCosmeticsRow key={p.index} player={p.info} cosmetics={cosmeticsMap.get(p.index)} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-3 px-4 py-2 bg-linear-to-r from-red-500/10 to-transparent border-l-4 border-red-500 rounded-r-lg w-full md:w-auto self-start">
                    <Icon src="/assets/images/dire.png" size={6} />
                    <h3 className="text-lg font-serif font-bold text-red-400 uppercase tracking-widest drop-shadow-sm">Dire Cosmetics</h3>
                </div>

                <div className="bg-[#15171c] border border-[#2e353b] rounded-xl overflow-hidden shadow-xl">
                    <div className="grid grid-cols-12 gap-4 p-4 bg-[#1a1d24] border-b border-[#2e353b] text-xs font-bold text-[#808fa6] uppercase tracking-widest">
                        <div className="col-span-12 md:col-span-4 lg:col-span-3 flex items-center">Player</div>
                        <div className="col-span-12 md:col-span-8 lg:col-span-9 flex items-center">Cosmetics</div>
                    </div>
                    <div className="flex flex-col">
                        {direPlayers.map((p) => (
                            <PlayerCosmeticsRow key={p.index} player={p.info} cosmetics={cosmeticsMap.get(p.index)} />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};
