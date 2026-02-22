import { useItems } from "../../hooks/queries/useItems.ts";
import { ItemTooltip } from "./ItemTooltip.tsx";
import React from "react";
import {Icon} from "../Icon.tsx";

export const ItemCell: React.FC<{
    itemName: string;
    showName?: boolean;
}> = ({ itemName, showName = false }) => {
    const { getItem } = useItems();
    const item = getItem(itemName);

    if (!item) {
        return (
            <div className="flex items-center gap-3 opacity-50">
                <div className="w-10 h-10 bg-[#262b36] rounded border border-[#3a414e]"></div>
                {showName && (
                    <span className="font-serif text-slate-200 text-[15px] tracking-wide">
                        {itemName.replace(/_/g, ' ')}
                      </span>
                )}
            </div>
        );
    }

    return (
        <ItemTooltip itemName={itemName}>
            <div className="flex items-center gap-3 group-hover/item:opacity-80 transition-opacity cursor-help">
                <Icon src={item.img} size={10} />
                {showName && (
                    <span className="font-serif text-slate-200 text-[15px] tracking-wide group-hover:text-white transition-colors border-[#58606e]/50 hover:border-white/50">
                        {item.dname}
                    </span>
                )}
            </div>
        </ItemTooltip>
    );
};
