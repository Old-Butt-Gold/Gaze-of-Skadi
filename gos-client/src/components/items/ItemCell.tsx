import { useItems } from "../../hooks/queries/useItems.ts";
import { ItemTooltip } from "./ItemTooltip.tsx";
import React from "react";

export const ItemCell: React.FC<{
    itemName: string;
    showName?: boolean;
}> = ({ itemName, showName = false }) => {
    const { getItem } = useItems();
    const item = getItem(itemName);

    if (!item) {
        return (
            <div className="flex items-center gap-3 opacity-50">
                <div className="w-8 h-6 bg-[#262b36] rounded border border-[#3a414e]"></div>
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
                <div className="w-8 h-6 bg-[#262b36] rounded border border-[#3a414e] flex items-center justify-center text-[10px] text-[#58606e] overflow-hidden">
                    <img
                        src={`${item.img}`}
                        alt={item.dname ?? "unknown"}
                        className="w-full h-full object-cover"
                    />
                </div>
                {showName && (
                    <span className="font-serif text-slate-200 text-[15px] tracking-wide group-hover:text-white transition-colors border-[#58606e]/50 hover:border-white/50">
                        {item.dname}
                    </span>
                )}
            </div>
        </ItemTooltip>
    );
};
