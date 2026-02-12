
import React from 'react';
import {Icon} from "../Icon.tsx";

interface PartySizeIconProps {
    partySize: number | null | undefined;
}

const PartySizeIcon: React.FC<PartySizeIconProps> = ({ partySize }) => {
    if (!partySize) {
        return null;
    }

    const isSolo = partySize === 1;

    return (
        <div className="relative group/party cursor-help">
            <Icon
                src={isSolo ? "/assets/images/party_solo.svg" : "/assets/images/party.svg"}
                size={4}
            />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-black text-xs text-white rounded opacity-0 group-hover/party:opacity-100 pointer-events-none whitespace-nowrap z-20">
                Party Size: {partySize ?? 'Unknown'}
            </div>
        </div>
    );
};

export default PartySizeIcon;
