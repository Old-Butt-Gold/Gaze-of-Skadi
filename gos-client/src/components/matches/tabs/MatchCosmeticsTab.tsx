import React from 'react';
import { useOutletContext } from 'react-router-dom';
import clsx from 'clsx';
import { useMatchCosmetics } from '../../../hooks/queries/useMatchCosmetics';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { ErrorDisplay } from '../../ui/ErrorDisplay';
import type { MatchOutletContext } from '../../../pages/MatchDetailsPage';
import { isRadiantTeam, getItemRarityColor } from '../../../utils/matchUtils';
import { UnparsedMatchWarning } from "../UnparsedMatchWarning.tsx";
import { MatchPlayerCell } from "../MatchPlayerCell.tsx";
import { Icon } from "../../Icon.tsx";

export const MatchCosmeticsTab: React.FC = () => {
    const { matchId, players, isParsed } = useOutletContext<MatchOutletContext>();

    const { data: cosmeticsData, isLoading, isError } = useMatchCosmetics(matchId, isParsed);

    if (!isParsed) return <UnparsedMatchWarning />;

    if (isLoading) return <div className="mt-10"><LoadingSpinner text="Loading Cosmetics..." /></div>;
    if (isError) return <div className="mt-10"><ErrorDisplay message="Failed to load cosmetics." /></div>;
    if (!cosmeticsData || cosmeticsData.length === 0) {
        return <div className="text-center text-[#808fa6] py-10 bg-[#15171c] rounded-xl border border-[#2e353b] mt-6 w-full lg:w-[90%] mx-auto">No cosmetics data found.</div>;
    }

    const cosmeticsMap = new Map(cosmeticsData.map(c => [c.playerIndex, c.cosmetics]));

    return (
        <div className="w-full lg:w-[90%] mx-auto mt-6 animate-in fade-in duration-500">
            <div className="bg-[#15171c] border border-[#2e353b] rounded-xl overflow-hidden shadow-xl">

                <div className="grid grid-cols-12 gap-4 p-4 bg-[#1a1d24] border-b border-[#2e353b] text-xs font-bold text-[#58606e] uppercase tracking-widest">
                    <div className="col-span-12 md:col-span-3 lg:col-span-2">Player</div>
                    <div className="col-span-12 md:col-span-9 lg:col-span-10">Cosmetics</div>
                </div>

                <div className="flex flex-col">
                    {players.map((player, idx) => {
                        const playerCosmetics = cosmeticsMap.get(idx) || [];
                        const isRadiant = isRadiantTeam(player.isRadiant);

                        return (
                            <div
                                key={idx}
                                className={clsx(
                                    "grid grid-cols-12 gap-4 p-4 border-b border-[#2e353b]/30 last:border-b-0 hover:bg-[#1a1d24] transition-colors relative group",
                                    isRadiant ? "border-l-4 border-l-emerald-500/50" : "border-l-4 border-l-red-500/50"
                                )}
                            >
                                <div className="col-span-12 md:col-span-4 lg:col-span-3 flex items-center shrink-0">
                                    <MatchPlayerCell player={player} useIcon={false} />
                                </div>

                                <div className="col-span-12 md:col-span-8 lg:col-span-9 flex flex-wrap items-center gap-2">
                                    {playerCosmetics.length === 0 ? (
                                        <span className="text-[#58606e] text-xs italic">Default Items</span>
                                    ) : (
                                        playerCosmetics.map((item, itemIdx) => {
                                            const rarityColor = getItemRarityColor(item.itemRarity);

                                            return (
                                                <a key={itemIdx} href={item.marketUrl} target="_blank" rel="noopener noreferrer"
                                                    className="relative group/item block w-14 h-10 sm:w-16 sm:h-12 lg:w-24 lg:h-16 bg-[#0f1114] rounded transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                                                    style={{ borderBottom: `2px solid ${rarityColor}` }}
                                                >
                                                    <div className="w-full h-full overflow-hidden rounded-t">
                                                        <Icon
                                                            src={item.imageUrl}
                                                            alt={item.name || `${item.itemRarity} Cosmetic Item`}
                                                        />
                                                    </div>

                                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-maxbg-[#1a1d24] border border-[#2e353b] p-2 rounded shadow-2xl opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all z-50 pointer-events-none flex flex-col items-center text-center">
                                                        <span className="text-xs font-bold text-white drop-shadow-md leading-tight">
                                                            {item.name || 'Unknown Item'}
                                                        </span>

                                                        {item.itemRarity && (
                                                            <span
                                                                className="text-xs uppercase tracking-widest font-black mt-1 drop-shadow-sm"
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
                    })}
                </div>
            </div>
        </div>
    );
};
