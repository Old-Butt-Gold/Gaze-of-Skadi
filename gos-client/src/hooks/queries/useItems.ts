import {resourceService} from "../../services/resourceService.ts";
import {useQuery} from "@tanstack/react-query";
import type {Item, ItemDictionary} from "../../types/items.ts";

export const useItems = () => {
  const query = useQuery<ItemDictionary, Error>({
    queryKey: ['items'],
    queryFn: resourceService.getItemsByName,
    staleTime: 1000 * 60 * 60, // 24 hours cache
  });

  const getItem = (itemName: string): Item | null => {
    if (!query.data) return null;
    return query.data[itemName] || null;
  };

  return { ...query, getItem };
};
