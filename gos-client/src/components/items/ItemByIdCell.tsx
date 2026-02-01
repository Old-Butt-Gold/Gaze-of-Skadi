import React from 'react';
import { ItemCell } from './ItemCell';
import {useItemIds} from "../../hooks/queries/useItemIds.ts";

interface Props {
    itemId: string;
    showName?: boolean;
}

export const ItemByIdCell: React.FC<Props> = ({itemId, showName = false}) => {
    const { getItemNameById } = useItemIds();
    const name = getItemNameById(itemId) ?? "unknown_item";

    return (
        <ItemCell itemName={name} showName={showName} />
    );
};
