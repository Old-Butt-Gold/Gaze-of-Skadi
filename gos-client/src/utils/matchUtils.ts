import {type BaseEnum, type BooleanState, LaneRole} from "../types/common.ts";
import {UnitOrder} from "../types/matchActions.ts";
import {GoldReason, XpReason} from "../types/matchEarnings.ts";
import {Rune} from "../types/matchObjectvies.ts";
import {VisionItemType} from "../types/matchVision.ts";

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

export const UNIT_ORDER_CONFIG: Record<number, { short: string, full: string, group: string }> = {
  [UnitOrder.None]: { short: "None", full: "None", group: "Misc" },
  [UnitOrder.MoveToPosition]: { short: "Move (Pos)", full: "Move to Position", group: "Movement" },
  [UnitOrder.MoveToTarget]: { short: "Move (Tgt)", full: "Move to Target", group: "Movement" },
  [UnitOrder.AttackMove]: { short: "Attack Move", full: "Attack Move", group: "Combat" },
  [UnitOrder.AttackTarget]: { short: "Attack (Tgt)", full: "Attack Target", group: "Combat" },
  [UnitOrder.CastPosition]: { short: "Cast (Pos)", full: "Cast on Position", group: "Abilities" },
  [UnitOrder.CastTarget]: { short: "Cast (Tgt)", full: "Cast on Target", group: "Abilities" },
  [UnitOrder.CastTargetTree]: { short: "Cast (Tree)", full: "Cast on Tree", group: "Abilities" },
  [UnitOrder.CastNoTarget]: { short: "Cast (No Tgt)", full: "Cast No Target", group: "Abilities" },
  [UnitOrder.CastToggle]: { short: "Toggle Spell", full: "Toggle Ability", group: "Abilities" },
  [UnitOrder.HoldPosition]: { short: "Hold Pos", full: "Hold Position", group: "Movement" },
  [UnitOrder.TrainAbility]: { short: "Level Up", full: "Train Ability", group: "Abilities" },
  [UnitOrder.DropItem]: { short: "Drop Item", full: "Drop Item", group: "Items" },
  [UnitOrder.GiveItem]: { short: "Give Item", full: "Give Item", group: "Items" },
  [UnitOrder.PickupItem]: { short: "Pickup Item", full: "Pickup Item", group: "Items" },
  [UnitOrder.PickupRune]: { short: "Pickup Rune", full: "Pickup Rune", group: "Items" },
  [UnitOrder.PurchaseItem]: { short: "Buy Item", full: "Purchase Item", group: "Items" },
  [UnitOrder.SellItem]: { short: "Sell Item", full: "Sell Item", group: "Items" },
  [UnitOrder.DisassembleItem]: { short: "Disassemble", full: "Disassemble Item", group: "Items" },
  [UnitOrder.MoveItem]: { short: "Move Item", full: "Move Item in Inventory", group: "Items" },
  [UnitOrder.CastToggleAuto]: { short: "Auto-cast", full: "Toggle Auto-cast", group: "Abilities" },
  [UnitOrder.Stop]: { short: "Stop", full: "Stop Action", group: "Movement" },
  [UnitOrder.Taunt]: { short: "Taunt", full: "Taunt", group: "Misc" },
  [UnitOrder.Buyback]: { short: "Buyback", full: "Buyback", group: "Misc" },
  [UnitOrder.Glyph]: { short: "Glyph", full: "Use Glyph", group: "Misc" },
  [UnitOrder.EjectItemFromStash]: { short: "Eject Stash", full: "Eject Item from Stash", group: "Items" },
  [UnitOrder.CastRune]: { short: "Use Rune", full: "Cast Rune", group: "Items" },
  [UnitOrder.PingAbility]: { short: "Ping Spell", full: "Ping Ability", group: "Misc" },
  [UnitOrder.MoveToDirection]: { short: "Move Dir", full: "Move to Direction", group: "Movement" },
  [UnitOrder.Patrol]: { short: "Patrol", full: "Patrol", group: "Movement" },
  [UnitOrder.VectorTargetPosition]: { short: "Vector Cast", full: "Vector Target Position", group: "Abilities" },
  [UnitOrder.Radar]: { short: "Scan", full: "Use Radar (Scan)", group: "Misc" },
  [UnitOrder.SetItemCombineLock]: { short: "Lock Item", full: "Lock/Unlock Item Combine", group: "Items" },
  [UnitOrder.Continue]: { short: "Continue", full: "Continue", group: "Misc" },
  [UnitOrder.VectorTargetCanceled]: { short: "Cancel Vector", full: "Cancel Vector Target", group: "Abilities" },
  [UnitOrder.CastRiverPaint]: { short: "River Paint", full: "Cast River Paint", group: "Misc" },
  [UnitOrder.PregameAdjustItemAssignment]: { short: "Adjust Item", full: "Pregame Adjust Item Assignment", group: "Items" },
  [UnitOrder.DropItemAtFountain]: { short: "Drop at Base", full: "Drop Item at Fountain", group: "Items" },
  [UnitOrder.TakeItemFromNeutralItemStash]: { short: "Take Neutral", full: "Take Item from Neutral Stash", group: "Items" },
  [UnitOrder.MoveRelative]: { short: "Move Rel", full: "Move Relative", group: "Movement" },
  [UnitOrder.CastToggleAlt]: { short: "Toggle Alt", full: "Cast Toggle Alt", group: "Abilities" }
};

