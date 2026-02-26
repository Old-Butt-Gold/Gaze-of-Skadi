import {GameMode, LaneRole, LeaverStatus, LobbyType, Patch, Region, TeamEnum} from '../types/common';
import { Tier } from "../types/matchGeneralInformation.ts";
import {PlayerField} from "../types/player.ts";

const GAME_MODE_NAMES: Record<GameMode, string> = {
  [GameMode.Unknown]: 'Unknown',
  [GameMode.AllPick]: 'All Pick',
  [GameMode.CaptainsMode]: 'Captain’s Mode',
  [GameMode.RandomDraft]: 'Random Draft',
  [GameMode.SingleDraft]: 'Single Draft',
  [GameMode.AllRandom]: 'All Random',
  [GameMode.Intro]: 'Intro',
  [GameMode.Diretide]: 'Diretide',
  [GameMode.ReverseCaptainsMode]: 'Reverse Captain’s Mode',
  [GameMode.Greeviling]: 'Greeviling',
  [GameMode.Tutorial]: 'Tutorial',
  [GameMode.MidOnly]: 'Mid Only',
  [GameMode.LeastPlayed]: 'Least Played',
  [GameMode.LimitedHeroes]: 'Limited Heroes',
  [GameMode.CompendiumMatchmaking]: 'Compendium Matchmaking',
  [GameMode.Custom]: 'Custom Game',
  [GameMode.CaptainsDraft]: 'Captain’s Draft',
  [GameMode.BalancedDraft]: 'Balanced Draft',
  [GameMode.AbilityDraft]: 'Ability Draft',
  [GameMode.Event]: 'Event',
  [GameMode.AllRandomDeathMatch]: 'All Random Deathmatch',
  [GameMode.OneVOneMid]: '1v1 Mid',
  [GameMode.AllPickRanked]: 'All Pick (Ranked)',
  [GameMode.Turbo]: 'Turbo',
  [GameMode.Mutation]: 'Mutation',
  [GameMode.CoachesChallenge]: 'Coach’s Challenge',
};

export const getGameModeName = (mode: GameMode): string => GAME_MODE_NAMES[mode] ?? 'Unknown Mode';

const LOBBY_TYPE_NAMES: Record<LobbyType, string> = {
  [LobbyType.LobbyNormal]: 'Normal',
  [LobbyType.LobbyPractice]: 'Practice',
  [LobbyType.LobbyTournament]: 'Tournament',
  [LobbyType.LobbyTutorial]: 'Tutorial',
  [LobbyType.LobbyCoopBots]: 'Co-op vs Bots',
  [LobbyType.LobbyRankedTeamMmLegacy]: 'Ranked Team (Legacy)',
  [LobbyType.LobbyRankedSoloMmLegacy]: 'Ranked Solo (Legacy)',
  [LobbyType.LobbyRanked]: 'Ranked',
  [LobbyType.Lobby1V1Mid]: '1v1 Mid',
  [LobbyType.LobbyBattleCup]: 'Battle Cup',
  [LobbyType.LobbyLocalBots]: 'Local Bots',
  [LobbyType.LobbySpectator]: 'Spectator',
  [LobbyType.LobbyEvent]: 'Event',
  [LobbyType.LobbyGauntlet]: 'Gauntlet',
  [LobbyType.LobbyNewPlayer]: 'New Player',
  [LobbyType.LobbyFeatured]: 'Featured',
};

export const getLobbyTypeName = (type: LobbyType): string => LOBBY_TYPE_NAMES[type] ?? 'Unknown Lobby';

const REGION_NAMES: Record<Region, string> = {
  [Region.Nan]: 'Unknown',
  [Region.UsWest]: 'US West',
  [Region.UsEast]: 'US East',
  [Region.Europe]: 'Europe',
  [Region.Singapore]: 'SE Asia (Singapore)',
  [Region.Dubai]: 'Dubai',
  [Region.Australia]: 'Australia',
  [Region.Stockholm]: 'Russia (Stockholm)',
  [Region.Austria]: 'Europe West (Austria)',
  [Region.Brazil]: 'South America (Brazil)',
  [Region.SouthAfrica]: 'South Africa',
  [Region.PwTelecomShanghai]: 'PW Telecom Shanghai',
  [Region.PwUnicom]: 'PW Unicom',
  [Region.Chile]: 'Chile',
  [Region.Peru]: 'Peru',
  [Region.India]: 'India',
  [Region.PwTelecomGuangdong]: 'PW Telecom Guangdong',
  [Region.PwTelecomZhejiang]: 'PW Telecom Zhejiang',
  [Region.Japan]: 'Japan',
  [Region.PwTelecomWuhan]: 'PW Telecom Wuhan',
  [Region.PwUnicomTianjin]: 'PW Unicom Tianjin',
  [Region.Taiwan]: 'Taiwan',
  [Region.Argentina]: 'Argentina',
};

