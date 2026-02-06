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

export interface HeroAbility {
    abilities: string[];
    facets: Facet[];
}