export const EXP_LEVEL = [
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
];

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

export const GOLD_REASONS: Record<number, { label: string, color: string }> = {
  [GoldReason.Others]: { label: "Others", color: "#808fa6" },
  [GoldReason.Deaths]: { label: "Deaths (Lost)", color: "#7f1d1d" },
  [GoldReason.Buybacks]: { label: "Buybacks (Spent)", color: "#78350f" },
  [GoldReason.Abandon]: { label: "Abandon", color: "#58606e" },
  [GoldReason.SellItems]: { label: "Sell Items", color: "#d97706" },
  [GoldReason.Buildings]: { label: "Buildings", color: "#f59e0b" },
  [GoldReason.Heroes]: { label: "Heroes", color: "#ef4444" },
  [GoldReason.Creeps]: { label: "Lane Creeps", color: "#38bdf8" },
  [GoldReason.Neutrals]: { label: "Neutrals", color: "#10b981" },
  [GoldReason.Roshan]: { label: "Roshan", color: "#f43f5e" },
  [GoldReason.Courier]: { label: "Courier", color: "#8b5cf6" },
  [GoldReason.BountyRunes]: { label: "Bounty Runes", color: "#facc15" },
  [GoldReason.Wards]: { label: "Wards", color: "#5ea5e9" },
};

export const XP_REASONS: Record<number, { label: string, color: string }> = {
  [XpReason.Others]: { label: "Others", color: "#808fa6" },
  [XpReason.Heroes]: { label: "Heroes", color: "#ef4444" },
  [XpReason.Creeps]: { label: "Creeps", color: "#38bdf8" },
  [XpReason.Roshan]: { label: "Roshan", color: "#f43f5e" },
  [XpReason.WisdomRunes]: { label: "Wisdom Runes", color: "#a855f7" },
};

export const RUNE_NAMES: Record<Rune, string> = {
  [Rune.AmplifyDamage]: "Double Damage",
  [Rune.Haste]: "Haste",
  [Rune.Illusion]: "Illusion",
  [Rune.Invisibility]: "Invisibility",
  [Rune.Regeneration]: "Regeneration",
  [Rune.Bounty]: "Bounty",
  [Rune.Arcane]: "Arcane",
  [Rune.Water]: "Water",
  [Rune.Wisdom]: "Wisdom",
  [Rune.Shield]: "Shield"
};

export const parseObjectiveName = (key: string): { name: string, team: 'radiant' | 'dire' | 'neutral' } => {
  if (key === 'npc_dota_roshan') {
    return { name: 'Roshan', team: 'neutral' };
  }

  const isRadiant = key.includes('goodguys');
  const teamName = isRadiant ? 'Radiant' : 'Dire';
  const teamKey = isRadiant ? 'radiant' : 'dire';

  let building = '';
  if (key.includes('fort')) building = 'Ancient';
  else if (key.includes('healers')) building = 'Shrine';
  else if (key.includes('tower1')) building = 'T1';
  else if (key.includes('tower2')) building = 'T2';
  else if (key.includes('tower3')) building = 'T3';
  else if (key.includes('tower4')) building = 'T4';
  else if (key.includes('melee_rax')) building = 'Melee Rax';
  else if (key.includes('range_rax')) building = 'Ranged Rax';

  let lane = '';
  if (key.includes('_bot')) lane = ' Bot';
  else if (key.includes('_mid')) lane = ' Mid';
  else if (key.includes('_top')) lane = ' Top';

  return {
    name: `${teamName} ${building}${lane}`.trim(),
    team: teamKey
  };
};

export const VISION_ITEM_ICONS: Record<number, string> = {
  [VisionItemType.ObserverWard]: "/assets/images/ward_observer.png",
  [VisionItemType.SentryWard]: "/assets/images/ward_sentry.png",
  [VisionItemType.Dust]: "/assets/images/dust.png",
  [VisionItemType.Gem]: "/assets/images/gem.png",
  [VisionItemType.Smoke]: "/assets/images/smoke_of_deceit.png",
};

// Функция для перевода координат карты Dota 2 (обычно 64-192) в проценты (0-100%)
export const normalizeMapCoordinate = (val: number, isY: boolean = false): number => {
  let percentage = val;

  percentage = ((val - 64) / 128) * 100;

  // Ограничиваем пределы, чтобы точки не улетали за карту
  percentage = Math.max(0, Math.min(100, percentage));

  // В доте ось Y идет снизу вверх, а в вебе сверху вниз, поэтому инвертируем
  return isY ? 100 - percentage : percentage;
};
