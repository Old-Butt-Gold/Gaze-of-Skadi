import type {SteamPlayerDto} from "../../types/steam.ts";
import {Link} from "react-router-dom";
import {APP_ROUTES} from "../../config/navigation.ts";
import {Icon} from "../Icon.tsx";

export const PlayerCellShort = ({accountId, playerData, isLoading}: {
    accountId: number, playerData?: SteamPlayerDto, isLoading: boolean
}) => {
    if (isLoading) {
        return (
            <div className="flex items-center gap-3 w-full">
                <div className="w-8 h-8 bg-[#2e353b] animate-pulse shrink-0"/>
                <div className="flex flex-col gap-1 w-full">
                    <div className="h-3 w-20 bg-[#2e353b] rounded animate-pulse"/>
                </div>
            </div>
        );
    }

    const playerName = playerData?.steamName || `ID: ${accountId}`;
    const playerAvatar = playerData?.avatar || '/assets/images/unknown_player.png';

    return (
        <Link to={`${APP_ROUTES.PLAYERS}/${accountId}`} className="flex items-center gap-3 group/player w-full min-w-0">
            <Icon src={playerAvatar} size={8} alt={playerName} fallbackSrc={'/assets/images/unknown_player.png'}/>

            <div className="flex flex-col min-w-0">
                <span
                    className="font-bold text-xs text-[#e3e3e3] group-hover/player:text-[#e7d291] transition-colors break-words leading-tight"
                    title={playerName}>
                    {playerName}
                </span>
                {!playerData?.steamName && (
                    <span className="text-[9px] text-[#58606e] font-mono">
                        #{accountId}
                    </span>
                )}
            </div>
        </Link>
    );
};
