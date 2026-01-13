import {useItems} from "../../hooks/queries/useItems.ts";
import {Icon} from "../Icon.tsx";

export const ItemComponent = ({ itemName }: { itemName: string }) => {
    const { getItem } = useItems();
    const item = getItem(itemName);

    if (!item) return null;

    return (
        <div className="flex flex-col items-center gap-0.5">
            <div className="w-8 h-6 bg-[#1a1d24] border border-[#2e353b] rounded flex items-center justify-center overflow-hidden">
                <img
                    src={`${item.img}`}
                    alt={item.dname}
                    className="w-full h-full object-cover"
                />
            </div>
            <span className="text-[9px] text-[#e7d291] font-bold"><Icon src="/assets/images/gold.png" size={3} />{item.cost}</span>
        </div>
    );
};