export const getRegionName = (region: Region): string => REGION_NAMES[region] ?? 'Unknown Region';

const LEAVER_STATUS_NAMES: Record<LeaverStatus, string> = {
  [LeaverStatus.Stayed]: 'Finished Match',
  [LeaverStatus.LeftSafely]: 'Safe Leave',
  [LeaverStatus.AbandonedDisconnect]: 'Abandoned (DC)',
  [LeaverStatus.Abandoned]: 'Abandoned',
  [LeaverStatus.AbandonedAfk]: 'Abandoned (AFK)',
};

export const getLeaverStatusName = (status: LeaverStatus): string => LEAVER_STATUS_NAMES[status] ?? 'Unknown';

const LANE_ROLE_NAMES: Record<LaneRole, string> = {
  [LaneRole.None]: 'Unknown / Roam',
  [LaneRole.Safe]: 'Safe Lane',
  [LaneRole.Mid]: 'Mid Lane',
  [LaneRole.Offlane]: 'Offlane',
  [LaneRole.Jungle]: 'Jungle',
};

export const getLaneRoleName = (role: LaneRole): string => LANE_ROLE_NAMES[role] ?? 'Unknown';

const TEAM_NAMES: Record<TeamEnum, string> = {
  [TeamEnum.Radiant]: 'Radiant',
  [TeamEnum.Dire]: 'Dire',
};

export const getTeamName = (team: TeamEnum): string => TEAM_NAMES[team] ?? 'Unknown Team';

export const getPatchName = (patch: Patch): string => {
  const entry = Object.entries(Patch).find(([, val]) => val === patch);
  if (entry) {
    return entry[0].replace('v', '').replace('_', '.');
  }
  return 'Unknown Patch';
};

export const FIELD_LABELS: Record<PlayerField, string> = {
  [PlayerField.Kills]: 'Kills',
  [PlayerField.Deaths]: 'Deaths',
  [PlayerField.Assists]: 'Assists',
  [PlayerField.Kda]: 'KDA',
  [PlayerField.GoldPerMin]: 'GPM',
  [PlayerField.XpPerMin]: 'XPM',
  [PlayerField.LastHits]: 'Last Hits',
  [PlayerField.Denies]: 'Denies',
  [PlayerField.LaneEfficiencyPct]: 'Lane Efficiency %',
  [PlayerField.Duration]: 'Duration (min)',
  [PlayerField.Level]: 'Level',
  [PlayerField.HeroDamage]: 'Hero Damage',
  [PlayerField.TowerDamage]: 'Tower Damage',
  [PlayerField.HeroHealing]: 'Hero Healing',
  [PlayerField.Stuns]: 'Stuns Duration',
  [PlayerField.TowerKills]: 'Tower Kills',
  [PlayerField.NeutralKills]: 'Neutral Kills',
  [PlayerField.CourierKills]: 'Courier Kills',
  [PlayerField.PurchaseTpScroll]: 'TP Scrolls',
  [PlayerField.PurchaseWardObserver]: 'Observer Wards',
  [PlayerField.PurchaseWardSentry]: 'Sentry Wards',
  [PlayerField.PurchaseGem]: 'Gem Purchases',
  [PlayerField.PurchaseRapier]: 'Rapier Purchases',
  [PlayerField.Pings]: 'Map Pings',
  [PlayerField.Throw]: 'Throw (Gold Swing)',
  [PlayerField.Comeback]: 'Comeback (Gold Swing)',
  [PlayerField.Stomp]: 'Stomp (Gold Lead)',
  [PlayerField.Loss]: 'Loss (Gold Deficit)',
  [PlayerField.ActionsPerMin]: 'Actions Per Min (APM)',
};

export const IsPlayerLeft = (leaverStatus : LeaverStatus | null | undefined) => leaverStatus !== undefined && leaverStatus !== null &&
  leaverStatus !== LeaverStatus.Stayed &&
  leaverStatus !== LeaverStatus.LeftSafely;

const TIER_NAMES: Record<number, string> = {
  [Tier.None]: 'None',
  [Tier.Amateur]: 'Amateur',
  [Tier.Excluded]: 'Excluded',
  [Tier.Premium]: 'Premium',
  [Tier.Professional]: 'Professional'
};

export const getTierName = (tier: number | undefined | null): string => {
  if (tier === undefined || tier === null) return 'Unknown Tier';
  return TIER_NAMES[tier] ?? 'Unknown Tier';
};
