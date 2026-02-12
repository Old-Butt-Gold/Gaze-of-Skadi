import type {Behavior, BooleanState, DamageType, Dispellable, TargetTeam, TargetType} from "./common.ts";

export interface AbilityAttribute {
    key: string;
    header: string;
    value: string[];
    generated: boolean | null;
}

export interface Ability {
    dname: string | null;
    img: string | null;
    video: string | null;
    attrib: AbilityAttribute[] | null;
    behavior: Behavior[] | null;
    target_type: TargetType[] | null;
    dmg_type: DamageType | null;
    desc: string | null;
    mc: string[] | null;
    cd: string[] | null;
    lore: string | null;
    dispellable: Dispellable | null;
    target_team: TargetTeam[] | null;
    bkbpierce: BooleanState | null;
    is_innate: BooleanState | null;
}

// Словарь способностей, который возвращает контроллер
export type AbilityDictionary = Record<string, Ability>;
