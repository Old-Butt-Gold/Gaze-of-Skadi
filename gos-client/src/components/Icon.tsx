import React from 'react';

interface IconProps {
    src: string;
    alt?: string;
    size: number;
}

export const Icon: React.FC<IconProps> =
    ({
         src,
         size = 4,
         alt,
     }) => {
    const widthClass = `w-${size}`;
    const heightClass = `h-${size}`;

    return (
        <img
            src={src}
            alt={alt ?? src}
            className={`${widthClass} ${heightClass} object-contain inline-block`}
        />
    );
};