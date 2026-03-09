import {BooleanState} from "../types/common.ts";

const INNATE_ICONS = new Set([
  "kunkka_admirals_rum",
  "spectre_desolate",
  "slark_essence_shift",
  "phantom_assassin_blur",
  "drow_ranger_trueshot",
  "tiny_craggy_exterior",
  "zuus_static_field",
  "luna_lunar_blessing",
  "dazzle_innate_weave",
  "nevermore_necromastery",
  "life_stealer_feast",
  "omniknight_degen_aura",
  "alchemist_goblins_greed",
  "invoker_invoke",
  "brewmaster_liquid_courage",
  "lone_druid_spirit_bear",
  "treant_natures_guise",
  "ogre_magi_dumb_luck",
  "undying_ceaseless_dirge",
  "disruptor_electromagnetic_repulsion",
  "medusa_mana_shield",
  "troll_warlord_switch_stance",
  "techies_minefield_sign",
  "earth_spirit_stone_caller",
  "monkey_king_mischief",
  "grimstroke_ink_trail",
  "marci_special_delivery",
]);

export const getAbilityIconUrl = (abilityKey: string | null, is_innate : BooleanState | null, originalImg : string | null)  => {
  if (abilityKey === null) return "/assets/images/innate_icon.png";

  const isInnate = is_innate === BooleanState.True;

  if (!isInnate) return originalImg;

  return INNATE_ICONS.has(abilityKey)
    ? originalImg
    : '/assets/images/innate_icon.png';
}
