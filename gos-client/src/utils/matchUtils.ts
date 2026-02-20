import {type BaseEnum, type BooleanState, LaneRole} from "../types/common.ts";

const PLAYER_SLOT_COLORS: Record<number, string> = {
  0: "#3375FF",
  1: "#66FFBF",
  2: "#BF00BF",
  3: "#F3F00B",
  4: "#FF6B00",
  5: "#FE86C2",
  6: "#A1B447",
  7: "#65D9F7",
  8: "#008321",
  9: "#A46900",
  128: "#FE86C2",
  129: "#A1B447",
  130: "#65D9F7",
  131: "#008321",
  132: "#A46900",
} as const;

const RARITY_COLORS: Record<string, string> = {
  "arcana": "rgb(173, 229, 92)",
  "immortal": "rgb(228, 174, 51)",
  "legendary": "rgb(211, 44, 230)",
  "mythical": "rgb(136, 71, 255)",
  "rare": "rgb(75, 105, 255)",
  "uncommon": "rgb(94, 152, 217)",
  "common": "rgb(114, 114, 114)",
} as const;

/*const EXP_LEVEL = [
  0,
  240,
  640,
  1160,
  1760,
  2440,
  3200,
  4000,
  4900,
  5900,
  7000,
  8200,
  9500,
  10900,
  12400,
  14000,
  15700,
  17500,
  19400,
  21400,
  23600,
  26000,
  28600,
  31400,
  34400,
  38400,
  43400,
  49400,
  56400,
  63900
];*/

/*const ANCIENTS_NAMES = [
  "npc_dota_neutral_jungle_stalker",
  "npc_dota_neutral_elder_jungle_stalker",
  "npc_dota_neutral_prowler_acolyte",
  "npc_dota_neutral_prowler_shaman",
  "npc_dota_neutral_rock_golem",
  "npc_dota_neutral_granite_golem",
  "npc_dota_neutral_ice_shaman",
  "npc_dota_neutral_frostbitten_golem",
  "npc_dota_neutral_big_thunder_lizard",
  "npc_dota_neutral_small_thunder_lizard",
  "npc_dota_neutral_black_drake",
  "npc_dota_neutral_black_dragon",
  "npc_dota_neutral_ancient_frog",
  "npc_dota_neutral_ancient_frog_mage"
]*/


export const getPlayerColor = (playerSlot: number): string => {
  return PLAYER_SLOT_COLORS[playerSlot] ?? "#FFFFFF";
};

export const getItemRarityColor = (rarity: string | undefined | null): string => {
  if (!rarity) return "transparent";
  return RARITY_COLORS[rarity.toLowerCase()] ?? "rgb(114, 114, 114)";
};

export const isRadiantTeam = (radiant : BaseEnum<BooleanState>) : boolean => {
  return radiant.value === 1;
}

export const isTeamWon = (radiant: BaseEnum<BooleanState>, win: BaseEnum<BooleanState> | null): boolean | null => {
  if (!win) return null; // If win status is missing
  return (isRadiantTeam(radiant) && win.value === 1) || (!isRadiantTeam(radiant) && win.value === 0);
};

export const getLaneInfo = (roleValue: number | undefined | null) => {
  switch (roleValue) {
    case LaneRole.Safe:
      return { label: 'Safe Lane', iconSrc: '/assets/images/lane_safe.svg' };
    case LaneRole.Mid:
      return { label: 'Mid Lane', iconSrc: '/assets/images/lane_mid.svg' };
    case LaneRole.Offlane:
      return { label: 'Off Lane', iconSrc: '/assets/images/lane_off.svg' };
    case LaneRole.Jungle:
      return { label: 'Jungle', iconSrc: '/assets/images/lane_jungle.svg' };
    default:
      return null;
  }
};
