import type {BooleanState} from "./common.ts";

export interface Facet {
    id: number;
    name: string; // internal name
    icon: string;
    color: string; // "Red", "Blue", "Gray", etc.
    title: string;
    description: string;
    deprecated: BooleanState | null;
}

export interface Talent {
    name: string;
    level: TalentLevel;
}

export type TalentLevel = 1 | 2 | 3 | 4;

export interface HeroAbility {
    abilities: string[];
    talents: Talent[];
    facets: Facet[];
}