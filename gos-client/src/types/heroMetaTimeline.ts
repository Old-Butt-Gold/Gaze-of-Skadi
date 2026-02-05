export interface HeroMetaPointDto {
  winRate: number;
  winRateChanged: number;
  timeStamp: number;
  matchCount: number;
}

export interface HeroMetaTimelineDto {
  pos1: HeroMetaPointDto[];
  pos2: HeroMetaPointDto[];
  pos3: HeroMetaPointDto[];
  pos4: HeroMetaPointDto[];
  pos5: HeroMetaPointDto[];
}
