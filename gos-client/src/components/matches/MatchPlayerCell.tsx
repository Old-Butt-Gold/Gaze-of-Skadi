import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Icon } from '../Icon';
import { APP_ROUTES } from '../../config/navigation';
import {getPlayerColor, isRadiantTeam} from '../../utils/matchUtils';
import type { PlayerInfoDto } from '../../types/matchPlayers';
import { RankIcon } from '../distributions/RankIcon';
import {HeroImage} from "../heroes/HeroImage.tsx";
import {HeroCell} from "../heroes/HeroCell.tsx";
import {LaneRoleIcon} from "./LaneRoleIcon.tsx";

interface Props {
    player: PlayerInfoDto;
    useIcon?: boolean;
    hideName?: boolean;
}

export const MatchPlayerCell: React.FC<Props> = ({ player, hideName, useIcon = true }) => {
    const isRadiant = isRadiantTeam(player.isRadiant);

    const teamColorClass = isRadiant ? "text-emerald-400" : "text-red-400";
    const nameClasses = clsx(
        "font-bold drop-shadow-sm hover:opacity-80 transition-all block",
        "text-xs sm:text-sm",
        teamColorClass
    );

    return (
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {useIcon
                ? <HeroCell heroId={player.heroId} />
                : <div
                    className="flex shrink-0"
                    style={{ borderRight: `3px solid ${getPlayerColor(player.playerSlot.value)}` }}
                >
                    <HeroImage
                        heroId={player.heroId}
                        showName={false}
                        heroVariant={player.heroVariant}
                        leaverStatus={player?.leaverStatus?.value}
                    />
                </div>
            }


            {!hideName && (
                <div className="flex flex-col min-w-0 justify-center gap-0.5">
                    <div className="flex items-center gap-1">
                        <Icon src={isRadiant ? "/assets/images/radiant.png" : "/assets/images/dire.png"} size={4}/>
                        <RankIcon rank={player?.rankTier?.value} size={8}/>
                        <LaneRoleIcon laneRole={player?.laneRole?.value} size={4} />
                    </div>

                    {player.accountId ? (
                        <Link
                            to={`${APP_ROUTES.PLAYERS}/${player.accountId}`}
                            className={clsx(nameClasses, "hover:underline")}
                            title={player.personaName || 'Unknown'}
                        >
                            {player.personaName || 'Unknown'}
                        </Link>
                    ) : (
                        <span className={nameClasses}>
                            {player.personaName || 'Unknown'}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};
