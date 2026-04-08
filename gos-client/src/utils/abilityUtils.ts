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
  "pudge_innate_graft_flesh",
  "tiny_insurmountable",
  "abaddon_withering_mist",
  "ancient_apparition_bone_chill",
  "arc_warden_runic_infusion",
  "bloodseeker_sanguivore",
  "broodmother_spiders_milk",
  "chen_zealot",
  "crystal_maiden_glacial_guard",
  "death_prophet_witchcraft",
  "doom_bringer_lvl_pain",
  "gyrocopter_afterburner",
  "wisp_essence_conduction",
  "kez_switch_weapons",
  "legion_commander_outfight_them",
  "lich_death_charge",
  "life_stealer_ghoul_frenzy",
  "magnataur_solid_core",
  "mirana_celestial_quiver",
  "morphling_ebb_and_flow",
  "muerta_supernatural",
  "furion_spirit_of_the_forest",
  "necrolyte_sadist",
  "night_stalker_hunter_in_the_night",
  "nyx_assassin_neuro_sting",
  "obsidian_destroyer_equilibrium",
  "pangolier_fortune_favors_the_bold",
  "phantom_lancer_illusory_armaments",
  "phoenix_dying_light",
  "riki_innate_backstab",
  "rubick_curiosity",
  "sandking_caustic_finale",
  "shadow_demon_menace",
  "shadow_shaman_fowl_play",
  "spirit_breaker_bull_rush",
  "techies_mutually_assured_destruction",
  "tusk_bitter_chill",
  "venomancer_poison_sting",
  "visage_silent_as_the_grave",
  "windrunner_tailwind",
  "winter_wyvern_eldwurms_edda",
  "tidehunter_krill_eater",
  "bane_ichor_of_nyctasha"
]);

export const getAbilityIconUrl = (abilityKey: string | null, is_innate : BooleanState | null, originalImg : string | null)  => {
  if (abilityKey === null) return "/assets/images/innate_icon.png";

  const isInnate = is_innate === BooleanState.True;

  if (!isInnate) return originalImg;

  return INNATE_ICONS.has(abilityKey)
    ? originalImg
    : '/assets/images/innate_icon.png';
}
