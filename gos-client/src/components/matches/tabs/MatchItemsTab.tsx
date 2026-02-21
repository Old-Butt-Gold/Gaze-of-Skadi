import React, { useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import clsx from 'clsx';
import { useMatchItems } from '../../../hooks/queries/useMatchItems';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { ErrorDisplay } from '../../ui/ErrorDisplay';
import { UnparsedMatchWarning } from '../UnparsedMatchWarning';
import { MatchPlayerCell } from '../MatchPlayerCell';
import { ItemCell } from '../../items/ItemCell';
import { Icon } from '../../Icon';
import { formatDuration } from '../../../utils/formatUtils';
import { isRadiantTeam } from '../../../utils/matchUtils';
import type { MatchOutletContext } from '../../../pages/MatchDetailsPage';
import type { PlayerItemsDto } from '../../../types/matchItems';

export const MatchItemsTab: React.FC = () => {
    const { matchId, players, isParsed } = useOutletContext<MatchOutletContext>();
    const { data: itemsData, isLoading, isError } = useMatchItems(matchId, isParsed);

    const [showConsumables, setShowConsumables] = useState(false);

    const { radiantPlayers, direPlayers, itemsMap } = useMemo(() => {
        const radiant: number[] = [];
        const dire: number[] = [];
        const iMap = new Map<number, PlayerItemsDto>();

        if (itemsData && Array.isArray(itemsData)) {
            itemsData.forEach(pd => {
                iMap.set(pd.playerIndex, pd);
            });
        }

        if (players && Array.isArray(players)) {
            players.forEach((p, idx) => {
                if (isRadiantTeam(p.isRadiant)) radiant.push(idx);
                else dire.push(idx);
            });
        }

        return { radiantPlayers: radiant, direPlayers: dire, itemsMap: iMap };
    }, [players, itemsData]);

    if (!isParsed) return <UnparsedMatchWarning />;
    if (isLoading) return <LoadingSpinner text="Loading Purchases..." />;
    if (isError) return <ErrorDisplay message="Failed to load items timeline." />;

    if (!itemsData || itemsData.length === 0) {
        return <div className="text-center text-[#808fa6] py-10 bg-[#15171c] rounded-xl border border-[#2e353b] mt-6 w-full lg:w-[90%] mx-auto">No item builds found for this match.</div>;
    }

    const PlayerTimelineCard = ({ playerIdx }: { playerIdx: number }) => {
        const player = players[playerIdx];
        const playerData = itemsMap.get(playerIdx);

        if (!player || !playerData) return null;

        const filteredItems = playerData.items
            .filter(item => showConsumables || !item.consumable);

        return (
            <div className="bg-[#15171c] border border-[#2e353b] rounded-xl p-4 lg:p-5 flex flex-col xl:flex-row gap-5 lg:gap-6 shadow-md hover:border-[#4a5568] hover:shadow-lg hover:bg-[#181b21] transition-all relative group/card">

                <div className="flex items-center justify-center xl:justify-start gap-4 xl:w-60 shrink-0 xl:border-r border-[#2e353b]/70 xl:pr-6">
                    <MatchPlayerCell player={player} useIcon={false} />
                </div>

                <div className="flex-1 flex flex-wrap items-center gap-x-3 gap-y-5">
                    {filteredItems.length === 0 ? (
                        <div className="flex items-center justify-center w-full xl:w-auto h-full min-h-16">
                            <span className="text-xs text-[#58606e] italic bg-[#0f1114] px-4 py-2 rounded-lg border border-[#2e353b]/50">
                                No items match the current filter. {showConsumables ? '' : 'Try enabling consumables.'}
                            </span>
                        </div>
                    ) : (
                        filteredItems.map((item, itemIdx) => (
                            <div key={`${item.itemKey}-${itemIdx}`} className="flex flex-col items-center gap-1.5 group/timeline hover:-translate-y-1 transition-transform relative z-10">
                                <span className="text-xs font-mono font-bold text-[#808fa6] group-hover/timeline:text-[#10b981] group-hover/timeline:border-[#10b981]/50 transition-colors bg-[#0b0e13] px-2 py-0.5 rounded-full border border-[#2e353b] shadow-sm">
                                    {formatDuration(item.itemBuyTime)}
                                </span>

                                <ItemCell itemName={item.itemKey} showName={false} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="w-full lg:w-[90%] mx-auto mt-6 animate-in fade-in duration-500 space-y-4">

            <div className="flex flex-wrap items-center justify-start gap-3 bg-[#15171c] p-4 rounded-xl border border-[#2e353b] shadow-sm">
                <span className="text-xs font-bold text-[#58606e] uppercase tracking-widest mr-2">Filters:</span>

                <button
                    onClick={() => setShowConsumables(!showConsumables)}
                    className={clsx(
                        "flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-bold uppercase tracking-wider transition-all",
                        showConsumables
                            ? "bg-[#e7d291]/10 border-[#e7d291]/50 text-[#e7d291] shadow-inner"
                            : "bg-[#0f1114] border-[#2e353b] text-[#58606e] hover:border-[#4a5568] hover:text-[#808fa6]"
                    )}
                >
                    <div className={clsx("w-2 h-2 rounded-full transition-colors", showConsumables ? "bg-[#e7d291]" : "bg-[#2e353b]")} />
                    Consumables
                </button>
            </div>

            <div className="space-y-4">
                <h3 className="flex items-center gap-3 text-lg font-serif font-bold text-emerald-400 uppercase tracking-widest px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-transparent border-l-4 border-emerald-500 rounded-r-lg">
                    <Icon src="/assets/images/radiant.png" size={6} /> Radiant Builds
                </h3>
                <div className="flex flex-col gap-3">
                    {radiantPlayers.map(idx => <PlayerTimelineCard key={`rad-${idx}`} playerIdx={idx} />)}
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="flex items-center gap-3 text-lg font-serif font-bold text-red-400 uppercase tracking-widest px-4 py-2 bg-gradient-to-r from-red-500/10 to-transparent border-l-4 border-red-500 rounded-r-lg">
                    <Icon src="/assets/images/dire.png" size={6} /> Dire Builds
                </h3>
                <div className="flex flex-col gap-3">
                    {direPlayers.map(idx => <PlayerTimelineCard key={`dir-${idx}`} playerIdx={idx} />)}
                </div>
            </div>

        </div>
    );
};
