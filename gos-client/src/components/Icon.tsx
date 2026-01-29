import React, {useState} from 'react';

interface IconProps {
    src: string;
    alt?: string;
    size: number;
    fallbackSrc?: string
}

export const Icon: React.FC<IconProps> =
    ({
         src,
         size = 4,
         alt,
         fallbackSrc = undefined
     }) => {

    const [imgSrc, setImgSrc] = useState(src);

    const handleError = () => {
        if (fallbackSrc && imgSrc !== fallbackSrc) {
            setImgSrc(fallbackSrc);
        }
    };

    const widthClass = `w-${size}`;
    const heightClass = `h-${size}`;

    return (
        <img
            src={src}
            alt={alt ?? src}
            className={`${widthClass} ${heightClass} object-contain inline-block`}
            loading={"lazy"}
            onError={handleError}
        />
    );
};
