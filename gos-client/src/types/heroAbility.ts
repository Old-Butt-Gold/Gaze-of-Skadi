import type {BooleanState} from "./common.ts";

export interface Facet {
    id: number;
    name: string; // internal name
    icon: string;
    color: string; // "Red", "Blue", "Gray", etc.
    title: string;
    description: string;
    deprecated: BooleanState | null;
    abilities: string[] | null;
}

export interface Talent {
    name: string;
    level: TalentLevel;
}

export type TalentLevel = 1 | 2 | 3 | 4;

export interface Shard {
  shard_desc: string;
  shard_skill_name: string;
  video: string;
}

export interface AghanimScepter {
  scepter_desc: string;
  scepter_skill_name: string;
  video: string;
}

export interface HeroAbility {
  abilities: string[];
  talents: Talent[];
  facets: Facet[];
  shard: Shard;
  aghanim_scepter: AghanimScepter;
}
