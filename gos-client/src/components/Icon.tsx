import React, {useEffect, useState} from 'react';

interface IconProps {
    src: string;
    alt?: string;
    size?: number;
    fallbackSrc?: string
}

export const Icon: React.FC<IconProps> =
    ({
         src,
         size,
         alt,
         fallbackSrc = undefined
     }) => {

    const [imgSrc, setImgSrc] = useState(src);

    useEffect(() => {
        setImgSrc(src);
    }, [src]);

    const handleError = () => {
        if (fallbackSrc && imgSrc !== fallbackSrc) {
            setImgSrc(fallbackSrc);
        }
    };

    const widthClass = `w-${size ?? "full"}`;
    const heightClass = `h-${size ?? "full"}`;

    return (
        <img
            src={imgSrc}
            alt={alt ?? src}
            className={`${widthClass} ${heightClass} object-contain inline-block`}
            onError={handleError}
        />
    );
};
