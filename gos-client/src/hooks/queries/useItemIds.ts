import { useQuery } from '@tanstack/react-query';
import { itemService } from '../../services/itemService';
import type {ItemIdDictionary} from "../../types/items.ts";

export const useItemIds = () => {
  const query = useQuery<ItemIdDictionary, Error>({
    queryKey: ['itemIds'],
    queryFn: itemService.getItemIds,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours cache (ID mapping rarely changes)
  });

  const getItemNameById = (id: number | string): string | null => {
    if (!query.data) return null;
    return query.data[id.toString()] || null;
  };

  return { ...query, getItemNameById };
};
