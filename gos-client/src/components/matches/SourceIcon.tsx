import React from "react";
import {useItems} from "../../hooks/queries/useItems.ts";
import {useAbilities} from "../../hooks/queries/useAbilities.ts";
import {Icon} from "../Icon.tsx";
import {ItemCell} from "../items/ItemCell.tsx";
import {AbilityCell} from "../abilities/AbilityCell.tsx";

export const SourceIcon: React.FC<{ sourceName: string }> = ({sourceName}) => {
    const {getItem} = useItems();
    const {getAbility} = useAbilities();

    if (sourceName === "null" || !sourceName) {
        return (
            <div className="cursor-help shrink-0" title="Auto-attack">
                <Icon src="/assets/images/default_attack.png" alt="Auto-attack"/>
            </div>
        );
    }

    const item = getItem(sourceName);
    if (item) {
        return <ItemCell itemName={sourceName} showName={false}/>;
    }

    const ability = getAbility(sourceName);
    if (ability) {
        return <AbilityCell abilityName={sourceName} showTooltip={true}/>;
    }

    return (
        <div
            className="w-10 h-10 rounded border border-[#2e353b] bg-[#1a1d24] flex items-center justify-center shrink-0 cursor-help"
            title={`${sourceName}`}>
            <span className="text-[#808fa6] text-xs font-bold">?</span>
        </div>
    );
};
