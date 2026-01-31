import React from "react";

interface RankIconProps {
    iconUrl: string;
    starUrl: string | null;
    size: number;
}

export const RankIcon: React.FC<RankIconProps> = ({ iconUrl, starUrl, size }) => {
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
                />
            )}
        </div>
    );
};
