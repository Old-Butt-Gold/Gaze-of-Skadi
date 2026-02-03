import {type BaseEnum, Rank} from "./common.ts";

export interface DistributionRowDto {
  rank: BaseEnum<Rank>;
  count: number;
  cumulativeSum: number;
  percentage: number;
}

export interface DistributionResponseDto {
  rows: DistributionRowDto[];
  totalCount: number;
}
