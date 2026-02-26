import React, { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import clsx from 'clsx';
import { useMatchVision } from '../../../hooks/queries/useMatchVision';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { ErrorDisplay } from '../../ui/ErrorDisplay';
import { UnparsedMatchWarning } from '../UnparsedMatchWarning';
import { MatchPlayerCell } from '../MatchPlayerCell';
import { Icon } from '../../Icon';
import { HeroCell } from '../../heroes/HeroCell';
import { isRadiantTeam, VISION_ITEM_ICONS, normalizeMapCoordinate } from '../../../utils/matchUtils';
import { formatDuration } from '../../../utils/formatUtils';
import type { MatchOutletContext } from '../../../pages/MatchDetailsPage';
import type { PlayerInfoDto } from '../../../types/matchGeneralInformation.ts';
import { WardType, VisionItemType, type VisionItemDto, type WardPlacementDto, type PlayerVisionDto } from '../../../types/matchVision';

interface IndexedPlayer {
    info: PlayerInfoDto;
    index: number;
}

const VISION_ITEM_NAMES: Record<number, string> = {
    [VisionItemType.ObserverWard]: "Observer Ward",
    [VisionItemType.SentryWard]: "Sentry Ward",
    [VisionItemType.Dust]: "Dust of Appearance",
    [VisionItemType.Gem]: "Gem of True Sight",
    [VisionItemType.Smoke]: "Smoke of Deceit",
};

const VisionBadge: React.FC<{ item: VisionItemDto }> = ({ item }) => {
    const iconSrc = VISION_ITEM_ICONS[item.itemType.value];
    const itemName = VISION_ITEM_NAMES[item.itemType.value] || "Vision Item";

    return (
        <div className="relative flex items-center justify-center p-2 rounded-lg group/item cursor-help border border-transparent hover:bg-[#1a1d24] hover:border-[#2e353b]/50 transition-colors">
            <Icon src={iconSrc} size={10} alt={itemName} />
            <div className="absolute bottom-1 right-1 bg-[#1a1d24] border border-[#2e353b] text-[#e7d291] text-xs font-mono font-black min-w-5 px-1 h-4 rounded-full z-10 shadow-sm flex items-center justify-center leading-none">
                {item.quantity}
            </div>

            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-[#1a1d24] border border-[#2e353b] p-2 rounded shadow-xl opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all z-50 pointer-events-none">
                <span className="text-xs font-bold text-white drop-shadow-md leading-tight">
                    {itemName}
                </span>
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#2e353b]" />
            </div>
        </div>
    );
};

const WardMapInner: React.FC<{ wards: WardPlacementDto[], isRadiant: boolean, sizeClasses: string, interactive?: boolean, iconSizeClass?: string }> = ({ wards, isRadiant, sizeClasses, interactive = false, iconSizeClass = "w-3 h-3" }) => {
    return (
        <div className={clsx("relative rounded-md border border-[#2e353b] bg-[#0f1114] shadow-inner shrink-0", sizeClasses, !interactive && "overflow-hidden pointer-events-none")}>
            <img
                src="/assets/images/detailed_740.webp"
                alt="Minimap"
                className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none rounded-md"
            />

            <div className="absolute inset-0 pointer-events-none z-0">
                {wards.map((ward, i) => {
                    const x = normalizeMapCoordinate(ward.x, false);
                    const y = normalizeMapCoordinate(ward.y, true);
                    const isObs = ward.type.value === WardType.Observer;

                    const radiusPct = isObs ? '21.3%' : '13.3%';

                    return (
                        <div
                            key={`radius-${i}`}
                            className={clsx(
                                "absolute -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.3] border border-white/30 transition-all pointer-events-none",
                                isObs ? "bg-[#eab308]" : "bg-[#3b82f6]",
                                interactive ? "block" : "hidden"
                            )}
                            style={{
                                left: `${x}%`,
                                top: `${y}%`,
                                width: radiusPct,
                                aspectRatio: '1 / 1'
                            }}
                        />
                    );
                })}
            </div>

            {wards.map((ward, i) => {
                const x = normalizeMapCoordinate(ward.x, false);
                const y = normalizeMapCoordinate(ward.y, true);
                const isObs = ward.type.value === WardType.Observer;
                const teamStr = isRadiant ? 'radiant' : 'dire';
                const typeStr = isObs ? 'observer' : 'sentry';

                return (
                    <div
                        key={`icon-${i}`}
                        className="absolute -translate-x-1/2 -translate-y-1/2 group/ward hover:z-50 pointer-events-none"
                        style={{ left: `${x}%`, top: `${y}%` }}
                    >
                        <div className={clsx("relative z-10 drop-shadow-[0_0_2px_rgba(0,0,0,0.8)] cursor-help pointer-events-auto", iconSizeClass)}>
                            <img src={`/assets/images/${teamStr}_${typeStr}.png`} alt="Ward" className="w-full h-full object-contain" />
                        </div>

                        {interactive && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#1a1d24]/95 backdrop-blur-md border border-[#2e353b] p-3 rounded-lg shadow-2xl opacity-0 invisible group-hover/ward:opacity-100 group-hover/ward:visible transition-all z-50 pointer-events-none w-max max-w-50 flex flex-col gap-1.5">
                                <span className="text-xs text-[#808fa6] font-bold uppercase tracking-widest border-b border-[#2e353b]/50 pb-1 text-center">
                                    {isObs ? "Observer Ward" : "Sentry Ward"}
                                </span>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs font-mono mt-1">
                                    <span className="text-[#58606e]">Placed:</span>
                                    <span className="text-[#e3e3e3]">{formatDuration(ward.placementTime)}</span>
                                    <span className="text-[#58606e]">Duration:</span>
                                    <span className="text-emerald-400">{formatDuration(ward.duration)}</span>
                                </div>

                                {ward.destroyedById != null && (
                                    <div className="mt-2 flex items-center justify-between gap-3 bg-[#0b0e13]/50 p-1.5 rounded border border-red-500/20">
                                        <span className="text-xs text-red-400 font-bold uppercase tracking-wider">Destroyed By</span>
                                        <HeroCell heroId={ward.destroyedById} showName={false} />
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

const PlayerVisionCard: React.FC<{
    player: PlayerInfoDto;
    vision: PlayerVisionDto | undefined;
    wards: WardPlacementDto[];
    isRadiant: boolean;
}> = ({ player, vision, wards, isRadiant }) => {
    return (
        <div className={"flex flex-col xl:grid xl:grid-cols-12 gap-5 xl:gap-0 p-4 border-b border-[#2e353b]/50 hover:bg-[#1a1d24] transition-colors relative"}>

            <div className="xl:col-span-3 flex items-center justify-center xl:justify-start shrink-0 xl:border-r border-[#2e353b]/50 xl:pr-6">
                <MatchPlayerCell player={player} useIcon={false} />
            </div>

            <div className="xl:col-span-4 flex flex-col items-center justify-center gap-2.5 shrink-0 xl:border-r border-[#2e353b]/50 xl:px-6 py-1 h-full">
                <span className="text-xs text-[#808fa6] font-bold uppercase tracking-widest border-b border-[#2e353b]/50 pb-1 flex items-center justify-center w-full">
                    Purchased Vision
                </span>
                <div className="flex flex-wrap gap-2 justify-center items-center w-full">
                    {vision?.purchasedItems?.length ? (
                        vision.purchasedItems.map((item, idx) => <VisionBadge key={idx} item={item} />)
                    ) : (
                        <span className="text-xs text-[#58606e] italic text-center w-full">No items</span>
                    )}
                </div>
            </div>

            <div className="xl:col-span-5 flex flex-col items-center justify-center gap-2 xl:pl-6 relative">
                {wards.length > 0 ? (
                    <>
                        <span className="text-xs text-[#808fa6] font-bold uppercase tracking-widest mb-1 xl:hidden">Ward Map</span>
                        <div className="relative group/map">
                            <div className="cursor-zoom-in flex items-center justify-center">
                                <WardMapInner wards={wards} isRadiant={isRadiant} sizeClasses="w-32 h-32 sm:w-40 sm:h-40" iconSizeClass="w-3 h-3" />
                            </div>

                            <div className="fixed inset-0 z-9999 opacity-0 invisible group-hover/map:opacity-100 group-hover/map:visible transition-all duration-300 pointer-events-none flex items-center justify-center bg-[#0b0e13]/60 backdrop-blur-sm">
                                <div className="rounded-xl pointer-events-auto bg-[#0f1114] border-2 border-[#4a5568]">
                                    <WardMapInner wards={wards} isRadiant={isRadiant} sizeClasses="w-[90vw] max-w-[450px] aspect-square xl:w-[500px]" interactive={true} iconSizeClass="w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <span className="text-xs text-[#58606e] italic h-full flex items-center justify-center">No wards placed</span>
                )}
            </div>

        </div>
    );
};

export const MatchVisionTab: React.FC = () => {
    const { matchId, players, isParsed } = useOutletContext<MatchOutletContext>();
    const { data: visionData, isLoading, isError } = useMatchVision(matchId, isParsed);

    const { radiantPlayers, direPlayers, visionMap, wardsMap } = useMemo(() => {
        const radiant: IndexedPlayer[] = [];
        const dire: IndexedPlayer[] = [];
        const vMap = new Map<number, PlayerVisionDto>();
        const wMap = new Map<number, WardPlacementDto[]>();

        if (players && Array.isArray(players)) {
            players.forEach((p, idx) => {
                if (isRadiantTeam(p.isRadiant)) radiant.push({ info: p, index: idx });
                else dire.push({ info: p, index: idx });
                wMap.set(idx, []);
            });
        }

        if (visionData) {
            visionData.players?.forEach(p => vMap.set(p.playerIndex, p));
            visionData.wardPlacements?.forEach(w => {
                const arr = wMap.get(w.ownerIndex) || [];
                arr.push(w);
                wMap.set(w.ownerIndex, arr);
            });
        }

        return { radiantPlayers: radiant, direPlayers: dire, visionMap: vMap, wardsMap: wMap };
    }, [players, visionData]);

    if (!isParsed) return <UnparsedMatchWarning />;
    if (isLoading) return <LoadingSpinner text="Analyzing Vision Game..." />;
    if (isError) return <ErrorDisplay message="Failed to load vision data." />;
    if (!visionData || (!visionData.players?.length && !visionData.wardPlacements?.length)) {
        return <div className="text-center text-[#808fa6] py-10 bg-[#15171c] rounded-xl border border-[#2e353b] mt-6 w-full lg:w-[90%] mx-auto">No vision data found.</div>;
    }

    return (
        <div className="w-full lg:w-[90%] mx-auto mt-6 animate-in fade-in duration-500 pb-10">
            <div className="bg-[#15171c] border border-[#2e353b] rounded-xl shadow-xl">

                <div className="hidden xl:grid grid-cols-12 bg-[#1a1d24] border-b border-[#2e353b] px-4 py-4 rounded-t-xl">
                    <div className="col-span-3 text-xs font-bold text-[#808fa6] uppercase tracking-widest text-center border-r border-[#2e353b]/50 pr-6">Player</div>
                    <div className="col-span-4 text-xs font-bold text-[#808fa6] uppercase tracking-widest text-center border-r border-[#2e353b]/50 px-6">Purchased Vision</div>
                    <div className="col-span-5 text-xs font-bold text-[#808fa6] uppercase tracking-widest text-center pl-6">Ward Map</div>
                </div>

                <div className="flex flex-col">
                    <div className="bg-linear-to-r from-emerald-500/10 to-[#1a1d24] border-b border-[#2e353b] px-4 py-2 flex items-center gap-2">
                        <Icon src="/assets/images/radiant.png" size={5} />
                        <span className="text-emerald-400 font-serif font-bold uppercase tracking-widest text-sm">Radiant Vision</span>
                    </div>

                    {radiantPlayers.map((p) => (
                        <PlayerVisionCard
                            key={p.index}
                            player={p.info}
                            vision={visionMap.get(p.index)}
                            wards={wardsMap.get(p.index) || []}
                            isRadiant={true}
                        />
                    ))}

                    <div className="bg-linear-to-r from-red-500/10 to-[#1a1d24] border-y border-[#2e353b] px-4 py-2 flex items-center gap-2">
                        <Icon src="/assets/images/dire.png" size={5} />
                        <span className="text-red-400 font-serif font-bold uppercase tracking-widest text-sm">Dire Vision</span>
                    </div>

                    {direPlayers.map((p, index) => (
                        <div key={p.index} className={clsx(index === direPlayers.length - 1 && "border-b-0")}>
                            <PlayerVisionCard
                                player={p.info}
                                vision={visionMap.get(p.index)}
                                wards={wardsMap.get(p.index) || []}
                                isRadiant={false}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
