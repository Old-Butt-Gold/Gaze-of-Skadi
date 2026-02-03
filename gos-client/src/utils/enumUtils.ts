import { GameMode, LobbyType } from '../types/common';

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

export const getGameModeName = (mode: GameMode): string => {
  return GAME_MODE_NAMES[mode] ?? 'Unknown Mode';
};

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

export const getLobbyTypeName = (type: LobbyType): string => {
  return LOBBY_TYPE_NAMES[type] ?? 'Unknown Lobby';
};
