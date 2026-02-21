export interface ItemsDataDto {
  itemKey: string;
  itemBuyTime: number;
  consumable: boolean;
}

export interface PlayerItemsDto {
  playerIndex: number;
  items: ItemsDataDto[];
}
