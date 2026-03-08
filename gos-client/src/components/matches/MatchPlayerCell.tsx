import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Icon } from '../Icon';
import { APP_ROUTES } from '../../config/navigation';
import {isRadiantTeam} from '../../utils/matchUtils';
import type { PlayerInfoDto } from '../../types/matchGeneralInformation.ts';
import { RankIcon } from '../distributions/RankIcon';
import { HeroImage } from "../heroes/HeroImage";
import { HeroCell } from "../heroes/HeroCell";
import { LaneRoleIcon } from "./LaneRoleIcon";

interface Props {
    player: PlayerInfoDto;
    useIcon?: boolean;
    hideName?: boolean;
}

const PARTY_COLORS = [
    { text: 'text-[#38bdf8]', bg: 'bg-[#38bdf8]/10', border: 'border-[#38bdf8]/30' }, // Light Blue
    { text: 'text-[#c084fc]', bg: 'bg-[#c084fc]/10', border: 'border-[#c084fc]/30' }, // Purple
    { text: 'text-[#facc15]', bg: 'bg-[#facc15]/10', border: 'border-[#facc15]/30' }, // Yellow
    { text: 'text-[#f43f5e]', bg: 'bg-[#f43f5e]/10', border: 'border-[#f43f5e]/30' }, // Pink
    { text: 'text-[#4ade80]', bg: 'bg-[#4ade80]/10', border: 'border-[#4ade80]/30' }, // Green
    { text: 'text-[#fb923c]', bg: 'bg-[#fb923c]/10', border: 'border-[#fb923c]/30' }, // Orange
];

export const MatchPlayerCell: React.FC<Props> = ({ player, hideName, useIcon = true }) => {
    const isRadiant = isRadiantTeam(player.isRadiant);

    const teamColorClass = isRadiant ? "text-emerald-400" : "text-red-400";
    const nameClasses = clsx(
        "font-bold drop-shadow-sm hover:opacity-80 transition-all block",
        "text-xs sm:text-sm truncate",
        teamColorClass
    );

    const hasParty = player.partyId != null && player.partySize != null && player.partySize > 1;
    const partyStyle = hasParty ? PARTY_COLORS[player.partyId! % PARTY_COLORS.length] : null;

    return (
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 max-w-full">
            {useIcon
                ? <HeroCell heroId={player.heroId} />
                : <div className="flex shrink-0">
                    <HeroImage
                        heroId={player.heroId}
                        showName={false}
                        heroVariant={player.heroVariant}
                        leaverStatus={player?.leaverStatus?.value}
                        playerSlot={player?.playerSlot?.value}
                    />
                </div>
            }

            {!hideName && (
                <div className="flex flex-col min-w-0 justify-center gap-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                        <div className="shrink-0">
                            <Icon src={isRadiant ? "/assets/images/radiant.png" : "/assets/images/dire.png"} size={4} />
                        </div>
                        <RankIcon rank={player?.rankTier?.value} size={8}/>
                        <LaneRoleIcon laneRole={player?.laneRole?.value} size={4} />

                        {hasParty && partyStyle && (
                            <div
                                className={clsx(
                                    "flex items-center gap-1 px-1.5 py-0.5 rounded text-xs leading-none font-bold border",
                                    partyStyle.bg, partyStyle.text, partyStyle.border
                                )}
                                title={`Playing in a party of ${player.partySize}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                </svg>
                                {player.partySize}
                            </div>
                        )}
                    </div>

                    {player.accountId ? (
                        <Link
                            to={`${APP_ROUTES.PLAYERS}/${player.accountId}`}
                            className={clsx(nameClasses, "hover:underline")}
                            title={player.name || player.personaName || 'Anonymous'}
                        >
                            {player.name ||  player.personaName || 'Anonymous'}
                        </Link>
                    ) : (
                        <span className={nameClasses} title={player.name || player.personaName || 'Anonymous'}>
                            {player.name || player.personaName || 'Anonymous'}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};
