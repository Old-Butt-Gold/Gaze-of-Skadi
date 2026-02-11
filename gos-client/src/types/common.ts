export interface BaseEnum<T> {
  value: T;
  name: string;
}

export const BooleanState = {
  False: 0,
  True: 1,
} as const;

export const Rank = {
  Herald1: 11,
  Herald2: 12,
  Herald3: 13,
  Herald4: 14,
  Herald5: 15,
  Guardian1: 21,
  Guardian2: 22,
  Guardian3: 23,
  Guardian4: 24,
  Guardian5: 25,
  Crusader1: 31,
  Crusader2: 32,
  Crusader3: 33,
  Crusader4: 34,
  Crusader5: 35,
  Archon1: 41,
  Archon2: 42,
  Archon3: 43,
  Archon4: 44,
  Archon5: 45,
  Legend1: 51,
  Legend2: 52,
  Legend3: 53,
  Legend4: 54,
  Legend5: 55,
  Ancient1: 61,
  Ancient2: 62,
  Ancient3: 63,
  Ancient4: 64,
  Ancient5: 65,
  Divine1: 71,
  Divine2: 72,
  Divine3: 73,
  Divine4: 74,
  Divine5: 75,
  Immortal: 80,
} as const;

export const GameMode = {
  Unknown: 0,
  AllPick: 1,
  CaptainsMode: 2,
  RandomDraft: 3,
  SingleDraft: 4,
  AllRandom: 5,
  Intro: 6,
  Diretide: 7,
  ReverseCaptainsMode: 8,
  Greeviling: 9,
  Tutorial: 10,
  MidOnly: 11,
  LeastPlayed: 12,
  LimitedHeroes: 13,
  CompendiumMatchmaking: 14,
  Custom: 15,
  CaptainsDraft: 16,
  BalancedDraft: 17,
  AbilityDraft: 18,
  Event: 19,
  AllRandomDeathMatch: 20,
  OneVOneMid: 21,
  AllPickRanked: 22,
  Turbo: 23,
  Mutation: 24,
  CoachesChallenge: 25,
} as const;

export const LobbyType = {
  LobbyNormal: 0,
  LobbyPractice: 1,
  LobbyTournament: 2,
  LobbyTutorial: 3,
  LobbyCoopBots: 4,
  LobbyRankedTeamMmLegacy: 5,
  LobbyRankedSoloMmLegacy: 6,
  LobbyRanked: 7,
  Lobby1V1Mid: 8,
  LobbyBattleCup: 9,
  LobbyLocalBots: 10,
  LobbySpectator: 11,
  LobbyEvent: 12,
  LobbyGauntlet: 13,
  LobbyNewPlayer: 14,
  LobbyFeatured: 15,
} as const;

export const TargetType = {
    Hero: 0,
    Basic: 1,
    Building: 2,
    Tree: 3,
} as const;
export type TargetType = typeof TargetType[keyof typeof TargetType];

export const TargetTeam = {
    Enemy: 0,
    Friendly: 1,
    Both: 2,
} as const;
export type TargetTeam = typeof TargetTeam[keyof typeof TargetTeam];

export const Behavior = {
    UnitTarget: 0,
    Channeled: 1,
    Hidden: 2,
    Passive: 3,
    NoTarget: 4,
    Autocast: 5,
    InstantCast: 6,
    AreaOfEffect: 7,
    PointTarget: 8,
    AttackModifier: 9,
} as const;
export type Behavior = typeof Behavior[keyof typeof Behavior];

export const Dispellable =
    {
        No: 0,
        StrongDispelsOnly: 1,
        Yes: 2,
    } as const;
export type Dispellable = typeof Dispellable[keyof typeof Dispellable];

export type BooleanState = typeof BooleanState[keyof typeof BooleanState];

export type Rank = typeof Rank[keyof typeof Rank];


export type GameMode = typeof GameMode[keyof typeof GameMode];

export type LobbyType = typeof LobbyType[keyof typeof LobbyType];

export const DamageType = {
    Magical: 0,
    Physical: 1,
    Pure: 2,
} as const;
export type DamageType = typeof DamageType[keyof typeof DamageType];

export const Region = {
  Nan: 0,
  UsWest: 1,
  UsEast: 2,
  Europe: 3,
  Singapore: 5,
  Dubai: 6,
  Australia: 7,
  Stockholm: 8,
  Austria: 9,
  Brazil: 10,
  SouthAfrica: 11,
  PwTelecomShanghai: 12,
  PwUnicom: 13,
  Chile: 14,
  Peru: 15,
  India: 16,
  PwTelecomGuangdong: 17,
  PwTelecomZhejiang: 18,
  Japan: 19,
  PwTelecomWuhan: 20,
  PwUnicomTianjin: 25,
  Taiwan: 37,
  Argentina: 38,
} as const;
export type Region = typeof Region[keyof typeof Region];

export const LeaverStatus = {
  Stayed: 0,
  LeftSafely: 1,
  AbandonedDisconnect: 2,
  Abandoned: 3,
  AbandonedAfk: 4,
} as const;
export type LeaverStatus = typeof LeaverStatus[keyof typeof LeaverStatus];

export const LaneRole = {
  None: 0,
  Safe: 1,
  Mid: 2,
  Offlane: 3,
  Jungle: 4,
} as const;
export type LaneRole = typeof LaneRole[keyof typeof LaneRole];

export const TeamEnum = {
  Radiant: 0,
  Dire: 1,
} as const;
export type TeamEnum = typeof TeamEnum[keyof typeof TeamEnum];

export const Patch = {
  v6_70: 0,
  v6_71: 1,
  v6_72: 2,
  v6_73: 3,
  v6_74: 4,
  v6_75: 5,
  v6_76: 6,
  v6_77: 7,
  v6_78: 8,
  v6_79: 9,
  v6_80: 10,
  v6_81: 11,
  v6_82: 12,
  v6_83: 13,
  v6_84: 14,
  v6_85: 15,
  v6_86: 16,
  v6_87: 17,
  v6_88: 18,
  v7_00: 19,
  v7_01: 20,
  v7_02: 21,
  v7_03: 22,
  v7_04: 23,
  v7_05: 24,
  v7_06: 25,
  v7_07: 26,
  v7_08: 27,
  v7_09: 28,
  v7_10: 29,
  v7_11: 30,
  v7_12: 31,
  v7_13: 32,
  v7_14: 33,
  v7_15: 34,
  v7_16: 35,
  v7_17: 36,
  v7_18: 37,
  v7_19: 38,
  v7_20: 39,
  v7_21: 40,
  v7_22: 41,
  v7_23: 42,
  v7_24: 43,
  v7_25: 44,
  v7_26: 45,
  v7_27: 46,
  v7_28: 47,
  v7_29: 48,
  v7_30: 49,
  v7_31: 50,
  v7_32: 51,
  v7_33: 52,
  v7_34: 53,
  v7_35: 54,
  v7_36: 55,
  v7_37: 56,
  v7_38: 57,
  v7_39: 58,
  v7_40: 59,
} as const;
export type Patch = typeof Patch[keyof typeof Patch];
