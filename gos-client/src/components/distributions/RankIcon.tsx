import React from "react";
import {getRankIconUrl, getRankNameFull, getRankStarUrl} from "../../utils/rankUtils.ts";
import type {Rank} from "../../types/common.ts";

interface RankIconProps {
    rank: Rank;
    size: number;
}

export const RankIcon: React.FC<RankIconProps> = ({ rank, size }) => {
    const iconUrl = getRankIconUrl(rank);
    const starUrl = getRankStarUrl(rank);
    const widthClass = `w-${size}`;
    const heightClass = `h-${size}`;

    return (
        <div className={`${widthClass} ${heightClass} relative shrink-0`}>
            <img
                src={iconUrl}
                alt="Rank"
                className="absolute inset-0 w-full h-full object-contain"
            />
            {starUrl && (
                <img
                    src={starUrl}
                    alt="Star"
                    className="absolute inset-0 w-full h-full object-contain"
                    title={getRankNameFull(rank)}
                />
            )}
        </div>
    );
};
