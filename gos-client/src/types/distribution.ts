import type {BaseEnum} from "./common.ts";

export interface DistributionRowDto {
  rank: BaseEnum;
  count: number;
  cumulativeSum: number;
  percentage: number;
}

export interface DistributionResponseDto {
  rows: DistributionRowDto[];
  totalCount: number;
}
