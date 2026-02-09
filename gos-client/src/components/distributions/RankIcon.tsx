import React from "react";
import { getRankIconUrl, getRankNameFull, getRankStarUrl } from "../../utils/rankUtils";
import type { Rank } from "../../types/common";

interface RankIconProps {
    rank: Rank;
    leaderboardRank?: number | null;
    size?: number; // Tailwind spacing units (e.g., 32 = 8rem)
    className?: string;
}

export const RankIcon: React.FC<RankIconProps> = ({ rank, leaderboardRank, size = 12, className }) => {
    let iconUrl = getRankIconUrl(rank);
    let starUrl = getRankStarUrl(rank);

    if (leaderboardRank) {
        starUrl = null;
        if (leaderboardRank <= 10) {
            iconUrl = '/assets/images/rank_icon_8_10.png'; // Top 10
        } else if (leaderboardRank <= 1000) {
            iconUrl = '/assets/images/rank_icon_8_1000.png'; // Top 10-1000
        }
    }

    const sizeStyle = {
        width: `${size * 0.25}rem`,
        height: `${size * 0.25}rem`
    };

    return (
        <div
            className={`relative flex items-center justify-center shrink-0 ${className || ''}`}
            style={sizeStyle}
            title={getRankNameFull(rank)}
        >
            <img
                src={iconUrl}
                alt="Rank"
                className="absolute inset-0 w-full h-full object-contain z-10"
            />
            {starUrl && (
                <img
                    src={starUrl}
                    alt="Star"
                    className="absolute inset-0 w-full h-full object-contain z-20"
                />
            )}

            {leaderboardRank && (
                <span className="absolute bottom-[8%] left-1/2 -translate-x-1/2 z-30 text-[#ffeeb0] font-bold text-shadow-rank font-mono text-center leading-none"
                      style={{ fontSize: `${size * 0.05}rem`, textShadow: '0 0 5px #ff531c' }}>
                    {leaderboardRank}
                </span>
            )}
        </div>
    );
};
