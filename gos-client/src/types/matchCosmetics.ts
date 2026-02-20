export interface CosmeticDto {
  imageUrl: string;
  name: string;
  itemRarity: string;
  marketUrl: string;
}

export interface PlayerCosmeticsDto {
  playerIndex: number;
  cosmetics: CosmeticDto[];
}
