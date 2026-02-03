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

export type BooleanState = typeof BooleanState[keyof typeof BooleanState];

export type Rank = typeof Rank[keyof typeof Rank];


export type GameMode = typeof GameMode[keyof typeof GameMode];

export type LobbyType = typeof LobbyType[keyof typeof LobbyType];
